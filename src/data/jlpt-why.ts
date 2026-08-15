import type { L } from "@/i18n/config"

export interface WhyPillar {
  kanji: string
  title: L
  description: L
}

/** "A Language That Opens Worlds" — reproduced from the approved prototype. */
export const whyJapanese: WhyPillar[] = [
  {
    kanji: "業",
    title: {
      en: "1,400+ Japanese Companies in India",
      ja: "インドに1,400社以上の日本企業",
    },
    description: {
      en: "Japanese companies operating across India actively seek professionals with Japanese language proficiency — creating a significant career advantage.",
      ja: "インド各地で事業を展開する日本企業は、日本語能力を持つ人材を積極的に求めており、大きなキャリアの強みとなります。",
    },
  },
  {
    kanji: "学",
    title: { en: "Study Abroad Opportunities", ja: "留学の機会" },
    description: {
      en: "JLPT certification opens doors to scholarship programs, exchange universities, and academic institutions across Japan.",
      ja: "JLPT の認定は、奨学金プログラム、交換留学先の大学、日本各地の教育機関への扉を開きます。",
    },
  },
  {
    kanji: "文",
    title: { en: "Cultural Depth", ja: "文化の深み" },
    description: {
      en: "Japanese is the gateway to one of the world's richest cultural traditions — literature, cinema, design, philosophy, and cuisine.",
      ja: "日本語は、文学、映画、デザイン、哲学、そして食文化という世界有数の豊かな伝統への入り口です。",
    },
  },
  {
    kanji: "外",
    title: {
      en: "Diplomatic & Research Careers",
      ja: "外交・研究のキャリア",
    },
    description: {
      en: "Indo-Japanese relations are growing. Language proficiency is a critical asset for careers in diplomacy, research, and international affairs.",
      ja: "日印関係は深まり続けています。語学力は、外交、研究、国際関係の分野で決定的な強みとなります。",
    },
  },
]
