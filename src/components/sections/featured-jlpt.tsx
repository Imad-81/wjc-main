"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const levels = [
  {
    level: "N5",
    title: "Beginner",
    kanji: "初",
    description: "Foundation in basic Japanese",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    level: "N4",
    title: "Elementary",
    kanji: "基",
    description: "Practical daily communication",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    level: "N3",
    title: "Intermediate",
    kanji: "中",
    description: "Professional conversations",
    color: "from-orange-500/20 to-orange-500/5"
  },
  {
    level: "N2",
    title: "Advanced",
    kanji: "上",
    description: "Abstract discussions & business",
    color: "from-red-500/20 to-red-500/5"
  },
]

const features = [
  { icon: "👨‍🏫", text: "Native Instructors" },
  { icon: "📝", text: "Mock Exams" },
  { icon: "🎌", text: "Cultural Context" },
  { icon: "💼", text: "Career Support" },
]

export default function FeaturedJLPT() {
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
    <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-20 bg-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
            Language Program
          </span>
          <h2 className="text-white font-serif text-4xl md:text-5xl font-normal tracking-wide mb-6">
            Master Japanese with JLPT
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Comprehensive preparation from beginner to advanced with native instructors
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {levels.map((level, idx) => (
            <div
              key={idx}
              className={`group relative bg-gradient-to-b ${level.color} rounded-none p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Japanese Kanji Watermark */}
              <div className="absolute top-2 right-2 text-white/5 font-serif text-6xl font-bold group-hover:text-foreground/10 transition-colors">
                {level.kanji}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-foreground font-serif text-3xl font-normal mb-1">{level.level}</h3>
                <p className="text-white font-semibold text-sm mb-2">{level.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{level.description}</p>
              </div>

              {/* Decorative Line */}
              <div className="w-0 h-0.5 bg-foreground mt-4 group-hover:w-8 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Features - Cleaner Layout */}
        {/* <div className={`flex flex-wrap justify-center gap-8 md:gap-16 mb-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center">
                <span className="text-xl">{feature.icon}</span>
              </div>
              <span className="text-white/60 text-sm">{feature.text}</span>
            </div>
          ))}
        </div> */}

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link
            href="/jlpt"
            className="inline-flex items-center gap-2 bg-foreground text-white font-semibold px-8 py-4 rounded-none hover:bg-foreground/90 transition-all hover:scale-105"
          >
            Explore JLPT Program
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
