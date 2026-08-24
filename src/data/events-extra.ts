import type { L } from "@/i18n/config"

export interface UpcomingEvent {
  title: L
  date: L
  category: L
  description: L
  registrationOpen: boolean
  /**
   * Overrides the registration pill. Use for events where "Registration Open"
   * and "Coming Soon" both read wrong — a ceremony nobody signs up for, or an
   * event happening today. Change it by hand as the date passes.
   */
  status?: L
  /** Optional poster. Rendered as a thumbnail at the head of the card. */
  poster?: { src: string; alt: L }
}

/**
 * "What's Next" — the Centre's confirmed upcoming events.
 *
 * The prototype's four placeholder entries (Natsu Matsuri, JLPT N5 Batch 2,
 * Tea Ceremony, Setsubun) were removed: none was in the Centre's records and
 * all four had drifted into the past.
 */
export const upcomingEvents: UpcomingEvent[] = [
  {
    // The honours poster carried in the home-page hero. Details are taken
    // from the poster artwork itself (toshiba-honours.webp).
    title: {
      en: "Woxsen Leadership Distinction Award 2026",
      ja: "ウォクセン・リーダーシップ・ディスティンクション賞 2026",
    },
    date: { en: "24 August 2026", ja: "2026年8月24日" },
    category: { en: "Honours", ja: "顕彰" },
    description: {
      en: "Woxsen University confers the Woxsen Leadership Distinction Award 2026 on Mr. Hiroshi Furuta, Chairman & Managing Director of Toshiba Transmission & Distribution Systems (India) Pvt. Ltd., in recognition of his leadership in Indo-Japanese industrial partnership.",
      ja: "ウォクセン大学は、東芝トランスミッション＆ディストリビューションシステムズ（インド）会長兼マネージングディレクターの古田博氏に、日印の産業連携における指導的役割を称え、ウォクセン・リーダーシップ・ディスティンクション賞2026を授与いたします。",
    },
    registrationOpen: false,
    status: { en: "Happening Today", ja: "本日開催" },
    poster: {
      src: "/images/hero-banner/toshiba-honours.webp",
      alt: {
        en: "Woxsen University Honours — Mr. Hiroshi Furuta, Chairman & Managing Director, Toshiba Transmission & Distribution Systems (India) Pvt. Ltd., recipient of the Woxsen Leadership Distinction Award 2026.",
        ja: "ウォクセン大学栄誉 — 東芝トランスミッション＆ディストリビューションシステムズ（インド）会長兼マネージングディレクター、古田博氏。ウォクセン・リーダーシップ・ディスティンクション賞2026受賞。",
      },
    },
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
