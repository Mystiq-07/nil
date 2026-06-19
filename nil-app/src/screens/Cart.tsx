import { useNil } from '../store'
import { fmt } from '../util'

export default function Cart() {
  const { cart, menu, setQty, total, placeOrder, orderForReal } = useNil()
  const keys = Object.keys(cart)
  const subtotal = total()
  const deliveryFee = subtotal > 299 ? 0 : 30
  const grandTotal = subtotal + deliveryFee

  return (
    <section className="screen" style={{ padding: '12px 16px', paddingBottom: 'calc(var(--chrome-bottom) + 40px)' }}>
      {keys.length === 0 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, paddingTop: 60, color: 'var(--muted)' }}>
          <div style={{ fontSize: 40 }}>🛒</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-bold)' }}>Your cart is empty</div>
          <div style={{ fontSize: 13 }}>Add items from a restaurant to get started</div>
        </div>
      )}

      {keys.map((id) => {
        const m = menu.find((x) => x.id === id)
        if (!m) return null
        return (
          <div className="cart-item" key={id}>
            <div className="cart-item-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 13, height: 13, borderRadius: 2, border: '1.5px solid var(--veg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--veg-color)' }} />
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

      {keys.length > 0 && (
        <>
          {/* Billing details */}
          <div className="billing-box">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-bold)', marginBottom: 8 }}>Billing details</div>
            <div className="billing-row"><span>Item total</span><span>{fmt(subtotal)}</span></div>
            <div className="billing-row">
              <span>Delivery fee</span>
              <span style={{ color: deliveryFee === 0 ? 'var(--money)' : 'var(--text)' }}>
                {deliveryFee === 0 ? 'FREE' : fmt(deliveryFee)}
              </span>
            </div>
            <div className="billing-total"><span>To pay</span><span>{fmt(grandTotal)}</span></div>
          </div>

          {deliveryFee === 0 && (
            <div className="savings-bar">✓ You're saving ₹30 on delivery</div>
          )}

          {/* Ritual message */}
          <div style={{ background: 'var(--surface)', borderRadius: 12, padding: '12px 14px', marginTop: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-bold)', marginBottom: 3 }}>You can have this.</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Just not right now. Ride it out.</div>
          </div>

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
