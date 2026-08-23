"use client"

import { useState } from "react"
import { useReveal } from "../use-reveal"
import { centreFaqs } from "@/data/faqs"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function FaqSection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>(80, 0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="theme-transition"
      style={{
        backgroundColor: "#F8F7F4",
        padding: "120px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left — heading */}
          <div className="lg:col-span-4">
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  display: "block",
                  marginBottom: "16px",
                  color: "var(--theme-accent)",
                }}
              >
                {dict.home.faq.label}
              </span>
            </div>
            <h2
              id="faq-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(32px, 3vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "0.01em",
                marginBottom: "24px",
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.home.faq.title}
            </h2>
            <p
              className="fade-up"
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                fontWeight: 300,
                color: "#5B5B5B",
                opacity: 0,
              }}
            >
              {dict.home.faq.subtitle}
            </p>
            <div className="fade-up mt-8" style={{ opacity: 0 }}>
              <a
                href={`mailto:${dict.common.email}`}
                style={{
                  fontSize: "13px",
                  color: "var(--theme-accent)",
                  letterSpacing: "0.06em",
                  fontWeight: 500,
                }}
              >
                {dict.common.email} →
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            <div style={{ borderTop: "1px solid rgba(35,35,35,0.12)" }}>
              {centreFaqs.map((faq, index) => {
                const isOpen = openIndex === index
                const panelId = `wjc-faq-panel-${index}`
                const buttonId = `wjc-faq-button-${index}`

                return (
                  <div
                    key={faq.question.en}
                    className="fade-up"
                    style={{
                      opacity: 0,
                      transitionDelay: `${index * 0.07}s`,
                      borderBottom: "1px solid rgba(35,35,35,0.12)",
                    }}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between text-left"
                        style={{
                          padding: "24px 0",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          gap: "16px",
                        }}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span
                          className="font-serif"
                          style={{
                            fontSize: "18px",
                            fontWeight: 400,
                            color: isOpen ? "var(--theme-accent)" : "#232323",
                            lineHeight: 1.3,
                            transition: "color 0.3s ease",
                          }}
                        >
                          {faq.question[locale]}
                        </span>
                        <span
                          style={{
                            flexShrink: 0,
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition:
                              "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            color: isOpen
                              ? "var(--theme-accent)"
                              : "rgba(35,35,35,0.35)",
                          }}
                          aria-hidden="true"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <line
                              x1="8"
                              y1="2"
                              x2="8"
                              y2="14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <line
                              x1="2"
                              y1="8"
                              x2="14"
                              y2="8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      style={{
                        maxHeight: isOpen ? "400px" : "0",
                        overflow: "hidden",
                        transition:
                          "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#5B5B5B",
                          lineHeight: 1.8,
                          paddingBottom: "24px",
                          paddingRight: "40px",
                          fontWeight: 300,
                        }}
                      >
                        {faq.answer[locale]}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
