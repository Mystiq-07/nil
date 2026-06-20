import { useState, useRef, useEffect } from 'react'
import { useNil } from '../store'
import { SearchIcon } from '../components/ui'
import type { Restaurant } from '../types'

const CUISINE_BG: Record<string, string> = {
  'north indian': '#FFF3E0',
  'south indian': '#E8F5E9',
  italian: '#FFEBEE',
  chinese: '#FFF8E1',
  cafe: '#FAF3EA',
  rolls: '#EDE7F6',
  'multi-cuisine': '#E3F2FD',
  'fast food': '#FFF8E1',
  desserts: '#FCE4EC',
  seafood: '#E0F7FA',
  pizza: '#FFEBEE',
  burgers: '#FFF3E0',
}

const CUISINE_EMOJI: Record<string, string> = {
  'north indian': '🍛',
  'south indian': '🥞',
  italian: '🍕',
  chinese: '🥟',
  cafe: '☕',
  rolls: '🌯',
  'multi-cuisine': '🍽️',
  'fast food': '🍔',
  desserts: '🍰',
  seafood: '🦐',
  pizza: '🍕',
  burgers: '🍔',
}

const CUISINE_CHIPS = [
  { key: 'all', label: 'All', emoji: '🍽️' },
  { key: 'north indian', label: 'Biryani', emoji: '🍛' },
  { key: 'italian', label: 'Pizza', emoji: '🍕' },
  { key: 'south indian', label: 'South Indian', emoji: '🥞' },
  { key: 'chinese', label: 'Chinese', emoji: '🥟' },
  { key: 'cafe', label: 'Cafe', emoji: '☕' },
  { key: 'rolls', label: 'Rolls', emoji: '🌯' },
]

const CHIP_ALIASES: Record<string, string[]> = {
  'north indian': ['north indian', 'mughlai', 'biryani'],
  'italian': ['italian', 'pizza'],
  'south indian': ['south indian', 'dosa', 'udupi'],
  'chinese': ['chinese', 'asian'],
  'cafe': ['cafe', 'bakery', 'dessert', 'coffee_shop'],
  'rolls': ['rolls', 'kathi'],
}

const SEARCH_SUGGESTIONS = ['Biryani', 'Pizza', 'Dosa', 'Momos', 'Noodles', 'Cafe', 'Burger', 'Rolls']

const OFFERS = [
  '50% OFF up to ₹100',
  'Flat ₹40 OFF above ₹199',
  '20% OFF up to ₹80',
  'Flat ₹50 OFF above ₹149',
  'Items starting ₹79',
  '30% OFF up to ₹75',
  '₹60 OFF above ₹299',
  'Buy 2 Get 1 FREE',
]

const SORT_OPTIONS = [
  { key: 'default', label: 'Relevance' },
  { key: 'rating', label: 'Rating' },
  { key: 'eta', label: 'Delivery time' },
  { key: 'fee', label: 'Delivery fee' },
]

type SortKey = 'default' | 'rating' | 'eta' | 'fee'

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function getOffer(r: Restaurant): string {
  return OFFERS[hashStr(r.id) % OFFERS.length]
}

function toTitleCase(s: string): string {
  return s.split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1) : w).join(' ')
}

function RestaurantCard({ r, onClick }: { r: Restaurant; onClick: () => void }) {
  const bg = CUISINE_BG[r.cuisine] ?? '#F5F5F5'
  const emoji = CUISINE_EMOJI[r.cuisine] ?? '🍽️'
  const offer = getOffer(r)
  const cuisineLabel = toTitleCase(r.cuisine)
  const isFast = r.eta <= 30

  return (
    <div className="rest-card" onClick={onClick}>
      <div className="rest-img-area" style={{ background: bg }}>
        <div className="rest-img-pattern" />
        <span className="rest-emoji">{emoji}</span>
        <div className="rest-heart">♡</div>
        <div className="rest-offer-badge">{offer}</div>
        <div className="rest-eta-chip">{r.eta}–{r.eta + 10} MINS</div>
      </div>
      <div className="rest-body">
        <div className="rest-name">{r.name}</div>
        <div className="rest-meta-row">
          <span className="rating-badge">★ {r.rating.toFixed(1)}</span>
          <span className="meta-sep">·</span>
          <span className="meta-txt">{r.eta}–{r.eta + 10} mins</span>
          {isFast && <><span className="meta-sep">·</span><span className="fast-tag">⚡ Fast</span></>}
          <span className="meta-sep">·</span>
          <span className="rest-cuisine">{cuisineLabel}</span>
        </div>
      </div>
    </div>
  )
}

function FilterSheet({
  sort, setSort,
  minRating, setMinRating,
  fastOnly, setFastOnly,
  freeDelivery, setFreeDelivery,
  onClose, onReset,
}: {
  sort: SortKey; setSort: (s: SortKey) => void
  minRating: number; setMinRating: (n: number) => void
  fastOnly: boolean; setFastOnly: (b: boolean) => void
  freeDelivery: boolean; setFreeDelivery: (b: boolean) => void
  onClose: () => void; onReset: () => void
}) {
  return (
    <div className="filter-sheet-overlay" onClick={onClose}>
      <div className="filter-sheet" onClick={e => e.stopPropagation()}>
        <div className="filter-sheet-header">
          <span className="filter-sheet-title">Sort & Filter</span>
          <button className="filter-sheet-close" onClick={onClose}>✕</button>
        </div>

        <div className="filter-section">
          <div className="filter-section-label">Sort by</div>
          <div className="filter-sort-row">
            {SORT_OPTIONS.map(o => (
              <button
                key={o.key}
                className={'filter-sort-chip' + (sort === o.key ? ' active' : '')}
                onClick={() => setSort(o.key as SortKey)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-label">Minimum rating</div>
          <div className="filter-sort-row">
            {[0, 3.5, 4.0, 4.5].map(r => (
              <button
                key={r}
                className={'filter-sort-chip' + (minRating === r ? ' active' : '')}
                onClick={() => setMinRating(r)}
              >
                {r === 0 ? 'Any' : `★ ${r}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-label">Preferences</div>
          <div className="filter-toggle-row" onClick={() => setFastOnly(!fastOnly)}>
            <span>⚡ Near & Fast (under 30 min)</span>
            <div className={'filter-toggle' + (fastOnly ? ' on' : '')} />
          </div>
          <div className="filter-toggle-row" onClick={() => setFreeDelivery(!freeDelivery)}>
            <span>🆓 Free delivery only</span>
            <div className={'filter-toggle' + (freeDelivery ? ' on' : '')} />
          </div>
        </div>

        <div className="filter-sheet-footer">
          <button className="filter-reset" onClick={onReset}>Reset</button>
          <button className="cta filter-apply" onClick={onClose}>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default function Restaurants() {
  const { restaurants, restaurantsLoading, selectRestaurant } = useNil()
  const [q, setQ] = useState('')
  const [activeChip, setActiveChip] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sort, setSort] = useState<SortKey>('default')
  const [minRating, setMinRating] = useState(0)
  const [fastOnly, setFastOnly] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const activeFilterCount = (sort !== 'default' ? 1 : 0) + (minRating > 0 ? 1 : 0) + (fastOnly ? 1 : 0)

  const resetFilters = () => {
    setSort('default')
    setMinRating(0)
    setFastOnly(false)
  }

  const items = restaurants
    .filter(r => {
      const lq = q.toLowerCase()
      const matchQ = !q || r.name.toLowerCase().includes(lq) || r.cuisine.toLowerCase().includes(lq)
      const aliases = CHIP_ALIASES[activeChip] ?? [activeChip]
      const matchChip = activeChip === 'all' || aliases.includes(r.cuisine)
      const matchRating = r.rating >= minRating
      const matchFast = !fastOnly || r.eta <= 30
      return matchQ && matchChip && matchRating && matchFast
    })
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'eta') return a.eta - b.eta
      if (sort === 'fee') return a.deliveryFee - b.deliveryFee
      return 0
    })

  return (
    <section className="screen" style={{ paddingBottom: 'var(--chrome-bottom)' }}>
      {/* Search bar */}
      <div className="searchbar" onClick={() => searchRef.current?.focus()}>
        <SearchIcon />
        <input
          ref={searchRef}
          placeholder="Search restaurants or cuisines…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        {q && (
          <button
            className="search-clear"
            onClick={e => { e.stopPropagation(); setQ('') }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Search suggestions */}
      {!q && (
        <div className="search-suggestions">
          <span className="search-suggestions-label">Try</span>
          {SEARCH_SUGGESTIONS.map(s => (
            <button key={s} className="search-suggestion-pill" onClick={() => setQ(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Cuisine circles */}
      <div className="cuisine-chips">
        {CUISINE_CHIPS.map(c => (
          <div
            key={c.key}
            className={'cuisine-chip' + (activeChip === c.key ? ' active' : '')}
            onClick={() => setActiveChip(c.key)}
          >
            <div className="cuisine-chip-circle">{c.emoji}</div>
            <span className="cuisine-chip-label">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="filter-row">
        <div
          className={'filter-pill' + (activeFilterCount > 0 ? ' active' : '')}
          onClick={() => setFilterOpen(true)}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </div>
        <div
          className={'filter-pill' + (fastOnly ? ' active' : '')}
          onClick={() => setFastOnly(v => !v)}
        >
          ⚡ Near &amp; Fast
        </div>
        <div
          className={'filter-pill' + (minRating >= 4 ? ' active' : '')}
          onClick={() => setMinRating(prev => prev >= 4 ? 0 : 4)}
        >
          ★ 4.0+
        </div>
      </div>

      {/* State messaging */}
      {restaurantsLoading && (
        <div className="rest-empty-state">
          <div className="rest-empty-emoji">📍</div>
          <div className="rest-empty-title">Finding what's nearby…</div>
        </div>
      )}
      {!restaurantsLoading && items.length === 0 && (
        <div className="rest-empty-state">
          <div className="rest-empty-emoji">{q ? '🔍' : '😶'}</div>
          <div className="rest-empty-title">
            {q ? `Nothing for "${q}"` : 'No restaurants match your filters'}
          </div>
          <div className="rest-empty-sub">
            {q ? 'Try a different name or cuisine' : 'Try loosening the filters'}
          </div>
          {(q || activeFilterCount > 0) && (
            <button className="textlink" style={{ marginTop: 12 }} onClick={() => { setQ(''); resetFilters() }}>
              Clear all
            </button>
          )}
        </div>
      )}
      {/* Restaurant sections */}
      {!restaurantsLoading && items.length > 0 && (() => {
        const isFiltered = q || activeFilterCount > 0 || activeChip !== 'all'
        if (isFiltered) {
          return (
            <>
              <div className="section-header">{items.length} restaurant{items.length !== 1 ? 's' : ''} found</div>
              {items.map(r => <RestaurantCard key={r.id} r={r} onClick={() => selectRestaurant(r)} />)}
            </>
          )
        }
        // Unfiltered: split into Popular + More
        const sorted = [...items].sort((a, b) => b.rating - a.rating)
        const popular = sorted.slice(0, 5)
        const more = sorted.slice(5)
        return (
          <>
            <div className="section-header">Popular near you</div>
            {popular.map(r => <RestaurantCard key={r.id} r={r} onClick={() => selectRestaurant(r)} />)}
            {more.length > 0 && (
              <>
                <div className="section-header" style={{ marginTop: 4 }}>More options</div>
                {more.map(r => <RestaurantCard key={r.id} r={r} onClick={() => selectRestaurant(r)} />)}
              </>
            )}
          </>
        )
      })()}

      <div style={{ height: 10 }} />

      {/* Filter sheet */}
      {filterOpen && (
        <FilterSheet
          sort={sort} setSort={setSort}
          minRating={minRating} setMinRating={setMinRating}
          fastOnly={fastOnly} setFastOnly={setFastOnly}
          freeDelivery={false} setFreeDelivery={() => {}}
          onClose={() => setFilterOpen(false)}
          onReset={resetFilters}
        />
      )}
    </section>
  )
}
