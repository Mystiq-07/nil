import { useEffect, useState } from 'react'
import { useNil } from '../store'

const PHASES = [
  { label: 'Order confirmed', sub: 'Restaurant is preparing your order', icon: '🧑‍🍳' },
  { label: 'Picked up', sub: 'Your rider has collected the order', icon: '🛵' },
  { label: 'Almost there', sub: 'Your rider is nearby', icon: '📍' },
]

const RIDER_NAMES = ['Ravi K.', 'Suresh M.', 'Arjun P.', 'Deepak R.', 'Kiran S.']

const PIN_X = 58
const PIN_Y = 32

function etaText(ms: number): string {
  const mins = Math.ceil(ms / 60_000)
  if (mins <= 0) return 'Arriving now'
  if (mins === 1) return '1 min away'
  return `${mins} mins away`
}

function fmtElapsed(ms: number): string {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function bez(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function qbez(t: number, p0: number, p1: number, p2: number) {
  const u = 1 - t
  return u * u * p0 + 2 * u * t * p1 + t * t * p2
}

// Arc control points (quadratic bezier, SVG viewBox 0 0 100 38)
const AX0 = 4, AY0 = 5
const AX1 = 50, AY1 = 3   // control: keeps curve high through first half
const AX2 = 96, AY2 = 33  // end: drops to near-flat

export default function Tracking() {
  const { orderPlacedAt, orderTotalDuration, go } = useNil()
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [riderName] = useState(() => RIDER_NAMES[Math.floor(Math.random() * RIDER_NAMES.length)])

  // Random cubic bezier route: starts somewhere in the lower portion, curves to the pin
  const [route] = useState(() => {
    const sx = 8 + Math.random() * 22
    const sy = 58 + Math.random() * 28
    const cx1 = sx + 8 + Math.random() * 20
    const cy1 = sy - 26 - Math.random() * 22
    const cx2 = PIN_X - 18 - Math.random() * 12
    const cy2 = PIN_Y + 14 + Math.random() * 16
    return { sx, sy, cx1, cy1, cx2, cy2 }
  })

  useEffect(() => {
    if (!orderPlacedAt || !orderTotalDuration) return
    const tick = () => {
      const now = Date.now()
      const el = now - orderPlacedAt
      const p = Math.min(1, el / orderTotalDuration)
      setProgress(p)
      setElapsed(el)
      if (p >= 0.9) go('letgo')
    }
    tick()
    const interval = window.setInterval(tick, 1_000)
    return () => clearInterval(interval)
  }, [orderPlacedAt, orderTotalDuration, go])

  const remainingMs = orderPlacedAt && orderTotalDuration
    ? Math.max(0, orderTotalDuration - (Date.now() - orderPlacedAt))
    : 0

  const phaseIndex = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2

  // Moped follows the bezier path; stops just before reaching the pin
  const mopedT = Math.min(progress * 1.08, 0.91)
  const mopedX = bez(mopedT, route.sx, route.cx1, route.cx2, PIN_X)
  const mopedY = bez(mopedT, route.sy, route.cy1, route.cy2, PIN_Y)

  // Arc dot position along quadratic bezier
  const arcT = Math.min(progress, 0.98)
  const arcDotX = qbez(arcT, AX0, AX1, AX2)
  const arcDotY = qbez(arcT, AY0, AY1, AY2)

  return (
    <section className="screen tracking-screen">
      {/* ETA card */}
      <div className="tracking-eta-card">
        <div className="tracking-eta-label">Estimated delivery</div>
        <div className="tracking-eta-time">{etaText(remainingMs)}</div>
        <div className="tracking-eta-sub">{PHASES[phaseIndex].sub}</div>
      </div>

      {/* Animated map */}
      <div className="map-placeholder">
        <div className="map-grid" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <path
            d={`M ${route.sx} ${route.sy} C ${route.cx1} ${route.cy1}, ${route.cx2} ${route.cy2}, ${PIN_X} ${PIN_Y}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.3"
          />
        </svg>
        <div className="map-pin">📍</div>
        <div
          className="map-moped"
          style={{ left: `${mopedX}%`, top: `${mopedY}%`, bottom: 'auto', transform: 'translate(-50%, -50%)' }}
        >
          🛵
        </div>
      </div>

      {/* Progress steps */}
      <div className="tracking-steps">
        {PHASES.map((phase, i) => (
          <div key={i} className={'tracking-step' + (i <= phaseIndex ? ' active' : '')}>
            <div className={'step-dot' + (i <= phaseIndex ? ' done' : '')}>
              {i <= phaseIndex ? '✓' : phase.icon}
            </div>
            <div>
              <div className="step-label">{phase.label}</div>
              {i === phaseIndex && (
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{phase.sub}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rider card */}
      <div className="rider-card">
        <div className="rider-info">
          <div className="rider-avatar">🧑</div>
          <div>
            <div className="rider-name">{riderName}</div>
            <div className="rider-sub">★ 4.8 · Your delivery partner</div>
          </div>
        </div>
        <button className="rider-call" aria-label="Call rider">📞</button>
      </div>

      {/* Arc + timer */}
      <div className="arc-section">
        <svg viewBox="0 0 100 38" preserveAspectRatio="none" className="arc-svg">
          {/* Full arc — faded background */}
          <path
            d={`M ${AX0} ${AY0} Q ${AX1} ${AY1} ${AX2} ${AY2}`}
            fill="none"
            stroke="var(--hairline)"
            strokeWidth="1.5"
          />
          {/* Traveled portion — draws progressively */}
          <path
            d={`M ${AX0} ${AY0} Q ${AX1} ${AY1} ${AX2} ${AY2}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - arcT}
          />
          {/* Moving dot */}
          <circle cx={arcDotX} cy={arcDotY} r="2.8" fill="var(--accent)" />
        </svg>
        <div className="arc-timer">{fmtElapsed(elapsed)}</div>
      </div>

      {/* Footer */}
      <div className="tracking-footer">
        <button
          className="textlink"
          style={{ fontSize: 12, color: 'var(--muted)' }}
          onClick={() => go('browse')}
        >
          cancel order
        </button>
      </div>
    </section>
  )
}
