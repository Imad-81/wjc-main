import PageHeader from "./page-header"
import FadeUp from "./fade-up"
import type { LegalSection } from "@/data/legal"
import { LEGAL_LAST_UPDATED } from "@/data/legal"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

/** Shared shell for /privacy and /terms. */
export default function LegalPage({
  locale,
  dict,
  title,
  sections,
  watermark,
}: {
  locale: Locale
  dict: Dictionary
  title: string
  sections: LegalSection[]
  watermark: string
}) {
  return (
    <>
      <PageHeader
        label={dict.footer.connect}
        title={title}
        image="/images/hero/hero1.webp"
        imageAlt=""
        watermark={watermark}
      />

      <section className="relative bg-[var(--section-paper)] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--warm-text-muted)]">
            {dict.legal.lastUpdated}: {LEGAL_LAST_UPDATED[locale]}
          </p>

          <div className="mt-12 space-y-12">
            {sections.map((section, index) => (
              <FadeUp
                key={section.heading.en}
                delay={((index % 3) + 1) as 1 | 2 | 3}
                as="section"
              >
                <h2 className="font-serif text-3xl text-[var(--warm-text)]">
                  {section.heading[locale]}
                </h2>

                {section.body?.[locale].map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-5 text-sm leading-[1.9] text-[rgba(35,35,35,0.82)]"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-5 space-y-2.5">
                    {section.list[locale].map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-[rgba(35,35,35,0.82)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 bg-[var(--theme-accent)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </FadeUp>
            ))}

            <FadeUp as="section">
              <h2 className="font-serif text-3xl text-[var(--warm-text)]">
                {dict.footer.contact}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[rgba(35,35,35,0.82)]">
                <a
                  href={`mailto:${dict.common.email}`}
                  className="text-[var(--theme-accent)] underline-offset-4 hover:underline"
                >
                  {dict.common.email}
                </a>
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}
