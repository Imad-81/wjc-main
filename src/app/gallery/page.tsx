"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { useVirtualizer } from "@tanstack/react-virtual"
import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"

// Gallery images array - all 150 images from public/images/gallery
const galleryImages = [
  "1.jpg",
  "1770285672798-191635924.webp",
  "1770285837772-305872350.webp",
  "1770285841789-341495771.webp",
  "1770285846911-626923767.webp",
  "1770285850968-480333514.webp",
  "1770285854488-234402168.webp",
  "1770285856203-59597169.webp",
  "1770285859932-216076138.webp",
  "1770285864382-91491244.webp",
  "1770285868833-293891599.webp",
  "1770285875685-725482690.webp",
  "1770286072200-945598599.webp",
  "1770286077300-371260663.webp",
  "1770286082629-342202780.webp",
  "1770286088841-805443856.webp",
  "1770286094398-316843842.webp",
  "1770286099741-928220087.webp",
  "1770286104127-563225767.webp",
  "1770286108122-310364270.webp",
  "1770286112613-498093799.webp",
  "1770286116753-861990443.webp",
  "1770286119468-157234614.webp",
  "1770286122974-694368395.webp",
  "1770286125960-72382634.webp",
  "1770286129587-389566154.webp",
  "1770286132260-109544686.webp",
  "1770286135345-881228401.webp",
  "1770286139197-763909130.webp",
  "1770286144131-857891795.webp",
  "1770286149472-138515738.webp",
  "1770286154328-452224915.webp",
  "1770286159902-894912327.webp",
  "1770286165498-592727781.webp",
  "1770286172339-240947760.webp",
  "1770286177491-954217478.webp",
  "1770286183152-510276353.webp",
  "1770286189010-817884523.webp",
  "1770286195802-779530594.webp",
  "1770286202413-160030513.webp",
  "1770286210850-849910523.webp",
  "1770286217772-140883784.webp",
  "1770286241776-50022238.webp",
  "1770286268819-311636257.webp",
  "1770286293333-167357732.webp",
  "1770286297051-796498261.webp",
  "1770286299770-789908787.webp",
  "1770286302489-976939438.webp",
  "1770286305306-499719538.webp",
  "1770286308022-598857297.webp",
  "1770286310664-116010902.webp",
  "1770286313712-435356607.webp",
  "1770286318014-782551972.webp",
  "1770286325140-747653148.webp",
  "1770286328298-530629085.webp",
  "1770286331269-404202863.webp",
  "1770286334222-790658255.webp",
  "1770286337436-863801532.webp",
  "1770286340655-619159524.webp",
  "1770286343850-406636497.webp",
  "1770286346883-829598801.webp",
  "1770286350204-738805533.webp",
  "1770286353934-767616472.webp",
  "1770286373869-349149719.webp",
  "1770286377151-918343599.webp",
  "1770286380409-350275984.webp",
  "1770286383385-447829574.webp",
  "1770286387287-756881227.webp",
  "1770286410436-55524557.webp",
  "1770286414370-656304584.webp",
  "1770286418290-538521378.webp",
  "1770286421758-517376738.webp",
  "1770286425288-378772190.webp",
  "1770286428778-611380514.webp",
  "1770286432473-414376567.webp",
  "1770286435494-263887728.webp",
  "1770286439227-143048292.webp",
  "1770286463904-510176766.webp",
  "1770286465752-431836341.webp",
  "1770286468539-553623841.webp",
  "1770286470044-523355770.webp",
  "1770286471886-926058757.webp",
  "1770286472280-772531590.webp",
  "1770286477862-920484991.webp",
  "1770286483990-866204971.webp",
  "1770286489963-920722349.webp",
  "1770286494760-789237736.webp",
  "1770286500654-245472327.webp",
  "1770286506827-663540883.webp",
  "1770286512570-714407102.webp",
  "1770286517869-761534437.webp",
  "1770286523924-961862029.webp",
  "1770286530171-576415974.webp",
  "1770286535677-561263432.webp",
  "1770286541734-295200746.webp",
  "1770286546823-365488601.webp",
  "1770286552936-641573512.webp",
  "1770286559519-766539006.webp",
  "1770286564513-608087538.webp",
  "1770286570448-764038516.webp",
  "1770286576427-336494214.webp",
  "1770286581842-523664245.webp",
  "1770286587043-474601109.webp",
  "1770286590727-899446261.webp",
  "1770286596299-93996230.webp",
  "1770286601998-188668228.webp",
  "1770286606372-686741773.webp",
  "1770286612779-993066833.webp",
  "1770286618551-863276070.webp",
  "1770286624233-543244322.webp",
  "1770286630104-239079644.webp",
  "1770286635669-842115567.webp",
  "1770286640522-615665372.webp",
  "1770286646245-4247820.webp",
  "1770286651902-34857819.webp",
  "1770286657591-770522213.webp",
  "1770286663195-791216377.webp",
  "1770286669332-507400698.webp",
  "1770286675225-468362598.webp",
  "1770286681548-960882546.webp",
  "1770286688626-866980836.webp",
  "1770286694875-914663763.webp",
  "1770286701594-207034112.webp",
  "1770286707918-771154416.webp",
  "1770286713841-142967800.webp",
  "1770286720556-643814715.webp",
  "1770286727243-362378819.webp",
  "1770286738307-732688339.webp",
  "1770286749847-56009163.webp",
  "1770286768680-479871250.webp",
  "1770286775247-65556215.webp",
  "1770286796712-790064529.webp",
  "1770286801895-238605488.webp",
  "1770286807126-420660011.webp",
  "1770286812436-455452612.webp",
  "1770286817320-890733359.webp",
  "1770286822841-991063526.webp",
  "1770286829058-589392967.webp",
  "1770286835311-864695634.webp",
  "1770286838950-231311851.webp",
  "1770286841596-362411586.webp",
  "1770286844750-473536387.webp",
  "1770286848046-919097758.webp",
  "1770286850598-405392761.webp",
  "1770286850871-125367245.webp",
  "1770286851104-321728001.webp",
  "2.jpg",
  "3.jpg",
  "6.jpg",
  "7.jpg",
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
    estimateSize: () => 316, // Estimated row height (300px image + 16px gap)
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
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    paddingBottom: '20px',
                  }}
                >
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
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
