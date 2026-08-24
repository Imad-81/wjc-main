import type { L } from "@/i18n/config"

export interface MembershipTier {
  id: string
  title: L
  subtitle: L
  price: L
  priceNote: L
  featured: boolean
  benefits: L<string[]>
}

/**
 * Home-page membership tiers, reproduced from the approved prototype.
 *
 * NOTE: the ₹2,000 professional fee comes from the prototype and has not
 * been confirmed by the Centre — verify before this page goes live.
 */
export const membershipTiers: MembershipTier[] = [
  {
    id: "student",
    title: { en: "Student Member", ja: "学生メンバー" },
    subtitle: { en: "For enrolled students", ja: "在学生の方へ" },
    price: { en: "Free", ja: "無料" },
    priceNote: { en: "No cost, ever", ja: "費用は一切かかりません" },
    featured: true,
    benefits: {
      en: [
        "Japanese language classes access",
        "Cultural events & festivals",
        "Monthly newsletter",
        "JLPT study groups",
      ],
      ja: [
        "日本語クラスの受講",
        "文化行事・季節の祭り",
        "月刊ニュースレター",
        "JLPT 学習グループ",
      ],
    },
  },
  {
    id: "faculty",
    title: { en: "Faculty Member", ja: "教員メンバー" },
    subtitle: { en: "For educators & researchers", ja: "教育・研究者の方へ" },
    price: { en: "Free", ja: "無料" },
    priceNote: { en: "Institutional membership", ja: "機関メンバーシップ" },
    featured: false,
    benefits: {
      en: [
        "Research collaboration network",
        "Academic exchange programs",
        "Faculty workshops & seminars",
        "Publication opportunities",
      ],
      ja: [
        "研究協働ネットワーク",
        "学術交流プログラム",
        "教員向けワークショップ・セミナー",
        "論文発表の機会",
      ],
    },
  },
  {
    id: "professional",
    title: { en: "Professional Member", ja: "社会人メンバー" },
    subtitle: { en: "For industry professionals", ja: "産業界の方へ" },
    price: { en: "₹2,000", ja: "₹2,000" },
    priceNote: { en: "Per year", ja: "年額" },
    featured: false,
    benefits: {
      en: [
        "Industry networking events",
        "Japan business insights",
        "Exclusive delegation meets",
        "Corporate partnership access",
      ],
      ja: [
        "業界ネットワーキング行事",
        "日本ビジネスの知見",
        "限定の訪問団交流会",
        "企業提携へのアクセス",
      ],
    },
  },
]

export interface ImpactStat {
  prefix: string
  value: number
  suffix: string
  label: L
}

/** "Our Impact" band. Figures reproduced from the approved prototype. */
export const impactStats: ImpactStat[] = [
  {
    prefix: "",
    value: 2025,
    suffix: "",
    label: { en: "Year Established", ja: "設立年" },
  },
  {
    prefix: "",
    value: 7,
    suffix: "+",
    label: { en: "Community Members", ja: "コミュニティメンバー" },
  },
  {
    prefix: "",
    value: 18,
    suffix: "+",
   label: { en: "Student Leaders", ja: "学生リーダー" },
  },
  {
    prefix: "",
    value: 150,
    suffix: "+",
   label: {
  en: "Members",
  ja: "メンバー",
},
  },
]
