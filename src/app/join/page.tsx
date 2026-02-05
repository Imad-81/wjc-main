"use client"

import { useState, useEffect, useRef } from "react"
import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"
import { ArrowUpRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Fill the Form",
    description: "Complete our quick registration form with your details and interests.",
  },
  {
    number: "02",
    title: "Get Verified",
    description: "Our team will review your application and send you a confirmation.",
  },
  {
    number: "03",
    title: "Start Exploring",
    description: "Access events, courses, and connect with our vibrant community.",
  },
]

const benefits = [
  { icon: "🌸", title: "Cultural Experiences", description: "Participate in authentic Japanese cultural activities, workshops, and festivals." },
  { icon: "📚", title: "Language Learning", description: "Access comprehensive Japanese language courses for all proficiency levels." },
  { icon: "🤝", title: "Networking", description: "Connect with professionals, students, and cultural enthusiasts." },
  { icon: "✈️", title: "Study Abroad", description: "Explore opportunities for student exchanges and internships in Japan." },
  { icon: "💼", title: "Career Support", description: "Gain mentorship for careers in Japan or with Japanese organizations." },
  { icon: "🎓", title: "Certifications", description: "Prepare for JLPT and other Japanese language certifications." },
]

const testimonials = [
  {
    quote: "Joining the Japan Centre was the best decision of my college life. The cultural events and language classes have been incredible!",
    name: "Priya Sharma",
    role: "BBA, 3rd Year",
  },
  {
    quote: "The JLPT preparation course helped me pass N4 on my first attempt. The instructors are so supportive and knowledgeable.",
    name: "Rahul Menon",
    role: "B.Tech, 2nd Year",
  },
  {
    quote: "I've made lifelong friends and learned so much about Japanese culture. The community here is truly welcoming.",
    name: "Ananya Reddy",
    role: "MBA, 1st Year",
  },
]

const faqs = [
  {
    question: "Who can join the Japanese language course?",
    answer: "All Woxsen University students are eligible to join the Japanese language course. No prior knowledge of Japanese is required.",
  },
  {
    question: "How long is the Japanese language course?",
    answer: "The course duration typically ranges from 8 to 12 weeks, depending on the level and schedule.",
  },
  {
    question: "Will I get a certificate after completing the course?",
    answer: "Yes, participants receive a certificate upon successful completion of the course.",
  },
  {
    question: "How can I register for the course?",
    answer: "Registration details will be shared through the Japan Center website and official university communication channels.",
  },
  {
    question: "What JLPT level does the Japanese course cover, and how does it help with jobs?",
    answer: "The course focuses on JLPT N5 level. Learning Japanese can help students explore internships, entry-level roles, and career opportunities with Japanese companies and Japan-focused organizations.",
  },
]

export default function JoinPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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
    <main className="w-full">
      <PageHeader title="JOIN US" subtitle="Be Part of Our Global Community" watermark="参加" />

      {/* Introduction */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-background texture-overlay">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
            Welcome
          </span>
          <h2 className="text-foreground font-serif text-3xl md:text-5xl font-normal tracking-wide mb-6">
            Be Part of Our Community
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            At the Woxsen Japan Centre, students and faculty come together to
            explore Japanese language, culture, and Indo-Japanese connections.
            Join a vibrant campus community that encourages learning, exchange,
            and international perspective.
          </p>
        </div>
      </section>

      {/* How It Works */}


      {/* Benefits Grid */}


      {/* Registration Cards */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
              Register
            </span>
            <h2 className="text-foreground font-serif text-3xl md:text-4xl font-normal tracking-wide">
              Choose Your Path
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Community Membership Card */}
            <div className="group relative bg-muted rounded-none p-8 border border-foreground/20 hover:border-foreground/40 transition-all duration-300 hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/10 rounded-none -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-none bg-foreground/20 flex items-center justify-center">
                    <span className="text-2xl">🎌</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Community</span>
                </div>
                <h3 className="text-foreground font-serif text-2xl font-normal mb-3">
                  Join Our Community
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Become a member and unlock exclusive access to cultural events, language workshops, and networking sessions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="text-foreground">✓</span> Free for all Woxsen students
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="text-foreground">✓</span> Access to cultural events
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="text-foreground">✓</span> Community networking
                  </li>
                </ul>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSenfpbj8b4zINjx9z0DnqeB0yaTVev_XLvP5rKchMYEI49q3w/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground text-white font-semibold px-6 py-3 rounded-none hover:bg-foreground/90 transition-all duration-300"
                >
                  Register Now
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* JLPT Course Card */}
            <div className="group relative bg-foreground rounded-none p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/20 rounded-none -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-none bg-foreground/30 flex items-center justify-center">
                    <span className="text-2xl">📖</span>
                  </div>
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Language Course</span>
                </div>
                <h3 className="text-white font-serif text-2xl font-normal mb-3">
                  Enroll in JLPT Course
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Master Japanese with structured JLPT preparation courses from N5 to N2 with experienced instructors.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-white">✓</span> Native instructors
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-white">✓</span> All JLPT levels
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-white">✓</span> Mock exams included
                  </li>
                </ul>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSczMcKyQtLQMNaZA_zrEA4ddzJVK-f5NbtOhAqtye3dIE20ew/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-foreground font-semibold px-6 py-3 rounded-none hover:bg-white/90 transition-all duration-300"
                >
                  Enroll Now
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="text-foreground font-serif text-3xl md:text-4xl font-normal tracking-wide">
              What Our Members Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-muted rounded-none p-8 relative"
              >
                <div className="text-foreground/20 text-6xl font-serif absolute top-4 left-4">"</div>
                <div className="relative pt-8">
                  <p className="text-foreground/80 leading-relaxed mb-6 italic">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="text-foreground font-semibold">{testimonial.name}</p>
                    <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              Everything you need to know about joining our Japanese language program
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
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
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
                    className={`flex-shrink-0 w-8 h-8 rounded-none border border-foreground/30 text-foreground flex items-center justify-center text-lg transition-transform duration-300 ${openFaq === idx ? "rotate-45 bg-foreground/10" : ""
                      }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer - Smooth Accordion */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-white font-serif text-2xl md:text-3xl font-normal mb-4">
            Still Have Questions?
          </h3>
          <p className="text-white/70 mb-6">
            Reach out to us directly for more information about our programs and membership.
          </p>
          <a
            href="mailto:japan.centre@woxsen.edu.in"
            className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-foreground font-semibold px-6 py-3 rounded-none transition-all"
          >
            ✉️ japan.centre@woxsen.edu.in
          </a>
        </div>
      </section> */}

      <Footer />
    </main>
  )
}
