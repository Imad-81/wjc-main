"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fade out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1500)

    // Remove splash screen after fade animation
    const removeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className={`transition-all duration-700 ${fadeOut ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
        <Image
          src="/wjc-logo.png"
          alt="Woxsen Japan Centre"
          width={200}
          height={200}
          priority
          className="w-40 md:w-52 h-auto"
        />
      </div>
    </div>
  )
}
