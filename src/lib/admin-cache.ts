/**
 * In-memory client-side cache for administrative data.
 * Keeps data alive across client navigation within the admin panel
 * so tab switches between Events, Gallery, and Team are instantaneous (0ms).
 */

type CacheEntry<T> = {
  data: T
  timestamp: number
}

const adminCache = new Map<string, CacheEntry<unknown>>()

/**
 * Retrieve cached admin data if present and within maxAge (default 5 minutes).
 */
export function getAdminCached<T>(key: string, maxAgeMs = 5 * 60 * 1000): T | null {
  const entry = adminCache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > maxAgeMs) {
    adminCache.delete(key)
    return null
  }
  return entry.data as T
}

/**
 * Store data in client-side memory cache.
 */
export function setAdminCached<T>(key: string, data: T): void {
  adminCache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

/**
 * Invalidate a specific admin cache key or all keys.
 */
export function invalidateAdminCache(key?: string): void {
  if (key) {
    adminCache.delete(key)
  } else {
    adminCache.clear()
  }
}
