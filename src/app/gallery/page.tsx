"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { useVirtualizer } from "@tanstack/react-virtual"
import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"

// Gallery images array - only images that exist in public/images/gallery
const galleryImages = [
  "DSC00027-compressed.webp",
  // "DSC00164-compressed.webp",
  "DSC09500 (1)-compressed.webp",
  "DSC00122-compressed.webp",
  "DSC00181-compressed.webp",
  "DSC00493-compressed.webp",
  "DSC09428-compressed.webp",
  "DSC00509-compressed.webp",
  "DSC00575-compressed.webp",
  "DSC09354-compressed.webp",
  "DSC00582-compressed.webp",
  "DSC09704-compressed.webp",
  "DSC09444-compressed.webp",
  "DSC09647-compressed.webp",
  "DSC09430-compressed.webp",
  "1770309840004-237969352.webp",
  "1770309848480-141067322.webp",
  "1770309855813-516985966.webp",
  "1770309865220-546228310.webp",
  "1770309887871-486464792.webp",
  "1770309891588-818860072.webp",
  "1770309895224-283965575.webp",
  "1770309898683-653592496.webp",
  "1770309901847-150513624.webp",
  "1770309905455-830631177.webp",
  "1770309906756-372615299.webp",
  "1770309912468-28173631.webp",
  "1770309918135-477737323.webp",
  "1770309924864-236834199.webp",
  "1770309929727-327170501.webp",
  "1770309933220-104443486.webp",
  "1770309938202-570815785.webp",
  "1770309938438-291486830.webp",
  "1770309938680-645573079.webp",
  "1770309941945-746835150.webp",
].map((img) => ({
  src: `/images/gallery/${img}`,
  alt: `Gallery image`,
}))

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(4)

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumnCount(2)
      else if (window.innerWidth < 1024) setColumnCount(3)
      else setColumnCount(4)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Group images into rows for virtual scrolling
  const rows: Array<typeof galleryImages> = []
  for (let i = 0; i < galleryImages.length; i += columnCount) {
    rows.push(galleryImages.slice(i, i + columnCount))
  }

  // Virtual row virtualizer - uses window scrolling
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => columnCount === 2 ? 225 : 316, // Mobile: 300px + 2px gap, Desktop: 300px + 16px gap
    overscan: 5,
  })

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1)
  }, [selectedIndex])

  // Navigate to next image
  const goToNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1)
  }, [selectedIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") setSelectedIndex(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, goToPrevious, goToNext])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedIndex])

  return (
    <main ref={parentRef} className="w-full overflow-auto">
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

          {/* Virtual Grid Container */}
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const rowImages = rows[virtualRow.index]

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {/* <div className="grid gap-4 mb-0.5 md:mb-5" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}> */}
                  <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" >
                    {rowImages.map((image: { src: string; alt: string }, colIndex: number) => {
                      const imageIndex = virtualRow.index * columnCount + colIndex

                      return (
                        <div
                          key={imageIndex}
                          className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-foreground/5"
                          onClick={() => setSelectedIndex(imageIndex)}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw "
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300" />

                          {/* Japanese Corner Accents */}
                          <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-white/0 group-hover:border-white/50 transition-all duration-300" />
                          <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-white/0 group-hover:border-white/50 transition-all duration-300" />
                          <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-white/0 group-hover:border-white/50 transition-all duration-300" />
                          <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-white/0 group-hover:border-white/50 transition-all duration-300" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-white/60 text-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </span>
            <button
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-16 relative">
            {/* Left Arrow */}
            <button
              className="absolute left-2 md:left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={goToPrevious}
            >
              ←
            </button>

            {/* Image */}
            <div className="relative w-full max-w-5xl h-[70vh]">
              <Image
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Right Arrow */}
            <button
              className="absolute right-2 md:right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={goToNext}
            >
              →
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
