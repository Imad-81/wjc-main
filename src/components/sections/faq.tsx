"use client"

import { MessageCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const faqs = [
  {
    question: "What is the Woxsen Japan Centre?",
    answer:
      "The Woxsen Japan Centre is a university-led initiative at Woxsen University that focuses on Japanese language education, cultural engagement, academic exchange, and industry collaboration, strengthening ties between India and Japan.",
    category: "General",
  },
  {
    question: "Who can join the Japanese language program?",
    answer:
      "The Japanese language program is open to Woxsen University students and members of the university community. No prior knowledge of Japanese is required for beginner-level courses.",
    category: "Programs",
  },
  {
    question: "What are the benefits of JLPT certification?",
    answer:
      "JLPT certification is widely recognised for higher education in Japan, employment with Japanese companies, and international career opportunities. It also strengthens academic and professional profiles globally.",
    category: "Programs",
  },
  {
    question: "How can I participate in cultural events?",
    answer:
      "Students can participate by registering through official Woxsen Japan Centre announcements and campus communications for workshops, events, and cultural activities.",
    category: "Events",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/60 text-lg max-w-xl mx-auto">
            Everything you need to know about our programs and community
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`group relative bg-background rounded-none overflow-hidden border border-foreground/10 hover:border-foreground/30 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Japanese Corner Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center gap-4 hover:bg-foreground/5 transition-colors"
              >
                {/* Number Badge */}
                <span className="flex-shrink-0 w-8 h-8 rounded-none bg-foreground/10 text-foreground text-sm font-bold flex items-center justify-center">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <span className="flex-1 text-foreground font-normal text-sm md:text-lg pr-4">
                  {faq.question}
                </span>

                {/* Toggle Icon */}
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-none border border-foreground/30 text-foreground flex items-center justify-center text-lg transition-transform duration-300 ${openIndex === idx ? "rotate-45 bg-foreground/10" : ""
                    }`}
                >
                  +
                </span>
              </button>

              {/* Answer - Smooth Accordion */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-6 pb-6 pl-[4.5rem]">
                  <div className="w-12 h-0.5 bg-foreground/30 mb-4" />
                  <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {/* <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-block bg-foreground rounded-none p-8 md:p-10">
            <div className="text-3xl mb-4 w-full">
              <MessageCircle className="h-8 text-red-500 align-middle w-full" />
            </div>
            <h3 className="text-white font-serif text-xl md:text-2xl font-normal mb-3">
              Still Have Questions?
            </h3>
            <p className="text-white/60 text-medium mb-6 max-w-sm">
              We&apos;re here to help. Reach out to our team for personalized assistance.
            </p>
            <a
              href="mailto:japan.centre@woxsen.edu.in"
              className="inline-flex items-center gap-2 bg-foreground text-white font-semibold px-6 py-3 rounded-none hover:bg-foreground/90 transition-all hover:scale-105 border border-foreground/50"
            >
              Contact Us
              <span>→</span>
            </a>
          </div>
        </div> */}
      </div>
    </section>
  )
}
