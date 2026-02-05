"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navigation from "@/components/navigation";

const heroImages = [
  "/images/hero/hero1.png",
  "/images/hero/hero2.png",
  "/images/hero/hero3.png",
  "/images/hero/hero4.png",
  "/images/hero/hero5.png",
  "/images/hero/hero6.png",
];

export default function Hero() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animation timings
    const logoTimer = setTimeout(() => setLogoVisible(true), 200)
    const titleTimer = setTimeout(() => setTitleVisible(true), 700)
    const contentTimer = setTimeout(() => setShowContent(true), 1200)

    // Background image slideshow
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    // Subtle parallax (Scroll)
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          if (bgRef.current) {
            bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(titleTimer)
      clearTimeout(contentTimer)
      clearInterval(imageInterval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Background Image Slideshow with Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Hero Background ${index + 1}`}
              fill
              className="object-cover scale-110"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Glossy "Gel" Overlay Effect */}
      {/* Glossy "Gel" Overlay Effect - Hyper-Gloss */}
      {/* Liquid Glass - High Specular Shine */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* 1. Main Surface Reflection (The "Sheen") */}
        {/* Curved arc that makes it look like a rounded glass panel */}
        <div className="absolute -inset-x-[20%] top-0 h-[45vh] bg-linear-to-b from-white/30 via-white/10 to-transparent rounded-b-[100%] mix-blend-overlay" />





        {/* 4. Diagonal Glare Beam */}
        <div className="absolute top-[-20%] left-[60%] w-[10%] h-[140%] bg-linear-to-r from-transparent via-white/15 to-transparent skew-x-[-35deg] mix-blend-overlay" />
      </div>

      {/* Japanese Watermark - Subtle */}
      <div className="absolute inset-0 z-2 flex items-center justify-center pointer-events-none">
        <span className="font-serif text-[12rem] md:text-[18rem] text-white/[0.03] select-none">
          日本
        </span>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center z-10 text-center px-6 h-screen pt-16">
        {/* Logo */}
        <div
          className={`-mb-4 relative transition-all duration-1000 ease-out ${logoVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
        >
          <Image
            src="/wjc-logo.png"
            alt="Woxsen Japan Centre Logo"
            width={350}
            height={350}
            priority
            className="w-110 md:w-100 lg:w-120 h-auto"
          />
        </div>

        {/* Title - Larger */}
        <div
          className={`mb-5 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide drop-shadow-lg">
            Woxsen Japan Centre
          </h1>
        </div>

        {/* Accent Line */}
        <div
          className={`w-20 h-1 bg-white rounded-none mb-6 transition-all duration-500 ${titleVisible ? "opacity-100 w-20" : "opacity-0 w-0"}`}
        />

        {/* Subtitle - Larger */}
        <p
          className={`text-white/80 text-lg md:text-xl tracking-wide max-w-lg font-light transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Essence of Japan, Within Reach{" "}
        </p>

        {/* Scroll Indicator - Animated Down Arrow */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-300 ${showContent ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-8 h-8 text-white/70 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
