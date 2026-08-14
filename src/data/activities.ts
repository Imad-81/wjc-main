import type { L } from "@/i18n/config"

export interface Activity {
  number: string
  kanji: string
  title: L
  description: L
}

/** About page — "Core Activities". Content and kanji supplied by the Centre. */
export const activities: Activity[] = [
  {
    number: "01",
    kanji: "語",
    title: { en: "Language Learning", ja: "語学教育" },
    description: {
      en: "Japanese language instruction and structured JLPT preparation for N5 and N4, along with the upcoming batches in the other levels, taught by qualified instructors with a curriculum shaped by cultural immersion.",
      ja: "日本語指導と N5・N4 の体系的な JLPT 対策、そして今後開講予定の他レベルの講座を、文化体験を取り入れたカリキュラムのもと有資格の講師が指導します。",
    },
  },
  {
    number: "02",
    kanji: "文",
    title: { en: "Cultural Workshops", ja: "文化ワークショップ" },
    description: {
      en: "Hands-on traditional arts workshops including Origami, calligraphy, tea ceremony, and ikebana that bring Japanese culture to life.",
      ja: "折り紙、書道、茶道、生け花など、日本文化を体感できる伝統芸術の実践ワークショップを開催しています。",
    },
  },
  {
    number: "03",
    kanji: "学",
    title: { en: "Academic Partnerships", ja: "学術提携" },
    description: {
      en: "Imminent formal collaborations with Japanese universities, kicked off by current dignitary visits, will soon enable student exchanges, joint research, and faculty visits.",
      ja: "要人の来訪を機に、日本の大学との正式な提携が間近に迫っています。今後、学生交換、共同研究、教員の相互訪問が可能になります。",
    },
  },
  {
    number: "04",
    kanji: "祭",
    title: { en: "Festival Celebrations", ja: "季節の祭り" },
    description: {
      en: "Seasonal celebrations of iconic Japanese festivals like Tanabata and Hanami, featuring traditional culinary experiences and film screenings.",
      ja: "七夕や花見といった日本を代表する祭りを季節ごとに祝い、伝統的な食体験や映画上映を行っています。",
    },
  },
  {
    number: "05",
    kanji: "研",
    title: { en: "Knowledge Exchange", ja: "知の交流" },
    description: {
      en: "Engaging guest lectures, panel discussions, policy dialogue, and pop-culture forums supporting Indo-Japanese research initiatives.",
      ja: "ゲスト講演、パネルディスカッション、政策対話、ポップカルチャー・フォーラムを通じて、日印の研究活動を支援しています。",
    },
  },
  {
    number: "06",
    kanji: "外",
    title: { en: "Global Partnerships", ja: "国際連携" },
    description: {
      en: "Formal student exchanges, joint research projects, and institutional collaborations, initiated by ongoing dignitary and faculty visits.",
      ja: "継続的な要人・教員の来訪を通じて、正式な学生交換、共同研究プロジェクト、機関間の協働を進めています。",
    },
  },
]

/** JLPT page — "Your Gateway to Japan". Four supplied pillars. */
export const jlptPillars: Activity[] = [
  {
    number: "01",
    kanji: "学",
    title: { en: "Academics & Opportunities", ja: "学術と機会" },
    description: {
      en: "Develop Japanese language proficiency through structured JLPT courses while opening pathways to immersion programs, academic collaborations, and international learning experiences.",
      ja: "体系的な JLPT 講座で日本語力を高めながら、集中プログラム、学術連携、国際的な学びの機会への道を開きます。",
    },
  },
  {
    number: "02",
    kanji: "文",
    title: { en: "Cultural Depth", ja: "文化の深み" },
    description: {
      en: "Experience Japan through festivals, workshops, film screenings, language cafés, traditional arts, and cultural celebrations that bring learning beyond textbooks.",
      ja: "祭り、ワークショップ、映画上映、語学カフェ、伝統芸術、文化行事を通じて、教科書を超えた学びとして日本を体験します。",
    },
  },
  {
    number: "03",
    kanji: "絆",
    title: { en: "Global Connections", ja: "世界とのつながり" },
    description: {
      en: "Connect with Japanese universities, industry leaders, academic partners, and fellow learners through collaborations, guest lectures, immersion programs, and international initiatives.",
      ja: "協働、ゲスト講演、集中プログラム、国際的な取り組みを通じて、日本の大学、産業界のリーダー、学術パートナー、そして学ぶ仲間とつながります。",
    },
  },
  {
    number: "04",
    kanji: "和",
    title: { en: "Beyond the Language", ja: "言葉の先へ" },
    description: {
      en: "Learning Japanese offers more than communication skills, it provides insight into one of the world's most innovative societies while fostering cross-cultural understanding, academic collaboration, and global perspectives.",
      ja: "日本語を学ぶことは、単なるコミュニケーション能力の習得にとどまりません。世界有数の革新的な社会への洞察をもたらし、異文化理解、学術協働、そして国際的な視野を育みます。",
    },
  },
]
