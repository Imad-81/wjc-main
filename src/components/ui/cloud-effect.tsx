"use client"

import { cn } from "@/lib/utils"

interface CloudEffectProps {
    className?: string
    intensity?: "light" | "medium" | "heavy"
    position?: "bottom" | "full" | "top"
}

export default function CloudEffect({
    className,
    intensity = "medium",
    position = "bottom"
}: CloudEffectProps) {
    const intensityOpacity = {
        light: 0.3,
        medium: 0.5,
        heavy: 0.7
    }

    const positionClasses = {
        bottom: "bottom-0 h-1/2",
        full: "inset-0",
        top: "top-0 h-1/2"
    }

    const opacity = intensityOpacity[intensity]

    return (
        <div
            className={cn(
                "absolute left-0 right-0 pointer-events-none z-[2] overflow-hidden",
                positionClasses[position],
                className
            )}
        >
            {/* Cloud Layer 1 - Large slow clouds */}
            <div className="absolute inset-0 animate-cloud-drift-1">
                <svg
                    viewBox="0 0 1200 400"
                    className="absolute w-[200%] h-full left-0"
                    preserveAspectRatio="none"
                    style={{ opacity: opacity * 0.8 }}
                >
                    <defs>
                        <filter id="cloud-blur-1">
                            <feGaussianBlur stdDeviation="20" />
                        </filter>
                    </defs>
                    {/* Cloud shapes */}
                    <ellipse cx="150" cy="300" rx="120" ry="60" fill="white" filter="url(#cloud-blur-1)" />
                    <ellipse cx="200" cy="280" rx="80" ry="50" fill="white" filter="url(#cloud-blur-1)" />
                    <ellipse cx="100" cy="320" rx="100" ry="50" fill="white" filter="url(#cloud-blur-1)" />

                    <ellipse cx="500" cy="350" rx="150" ry="70" fill="white" filter="url(#cloud-blur-1)" />
                    <ellipse cx="580" cy="320" rx="100" ry="55" fill="white" filter="url(#cloud-blur-1)" />
                    <ellipse cx="450" cy="370" rx="90" ry="45" fill="white" filter="url(#cloud-blur-1)" />

                    <ellipse cx="900" cy="280" rx="140" ry="65" fill="white" filter="url(#cloud-blur-1)" />
                    <ellipse cx="980" cy="310" rx="110" ry="55" fill="white" filter="url(#cloud-blur-1)" />
                    <ellipse cx="850" cy="320" rx="80" ry="45" fill="white" filter="url(#cloud-blur-1)" />
                </svg>
            </div>

            {/* Cloud Layer 2 - Medium speed clouds */}
            <div className="absolute inset-0 animate-cloud-drift-2">
                <svg
                    viewBox="0 0 1200 400"
                    className="absolute w-[180%] h-full left-[-40%]"
                    preserveAspectRatio="none"
                    style={{ opacity: opacity * 0.6 }}
                >
                    <defs>
                        <filter id="cloud-blur-2">
                            <feGaussianBlur stdDeviation="15" />
                        </filter>
                    </defs>
                    <ellipse cx="250" cy="340" rx="100" ry="50" fill="white" filter="url(#cloud-blur-2)" />
                    <ellipse cx="320" cy="320" rx="70" ry="40" fill="white" filter="url(#cloud-blur-2)" />

                    <ellipse cx="700" cy="300" rx="120" ry="60" fill="white" filter="url(#cloud-blur-2)" />
                    <ellipse cx="780" cy="330" rx="90" ry="45" fill="white" filter="url(#cloud-blur-2)" />

                    <ellipse cx="1100" cy="350" rx="130" ry="55" fill="white" filter="url(#cloud-blur-2)" />
                    <ellipse cx="1050" cy="320" rx="80" ry="40" fill="white" filter="url(#cloud-blur-2)" />
                </svg>
            </div>

            {/* Cloud Layer 3 - Small fast wisps */}
            <div className="absolute inset-0 animate-cloud-drift-3">
                <svg
                    viewBox="0 0 1200 400"
                    className="absolute w-[150%] h-full left-[-25%]"
                    preserveAspectRatio="none"
                    style={{ opacity: opacity * 0.4 }}
                >
                    <defs>
                        <filter id="cloud-blur-3">
                            <feGaussianBlur stdDeviation="12" />
                        </filter>
                    </defs>
                    <ellipse cx="400" cy="320" rx="80" ry="40" fill="white" filter="url(#cloud-blur-3)" />
                    <ellipse cx="460" cy="340" rx="60" ry="35" fill="white" filter="url(#cloud-blur-3)" />

                    <ellipse cx="800" cy="360" rx="100" ry="45" fill="white" filter="url(#cloud-blur-3)" />
                    <ellipse cx="870" cy="340" rx="70" ry="35" fill="white" filter="url(#cloud-blur-3)" />
                </svg>
            </div>

            {/* Top fade gradient for smooth transition */}
            <div
                className={cn(
                    "absolute inset-x-0 h-24 pointer-events-none",
                    position === "bottom" ? "top-0 bg-gradient-to-b from-transparent to-transparent" : "",
                    position === "top" ? "bottom-0 bg-gradient-to-t from-transparent to-transparent" : ""
                )}
            />
        </div>
    )
}
