export interface Event {
    slug: string
    date: string
    category: string
    title: string
    description: string
    fullDescription: string
    images: string[]
    location?: string
    time?: string
}

export const pastEvents: Event[] = [
    {
        slug: "japanese-cultural-immersion",
        date: "September 11, 2025",
        category: "CULTURAL | ACADEMICS",
        title: "Japanese Cultural Immersion",
        description:
            "The Japanese Internationalisation Lab brought immersive cultural activities and thought-provoking exchanges, building bridges across borders and celebrating global learning.",
        fullDescription: `The Russell Belk Centre for International Relations proudly hosted the Japanese Internationalisation Lab on 11th September 2025, right here at the vibrant Woxsen University campus. The event was more than just a gathering; it was an incredible journey into the heart of Japan's rich culture, language, and academic spirit. From immersive cultural activities to thought-provoking exchanges between students and faculty, the day was all about building bridges across borders and celebrating global learning.`,
        images: ["/images/events/japanese-cultural-immersion/event1.jpg", "/images/events/japanese-cultural-immersion/event2.jpg", "/images/events/japanese-cultural-immersion/event3.jpg", "/images/events/japanese-cultural-immersion/event4.jpg"],
        location: "Woxsen University - Cultural Center",
        time: "10:00 AM - 5:00 PM",
    },
    {
        slug: "konnichiwa-woxsen",
        date: "September 18, 2025",
        category: "CULTURAL | COMMUNITY",
        title: "Konnichiwa Woxsen",
        description:
            "A vibrant celebration marking the launch of the Woxsen Japan Centre's Student Community with traditional crafts, Origami, Chopstick Challenge, and interactive gaming zones.",
        fullDescription: `Woxsen University proudly marked the launch of the Woxsen Japan Centre's Student Community with Konnichiwa Woxsen — a vibrant celebration of Japanese culture, creativity, and community. From exploring traditional crafts like Origami, to testing skills at Chopstick Challenge stall, to interactive sticky note walls and gaming zones in collaboration with Utopia: The Gaming Club, the event offered students a unique chance to engage with the heart of Japanese culture. This initiative reflects our vision to build meaningful global connections and open doors to cultural, academic, and professional opportunities in Japan.`,
        images: ["/images/events/konnichiwa-woxsen/event5.jpeg"],
        location: "Woxsen University - Main Lawn",
        time: "4:00 PM - 9:00 PM",
    },
    {
        slug: "language-course",
        date: "2024-09-05",
        category: "ACADEMICS | LANGUAGE",
        title: "JLPT Preparation Bootcamp",
        description:
            "The Japanese Language Course kicked off with an engaging orientation session, introducing students to the elegance of Nihongo and the richness of Japanese culture.",
        fullDescription: `The Japanese Language Course at Woxsen University began with an engaging orientation session, giving students an insight into the elegance of Nihongo and the richness of Japanese culture.`,
        images: ["/images/events/language-course/event6.jpg", "/images/events/language-course/event7.jpg", "/images/events/language-course/event8.jpeg"],
        location: "Woxsen University - Language Lab",
        time: "9:00 AM - 4:00 PM (3 days)",
    },
    {
        slug: "woxsen-japan-fest",
        date: "October 25 & 26, 2025",
        category: "FESTIVAL | CULTURAL",
        title: "Woxsen Japan Fest",
        description:
            "Woxsen Japan Centre at the 30th Hyderabad Japan Festival, connecting with dignitaries from Japan Foundation, JETRO, and the Consulate General of Japan.",
        fullDescription: `Woxsen Japan Centre at the 30th Hyderabad Japan Festival! Honored to connect with dignitaries from Japan Foundation, JETRO & the Consulate General of Japan, and celebrate Japan's rich culture with Na Ra Japan Hub. Here's to more cross-cultural exchange & learning ahead!`,
        images: ["/images/events/woxsen-japan-fest/event9.jpeg", "/images/events/woxsen-japan-fest/event10.png"],
        location: "Woxsen University - Business School Auditorium",
        time: "10:00 AM - 6:00 PM",
    },
]

export function getEventBySlug(slug: string): Event | undefined {
    return pastEvents.find((event) => event.slug === slug)
}
