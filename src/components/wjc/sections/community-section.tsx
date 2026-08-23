"use client"

import Link from "next/link"
import { useReveal } from "../use-reveal"
import { membershipTiers } from "@/data/membership-tiers"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function CommunitySection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      id="community"
      ref={sectionRef}
      className="theme-transition"
      style={{
        backgroundColor: "#F8F7F4",
        padding: "120px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="community-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16 text-center">
          <div className="fade-up" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "16px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.home.membership.label}
            </span>
          </div>
          <h2
            id="community-heading"
            className="fade-up font-serif"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "0.01em",
              marginBottom: "20px",
              color: "#232323",
              opacity: 0,
            }}
          >
            {dict.home.membership.title}
          </h2>
          <p
            className="fade-up mx-auto"
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "520px",
              fontWeight: 300,
              color: "#5B5B5B",
              opacity: 0,
            }}
          >
            {dict.home.membership.subtitle}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid rgba(35,35,35,0.10)" }}
        >
          {membershipTiers.map((tier, index) => (
            <div
              key={tier.id}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${index * 0.1}s`,
                padding: "48px 40px",
                borderRight:
                  index < membershipTiers.length - 1
                    ? "1px solid rgba(35,35,35,0.10)"
                    : "none",
                borderTop: tier.featured
                  ? "2px solid var(--theme-accent)"
                  : "2px solid transparent",
                backgroundColor: tier.featured
                  ? "rgba(166,58,43,0.04)"
                  : "transparent",
                position: "relative",
              }}
            >
              {tier.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--theme-accent)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  {dict.home.membership.mostPopular}
                </span>
              )}

              <div className="mb-8">
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "#5B5B5B",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                >
                  {tier.subtitle[locale]}
                </p>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    marginBottom: "20px",
                    color: "#232323",
                  }}
                >
                  {tier.title[locale]}
                </h3>
                <div
                  style={{
                    borderTop: "1px solid rgba(35,35,35,0.10)",
                    paddingTop: "20px",
                  }}
                >
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "36px",
                      fontWeight: 400,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "#232323",
                    }}
                  >
                    {tier.price[locale]}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#5B5B5B",
                      marginTop: "6px",
                      fontWeight: 400,
                    }}
                  >
                    {tier.priceNote[locale]}
                  </p>
                </div>
              </div>

              <ul className="mb-10 flex flex-col gap-3">
                {tier.benefits[locale].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3"
                    style={{
                      fontSize: "14px",
                      color: "#5B5B5B",
                      lineHeight: 1.5,
                      fontWeight: 300,
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: "var(--theme-accent)",
                        marginTop: "7px",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href={localizePath("/join-us", locale)}
                className="btn-lift inline-flex w-full items-center justify-center"
                style={{
                  padding: "13px 24px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: tier.featured
                    ? "var(--theme-accent)"
                    : "transparent",
                  color: tier.featured ? "#F8F7F4" : "#232323",
                  border: tier.featured
                    ? "none"
                    : "1px solid rgba(35,35,35,0.18)",
                  textDecoration: "none",
                }}
              >
                {dict.home.membership.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
