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
        <div className="sheet-photo" style={{ background: item.tone + '40' }}>{item.emoji}</div>
        <div className="sheet-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <VegBox veg={veg} />
            {item.bestseller && <span className="best-tag">★★ Bestseller</span>}
          </div>
          <div className="sheet-name">{item.name}</div>
          {item.description && <div className="sheet-desc">{item.description}</div>}
          <div className="sheet-footer">
            <div className="sheet-price">{fmt(item.price)}</div>
            <button className="sheet-add-btn" onClick={() => { onAdd(); onClose() }}>Add item</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuPanel({ cats, onSelect, onClose }: {
  cats: [string, number][]; onSelect: (cat: string) => void; onClose: () => void
}) {
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="menu-panel" onClick={e => e.stopPropagation()}>
        <div className="menu-panel-header">
          <span className="menu-panel-title">Menu</span>
          <button className="filter-sheet-close" onClick={onClose}>✕</button>
        </div>
        {cats.map(([cat, count]) => (
          <div key={cat} className="menu-panel-row" onClick={() => { onSelect(cat); onClose() }}>
            <span>{cat}</span>
            <span className="menu-panel-count">{count}</span>
          </div>
        ))}
        <div style={{ height: 8 }} />
      </div>
    </div>
  )
}

function FoodCard({ item, qty, onTap, onAdd }: {
  item: MenuItem; qty: number; onTap: () => void; onAdd: () => void
}) {
  const { setQty } = useNil()
  const veg = item.veg !== false
  return (
    <div className="food-card" onClick={onTap}>
      <div className="food-card-photo" style={{ background: item.tone + '33' }}>
        <div className="food-card-vegbox"><VegBox veg={veg} /></div>
        <span>{item.emoji}</span>
        {qty > 0 ? (
          <div className="food-card-stepper" onClick={e => e.stopPropagation()}>
            <button className="stepper-btn" onClick={() => setQty(item.id, -1)}>−</button>
            <span className="stepper-num">{qty}</span>
            <button className="stepper-btn" onClick={onAdd}>+</button>
          </div>
        ) : (
          <button className="food-card-add" onClick={e => { e.stopPropagation(); onAdd() }}>ADD +</button>
        )}
      </div>
      <div className="food-card-body">
        {item.bestseller && <div className="best-tag" style={{ marginBottom: 4 }}>★★ Bestseller</div>}
        <div className="food-card-name">{item.name}</div>
        <div className="food-card-price">{fmt(item.price)}</div>
      </div>
    </div>
  )
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

const REORDER_LABELS = [
  'Ordered last time',
  'Ordered 3 days ago',
  'A regular pick',
  'Ordered last week',
]

function groupByCategory(items: MenuItem[]): [string, MenuItem[]][] {
  const map = new Map<string, MenuItem[]>()
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, [])
    map.get(item.category)!.push(item)
  }
  return Array.from(map.entries())
}

export default function Browse() {
  const { go, menu, selectedRestaurant, add, setQty, cart } = useNil()
  const [q, setQ] = useState('')
  const [sheetItem, setSheetItem] = useState<MenuItem | null>(null)
  const [menuPanelOpen, setMenuPanelOpen] = useState(false)
  const [activeCat, setActiveCat] = useState('Recommended')
  const screenRef = useRef<HTMLElement>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Per-restaurant count and total (not global across all carts)
  const c = Object.values(cart).reduce((a, b) => a + b, 0)
  const restTotal = Object.entries(cart).reduce((t, [id, q]) => {
    const item = menu.find(x => x.id === id)
    return t + (item ? item.price * q : 0)
  }, 0)

  const filtered = q ? menu.filter(m => m.name.toLowerCase().includes(q.toLowerCase())) : menu
  const bestsellers = !q ? menu.filter(m => m.bestseller) : []
  const groups = groupByCategory(filtered)
  const categoryGroups = groups.filter(([cat]) => cat !== 'Recommended')
  const allCats = ['Recommended', ...categoryGroups.map(([cat]) => cat)]

  // Fake "want to repeat" items — seeded by restaurant id so they're stable
  const freqItems = !q && selectedRestaurant ? (() => {
    const seed = hashStr(selectedRestaurant.id)
    const pool = menu.filter(m => !m.bestseller)
    if (pool.length < 2) return []
    const i1 = seed % pool.length
    const i2 = (seed * 7 + 3) % pool.length
    return i1 !== i2 ? [pool[i1], pool[i2]] : [pool[i1]]
  })() : []

  const catList: [string, number][] = [
    ['Recommended', bestsellers.length],
    ...categoryGroups.map(([cat, items]) => [cat, items.length] as [string, number]),
  ]

  const getQty = (id: string) => cart[id] || 0

  function scrollToSection(cat: string) {
    setActiveCat(cat)
    const el = sectionRefs.current[cat]
    const screen = screenRef.current
    if (!el || !screen) return
    const offset = el.offsetTop - 110
    screen.scrollTo({ top: offset, behavior: 'smooth' })
  }

  return (
    <>
      <section
        ref={screenRef}
        className="screen"
        style={{ paddingBottom: c > 0 ? 'calc(var(--chrome-bottom) + 68px)' : 'var(--chrome-bottom)' }}
      >
        {/* Restaurant info */}
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
            🏷 {selectedRestaurant.deliveryFee === 0 ? 'Free delivery on this order' : 'Flat ₹50 OFF above ₹199 · Use code NIL50'}
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

        {/* Search */}
        <div className="searchbar" style={{ margin: '6px 16px 0' }}>
          <SearchIcon />
          <input
            placeholder={`Search in ${selectedRestaurant?.name ?? 'menu'}…`}
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          {q && <button className="search-clear" onClick={() => setQ('')}>✕</button>}
        </div>

        {/* Want to repeat? */}
        {freqItems.length > 0 && (
          <div className="food-section">
            <div className="food-cat-header" style={{ paddingTop: 18 }}>Want to repeat?</div>
            <div className="freq-scroll">
              {freqItems.map((m, i) => {
                const labelIdx = (hashStr(m.id) + i) % REORDER_LABELS.length
                const veg = m.veg !== false
                const qty = getQty(m.id)
                return (
                  <div key={m.id} className="freq-card" onClick={() => setSheetItem(m)}>
                    <div className="freq-photo" style={{ background: m.tone + '33' }}>{m.emoji}</div>
                    <div className="freq-info">
                      <div className="freq-label">{REORDER_LABELS[labelIdx]}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <VegBox veg={veg} />
                        <span className="freq-name">{m.name}</span>
                      </div>
                      <div className="freq-price">{fmt(m.price)}</div>
                    </div>
                    {qty > 0 ? (
                      <div className="add-stepper-sm" onClick={e => e.stopPropagation()}>
                        <button className="stepper-btn" onClick={() => setQty(m.id, -1)}>−</button>
                        <span className="stepper-num">{qty}</span>
                        <button className="stepper-btn" onClick={() => add(m.id)}>+</button>
                      </div>
                    ) : (
                      <button className="add-float-sm" onClick={e => { e.stopPropagation(); add(m.id) }}>ADD</button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recommended — 2-col grid */}
        {bestsellers.length > 0 && !q && (
          <div className="food-section" ref={el => { sectionRefs.current['Recommended'] = el }}>
            <div className="food-cat-header">Recommended ({bestsellers.length})</div>
            <div className="food-grid">
              {bestsellers.map(m => (
                <FoodCard
                  key={m.id}
                  item={m}
                  qty={getQty(m.id)}
                  onTap={() => setSheetItem(m)}
                  onAdd={() => add(m.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other categories — list */}
        {categoryGroups.map(([cat, items]) => (
          <div key={cat} className="food-section" ref={el => { sectionRefs.current[cat] = el }}>
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

        <div style={{ height: 80 }} />
      </section>

      {/* Floating Menu button — floats above cart bar when items exist */}
      {!menuPanelOpen && (
        <button
          className="menu-fab"
          style={{ bottom: `calc(var(--tab-h) + var(--safe-bottom) + ${c > 0 ? '82px' : '14px'})` }}
          onClick={() => setMenuPanelOpen(true)}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
          Menu
        </button>
      )}

      {/* Cart bar */}
      {c > 0 && (
        <div className="cartbar" onClick={() => go('cart')}>
          <span style={{ fontSize: 12, opacity: 0.9 }}>{c} item{c !== 1 ? 's' : ''} added</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>View cart</span>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{fmt(restTotal)} →</span>
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

      {/* Menu panel */}
      {menuPanelOpen && (
        <MenuPanel
          cats={catList}
          onSelect={scrollToSection}
          onClose={() => setMenuPanelOpen(false)}
        />
      )}
    </>
  )
}

function FoodRow({ item, qty, onTap, onAdd }: {
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
        <div className="food-photo" style={{ background: item.tone + '33' }}>{item.emoji}</div>
        {qty > 0 ? (
          <div className="add-stepper" onClick={e => e.stopPropagation()}>
            <button className="stepper-btn" onClick={() => setQty(item.id, -1)}>−</button>
            <span className="stepper-num">{qty}</span>
            <button className="stepper-btn" onClick={() => onAdd()}>+</button>
          </div>
        ) : (
          <button className="add-float" onClick={e => { e.stopPropagation(); onAdd() }}>ADD +</button>
        )}
      </div>
    </div>
  )
}
