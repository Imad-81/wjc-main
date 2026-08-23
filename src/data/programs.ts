import type { L } from "@/i18n/config"

export type ProgramCategory = "Language" | "Cultural" | "Academic" | "Industry"

export interface Program {
  id: string
  level: L
  title: L
  subtitle: L
  duration: L
  schedule: L
  eligibility: L
  description: L
  curriculum: L<string[]>
  outcomes: L<string[]>
  category: ProgramCategory
  image: string
  featured?: boolean
}

export const CATEGORY_COLORS: Record<ProgramCategory, string> = {
  Language: "#C0392B",
  Cultural: "#8B6914",
  Academic: "#4A6A8A",
  Industry: "#5C7A5C",
}

/**
 * Programme catalogue, reproduced from the approved prototype.
 *
 * ⚠️ Schedules, durations, and eligibility rules come from the prototype and
 * have not been confirmed by the Centre. Several entries (the Academic
 * Partnership and Industry Collaboration tracks) describe offerings the
 * Centre may not yet run — confirm each before publishing.
 */
export const programs: Program[] = [
  {
    id: "jlpt-n5",
    level: { en: "N5", ja: "N5" },
    title: {
      en: "Japanese Language — JLPT N5",
      ja: "日本語 — JLPT N5",
    },
    subtitle: { en: "Foundation Level", ja: "基礎レベル" },
    duration: { en: "3 Months", ja: "3か月" },
    schedule: {
      en: "Mon, Wed, Fri · 6:00–7:30 PM",
      ja: "月・水・金 18:00–19:30",
    },
    eligibility: {
      en: "Open to all — no prior Japanese knowledge required",
      ja: "どなたでも — 日本語の予備知識は不要です",
    },
    description: {
      en: "Begin your Japanese language journey with our structured N5 preparation course. Learn hiragana, katakana, and 800 essential vocabulary words under the guidance of qualified instructors.",
      ja: "体系的な N5 対策講座で、日本語学習の第一歩を踏み出しましょう。有資格の講師の指導のもと、ひらがな、カタカナ、そして必須語彙800語を学びます。",
    },
    curriculum: {
      en: [
        "Hiragana & Katakana mastery",
        "Basic grammar structures (は、が、を、に)",
        "800 essential vocabulary words",
        "Elementary listening comprehension",
        "Reading simple sentences",
        "JLPT N5 exam strategy",
      ],
      ja: [
        "ひらがな・カタカナの習得",
        "基本文法（は・が・を・に）",
        "必須語彙800語",
        "初級の聴解",
        "簡単な文の読解",
        "JLPT N5 の試験対策",
      ],
    },
    outcomes: {
      en: [
        "Pass JLPT N5 examination",
        "Hold basic daily conversations",
        "Read simple Japanese text",
        "Understand fundamental grammar",
      ],
      ja: [
        "JLPT N5 の合格",
        "基本的な日常会話",
        "簡単な日本語の読解",
        "基礎文法の理解",
      ],
    },
    category: "Language",
    image: "/images/events/language-course/event6.jpg",
    featured: true,
  },
  {
    id: "jlpt-n4",
    level: { en: "N4", ja: "N4" },
    title: {
      en: "Japanese Language — JLPT N4",
      ja: "日本語 — JLPT N4",
    },
    subtitle: { en: "Elementary Level", ja: "初中級レベル" },
    duration: { en: "4 Months", ja: "4か月" },
    schedule: {
      en: "Tue, Thu · 6:00–8:00 PM + Saturday sessions",
      ja: "火・木 18:00–20:00 ＋ 土曜クラス",
    },
    eligibility: {
      en: "JLPT N5 certificate or equivalent proficiency",
      ja: "JLPT N5 認定または同等の日本語力",
    },
    description: {
      en: "Advance your Japanese language skills to JLPT N4 level. This course expands your vocabulary, introduces complex grammar, and builds conversational confidence for professional settings.",
      ja: "日本語力を JLPT N4 レベルへ引き上げます。語彙を広げ、複雑な文法に取り組み、仕事の場でも通用する会話の自信を養います。",
    },
    curriculum: {
      en: [
        "1,500 vocabulary words (cumulative)",
        "Intermediate grammar patterns",
        "Kanji recognition (300 characters)",
        "Conversational practice with native speakers",
        "Business Japanese introduction",
        "JLPT N4 mock examinations",
      ],
      ja: [
        "語彙1,500語（累計）",
        "中級の文法パターン",
        "漢字の認識（300字）",
        "母語話者との会話練習",
        "ビジネス日本語入門",
        "JLPT N4 模擬試験",
      ],
    },
    outcomes: {
      en: [
        "Pass JLPT N4 examination",
        "Converse in everyday Japanese",
        "Read simple Japanese publications",
        "Qualify for Japan internship programs",
      ],
      ja: [
        "JLPT N4 の合格",
        "日常的な日本語での会話",
        "簡単な日本語出版物の読解",
        "日本でのインターンシップへの応募資格",
      ],
    },
    category: "Language",
    image: "/images/events/language-course/event7.jpg",
  },
  {
    id: "cultural-exchange",
    level: { en: "Open", ja: "全員" },
    title: { en: "Cultural Exchange Program", ja: "文化交流プログラム" },
    subtitle: { en: "Immersive Experience", ja: "没入型の体験" },
    duration: { en: "Semester-long", ja: "1学期間" },
    schedule: {
      en: "Monthly events + weekly sessions",
      ja: "月次イベント ＋ 週次セッション",
    },
    eligibility: {
      en: "All Woxsen University members",
      ja: "ウォクセン大学の全構成員",
    },
    description: {
      en: "An immersive cultural program exploring Japanese traditions, arts, philosophy, and contemporary society. From tea ceremony to ikebana, from Noh theatre to modern manga — experience Japan without leaving Hyderabad.",
      ja: "日本の伝統、芸術、思想、そして現代社会を探究する没入型の文化プログラムです。茶道から生け花、能から現代の漫画まで、ハイデラバードにいながら日本を体験できます。",
    },
    curriculum: {
      en: [
        "Japanese tea ceremony (Sadō)",
        "Ikebana flower arrangement",
        "Calligraphy workshops (Shodō)",
        "Traditional and contemporary cinema",
        "Culinary arts — Japanese cooking",
        "Philosophy: Wabi-sabi, Ma, Mono no aware",
      ],
      ja: [
        "茶道",
        "生け花",
        "書道ワークショップ",
        "伝統と現代の映画",
        "日本料理",
        "思想：侘び寂び・間・物の哀れ",
      ],
    },
    outcomes: {
      en: [
        "Deep cross-cultural understanding",
        "Practical traditional arts skills",
        "Japan cultural literacy certificate",
        "Enhanced intercultural communication",
      ],
      ja: [
        "深い異文化理解",
        "伝統芸術の実践的な技能",
        "日本文化リテラシー修了証",
        "異文化コミュニケーション力の向上",
      ],
    },
    category: "Cultural",
    image: "/images/events/japanese-cultural-immersion/event2.jpg",
  },
  {
    id: "academic-partnership",
    level: { en: "Faculty", ja: "教員" },
    title: { en: "Academic Partnership Program", ja: "学術提携プログラム" },
    subtitle: { en: "Research Collaboration", ja: "研究協働" },
    duration: { en: "Year-round", ja: "通年" },
    schedule: {
      en: "Flexible · Project-based",
      ja: "柔軟な日程・プロジェクト単位",
    },
    eligibility: {
      en: "Woxsen faculty and PhD researchers",
      ja: "ウォクセンの教員および博士研究者",
    },
    description: {
      en: "A structured program enabling Woxsen faculty to collaborate with Japanese universities, publish joint research, and participate in international academic conferences. Facilitated through our Nara Japan Centre partnership.",
      ja: "ウォクセンの教員が日本の大学と協働し、共同研究を発表し、国際学会に参加するための体系的なプログラムです。奈良ジャパンセンターとの提携を通じて実施しています。",
    },
    curriculum: {
      en: [
        "Joint research project development",
        "Academic exchange visits to Japan",
        "Co-authored publication support",
        "Conference presentation opportunities",
        "Grant writing workshops",
        "Indo-Japan research network access",
      ],
      ja: [
        "共同研究プロジェクトの立ち上げ",
        "日本への学術交流訪問",
        "共著論文の執筆支援",
        "学会発表の機会",
        "研究助成申請のワークショップ",
        "日印研究ネットワークへのアクセス",
      ],
    },
    outcomes: {
      en: [
        "International research publications",
        "Established Japan university connections",
        "Grant funding opportunities",
        "Faculty exchange visits",
      ],
      ja: [
        "国際的な研究発表",
        "日本の大学との確かなつながり",
        "研究助成の機会",
        "教員の相互訪問",
      ],
    },
    category: "Academic",
    image: "/images/events/woxsen-japan-fest/event9.jpeg",
  },
  {
    id: "industry-collaboration",
    level: { en: "Professional", ja: "社会人" },
    title: { en: "Industry Collaboration Track", ja: "産業連携トラック" },
    subtitle: { en: "Japan Business Gateway", ja: "日本ビジネスへの入り口" },
    duration: { en: "Ongoing enrollment", ja: "随時受付" },
    schedule: {
      en: "Monthly sessions + networking events",
      ja: "月次セッション ＋ 交流イベント",
    },
    eligibility: {
      en: "Professionals and final-year students",
      ja: "社会人および最終学年の学生",
    },
    description: {
      en: "A career-focused program connecting students and professionals with the 1,400+ Japanese companies operating in India. Includes internship placements, mentorship from Japanese business leaders, and corporate networking events.",
      ja: "インドで事業を展開する1,400社以上の日本企業と、学生・社会人をつなぐキャリア重視のプログラムです。インターンシップの紹介、日本のビジネスリーダーによるメンタリング、企業交流イベントを含みます。",
    },
    curriculum: {
      en: [
        "Japanese business culture & etiquette",
        "Corporate Japanese language basics",
        "Industry networking sessions",
        "Internship application support",
        "Japanese company visit programs",
        "Career mentorship with Japanese executives",
      ],
      ja: [
        "日本のビジネス文化とマナー",
        "ビジネス日本語の基礎",
        "業界交流セッション",
        "インターンシップ応募の支援",
        "日本企業訪問プログラム",
        "日本の経営層によるキャリアメンタリング",
      ],
    },
    outcomes: {
      en: [
        "Internship placement in Japanese firms",
        "Professional Japanese network",
        "Business culture certification",
        "Career pathway to Japan",
      ],
      ja: [
        "日本企業でのインターンシップ",
        "日本での専門的な人脈",
        "ビジネス文化の修了認定",
        "日本へのキャリアの道筋",
      ],
    },
    category: "Industry",
    image: "/images/events/woxsen-japan-fest/event10.png",
  },
]
