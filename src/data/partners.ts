import type { L } from "@/i18n/config"

export interface Partner {
  id: string
  name: L
  logo: string
  monogram: string
  location: L
  description: L
  highlights: L<string[]>
  tags: L<string[]>
  url: string
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
      ja: "ウォクセン大学はウォクセン日本センターを設立・統括し、その運営に不可欠な学術的基盤、リソース、リーダーシップを提供しています。",
    },
    highlights: {
      en: [
        "Academic Framework & Leadership",
        "Global Engagement Programs",
        "Interdisciplinary Learning",
      ],
      ja: [
        "学術的枠組みとリーダーシップ",
        "グローバルエンゲージメントプログラム",
        "学際的な学び",
      ],
    },
    tags: {
      en: ["Academic", "Leadership", "Research"],
      ja: ["学術", "運営", "研究"],
    },
    url: "https://woxsen.edu.in",
  },
  {
    id: "indobox",
    name: { en: "Indobox Inc.", ja: "インドボックス株式会社" },
    logo: "/images/logos/indobox.webp",
    monogram: "IB",
    location: { en: "Hyderabad, India", ja: "インド、ハイデラバード" },
    description: {
      en: "Indobox Inc., headquartered in Hyderabad, plays a pivotal role in the development and execution of the centre's programming.",
      ja: "ハイデラバードに本社を置くインドボックス株式会社は、センターのプログラム開発および実施において極めて重要な役割を果たしています。",
    },
    highlights: {
      en: [
        "Language Immersion Sessions",
        "Career Guidance & Mentorship",
        "Cultural Experiences",
      ],
      ja: [
        "言語イマージョンセッション",
        "キャリアガイダンス＆メンターシップ",
        "文化体験",
      ],
    },
    tags: {
      en: ["Language", "Career", "Culture"],
      ja: ["語学", "キャリア", "文化"],
    },
    url: "https://indobox.co.jp",
  },
  {
    id: "nara",
    name: { en: "Nara Japan Hub", ja: "奈良ジャパンハブ" },
    logo: "/images/logos/nara-japan.png",
    monogram: "NJC",
    location: { en: "Nara, Japan", ja: "日本、奈良" },
    description: {
      en: "Rooted in the rich cultural heritage of Japan, Nara Japan Centre infuses its mission with unique cultural collaborations and academic exchanges.",
      ja: "日本の豊かな文化遺産に根ざし、独自の文化協働と学術交流を通じてセンターの使命に貢献しています。",
    },
    highlights: {
      en: [
        "Cultural Collaborations",
        "Academic Exchanges",
        "Long-term Relationship Building",
      ],
      ja: [
        "文化コラボレーション",
        "学術交流",
        "長期的な関係構築",
      ],
    },
    tags: {
      en: ["Cultural", "Exchange", "Partnership"],
      ja: ["文化", "交流", "提携"],
    },
    url: "https://narajapanhub.com/",
  },
]
