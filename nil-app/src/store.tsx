import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, type ReactNode } from 'react'
import type { Screen, Theme, Cart, Stats, LedgerEntry, Restaurant, MenuItem } from './types'
import { menuFor } from './data'
import { fetchNearbyRestaurants } from './restaurant'

const STATS_KEY = 'nil_stats'
const THEME_KEY = 'nil_theme'

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (s && typeof s.kept === 'number') return s as Stats
    }
  } catch { /* ignore */ }
  return { kept: 0, count: 0, ledger: [] }
}

function loadTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY)
    if (t === 'light' || t === 'dark') return t
  } catch { /* ignore */ }
  return 'light'
}

function whenLabel(): string {
  const h = new Date().getHours()
  if (h >= 22 || h < 5) return 'Tonight'
  if (h < 12) return 'This morning'
  if (h < 17) return 'Today'
  return 'This evening'
}

// Per-restaurant cart entry
export interface RestaurantCart {
  restaurant: Restaurant
  items: Cart          // itemId → qty
  menu: MenuItem[]
}

interface NilContext {
  screen: Screen
  theme: Theme
  cart: Cart           // selected restaurant's cart (for Browse.tsx)
  allCarts: Record<string, RestaurantCart>
  stats: Stats
  pendingTotal: number
  orderPlacedAt: number | null
  orderTotalDuration: number | null
  toast: string | null
  nudgeOpen: boolean
  restaurants: Restaurant[]
  restaurantsLoading: boolean
  selectedRestaurant: Restaurant | null
  menu: MenuItem[]
  go: (s: Screen) => void
  toggleTheme: () => void
  selectRestaurant: (r: Restaurant) => void
  add: (id: string) => void
  setQty: (id: string, d: number) => void
  setQtyForRestaurant: (restaurantId: string, itemId: string, d: number) => void
  clearRestaurantCart: (restaurantId: string) => void
  clearAllCarts: () => void
  count: () => number
  total: () => number
  placeOrder: (grandTotal: number) => void
  confirmPayment: () => void
  commitLetGo: () => void
  orderForReal: () => void
  showToast: (m: string) => void
  openNudge: () => void
  closeNudge: () => void
}

const Ctx = createContext<NilContext | null>(null)

export function useNil(): NilContext {
  const c = useContext(Ctx)
  if (!c) throw new Error('useNil must be used within NilProvider')
  return c
}

export function NilProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [theme, setTheme] = useState<Theme>(loadTheme)
  // allCarts: restaurantId → RestaurantCart
  const [allCarts, setAllCarts] = useState<Record<string, RestaurantCart>>({})
  const [stats, setStats] = useState<Stats>(loadStats)
  const [pendingTotal, setPending] = useState(0)
  const [orderPlacedAt, setOrderPlacedAt] = useState<number | null>(null)
  const [orderTotalDuration, setOrderTotalDuration] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [nudgeOpen, setNudgeOpen] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [restaurantsLoading, setRestaurantsLoading] = useState(true)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    fetchNearbyRestaurants().then((r) => {
      setRestaurants(r)
      setRestaurantsLoading(false)
    })
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name=theme-color]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#FAF8F4' : '#201C18')
    try { localStorage.setItem(THEME_KEY, theme) } catch { /* ignore */ }
  }, [theme])

  useEffect(() => {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)) } catch { /* ignore */ }
  }, [stats])

  const menu = useMemo(() => (selectedRestaurant ? menuFor(selectedRestaurant) : []), [selectedRestaurant])

  // Browse.tsx uses `cart` to show qty — expose the selected restaurant's sub-cart
  const cart = useMemo(
    () => selectedRestaurant ? (allCarts[selectedRestaurant.id]?.items ?? {}) : {},
    [allCarts, selectedRestaurant],
  )

  const count = useCallback(
    () => Object.values(allCarts).reduce((total, rc) =>
      total + Object.values(rc.items).reduce((a, b) => a + b, 0), 0),
    [allCarts],
  )

  const total = useCallback(
    () => Object.values(allCarts).reduce((grand, rc) =>
      grand + Object.entries(rc.items).reduce((t, [id, q]) => {
        const item = rc.menu.find((x) => x.id === id)
        return t + (item ? item.price * q : 0)
      }, 0), 0),
    [allCarts],
  )

  const showToast = useCallback((m: string) => {
    setToast(m)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1700)
  }, [])

  const go = useCallback((s: Screen) => setScreen(s), [])
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  const selectRestaurant = useCallback((r: Restaurant) => {
    setSelectedRestaurant(r)
    setScreen('browse')
  }, [])

  const add = useCallback((id: string) => {
    if (!selectedRestaurant) return
    const restId = selectedRestaurant.id
    setAllCarts((prev) => {
      const existing = prev[restId] ?? { restaurant: selectedRestaurant, items: {}, menu: menuFor(selectedRestaurant) }
      return {
        ...prev,
        [restId]: {
          ...existing,
          items: { ...existing.items, [id]: (existing.items[id] ?? 0) + 1 },
        },
      }
    })
    showToast('Added to cart.')
  }, [selectedRestaurant, showToast])

  // Used by Browse.tsx steppers — always operates on selectedRestaurant's cart
  const setQty = useCallback((id: string, d: number) => {
    if (!selectedRestaurant) return
    const restId = selectedRestaurant.id
    setAllCarts((prev) => {
      const existing = prev[restId]
      if (!existing) return prev
      const items = { ...existing.items }
      items[id] = (items[id] ?? 0) + d
      if (items[id] <= 0) delete items[id]
      const updated = { ...prev, [restId]: { ...existing, items } }
      if (Object.keys(items).length === 0) delete updated[restId]
      return updated
    })
  }, [selectedRestaurant])

  // Used by Cart.tsx — operates on a specific restaurant's cart
  const setQtyForRestaurant = useCallback((restaurantId: string, itemId: string, d: number) => {
    setAllCarts((prev) => {
      const existing = prev[restaurantId]
      if (!existing) return prev
      const items = { ...existing.items }
      items[itemId] = (items[itemId] ?? 0) + d
      if (items[itemId] <= 0) delete items[itemId]
      const updated = { ...prev, [restaurantId]: { ...existing, items } }
      if (Object.keys(items).length === 0) delete updated[restaurantId]
      return updated
    })
  }, [])

  const clearRestaurantCart = useCallback((restaurantId: string) => {
    setAllCarts((prev) => {
      const n = { ...prev }
      delete n[restaurantId]
      return n
    })
  }, [])

  const clearAllCarts = useCallback(() => setAllCarts({}), [])

  const MIN_DURATION = 30_000
  const MAX_DURATION = 60_000

  const placeOrder = useCallback((grandTotal: number) => {
    if (grandTotal <= 0) { setScreen('browse'); return }
    setPending(grandTotal)
    setScreen('payment')
  }, [])

  const confirmPayment = useCallback(() => {
    const duration = MIN_DURATION + Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION))
    setOrderPlacedAt(Date.now())
    setOrderTotalDuration(duration)
    setScreen('tracking')
  }, [])

  const orderForReal = useCallback(() => showToast('All yours. We\'ll be here.'), [showToast])

  const commitLetGo = useCallback(() => {
    setStats((s) => {
      const firstCart = Object.values(allCarts)[0]
      const firstItemId = firstCart ? Object.keys(firstCart.items)[0] : undefined
      const fm = firstItemId ? firstCart.menu.find((x) => x.id === firstItemId) : undefined
      const entry: LedgerEntry = {
        label: 'let go of ' + (fm ? fm.name.toLowerCase() : 'a craving'),
        when: whenLabel(),
        ts: Date.now(),
      }
      return { kept: s.kept + pendingTotal, count: s.count + 1, ledger: [entry, ...s.ledger].slice(0, 12) }
    })
    setAllCarts({})
    setPending(0)
    setOrderPlacedAt(null)
    setOrderTotalDuration(null)
    setScreen('restaurants')
    showToast('Nice. You rode it out.')
  }, [allCarts, pendingTotal, showToast])

  const openNudge = useCallback(() => setNudgeOpen(true), [])
  const closeNudge = useCallback(() => setNudgeOpen(false), [])

  const value: NilContext = {
    screen, theme, cart, allCarts, stats, pendingTotal, orderPlacedAt, orderTotalDuration, toast, nudgeOpen,
    restaurants, restaurantsLoading, selectedRestaurant, menu,
    go, toggleTheme, selectRestaurant, add, setQty, setQtyForRestaurant, clearRestaurantCart, clearAllCarts,
    count, total, placeOrder, confirmPayment, commitLetGo, orderForReal, showToast, openNudge, closeNudge,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
