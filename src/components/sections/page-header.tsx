"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"

interface PageHeaderProps {
  title: string
  subtitle: string
  watermark?: string
}

export default function PageHeader({ title, subtitle, watermark = "日本" }: PageHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full h-[30vh] md:h-[40vh] bg-foreground flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground to-foreground/95" />

        {/* Subtle Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Liquid Glass - High Specular Shine */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {/* 1. Curved Surface Reflection */}
        <div className="absolute -inset-x-[30%] top-0 h-[80%] bg-linear-to-b from-white/20 via-white/5 to-transparent rounded-b-[100%] mix-blend-overlay" />




      </div>

      {/* Japanese Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span
          className="text-white/[0.03] font-serif text-[20rem] md:text-[30rem] font-bold tracking-tighter"
          style={{ writingMode: "vertical-rl" }}
        >
          {watermark}
        </span>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-foreground/50 z-0" />

      {/* Decorative Lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden lg:block" />

      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20">
        {/* Subtitle Above */}
        <p
          className={`text-white/70 text-sm text-center md:text-base tracking-widest uppercase font-semibold mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {subtitle}
        </p>

        {/* Title */}
        <h1
          className={`text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {title}
        </h1>

        {/* Accent Line */}
        <div
          className={`mx-auto w-16 h-1 bg-white rounded-none transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
        />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/20 to-transparent z-10" />
    </section>
  )
}
