import type { en } from "./en"

/**
 * Structural shape of a locale dictionary, derived from the English source.
 *
 * `DeepMutable` widens the `as const` literal types back to `string` so the
 * Japanese file is checked for *shape* (every key present) rather than being
 * required to repeat the English strings verbatim.
 */
type DeepMutable<T> = T extends string
  ? string
  : { -readonly [K in keyof T]: DeepMutable<T[K]> }

export type Dictionary = DeepMutable<typeof en>
