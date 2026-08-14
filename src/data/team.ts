import type { L } from "@/i18n/config"

export interface TeamMember {
  id: string
  name: string
  role: L
  subtitle: L
  image: string
  /** Optional crop overrides for portraits that need manual framing. */
  scale?: string
  hoverScale?: string
  position?: string
}

/**
 * Faculty & Leadership.
 *
 * Note: Dr. Peplluis Esteva has been removed at the Centre's request — he is
 * no longer with the university.
 */
export const faculty: TeamMember[] = [
  {
    id: "raul-rodriguez",
    name: "Dr. Raul Rodriguez",
    role: { en: "Chairperson", ja: "会長" },
    subtitle: { en: "Woxsen University", ja: "ウォクセン大学" },
    image: "/images/team/faculty-leadership/dr-raul-v-rodriguez.webp",
  },
  {
    id: "brundaban-mishra",
    name: "Dr. Brundaban Mishra",
    role: { en: "Director", ja: "所長" },
    subtitle: { en: "Woxsen University", ja: "ウォクセン大学" },
    image: "/images/team/faculty-leadership/dr-brundaban-mishra.jpg",
  },
  {
    id: "priyanka-banik",
    name: "Ms. Priyanka Banik",
    role: { en: "Vice-Chairperson", ja: "副会長" },
    subtitle: { en: "Woxsen University", ja: "ウォクセン大学" },
    image: "/images/team/faculty-leadership/ms-priyanka-baynik.jpeg",
  },
  {
    id: "daisuke-tanji",
    name: "Mr. Tanji Daisuke",
    role: { en: "Deputy Director", ja: "副所長" },
    subtitle: { en: "Indobox Inc.", ja: "インドボックス株式会社" },
    image: "/images/team/faculty-leadership/mr-daisuke-tanji.jpg",
  },
  {
    id: "nistha-jain",
    name: "Ms. Nistha Jain",
    role: { en: "Manager", ja: "マネージャー" },
    subtitle: { en: "Woxsen University", ja: "ウォクセン大学" },
    image: "/images/team/faculty-leadership/ms-nishta-jain.jpeg",
  },
  {
    id: "hemachandran-kannan",
    name: "Dr. Hemachandran Kannan",
    role: { en: "Advisor", ja: "顧問" },
    subtitle: { en: "Woxsen University", ja: "ウォクセン大学" },
    image: "/images/team/faculty-leadership/dr-hemachandran.png",
  },
]

/**
 * Student leadership.
 *
 * Note: the department heads for Media & Promotion, Outreach & Partnerships,
 * and Creative Studio are intentionally omitted — the Centre will supply
 * replacements for those three roles.
 */
export const studentLeadership: TeamMember[] = [
  {
    id: "praveena-kiran",
    name: "Praveena Kiran",
    role: { en: "President", ja: "代表" },
    subtitle: { en: "B.Tech '28", ja: "B.Tech '28" },
    image: "/images/team/student-community/praveena-kiran.jpg",
  },
  {
    id: "harshith-chakravarthy",
    name: "Harshith Chakravarthy",
    role: { en: "Vice President", ja: "副代表" },
    subtitle: { en: "BBA '28", ja: "BBA '28" },
    image:
      "/images/team/student-community/mashetty-harshith-chakravarthy.jpg",
  },
  {
    id: "mythilee-naigapula",
    name: "Mythilee Naigapula",
    role: {
      en: "Dept. Head — Digital Services & Records",
      ja: "部門長 — デジタルサービス・記録",
    },
    subtitle: { en: "BBA '28", ja: "BBA '28" },
    image: "/images/team/student-community/naigapula-mythilee.jpg",
  },
  {
    id: "sathyapal-reddy",
    name: "Sathyapal Reddy",
    role: {
      en: "Dept. Head — Operations & Logistics",
      ja: "部門長 — 運営・ロジスティクス",
    },
    subtitle: { en: "BBA '28", ja: "BBA '28" },
    image: "/images/team/student-community/sathyapal-reddy.webp",
    scale: "scale-[1.2]",
    hoverScale: "group-hover:scale-[1.3]",
    position: "object-[20%_30%]",
  },
  {
    id: "sreshta-tathiparthi",
    name: "Sreshta Tathiparthi",
    role: {
      en: "Dept. Head — Learning & Welfare",
      ja: "部門長 — 学習・福利",
    },
    subtitle: { en: "BBA '28", ja: "BBA '28" },
    image: "/images/team/student-community/sreshta-tathiparthi.webp",
    scale: "scale-[1.2]",
    hoverScale: "group-hover:scale-[1.3]",
    position: "object-[20%_120%]",
  },
]

/** Leadership subset shown as a preview on the About page. */
export const leadershipPreview = faculty.filter((m) =>
  ["raul-rodriguez", "brundaban-mishra", "daisuke-tanji"].includes(m.id),
)
