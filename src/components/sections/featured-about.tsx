"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import CountUp from "@/components/ui/count-up"

const highlights = [
  { number: "2025", label: "Established" },
  { number: "7+", label: "Faculty" },
  { number: "150+", label: "Members" },
]

export default function FeaturedAbout() {
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
    <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Single Clean Image */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative aspect-[4/3] rounded-none overflow-hidden">
              <Image
                src="/images/others/woxsen-japan-center.png"
                alt="Japan Centre"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: About Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-foreground font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide mb-6">
              Bridging Cultures,<br />Building Futures
            </h2>

            <p className="text-foreground/60 text-base leading-relaxed mb-8">
              The Woxsen Japan Centre, inaugurated on 2nd April 2025 by Mr. Muneo 
Takahashi, Consul-General of Japan in Chennai, is a university-led initiative 
dedicated to fostering intercultural dialogue and strengthening the India–Japan 
relationship through academic collaboration, cultural exchange, and professional 
engagement. Based at Woxsen University’s Hyderabad campus, the centre serves 
as a vibrant platform for exploring Japan’s rich heritage, innovative industries, 
and contemporary societal advancements
            </p>

            {/* Stats Row */}
            <div className="flex gap-10 mb-10">
              {highlights.map((stat, idx) => (
                <div key={idx}>
                  <CountUp
                    end={stat.number}
                    className="text-foreground font-serif text-2xl md:text-3xl font-normal block"
                  />
                  <div className="text-foreground/40 text-xs tracking-wider uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn More About Us
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
