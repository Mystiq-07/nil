import { type ReactNode } from 'react'
import { useNil } from '../store'
import type { Screen } from '../types'

// ─── Icons (inline SVG) ──────────────────────────

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function CartIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
}
function UserIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function MoonIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
}

// ─── TopBar ──────────────────────────────────────

export function TopBar() {
  const { screen, selectedRestaurant, go, toggleTheme, cart } = useNil()
  const hasItems = Object.keys(cart).length > 0

  if (screen === 'browse' && selectedRestaurant) {
    return (
      <div className="topbar">
        <button className="back-btn" onClick={() => go('restaurants')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <span className="topbar-title" style={{ flex: 1, textAlign: 'center', marginLeft: -18 }}>
          {selectedRestaurant.name}
        </span>
        <button className="iconbtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </button>
      </div>
    )
  }

  if (screen === 'cart') {
    return (
      <div className="topbar">
        <button className="back-btn" onClick={() => go(hasItems && selectedRestaurant ? 'browse' : 'restaurants')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <span className="topbar-title" style={{ flex: 1, textAlign: 'center', marginLeft: -18 }}>Your cart</span>
        <div style={{ width: 34 }} />
      </div>
    )
  }

  if (screen === 'you') {
    return (
      <div className="topbar">
        <span className="topbar-title">Account</span>
        <button className="iconbtn" onClick={toggleTheme} aria-label="Toggle theme">
          <MoonIcon />
        </button>
      </div>
    )
  }

  // Restaurants / home screen
  return (
    <div className="topbar">
      <div>
        <div className="topbar-loc-label">Delivering to</div>
        <div className="topbar-loc-row">
          <span className="topbar-loc-name">Near you</span>
          <span className="topbar-caret">▾</span>
        </div>
      </div>
      <span className="word">nil<span className="dot">.</span></span>
      <button className="iconbtn" onClick={toggleTheme} aria-label="Toggle theme">
        <MoonIcon />
      </button>
    </div>
  )
}

// ─── TabBar ──────────────────────────────────────

export function TabBar() {
  const { screen, go, count } = useNil()
  const c = count()
  const tab = (name: Screen, label: string, icon: ReactNode, active: boolean) => (
    <button className={'tab' + (active ? ' active' : '')} onClick={() => go(name)}>
      {icon}
      <span>{label}</span>
      {name === 'cart' && c > 0 && <span className="badge">{c}</span>}
    </button>
  )
  return (
    <div className="tabbar">
      {tab('restaurants', 'Home', <HomeIcon />, screen === 'restaurants' || screen === 'browse')}
      {c > 0 && tab('cart', 'Cart', <CartIcon />, screen === 'cart')}
      {tab('you', 'Profile', <UserIcon />, screen === 'you')}
    </div>
  )
}

// ─── Toast ───────────────────────────────────────

export function Toast() {
  const { toast } = useNil()
  return <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>
}

// ─── Night Nudge ─────────────────────────────────

export function NightNudge() {
  const { nudgeOpen, closeNudge } = useNil()
  if (!nudgeOpen) return null
  return (
    <div className="nudge" onClick={closeNudge}>
      <div className="clock">11:52</div>
      <div className="ncard">
        <div className="hd">
          <span className="nmark">n</span>
          <span style={{ color: '#fff' }}>nil</span>
          <span style={{ marginLeft: 'auto', opacity: .6, fontSize: 11, fontWeight: 400, color: '#fff' }}>now</span>
        </div>
        <div className="ntitle">The kitchen's closing</div>
        <div className="ndesc">Still hungry? Scroll it, don't order it. Ride the wave with us.</div>
      </div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 20 }}>tap to dismiss</div>
    </div>
  )
}

// ─── SearchIcon export for screens ───────────────

export { SearchIcon }
