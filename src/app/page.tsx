import Hero from "@/components/sections/hero"
import FeaturedAbout from "@/components/sections/featured-about"
import FeaturedEvents from "@/components/sections/featured-events"
import FeaturedCTA from "@/components/sections/featured-cta"
import FAQ from "@/components/sections/faq"
import Footer from "@/components/sections/footer"


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
