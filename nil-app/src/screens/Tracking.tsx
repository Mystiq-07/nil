import { useEffect, useRef, useState } from 'react'
import { useNil } from '../store'

const PHASES = [
  { label: 'Order confirmed', sub: 'Restaurant is preparing your order', icon: '🧑‍🍳' },
  { label: 'Picked up', sub: 'Your rider has collected the order', icon: '🛵' },
  { label: 'Almost there', sub: 'Your rider is nearby', icon: '📍' },
]

const RIDER_NAMES = ['Ravi K.', 'Suresh M.', 'Arjun P.', 'Deepak R.', 'Kiran S.']

// Map container dimensions (375px phone, 16px side margins)
const MAP_W = 343
const MAP_H = 140
const TILE = 256
const ZOOM = 16

// Where the destination pin sits in the container (matches .map-pin CSS)
const PIN_X_PCT = 0.58
const PIN_Y_PCT = 0.30

// Arc control points in a 100×38 viewBox
const AX0 = 4, AY0 = 5, AX1 = 50, AY1 = 3, AX2 = 96, AY2 = 33

function toGlobalPx(lat: number, lon: number) {
  const n = 2 ** ZOOM
  const gpx = (lon + 180) / 360 * n * TILE
  const latRad = lat * Math.PI / 180
  const gpy = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n * TILE
  return { gpx, gpy }
}

function etaText(ms: number): string {
  const mins = Math.ceil(ms / 60_000)
  if (mins <= 0) return 'Arriving now'
  if (mins === 1) return '1 min away'
  return `${mins} mins away`
}

function fmtElapsed(ms: number): string {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function bez(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function qbez(t: number, p0: number, p1: number, p2: number) {
  const u = 1 - t
  return u * u * p0 + 2 * u * t * p1 + t * t * p2
}

export default function Tracking() {
  const { orderPlacedAt, orderTotalDuration, go, selectedRestaurant } = useNil()
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const rafRef = useRef<number>(0)
  const [riderName] = useState(() => RIDER_NAMES[Math.floor(Math.random() * RIDER_NAMES.length)])

  // Tile coordinates from restaurant's real location
  const { gpx, gpy } = toGlobalPx(
    selectedRestaurant?.lat ?? 12.9352,
    selectedRestaurant?.lon ?? 77.6245,
  )
  const tx = Math.floor(gpx / TILE)
  const ty = Math.floor(gpy / TILE)
  const localPx = gpx - tx * TILE  // restaurant's offset within its tile
  const localPy = gpy - ty * TILE

  // Which tiles are visible: compute container bounds in global pixel space
  const containerLeft   = gpx - PIN_X_PCT * MAP_W
  const containerRight  = containerLeft + MAP_W
  const containerTop    = gpy - PIN_Y_PCT * MAP_H
  const containerBottom = containerTop + MAP_H
  const txMin = Math.floor(containerLeft  / TILE)
  const txMax = Math.floor(containerRight / TILE)
  const tyMin = Math.floor(containerTop   / TILE)
  const tyMax = Math.floor(containerBottom / TILE)

  // Random route bezier — start somewhere in the lower portion of the map
  const [route] = useState(() => {
    const pinPx = PIN_X_PCT * 100  // in SVG 0–100 units
    const pinPy = PIN_Y_PCT * 100
    const sx = 8 + Math.random() * 22
    const sy = 58 + Math.random() * 28
    const cx1 = sx + 8 + Math.random() * 20
    const cy1 = sy - 26 - Math.random() * 22
    const cx2 = pinPx - 18 - Math.random() * 12
    const cy2 = pinPy + 14 + Math.random() * 16
    return { sx, sy, cx1, cy1, cx2, cy2 }
  })

  // rAF loop — updates 60fps for smooth arc and timer
  useEffect(() => {
    if (!orderPlacedAt || !orderTotalDuration) return
    const tick = () => {
      const el = Date.now() - orderPlacedAt
      const p = Math.min(1, el / orderTotalDuration)
      setProgress(p)
      setElapsed(el)
      if (p >= 0.9) { go('letgo'); return }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [orderPlacedAt, orderTotalDuration, go])

  const remainingMs = orderPlacedAt && orderTotalDuration
    ? Math.max(0, orderTotalDuration - elapsed)
    : 0

  const phaseIndex = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2

  // Moped position along bezier
  const mopedT = Math.min(progress * 1.08, 0.91)
  const mopedX = bez(mopedT, route.sx, route.cx1, route.cx2, PIN_X_PCT * 100)
  const mopedY = bez(mopedT, route.sy, route.cy1, route.cy2, PIN_Y_PCT * 100)

  // Arc dot position
  const arcT = Math.min(progress, 0.98)
  const arcDotX = qbez(arcT, AX0, AX1, AX2)
  const arcDotY = qbez(arcT, AY0, AY1, AY2)

  // Build tile grid covering exactly the visible container area
  const tileGrid: { col: number; row: number }[] = []
  for (let row = tyMin; row <= tyMax; row++) {
    for (let col = txMin; col <= txMax; col++) {
      tileGrid.push({ col, row })
    }
  }

  return (
    <section className="screen tracking-screen">
      {/* ETA card */}
      <div className="tracking-eta-card">
        <div className="tracking-eta-label">Estimated delivery</div>
        <div className="tracking-eta-time">{etaText(remainingMs)}</div>
        <div className="tracking-eta-sub">{PHASES[phaseIndex].sub}</div>
      </div>

      {/* Real map */}
      <div className="map-placeholder">
        {tileGrid.map(({ col, row }) => (
          <img
            key={`${col}-${row}`}
            src={`https://tile.openstreetmap.org/${ZOOM}/${col}/${row}.png`}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              left: col * TILE - containerLeft,
              top: row * TILE - containerTop,
              width: TILE,
              height: TILE,
              opacity: 0.88,
              userSelect: 'none',
            }}
          />
        ))}
        {/* Route line overlay */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <path
            d={`M ${route.sx} ${route.sy} C ${route.cx1} ${route.cy1}, ${route.cx2} ${route.cy2}, ${PIN_X_PCT * 100} ${PIN_Y_PCT * 100}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            opacity="0.7"
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
          <path
            d={`M ${AX0} ${AY0} Q ${AX1} ${AY1} ${AX2} ${AY2}`}
            fill="none"
            stroke="var(--hairline)"
            strokeWidth="1.5"
          />
          <path
            d={`M ${AX0} ${AY0} Q ${AX1} ${AY1} ${AX2} ${AY2}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - arcT}
          />
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
