import { useEffect, useState } from 'react'
import { useNil } from '../store'
import { fmt } from '../util'

export default function LetGo() {
  const { pendingTotal, stats, commitLetGo, orderForReal } = useNil()
  const [animVal, setAnimVal] = useState(stats.kept)
  const [animCount, setAnimCount] = useState(stats.count)

  useEffect(() => {
    const fromKept = stats.kept
    const toKept = stats.kept + pendingTotal
    const fromCount = stats.count
    const toCount = stats.count + 1
    let raf = 0
    let t0: number | null = null
    const dur = 1000
    const tick = (ts: number) => {
      if (t0 === null) t0 = ts
      const p = Math.min(1, (ts - t0) / dur)
      const ease = 1 - Math.pow(1 - p, 3)
      setAnimVal(Math.round(fromKept + (toKept - fromKept) * ease))
      setAnimCount(Math.round(fromCount + (toCount - fromCount) * ease))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [pendingTotal, stats.kept, stats.count])

  return (
    <section className="screen letgo-screen">
      <div className="letgo-wrap">
        <div className="letgo-check">✓</div>
        <div className="letgo-title">You did it.</div>
        <div className="letgo-sub">
          The craving passed. {fmt(pendingTotal)} stays in your pocket.
        </div>

        <div className="letgo-cards">
          <div className="keptcard">
            <div className="num money">{fmt(animVal)}</div>
            <div className="klabel">total saved</div>
          </div>
          <div className="keptcard">
            <div className="num accent">{animCount}</div>
            <div className="klabel">cravings ridden out</div>
          </div>
        </div>

        <div className="letgo-actions">
          <button className="cta" style={{ width: '100%' }} onClick={commitLetGo}>
            Back to browsing
          </button>
          <div style={{ marginTop: 14, textAlign: 'center' }}>
            <button className="textlink" onClick={orderForReal}>
              actually, order it for real
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
