import type { L } from "@/i18n/config"

export interface LegalSection {
  heading: L
  /** Paragraphs and optional bullet lists, rendered in order. */
  body?: L<string[]>
  list?: L<string[]>
}

export const LEGAL_LAST_UPDATED: L = {
  en: "August 2026",
  ja: "2026年8月",
}

export const privacySections: LegalSection[] = [
  {
    heading: { en: "Introduction", ja: "はじめに" },
    body: {
      en: [
        'Woxsen Japan Centre ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our programs and events.',
      ],
      ja: [
        "ウォクセン日本センター（以下「当センター」）は、皆様のプライバシーの保護に努めています。本プライバシーポリシーは、当センターのウェブサイトのご利用時、またはプログラムや行事へのご参加時に、皆様の情報をどのように収集、利用、開示、保護するかについて説明するものです。",
      ],
    },
  },
  {
    heading: { en: "Information We Collect", ja: "収集する情報" },
    body: {
      en: [
        "We may collect personal information that you voluntarily provide to us when you:",
      ],
      ja: [
        "以下の場面で、皆様が任意にご提供くださる個人情報を収集する場合があります。",
      ],
    },
    list: {
      en: [
        "Register for membership or events",
        "Enrol in language courses (JLPT programmes)",
        "Subscribe to our newsletter",
        "Contact us with inquiries",
        "Submit forms on our website",
      ],
      ja: [
        "メンバーシップまたは行事への登録",
        "語学講座（JLPT プログラム）へのお申し込み",
        "ニュースレターのご購読",
        "お問い合わせ",
        "ウェブサイト上のフォームの送信",
      ],
    },
  },
  {
    heading: { en: "How We Use Your Information", ja: "情報の利用目的" },
    body: {
      en: ["We use the information we collect to:"],
      ja: ["収集した情報は、以下の目的で利用します。"],
    },
    list: {
      en: [
        "Process your membership and course registrations",
        "Send you updates about events and programmes",
        "Respond to your inquiries and provide support",
        "Improve our website and services",
        "Comply with legal obligations",
      ],
      ja: [
        "メンバーシップおよび講座のお申し込み手続き",
        "行事やプログラムに関する最新情報のご案内",
        "お問い合わせへの回答およびサポートの提供",
        "ウェブサイトおよびサービスの改善",
        "法令上の義務の遵守",
      ],
    },
  },
  {
    heading: { en: "Information Sharing", ja: "情報の共有" },
    body: {
      en: [
        "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law. We may share information with Woxsen University for administrative purposes related to our programmes.",
      ],
      ja: [
        "当センターは、サービスの提供に必要な場合または法令により求められる場合を除き、皆様の同意なく個人情報を第三者に販売、取引、その他の方法で提供することはありません。プログラムに関連する事務手続きのため、ウォクセン大学と情報を共有する場合があります。",
      ],
    },
  },
  {
    heading: { en: "Data Security", ja: "データの安全管理" },
    body: {
      en: [
        "We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
      ],
      ja: [
        "当センターは、個人情報を保護するため適切な安全管理措置を講じています。ただし、インターネット上の通信手段で完全に安全なものは存在せず、絶対的な安全性を保証することはできません。",
      ],
    },
  },
  {
    heading: { en: "Your Rights", ja: "皆様の権利" },
    body: {
      en: ["You have the right to:"],
      ja: ["皆様には以下の権利があります。"],
    },
    list: {
      en: [
        "Access your personal information",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Opt out of marketing communications",
      ],
      ja: [
        "個人情報へのアクセス",
        "誤った情報の訂正の請求",
        "情報の削除の請求",
        "案内配信の停止",
      ],
    },
  },
]

export const termsSections: LegalSection[] = [
  {
    heading: { en: "Agreement to Terms", ja: "本規約への同意" },
    body: {
      en: [
        "By accessing and using the Woxsen Japan Centre website, enrolling in our programmes, or participating in our events, you agree to be bound by these Terms of Service.",
      ],
      ja: [
        "ウォクセン日本センターのウェブサイトのご利用、プログラムへのお申し込み、または行事へのご参加をもって、本利用規約に同意されたものとみなします。",
      ],
    },
  },
  {
    heading: { en: "Services", ja: "提供するサービス" },
    body: {
      en: ["The Woxsen Japan Centre provides:"],
      ja: ["ウォクセン日本センターは以下を提供します。"],
    },
    list: {
      en: [
        "Japanese language courses and JLPT preparation programmes",
        "Cultural exchange events and workshops",
        "Membership benefits and community access",
        "Educational resources and materials",
        "Information about study abroad opportunities",
      ],
      ja: [
        "日本語講座および JLPT 対策プログラム",
        "文化交流の行事およびワークショップ",
        "メンバーシップの特典およびコミュニティへの参加",
        "教育資料および教材",
        "留学機会に関する情報",
      ],
    },
  },
  {
    heading: { en: "User Responsibilities", ja: "利用者の責任" },
    body: {
      en: ["When using our services, you agree to:"],
      ja: ["サービスのご利用にあたり、以下にご同意いただきます。"],
    },
    list: {
      en: [
        "Provide accurate and complete information during registration",
        "Maintain the confidentiality of your account credentials",
        "Use our services in compliance with applicable laws",
        "Respect other members and participants in our programmes",
        "Not misuse or interfere with our services",
      ],
      ja: [
        "登録時に正確かつ完全な情報を提供すること",
        "アカウント情報の機密を保持すること",
        "適用される法令に従ってサービスを利用すること",
        "他のメンバーおよびプログラム参加者を尊重すること",
        "サービスを不正に利用し、または妨害しないこと",
      ],
    },
  },
  {
    heading: { en: "Intellectual Property", ja: "知的財産権" },
    body: {
      en: [
        "All content on this website — including text, graphics, logos, and images — is the property of Woxsen University or its content suppliers and is protected by applicable intellectual property law. Course materials are provided for personal educational use only.",
      ],
      ja: [
        "本ウェブサイト上のすべてのコンテンツ（文章、図版、ロゴ、画像を含む）は、ウォクセン大学またはそのコンテンツ提供者に帰属し、適用される知的財産法により保護されています。講座教材は、個人の学習目的にのみご利用いただけます。",
      ],
    },
  },
  {
    heading: { en: "Programme Enrolment", ja: "プログラムへの登録" },
    list: {
      en: [
        "Enrolment is subject to availability and eligibility criteria",
        "Fees must be paid as per the specified schedule",
        "Cancellation policies apply as communicated during enrolment",
        "Certificates are issued upon successful completion of requirements",
      ],
      ja: [
        "登録は、定員および参加資格の条件に基づきます",
        "受講料は所定の期日までにお支払いいただきます",
        "キャンセル規定は登録時にご案内する内容が適用されます",
        "修了証は所定の要件を満たした場合に発行されます",
      ],
    },
  },
  {
    heading: { en: "Limitation of Liability", ja: "責任の制限" },
    body: {
      en: [
        "The Woxsen Japan Centre provides its services on an as-is basis. To the extent permitted by law, we are not liable for indirect or consequential losses arising from the use of our website, programmes, or events.",
      ],
      ja: [
        "ウォクセン日本センターは、サービスを現状有姿で提供します。法令が認める範囲において、当センターのウェブサイト、プログラム、または行事のご利用に起因する間接的または結果的な損害について責任を負いません。",
      ],
    },
  },
  {
    heading: { en: "Modifications", ja: "規約の変更" },
    body: {
      en: [
        "We may update these Terms from time to time. Continued use of our website or services after changes are published constitutes acceptance of the revised Terms.",
      ],
      ja: [
        "当センターは、本規約を随時変更する場合があります。変更の公開後もウェブサイトまたはサービスをご利用いただいた場合、変更後の規約に同意されたものとみなします。",
      ],
    },
  },
  {
    heading: { en: "Governing Law", ja: "準拠法" },
    body: {
      en: [
        "These Terms are governed by the laws of India. Any disputes arising from these Terms are subject to the jurisdiction of the courts of Telangana, India.",
      ],
      ja: [
        "本規約はインド法に準拠します。本規約に起因する紛争については、インド・テランガーナ州の裁判所を管轄裁判所とします。",
      ],
    },
  },
]
