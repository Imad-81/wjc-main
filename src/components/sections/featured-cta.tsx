"use client"

import { useState } from "react"

export default function FeaturedCTA() {
  const [email, setEmail] = useState("")

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-muted relative overflow-hidden">
      {/* Japanese Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] font-serif text-[15rem] font-bold pointer-events-none select-none">
        連絡
      </div>

      {/* Japanese Corner Accents */}
      {/* <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-foreground/20" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-foreground/20" /> */}

      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            {/* <span className=" font-sans text-foreground text-sm tracking-widest font-bold uppercase mb-4 block">
              Stay Connected
            </span> */}
            <h3 className=" text-3xl md:text-4xl font-serif font-normal mb-3">
              Stay Informed
            </h3>
            <p className="text-foreground/60 text-base leading-relaxed ">
              Updates on events, language programs, and initiatives of the Woxsen Japan Centre.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-5 py-4 bg-white/10 border border-foreground/20 rounded-none text-black placeholder:text-black/40 focus:outline-none focus:border-foreground w-full sm:w-72 transition-colors"
            />
            <button className="px-8 py-4 bg-foreground text-white font-semibold rounded-none hover:bg-foreground/90 transition-all hover:scale-105">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
