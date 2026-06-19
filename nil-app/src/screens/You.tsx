import { useNil } from '../store'
import { fmt } from '../util'

export default function You() {
  const { stats, theme, toggleTheme, openNudge } = useNil()

  const streakDisplay = () => {
    if (stats.count === 0) return 'start tonight'
    if (stats.count >= 7) return `🔥 ${stats.count} rides`
    return `${stats.count} ride${stats.count !== 1 ? 's' : ''}`
  }

  return (
    <section className="screen you-screen" style={{ paddingBottom: 'var(--chrome-bottom)' }}>
      {/* Profile hero */}
      <div className="profile-hero">
        <div className="profile-avatar">M</div>
        <div className="profile-name">Hey there 👋</div>
        <div className="profile-email">nil user · keeping it real</div>
      </div>

      {/* Metric grid */}
      <div className="metric-grid">
        <div className="metric">
          <div className="mlabel">cravings ridden out</div>
          <div className="num">{stats.count}</div>
        </div>
        <div className="metric">
          <div className="mlabel">money kept</div>
          <div className="num money">{fmt(stats.kept)}</div>
        </div>
        <div className="metric" style={{ gridColumn: '1 / -1' }}>
          <div className="mlabel">all-time rides</div>
          <div className="num" style={{ fontSize: 18 }}>
            {streakDisplay()}
          </div>
        </div>
      </div>

      {/* History */}
      <div className="history-section">
        <div className="history-label">Recently</div>
        {stats.ledger.length === 0 ? (
          <div style={{ color: 'var(--muted)', fontSize: 13, padding: '10px 0' }}>
            No let-gos yet. The first craving will find you.
          </div>
        ) : (
          stats.ledger.map((e, i) => (
            <div className="lrow" key={i}>
              <div className="lrow-dot" />
              <span>{e.when} · {e.label}</span>
            </div>
          ))
        )}
      </div>

      {/* Settings */}
      <div style={{ padding: '0 16px', marginTop: 16 }}>
        <div className="history-label">Settings</div>
        <div className="settingrow">
          <span>Night nudges</span>
          <button className="textlink settingrow-val" onClick={openNudge}>Preview</button>
        </div>
        <div className="settingrow">
          <span>Appearance</span>
          <button className="textlink settingrow-val" onClick={toggleTheme}>
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
        <div className="settingrow">
          <span>Version</span>
          <span className="settingrow-val" style={{ color: 'var(--muted)' }}>1.0.0-nil</span>
        </div>
      </div>
    </section>
  )
}
