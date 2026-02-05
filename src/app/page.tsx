import Hero from "@/components/sections/hero"
import FeaturedAbout from "@/components/sections/featured-about"
import FeaturedEvents from "@/components/sections/featured-events"
import FeaturedTeam from "@/components/sections/featured-team"
import FeaturedJLPT from "@/components/sections/featured-jlpt"
import FeaturedJoin from "@/components/sections/featured-join"
import FeaturedCTA from "@/components/sections/featured-cta"
import FAQ from "@/components/sections/faq"
import Footer from "@/components/sections/footer"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <main className="w-full">

      <Hero />
      <FeaturedAbout />
      <FeaturedEvents />
      {/* <FeaturedJLPT /> */}
      {/* <FeaturedTeam /> */}
      {/* <FeaturedJoin /> */}
      <FAQ />
      <FeaturedCTA />
      <Footer />
    </main>
  )
}
