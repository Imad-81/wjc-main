import type { L } from "@/i18n/config"

export interface JlptLevel {
  id: string
  code: string
  numeral: string
  title: L
  tagline: L
  description: L
  outcomes: L<string[]>
  duration: L
  schedule: L
  outcome: L
  status: "open" | "soon"
  /** Accent rule across the top of the card. */
  accent: string
}

/**
 * Course levels, reproduced from the approved prototype.
 *
 * ⚠️ The durations and class schedules below come from the prototype and
 * have not been confirmed by the Centre — verify before publishing.
 */
export const jlptLevels: JlptLevel[] = [
  {
    id: "n5",
    code: "JLPT N5",
    numeral: "五",
    duration: { en: "3 months", ja: "3か月" },
    schedule: { en: "Mon, Wed, Fri · 6:00–7:30 PM", ja: "月・水・金 18:00–19:30" },
    outcome: { en: "JLPT N5 Certification Eligible", ja: "JLPT N5 受験資格" },
    title: { en: "Foundation", ja: "基礎" },
    tagline: { en: "Begin the Journey", ja: "はじめの一歩" },
    description: {
      en: "The entry point into Japanese language. Build a foundation in hiragana, katakana, and basic kanji. Learn everyday expressions, simple sentence structures, and the cultural context that makes language meaningful.",
      ja: "日本語への入り口です。ひらがな、カタカナ、基本的な漢字の土台を築きます。日常表現、簡単な文構造、そして言葉に意味を与える文化的背景を学びます。",
    },
    outcomes: {
      en: [
        "Hiragana & Katakana mastery",
        "Basic kanji (100 characters)",
        "Everyday conversation",
        "Simple reading comprehension",
        "Cultural etiquette basics",
      ],
      ja: [
        "ひらがな・カタカナの習得",
        "基本漢字（100字）",
        "日常会話",
        "簡単な読解",
        "文化的マナーの基礎",
      ],
    },
    status: "open",
    accent: "#4F7A6B",
  },
  {
    id: "n4",
    code: "JLPT N4",
    numeral: "四",
    duration: { en: "4 months", ja: "4か月" },
    schedule: { en: "Tue, Thu · 6:00–8:00 PM + Sat 10:00 AM", ja: "火・木 18:00–20:00 ＋ 土 10:00" },
    outcome: { en: "JLPT N4 Certification Eligible", ja: "JLPT N4 受験資格" },
    title: { en: "Intermediate", ja: "中級" },
    tagline: { en: "Deepen Your Understanding", ja: "理解を深める" },
    description: {
      en: "Build on your N5 foundation with expanded vocabulary, complex grammar patterns, and conversational fluency. Engage with authentic Japanese texts, media, and real-world communication scenarios.",
      ja: "N5 で築いた土台の上に、語彙の拡張、複雑な文法パターン、会話の流暢さを重ねていきます。実際の日本語のテキストやメディア、現実のコミュニケーション場面に取り組みます。",
    },
    outcomes: {
      en: [
        "300+ kanji characters",
        "Complex grammar structures",
        "Reading newspaper headlines",
        "Listening comprehension",
        "Business introduction phrases",
      ],
      ja: [
        "漢字300字以上",
        "複雑な文法構造",
        "新聞の見出しを読む",
        "聴解力",
        "ビジネスの自己紹介表現",
      ],
    },
    status: "open",
    accent: "#C9AE84",
  },
  {
    id: "n3",
    code: "JLPT N3",
    numeral: "三",
    duration: { en: "6 months", ja: "6か月" },
    schedule: { en: "Mon–Fri · 7:00–8:30 PM (Intensive)", ja: "月〜金 19:00–20:30（集中）" },
    outcome: { en: "JLPT N3 Certification Eligible", ja: "JLPT N3 受験資格" },
    title: { en: "Advanced", ja: "上級" },
    tagline: { en: "Achieve Fluency", ja: "流暢さへ" },
    description: {
      en: "The gateway to professional Japanese proficiency. Master nuanced grammar, formal and informal registers, and develop the reading and listening skills required for academic and professional contexts in Japan.",
      ja: "実務レベルの日本語への入り口です。微妙なニュアンスの文法、敬体と常体の使い分けを習得し、日本の学術・職業の場で必要となる読解力と聴解力を養います。",
    },
    outcomes: {
      en: [
        "650+ kanji characters",
        "Formal & informal registers",
        "Academic text comprehension",
        "Extended listening tasks",
        "Study abroad preparation",
      ],
      ja: [
        "漢字650字以上",
        "敬体と常体の使い分け",
        "学術文書の読解",
        "長文の聴解課題",
        "留学準備",
      ],
    },
    status: "soon",
    accent: "#A63A2B",
  },
]

export interface PathwayStep {
  number: string
  title: L
  description: L
}

export const jlptPathway: PathwayStep[] = [
  {
    number: "01",
    title: { en: "Enrolment", ja: "申し込み" },
    description: {
      en: "Choose your level based on prior experience. Complete a brief placement assessment if needed.",
      ja: "これまでの経験に応じてレベルを選びます。必要に応じて簡単なプレースメント評価を受けていただきます。",
    },
  },
  {
    number: "02",
    title: { en: "Foundation Classes", ja: "基礎クラス" },
    description: {
      en: "Structured instruction in script, vocabulary, grammar, and cultural context.",
      ja: "文字、語彙、文法、文化的背景について体系的に学びます。",
    },
  },
  {
    number: "03",
    title: { en: "Practice & Immersion", ja: "実践と体験" },
    description: {
      en: "Language circles, cultural events, and conversation practice with native speakers.",
      ja: "語学サークル、文化イベント、母語話者との会話練習に参加します。",
    },
  },
  {
    number: "04",
    title: { en: "Exam Preparation", ja: "試験対策" },
    description: {
      en: "Dedicated mock tests, past paper practice, and targeted revision before the JLPT.",
      ja: "JLPT に向けた模擬試験、過去問演習、重点的な復習を行います。",
    },
  },
  {
    number: "05",
    title: { en: "Certification", ja: "認定" },
    description: {
      en: "Sit the official JLPT examination and receive your internationally recognised certification.",
      ja: "公式の JLPT を受験し、国際的に認められた認定を取得します。",
    },
  },
]
