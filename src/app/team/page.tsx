"use client"

import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const faculty = [
  {
    name: "Dr. Raul Rodriguez",
    role: "Chairperson",
    subtitle: "Woxsen University",
    image: "/images/team/faculty-leadership/dr-raul-v-rodriguez.webp"
  },
  {
    name: "Dr. Brundaban Mishra",
    role: "Director",
    subtitle: "Woxsen University",
    image: "/images/team/faculty-leadership/dr-brundaban-mishra.jpg"
  },
  {
    name: "Ms. Priyanka Banik",
    role: "Vice-Chairperson",
    subtitle: "Woxsen University",
    image: "/images/team/faculty-leadership/ms-priyanka-baynik.jpeg"
  },
  {
    name: "Mr. Tanji Daisuke",
    role: "Deputy Director",
    subtitle: "Indobox Inc.",
    image: "/images/team/faculty-leadership/mr-daisuke-tanji.jpg"
  },
  {
    name: "Ms. Nistha Jain",
    role: "Manager",
    subtitle: "Woxsen University",
    image: "/images/team/faculty-leadership/ms-nishta-jain.jpeg"
  },
  {
    name: "Mr. Vasim Hunani",
    role: "Assistant Manager",
    subtitle: "Woxsen University",
    image: "/images/team/faculty-leadership/mr-vasim-hunani.jpeg"
  },
  {
    name: "Dr. Hemachandran Kannan",
    role: "Advisor",
    subtitle: "Woxsen University",
    image: "/images/team/faculty-leadership/dr-hemachandran.png"
  },
  {
    name: "Dr. Peplluis Esteva",
    role: "Advisor",
    subtitle: "Woxsen University",
    image: "/images/team/faculty-leadership/peplluis.png"
  }
];

const studentLeadership = [
  { name: "Praveena Kiran", role: "President", subtitle: "B.Tech'28", image: "/images/team/student-community/praveena-kiran.jpg" },
  { name: "Harshith Chakravarthy", role: "Vice President", subtitle: "BBA'28", image: "/images/team/student-community/mashetty-harshith-chakravarthy.jpg" },
  { name: "Neha Suryavanshi", role: "Dept. Head - Media & Promotion", subtitle: "BBA'28", image: "/images/team/student-community/neha-l-suryavanshi.jpg", scale: "scale-[1.8]", hoverScale: "group-hover:scale-[1.6]", position: "object-[70%_180%]" },
  { name: "Mythilee Naigapula", role: "Dept. Head - Digital Services & Records", subtitle: "BBA'28", image: "/images/team/student-community/naigapula-mythilee.jpg" },
  { name: "Sathyapal Reddy", role: "Dept. Head - Operations & Logistics", subtitle: "BBA'28", image: "/images/team/student-community/sathyapal-reddy.jpg" },
  { name: "Sahaj Daga", role: "Dept. Head - Outreach & Partnerships", subtitle: "BBA'28", image: "/images/team/student-community/sahaj-daga.jpg" },
  { name: "Vaishnavi Kaling", role: "Dept. Head - Creative Studio", subtitle: "BBA'28", image: "/images/team/student-community/vaishnavi-kaling.jpg" },
  { name: "Sreshta Tathiparthi", role: "Dept. Head - Learning & Welfare", subtitle: "BBA'28", image: "/images/team/student-community/sreshta-tathiparthi.jpg" },
];

// Enhanced team member card component with better hover effects
function TeamMemberCard({
  member,
  index,
  featured = false
}: {
  member: { name: string; role: string; subtitle?: string; image: string; scale?: string; hoverScale?: string; position?: string };
  index: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-none overflow-hidden transition-all duration-700 ease-out cursor-pointer ${isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-12 scale-95"
        } ${featured ? "lg:col-span-1" : ""}`}
      style={{
        transitionDelay: `${index * 80}ms`
      }}
    >
      {/* Image Container */}
      <div className={`relative w-full ${featured ? "aspect-[3/4]" : "aspect-[3/4]"} overflow-hidden bg-muted`}>
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className={`w-full h-full object-cover transition-all duration-500 ${member.hoverScale || (member.scale ? "" : "group-hover:scale-110")} ${member.scale || ""} ${member.position || ""}`}
        />

        {/* Gradient Overlay - Enhanced on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Japanese Corner Accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-foreground/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-foreground/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-foreground/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-foreground/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Accent Border on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-foreground/40 transition-colors duration-300 rounded-none" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Role Badge */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block bg-foreground/90 text-white text-xs font-semibold px-3 py-1 rounded-none mb-3 tracking-wide">
            {member.role}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-white font-serif text-xl font-normal leading-tight mb-1 transform group-hover:-translate-y-1 transition-transform duration-300">
          {member.name}
        </h3>

        {/* Subtitle - Shows on hover */}
        {member.subtitle && (
          <p className="text-white/70 text-sm tracking-tight opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {member.subtitle}
          </p>
        )}

        {/* Decorative Line */}
        <div className="w-0 h-0.5 bg-foreground mt-3 group-hover:w-12 transition-all duration-500" />
      </div>
    </div>
  )
}

export default function TeamPage() {
  return (
    <main className="w-full">
      <PageHeader title="OUR TEAM" subtitle="Leadership Driving Cultural Exchange" watermark="仲間" />

      {/* Faculty Section */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background texture-overlay">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-2 block">Leadership</span>
            <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide">
              Faculty & Leadership
            </h2>
          </div>
          <p className="text-foreground/70 mb-16 max-w-2xl">
            Experienced professionals dedicated to bridging Japan and India through education and cultural engagement.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member, idx) => (
              <TeamMemberCard key={idx} member={member} index={idx} featured={idx < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* Student Community Section */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-2 block">Community</span>
            <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide">
              Student Community Leadership
            </h2>
          </div>
          <p className="text-foreground/70 mb-16 max-w-2xl">
            Dynamic student leaders driving engagement and cultural initiatives across campus.
          </p>

          {studentLeadership.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {studentLeadership.map((member, idx) => (
                <TeamMemberCard key={idx} member={member} index={idx % 5} />
              ))}
            </div>
          ) : (
            <div className="py-16 px-8 bg-background rounded-none border border-foreground/10 text-center">
              <div className="text-5xl mb-6">👥</div>
              <h3 className="text-foreground font-serif text-2xl md:text-3xl font-normal tracking-wide mb-4">
                Coming Soon...
              </h3>
              <p className="text-foreground/60 text-base">
                Student community details will be added shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      {/* <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white font-serif text-3xl md:text-5xl font-normal tracking-wide mb-6">
            Interested in Joining the Team?          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            The Woxsen Japan Centre welcomes students and faculty who are
            interested in contributing to its academic, cultural, and engagement
            initiatives. Those looking to be part of Japan-focused programs, events,
            and collaborations are encouraged to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/join"
              className="bg-foreground hover:bg-foreground/90 text-foreground font-semibold px-8 py-4 rounded-none transition-all hover:scale-105 text-base"
            >
              Apply for Membership
            </Link>
            <a
              href="mailto:japan.centre@woxsen.edu.in"
              className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-none transition-all text-base"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  )
}
