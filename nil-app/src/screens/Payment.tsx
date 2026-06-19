import { useState, useEffect, useRef } from 'react'
import { useNil } from '../store'
import { fmt } from '../util'

type PayStep = 'method' | 'otp' | 'processing' | 'success'
type PayMethod = 'card' | 'gpay' | 'cod' | 'bnpl'

const OTP_LEN = 6

const METHODS: { key: PayMethod; icon: string; label: string; sub: string }[] = [
  { key: 'gpay', icon: '🔵', label: 'Google Pay', sub: 'Pay via UPI instantly' },
  { key: 'card', icon: '💳', label: 'Credit / Debit Card', sub: 'Secured by 3D Secure' },
  { key: 'bnpl', icon: '🕐', label: 'Buy Now, Pay Later', sub: 'Pay in 3 · No interest' },
  { key: 'cod', icon: '💵', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
]

function GPayLogo() {
  return (
    <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC04' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
      <span style={{ color: '#5F6368', fontWeight: 500 }}> Pay</span>
    </span>
  )
}

export default function Payment() {
  const { confirmPayment, pendingTotal, go } = useNil()
  const [step, setStep] = useState<PayStep>('method')
  const [method, setMethod] = useState<PayMethod | null>(null)
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState(false)
  const [processingLabel, setProcessingLabel] = useState('Verifying payment…')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === 'success') {
      const t = setTimeout(() => confirmPayment(), 2200)
      return () => clearTimeout(t)
    }
  }, [step, confirmPayment])

  useEffect(() => {
    if (step === 'otp') {
      const t = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(t)
    }
  }, [step])

  function selectMethod(m: PayMethod) {
    setMethod(m)
    if (m === 'cod') {
      setProcessingLabel('Confirming your order…')
      setStep('processing')
      setTimeout(() => setStep('success'), 1400)
    } else if (m === 'gpay') {
      setProcessingLabel('Redirecting to Google Pay…')
      setStep('processing')
      setTimeout(() => {
        setProcessingLabel('Approving payment…')
        setTimeout(() => setStep('success'), 1200)
      }, 1400)
    } else {
      setStep('otp')
    }
  }

  function verifyOtp() {
    if (otp.length < OTP_LEN) { setOtpError(true); return }
    setOtpError(false)
    setProcessingLabel('Verifying OTP…')
    setStep('processing')
    setTimeout(() => setStep('success'), 1400)
  }

  function handleOtpChange(val: string) {
    const clean = val.replace(/\D/g, '').slice(0, OTP_LEN)
    setOtp(clean)
    setOtpError(false)
  }

  return (
    <section className="screen payment-screen">

      {/* Header */}
      {step !== 'success' && (
        <div className="pay-header">
          {step === 'method' && (
            <button className="pay-back" onClick={() => go('cart')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {step === 'otp' && (
            <button className="pay-back" onClick={() => setStep('method')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <div className="pay-header-title">
            {step === 'method' && 'Payment'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'processing' && 'Processing'}
          </div>
          <div style={{ width: 28 }} />
        </div>
      )}

      {/* Amount pill */}
      {(step === 'method' || step === 'otp') && (
        <div className="pay-amount-pill">
          <span className="pay-amount-label">Total to pay</span>
          <span className="pay-amount-value">{fmt(pendingTotal)}</span>
        </div>
      )}

      {/* STEP: Method selection */}
      {step === 'method' && (
        <div className="pay-method-list">
          {METHODS.map(m => (
            <button key={m.key} className="pay-method-item" onClick={() => selectMethod(m.key)}>
              <div className="pay-method-icon">
                {m.key === 'gpay' ? <GPayLogo /> : m.icon}
              </div>
              <div className="pay-method-text">
                <div className="pay-method-label">{m.label}</div>
                <div className="pay-method-sub">{m.sub}</div>
              </div>
              <svg className="pay-method-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
          <div className="pay-secure-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            100% secure · SSL encrypted
          </div>
        </div>
      )}

      {/* STEP: OTP */}
      {step === 'otp' && (
        <div className="otp-wrap">
          <div className="otp-desc">
            {method === 'card'
              ? 'Enter the OTP sent to your registered mobile number'
              : 'Enter the OTP to approve your BNPL payment'}
          </div>
          <div className="otp-field-wrap" onClick={() => inputRef.current?.focus()}>
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              maxLength={OTP_LEN}
              value={otp}
              onChange={e => handleOtpChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && verifyOtp()}
              className="otp-hidden-input"
              autoComplete="one-time-code"
            />
            <div className="otp-boxes">
              {Array.from({ length: OTP_LEN }).map((_, i) => (
                <div
                  key={i}
                  className={
                    'otp-box' +
                    (otp[i] ? ' filled' : '') +
                    (i === otp.length ? ' cursor' : '') +
                    (otpError ? ' error' : '')
                  }
                >
                  {otp[i] ?? ''}
                </div>
              ))}
            </div>
          </div>
          {otpError && <div className="otp-error">Please enter all 6 digits</div>}
          <button className="otp-resend" onClick={() => {}}>Resend OTP</button>
          <button
            className={'cta otp-verify-btn' + (otp.length < OTP_LEN ? ' disabled' : '')}
            onClick={verifyOtp}
          >
            Verify & Pay {fmt(pendingTotal)}
          </button>
        </div>
      )}

      {/* STEP: Processing */}
      {step === 'processing' && (
        <div className="pay-processing-wrap">
          <div className="pay-spinner" />
          <div className="pay-processing-label">{processingLabel}</div>
          {method === 'gpay' && (
            <div className="pay-processing-sub">Please wait while we confirm with Google Pay</div>
          )}
        </div>
      )}

      {/* STEP: Success */}
      {step === 'success' && (
        <div className="pay-success-wrap">
          <div className="pay-success-ring">
            <div className="pay-success-check">✓</div>
          </div>
          <div className="pay-success-title">Payment successful</div>
          <div className="pay-success-amount">{fmt(pendingTotal)}</div>
          <div className="pay-success-method">
            {method === 'gpay' && 'Paid via Google Pay'}
            {method === 'card' && 'Paid via Card'}
            {method === 'bnpl' && 'Approved via Buy Now Pay Later'}
            {method === 'cod' && 'Cash on Delivery confirmed'}
          </div>
          <div className="pay-success-redirect">
            <div className="pay-redirect-dot" />
            Tracking your order…
          </div>
        </div>
      )}

    </section>
  )
}
