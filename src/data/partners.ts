import type { L } from "@/i18n/config"

export interface Partner {
  id: string
  name: L
  logo: string
  monogram: string
  location: L
  description: L
  benefits: L<string[]>
  /** Omitted where the Centre has not supplied a public URL yet. */
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
      en: "Woxsen University establishes and oversees the Woxsen Japan Centre, providing the academic framework, resources, and leadership essential to its functioning.",
      ja: "ウォクセン大学はウォクセン日本センターを設立・運営し、その活動に不可欠な学術的枠組み、資源、そして運営体制を提供しています。",
    },
    benefits: {
      en: [
        "Academic Framework & Leadership",
        "Global Engagement Programs",
        "Interdisciplinary Learning",
      ],
      ja: ["学術的枠組みと運営", "グローバル連携プログラム", "学際的な学び"],
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
      en: "Indobox Inc., headquartered in Hyderabad, plays a pivotal role in the development and execution of the centre's programming.",
      ja: "ハイデラバードに本社を置くインドボックス株式会社は、当センターのプログラムの企画・実施において中心的な役割を担っています。",
    },
    benefits: {
      en: [
        "Language Immersion Sessions",
        "Career Guidance & Mentorship",
        "Cultural Experiences",
      ],
      ja: ["語学集中セッション", "キャリア指導とメンタリング", "文化体験"],
    },
    url: "https://www.indobox.co.jp",
  },
  {
    id: "nara",
    name: { en: "Nara Japan Hub", ja: "奈良ジャパンハブ" },
    logo: "/images/logos/nara-japan.png",
    monogram: "NJH",
    location: { en: "Nara, Japan", ja: "日本、奈良" },
    description: {
      en: "Rooted in the rich cultural heritage of Japan, Nara Japan Hub infuses its mission with unique cultural collaborations and academic exchanges.",
      ja: "日本の豊かな文化遺産に根ざした奈良ジャパンハブは、独自の文化協働と学術交流をその使命に織り込んでいます。",
    },
    benefits: {
      en: [
        "Cultural Collaborations",
        "Academic Exchanges",
        "Long-term Relationship Building",
      ],
      ja: ["文化協働", "学術交流", "長期的な関係構築"],
    },
    // TODO: awaiting an official public URL from the Centre.
  },
]
