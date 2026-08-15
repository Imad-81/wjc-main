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

/**
 * Join Us FAQ.
 *
 * Mirrors the prototype's question set, minus its JASSO-scholarship item —
 * JASSO was removed from the Centre's partner list, so claiming a
 * scholarship pathway through them would be inaccurate.
 */
export const joinFaqs: Faq[] = [
  {
    question: {
      en: "Is community membership free?",
      ja: "コミュニティのメンバーシップは無料ですか?",
    },
    answer: {
      en: "Yes. Membership is completely free for all Woxsen University students. Simply register using your Woxsen email address — there are no fees for cultural events or community activities.",
      ja: "はい。ウォクセン大学の学生の方は完全に無料です。ウォクセンのメールアドレスでご登録いただくだけで、文化行事やコミュニティ活動に費用はかかりません。",
    },
  },
  {
    question: {
      en: "Do I need any prior knowledge of Japanese to join?",
      ja: "参加するのに日本語の知識は必要ですか?",
    },
    answer: {
      en: "No. Most members begin with no Japanese at all. The N5 course starts from hiragana and katakana, and cultural events are open to everyone regardless of language level.",
      ja: "いいえ。ほとんどの方が日本語の知識ゼロから始めています。N5 講座はひらがな・カタカナから始まり、文化行事は語学レベルを問わずどなたでもご参加いただけます。",
    },
  },
  {
    question: {
      en: "Can students from other universities join?",
      ja: "他大学の学生も参加できますか?",
    },
    answer: {
      en: "Membership and course enrolment are currently open to Woxsen University students, faculty, and staff. If you are outside the university and would like to collaborate, please write to us at japan.centre@woxsen.edu.in.",
      ja: "メンバーシップと講座の受講は、現在ウォクセン大学の学生・教職員を対象としています。学外の方で連携をご希望の場合は、japan.centre@woxsen.edu.in までご連絡ください。",
    },
  },
  {
    question: {
      en: "How long does it take to reach Ambassador level?",
      ja: "アンバサダーになるにはどのくらいかかりますか?",
    },
    answer: {
      en: "There is no fixed timeline. Progression is based on contribution rather than time served — attending events, completing course levels, and taking on volunteer leadership. Most members who engage consistently move up each academic year.",
      ja: "決まった期間はありません。在籍期間ではなく貢献に基づいて進みます。行事への参加、講座レベルの修了、運営でのリーダーシップが評価の対象です。継続的に関わる方の多くは、学年ごとに次の段階へ進んでいます。",
    },
  },
  {
    question: {
      en: "Are there any time commitments for membership?",
      ja: "メンバーシップに時間的な制約はありますか?",
    },
    answer: {
      en: "None at the entry level — you are welcome to attend as much or as little as you like. Higher levels of recognition do carry participation expectations, but those are entirely opt-in.",
      ja: "入門段階では一切ありません。ご都合に合わせて自由にご参加いただけます。上位の段階には参加の目安がありますが、そちらは完全に任意です。",
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
