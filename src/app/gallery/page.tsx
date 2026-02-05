"use client"

import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"

// Skeleton placeholder component
const SkeletonCard = () => {
  return (
    <div className="aspect-square overflow-hidden rounded-none bg-foreground/10 animate-pulse">
      <div className="w-full h-full bg-foreground/5" />
    </div>
  )
}

export default function GalleryPage() {
  // Generate skeleton placeholders (e.g., 12 items for a nice grid)
  const skeletonCount = 12

  return (
    <main className="w-full">
      <PageHeader title="GALLERY" subtitle="Moments from Our Journey" watermark="写真" />

      {/* Gallery Grid */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-foreground font-sans text-sm tracking-widest font-bold uppercase mb-4 block">
              Photo Gallery
            </span>
            <h2 className="text-foreground font-serif text-3xl md:text-4xl font-normal tracking-wide mb-4">
              Capturing Our Moments
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              A visual journey through our cultural events, workshops, and community gatherings
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="text-center mb-12">
            <p className="text-foreground/50 text-lg">
              coming soon...
            </p>
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
