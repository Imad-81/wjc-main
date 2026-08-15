import type { L } from "@/i18n/config"

/** Official registration forms. These are the live signup mechanism. */
export const REGISTRATION_FORMS = {
  community:
    "https://docs.google.com/forms/d/e/1FAIpQLSenfpbj8b4zINjx9z0DnqeB0yaTVev_XLvP5rKchMYEI49q3w/viewform",
  jlptCourse:
    "https://docs.google.com/forms/d/e/1FAIpQLSczMcKyQtLQMNaZA_zrEA4ddzJVK-f5NbtOhAqtye3dIE20ew/viewform",
} as const

export interface Benefit {
  kanji: string
  title: L
  description: L
}

export const membershipBenefits: Benefit[] = [
  {
    kanji: "語",
    title: { en: "Language Learning", ja: "語学の学び" },
    description: {
      en: "Access comprehensive Japanese language courses at N5 and N4, with peer study groups and language exchange sessions.",
      ja: "N5・N4 の充実した日本語講座に加え、学習グループや言語交換セッションにご参加いただけます。",
    },
  },
  {
    kanji: "文",
    title: { en: "Cultural Experiences", ja: "文化体験" },
    description: {
      en: "Participate in authentic Japanese cultural activities, traditional arts workshops, festivals, and film screenings.",
      ja: "本格的な日本文化の活動、伝統芸術のワークショップ、季節の祭り、映画上映にご参加いただけます。",
    },
  },
  {
    kanji: "学",
    title: { en: "Study Abroad", ja: "留学の機会" },
    description: {
      en: "Explore opportunities for student exchanges, scholarship pathways, and internships in Japan.",
      ja: "学生交換、奨学金の道筋、日本でのインターンシップの機会を探ることができます。",
    },
  },
  {
    kanji: "業",
    title: { en: "Career Support", ja: "キャリア支援" },
    description: {
      en: "Gain mentorship for careers in Japan or with Japanese organizations operating in India.",
      ja: "日本、またはインドで事業を展開する日本企業でのキャリアに向けたメンタリングを受けられます。",
    },
  },
  {
    kanji: "絆",
    title: { en: "Networking", ja: "ネットワーク" },
    description: {
      en: "Connect with professionals, students, faculty, and cultural enthusiasts across the Indo-Japanese community.",
      ja: "日印コミュニティの専門家、学生、教員、文化愛好家とつながることができます。",
    },
  },
  {
    kanji: "証",
    title: { en: "Certifications", ja: "資格取得" },
    description: {
      en: "Prepare for the JLPT and receive certificates recognising your participation and progress.",
      ja: "JLPT の対策を行い、参加と成長を証明する修了証を取得できます。",
    },
  },
]

export interface Tier {
  kanji: string
  level: number
  name: string
  title: L
  description: L
  requirement: L
}

/**
 * The four-level progression. Structure follows the approved design; the
 * naming (Kansatsu → Nakama → Senpai → Taishi) comes from the existing site.
 */
export const tiers: Tier[] = [
  {
    kanji: "観",
    level: 1,
    name: "Kansatsu",
    title: { en: "Observer", ja: "観察者" },
    description: {
      en: "Your first step in. Attend events, explore the Centre, and discover what Japanese culture means to you.",
      ja: "最初の一歩です。イベントに参加し、センターを訪れ、日本文化が自分にとって何を意味するのかを見つけていきます。",
    },
    requirement: {
      en: "Open enrolment — no prerequisites",
      ja: "登録は自由 — 条件はありません",
    },
  },
  {
    kanji: "仲",
    level: 2,
    name: "Nakama",
    title: { en: "Core Member", ja: "中核メンバー" },
    description: {
      en: "You have attended events, engaged with the community, and demonstrated genuine curiosity.",
      ja: "イベントに参加し、コミュニティと関わり、確かな好奇心を示してきた方です。",
    },
    requirement: {
      en: "Attend 3+ events · Complete N5 enrolment",
      ja: "イベント3回以上参加 · N5 講座の登録完了",
    },
  },
  {
    kanji: "先",
    level: 3,
    name: "Senpai",
    title: { en: "Senior Member", ja: "上級メンバー" },
    description: {
      en: "You have grown through the community and now guide others. Your experience and dedication are recognised.",
      ja: "コミュニティの中で成長し、今は他の人を導く立場にあります。その経験と献身が認められています。",
    },
    requirement: {
      en: "Complete N5 or N4 · Volunteer at 2+ events",
      ja: "N5 または N4 修了 · イベント2回以上の運営参加",
    },
  },
  {
    kanji: "大",
    level: 4,
    name: "Taishi",
    title: { en: "Ambassador", ja: "アンバサダー" },
    description: {
      en: "The highest recognition. You represent the Centre, mentor new members, and carry the spirit of Indo-Japanese exchange forward.",
      ja: "最高位の評価です。センターを代表し、新しいメンバーを導き、日印交流の精神を次へとつないでいきます。",
    },
    requirement: {
      en: "Advanced proficiency · Lead a community initiative",
      ja: "上級レベルの習熟 · コミュニティ活動の主導",
    },
  },
]

export interface JoinStep {
  number: string
  title: L
  description: L
}

export const joinSteps: JoinStep[] = [
  {
    number: "01",
    title: { en: "Fill the Form", ja: "フォームに記入" },
    description: {
      en: "Complete our quick registration form with your details and interests.",
      ja: "簡単な登録フォームに、ご自身の情報と関心のある分野をご記入ください。",
    },
  },
  {
    number: "02",
    title: { en: "Get Verified", ja: "確認を受ける" },
    description: {
      en: "Our team will review your application and send you a confirmation.",
      ja: "担当チームがお申し込み内容を確認し、確認のご連絡をお送りします。",
    },
  },
  {
    number: "03",
    title: { en: "Start Exploring", ja: "活動をはじめる" },
    description: {
      en: "Access events, courses, and connect with our vibrant community.",
      ja: "イベントや講座に参加し、活気あるコミュニティとつながりましょう。",
    },
  },
]
