/**
 * A quadcopter that patrols the open sky of the mobile hero and drops down to
 * hover over the rover while it scans. Its 16 s loop is synced with the rover's.
 * Sits behind the text; pure SVG + CSS.
 */
function Prop({ cx, cy, rx, delay }: { cx: number; cy: number; rx: number; delay: string }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.16} fill="#ededf0" opacity="0.1" />
      <rect
        className="drone-blade"
        style={{ animationDelay: delay }}
        x={cx - rx}
        y={cy - 0.8}
        width={rx * 2}
        height={1.6}
        rx={0.8}
        fill="#9b9ba6"
      />
    </g>
  )
}

export default function Drone() {
  return (
    <div aria-hidden className="drone-sky pointer-events-none absolute inset-x-5 top-20 bottom-[76px] -z-10 md:inset-x-10">
      <div className="drone-x">
        <div className="drone-y">
          <div className="drone-hover">
            <svg viewBox="0 0 120 56" width="72" height="34" overflow="visible" className="drone-tilt block">
              {/* rear rotors, drawn smaller and higher for depth */}
              <line x1="36" y1="11" x2="50" y2="20" stroke="#26262e" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="84" y1="11" x2="70" y2="20" stroke="#26262e" strokeWidth="2.4" strokeLinecap="round" />
              <rect x="32" y="7" width="7" height="5" rx="1.2" fill="#1b1b21" stroke="#3a3a44" strokeWidth="0.8" />
              <rect x="81" y="7" width="7" height="5" rx="1.2" fill="#1b1b21" stroke="#3a3a44" strokeWidth="0.8" />
              <Prop cx={35.5} cy={6} rx={10} delay="-0.03s" />
              <Prop cx={84.5} cy={6} rx={10} delay="-0.05s" />

              {/* front arms + motors */}
              <line x1="18" y1="16" x2="46" y2="25" stroke="#3a3a44" strokeWidth="3" strokeLinecap="round" />
              <line x1="102" y1="16" x2="74" y2="25" stroke="#3a3a44" strokeWidth="3" strokeLinecap="round" />
              <rect x="10" y="11" width="9" height="7" rx="1.5" fill="#26262e" stroke="#3a3a44" />
              <rect x="101" y="11" width="9" height="7" rx="1.5" fill="#26262e" stroke="#3a3a44" />
              <Prop cx={14.5} cy={9.5} rx={14} delay="0s" />
              <Prop cx={105.5} cy={9.5} rx={14} delay="-0.02s" />

              {/* landing skids */}
              <path d="M51 31 L47 43 M69 31 L73 43" stroke="#3a3a44" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M40 43.5 H55 M65 43.5 H80" stroke="#5b5b68" strokeWidth="2" strokeLinecap="round" />

              {/* body */}
              <rect x="43" y="17" width="34" height="15" rx="5" fill="#1b1b21" stroke="#3a3a44" />
              <rect x="43" y="23.5" width="34" height="2" fill="var(--color-accent)" />

              {/* camera gimbal */}
              <circle cx="60" cy="36" r="4.6" fill="#0c0c0f" stroke="#9b9ba6" strokeWidth="1.1" />
              <circle cx="60" cy="36" r="1.6" fill="var(--color-accent)" />

              {/* nav lights */}
              <circle className="drone-led" cx="14.5" cy="18.5" r="1.5" fill="var(--color-accent)" />
              <circle className="drone-led drone-led-alt" cx="105.5" cy="18.5" r="1.5" fill="#ededf0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
