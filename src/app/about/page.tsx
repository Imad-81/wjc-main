import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"
import CountUp from "@/components/ui/count-up"
import Image from "next/image"
import Link from "next/link"

const partnerships = [
  {
    title: "Woxsen University",
    logo: "/images/logos/woxsen.jpg",
    description:
      "Woxsen University establishes and oversees the Woxsen Japan Centre, providing the academic framework, resources, and leadership essential to its functioning.",
    benefits: ["Academic Framework & Leadership", "Global Engagement Programs", "Interdisciplinary Learning"],
    url: "https://www.woxsen.edu.in",
  },
  {
    title: "Indobox Inc.",
    logo: "/images/logos/indobox.webp",
    description:
      "Indobox Inc., headquartered in Hyderabad, plays a pivotal role in the development and execution of the centre's programming.",
    benefits: ["Language Immersion Sessions", "Career Guidance & Mentorship", "Cultural Experiences"],
    url: "https://www.indobox.co.jp",
  },
  {
    title: "Nara Japan Centre",
    logo: "/images/logos/nara-japan.png",
    description:
      "Rooted in the rich cultural heritage of Japan, Nara Japan Centre infuses its mission with unique cultural collaborations and academic exchanges.",
    benefits: ["Cultural Collaborations", "Academic Exchanges", "Long-term Relationship Building"],
    url: "#",
  },
]

const highlights = [
  { number: "2025", label: "Inaugurated" },
  { number: "7+", label: "Faculty" },
  { number: "18+", label: "Student Leaders" },
  { number: "150+", label: "Members" },
]

const teamPreview = [
  { name: "Dr. Raul Rodriguez", role: "Chairperson", image: "/images/team/faculty-leadership/dr-raul-v-rodriguez.webp" },
  { name: "Dr. Brundaban Mishra", role: "Director", image: "/images/team/faculty-leadership/dr-brundaban-mishra.jpg" },
  { name: "Mr. Tanji Daisuke", role: "Deputy Director", image: "/images/team/faculty-leadership/mr-daisuke-tanji.jpg" },
]

export default function AboutPage() {
  return (
    <main className="w-full">
      <PageHeader title="ABOUT US" subtitle="Essence of Japan, Within Reach" watermark="概要" />

      {/* Introduction with Stats */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-background texture-overlay">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-foreground/80 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            The Centre supports Japanese language education, cultural initiatives, academic 
collaboration, and international partnerships, creating opportunities for students 
and faculty to engage with Japan’s traditions, values, and contemporary practices. 
Through interdisciplinary participation and experiential learning, the Centre aims 
to foster global awareness, cross-cultural understanding, and meaningful 
international exposure within the university community
          </p>

          {/* Mini Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {highlights.map((stat, idx) => (
              <div key={idx} className="text-center">
                <CountUp
                  end={stat.number}
                  className="text-foreground font-serif text-3xl md:text-4xl font-normal mb-1 block"
                />
                <div className="text-foreground/60 text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-background rounded-none p-8 md:p-10 border border-foreground/10">
              <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">Our Mission</span>
              <h2 className="text-foreground font-serif text-2xl md:text-3xl font-normal tracking-wide mb-6">
                Bridging Cultures Through Education
              </h2>
              <p className="text-foreground/70 text-base leading-relaxed">
                To strengthen India–Japan relations at Woxsen University by
                promoting intercultural understanding through Japanese language
                education, cultural engagement, academic collaboration, and
                experiential learning opportunities for students and faculty.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-background rounded-none p-8 md:p-10 border border-foreground/10">
              <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">Our Vision</span>
              <h2 className="text-foreground font-serif text-2xl md:text-3xl font-normal tracking-wide mb-6">
                A Future of Shared Understanding
              </h2>
              <p className="text-foreground/70 text-base leading-relaxed">
                To establish the Woxsen Japan Centre as a leading platform for Indo
                Japanese academic and cultural collaboration, fostering global
                awareness, cultural literacy, and sustained engagement with Japan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white/30 text-7xl font-serif mb-4">"</div>
          <blockquote className="text-white text-xl md:text-2xl font-serif leading-relaxed mb-8 -mt-8">
            Together we are, Together we will
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/images/team/faculty-leadership/dr-brundaban-mishra.jpg"
              alt="Dr. Brundaban Mishra"
              width={56}
              height={56}
              className="w-14 h-14 rounded-none object-cover border-2 border-white"
            />
            <div className="text-left">
              <p className="text-white font-semibold">Dr. Brundaban Mishra</p>
              <p className="text-white/60 text-sm">Director, Woxsen Japan Centre</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      {/* <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background texture-overlay">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">What We Stand For</span>
            <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Cultural Bridge", description: "Connecting Indian and Japanese communities through meaningful exchanges and shared experiences." },
              { title: "Academic Excellence", description: "Providing world-class Japanese language education and professional development opportunities." },
              { title: "Authentic Experience", description: "Offering genuine insights into Japanese culture, traditions, and contemporary society." },
            ].map((value, idx) => (
              <div key={idx} className="group bg-foreground/5 rounded-none p-8 text-center hover:bg-foreground/10 transition-all border border-transparent hover:border-foreground/20 hover:shadow-lg">
                <h3 className="text-foreground font-serif text-2xl font-normal mb-3">{value.title}</h3>
                <p className="text-foreground/70 text-md leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Preview */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">Leadership</span>
              <h2 className="text-foreground font-serif text-3xl md:text-4xl font-normal tracking-wide">
                Meet Our Team
              </h2>
            </div>
            <Link
              href="/team"
              className="mt-4 md:mt-0 text-foreground hover:text-foreground/80 font-semibold text-sm transition-colors"
            >
              View Full Team →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teamPreview.map((member, idx) => (
              <div key={idx} className="group relative rounded-none overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-white text-foreground text-xs font-semibold px-3 py-1 rounded-none mb-2">
                    {member.role}
                  </span>
                  <h3 className="text-white font-serif text-xl">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background texture-overlay">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">Collaborations</span>
            <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide mb-6">
              Our Partnerships
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Building bridges between India and Japan through strategic collaborations.
            </p>
          </div>

          {/* Partnership Cards with Logos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {partnerships.map((partner, idx) => (
              <div
                key={idx}
                className="group bg-muted rounded-none p-8 hover:bg-foreground/5 transition-all duration-300 border border-foreground/10 hover:border-foreground/20 hover:shadow-lg"
              >
                {/* Logo */}
                <div className="w-full h-32 bg-white rounded-none p-4 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.title}
                    width={250}
                    height={150}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-foreground font-serif text-3xl font-medium mb-4 group-hover:text-foreground transition-colors">
                  {partner.title}
                </h3>
                <p className="text-foreground/70 text-medium leading-relaxed mb-5">{partner.description}</p>

                <div className="space-y-2 mb-5">
                  {partner.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-center gap-2 text-medium">
                      <span className="text-foreground">✓</span>
                      <span className="text-foreground/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 text-medium   font-medium transition-colors"
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>

          {/* Become a Partner CTA */}
          {/* <div className="bg-foreground rounded-none p-8 md:p-12 text-center">
            <h3 className="text-white font-serif text-2xl md:text-3xl font-normal mb-4">
              Interested in Partnering With Us?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              We welcome collaborations with organizations that share our vision of fostering Indo-Japanese relations.
            </p>
            <a
              href="mailto:japan.centre@woxsen.edu.in"
              className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-foreground font-semibold px-6 py-3 rounded-none transition-all hover:scale-105 border border-foreground/50"
            >
              Contact Us for Partnerships
            </a>
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-foreground/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">Get Involved</span>
          <h2 className="text-foreground font-serif text-3xl md:text-5xl font-normal tracking-wide mb-6">
            Be Part of Our Journey
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Join a vibrant community that celebrates the fusion of Indian and Japanese cultures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/join"
              className="bg-foreground hover:bg-foreground/90 text-foreground font-semibold px-8 py-4 rounded-none transition-all hover:scale-105 text-base border border-foreground/50"
            >
              Join Our Community
            </Link>
            <Link
              href="/events"
              className="border border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-foreground/40 font-semibold px-8 py-4 rounded-none transition-all text-base"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section> */}

      <Footer />
    </main >
  )
}
