"use client"

import { useId, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { REGISTRATION_FORMS } from "@/data/membership"
import type { Dictionary } from "@/i18n/types"

/**
 * "Express Your Interest" panel.
 *
 * The prototype renders name/email/message inputs, but the Centre's actual
 * intake runs through two Google Forms. Collecting those fields here would
 * either discard them on submit or force the visitor to retype everything on
 * the Google Form — so this panel keeps the prototype's framing and routes
 * the visitor's stated interest to the correct form, which then collects
 * their details.
 */
export default function InterestPanel({ dict }: { dict: Dictionary }) {
  const selectId = useId()
  const [interest, setInterest] = useState("")

  const options = [
    { value: "n5", label: dict.joinUs.interest.optionN5, form: REGISTRATION_FORMS.jlptCourse },
    { value: "n4", label: dict.joinUs.interest.optionN4, form: REGISTRATION_FORMS.jlptCourse },
    { value: "cultural", label: dict.joinUs.interest.optionCultural, form: REGISTRATION_FORMS.community },
    { value: "both", label: dict.joinUs.interest.optionBoth, form: REGISTRATION_FORMS.jlptCourse },
  ]

  const target = options.find((o) => o.value === interest)

  return (
    <div className="washi-glass-dark glass-reflection mx-auto max-w-xl p-8 md:p-10">
      <h3 className="font-serif text-3xl text-[var(--theme-ivory)]">
        {dict.joinUs.interest.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--theme-muted-text)]">
        {dict.joinUs.interest.subtitle}
      </p>

      <div className="mt-8">
        <label
          htmlFor={selectId}
          className="block text-[10px] uppercase tracking-[0.22em] text-[var(--theme-muted-text)]"
        >
          {dict.joinUs.interest.selectLabel}
        </label>

        <select
          id={selectId}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="mt-3 w-full appearance-none border bg-transparent px-4 py-3.5 text-sm text-[var(--theme-ivory)] outline-none transition-colors focus:border-[var(--theme-accent)]"
          style={{ borderColor: "var(--theme-border-light)" }}
        >
          <option value="" style={{ color: "#232323" }}>
            {dict.joinUs.interest.selectPlaceholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{ color: "#232323" }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <a
        href={target?.form ?? REGISTRATION_FORMS.community}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!target}
        onClick={(e) => {
          if (!target) e.preventDefault()
        }}
        className={`btn-accent mt-7 inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] ${
          target ? "" : "pointer-events-none opacity-40"
        }`}
      >
        {dict.joinUs.interest.cta}
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>

      <p className="mt-4 text-center text-[11px] text-[var(--theme-muted-text)]">
        {dict.joinUs.interest.note}
      </p>
    </div>
  )
}
