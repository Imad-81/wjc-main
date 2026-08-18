import type { L } from "@/i18n/config"

export interface WhyPillar {
  kanji: string
  title: L
  description: L
}

/** "Your Gateway to Japan" — four pillars of the Why Japanese? section. */
export const whyJapanese: WhyPillar[] = [
  {
    kanji: "学",
    title: {
      en: "Academics & Opportunities",
      ja: "学術と機会",
    },
    description: {
      en: "Develop Japanese language proficiency through structured JLPT courses while opening pathways to immersion programs, academic collaborations, and international learning experiences.",
      ja: "体系的なJLPT講座を通じて日本語力を高め、語学研修プログラム、学術連携、そして国際的な学びの場への道を切り開きます。",
    },
  },
  {
    kanji: "文",
    title: {
      en: "Cultural Depth",
      ja: "文化の深み",
    },
    description: {
      en: "Experience Japan through festivals, workshops, film screenings, language cafés, traditional arts, and cultural celebrations that bring learning beyond textbooks.",
      ja: "祭り、ワークショップ、映画上映、言語カフェ、伝統芸術、文化イベントを通じて、教科書を超えた日本を体験します。",
    },
  },
  {
    kanji: "絆",
    title: {
      en: "Global Connections",
      ja: "グローバルなつながり",
    },
    description: {
      en: "Connect with Japanese universities, industry leaders, academic partners, and fellow learners through collaborations, guest lectures, immersion programs, and international initiatives.",
      ja: "共同研究、特別講義、語学研修、国際的な取り組みを通じて、日本の大学、企業、学術パートナー、仲間の学習者とつながります。",
    },
  },
  {
    kanji: "和",
    title: {
      en: "Beyond the Language",
      ja: "言語を超えて",
    },
    description: {
      en: "Learning Japanese offers more than communication skills — it provides insight into one of the world's most innovative societies while fostering cross-cultural understanding, academic collaboration, and global perspectives.",
      ja: "日本語を学ぶことはコミュニケーション能力以上のものをもたらします。世界最先端の社会への洞察を深め、異文化理解、学術連携、グローバルな視野を育みます。",
    },
  },
]
