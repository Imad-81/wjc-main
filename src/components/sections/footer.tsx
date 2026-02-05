"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const socialLinks = [
  { name: "Instagram", url: "https://instagram.com", icon: "📷" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
  { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
]

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "JLPT Program", href: "/jlpt" },
  { name: "Join Us", href: "/join" },
]

const partners = [
  { name: "Woxsen University", logo: "/images/logos/woxsen.jpg" },
  { name: "Indobox Inc.", logo: "/images/logos/indobox.webp" },
  { name: "Nara Japan Centre", logo: "/images/logos/nara-japan.png" },
]

export default function Footer() {
  const [email, setEmail] = useState("")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-foreground text-white relative overflow-hidden">
      {/* Liquid Glass - High Specular Shine */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {/* 1. Curved Surface Reflection */}
        <div className="absolute -inset-x-[30%] top-0 h-[60%] bg-linear-to-b from-white/15 via-white/5 to-transparent rounded-b-[100%] mix-blend-overlay" />




      </div>
      {/* Japanese Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/2 font-serif text-[20rem] font-bold pointer-events-none select-none">
        日本
      </div>

      {/* Japanese Corner Accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-foreground/20" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-foreground/20" />

      <div className="relative z-10 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Newsletter CTA */}
          {/* <div className="mb-16 pb-12 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif font-normal mb-2">Stay Informed</h3>
                <p className="text-white/60"> Receive updates on events,
                  programs, and opportunities related to Japan.</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-none text-white placeholder:text-white/40 focus:outline-none focus:border-foreground w-64"
                />
                <button className="px-6 py-3 bg-foreground text-white font-semibold rounded-none hover:bg-foreground/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <Image
                  src="/images/logos/white-20logo.png"
                  alt="Woxsen Japan Centre"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              {/* <h3 className="text-3xl font-semibold mb-3 ">Woxsen Japan Centre</h3> */}
              <p className="text-white/60 text-medium leading-relaxed mb-6">
                The Woxsen Japan Centre
                facilitates academic collaboration, language education, and
                structured engagement with Japan.              </p>
              {/* Social Links */}
              {/* <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-foreground/20 hover:border-foreground/50 border border-transparent transition-all"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-medium inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-white group-hover:w-3 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-4">Contact</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-white/40 text-medium uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:japan.centre@woxsen.edu.in" className="text-white/80 hover:text-white transition-colors">
                    japan.centre@woxsen.edu.in
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-medium uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white/60">
                    Woxsen University<br />
                    Hyderabad, India
                  </p>
                </div>
              </div>
            </div>

            {/* Partners */}
            <div>
              <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-4">Our Partners</h4>
              <div className="flex flex-wrap gap-3">
                {partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="w-32 h-20 bg-white rounded-none p-2 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
                    title={partner.name}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>



          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
            <p>© 2026 Woxsen Japan Centre. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group"
                title="Back to top"
              >
                <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Map */}

    </footer>
  )
}
