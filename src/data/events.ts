import type { L } from "@/i18n/config"

/**
 * Which Events-page tab an event belongs to. The tab set was defined by the
 * Centre: Culture & Festivals, Delegations & Visits, Outreach Initiatives,
 * and What's Next.
 */
export type EventTab = "culture" | "delegations" | "outreach" | "next"

/** Filter chip on the Events page, matching the prototype's chip set. */
export type EventFilter = "cultural" | "academic" | "festival"

export interface Event {
    slug: string
    /** ISO date, used for sorting and <time datetime>. */
    isoDate: string
    displayDate: L
    category: L
    tab: EventTab
    filter: EventFilter
    title: L
    description: L
    fullDescription: L
    images: string[]
    location?: L
    time?: L
    isFeatured?: boolean
    displayOrder?: number
    isUpcoming?: boolean
    registrationOpen?: boolean
    status?: L
    posterSrc?: string | null
}

export const pastEvents: Event[] = [
    {
        slug: "kizuna-matsuri",
        filter: "festival",
        isoDate: "2026-02-27",
        displayDate: { en: "February 27, 2026", ja: "2026年2月27日" },
        category: { en: "FLAGSHIP | CULTURAL", ja: "旗艦行事 | 文化" },
        tab: "culture",
        isFeatured: true,
        displayOrder: 1,
        title: { en: "Kizuna Matsuri", ja: "絆祭り" },
        description: {
            en: "The flagship annual event of the Woxsen Japan Centre celebrating Indo-Japanese ties through cultural dialogue, workshops, and performances featuring dignitaries from Japan Foundation, Toshiba, and leading Japanese institutions.",
            ja: "国際交流基金、東芝をはじめとする日本の主要機関の要人をお迎えし、文化対話、ワークショップ、公演を通じて日印のつながりを祝う、ウォクセン日本センターの年次旗艦行事です。",
        },
        fullDescription: {
            en: `Kizuna Matsuri stands as the flagship annual event of the Woxsen Japan Centre at Woxsen University, Hyderabad, Telangana, India. Conceived as a platform to celebrate and strengthen Indo–Japanese ties, the festival brings together academic leaders, industry representatives, international delegates, and the university community in a shared space of cultural dialogue and collaboration.

"Kizuna," meaning bond, reflects the spirit of the festival, fostering meaningful connections between India and Japan through education and culture.

The inaugural edition was graced by eminent dignitaries representing leading global institutions and organizations, including:
• Mr. Koji Sato, Director General, Japan Foundation (New Delhi)
• Mr. Hiroshi Furuta, CMD, Toshiba (T&D India)
• Mr. Rama Bhadra, Founder, Na Ra Japan Hub
• Ms. Chikako Hironaka and Mr. Kazutoshi Tamari, Chukyo University, Japan
• Mr. Daisuke Tanji, CEO, Indobox Inc.
• Mr. Tomio Isogai, Advisor, Indobox Inc.

The Woxsen Japan Centre sincerely expresses its gratitude for their gracious presence and participation.

During the inaugural ceremony, Woxsen students presented a brief fashion walk, adding a creative element to the proceedings. This was followed by a display by the School of Art and Design (SOAD), contributing a visual dimension to the celebration.

The program featured presentations by Japanese language students and participants of the Japan Immersion Program, reflecting academic engagement and experiential learning.

The cultural segment included interactive workshops on:
• Sumi-e painting
• Ikebana
• Martial arts
• Calligraphy

The Cosplay segment added a contemporary dimension, encouraging creative expression across campus.

The cultural showcase brought the spirit of collaboration to life. An Indo–Japanese performance by Mrs. Nalini and her team blended artistic traditions from both nations. This was complemented by a vibrant classical dance performance, adding youthful energy to the celebration. The program also featured an engaging band performance, along with a traditional Japanese dance presentation that offered a glimpse into Japan's rich cultural heritage. The evening was further elevated by a special musical performance by the J-Hind Band, featuring a surprise appearance by Tanji-san, marking a memorable moment of cross-cultural expression.

Kizuna Matsuri brought together delegates, artists, and the university community for a celebration of culture, dialogue, and shared experiences. The event reflected the true meaning of "Kizuna" — bonds built through connection and participation.`,
            ja: `絆祭りは、インド・テランガーナ州ハイデラバードのウォクセン大学における、ウォクセン日本センターの年次旗艦行事です。日印のつながりを祝い、強めるための場として構想されたこの祭りは、学術関係者、産業界の代表、海外からの来賓、そして大学コミュニティを、文化対話と協働の共有空間へと迎え入れます。

「絆」という言葉が示すとおり、この祭りは教育と文化を通じてインドと日本の間に意味あるつながりを育むという精神を体現しています。

第一回は、世界を代表する機関・組織の著名な方々にご臨席を賜りました。
• Koji Sato 氏 国際交流基金ニューデリー日本文化センター所長
• Hiroshi Furuta 氏 東芝（T&D インド）会長兼社長
• Rama Bhadra 氏 奈良ジャパンハブ創設者
• Chikako Hironaka 氏、Kazutoshi Tamari 氏 中京大学（日本）
• Daisuke Tanji 氏 インドボックス株式会社 最高経営責任者
• Tomio Isogai 氏 インドボックス株式会社 顧問

ウォクセン日本センターは、皆様のご臨席とご参加に心より感謝申し上げます。

開会式では、ウォクセンの学生による短いファッションウォークが披露され、式典に創造的な彩りを添えました。続いて美術デザイン学部（SOAD）による展示が行われ、祝祭に視覚的な次元をもたらしました。

プログラムでは、日本語履修学生とジャパン・イマージョン・プログラム参加者による発表が行われ、学術的な取り組みと体験学習の成果が示されました。

文化部門では、以下の体験ワークショップが開催されました。
• 墨絵
• 生け花
• 武道
• 書道

コスプレ部門は現代的な要素を加え、キャンパス全体に創造的な表現を促しました。

文化ショーケースは協働の精神を鮮やかに映し出しました。ナリニ氏とそのチームによる日印公演は、両国の芸術的伝統を融合させたものでした。これに続く躍動的な古典舞踊の公演が、祝祭に若々しい活力を添えました。さらに、心を捉えるバンド演奏と、日本の豊かな文化遺産を垣間見せる伝統舞踊の披露も行われました。夜の締めくくりには J-Hind バンドによる特別演奏があり、丹治氏のサプライズ出演が異文化表現の忘れがたい瞬間となりました。

絆祭りは、来賓、アーティスト、そして大学コミュニティが一堂に会し、文化と対話、そして共有された経験を祝う場となりました。この行事は「絆」の本当の意味 — つながりと参加によって築かれる結びつき — を体現するものでした。`,
        },
        images: [
            "/images/events/kizuna-matsuri/DSC00027-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC00122-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC00164-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC00181-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC00493-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC00509-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC00575-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC00582-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC09354-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC09428-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC09430-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC09444-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC09500-1-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC09647-compressed-compressed-compressed.jpg",
            "/images/events/kizuna-matsuri/DSC09704-compressed-compressed-compressed.jpg",
        ],
        location: { en: "Woxsen University", ja: "ウォクセン大学" },
        time: { en: "Full Day Event", ja: "終日開催" },
    },
    {
        slug: "japanese-cultural-immersion",
        filter: "cultural",
        isoDate: "2025-09-11",
        displayDate: { en: "September 11, 2025", ja: "2025年9月11日" },
        category: { en: "CULTURAL | ACADEMICS", ja: "文化 | 学術" },
        tab: "culture",
        title: {
            en: "Japanese Cultural Immersion",
            ja: "ジャパニーズ・カルチュラル・イマージョン",
        },
        description: {
            en: "The Japanese Internationalisation Lab brought immersive cultural activities and thought-provoking exchanges, building bridges across borders and celebrating global learning.",
            ja: "ジャパニーズ・インターナショナリゼーション・ラボは、没入型の文化活動と示唆に富む交流をもたらし、国境を越えた架け橋を築き、国際的な学びを祝いました。",
        },
        fullDescription: {
            en: `The Russell Belk Centre for International Relations proudly hosted the Japanese Internationalisation Lab on 11th September 2025, right here at the vibrant Woxsen University campus. The event was more than just a gathering; it was an incredible journey into the heart of Japan's rich culture, language, and academic spirit. From immersive cultural activities to thought-provoking exchanges between students and faculty, the day was all about building bridges across borders and celebrating global learning.`,
            ja: `ラッセル・ベルク国際関係センターは、2025年9月11日、活気あるウォクセン大学キャンパスにてジャパニーズ・インターナショナリゼーション・ラボを開催いたしました。この催しは単なる集まりにとどまらず、日本の豊かな文化、言語、そして学術的精神の核心へと分け入る素晴らしい旅となりました。没入型の文化活動から、学生と教員による示唆に富む意見交換まで、この一日は国境を越えた架け橋を築き、国際的な学びを祝うことに捧げられました。`,
        },
        images: [
            "/images/events/japanese-cultural-immersion/event1.jpg",
            "/images/events/japanese-cultural-immersion/event2.jpg",
            "/images/events/japanese-cultural-immersion/event3.jpg",
            "/images/events/japanese-cultural-immersion/event4.jpg",
        ],
        location: {
            en: "Woxsen University — Cultural Center",
            ja: "ウォクセン大学 — 文化センター",
        },
        time: { en: "10:00 AM – 5:00 PM", ja: "10:00 – 17:00" },
    },
    {
        slug: "konnichiwa-woxsen",
        filter: "cultural",
        isoDate: "2025-09-18",
        displayDate: { en: "September 18, 2025", ja: "2025年9月18日" },
        category: { en: "CULTURAL | COMMUNITY", ja: "文化 | コミュニティ" },
        tab: "culture",
        title: { en: "Konnichiwa Woxsen", ja: "こんにちはウォクセン" },
        description: {
            en: "A vibrant celebration marking the launch of the Woxsen Japan Centre's Student Community with traditional crafts, Origami, Chopstick Challenge, and interactive gaming zones.",
            ja: "伝統工芸、折り紙、箸チャレンジ、体験型ゲームゾーンとともに、ウォクセン日本センター学生コミュニティの発足を祝う賑やかな催しです。",
        },
        fullDescription: {
            en: `Woxsen University proudly marked the launch of the Woxsen Japan Centre's Student Community with Konnichiwa Woxsen — a vibrant celebration of Japanese culture, creativity, and community. From exploring traditional crafts like Origami, to testing skills at Chopstick Challenge stall, to interactive sticky note walls and gaming zones in collaboration with Utopia: The Gaming Club, the event offered students a unique chance to engage with the heart of Japanese culture. This initiative reflects our vision to build meaningful global connections and open doors to cultural, academic, and professional opportunities in Japan.`,
            ja: `ウォクセン大学は、日本の文化、創造性、そしてコミュニティを祝う賑やかな催し「こんにちはウォクセン」とともに、ウォクセン日本センター学生コミュニティの発足を迎えました。折り紙などの伝統工芸の体験から、箸チャレンジのブースでの腕試し、付箋メッセージウォール、そしてゲーミングクラブ Utopia と共同で運営したゲームゾーンまで、この催しは学生が日本文化の核心に触れる貴重な機会となりました。この取り組みは、意味ある国際的なつながりを築き、日本における文化的・学術的・専門的な機会への扉を開くという私たちのビジョンを体現しています。`,
        },
        images: ["/images/events/konnichiwa-woxsen/event5.jpeg"],
        location: {
            en: "Woxsen University — Main Lawn",
            ja: "ウォクセン大学 — メインローン",
        },
        time: { en: "4:00 PM – 9:00 PM", ja: "16:00 – 21:00" },
    },
    {
        slug: "language-course",
        filter: "academic",
        isoDate: "2024-09-05",
        displayDate: { en: "September 5, 2024", ja: "2024年9月5日" },
        category: { en: "ACADEMICS | LANGUAGE", ja: "学術 | 語学" },
        tab: "outreach",
        title: {
            en: "JLPT Preparation Bootcamp",
            ja: "JLPT 対策ブートキャンプ",
        },
        description: {
            en: "The Japanese Language Course kicked off with an engaging orientation session, introducing students to the elegance of Nihongo and the richness of Japanese culture.",
            ja: "日本語講座は、日本語の美しさと日本文化の豊かさを学生に紹介する魅力的なオリエンテーションから始まりました。",
        },
        fullDescription: {
            en: `The Japanese Language Course at Woxsen University began with an engaging orientation session, giving students an insight into the elegance of Nihongo and the richness of Japanese culture.`,
            ja: `ウォクセン大学の日本語講座は、日本語の美しさと日本文化の豊かさに触れる魅力的なオリエンテーションとともに始まりました。`,
        },
        images: [
            "/images/events/language-course/event6.jpg",
            "/images/events/language-course/event7.jpg",
            "/images/events/language-course/event8.jpeg",
        ],
        location: {
            en: "Woxsen University — Language Lab",
            ja: "ウォクセン大学 — 語学ラボ",
        },
        time: {
            en: "9:00 AM – 4:00 PM (3 days)",
            ja: "9:00 – 16:00（3日間）",
        },
    },
    {
        slug: "woxsen-japan-fest",
        filter: "festival",
        isoDate: "2025-10-25",
        displayDate: { en: "October 25 & 26, 2025", ja: "2025年10月25日・26日" },
        // The Delegations tab renders from `events-extra.delegations`, not from
        // `pastEvents`, so this has to sit on `culture` to appear at all — which
        // is where a festival belongs anyway.
        category: { en: "FESTIVAL | CULTURAL", ja: "祭り | 文化" },
        tab: "culture",
        title: { en: "Woxsen Japan Fest", ja: "ウォクセン・ジャパン・フェスト" },
        description: {
            en: "Woxsen Japan Centre at the 30th Hyderabad Japan Festival, connecting with dignitaries from Japan Foundation, JETRO, and the Consulate General of Japan.",
            ja: "第30回ハイデラバード日本祭りに出展し、国際交流基金、JETRO、在チェンナイ日本国総領事館の関係者と交流しました。",
        },
        fullDescription: {
            en: `Woxsen Japan Centre at the 30th Hyderabad Japan Festival! Honored to connect with dignitaries from Japan Foundation, JETRO & the Consulate General of Japan, and celebrate Japan's rich culture with Na Ra Japan Hub. Here's to more cross-cultural exchange & learning ahead!`,
            ja: `ウォクセン日本センターは第30回ハイデラバード日本祭りに参加しました。国際交流基金、JETRO、そして在チェンナイ日本国総領事館の関係者の皆様と交流し、奈良ジャパンハブとともに日本の豊かな文化を祝う機会をいただけたことを光栄に思います。今後さらなる異文化交流と学びが続いていきますように。`,
        },
        images: [
            "/images/events/woxsen-japan-fest/event9.jpeg",
            "/images/events/woxsen-japan-fest/event10.png",
        ],
        location: {
            en: "Woxsen University — Business School Auditorium",
            ja: "ウォクセン大学 — ビジネススクール講堂",
        },
        time: { en: "10:00 AM – 6:00 PM", ja: "10:00 – 18:00" },
    },
]

export function getEventBySlug(slug: string): Event | undefined {
    return pastEvents.find((event) => event.slug === slug)
}

export function getEventsByTab(tab: EventTab): Event[] {
    return pastEvents.filter((event) => event.tab === tab)
}

/** Only the filters the Centre's archive actually has events for. */
export const eventFilters: EventFilter[] = ["cultural", "academic", "festival"]
