import Image from "next/image"
import type { ReactNode } from "react"
import { ButtonLink } from "./primitives"

/**
 * Hero banner shared by every inner page: full-bleed image, dark overlay,
 * eyebrow label, split serif title, and an optional lede plus CTAs.
 */
export default function PageHeader({
  label,
  title,
  titleEmphasis,
  subtitle,
  image,
  imageAlt,
  watermark = "日本",
  actions,
}: {
  label: string
  title: string
  titleEmphasis?: string
  subtitle?: string
  image: string
  imageAlt: string
  watermark?: string
  actions?: ReactNode
}) {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--theme-hero-overlay) 0%, rgba(20,18,16,0.74) 50%, rgba(20,18,16,0.40) 100%)",
          }}
        />
      </div>

      <span
        aria-hidden="true"
        className="kanji-ghost absolute -right-6 top-20 text-[9rem] md:text-[15rem]"
      >
        {watermark}
      </span>

      <div className="max-w-content relative mx-auto w-full px-6 pb-20 pt-36 md:px-10 md:pb-24 md:pt-40">
        <p className="section-label">{label}</p>

        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.1] text-[var(--theme-ivory)] md:text-6xl">
          {title}
          {titleEmphasis && (
            <span className="block italic">{titleEmphasis}</span>
          )}
        </h1>

        {subtitle && (
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-[rgba(248,247,244,0.72)] md:text-[15px]">
            {subtitle}
          </p>
        )}

        {actions && <div className="mt-9 flex flex-wrap gap-4">{actions}</div>}
      </div>
    </section>
  )
}

export { ButtonLink }
