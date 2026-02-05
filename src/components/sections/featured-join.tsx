"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const benefits = [
  { title: "Cultural Experiences", desc: "Japanese cultural events, festivals, film screenings, and hands-on workshops conducted throughout the year" },
  { title: "Language Learning", desc: "JLPT-focused Japanese language training, starting with N5 and expanding to higher levels as programs progress." },
  { title: "Networking", desc: "Interactions with Japanese institutions, industry professionals, and academic partners through talks and collaborative programs" },
  { title: "Study Abroad", desc: " Information and support for exchange programs, short-term visits, and academic collaborations with partner institutions in Japan" },
]

export default function FeaturedJoin() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-20 bg-foreground/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
            Get Involved
          </span>
          <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide mb-6">
            Join Our Community
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Be part of a vibrant community bridging Japan and global perspectives
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`group text-center p-6 rounded-none bg-background border border-foreground/10 hover:border-foreground/30 transition-all duration-500 hover:shadow-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-foreground font-semibold text-2xl mb-3">{benefit.title}</h3>
              <p className="text-foreground/60 text-md">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className={`text-center text-foreground/60 text-lg mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Activities and opportunities are open to Woxsen University students and are announced throughout the academic year.
        </p>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Community Card */}
          <div
            className={`group relative rounded-none overflow-hidden transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/5" />

            {/* Japanese Corner Accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-foreground/40" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-foreground/40" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-foreground/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-foreground/40" />

            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-none bg-foreground/20 flex items-center justify-center">
                  <span className="text-2xl">🎌</span>
                </div>
                <span className="text-foreground text-xs font-bold uppercase tracking-wider">Free Membership</span>
              </div>
              <h3 className="text-foreground font-serif text-2xl font-normal mb-3">
                Join Our Community
              </h3>
              <p className="text-foreground/70 text-md mb-6 leading-relaxed">
                Access exclusive cultural events, language workshops, networking sessions, and more.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSenfpbj8b4zINjx9z0DnqeB0yaTVev_XLvP5rKchMYEI49q3w/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-white font-semibold px-6 py-3 rounded-none hover:bg-foreground/90 transition-all hover:scale-105 border border-foreground/50"
              >
                Register Now
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* JLPT Card */}
          <div
            className={`group relative rounded-none overflow-hidden bg-foreground transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Japanese Watermark */}
            <div className="absolute top-4 right-4 text-white/5 font-serif text-6xl font-bold">
              日本
            </div>

            {/* Japanese Corner Accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-foreground/30" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-foreground/30" />

            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-none bg-foreground/30 flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <span className="text-foreground text-xs font-bold uppercase tracking-wider">Language Course</span>
              </div>
              <h3 className="text-white font-serif text-2xl font-normal mb-3">
                Enroll in JLPT Course
              </h3>
              <p className="text-white/60 text-md mb-6 leading-relaxed">
                Prepare for JLPT certification with native instructors and comprehensive study materials.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSczMcKyQtLQMNaZA_zrEA4ddzJVK-f5NbtOhAqtye3dIE20ew/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-white font-semibold px-6 py-3 rounded-none hover:bg-foreground/90 transition-all hover:scale-105 border border-foreground/50"
              >
                Enroll Now
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Link */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Link
            href="/join"
            className="text-foreground/60 hover:text-foreground text-sm transition-colors"
          >
            Learn more about membership benefits →
          </Link>
        </div>
      </div>
    </section>
  )
}
