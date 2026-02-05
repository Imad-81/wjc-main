"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
    end: number | string
    duration?: number
    suffix?: string
    prefix?: string
    className?: string
}

export default function CountUp({
    end,
    duration = 2000,
    suffix = "",
    prefix = "",
    className = ""
}: CountUpProps) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    // Extract numeric value and suffix from string like "100+" or "2025"
    const numericEnd = typeof end === "string"
        ? parseInt(end.replace(/[^0-9]/g, ""))
        : end
    const autoSuffix = typeof end === "string"
        ? end.replace(/[0-9]/g, "")
        : suffix

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        const startTime = Date.now()
        const startValue = 0

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)

            const currentValue = Math.floor(startValue + (numericEnd - startValue) * easeOutQuart)
            setCount(currentValue)

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                setCount(numericEnd)
            }
        }

        requestAnimationFrame(animate)
    }, [isVisible, numericEnd, duration])

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{autoSuffix}
        </span>
    )
}
