import type { L } from "@/i18n/config"

export interface Partner {
  id: string
  name: L
  logo: string
  monogram: string
  location: L
  /** Middot-joined summary line, as in the prototype. */
  description: L
  tags: L<string[]>
  url?: string
}

export const partners: Partner[] = [
  {
    id: "woxsen",
    name: { en: "Woxsen University", ja: "ウォクセン大学" },
    logo: "/images/logos/woxsen.jpg",
    monogram: "WU",
    location: { en: "Hyderabad, India", ja: "インド、ハイデラバード" },
    description: {
      en: "Academic Framework & Leadership · Global Engagement Programs · Interdisciplinary Learning",
      ja: "学術的枠組みと運営 · グローバル連携プログラム · 学際的な学び",
    },
    tags: {
      en: ["Academic", "Leadership", "Research"],
      ja: ["学術", "運営", "研究"],
    },
    url: "https://www.woxsen.edu.in",
  },
  {
    id: "indobox",
    name: { en: "Indobox Inc.", ja: "インドボックス株式会社" },
    logo: "/images/logos/indobox.webp",
    monogram: "IB",
    location: { en: "Hyderabad, India", ja: "インド、ハイデラバード" },
    description: {
      en: "Language Immersion Sessions · Career Guidance & Mentorship · Cultural Experiences",
      ja: "語学集中セッション · キャリア指導とメンタリング · 文化体験",
    },
    tags: {
      en: ["Language", "Career", "Culture"],
      ja: ["語学", "キャリア", "文化"],
    },
    url: "https://www.indobox.co.jp",
  },
  {
    id: "nara",
    name: { en: "Nara Japan Centre", ja: "奈良ジャパンセンター" },
    logo: "/images/logos/nara-japan.png",
    monogram: "NJC",
    location: { en: "Nara, Japan", ja: "日本、奈良" },
    description: {
      en: "Cultural Collaborations · Academic Exchanges · Long-term Relationship Building",
      ja: "文化協働 · 学術交流 · 長期的な関係構築",
    },
    tags: {
      en: ["Cultural", "Exchange", "Partnership"],
      ja: ["文化", "交流", "提携"],
    },
  },
]
