import { useEffect, useRef, useState } from 'react'
import { useNil } from '../store'
import { fmt } from '../util'

const PHASES = [
  { label: 'Order confirmed', sub: 'Restaurant is preparing your order', icon: '🧑‍🍳' },
  { label: 'Picked up', sub: 'Your rider has collected the order', icon: '🛵' },
  { label: 'Almost there', sub: 'Your rider is nearby', icon: '📍' },
]

const RIDER_NAMES = ['Ravi K.', 'Suresh M.', 'Arjun P.', 'Deepak R.', 'Kiran S.']

const PIN_X = 58
const PIN_Y = 30

function etaText(ms: number): string {
  const mins = Math.ceil(ms / 60_000)
  if (mins <= 0) return 'Arriving now'
  if (mins === 1) return '1 min away'
  return `${mins} mins away`
}

function bez(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}


export default function Tracking() {
  const { orderPlacedAt, orderTotalDuration, go, allCarts } = useNil()
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const [riderName] = useState(() => RIDER_NAMES[Math.floor(Math.random() * RIDER_NAMES.length)])

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
      const el = Date.now() - orderPlacedAt
      const p = Math.min(1, el / orderTotalDuration)
      setProgress(p)
      if (p >= 0.9) { go('letgo'); return }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [orderPlacedAt, orderTotalDuration, go])

  const remainingMs = orderPlacedAt && orderTotalDuration
    ? Math.max(0, orderTotalDuration - (Date.now() - orderPlacedAt))
    : 0

  const phaseIndex = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2

  const mopedT = Math.min(progress * 1.08, 0.91)
  const mopedX = bez(mopedT, route.sx, route.cx1, route.cx2, PIN_X)
  const mopedY = bez(mopedT, route.sy, route.cy1, route.cy2, PIN_Y)

  // Build order summary from allCarts
  const cartEntries = Object.values(allCarts)
  const totalItems = cartEntries.reduce((s, rc) => s + Object.values(rc.items).reduce((a, b) => a + b, 0), 0)
  const grandTotal = cartEntries.reduce((s, rc) =>
    s + Object.entries(rc.items).reduce((a, [id, qty]) => {
      const m = rc.menu.find(x => x.id === id)
      return a + (m ? m.price * qty : 0)
    }, 0), 0)
  const topCart = cartEntries[0]
  const topItemId = topCart ? Object.keys(topCart.items)[0] : null
  const topItem = topItemId ? topCart.menu.find(x => x.id === topItemId) : null

  return (
    <section className="screen tracking-screen">
      <div className="tracking-eta-card">
        <div className="tracking-eta-label">Estimated delivery</div>
        <div className="tracking-eta-time">{etaText(remainingMs)}</div>
        <div className="tracking-eta-sub">{PHASES[phaseIndex].sub}</div>
      </div>

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
            strokeWidth="1.8"
            strokeDasharray="4 3"
            opacity="0.6"
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

      {topCart && (
        <div className="order-summary-card">
          <div className="order-summary-top">
            <span className="order-summary-rest">{topCart.restaurant.name}</span>
            {cartEntries.length > 1 && (
              <span className="order-summary-more">+{cartEntries.length - 1} more</span>
            )}
          </div>
          <div className="order-summary-row">
            <span className="order-summary-detail">
              {topItem ? topItem.emoji : '🍽️'} {topItem?.name ?? ''}
              {totalItems > 1 ? ` + ${totalItems - 1} more item${totalItems > 2 ? 's' : ''}` : ''}
            </span>
            <span className="order-summary-total">{fmt(grandTotal)}</span>
          </div>
        </div>
      )}

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
