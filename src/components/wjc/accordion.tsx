"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AccordionItem {
  question: string
  answer: string
}

/**
 * FAQ accordion. One panel open at a time; clicking the open item closes it.
 * Uses real <button>s so keyboard and screen-reader behaviour comes for free.
 */
export default function Accordion({
  items,
  className,
}: {
  items: AccordionItem[]
  className?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  return (
    <div className={cn("divide-y", className)} style={{ borderColor: "var(--theme-faq-border)" }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div
            key={item.question}
            className={cn("faq-item border-b transition-colors", isOpen && "active")}
            style={{ borderColor: "var(--theme-faq-border)" }}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-4 py-6 text-left"
              >
                <span className="text-sm text-[var(--theme-text)] md:text-base">
                  {item.question}
                </span>
                <Plus
                  aria-hidden="true"
                  className={cn(
                    "size-4 shrink-0 text-[var(--theme-accent)] transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-4 pb-6"
            >
              <p className="max-w-3xl text-sm leading-relaxed text-[var(--theme-muted-text)]">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
