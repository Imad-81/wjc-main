import type { L } from "@/i18n/config"

export interface Activity {
  number: string
  kanji: string
  title: L
  description: L
}

/** "Core Activities" — six cards, reproduced from the approved prototype. */
export const coreActivities: Activity[] = [
  {
    number: "01",
    kanji: "語",
    title: { en: "Japanese Language Education", ja: "日本語教育" },
    description: {
      en: "Structured JLPT preparation from N5 to N3, taught by qualified instructors with a curriculum shaped by cultural immersion.",
      ja: "N5 から N3 までの体系的な JLPT 対策を、文化体験を取り入れたカリキュラムのもと有資格の講師が指導します。",
    },
  },
  {
    number: "02",
    kanji: "文",
    title: { en: "Cultural Exchange Programs", ja: "文化交流プログラム" },
    description: {
      en: "Seasonal festivals, traditional arts workshops, culinary experiences, and film screenings that bring Japanese culture to life.",
      ja: "季節の祭り、伝統芸術のワークショップ、食体験、映画上映を通じて、日本文化を体感していただきます。",
    },
  },
  {
    number: "03",
    kanji: "学",
    title: { en: "Academic Partnerships", ja: "学術提携" },
    description: {
      en: "Formal collaborations with Japanese universities enabling student exchanges, joint research, and faculty visits.",
      ja: "日本の大学との正式な連携により、学生交換、共同研究、教員の相互訪問を実現します。",
    },
  },
  {
    number: "04",
    kanji: "業",
    title: { en: "Industry Collaboration", ja: "産業連携" },
    description: {
      en: "Connecting students with 1,400+ Japanese companies operating in India for internships, placements, and corporate programs.",
      ja: "インドで事業を展開する1,400社以上の日本企業と学生をつなぎ、インターンシップ、就職、企業プログラムの機会を提供します。",
    },
  },
  {
    number: "05",
    kanji: "外",
    title: { en: "Delegation & Diplomacy", ja: "訪問団と外交" },
    description: {
      en: "Hosting Japanese government officials, embassy representatives, and JASSO delegations for institutional dialogue.",
      ja: "日本政府関係者、大使館の代表、JASSO 訪問団をお迎えし、機関間の対話を行っています。",
    },
  },
  {
    number: "06",
    kanji: "研",
    title: { en: "Research & Publications", ja: "研究と出版" },
    description: {
      en: "Supporting Indo-Japanese research initiatives, academic papers, and policy discussions on bilateral relations.",
      ja: "日印の研究活動、学術論文、二国間関係に関する政策議論を支援しています。",
    },
  },
]

export interface Collaboration {
  name: L
  type: L
  country: L
  initial: string
  description: L
}

/**
 * "Partners in Building Bridges".
 *
 * ⚠️ Reproduced from the prototype. Beyond Indobox and Nara, these
 * institutional relationships have not been confirmed by the Centre —
 * verify each one before this page goes live.
 */
export const collaborations: Collaboration[] = [
  {
    name: { en: "Indobox Inc.", ja: "インドボックス株式会社" },
    type: { en: "Industry Partner", ja: "産業パートナー" },
    country: { en: "Japan", ja: "日本" },
    initial: "箱",
    description: {
      en: "Strategic industry partner facilitating corporate connections between Indian students and Japanese companies.",
      ja: "インドの学生と日本企業の橋渡しを担う戦略的な産業パートナーです。",
    },
  },
  {
    name: { en: "Nara Japan Centre", ja: "奈良ジャパンセンター" },
    type: { en: "Academic Partner", ja: "学術パートナー" },
    country: { en: "Japan", ja: "日本" },
    initial: "奈",
    description: {
      en: "Academic collaboration enabling student exchange programs and joint cultural initiatives.",
      ja: "学生交換プログラムと共同文化事業を可能にする学術連携です。",
    },
  },
  {
    name: { en: "JASSO", ja: "JASSO（日本学生支援機構）" },
    type: { en: "Scholarship Body", ja: "奨学金機関" },
    country: { en: "Japan", ja: "日本" },
    initial: "奨",
    description: {
      en: "Japan Student Services Organization — providing scholarship pathways for Indian students to study in Japan.",
      ja: "日本学生支援機構 — インドの学生が日本で学ぶための奨学金の道筋を提供しています。",
    },
  },
  {
    name: { en: "Embassy of Japan", ja: "在インド日本国大使館" },
    type: { en: "Diplomatic Partner", ja: "外交パートナー" },
    country: { en: "India", ja: "インド" },
    initial: "大",
    description: {
      en: "Diplomatic partnership supporting cultural diplomacy and institutional recognition.",
      ja: "文化外交と機関としての認知を支える外交パートナーシップです。",
    },
  },
  {
    name: { en: "Osaka University", ja: "大阪大学" },
    type: { en: "Research Partner", ja: "研究パートナー" },
    country: { en: "Japan", ja: "日本" },
    initial: "阪",
    description: {
      en: "Research collaboration in Indo-Japanese studies and academic exchange programs.",
      ja: "日印研究および学術交流プログラムにおける研究協働です。",
    },
  },
  {
    name: { en: "JETRO Hyderabad", ja: "JETRO ハイデラバード" },
    type: { en: "Trade Partner", ja: "貿易パートナー" },
    country: { en: "India", ja: "インド" },
    initial: "貿",
    description: {
      en: "Japan External Trade Organization — connecting students with Japanese business opportunities in India.",
      ja: "日本貿易振興機構 — インドにおける日本企業のビジネス機会と学生をつなぎます。",
    },
  },
]

export interface TimelineEntry {
  year: L
  title: L
  description: L
}

/**
 * "Timeline of WJC".
 *
 * ⚠️ Dates reproduced from the prototype and not yet confirmed by the
 * Centre. The Centre's own brief gives 2nd April 2025 as the inauguration.
 */
export const timeline: TimelineEntry[] = [
  {
    year: { en: "2024", ja: "2024年" },
    title: { en: "Foundation", ja: "構想" },
    description: {
      en: "Woxsen University initiates planning for a dedicated Japan Centre, establishing the institutional framework and identifying key partners.",
      ja: "ウォクセン大学が日本センター設立の計画に着手し、組織の枠組みを整え、主要なパートナーを選定しました。",
    },
  },
  {
    year: { en: "Mar 2025", ja: "2025年3月" },
    title: { en: "Inauguration", ja: "開設" },
    description: {
      en: "Official inauguration of the Woxsen Japan Centre, attended by Japanese Embassy officials, JASSO representatives, and university leadership.",
      ja: "日本国大使館関係者、JASSO 代表、大学首脳を迎え、ウォクセン日本センターが正式に開設されました。",
    },
  },
  {
    year: { en: "Apr 2025", ja: "2025年4月" },
    title: { en: "First Delegation", ja: "最初の訪問団" },
    description: {
      en: "JASSO delegation visits Woxsen, exploring scholarship opportunities and academic exchange frameworks for Indian students.",
      ja: "JASSO の訪問団がウォクセンを訪れ、インドの学生に向けた奨学金の機会と学術交流の枠組みを検討しました。",
    },
  },
  {
    year: { en: "May 2025", ja: "2025年5月" },
    title: { en: "Language Programs Launch", ja: "語学プログラム開講" },
    description: {
      en: "JLPT N5 and N4 courses launch with the first cohort of students, establishing the Centre's language education pillar.",
      ja: "第一期生を迎えて JLPT N5・N4 講座が開講し、センターの語学教育の柱が確立されました。",
    },
  },
  {
    year: { en: "Jul 2025", ja: "2025年7月" },
    title: { en: "Tanabata Festival", ja: "七夕祭り" },
    description: {
      en: "First Tanabata Star Festival celebrated on campus, marking the Centre's commitment to authentic cultural programming.",
      ja: "キャンパスで初の七夕祭りが開催され、本格的な文化企画への取り組みを示しました。",
    },
  },
  {
    year: { en: "2025–", ja: "2025年〜" },
    title: { en: "Growing Forward", ja: "これからの成長" },
    description: {
      en: "Expanding partnerships, launching N3 courses, and building the Wa Community into a thriving student ecosystem.",
      ja: "提携を拡大し、N3 講座を開講し、Wa コミュニティを活気ある学生の場へと育てていきます。",
    },
  },
]
