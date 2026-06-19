export interface MenuItem {
  id: string
  name: string
  price: number
  emoji: string
  tone: string
  category: string
  description?: string
  bestseller?: boolean
  veg?: boolean
}

export interface LedgerEntry {
  label: string
  when: string
  ts?: number
}

export interface Stats {
  kept: number
  count: number
  ledger: LedgerEntry[]
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  reviewCount: number
  eta: number
  deliveryFee: number
  lat: number
  lon: number
}

export type Screen = 'onboarding' | 'restaurants' | 'browse' | 'cart' | 'payment' | 'tracking' | 'letgo' | 'you'
export type Theme = 'dark' | 'light'
export type Cart = Record<string, number>
