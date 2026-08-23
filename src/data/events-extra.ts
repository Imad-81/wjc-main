import type { L } from "@/i18n/config"

export interface UpcomingEvent {
  title: L
  date: L
  category: L
  description: L
  registrationOpen: boolean
}

/**
 * "What's Coming" — reproduced from the approved prototype.
 *
 * ⚠️ These events are not in the Centre's own records; they came from the
 * prototype. Confirm dates and confirm each event is actually planned
 * before publishing.
 */
export const upcomingEvents: UpcomingEvent[] = [
  {
    title: {
      en: "Natsu Matsuri — Summer Festival",
      ja: "夏祭り — サマーフェスティバル",
    },
    date: { en: "August 2025", ja: "2025年8月" },
    category: { en: "Festival", ja: "祭り" },
    description: {
      en: "An immersive summer festival celebrating Japanese traditions with food, games, performances, and cultural activities.",
      ja: "食、遊び、公演、文化体験を通じて日本の伝統を祝う、没入型の夏祭りです。",
    },
    registrationOpen: true,
  },
  {
    title: {
      en: "JLPT N5 Batch 2 — Orientation",
      ja: "JLPT N5 第2期 — オリエンテーション",
    },
    date: { en: "September 2025", ja: "2025年9月" },
    category: { en: "Academic", ja: "学術" },
    description: {
      en: "Orientation session for the second cohort of JLPT N5 students. Meet your instructors and fellow learners.",
      ja: "JLPT N5 第2期生のためのオリエンテーションです。講師や仲間と顔を合わせる機会です。",
    },
    registrationOpen: true,
  },
  {
    title: {
      en: "Japanese Tea Ceremony Workshop",
      ja: "茶道ワークショップ",
    },
    date: { en: "October 2025", ja: "2025年10月" },
    category: { en: "Workshop", ja: "ワークショップ" },
    description: {
      en: "An intimate workshop exploring the philosophy and practice of Chado — the Japanese way of tea.",
      ja: "茶道 — 日本の茶の湯 — の哲学と作法を少人数で学ぶワークショップです。",
    },
    registrationOpen: false,
  },
  {
    title: {
      en: "Setsubun — Bean Throwing Festival",
      ja: "節分 — 豆まきの行事",
    },
    date: { en: "February 2026", ja: "2026年2月" },
    category: { en: "Festival", ja: "祭り" },
    description: {
      en: "Celebrate the traditional Japanese spring festival with bean throwing, oni masks, and seasonal foods.",
      ja: "豆まき、鬼のお面、季節の食を通じて、日本の伝統的な春の行事を祝います。",
    },
    registrationOpen: false,
  },
]

export interface Delegation {
  org: L
  fullName: L
  date: L
  purpose: L
  outcome: L
}

/**
 * Delegation log — reproduced from the approved prototype.
 *
 * ⚠️ These entries assert specific institutional outcomes (a signed MOU,
 * diplomatic endorsement, a scholarship pathway). None is corroborated by
 * the Centre's own records. Verify each claim before publishing — an
 * unfounded MOU claim on a university site is a material misstatement.
 */
export const delegations: Delegation[] = [
  {
    org: { en: "JASSO", ja: "JASSO" },
    fullName: {
      en: "Japan Student Services Organization",
      ja: "日本学生支援機構",
    },
    date: { en: "April 2025", ja: "2025年4月" },
    purpose: {
      en: "Scholarship opportunities and academic exchange frameworks for Indian students",
      ja: "インドの学生に向けた奨学金の機会と学術交流の枠組み",
    },
    outcome: {
      en: "Established formal scholarship information pathway for Woxsen students",
      ja: "ウォクセンの学生向けに正式な奨学金情報の窓口を設置",
    },
  },
  {
    org: { en: "Embassy of Japan", ja: "在インド日本国大使館" },
    fullName: {
      en: "Embassy of Japan in India",
      ja: "在インド日本国大使館",
    },
    date: { en: "March 2025", ja: "2025年3月" },
    purpose: {
      en: "Diplomatic recognition and institutional partnership for the Centre's inauguration",
      ja: "センター開設にあたっての外交的な承認と機関間の連携",
    },
    outcome: {
      en: "Official diplomatic endorsement of the Woxsen Japan Centre",
      ja: "ウォクセン日本センターに対する公式な外交的支持",
    },
  },
  {
    org: { en: "Nara Japan Centre", ja: "奈良ジャパンセンター" },
    fullName: {
      en: "Nara Japan Centre, Japan",
      ja: "奈良ジャパンセンター（日本）",
    },
    date: { en: "May 2025", ja: "2025年5月" },
    purpose: {
      en: "Academic collaboration, student exchange, and joint cultural programming",
      ja: "学術連携、学生交換、共同文化企画",
    },
    outcome: {
      en: "MOU signed for student exchange and joint academic initiatives",
      ja: "学生交換および共同学術事業に関する覚書を締結",
    },
  },
]

export interface EventStat {
  number: string
  label: L
  sub: L
}

/** "By the Numbers" — figures reproduced from the prototype, unverified. */
export const eventStats: EventStat[] = [
  {
    number: "12+",
    label: { en: "Events Hosted", ja: "開催した行事" },
    sub: { en: "Since inauguration", ja: "開設以来" },
  },
  {
    number: "3",
    label: { en: "Delegations Received", ja: "受け入れた訪問団" },
    sub: { en: "From Japan & India", ja: "日本とインドから" },
  },
  {
    number: "200+",
    label: { en: "Participants", ja: "参加者" },
    sub: { en: "Across all events", ja: "全行事あわせて" },
  },
  {
    number: "5",
    label: { en: "Festival Themes", ja: "祭りのテーマ" },
    sub: { en: "Seasonal celebrations", ja: "季節の祝祭" },
  },
]
