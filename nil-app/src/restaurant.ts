import { Geolocation } from '@capacitor/geolocation'
import type { Restaurant } from './types'
import { guessCuisine } from './data'

const FALLBACK_COORDS = { lat: 12.9352, lon: 77.6245 }
const RADIUS_M = 2000

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function fakeCoords(id: string): Pick<Restaurant, 'lat' | 'lon'> {
  const h1 = hashStr(id + 'lat')
  const h2 = hashStr(id + 'lon')
  return {
    lat: FALLBACK_COORDS.lat + ((h1 % 800) - 400) / 100000,  // ±0.004° ≈ ±440m
    lon: FALLBACK_COORDS.lon + ((h2 % 800) - 400) / 100000,
  }
}

function fakeMetrics(id: string): Pick<Restaurant, 'rating' | 'reviewCount' | 'eta' | 'deliveryFee'> {
  const h = hashStr(id)
  const rating = Math.round((3.8 + (h % 100) / 100) * 10) / 10   // 3.8–4.8
  const reviewCount = 150 + (hashStr(id + 'r') % 4851)             // 150–5000
  const eta = 20 + (hashStr(id + 'e') % 26)                        // 20–45 min
  const deliveryFee = (h % 5 === 0) ? 0 : 20 + (hashStr(id + 'f') % 30) // 0 or 20–49
  return { rating, reviewCount, eta, deliveryFee }
}

const FALLBACK_RESTAURANTS: Restaurant[] = [
  // North Indian
  { id: 'fb-ni-1', name: 'Biryani Express', cuisine: 'north indian', ...fakeMetrics('fb-ni-1'), ...fakeCoords('fb-ni-1') },
  { id: 'fb-ni-2', name: 'Punjab Kitchen', cuisine: 'north indian', ...fakeMetrics('fb-ni-2'), ...fakeCoords('fb-ni-2') },
  { id: 'fb-ni-3', name: 'Tandoor House', cuisine: 'north indian', ...fakeMetrics('fb-ni-3'), ...fakeCoords('fb-ni-3') },
  { id: 'fb-ni-4', name: 'Royal Darbar', cuisine: 'north indian', ...fakeMetrics('fb-ni-4'), ...fakeCoords('fb-ni-4') },
  { id: 'fb-ni-5', name: 'Mughal Spice', cuisine: 'north indian', ...fakeMetrics('fb-ni-5'), ...fakeCoords('fb-ni-5') },
  // South Indian
  { id: 'fb-si-1', name: 'Udupi Darshan', cuisine: 'south indian', ...fakeMetrics('fb-si-1'), ...fakeCoords('fb-si-1') },
  { id: 'fb-si-2', name: 'Dosa Plaza', cuisine: 'south indian', ...fakeMetrics('fb-si-2'), ...fakeCoords('fb-si-2') },
  { id: 'fb-si-3', name: 'Saravana Bhavan', cuisine: 'south indian', ...fakeMetrics('fb-si-3'), ...fakeCoords('fb-si-3') },
  { id: 'fb-si-4', name: 'Sagar Ratna', cuisine: 'south indian', ...fakeMetrics('fb-si-4'), ...fakeCoords('fb-si-4') },
  { id: 'fb-si-5', name: 'Idli House', cuisine: 'south indian', ...fakeMetrics('fb-si-5'), ...fakeCoords('fb-si-5') },
  // Italian / Pizza
  { id: 'fb-it-1', name: 'Little Italy', cuisine: 'italian', ...fakeMetrics('fb-it-1'), ...fakeCoords('fb-it-1') },
  { id: 'fb-it-2', name: 'Pizza Perfect', cuisine: 'italian', ...fakeMetrics('fb-it-2'), ...fakeCoords('fb-it-2') },
  { id: 'fb-it-3', name: 'Trattoria Roma', cuisine: 'italian', ...fakeMetrics('fb-it-3'), ...fakeCoords('fb-it-3') },
  { id: 'fb-it-4', name: 'La Piazza', cuisine: 'italian', ...fakeMetrics('fb-it-4'), ...fakeCoords('fb-it-4') },
  // Chinese
  { id: 'fb-ch-1', name: 'Wok This Way', cuisine: 'chinese', ...fakeMetrics('fb-ch-1'), ...fakeCoords('fb-ch-1') },
  { id: 'fb-ch-2', name: 'Dragon Palace', cuisine: 'chinese', ...fakeMetrics('fb-ch-2'), ...fakeCoords('fb-ch-2') },
  { id: 'fb-ch-3', name: 'Shanghai Garden', cuisine: 'chinese', ...fakeMetrics('fb-ch-3'), ...fakeCoords('fb-ch-3') },
  { id: 'fb-ch-4', name: 'Kung Fu Kitchen', cuisine: 'chinese', ...fakeMetrics('fb-ch-4'), ...fakeCoords('fb-ch-4') },
  // Cafe
  { id: 'fb-ca-1', name: 'Bean There Cafe', cuisine: 'cafe', ...fakeMetrics('fb-ca-1'), ...fakeCoords('fb-ca-1') },
  { id: 'fb-ca-2', name: 'The Brew Bar', cuisine: 'cafe', ...fakeMetrics('fb-ca-2'), ...fakeCoords('fb-ca-2') },
  { id: 'fb-ca-3', name: 'Muffin Man', cuisine: 'cafe', ...fakeMetrics('fb-ca-3'), ...fakeCoords('fb-ca-3') },
  { id: 'fb-ca-4', name: 'Morning & Co.', cuisine: 'cafe', ...fakeMetrics('fb-ca-4'), ...fakeCoords('fb-ca-4') },
  // Rolls
  { id: 'fb-ro-1', name: 'Kathi Junction', cuisine: 'rolls', ...fakeMetrics('fb-ro-1'), ...fakeCoords('fb-ro-1') },
  { id: 'fb-ro-2', name: 'Roll Express', cuisine: 'rolls', ...fakeMetrics('fb-ro-2'), ...fakeCoords('fb-ro-2') },
  { id: 'fb-ro-3', name: 'Street Roll Co.', cuisine: 'rolls', ...fakeMetrics('fb-ro-3'), ...fakeCoords('fb-ro-3') },
  { id: 'fb-ro-4', name: 'Wrap & Roll', cuisine: 'rolls', ...fakeMetrics('fb-ro-4'), ...fakeCoords('fb-ro-4') },
  // Multi-cuisine
  { id: 'fb-mc-1', name: "Tonight's Kitchen", cuisine: 'multi-cuisine', ...fakeMetrics('fb-mc-1'), ...fakeCoords('fb-mc-1') },
  { id: 'fb-mc-2', name: 'The Hungry House', cuisine: 'multi-cuisine', ...fakeMetrics('fb-mc-2'), ...fakeCoords('fb-mc-2') },
  { id: 'fb-mc-3', name: 'Corner Table', cuisine: 'multi-cuisine', ...fakeMetrics('fb-mc-3'), ...fakeCoords('fb-mc-3') },
  { id: 'fb-mc-4', name: 'The Late Bite', cuisine: 'multi-cuisine', ...fakeMetrics('fb-mc-4'), ...fakeCoords('fb-mc-4') },
]

interface OverpassElement {
  id: number
  lat: number
  lon: number
  tags?: { name?: string; cuisine?: string }
}

async function getCoords(): Promise<{ lat: number; lon: number }> {
  try {
    const pos = await Geolocation.getCurrentPosition({ timeout: 6000 })
    return { lat: pos.coords.latitude, lon: pos.coords.longitude }
  } catch {
    return FALLBACK_COORDS
  }
}

async function queryNearbyRestaurants(lat: number, lon: number): Promise<Restaurant[]> {
  const query = `[out:json][timeout:8];node(around:${RADIUS_M},${lat},${lon})[amenity=restaurant][name];out 30;`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)
  let res: Response
  try {
    res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timer)
  }
  if (!res!.ok) throw new Error('overpass request failed')
  const data: { elements: OverpassElement[] } = await res.json()
  const seen = new Set<string>()
  const restaurants: Restaurant[] = []
  for (const el of data.elements) {
    const name = el.tags?.name
    if (!name || seen.has(name)) continue
    seen.add(name)
    const id = `osm-${el.id}`
    restaurants.push({
      id,
      name,
      cuisine: guessCuisine(name, el.tags?.cuisine),
      lat: el.lat,
      lon: el.lon,
      ...fakeMetrics(id),
    })
  }
  return restaurants
}

export async function fetchNearbyRestaurants(): Promise<Restaurant[]> {
  try {
    const { lat, lon } = await getCoords()
    const restaurants = await queryNearbyRestaurants(lat, lon)
    return restaurants.length > 0 ? restaurants : FALLBACK_RESTAURANTS
  } catch {
    return FALLBACK_RESTAURANTS
  }
}
