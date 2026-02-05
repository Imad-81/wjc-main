import Image from "next/image"
import Link from "next/link"

const teamHighlights = [
  {
    name: "Dr. Brundaban Mishra",
    role: "Director, Woxsen Japan Centre",
    image: "/director-japan.jpg",
  },
  {
    name: "Mr. Daisuke Tanji",
    role: "Deputy Director",
    image: "/deputy-director.jpg",
  },
  {
    name: "Ms. Priyanka Baynik",
    role: "Executive Director - International Relations",
    image: "/international-relations.jpg",
  },
]

export default function FeaturedTeam() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-foreground font-sans text-4xl md:text-5xl font-semibold tracking-tight flex items-center gap-4">
            <span className="text-2xl">📚</span> LEADERSHIP TEAM
          </h2>
          <Link
            href="/team"
            className="text-foreground hover:text-foreground/80 text-sm tracking-tight font-semibold transition-colors"
          >
            FULL TEAM →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamHighlights.map((member, idx) => (
            <div
              key={idx}
              className="group relative rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-sans text-base font-semibold">{member.name}</h3>
                <p className="text-foreground text-xs tracking-tight mt-2">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
