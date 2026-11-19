/**
 * A small four-wheel rover (in the spirit of the TEXPREP and IEEE R5 robots)
 * that patrols the line under the hero on phones and tablets.
 * Pure SVG + CSS: no three.js download on mobile.
 */
function Wheel({ cx }: { cx: number }) {
  return (
    <g className="rover-wheel">
      <circle cx={cx} cy={76} r={12.5} fill="#141418" stroke="#3a3a44" strokeWidth={3} />
      <circle cx={cx} cy={76} r={8} fill="none" stroke="#26262e" strokeWidth={1} />
      {[0, 45, 90, 135].map((a) => (
        <line
          key={a}
          x1={cx - 8}
          y1={76}
          x2={cx + 8}
          y2={76}
          stroke="#5b5b68"
          strokeWidth={1.4}
          strokeLinecap="round"
          transform={`rotate(${a} ${cx} 76)`}
        />
      ))}
      <circle cx={cx} cy={76} r={3.6} fill="var(--color-accent)" />
    </g>
  )
}

export default function Rover() {
  return (
    <div aria-hidden className="rover-track pointer-events-none">
      <div className="rover">
        <div className="rover-face">
          <svg viewBox="0 0 140 90" width="112" height="72" overflow="visible" className="block">
            <defs>
              <linearGradient id="rover-beam" x1="0" x2="1">
                <stop offset="0" stopColor="#ff6b1a" stopOpacity="0.45" />
                <stop offset="1" stopColor="#ff6b1a" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ultrasonic sensor sweep */}
            <polygon className="rover-beam" points="114,19 176,2 176,36" fill="url(#rover-beam)" />

            <ellipse cx="70" cy="89" rx="58" ry="2" fill="#000" opacity="0.5" />

            <g className="rover-body">
              {/* antenna */}
              <line x1="30" y1="38" x2="30" y2="20" stroke="#5b5b68" strokeWidth="1.5" strokeLinecap="round" />
              <circle className="rover-led" cx="30" cy="18.5" r="2.4" fill="var(--color-accent)" />

              {/* deck electronics */}
              <rect x="22" y="40" width="92" height="8" rx="2" fill="#141418" stroke="#3a3a44" />
              <rect x="38" y="31" width="34" height="9" rx="1.5" fill="#26262e" stroke="#3a3a44" />
              <rect x="42" y="34" width="10" height="3" rx="0.8" fill="#5b5b68" />
              <rect x="56" y="34" width="4" height="3" rx="0.8" fill="var(--color-accent)" opacity="0.8" />

              {/* mast + sensor head */}
              <rect x="93" y="24" width="4" height="16" fill="#3a3a44" />
              <g className="rover-head">
                <rect x="84" y="11" width="30" height="15" rx="3" fill="#1b1b21" stroke="#3a3a44" />
                <circle cx="94" cy="18.5" r="4.6" fill="#0c0c0f" stroke="#9b9ba6" strokeWidth="1.2" />
                <circle cx="105" cy="18.5" r="4.6" fill="#0c0c0f" stroke="#9b9ba6" strokeWidth="1.2" />
                <circle cx="94" cy="18.5" r="1.6" fill="#5b5b68" />
                <circle cx="105" cy="18.5" r="1.6" fill="#5b5b68" />
              </g>

              {/* chassis */}
              <rect x="12" y="48" width="116" height="20" rx="5" fill="#1b1b21" stroke="#3a3a44" />
              <rect x="12" y="57" width="116" height="3" fill="var(--color-accent)" />
              <circle cx="122" cy="53" r="1.6" fill="#ededf0" opacity="0.85" />
            </g>

            <Wheel cx={32} />
            <Wheel cx={108} />
          </svg>
        </div>
      </div>
    </div>
  )
}
