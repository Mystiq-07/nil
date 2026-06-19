import { useState, useRef } from 'react'
import { useNil } from '../store'
import { SearchIcon } from '../components/ui'
import { fmt } from '../util'
import type { MenuItem } from '../types'

function VegBox({ veg }: { veg: boolean }) {
  return (
    <div className={'veg-box' + (veg ? '' : ' nonveg')}>
      <div className="veg-dot" />
    </div>
  )
}

function ItemSheet({ item, onClose, onAdd }: { item: MenuItem; onClose: () => void; onAdd: () => void }) {
  const veg = item.veg !== false
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-photo" style={{ background: item.tone + '40' }}>
          {item.emoji}
        </div>
        <div className="sheet-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <VegBox veg={veg} />
            {item.bestseller && <span className="best-tag">★★ Bestseller</span>}
          </div>
          <div className="sheet-name">{item.name}</div>
          {item.description && <div className="sheet-desc">{item.description}</div>}
          <div className="sheet-footer">
            <div className="sheet-price">{fmt(item.price)}</div>
            <button className="sheet-add-btn" onClick={() => { onAdd(); onClose() }}>
              Add item
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function groupByCategory(items: MenuItem[]): [string, MenuItem[]][] {
  const map = new Map<string, MenuItem[]>()
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, [])
    map.get(item.category)!.push(item)
  }
  return Array.from(map.entries())
}

export default function Browse() {
  const { count, total, go, menu, selectedRestaurant, add, cart } = useNil()
  const [q, setQ] = useState('')
  const [sheetItem, setSheetItem] = useState<MenuItem | null>(null)
  const [activeCat, setActiveCat] = useState('Recommended')
  const screenRef = useRef<HTMLElement>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const c = count()

  const filtered = q ? menu.filter(m => m.name.toLowerCase().includes(q.toLowerCase())) : menu
  const bestsellers = !q ? menu.filter(m => m.bestseller) : []
  const groups = groupByCategory(filtered)
  // deduplicate: 'Recommended' is handled by the bestsellers section above
  const categoryGroups = groups.filter(([cat]) => cat !== 'Recommended')
  const allCats = ['Recommended', ...categoryGroups.map(([cat]) => cat)]

  const getQty = (id: string) => cart[id] || 0

  function scrollToSection(cat: string) {
    setActiveCat(cat)
    const el = sectionRefs.current[cat]
    const screen = screenRef.current
    if (!el || !screen) return
    const offset = el.offsetTop - 110 // account for sticky chips + searchbar
    screen.scrollTo({ top: offset, behavior: 'smooth' })
  }

  return (
    <>
      <section
        ref={screenRef}
        className="screen"
        style={{ paddingBottom: c > 0 ? 'calc(var(--chrome-bottom) + 68px)' : 'var(--chrome-bottom)' }}
      >
        {/* Restaurant info card */}
        {selectedRestaurant && (
          <div className="browse-rest-card">
            <div className="browse-rest-name">{selectedRestaurant.name}</div>
            <div className="browse-meta">
              <span className="rating-badge">★ {selectedRestaurant.rating.toFixed(1)}</span>
              <span className="meta-sep">·</span>
              <span className="meta-txt">{selectedRestaurant.eta}–{selectedRestaurant.eta + 10} mins</span>
              <span className="meta-sep">·</span>
              <span className="meta-txt">
                {selectedRestaurant.deliveryFee === 0 ? 'Free delivery' : `₹${selectedRestaurant.deliveryFee} delivery`}
              </span>
            </div>
          </div>
        )}

        {/* Offer bar */}
        {selectedRestaurant && (
          <div className="offer-bar">
            🏷{' '}
            {selectedRestaurant.deliveryFee === 0
              ? 'Free delivery on this order'
              : 'Flat ₹50 OFF above ₹199 · Use code NIL50'}
          </div>
        )}

        {/* Category chips */}
        <div className="menu-cat-chips">
          {allCats.map(cat => (
            <div
              key={cat}
              className={'menu-cat-chip' + (activeCat === cat ? ' active' : '')}
              onClick={() => scrollToSection(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Search within restaurant */}
        <div className="searchbar" style={{ margin: '6px 16px 0' }}>
          <SearchIcon />
          <input
            placeholder={`Search in ${selectedRestaurant?.name ?? 'menu'}…`}
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          {q && (
            <button className="search-clear" onClick={() => setQ('')}>✕</button>
          )}
        </div>

        {/* Bestsellers / Recommended */}
        {bestsellers.length > 0 && !q && (
          <div
            className="food-section"
            ref={el => { sectionRefs.current['Recommended'] = el }}
          >
            <div className="food-cat-header">Recommended ({bestsellers.length})</div>
            {bestsellers.map(m => (
              <FoodRow
                key={m.id}
                item={m}
                qty={getQty(m.id)}
                onTap={() => setSheetItem(m)}
                onAdd={() => add(m.id)}
                onRemove={() => {}}
              />
            ))}
          </div>
        )}

        {/* Category sections */}
        {categoryGroups.map(([cat, items]) => (
          <div
            key={cat}
            className="food-section"
            ref={el => { sectionRefs.current[cat] = el }}
          >
            <div className="food-cat-header">{cat} ({items.length})</div>
            {items.map(m => (
              <FoodRow
                key={m.id}
                item={m}
                qty={getQty(m.id)}
                onTap={() => setSheetItem(m)}
                onAdd={() => add(m.id)}
                onRemove={() => {}}
              />
            ))}
          </div>
        ))}

        <div style={{ height: 16 }} />
      </section>

      {/* Cart bar */}
      {c > 0 && (
        <div className="cartbar" onClick={() => go('cart')}>
          <span style={{ fontSize: 12, opacity: 0.9 }}>{c} item{c !== 1 ? 's' : ''} added</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>View cart</span>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{fmt(total())} →</span>
        </div>
      )}

      {/* Item detail sheet */}
      {sheetItem && (
        <ItemSheet
          item={sheetItem}
          onClose={() => setSheetItem(null)}
          onAdd={() => add(sheetItem.id)}
        />
      )}
    </>
  )
}

function FoodRow({
  item, qty, onTap, onAdd,
}: {
  item: MenuItem; qty: number; onTap: () => void; onAdd: () => void; onRemove: () => void
}) {
  const { setQty } = useNil()
  const veg = item.veg !== false

  return (
    <div className="food-item-row" style={{ cursor: 'pointer' }} onClick={onTap}>
      <div className="food-item-left">
        <VegBox veg={veg} />
        {item.bestseller && <div className="best-tag">★★ Bestseller</div>}
        <div className="food-item-name">{item.name}</div>
        {item.description && <div className="food-item-desc">{item.description}</div>}
        <div className="food-item-price">{fmt(item.price)}</div>
      </div>
      <div className="food-item-right">
        <div className="food-photo" style={{ background: item.tone + '33' }}>
          {item.emoji}
        </div>
        {qty > 0 ? (
          <div className="add-stepper" onClick={e => e.stopPropagation()}>
            <button className="stepper-btn" onClick={() => setQty(item.id, -1)}>−</button>
            <span className="stepper-num">{qty}</span>
            <button className="stepper-btn" onClick={() => { onAdd() }}>+</button>
          </div>
        ) : (
          <button
            className="add-float"
            onClick={e => { e.stopPropagation(); onAdd() }}
          >
            ADD +
          </button>
        )}
      </div>
    </div>
  )
}
