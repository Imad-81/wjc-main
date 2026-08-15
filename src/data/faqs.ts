import type { L } from "@/i18n/config"

export interface Faq {
  question: L
  answer: L
}

/** Home page FAQ — about the Centre as a whole. */
export const centreFaqs: Faq[] = [
  {
    question: {
      en: "Who can join the Woxsen Japan Centre?",
      ja: "ウォクセン日本センターには誰が参加できますか?",
    },
    answer: {
      en: "The Centre is open to all Woxsen University students, faculty, staff, and external professionals. We welcome anyone with a genuine interest in Japanese language, culture, or academic and industry collaboration.",
      ja: "当センターは、ウォクセン大学の学生・教員・職員、そして学外の社会人の方にも開かれています。日本語、日本文化、または学術・産業連携に真摯な関心をお持ちの方をお迎えします。",
    },
  },
  {
    question: {
      en: "What Japanese language levels are offered?",
      ja: "どの日本語レベルを開講していますか?",
    },
    answer: {
      en: "We currently offer JLPT N5 (beginner) and N4 (elementary) preparation courses led by qualified instructors. We have plans to expand to N3 and beyond based on community demand.",
      ja: "現在、有資格の講師による JLPT N5（初級）および N4（初中級）の対策講座を開講しています。ご要望に応じて N3 以上への拡充も予定しています。",
    },
  },
  {
    question: {
      en: "Are there opportunities to visit Japan?",
      ja: "日本を訪れる機会はありますか?",
    },
    answer: {
      en: "Yes. Through our partnerships with Indobox Inc. and Nara Japan Centre, we facilitate student exchanges, internships, and study tours to Japan. These opportunities are announced throughout the academic year.",
      ja: "はい。インドボックス株式会社および奈良ジャパンセンターとの提携を通じて、学生交換、インターンシップ、日本へのスタディツアーを実施しています。これらの機会は学年を通じてご案内します。",
    },
  },
  {
    question: {
      en: "How often are cultural events held?",
      ja: "文化行事はどのくらいの頻度で開催されますか?",
    },
    answer: {
      en: "We host monthly cultural events, seasonal festivals aligned with the Japanese calendar, and an annual Indo-Japan Academic Summit. Our programming spans language workshops, film screenings, culinary experiences, and traditional arts.",
      ja: "毎月の文化行事、日本の暦に合わせた季節の祭り、そして年次の日印学術サミットを開催しています。語学ワークショップ、映画上映、食体験、伝統芸術まで幅広く企画しています。",
    },
  },
  {
    question: {
      en: "Is membership free for students?",
      ja: "学生のメンバーシップは無料ですか?",
    },
    answer: {
      en: "Student membership is completely free of charge. Simply register using your Woxsen University email address. There are no hidden fees for language classes, cultural events, or community activities.",
      ja: "学生メンバーシップは完全に無料です。ウォクセン大学のメールアドレスでご登録いただくだけです。語学クラス、文化行事、コミュニティ活動に追加費用は一切かかりません。",
    },
  },
  {
    question: {
      en: "How can Japanese companies collaborate with the Centre?",
      ja: "日本企業はどのように連携できますか?",
    },
    answer: {
      en: "We warmly welcome industry partnerships, internship programs, and corporate collaborations. Please contact us at japan.centre@woxsen.edu.in with your collaboration proposal. With 1,400+ Japanese companies operating in India, we are positioned to create meaningful connections.",
      ja: "産業連携、インターンシップ制度、企業との協働を心より歓迎します。ご提案は japan.centre@woxsen.edu.in までお寄せください。インドで事業を展開する1,400社以上の日本企業とのあいだに、意義あるつながりを築いてまいります。",
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
