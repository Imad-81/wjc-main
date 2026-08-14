import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

/** The small uppercase eyebrow that opens each section. */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <p className={cn("section-label", className)}>{children}</p>
}

/**
 * Oversized kanji set behind a section at 4% opacity. Decorative only —
 * hidden from assistive tech.
 */
export function KanjiGhost({
  char,
  className,
}: {
  char: string
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "kanji-ghost absolute select-none text-[10rem] md:text-[16rem] lg:text-[20rem]",
        className,
      )}
    >
      {char}
    </span>
  )
}

/** Horizontal hairline used to separate stacked blocks on dark surfaces. */
export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("hairline-h-dark", className)} />
}

/** A short accent rule — the recurring divider under headings. */
export function AccentRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-px w-12 bg-[var(--theme-accent)] transition-colors duration-700",
        className,
      )}
    />
  )
}

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em]"

type ButtonVariant = "accent" | "outline"

/** Link styled as a button. Use for navigation; use <ActionButton> for handlers. */
export function ButtonLink({
  href,
  variant = "accent",
  className,
  children,
  ...rest
}: {
  href: string
  variant?: ButtonVariant
  className?: string
  children: ReactNode
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:")

  const classes = cn(
    BUTTON_BASE,
    variant === "accent" ? "btn-accent" : "btn-outline",
    className,
  )

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

export function ActionButton({
  variant = "accent",
  className,
  children,
  ...rest
}: {
  variant?: ButtonVariant
} & ComponentProps<"button">) {
  return (
    <button
      className={cn(
        BUTTON_BASE,
        variant === "accent" ? "btn-accent" : "btn-outline",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/**
 * Section heading in the house style: a serif first line with an italic
 * second line beneath it.
 */
export function SplitHeading({
  lead,
  emphasis,
  className,
  as: Tag = "h2",
}: {
  lead: string
  emphasis?: string
  className?: string
  as?: "h1" | "h2" | "h3"
}) {
  return (
    <Tag
      className={cn(
        "font-serif text-4xl leading-[1.12] md:text-5xl lg:text-[3.4rem]",
        className,
      )}
    >
      {lead}
      {emphasis && (
        <>
          {" "}
          <span className="block italic">{emphasis}</span>
        </>
      )}
    </Tag>
  )
}
