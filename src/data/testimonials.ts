import type { L } from "@/i18n/config"

export interface Testimonial {
  id: string
  quote: L
  name: string
  /** Programme / school, as supplied by the Centre. */
  affiliation: L
}

export const testimonials: Testimonial[] = [
  {
    id: "arjun-pal",
    quote: {
      en: "I feel that these classes have gotten me closer to the unique culture and language of Japan.",
      ja: "この授業を通じて、日本ならではの文化と言葉により近づけたと感じています。",
    },
    name: "Arjun Pal",
    affiliation: { en: "BCA — SOT", ja: "BCA — SOT" },
  },
  {
    id: "sasha-kishore",
    quote: {
      en: "I joined the Japanese course to learn the language, but they soon became the best part of my day. Each session is engaging and helps us learn not just the language, but also the culture in a clear and easy way. I get to learn something new every day without ever feeling overwhelmed.",
      ja: "言葉を学ぶために日本語講座に参加しましたが、いつのまにか一日で一番楽しみな時間になりました。毎回の授業は引き込まれる内容で、言語だけでなく文化まで分かりやすく学べます。負担を感じることなく、毎日新しい発見があります。",
    },
    name: "Sasha Kishore",
    affiliation: { en: "BSc", ja: "BSc" },
  },
  {
    id: "hassini",
    quote: {
      en: "Japanese classes at Woxsen have been the most fun language course I've taken. Maki sensei is very fun, relatable and takes her time helping us learn Japanese. Not only that but we cover a lot of aspects and is amazing.",
      ja: "ウォクセンの日本語の授業は、これまで受けた語学講座の中で一番楽しいものでした。マキ先生はとても面白く親しみやすく、時間をかけて日本語を教えてくださいます。それだけでなく幅広い内容を扱っていて、本当に素晴らしいです。",
    },
    name: "Hassini",
    affiliation: { en: "BBA, SOB", ja: "BBA, SOB" },
  },
]
