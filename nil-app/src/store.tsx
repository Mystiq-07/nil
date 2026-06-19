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

interface NilContext {
  screen: Screen
  theme: Theme
  cart: Cart
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
  count: () => number
  total: () => number
  placeOrder: () => void
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
  const [cart, setCart] = useState<Cart>({})
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

  const count = useCallback(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart])
  const total = useCallback(
    () => Object.entries(cart).reduce((t, [id, q]) => {
      const m = menu.find((x) => x.id === id)
      return t + (m ? m.price * q : 0)
    }, 0),
    [cart, menu],
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
    setCart({})
    setScreen('browse')
  }, [])
  const add = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
    showToast('Added to cart.')
  }, [showToast])
  const setQty = useCallback((id: string, d: number) => {
    setCart((c) => {
      const n = { ...c }
      n[id] = (n[id] || 0) + d
      if (n[id] <= 0) delete n[id]
      return n
    })
  }, [])
  const DEV_MIN = 30_000
  const DEV_MAX = 60_000
  const PROD_MIN = 30_000
  const PROD_MAX = 60_000
  const placeOrder = useCallback(() => {
    const t = total()
    if (t <= 0) { setScreen('browse'); return }
    const min = import.meta.env.DEV ? DEV_MIN : PROD_MIN
    const max = import.meta.env.DEV ? DEV_MAX : PROD_MAX
    const duration = min + Math.floor(Math.random() * (max - min))
    setPending(t)
    setOrderPlacedAt(Date.now())
    setOrderTotalDuration(duration)
    setScreen('tracking')
  }, [total])
  const orderForReal = useCallback(() => showToast('All yours. We’ll be here.'), [showToast])
  const commitLetGo = useCallback(() => {
    setStats((s) => {
      const firstId = Object.keys(cart)[0]
      const fm = firstId ? menu.find((x) => x.id === firstId) : undefined
      const entry: LedgerEntry = {
        label: 'let go of ' + (fm ? fm.name.toLowerCase() : 'a craving'),
        when: whenLabel(),
        ts: Date.now(),
      }
      return { kept: s.kept + pendingTotal, count: s.count + 1, ledger: [entry, ...s.ledger].slice(0, 12) }
    })
    setCart({})
    setPending(0)
    setOrderPlacedAt(null)
    setOrderTotalDuration(null)
    setScreen('restaurants')
    showToast('Nice. You rode it out.')
  }, [cart, pendingTotal, showToast, menu])
  const openNudge = useCallback(() => setNudgeOpen(true), [])
  const closeNudge = useCallback(() => setNudgeOpen(false), [])

  const value: NilContext = {
    screen, theme, cart, stats, pendingTotal, orderPlacedAt, orderTotalDuration, toast, nudgeOpen,
    restaurants, restaurantsLoading, selectedRestaurant, menu,
    go, toggleTheme, selectRestaurant, add, setQty, count, total, placeOrder, commitLetGo, orderForReal, showToast, openNudge, closeNudge,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
