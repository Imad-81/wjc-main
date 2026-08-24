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
      en: "Does the Japan Center collaborate with Japanese companies?",
      ja: "日本センターは日本企業と連携していますか?",
    },
    answer: {
      en: "Yes, the center works to build industry linkages with Japanese organizations for internships, research, and innovation projects.",
      ja: "はい。当センターは、インターンシップ、研究、イノベーションプロジェクトに向けて、日本の組織との産業連携の構築に取り組んでいます。",
    },
  },
  {
    question: {
      en: "How often are cultural events held?",
      ja: "文化行事はどのくらいの頻度で開催されますか?",
    },
    answer: {
      en: "Our events and cultural initiatives are organized throughout the year, with programs generally held every two months, depending on the academic and cultural calendar. We also regularly welcome delegations and facilitate opportunities for meaningful Indo-Japan cultural and academic exchange.",
      ja: "当センターのイベントや文化的な取り組みは年間を通じて開催され、学術・文化カレンダーに応じて通常2か月ごとにプログラムが実施されます。また、定期的に代表団をお迎えし、有意義な日印文化・学術交流の機会を創出しています。",
    },
  },
  {
    question: {
      en: "Is membership free for students?",
      ja: "学生のメンバーシップは無料ですか?",
    },
    answer: {
      en: "Joining the Woxsen Japan Center student community is completely free of charge. Interested students are required to go through a brief interview process as part of the membership and selection process. While student community participation is free, our Japanese Language Courses, offered across different proficiency levels, are available at an additional fee, inclusive of applicable GST.",
      ja: "ウォクセン日本センターの学生コミュニティへの参加は完全無料です。メンバーシップおよび選考プロセスの一環として、希望する学生には簡単な面談を受けていただきます。学生コミュニティへの参加は無料ですが、各レベルに応じた日本語コースは所定の税（GST）を含む受講料が別途必要となります。",
    },
  },
  {
    question: {
      en: "How can Japanese companies collaborate with the Centre?",
      ja: "日本企業はどのように連携できますか?",
    },
    answer: {
      en: "We warmly welcome industry partnerships, internship programs, and corporate collaborations. Please contact us at japan.centre@woxsen.edu.in with your collaboration proposal.",
      ja: "産業連携、インターンシップ制度、企業との協働を心より歓迎します。ご提案は japan.centre@woxsen.edu.in までお寄せください。",
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

/** JLPT page FAQ. */
export const jlptFaqs: Faq[] = [
  {
    question: {
      en: "Who can join the Japanese language course?",
      ja: "日本語コースに参加できるのは誰ですか?",
    },
    answer: {
      en: "All Woxsen University students are eligible to join the Japanese language course. No prior knowledge of Japanese is required.",
      ja: "ウォクセン大学の学生はどなたでも日本語コースに参加できます。日本語の事前知識は必要ありません。",
    },
  },
  {
    question: {
      en: "How long is the Japanese language course?",
      ja: "日本語コースの期間はどのくらいですか?",
    },
    answer: {
      en: "The course duration typically ranges from 8 to 12 weeks, depending on the level and schedule.",
      ja: "コースの期間は、レベルやスケジュールによって異なりますが、通常8〜12週間です。",
    },
  },
  {
    question: {
      en: "Will I get a certificate after completing the course?",
      ja: "コース修了後に証明書はもらえますか?",
    },
    answer: {
      en: "Yes, participants receive a certificate upon successful completion of the course.",
      ja: "はい、コースを修了した参加者には修了証書が授与されます。",
    },
  },
  {
    question: {
      en: "How can I register for the course?",
      ja: "コースへの登録方法を教えてください。",
    },
    answer: {
      en: "Registration details will be shared through the Japan Center website and official university communication channels.",
      ja: "登録の詳細は、ジャパンセンターのウェブサイトおよび大学の公式連絡チャンネルを通じてお知らせします。",
    },
  },
  {
    question: {
      en: "What JLPT level does the Japanese course cover, and how does it help with jobs?",
      ja: "日本語コースはどのJLPTレベルをカバーしていますか?また、就職にどう役立ちますか?",
    },
    answer: {
      en: "The course focuses on JLPT N5 level. Learning Japanese can help students explore internships, entry-level roles, and career opportunities with Japanese companies and Japan-focused organizations.",
      ja: "コースはJLPT N5レベルに焦点を当てています。日本語を学ぶことで、インターンシップ、エントリーレベルの職、および日本企業や日本関連組織でのキャリア機会を探るのに役立ちます。",
    },
  },
]

