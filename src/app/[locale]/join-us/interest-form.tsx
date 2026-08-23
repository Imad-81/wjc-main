"use client"

import { useState, type FormEvent } from "react"
import { REGISTRATION_FORMS } from "@/data/membership"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

const FIELD_STYLE = {
  width: "100%",
  height: "52px",
  backgroundColor: "transparent",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "0 16px",
  fontSize: "16px",
  color: "#F7F5F0",
  fontFamily: "var(--font-dm-sans)",
  outline: "none",
} as const

const LABEL_STYLE = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "0.1em",
  color: "rgba(247,245,240,0.4)",
  fontFamily: "var(--font-dm-sans)",
  fontWeight: 500,
  marginBottom: "8px",
  textTransform: "uppercase",
} as const

/**
 * Expression-of-interest form.
 *
 * The prototype's version only flipped a local `submitted` flag — everything
 * the visitor typed was discarded. The layout here is unchanged, but submit
 * composes a message to the Centre so the enquiry actually arrives, and the
 * confirmation panel links on to the matching official registration form.
 */
export default function InterestForm({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    program: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const t = dict.joinUs.interest

  const programLabels: Record<string, string> = {
    "jlpt-n5": t.optionN5,
    "jlpt-n4": t.optionN4,
    cultural: t.optionCultural,
    both: t.optionBoth,
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(
      locale === "ja"
        ? `参加のご相談 — ${form.name}`
        : `Expression of interest — ${form.name}`,
    )
    const body = encodeURIComponent(
      [
        `${locale === "ja" ? "お名前" : "Name"}: ${form.name}`,
        `${locale === "ja" ? "メール" : "Email"}: ${form.email}`,
        `${t.selectLabel}: ${programLabels[form.program] ?? "—"}`,
        "",
        form.message,
      ].join("\n"),
    )

    window.location.href = `mailto:${dict.common.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  // Cultural-only interest goes to the community form; anything involving
  // JLPT goes to the course form.
  const followUpForm =
    form.program === "cultural"
      ? REGISTRATION_FORMS.community
      : REGISTRATION_FORMS.jlptCourse

  if (submitted) {
    return (
      <div
        style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "48px" }}
      >
        <div className="py-12 text-center" role="status">
          <div
            className="font-serif font-jp"
            style={{
              fontSize: "64px",
              color: "var(--theme-accent)",
              opacity: 0.4,
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            和
          </div>
          <h3
            className="font-serif"
            style={{
              fontSize: "28px",
              fontWeight: 300,
              color: "#F7F5F0",
              marginBottom: "16px",
            }}
          >
            {t.thanksTitle}
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(247,245,240,0.5)",
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: "32px",
            }}
          >
            {t.thanksBody}
          </p>
          <a
            href={followUpForm}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift inline-flex items-center gap-2"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "var(--theme-ivory)",
              fontSize: "13px",
              letterSpacing: "0.1em",
              fontWeight: 600,
              padding: "16px 40px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans)",
              textDecoration: "none",
            }}
          >
            {t.completeRegistration}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "48px" }}>
      <h3
        className="font-serif"
        style={{
          fontSize: "24px",
          fontWeight: 300,
          color: "#F7F5F0",
          marginBottom: "8px",
        }}
      >
        {t.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "rgba(247,245,240,0.4)",
          marginBottom: "40px",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {t.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="join-name" style={LABEL_STYLE}>
            {t.nameLabel}
          </label>
          <input
            id="join-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={FIELD_STYLE}
            placeholder={t.namePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="join-email" style={LABEL_STYLE}>
            {t.emailLabel}
          </label>
          <input
            id="join-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={FIELD_STYLE}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="join-program" style={LABEL_STYLE}>
            {t.selectLabel}
          </label>
          <select
            id="join-program"
            required
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
            style={{
              ...FIELD_STYLE,
              backgroundColor: "#0F0F0F",
              color: form.program ? "#F7F5F0" : "rgba(247,245,240,0.3)",
              cursor: "pointer",
            }}
          >
            <option value="" disabled>
              {t.selectPlaceholder}
            </option>
            <option value="jlpt-n5">{t.optionN5}</option>
            <option value="jlpt-n4">{t.optionN4}</option>
            <option value="cultural">{t.optionCultural}</option>
            <option value="both">{t.optionBoth}</option>
          </select>
        </div>

        <div>
          <label htmlFor="join-message" style={LABEL_STYLE}>
            {t.messageLabel}{" "}
            <span style={{ color: "rgba(247,245,240,0.2)" }}>
              ({t.optional})
            </span>
          </label>
          <textarea
            id="join-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            style={{
              ...FIELD_STYLE,
              height: "auto",
              padding: "14px 16px",
              resize: "vertical",
            }}
            placeholder={t.messagePlaceholder}
          />
        </div>

        <button
          type="submit"
          className="btn-lift"
          style={{
            backgroundColor: "var(--theme-accent)",
            color: "var(--theme-ivory)",
            fontSize: "13px",
            letterSpacing: "0.1em",
            fontWeight: 600,
            padding: "16px 40px",
            textTransform: "uppercase",
            fontFamily: "var(--font-dm-sans)",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {t.cta} →
        </button>
      </form>
    </div>
  )
}
