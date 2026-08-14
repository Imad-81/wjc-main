import type { L } from "@/i18n/config"

export interface Faq {
  question: L
  answer: L
}

/** Home page FAQ — about the Centre as a whole. */
export const centreFaqs: Faq[] = [
  {
    question: {
      en: "What are the main objectives of the Japan Centre?",
      ja: "日本センターの主な目的は何ですか?",
    },
    answer: {
      en: "The centre aims to foster cultural exchange, academic partnerships, language learning, industry collaboration, and global exposure focused on Japan.",
      ja: "当センターは、日本を軸とした文化交流、学術提携、語学学習、産業連携、そして国際経験の機会を促進することを目的としています。",
    },
  },
  {
    question: {
      en: "What kind of events does the Japan Centre organize?",
      ja: "日本センターはどのようなイベントを開催していますか?",
    },
    answer: {
      en: "The centre hosts workshops, seminars, guest lectures, cultural events, and Japan-focused industry talks.",
      ja: "ワークショップ、セミナー、ゲスト講演、文化イベント、日本に特化した産業界のトークセッションなどを開催しています。",
    },
  },
  {
    question: {
      en: "Does the Japan Centre collaborate with Japanese companies?",
      ja: "日本センターは日本企業と連携していますか?",
    },
    answer: {
      en: "Yes, the centre works to build industry linkages with Japanese organizations for internships, research, and innovation projects.",
      ja: "はい。インターンシップ、研究、イノベーションプロジェクトを通じて、日本の組織との産業連携の構築に取り組んでいます。",
    },
  },
  {
    question: {
      en: "Where is the Woxsen Japan Centre located on campus?",
      ja: "ウォクセン日本センターはキャンパスのどこにありますか?",
    },
    answer: {
      en: "The Japan Centre is located within the Woxsen University campus. Exact location details are available on the Contact page.",
      ja: "日本センターはウォクセン大学キャンパス内にあります。正確な所在地はお問い合わせページでご案内しています。",
    },
  },
  {
    question: {
      en: "How can I stay updated about Japan Centre activities?",
      ja: "日本センターの活動情報はどこで確認できますか?",
    },
    answer: {
      en: "Follow the Japan Centre's website announcements and official Woxsen University communication channels.",
      ja: "日本センターのウェブサイトのお知らせと、ウォクセン大学の公式連絡チャネルをご確認ください。",
    },
  },
]

/** JLPT page FAQ — about the language course specifically. */
export const jlptFaqs: Faq[] = [
  {
    question: {
      en: "Who can join the Japanese language course?",
      ja: "日本語講座には誰が参加できますか?",
    },
    answer: {
      en: "All Woxsen University students are eligible to join the Japanese language course. No prior knowledge of Japanese is required.",
      ja: "ウォクセン大学のすべての学生が日本語講座に参加できます。日本語の予備知識は必要ありません。",
    },
  },
  {
    question: {
      en: "How long is the Japanese language course?",
      ja: "日本語講座の期間はどのくらいですか?",
    },
    answer: {
      en: "The course duration typically ranges from 8 to 12 weeks, depending on the level and schedule.",
      ja: "講座の期間はレベルと日程により、通常8週間から12週間程度です。",
    },
  },
  {
    question: {
      en: "Will I get a certificate after completing the course?",
      ja: "修了後に証明書は発行されますか?",
    },
    answer: {
      en: "Yes, participants receive a certificate upon successful completion of the course.",
      ja: "はい。講座を修了された方には修了証を発行いたします。",
    },
  },
  {
    question: {
      en: "How can I register for the course?",
      ja: "講座への申し込み方法を教えてください。",
    },
    answer: {
      en: "Registration details will be shared through the Japan Centre website and official university communication channels.",
      ja: "申し込みの詳細は、日本センターのウェブサイトおよび大学の公式連絡チャネルでご案内します。",
    },
  },
  {
    question: {
      en: "What JLPT level does the Japanese course cover, and how does it help with jobs?",
      ja: "講座はどの JLPT レベルに対応し、就職にはどう役立ちますか?",
    },
    answer: {
      en: "The course focuses on JLPT N5 level. Learning Japanese can help students explore internships, entry-level roles, and career opportunities with Japanese companies and Japan-focused organizations.",
      ja: "講座は JLPT N5 レベルを中心としています。日本語を学ぶことで、日本企業や日本に関わる組織でのインターンシップ、初級職、キャリアの機会を広げることができます。",
    },
  },
]
