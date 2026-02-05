"use client"

import { useState } from "react"
import Image from "next/image"

const events = [
  {
    date: "2025-02-15",
    category: "Leadership",
    title: "Japan-India Business Forum",
    description:
      "An exclusive gathering of senior executives exploring market opportunities and collaborative ventures between Japan and India.",
    images: ["/business-forum.jpg"],
  },
  {
    date: "2025-03-10",
    category: "Culture",
    title: "Traditional Arts & Modern Business",
    description:
      "Discover how traditional Japanese arts influence contemporary business strategy and organizational culture.",
    images: ["/arts-culture.jpg"],
  },
  {
    date: "2025-04-05",
    category: "Innovation",
    title: "Tech Innovation Summit",
    description: "Exploring the intersection of Japanese technology expertise and global market expansion strategies.",
    images: ["/tech-innovation.jpg"],
  },
]

export default function Activities() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-gold-light" id="activities">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4">
            <h2 className="text-foreground font-sans text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              EVENTS & ACTIVITIES
            </h2>
            <div className="flex-grow h-px bg-foreground" />
          </div>

          <p className="mt-8 text-foreground/70 text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed">
            Join us for engaging programs that foster cultural exchange and business excellence.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-0 border-t border-foreground/20">
          {events.map((event, idx) => (
            <div key={idx} className="border-b border-foreground/20 hover:bg-white/40 transition-colors">
              {/* Event Header */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                className="w-full py-8 px-4 md:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left"
              >
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-foreground text-sm tracking-tight font-medium">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    • {event.category}
                  </p>
                  <h3 className="text-foreground font-sans text-2xl md:text-3xl font-semibold">{event.title}</h3>
                </div>

                <div
                  className={`text-4xl text-foreground transition-transform ${expandedIndex === idx ? "rotate-45" : ""
                    }`}
                >
                  +
                </div>
              </button>

              {/* Event Details */}
              {expandedIndex === idx && (
                <div className="px-4 md:px-6 pb-8 bg-white/50 animate-in fade-in">
                  <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center">
                    {event.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="rounded-none overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`${event.title} image ${imgIdx + 1}`}
                          width={350}
                          height={250}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
