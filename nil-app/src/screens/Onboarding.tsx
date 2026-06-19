import { useState } from 'react'
import { useNil } from '../store'

const STEPS = [
  {
    eyebrow: 'be honest',
    title: "You don't want the food.",
    body: "It's 1am and you're scrolling Swiggy. Not because you're hungry — because the scrolling is the ritual. The cart, the photos, the almost-ordering. That's the itch.",
    visual: '🌙',
    bg: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: '#e94560',
  },
  {
    eyebrow: 'so',
    title: 'Nil scratches it.',
    body: 'Real restaurants. Real menus. Add to cart, place the order, watch the rider set off. Every step of the ritual — none of the spend. The craving gets to finish.',
    visual: '🛵',
    bg: 'linear-gradient(160deg, #1a0a00 0%, #2d1200 50%, #3d1a00 100%)',
    accent: '#FC8019',
  },
  {
    eyebrow: 'one rule',
    title: 'You can always order for real.',
    body: "Nothing here is locked. If you actually want to order tonight, that door's always open. Nil is just here for the nights you don't.",
    visual: '✓',
    bg: 'linear-gradient(160deg, #0a1a0a 0%, #0f2d0f 50%, #153d15 100%)',
    accent: '#48C479',
  },
]

export default function Onboarding() {
  const { go } = useNil()
  const [step, setStep] = useState(0)
  const last = step === STEPS.length - 1
  const s = STEPS[step]

  return (
    <section className="ob-screen">
      {/* Visual hero */}
      <div className="ob-hero" style={{ background: s.bg }}>
        <div className="ob-visual" style={{ color: s.accent }}>
          {s.visual}
        </div>
        <div className="word ob-logo">nil<span className="dot">.</span></div>
      </div>

      {/* Content */}
      <div className="ob-content">
        <div className="ob-eyebrow">{s.eyebrow}</div>
        <h1 className="ob-title">{s.title}</h1>
        <p className="ob-body">{s.body}</p>
      </div>

      {/* Bottom actions */}
      <div className="ob-footer">
        <div className="ob-dots">
          {STEPS.map((_, i) => (
            <span key={i} className={'ob-dot' + (i === step ? ' on' : '')} onClick={() => setStep(i)} />
          ))}
        </div>
        <div className="ob-btns">
          {step > 0 && (
            <button className="ob-back" onClick={() => setStep((n) => n - 1)}>
              ←
            </button>
          )}
          <button
            className="cta ob-next-btn"
            onClick={() => (last ? go('restaurants') : setStep((n) => n + 1))}
          >
            {last ? "Let's go" : 'Next'}
          </button>
        </div>
        {last && (
          <div className="ob-skip">you can order for real anytime</div>
        )}
      </div>
    </section>
  )
}
