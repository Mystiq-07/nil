import { useState } from 'react'
import { useNil } from '../store'
import { fmt } from '../util'

const TIP_AMOUNTS = [20, 30, 50]

export default function Cart() {
  const { allCarts, setQtyForRestaurant, clearRestaurantCart, clearAllCarts, total, placeOrder, orderForReal } = useNil()
  const [tip, setTip] = useState(0)

  const cartEntries = Object.entries(allCarts)
  const subtotal = total()
  const deliveryFee = subtotal > 299 ? 0 : cartEntries.length * 30
  const offerDiscount = subtotal > 199 ? 50 : 0
  const grandTotal = subtotal + deliveryFee - offerDiscount + tip
  const totalSavings = offerDiscount + (subtotal > 299 ? cartEntries.length * 30 : 0)

  if (cartEntries.length === 0) {
    return (
      <section className="screen cart-screen">
        <div className="cart-empty">
          <div style={{ fontSize: 40 }}>🛒</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-bold)' }}>Your cart is empty</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Add items from a restaurant to get started</div>
        </div>
      </section>
    )
  }

  return (
    <section className="screen cart-screen">

      {/* Header */}
      <div className="mc-header">
        <div className="mc-header-title">Your Carts <span className="mc-header-count">{cartEntries.length}</span></div>
        <button className="mc-clear-all" onClick={clearAllCarts}>Clear all</button>
      </div>

      {/* Savings banner */}
      {totalSavings > 0 && (
        <div className="cart-savings-banner">
          <span>🎉</span>
          <span>You're saving <strong>{fmt(totalSavings)}</strong> on this order</span>
        </div>
      )}

      {/* Per-restaurant cards */}
      {cartEntries.map(([restId, rc]) => {
        const itemEntries = Object.entries(rc.items)
        const restSubtotal = itemEntries.reduce((t, [id, q]) => {
          const item = rc.menu.find((x) => x.id === id)
          return t + (item ? item.price * q : 0)
        }, 0)

        return (
          <div key={restId} className="mc-rest-card">
            {/* Restaurant header */}
            <div className="mc-rest-header">
              <div className="mc-rest-info">
                <div className="mc-rest-name">{rc.restaurant.name}</div>
                <div className="mc-rest-meta">
                  {itemEntries.length} item{itemEntries.length !== 1 ? 's' : ''} · {fmt(restSubtotal)}
                </div>
              </div>
              <button className="mc-remove-rest" onClick={() => clearRestaurantCart(restId)}>✕</button>
            </div>

            {/* Items */}
            {itemEntries.map(([id, qty]) => {
              const item = rc.menu.find((x) => x.id === id)
              if (!item) return null
              const veg = item.veg !== false
              return (
                <div className="mc-item-row" key={id}>
                  <div className="mc-item-veg">
                    <div style={{
                      width: 13, height: 13, borderRadius: 2, flexShrink: 0,
                      border: `1.5px solid ${veg ? 'var(--veg-color)' : 'var(--nonveg-color)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: veg ? 'var(--veg-color)' : 'var(--nonveg-color)' }} />
                    </div>
                  </div>
                  <span className="mc-item-name">{item.name}</span>
                  <div className="mc-item-stepper">
                    <button className="stepper-btn" onClick={() => setQtyForRestaurant(restId, id, -1)}>−</button>
                    <span className="stepper-num">{qty}</span>
                    <button className="stepper-btn" onClick={() => setQtyForRestaurant(restId, id, 1)}>+</button>
                  </div>
                  <span className="mc-item-price">{fmt(item.price * qty)}</span>
                </div>
              )
            })}
          </div>
        )
      })}

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
          <span>Delivery fee{cartEntries.length > 1 ? ` (×${cartEntries.length})` : ''}</span>
          <span style={{ color: deliveryFee === 0 ? 'var(--money)' : 'var(--text)' }}>
            {deliveryFee === 0 ? 'FREE' : fmt(deliveryFee)}
          </span>
        </div>
        {tip > 0 && <div className="billing-row"><span>Rider tip</span><span>{fmt(tip)}</span></div>}
        <div className="billing-total"><span>To pay</span><span>{fmt(grandTotal)}</span></div>
      </div>

      {/* Tip */}
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
            <button key={t} className={'cart-tip-btn' + (tip === t ? ' active' : '')} onClick={() => setTip(prev => prev === t ? 0 : t)}>
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

      {/* Sticky bottom CTA */}
      <div className="cart-cta-sticky">
        <button className="cta" onClick={() => placeOrder(grandTotal)}>
          Place order{cartEntries.length > 1 ? ' for all' : ''} · {fmt(grandTotal)}
        </button>
        <button className="textlink order-for-real-link" onClick={orderForReal}>order it for real instead</button>
      </div>

    </section>
  )
}
