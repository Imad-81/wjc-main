import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getEventBySlug, pastEvents } from "@/data/events"
import Footer from "@/components/sections/footer"
import PageHeader from "@/components/sections/page-header"

export function generateStaticParams() {
    return pastEvents.map((event) => ({
        slug: event.slug,
    }))
}

export default async function EventDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const event = getEventBySlug(slug)

    if (!event) {
        notFound()
    }

    return (
        <main className="w-full">
            <PageHeader title={event.title} subtitle={`${event.category} • ${new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`} />

            <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-background">
                <div className="max-w-5xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors mb-8"
                    >
                        ← Back to Events
                    </Link>

                    {/* Event Details */}
                    <div className="mb-12">
                        {event.location && (
                            <p className="text-foreground/70 mb-2">
                                <span className="font-semibold text-foreground">Location:</span> {event.location}
                            </p>
                        )}
                        {event.time && (
                            <p className="text-foreground/70 mb-6">
                                <span className="font-semibold text-foreground">Time:</span> {event.time}
                            </p>
                        )}
                    </div>

                    {/* Image Gallery */}
                    <div className="mb-12">
                        <h2 className="text-foreground font-serif text-2xl font-normal mb-6">Event Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {event.images.map((image, idx) => (
                                <div
                                    key={idx}
                                    className="relative aspect-[4/3] rounded-none overflow-hidden group"
                                >
                                    <Image
                                        src={image}
                                        alt={`${event.title} - Image ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Full Description */}
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-foreground font-serif text-2xl font-normal mb-6">About This Event</h2>
                        <div className="text-foreground/80 leading-relaxed whitespace-pre-line">
                            {event.fullDescription}
                        </div>
                    </div>

                    {/* Navigation to other events */}
                    <div className="mt-16 pt-8 border-t border-foreground/20">
                        <h3 className="text-foreground font-serif text-2xl font-normal mb-8">Other Events</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {pastEvents
                                .filter((e) => e.slug !== event.slug)
                                .slice(0, 3)
                                .map((otherEvent) => (
                                    <Link
                                        key={otherEvent.slug}
                                        href={`/events/${otherEvent.slug}`}
                                        className="group bg-background rounded-none overflow-hidden border border-foreground/10 hover:border-foreground/30 transition-all hover:shadow-lg"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={otherEvent.images[0] || "/placeholder.svg"}
                                                alt={otherEvent.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />

                                            {/* Japanese Corner Accents */}
                                            <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                                            {/* Category Badge */}
                                            <div className="absolute bottom-2 left-2">
                                                <span className="bg-foreground/90 text-foreground text-[10px] font-bold px-2 py-1 rounded-none">
                                                    {otherEvent.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <p className="text-foreground/40 text-xs mb-1">
                                                {new Date(otherEvent.date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <h4 className="text-foreground font-serif text-base font-normal group-hover:text-foreground transition-colors line-clamp-2">
                                                {otherEvent.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
