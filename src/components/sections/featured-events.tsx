"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { pastEvents } from "@/data/events"

export default function FeaturedEvents() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Get the 3 most recent events
  const recentEvents = pastEvents.slice(0, 3)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-20 bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
              Recent Events
            </span>
            <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide">
              Events & Activities
            </h2>
          </div>
          <Link
            href="/events"
            className="text-foreground hover:text-foreground/80 text-sm tracking-tight font-semibold transition-colors inline-flex items-center gap-2"
          >
            View All Events
            <span>→</span>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentEvents.map((event, idx) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className={`group bg-background rounded-none overflow-hidden border border-foreground/10 hover:border-foreground/30 transition-all duration-500 hover:shadow-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={event.images[0] || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

                {/* Japanese Corner Accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-foreground/90 text-foreground text-[10px] font-bold px-2 py-1 rounded-none">
                    {event.category}
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/60 text-xs mb-1">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-white font-serif text-3xl font-normal leading-tight group-hover:text-foreground transition-colors">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="p-4 flex items-center justify-between border-t border-foreground/10">
                <span className="text-foreground/60 text-sm">View Details</span>
                <span className="text-foreground group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  )
}
