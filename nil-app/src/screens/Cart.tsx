import { useState } from 'react'
import { useNil } from '../store'
import { fmt } from '../util'

const TIP_AMOUNTS = [20, 30, 50]

export default function Cart() {
  const { cart, menu, setQty, total, placeOrder, orderForReal } = useNil()
  const [tip, setTip] = useState(0)
  const [note, setNote] = useState('')
  const keys = Object.keys(cart)
  const subtotal = total()
  const deliveryFee = subtotal > 299 ? 0 : 30
  const offerDiscount = subtotal > 199 ? 50 : 0
  const grandTotal = subtotal + deliveryFee - offerDiscount + tip
  const totalSavings = offerDiscount + (deliveryFee === 0 ? 30 : 0)

  return (
    <section className="screen cart-screen">

      {keys.length === 0 && (
        <div className="cart-empty">
          <div style={{ fontSize: 40 }}>🛒</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-bold)' }}>Your cart is empty</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Add items from a restaurant to get started</div>
        </div>
      )}

      {keys.length > 0 && (
        <>
          {/* Savings banner */}
          {totalSavings > 0 && (
            <div className="cart-savings-banner">
              <span className="cart-savings-icon">🎉</span>
              <span>You're saving <strong>{fmt(totalSavings)}</strong> on this order</span>
            </div>
          )}

          {/* Cart items */}
          <div className="cart-items-section">
            {keys.map((id) => {
              const m = menu.find((x) => x.id === id)
              if (!m) return null
              const veg = m.veg !== false
              return (
                <div className="cart-item" key={id}>
                  <div className="cart-item-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{
                        width: 13, height: 13, borderRadius: 2, flexShrink: 0,
                        border: `1.5px solid ${veg ? 'var(--veg-color)' : 'var(--nonveg-color)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: veg ? 'var(--veg-color)' : 'var(--nonveg-color)',
                        }} />
                      </div>
                      <div className="cart-item-name">{m.name}</div>
                    </div>
                    <div className="cart-item-unit">{fmt(m.price)} each</div>
                  </div>
                  <div className="qctl">
                    <button className="qbtn" onClick={() => setQty(id, -1)}>−</button>
                    <span className="qty-num">{cart[id]}</span>
                    <button className="qbtn" onClick={() => setQty(id, 1)}>+</button>
                  </div>
                  <div className="cart-item-total">{fmt(m.price * cart[id])}</div>
                </div>
              )
            })}
          </div>

          {/* Delivery instructions */}
          <div className="cart-note-section">
            <div className="cart-section-label">Delivery instructions</div>
            <textarea
              className="cart-note-input"
              placeholder="E.g. Leave at door, ring bell twice…"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
            />
          </div>

          {/* Billing */}
          <div className="billing-box">
            <div className="billing-heading">Billing details</div>
            <div className="billing-row"><span>Item total</span><span>{fmt(subtotal)}</span></div>
            {offerDiscount > 0 && (
              <div className="billing-row">
                <span>Offer discount <span className="billing-tag">NIL50</span></span>
                <span style={{ color: 'var(--money)' }}>− {fmt(offerDiscount)}</span>
              </div>
            )}
            <div className="billing-row">
              <span>Delivery fee</span>
              <span style={{ color: deliveryFee === 0 ? 'var(--money)' : 'var(--text)' }}>
                {deliveryFee === 0 ? 'FREE' : fmt(deliveryFee)}
              </span>
            </div>
            {tip > 0 && (
              <div className="billing-row">
                <span>Rider tip</span>
                <span>{fmt(tip)}</span>
              </div>
            )}
            <div className="billing-total"><span>To pay</span><span>{fmt(grandTotal)}</span></div>
          </div>

          {/* Tip the rider */}
          <div className="cart-tip-section">
            <div className="cart-tip-header">
              <span className="cart-tip-emoji">🙏</span>
              <div>
                <div className="cart-section-label">Tip your delivery partner</div>
                <div className="cart-tip-sub">100% goes directly to them</div>
              </div>
            </div>
            <div className="cart-tip-amounts">
              {TIP_AMOUNTS.map(t => (
                <button
                  key={t}
                  className={'cart-tip-btn' + (tip === t ? ' active' : '')}
                  onClick={() => setTip(prev => prev === t ? 0 : t)}
                >
                  ₹{t}
                </button>
              ))}
              <button
                className={'cart-tip-btn' + (!TIP_AMOUNTS.includes(tip) && tip > 0 ? ' active' : '')}
                onClick={() => {
                  const val = prompt('Enter tip amount')
                  const n = parseInt(val ?? '', 10)
                  if (n > 0) setTip(n)
                }}
              >
                Other
              </button>
            </div>
          </div>

          {/* Ritual message */}
          <div className="cart-ritual-msg">
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-bold)', marginBottom: 3 }}>You can have this.</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Just not right now. Ride it out.</div>
          </div>

          {/* Place order */}
          <div className="place-order-wrap">
            <button className="cta" onClick={placeOrder}>Place order · {fmt(grandTotal)}</button>
          </div>
          <div className="order-for-real">
            <button className="textlink" onClick={orderForReal}>order it for real instead</button>
          </div>
        </>
      )}
    </section>
  )
}
