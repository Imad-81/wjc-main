"use client"

import { cn } from "@/lib/utils"

interface SmokeEffectProps {
    className?: string
    intensity?: "light" | "medium" | "heavy"
    position?: "bottom" | "full" | "top"
}

export default function SmokeEffect({
    className,
    intensity = "medium",
    position = "bottom"
}: SmokeEffectProps) {
    const intensityClasses = {
        light: "opacity-20",
        medium: "opacity-40",
        heavy: "opacity-60"
    }

    const positionClasses = {
        bottom: "bottom-0 h-1/3",
        full: "inset-0",
        top: "top-0 h-1/3"
    }

    return (
        <div
            className={cn(
                "absolute left-0 right-0 pointer-events-none z-[1] overflow-hidden",
                positionClasses[position],
                className
            )}
        >
            {/* Layer 1 - Slow drifting fog */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent",
                    intensityClasses[intensity],
                    "animate-smoke-drift-1"
                )}
            />

            {/* Layer 2 - Medium speed wisps */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10",
                    intensityClasses[intensity],
                    "animate-smoke-drift-2"
                )}
            />

            {/* Layer 3 - Fast subtle wisps */}
            <div
                className={cn(
                    "absolute inset-0",
                    intensityClasses[intensity],
                    "animate-smoke-drift-3"
                )}
                style={{
                    background: `radial-gradient(ellipse 100% 50% at 20% 100%, rgba(255,255,255,0.3) 0%, transparent 50%),
                       radial-gradient(ellipse 80% 40% at 70% 90%, rgba(255,255,255,0.2) 0%, transparent 50%),
                       radial-gradient(ellipse 60% 30% at 40% 95%, rgba(255,255,255,0.25) 0%, transparent 50%)`
                }}
            />

            {/* Gradient mask for smooth fade */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/80"
                style={{ mixBlendMode: 'multiply' }}
            />
        </div>
    )
}
