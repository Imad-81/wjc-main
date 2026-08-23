import type { Locale } from "@/i18n/config"

/**
 * Placeholder for sections whose content the Centre has not supplied yet
 * (Events sub-tabs, the About timeline). Deliberately visible rather than an
 * empty gap, so the gap reads as intentional.
 */
export default function ComingSoon({
  locale,
  note,
  kanji = "近",
}: {
  locale: Locale
  /** Optional line explaining what will appear here. */
  note?: string
  kanji?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-[var(--theme-border-light)] px-6 py-20 text-center">
      <span aria-hidden="true" className="font-jp text-4xl text-[var(--theme-accent)] opacity-30">
        {kanji}
      </span>
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--theme-accent)]">
        {locale === "ja" ? "近日公開" : "Coming Soon"}
      </p>
      {note && (
        <p className="max-w-md text-sm leading-relaxed text-[var(--theme-muted-text)]">
          {note}
        </p>
      )}
    </div>
  )
}
