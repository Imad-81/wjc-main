"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const ContentBlock = ({
  title,
  content,
  imageSrc,
  reverse = false,
}: {
  title: string
  content: string
  imageSrc: string
  reverse?: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 my-20`}
    >
      <div className="flex-1">
        <h3 className="text-foreground font-sans text-3xl md:text-4xl font-semibold mb-6 tracking-wide">{title}</h3>
        <p className="text-foreground/80 text-base md:text-lg leading-relaxed text-justify">{content}</p>
      </div>

      <div
        className={`flex-1 relative ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          } transition-all duration-700`}
      >
        <div className="relative rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
          <div className="absolute inset-0 bg-foreground/20 rounded-none pointer-events-none" />
          <Image
            src={imageSrc || "/placeholder.svg?height=400&width=500&query=woxsen-japan"}
            alt={title}
            width={500}
            height={400}
            className="w-full h-auto object-cover rounded-none"
          />
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4">
            <h2 className="text-foreground font-sans text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              ABOUT US
            </h2>
            <div className="flex-grow h-px bg-foreground" />
          </div>

          <p className="mt-8 text-foreground/70 text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed">
            The Woxsen Japan Centre is an institutional platform
            at Woxsen University dedicated to advancing academic, cultural, and
            industry engagement with Japan. The Centre supports Japanese
            language education, cultural initiatives, academic collaboration, and
            international partnerships, creating opportunities for students and
            faculty to engage with Japan’s traditions, values, and contemporary
            practices. Through interdisciplinary participation and experiential
            learning, the Centre aims to foster global awareness, cross-cultural
            understanding, and meaningful international exposure within the
            university community.
          </p>
        </div>

        {/* Content Blocks */}
        <ContentBlock
          title="OUR MISSION"
          content="To strengthen India–Japan relations at Woxsen University by 
promoting intercultural understanding through Japanese language 
education, cultural engagement, academic collaboration, and 
experiential learning opportunities for students and faculty. "
          imageSrc="/mission-japan.jpg"
        />

        <ContentBlock
          title="OUR VISION"
          content="To establish the Woxsen Japan Centre as a leading platform for Indo
Japanese academic and cultural collaboration, fostering global 
awareness, cultural literacy, and sustained engagement with Japan."
          imageSrc="/vision-japan.jpg"
          reverse
        />

        {/* <ContentBlock
          title="CORE VALUES"
          content="Excellence in all endeavors, respect for diverse perspectives, commitment to continuous improvement (kaizen), and building sustainable partnerships. We believe in creating value through thoughtful leadership and ethical business practices."
          imageSrc="/values-japan.jpg"
        /> */}
      </div>
    </section>
  )
}
