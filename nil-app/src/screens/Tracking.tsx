import { useEffect, useState } from 'react'
import { useNil } from '../store'

const PHASES = [
  { label: 'Order confirmed', sub: 'Restaurant is preparing your order', icon: '🧑‍🍳' },
  { label: 'Picked up', sub: 'Your rider has collected the order', icon: '🛵' },
  { label: 'Almost there', sub: 'Your rider is nearby', icon: '📍' },
]

const RIDER_NAMES = ['Ravi K.', 'Suresh M.', 'Arjun P.', 'Deepak R.', 'Kiran S.']

function etaText(ms: number): string {
  const mins = Math.ceil(ms / 60_000)
  if (mins <= 0) return 'Arriving now'
  if (mins === 1) return '1 min away'
  return `${mins} mins away`
}

export default function Tracking() {
  const { orderPlacedAt, orderTotalDuration, go } = useNil()
  const [progress, setProgress] = useState(0)
  const [riderName] = useState(() => RIDER_NAMES[Math.floor(Math.random() * RIDER_NAMES.length)])

  useEffect(() => {
    if (!orderPlacedAt || !orderTotalDuration) return
    const tick = () => {
      const elapsed = Date.now() - orderPlacedAt
      const p = Math.min(1, elapsed / orderTotalDuration)
      setProgress(p)
      if (p >= 0.9) go('letgo')
    }
    tick()
    const interval = window.setInterval(tick, 2_000)
    return () => clearInterval(interval)
  }, [orderPlacedAt, orderTotalDuration, go])

  const remainingMs = orderPlacedAt && orderTotalDuration
    ? Math.max(0, orderTotalDuration - (Date.now() - orderPlacedAt))
    : 0

  const phaseIndex = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2

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
        <div className="map-pin">📍</div>
        <div className="map-moped">🛵</div>
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

      {/* Footer */}
      <div className="tracking-footer">
        <div className="tracking-tagline">sit tight — good things take time</div>
        <button
          className="textlink"
          style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}
          onClick={() => go('browse')}
        >
          cancel order
        </button>
      </div>
    </section>
  )
}
