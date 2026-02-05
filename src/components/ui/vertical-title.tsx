import React from 'react';
import { cn } from '@/lib/utils';

interface VerticalTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
    align?: 'left' | 'right';
}

export default function VerticalTitle({ title, subtitle, className, align = 'left' }: VerticalTitleProps) {
    return (
        <div className={cn("flex gap-4", align === 'right' ? "flex-row-reverse" : "flex-row", className)}>
            {/* Vertical Japanese Text Line */}
            <div className="flex flex-col items-center">
                <div className="writing-vertical-rl text-4xl md:text-5xl font-serif tracking-widest text-primary font-normal leading-relaxed select-none">
                    {title}
                </div>
                <div className="h-24 w-[1px] bg-foreground mt-4"></div>
            </div>

            {/* Grid Pattern Decoration (Subtle) */}
            <div className={cn(
                "hidden md:block absolute -z-10 opacity-10",
                align === 'right' ? "right-0" : "left-0"
            )}>
                <svg width="100" height="200" viewBox="0 0 100 200">
                    <path d="M0 0 L100 0 L100 200 L0 200 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M50 0 L50 200" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 50 L100 50" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 100 L100 100" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 150 L100 150" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Subtitle (English or description) */}
            {subtitle && (
                <div className={cn(
                    "writing-vertical-rl text-xs md:text-sm tracking-widest text-muted-foreground uppercase self-start mt-2",
                    align === 'right' ? "mr-2" : "ml-2"
                )}>
                    {subtitle}
                </div>
            )}
        </div>
    );
}
