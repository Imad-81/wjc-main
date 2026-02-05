"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SakuraPetal {
    id: number
    left: number
    delay: number
    duration: number
    size: number
    rotation: number
    opacity: number
}

interface SakuraEffectProps {
    className?: string
    petalCount?: number
}

export default function SakuraEffect({
    className,
    petalCount = 15
}: SakuraEffectProps) {
    const [petals, setPetals] = useState<SakuraPetal[]>([])

    useEffect(() => {
        const newPetals: SakuraPetal[] = []
        for (let i = 0; i < petalCount; i++) {
            newPetals.push({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 15,
                duration: 10 + Math.random() * 10,
                size: 10 + Math.random() * 15,
                rotation: Math.random() * 360,
                opacity: 0.4 + Math.random() * 0.4
            })
        }
        setPetals(newPetals)
    }, [petalCount])

    return (
        <div
            className={cn(
                "absolute inset-0 pointer-events-none z-[3] overflow-hidden",
                className
            )}
        >
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute animate-sakura-fall"
                    style={{
                        left: `${petal.left}%`,
                        top: '-40px',
                        animationDelay: `${petal.delay}s`,
                        animationDuration: `${petal.duration}s`,
                    }}
                >
                    {/* SVG Sakura Petal */}
                    <svg
                        width={petal.size}
                        height={petal.size}
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{
                            transform: `rotate(${petal.rotation}deg)`,
                            opacity: petal.opacity
                        }}
                    >
                        <path
                            d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z"
                            fill="#FBBAD1"
                            stroke="#F8A5C2"
                            strokeWidth="0.5"
                        />
                        <ellipse
                            cx="12"
                            cy="12"
                            rx="2"
                            ry="6"
                            fill="#FFD1DC"
                            transform="rotate(45 12 12)"
                        />
                    </svg>
                </div>
            ))}
        </div>
    )
}
