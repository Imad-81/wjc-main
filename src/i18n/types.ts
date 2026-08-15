import type { en } from "./en"

/**
 * Structural shape of a locale dictionary, derived from the English source.
 *
 * Widens the `as const` literal types back to `string`, and readonly tuples
 * back to plain arrays, so the Japanese file is checked for *shape* (every
 * key present) rather than being required to repeat the English strings.
 */
type DeepMutable<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? // Kept readonly so both the `as const` English source and a plain
      // array literal in ja.ts satisfy the same type.
      readonly DeepMutable<U>[]
    : { -readonly [K in keyof T]: DeepMutable<T[K]> }

export type Dictionary = DeepMutable<typeof en>
