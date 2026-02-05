import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"
import Link from "next/link"

const levels = [
  {
    level: "N5",
    emoji: "🎌",
    title: "Beginner",
    duration: "3 months",
    description: "Foundation in basic conversational Japanese and everyday kanji characters.",
    topics: ["Hiragana & Katakana", "Basic Grammar", "Essential Vocabulary", "Simple Conversations"],
    color: "from-green-500/20 to-green-500/5",
  },
  {
    level: "N4",
    emoji: "🌅",
    title: "Elementary",
    duration: "4 months",
    description: "Build confidence with practical communication skills for daily situations.",
    topics: ["Daily Conversations", "Written Japanese", "Business Etiquette", "Cultural Context"],
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    level: "N3",
    emoji: "🏮",
    title: "Intermediate",
    duration: "5 months",
    description: "Master more complex conversations and written communication in professional settings.",
    topics: ["Advanced Grammar", "Business Japanese", "Media & News", "Cultural Nuances"],
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    level: "N2",
    emoji: "⛩️",
    title: "Advanced",
    duration: "6 months",
    description: "Achieve proficiency in abstract discussions and specialized professional topics.",
    topics: ["Technical Vocabulary", "Abstract Concepts", "Keigo (Honorific Language)", "Professional Writing"],
    color: "from-red-500/20 to-red-500/5",
  },
]

const stats = [
  { number: "4", label: "JLPT Levels" },
  { number: "50+", label: "Students Trained" },
  { number: "95%", label: "Pass Rate" },
  { number: "Native", label: "Instructors" },
]

const benefits = [
  {
    icon: "💼",
    title: "Career Opportunities",
    description: "Open doors to Japanese companies and international roles requiring Japanese proficiency.",
  },
  {
    icon: "🎓",
    title: "Study in Japan",
    description: "Qualify for scholarships and study programs at prestigious Japanese universities.",
  },
  {
    icon: "🌏",
    title: "Cultural Connection",
    description: "Deepen your understanding of Japanese art, literature, anime, and pop culture.",
  },
  {
    icon: "🤝",
    title: "Global Network",
    description: "Connect with Japanese professionals and build lasting cross-cultural relationships.",
  },
]

export default function JLPTPage() {
  return (
    <main className="w-full">
      <PageHeader title="JAPANESE LANGUAGE PROGRAM" subtitle="JLPT Preparation & Language Mastery" watermark="言語" />

      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background texture-overlay">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-20 text-center">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
              Language Excellence
            </span>
            <h2 className="text-foreground font-serif text-4xl md:text-5xl font-normal tracking-wide mb-6">
              Learn Japanese with Excellence
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed max-w-3xl mx-auto">
              Our Japanese language programme is designed to prepare
              students for the Japanese Language Proficiency Test (JLPT) through
              structured, classroom-led instruction grounded in authentic Japanese
              pedagogical practices. The programme is a paid offering and is
              currently available at the N5 (Beginner) level. Instruction is supported
              by native Japanese speakers, providing learners with accurate pronunciation, cultural context, and real-world language exposure. As
              the programme evolves, higher levels beginning with N4 will be
              introduced in a phased manner.
            </p>
          </div>



          {/* JLPT Levels Grid */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
                Course Levels
              </span>
              <h3 className="text-foreground font-serif text-3xl md:text-4xl font-normal tracking-wide mb-4">
                JLPT Preparation Courses
              </h3>
              <p className="text-foreground/70 text-base leading-relaxed max-w-2xl mx-auto">
                The JLPT levels below are provided for general understanding.
                Currently, the Woxsen Japan Centre offers structured preparation for
                JLPT N5. Higher levels will be introduced progressively as the
                programme develops.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {levels.map((level, idx) => (
                <div
                  key={idx}
                  className={`relative group p-8 rounded-none border border-foreground/20 bg-gradient-to-b ${level.color} hover:border-foreground/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                >
                  <div className="text-5xl mb-4">{level.emoji}</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-foreground font-serif text-3xl font-normal">{level.level}</h3>
                    <span className="text-foreground/50 text-sm">• {level.duration}</span>
                  </div>
                  <p className="text-foreground font-semibold text-lg mb-3">{level.title}</p>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6">{level.description}</p>

                  <div className="space-y-2">
                    {level.topics.map((topic, topicIdx) => (
                      <div key={topicIdx} className="flex items-start gap-2">
                        <span className="text-foreground text-sm">✓</span>
                        <span className="text-foreground/70 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      {/* Enroll CTA */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="text-6xl mb-6">📚</div> */}
          <h2 className="text-foreground font-serif text-3xl md:text-5xl font-normal tracking-wide mb-6">
            Start Your Japanese Journey
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Enroll in our JLPT preparation program and take the first step toward Japanese language proficiency.
            Our expert instructors are ready to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSenfpbj8b4zINjx9z0DnqeB0yaTVev_XLvP5rKchMYEI49q3w/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground hover:bg-foreground/90 text-white font-normal px-8 py-4 rounded-none transition-all hover:scale-105 text-base"
            >
              Enroll Now
            </Link>
            <Link
              href="/join"
              className="border-1 border-foreground/30 text-foreground hover:bg-foreground/10 font-normal px-8 py-4 rounded-none transition-all text-base"
            >
              Join Community First
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
