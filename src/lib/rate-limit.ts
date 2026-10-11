/**
 * In-memory sliding-window rate limiter for sensitive endpoints.
 */

interface RateLimitRecord {
  timestamps: number[]
}

const rateLimitMap = new Map<string, RateLimitRecord>()

// Clean up stale IP records every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < 600000)
    if (record.timestamps.length === 0) {
      rateLimitMap.delete(key)
    }
  }
}, 600000)

export interface RateLimitOptions {
  limit: number
  windowMs: number
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 20, windowMs: 60 * 1000 }
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier) ?? { timestamps: [] }

  // Filter timestamps within window
  record.timestamps = record.timestamps.filter((ts) => now - ts < options.windowMs)

  if (record.timestamps.length >= options.limit) {
    const oldest = record.timestamps[0]
    const resetMs = options.windowMs - (now - oldest)
    return {
      allowed: false,
      remaining: 0,
      resetMs,
    }
  }

  record.timestamps.push(now)
  rateLimitMap.set(identifier, record)

  return {
    allowed: true,
    remaining: options.limit - record.timestamps.length,
    resetMs: options.windowMs,
  }
}
