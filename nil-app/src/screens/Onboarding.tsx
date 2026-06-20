import { useState } from 'react'
import { useNil } from '../store'

function IllustrationMoon() {
  return (
    <svg viewBox="0 0 220 220" className="ob-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="80" fill="rgba(252,128,25,0.06)" />
      <circle cx="110" cy="110" r="58" fill="rgba(252,128,25,0.09)" />
      <defs>
        <mask id="crescent-m">
          <rect width="220" height="220" fill="white" />
          <circle cx="126" cy="96" r="33" fill="black" />
        </mask>
      </defs>
      <circle cx="105" cy="107" r="40" fill="#FC8019" mask="url(#crescent-m)" />
      <circle cx="58" cy="62"  r="3"   fill="#FC8019" opacity="0.45" />
      <circle cx="170" cy="55" r="2"   fill="#FC8019" opacity="0.35" />
      <circle cx="175" cy="155" r="2.5" fill="#FC8019" opacity="0.3" />
      <circle cx="48"  cy="158" r="2"  fill="#FC8019" opacity="0.3" />
      <circle cx="76"  cy="40"  r="1.5" fill="#FC8019" opacity="0.25" />
      <circle cx="182" cy="118" r="1.5" fill="#FC8019" opacity="0.2" />
      <circle cx="36"  cy="105" r="1.5" fill="#FC8019" opacity="0.2" />
      <circle cx="145" cy="175" r="1.5" fill="#FC8019" opacity="0.18" />
    </svg>
  )
}

function IllustrationPhone() {
  return (
    <svg viewBox="0 0 220 220" className="ob-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="62" y="30" width="96" height="162" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
      <rect x="76" y="48" width="68" height="6" rx="3" fill="rgba(255,255,255,0.07)" />
      <rect x="76" y="62" width="68" height="12" rx="6" fill="rgba(252,128,25,0.18)" />
      <circle cx="83" cy="68" r="4" fill="rgba(252,128,25,0.4)" />
      <rect x="90" y="65" width="36" height="4" rx="2" fill="rgba(252,128,25,0.35)" />
      <rect x="76" y="82" width="68" height="38" rx="10" fill="rgba(252,128,25,0.11)" />
      <rect x="84" y="91" width="28" height="5" rx="2.5" fill="rgba(252,128,25,0.45)" />
      <rect x="84" y="101" width="20" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      <circle cx="126" cy="100" r="11" fill="rgba(252,128,25,0.22)" />
      <rect x="76" y="128" width="68" height="38" rx="10" fill="rgba(255,255,255,0.04)" />
      <rect x="84" y="137" width="22" height="5" rx="2.5" fill="rgba(255,255,255,0.14)" />
      <rect x="84" y="147" width="16" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
      <circle cx="126" cy="146" r="11" fill="rgba(255,255,255,0.05)" />
      <circle cx="172" cy="162" r="20" fill="#FC8019" />
      <rect x="164" y="161" width="16" height="2.5" rx="1.25" fill="white" />
      <rect x="170.75" y="154.5" width="2.5" height="16" rx="1.25" fill="white" />
    </svg>
  )
}

function IllustrationRoute() {
  return (
    <svg viewBox="0 0 220 220" className="ob-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="80" fill="rgba(252,128,25,0.05)" />
      <path d="M 42 172 C 65 110 140 76 175 94" stroke="rgba(252,128,25,0.25)" strokeWidth="2.5" strokeDasharray="6 5" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="172" r="8" fill="rgba(252,128,25,0.2)" />
      <circle cx="42" cy="172" r="4.5" fill="#FC8019" />
      <path d="M175 94 C175 80,164 69,164 69 C164 69,153 80,153 94 C153 102.3,157.8 109,164 109 C170.2 109,175 102.3,175 94Z" fill="#FC8019" />
      <circle cx="164" cy="94" r="5.5" fill="rgba(0,0,0,0.3)" />
      <circle cx="96" cy="132" r="14" fill="none" stroke="#FC8019" strokeWidth="2.5" />
      <circle cx="96" cy="132" r="3.5" fill="#FC8019" />
      <circle cx="128" cy="132" r="14" fill="none" stroke="#FC8019" strokeWidth="2.5" />
      <circle cx="128" cy="132" r="3.5" fill="#FC8019" />
      <path d="M96 118 L100 106 L118 104 L126 112 L128 118" stroke="#FC8019" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(252,128,25,0.08)" />
      <circle cx="118" cy="98" r="10" fill="rgba(252,128,25,0.2)" stroke="#FC8019" strokeWidth="1.5" />
    </svg>
  )
}

function IllustrationCalm() {
  return (
    <svg viewBox="0 0 220 220" className="ob-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="80" fill="rgba(72,196,121,0.05)" />
      <circle cx="110" cy="110" r="58" fill="rgba(72,196,121,0.08)" />
      <circle cx="110" cy="110" r="38" fill="rgba(72,196,121,0.11)" />
      <path d="M84 110 L101 127 L138 88" stroke="#48C479" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="55"  cy="68"  r="4"   fill="rgba(72,196,121,0.3)" />
      <circle cx="168" cy="72"  r="2.8" fill="rgba(72,196,121,0.22)" />
      <circle cx="50"  cy="152" r="2.8" fill="rgba(72,196,121,0.22)" />
      <circle cx="170" cy="150" r="4"   fill="rgba(72,196,121,0.3)" />
      <circle cx="110" cy="36"  r="2"   fill="rgba(72,196,121,0.18)" />
      <circle cx="110" cy="184" r="2"   fill="rgba(72,196,121,0.18)" />
    </svg>
  )
}

const STEPS = [
  {
    title: 'some cravings just need company.',
    body: 'nil is the app built for late-night moments — the ritual of almost-ordering, without the spend.',
    Illustration: IllustrationMoon,
  },
  {
    title: 'you know the feeling.',
    body: "It's late. Not hungry — just in the mood to browse, build a cart, and almost. nil is built for exactly that.",
    Illustration: IllustrationPhone,
  },
  {
    title: 'browse. cart. track.',
    body: 'Nearby restaurants, menus to match. Place your order, watch the rider set off. Every step of the ritual.',
    Illustration: IllustrationRoute,
  },
  {
    title: 'the craving passes.',
    body: 'Riding it out is sometimes all you needed. nil is just here for those nights.',
    Illustration: IllustrationCalm,
  },
]

export default function Onboarding() {
  const { go } = useNil()
  const [step, setStep] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const navigate = (next: number) => {
    setAnimKey(k => k + 1)
    setStep(next)
  }

  const { title, body, Illustration } = STEPS[step]
  const last = step === STEPS.length - 1

  return (
    <section className="ob-screen">
      <button className="ob-skip-top" onClick={() => go('restaurants')}>
        Skip
      </button>

      <div className="ob-visual-area" key={`v${animKey}`}>
        <Illustration />
      </div>

      <div className="ob-lower" key={`l${animKey}`}>
        <div className="ob-dots">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={'ob-dot' + (i === step ? ' on' : '')}
              onClick={() => navigate(i)}
            />
          ))}
        </div>
        <h1 className="ob-title">{title}</h1>
        <p className="ob-body">{body}</p>
      </div>

      <div className="ob-footer">
        <button
          className={'ob-arrow-btn' + (last ? ' ob-arrow-last' : '')}
          onClick={() => last ? go('restaurants') : navigate(step + 1)}
          aria-label={last ? 'Get started' : 'Next'}
        >
          {last ? '✓' : '→'}
        </button>
      </div>
    </section>
  )
}
