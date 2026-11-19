import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'

/**
 * A synthetic "sensor scan": four objects (ring, sphere, box, floor) buried in noise.
 * Hero mode plays raw -> filtered -> clustered once, then idles and reacts to the cursor.
 * Lab mode lets the visitor step through the stages and orbit the scene.
 */

export type Stage = 0 | 1 | 2 // raw, filtered, clustered

const CLUSTER_COLORS = ['#ff6b1a', '#ffb27d', '#ededf0', '#c2410c', '#5b5b68']

function rand(seed: number) {
  // small deterministic PRNG so the scan looks the same on every visit
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function buildScan(scale = 1) {
  const r = rand(42)
  const objects: { pos: number[]; cluster: number }[] = []
  const n = (k: number) => Math.round(k * scale)

  // ring (torus)
  for (let i = 0; i < n(1400); i++) {
    const u = r() * Math.PI * 2
    const v = r() * Math.PI * 2
    const R = 0.75, tube = 0.2
    const x = (R + tube * Math.cos(v)) * Math.cos(u)
    const y = (R + tube * Math.cos(v)) * Math.sin(u)
    const z = tube * Math.sin(v)
    // tilt the ring
    objects.push({ pos: [x - 1.2, y * 0.82 + z * 0.57 + 0.25, -y * 0.57 + z * 0.82], cluster: 0 })
  }
  // sphere
  for (let i = 0; i < n(1200); i++) {
    const u = r() * 2 - 1
    const t = r() * Math.PI * 2
    const s = Math.sqrt(1 - u * u)
    const rad = 0.62
    objects.push({ pos: [s * Math.cos(t) * rad + 1.2, u * rad + 0.35, s * Math.sin(t) * rad + 0.2], cluster: 1 })
  }
  // box surface
  for (let i = 0; i < n(1100); i++) {
    const face = Math.floor(r() * 6)
    const a = r() - 0.5, b = r() - 0.5
    const p = [a, b, 0.5 * (face % 2 ? 1 : -1)]
    const axis = Math.floor(face / 2)
    const pos = axis === 0 ? [p[2], p[0], p[1]] : axis === 1 ? [p[0], p[2], p[1]] : p
    const size = [0.95, 0.75, 0.75]
    objects.push({ pos: [pos[0] * size[0] + 0.05, pos[1] * size[1] - 0.6, pos[2] * size[2] - 0.55], cluster: 2 })
  }
  // floor plane
  for (let i = 0; i < n(1600); i++) {
    objects.push({ pos: [(r() - 0.5) * 4.8, -1.3 + (r() - 0.5) * 0.04, (r() - 0.5) * 3.4], cluster: 4 })
  }
  const noiseCount = n(3200)
  const total = objects.length + noiseCount

  const position = new Float32Array(total * 3)
  const scatter = new Float32Array(total * 3)
  const noise = new Float32Array(total)
  const color = new Float32Array(total * 3)
  const seed = new Float32Array(total)
  const c = new THREE.Color()

  objects.forEach((o, i) => {
    position.set(o.pos, i * 3)
    noise[i] = 0
    c.set(CLUSTER_COLORS[o.cluster])
    color.set([c.r, c.g, c.b], i * 3)
  })
  for (let i = objects.length; i < total; i++) {
    position.set([(r() - 0.5) * 6.4, (r() - 0.5) * 3.6, (r() - 0.5) * 3.4], i * 3)
    noise[i] = 1
    color.set([0.4, 0.4, 0.45], i * 3)
  }
  for (let i = 0; i < total; i++) {
    // every point starts somewhere on a wide shell and flies to its place
    const th = r() * Math.PI * 2, ph = Math.acos(r() * 2 - 1), rad = 4 + r() * 3
    scatter.set([Math.sin(ph) * Math.cos(th) * rad, Math.cos(ph) * rad * 0.6, Math.sin(ph) * Math.sin(th) * rad], i * 3)
    seed[i] = r()
  }
  return { position, scatter, noise, color, seed, total, objectCount: objects.length, noiseCount }
}

const vertex = /* glsl */ `
  attribute vec3 aScatter;
  attribute float aNoise;
  attribute vec3 aColor;
  attribute float aSeed;
  uniform float uGather;
  uniform float uFilter;
  uniform float uCluster;
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uAspect;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float g = clamp(uGather * 1.25 - aSeed * 0.25, 0.0, 1.0);
    g = 1.0 - pow(1.0 - g, 3.0);
    vec3 p = mix(aScatter, position, g);
    // subtle shimmer, stronger on noise
    p += 0.012 * vec3(sin(uTime * 1.3 + aSeed * 40.0), cos(uTime * 1.1 + aSeed * 30.0), 0.0) * (1.0 + aNoise * 3.0);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
    float f = smoothstep(0.32, 0.0, length(d)) * uHover;
    mv.xy += normalize(d + 1e-5) * f * 0.28;
    gl_Position = projectionMatrix * mv;

    float keep = 1.0 - aNoise * smoothstep(aSeed * 0.6, aSeed * 0.6 + 0.4, uFilter);
    gl_PointSize = uSize * keep * (1.0 + f * 0.8) / -mv.z;

    vec3 neutral = vec3(0.78, 0.78, 0.82);
    vColor = aNoise > 0.5 ? aColor : mix(neutral, aColor, uCluster);
    vAlpha = keep * (aNoise > 0.5 ? 0.55 : 0.9);
  }
`

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.2, r) * vAlpha;
    gl_FragColor = vec4(vColor, a);
  }
`

type Targets = { gather: number; filter: number; cluster: number }

function stageTargets(stage: Stage): Targets {
  if (stage === 0) return { gather: 1, filter: 0, cluster: 0 }
  if (stage === 1) return { gather: 1, filter: 1, cluster: 0 }
  return { gather: 1, filter: 1, cluster: 1 }
}

function Points({
  mode,
  stage,
  reduced,
  scale,
  hovering,
}: {
  mode: 'hero' | 'lab'
  stage: Stage
  reduced: boolean
  scale: number
  hovering: RefObject<boolean>
}) {
  const scan = useMemo(() => buildScan(scale), [scale])
  const group = useRef<THREE.Group>(null)
  const { size, gl, pointer } = useThree()
  const start = useRef<number | null>(null)

  const uniforms = useMemo(
    () => ({
      uGather: { value: reduced || mode === 'lab' ? 1 : 0 },
      uFilter: { value: reduced && mode === 'hero' ? 1 : 0 },
      uCluster: { value: reduced && mode === 'hero' ? 1 : 0 },
      uTime: { value: 0 },
      uSize: { value: 22 },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uHover: { value: 0 },
      uAspect: { value: 1 },
    }),
    [reduced, mode],
  )

  const material = useRef<THREE.ShaderMaterial>(null)

  useFrame((state, delta) => {
    // write to the uniforms the live material actually uses
    const u = (material.current?.uniforms ?? uniforms) as typeof uniforms
    const dt = Math.min(delta, 0.05)
    u.uTime.value = state.clock.elapsedTime
    u.uAspect.value = size.width / size.height
    u.uSize.value = 22 * Math.min(gl.getPixelRatio(), 2) * (size.width < 640 ? 0.85 : 1)

    if (mode === 'hero' && !reduced) {
      if (start.current === null) start.current = state.clock.elapsedTime
      const t = state.clock.elapsedTime - start.current
      const ease = (a: number, b: number) => THREE.MathUtils.smoothstep(t, a, b)
      u.uGather.value = ease(0.1, 2.0)
      u.uFilter.value = ease(2.0, 3.4)
      u.uCluster.value = ease(3.2, 4.4)
    } else if (mode === 'lab') {
      const tg = stageTargets(stage)
      const k = reduced ? 1 : 1 - Math.exp(-dt * 3)
      u.uGather.value = tg.gather
      u.uFilter.value += (tg.filter - u.uFilter.value) * k
      u.uCluster.value += (tg.cluster - u.uCluster.value) * k
    }

    // cursor repel (hero only; lab uses drag to orbit)
    const hoverTarget = mode === 'hero' && hovering.current && !reduced ? 1 : 0
    u.uHover.value += (hoverTarget - u.uHover.value) * (1 - Math.exp(-dt * 6))
    u.uMouse.value.set(pointer.x, pointer.y)

    if (group.current && mode === 'hero') {
      const g = group.current
      const tx = reduced ? 0 : pointer.y * -0.12
      const ty = reduced ? -0.35 : -0.35 + pointer.x * 0.25 + Math.sin(state.clock.elapsedTime * 0.15) * 0.15
      g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-dt * 2))
      g.rotation.y += (ty - g.rotation.y) * (1 - Math.exp(-dt * 2))
    }
  })

  // hero: the scan sits right of the text on wide screens, above it on phones
  const wide = size.width >= 1024
  const heroPos: [number, number, number] = wide ? [2.1, 0.1, 0] : size.width < 640 ? [0, 1.75, 0] : [0, 1.4, 0]
  const heroScale = wide ? 0.8 : size.width < 640 ? 0.46 : 0.62

  return (
    <group
      ref={group}
      rotation={[0, -0.35, 0]}
      position={mode === 'hero' ? heroPos : [0, 0, 0]}
      scale={mode === 'hero' ? heroScale : 1}
    >
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scan.position, 3]} />
          <bufferAttribute attach="attributes-aScatter" args={[scan.scatter, 3]} />
          <bufferAttribute attach="attributes-aNoise" args={[scan.noise, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[scan.color, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[scan.seed, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

/** Drag-to-orbit for the lab, using three's own OrbitControls */
function Orbit({ autoRotate }: { autoRotate: boolean }) {
  const { camera, gl } = useThree()
  const controls = useMemo(() => new OrbitControlsImpl(camera, gl.domElement), [camera, gl])
  useEffect(() => {
    controls.enablePan = false
    controls.enableDamping = true
    controls.minDistance = 4
    controls.maxDistance = 10
    controls.autoRotateSpeed = 0.6
    return () => controls.dispose()
  }, [controls])
  useFrame(() => {
    controls.autoRotate = autoRotate
    controls.update()
  })
  return null
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export default function PointCloud({
  mode = 'hero',
  stage = 2,
  eventSource,
}: {
  mode?: 'hero' | 'lab'
  stage?: Stage
  /** element that receives pointer events (the hero section, so text can sit on top of the canvas) */
  eventSource?: RefObject<HTMLElement | null>
}) {
  const reduced = usePrefersReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = eventSource?.current ?? wrap.current
    if (!el) return
    const on = (e: PointerEvent) => (hovering.current = e.pointerType === 'mouse')
    const off = () => (hovering.current = false)
    el.addEventListener('pointerenter', on)
    el.addEventListener('pointermove', on)
    el.addEventListener('pointerleave', off)
    return () => {
      el.removeEventListener('pointerenter', on)
      el.removeEventListener('pointermove', on)
      el.removeEventListener('pointerleave', off)
    }
  }, [eventSource])
  const scale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.55 : 1

  // stop rendering while the canvas is off screen
  useEffect(() => {
    if (!wrap.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, mode === 'hero' ? 6.2 : 6.8], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        eventSource={eventSource?.current ?? undefined}
        eventPrefix={eventSource ? 'client' : 'offset'}
        aria-hidden
      >
        <Points mode={mode} stage={stage} reduced={reduced} scale={scale} hovering={hovering} />
        {mode === 'lab' && (
          <Orbit autoRotate={!reduced} />
        )}
      </Canvas>
    </div>
  )
}
