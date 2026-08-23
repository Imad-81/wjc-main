"use client"

import { useState, type FormEvent } from "react"
import { useReveal } from "../use-reveal"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function NewsletterSection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>(120, 0.2)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  /**
   * The prototype's form only flipped a local flag — a visitor's address went
   * nowhere. There is no subscription backend, so this opens a pre-addressed
   * email to the Centre instead. The address is really delivered.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    const subject = encodeURIComponent(
      locale === "ja"
        ? "ニュースレター購読希望"
        : "Newsletter subscription request",
    )
    const body = encodeURIComponent(
      locale === "ja"
        ? `ニュースレターの購読を希望します。\n\nメールアドレス: ${email}`
        : `Please subscribe me to the Japan Centre Dispatch.\n\nEmail: ${email}`,
    )
    window.location.href = `mailto:${dict.common.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="theme-transition"
      style={{
        backgroundColor: "#E8E2D7",
        padding: "120px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  display: "block",
                  marginBottom: "16px",
                  color: "var(--theme-accent)",
                }}
              >
                {dict.home.newsletter.label}
              </span>
            </div>
            <h2
              id="newsletter-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(32px, 3vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "0.01em",
                marginBottom: "20px",
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.home.newsletter.title}
              <br />
              {dict.home.newsletter.titleEmphasis}
            </h2>
            <p
              className="fade-up"
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                maxWidth: "440px",
                fontWeight: 300,
                color: "#5B5B5B",
                opacity: 0,
              }}
            >
              {dict.home.newsletter.body}
            </p>
          </div>

          <div className="fade-up" style={{ opacity: 0 }}>
            {submitted ? (
              <div
                style={{
                  padding: "48px",
                  border: "1px solid rgba(35,35,35,0.12)",
                  textAlign: "center",
                  backgroundColor: "rgba(248,247,244,0.60)",
                }}
                role="status"
              >
                <p
                  className="font-serif font-jp"
                  style={{
                    fontSize: "24px",
                    fontWeight: 400,
                    marginBottom: "12px",
                    color: "#232323",
                  }}
                >
                  ありがとうございます
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    letterSpacing: "0.06em",
                    color: "#5B5B5B",
                  }}
                >
                  {locale === "ja"
                    ? "メールソフトが開きます。送信いただければご登録します。"
                    : "Your email app will open — send the message and we will add you."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="newsletter-email"
                    className="section-label"
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      color: "#5B5B5B",
                    }}
                  >
                    {locale === "ja" ? "メールアドレス" : "Email Address"}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      width: "100%",
                      height: "52px",
                      background: "rgba(248,247,244,0.70)",
                      border: "1px solid rgba(35,35,35,0.18)",
                      padding: "0 16px",
                      fontSize: "16px",
                      color: "#232323",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--theme-accent)"
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(35,35,35,0.18)"
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-lift w-full"
                  style={{
                    backgroundColor: "var(--theme-accent)",
                    color: "#F8F7F4",
                    height: "52px",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {dict.home.newsletter.cta}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
