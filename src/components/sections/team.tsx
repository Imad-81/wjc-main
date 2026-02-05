"use client"

import Image from "next/image"

const teamMembers = [
  {
    name: "Dr. Satoshi Yamamoto",
    role: "Centre Director",
    image: "/director-japan.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Academic Lead",
    image: "/academic-lead-india.jpg",
  },
  {
    name: "Akira Tanaka",
    role: "Operations Manager",
    image: "/operations-japan.jpg",
  },
  {
    name: "Rajesh Kumar",
    role: "Partnerships Director",
    image: "/partnerships-india.jpg",
  },
]

export default function Team() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-foreground font-sans text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center">
            LEADERSHIP TEAM
          </h2>

          <p className="mt-8 text-foreground/70 text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed">
            Experienced leaders dedicated to bridging cultures and fostering excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group relative rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-sans text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-foreground text-sm tracking-tight">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
