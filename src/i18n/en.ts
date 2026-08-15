/**
 * English copy for the whole site.
 *
 * This is the source of truth: `ja.ts` is typed as `Dictionary`, so removing
 * or renaming a key here makes the Japanese file fail typecheck until it is
 * brought back in sync.
 */
export const en = {
  nav: {
    primary: "Primary",
    brandSub: "JAPAN CENTRE",
    home: "Home",
    about: "About Us",
    events: "Events",
    gallery: "Gallery",
    team: "Team",
    jlpt: "JLPT",
    joinUs: "Join Us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  common: {
    viewDetails: "View Details",
    visitWebsite: "Visit Website",
    allEvents: "All Events",
    readMore: "Read More",
    scroll: "Scroll",
    backToTop: "Back to top",
    email: "japan.centre@woxsen.edu.in",
    location: "Woxsen University, Hyderabad, Telangana 502345",
  },

  footer: {
    brandJp: "ウォクセン日本センター",
    tagline: "Essence of Japan, Within Reach.",
    address: "Woxsen University, Hyderabad.",
    explore: "Explore",
    programs: "Programs",
    community: "Community",
    connect: "Connect",
    culturalExchange: "Cultural Exchange",
    academic: "Academic",
    newsletter: "Newsletter",
    contact: "Contact",
    partnerships: "Partnerships",
    delegations: "Delegations",
    jlptEnroll: "JLPT Enrol",
    rights: "© 2026 Woxsen Japan Centre. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },

  home: {
    metaTitle: "Woxsen Japan Centre",
    metaDescription:
      "A university-led initiative promoting intercultural understanding and strengthening the India–Japan relationship through academic collaboration, cultural exchange, and professional engagement.",
    heroTitle: "Essence of Japan,",
    heroTitleEmphasis: "Within Reach",
    heroSubtitle:
      "Bridging cultures, inspiring minds, and creating opportunities through education, collaboration, and cultural exchange.",
    heroEyebrow: "Woxsen University · Japan Centre",
    heroCtaPrimary: "Explore JLPT",
    heroCtaSecondary: "Our Story",

    /** Per-season hero taglines, keyed by season id. */
    heroTaglines: {
      original:
        "Bridging cultures, inspiring minds, and creating opportunities through education, collaboration, and cultural exchange.",
      natsu:
        "Celebrating Japanese summer traditions through festivals, learning, and vibrant cultural experiences.",
      tanabata:
        "Wishes, dreams, and connections written to the stars — where the celestial meets the earthly.",
      setsubun:
        "Rituals of renewal — driving away the past and welcoming good fortune with every passing season.",
      hikari:
        "Where lights guide the heart and illuminate the path toward knowledge, culture, and belonging.",
    },

    stats: {
      partnerInstitutions: "Partner Institutions",
      studentsEngaged: "Students Engaged",
      annualPrograms: "Annual Programs",
      established: "Established",
    },

    about: {
      label: "About the Centre",
      title: "A Bridge Between",
      titleEmphasis: "Two Worlds",
      body: "The Woxsen Japan Centre supports Japanese language education, cultural initiatives, academic collaboration, and international partnerships — creating opportunities for students and faculty to engage with Japan's traditions, values, and contemporary practices.",
      body2:
        "Through interdisciplinary participation and experiential learning, we foster global awareness, cross-cultural understanding, and meaningful international exposure within the university community.",
      /** Inline stat row beneath the About copy, as in the prototype. */
      inlineStats: [
        { value: "2025", label: "Inaugurated" },
        { value: "3", label: "Core Partners" },
        { value: "500+", label: "Students" },
        { value: "JLPT", label: "Certified" },
      ],
      cta: "About the Centre",
      quote: "Together we are, Together we will",
      quoteAuthor: "Dr. Brundaban Mishra",
      quoteRole: "Director, WJC",
    },

    partners: {
      label: "Our Partners",
      title: "Built on Strategic Alliances",
      subtitle:
        "Three institutions united by a shared commitment to deepening India–Japan relations.",
    },

    events: {
      label: "Events & Activities",
      title: "Where Culture",
      titleEmphasis: "Comes Alive",
    },

    impact: {
      label: "Our Impact",
    },

    membership: {
      label: "Membership",
      title: "Become Part of Something Meaningful",
      subtitle:
        "Join students, faculty, and professionals who are building bridges between India and Japan.",
      mostPopular: "Most Popular",
      cta: "Join the Centre",
    },

    testimonials: {
      label: "Testimonials",
      title: "Voices from",
      titleEmphasis: "Our Community",
    },

    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      subtitle:
        "Everything you need to know about the Woxsen Japan Centre and how to get involved.",
    },

    newsletter: {
      label: "Stay Connected",
      title: "The Japan Centre",
      titleEmphasis: "Dispatch",
      body: "Monthly updates on events, cultural programs, JLPT enrolment windows, and opportunities for Indo-Japanese collaboration.",
      cta: "Subscribe",
    },

    finalCta: {
      label: "Begin Your Journey",
      title: "Japan is closer than",
      titleEmphasis: "you think.",
      body: "Join hundreds of students, faculty, and professionals building meaningful connections with Japan — through language, culture, and collaboration.",
      primary: "Join the Community",
      secondary: "Enrol in JLPT",
    },
  },

  about: {
    metaTitle: "About Us",
    metaDescription:
      "The Woxsen Japan Centre promotes Japanese language education, cultural exchange, and industry partnerships at Woxsen University.",
    heroLabel: "About the Centre",
    heroTitle: "Fostering Cross-Cultural",
    heroTitleEmphasis: "Connections and Understanding",
    heroSubtitle:
      "Established in 2025, the Woxsen Japan Centre is Woxsen University's dedicated platform for advancing Indo-Japanese relations through education, culture, and collaboration.",

    story: {
      label: "Our Story",
      title: "Where Stories",
      titleEmphasis: "Unite Us",
      paragraph1:
        "The Centre is a dedicated hub at Woxsen University that promotes Japanese language education, cultural exchange, and industry partnerships. India and Japan share a strong relationship built on mutual respect and technological collaboration. Our Centre strengthens this connection by opening new doors for students and faculty to engage with Japan.",
      paragraph2:
        "We offer structured language classes, cultural events, delegation visits, and formal university partnerships. These programs give our campus community real, hands-on experience with Japan's rich traditions and modern practices. Through these opportunities, we help students and faculty build global awareness and gain valuable international exposure.",
    },

    mission: {
      label: "Our Mission",
      title: "Bridging Cultures Through Education",
      body: "To strengthen India–Japan relations at Woxsen University by promoting intercultural understanding through Japanese language education, cultural engagement, academic collaboration, and experiential learning opportunities for students and faculty.",
    },

    vision: {
      label: "Our Vision",
      title: "A Future of Shared Understanding",
      body: "To establish the Woxsen Japan Centre as a leading platform for Indo-Japanese academic and cultural collaboration, fostering global awareness, cultural literacy, and sustained engagement with Japan.",
    },

    activities: {
      label: "What We Do",
      title: "Core Activities",
    },

    director: {
      label: "Director's Message",
      quote: "Together we are, together we will",
      name: "Dr. Brundaban Mishra",
      role: "Director, Woxsen Japan Centre",
    },

    people: {
      label: "The People",
      title: "Leadership & Faculty",
      cta: "Meet the Full Team",
    },

    timeline: {
      label: "Our Journey",
      title: "Timeline of WJC",
      comingSoon:
        "A horizontal journey through the Centre's milestones is being prepared and will appear here shortly.",
    },
  },

  events: {
    metaTitle: "Events",
    metaDescription:
      "Cultural festivals, delegation visits, outreach initiatives, and upcoming programmes at the Woxsen Japan Centre.",
    heroLabel: "Events & Experiences",
    heroTitle: "Every Gathering",
    heroTitleEmphasis: "Tells a Story",
    heroSubtitle:
      "From inaugural ceremonies to seasonal festivals, each event at the Woxsen Japan Centre is a chapter in an ongoing story of cultural exchange and academic partnership.",

    pastLabel: "Past Events",
    pastTitle: "Moments That Defined Us",
    featured: "Featured Event",
    noEvents: "No events in this category yet.",

    tabs: {
      culture: "Culture & Festivals",
      cultureBlurb:
        "Celebrate Japanese heritage through traditional arts, tea ceremonies, and seasonal festivals.",
      delegations: "Delegations & Visits",
      delegationsBlurb:
        "Hosting global academic leaders, institutional partners, and dignitary delegations.",
      outreach: "Outreach Initiatives",
      outreachBlurb:
        "Connecting with the local community through public forums and educational projects.",
      next: "What's Next",
      nextBlurb:
        "Explore our upcoming calendar, schedule of activities, and latest event announcements.",
    },

    cta: {
      label: "Don't Miss Out",
      title: "Be Part of the",
      titleEmphasis: "Next Chapter",
      body: "Join the Woxsen Japan Centre community to receive early access to event registrations, exclusive invitations, and behind-the-scenes cultural experiences.",
      primary: "Join the Community",
      secondary: "View Gallery",
    },

    detail: {
      backToEvents: "Back to Events",
      about: "About This Event",
      gallery: "Event Gallery",
      location: "Location",
      time: "Time",
      date: "Date",
    },
  },

  gallery: {
    metaTitle: "Gallery",
    metaDescription:
      "A visual record of events, workshops, delegations, and cultural experiences at the Woxsen Japan Centre.",
    heroLabel: "Visual Archive",
    heroTitle: "Gallery of",
    heroTitleEmphasis: "Moments",
    heroSubtitle:
      "A visual record of the events, workshops, delegations, and cultural experiences that define the Woxsen Japan Centre.",
    imageCount: "images",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
  },

  team: {
    metaTitle: "Team",
    metaDescription:
      "The faculty, leadership, and student community behind the Woxsen Japan Centre.",
    heroLabel: "The People",
    heroTitle: "The Minds Behind",
    heroTitleEmphasis: "the Centre",
    heroSubtitle:
      "A dedicated team of faculty, cultural coordinators, and student leaders who bring the Woxsen Japan Centre to life every day.",

    faculty: {
      label: "Faculty",
      title: "Faculty & Leadership",
    },

    students: {
      label: "Our Student Community",
      title: "Student",
      titleEmphasis: "Leadership",
      body: "Dynamic Student leaders actively drive engagement, foster inclusivity, and fulfill our Centre's mission & vision.",
    },

    cta: {
      label: "Join the Team",
      title: "Become Part of",
      titleEmphasis: "Something Meaningful",
      body: "At the Woxsen Japan Centre, students and faculty come together to explore Japanese language, culture, and Indo-Japanese connections. Join a vibrant campus community that encourages learning, exchange, and international perspective.",
      primary: "Claim Your Place",
      secondary: "Learn About WJC",
    },
  },

  jlpt: {
    metaTitle: "JLPT Programmes",
    metaDescription:
      "Structured JLPT preparation at N5 and N4 levels, taught by certified instructors with a curriculum shaped by cultural immersion.",
    heroLabel: "Japanese Language Programs",
    heroTitle: "Learn Japanese",
    heroTitleEmphasis: "With Excellence",
    heroSubtitle:
      "Structured JLPT preparation currently offering N5 and N4 levels, taught by certified instructors with a curriculum shaped by cultural immersion and communicative competence. Advanced levels are coming soon.",
    heroCtaPrimary: "View Courses",
    heroCtaSecondary: "Enrol Now",

    why: {
      label: "Why Japanese?",
      title: "Your Gateway to Japan",
      subtitle:
        "Where learning extends beyond language into culture, industry, research, and international experiences.",
    },

    levels: {
      label: "Course Levels",
      title: "Choose Your Path",
      whatYouLearn: "What You'll Learn",
      details: "Details",
      cta: "Begin Your Journey",
      statusOpen: "Open",
      statusSoon: "Enrolling Soon",
    },

    pathway: {
      label: "Learning Pathway",
      title: "Your Journey",
      titleEmphasis: "Step by Step",
    },

    faq: {
      label: "FAQs",
      title: "Common",
      titleEmphasis: "Questions",
    },
  },

  joinUs: {
    metaTitle: "Join Us",
    metaDescription:
      "Become part of the Woxsen Japan Centre community — language access, cultural immersion, academic pathways, and industry connections.",
    heroLabel: "和 · Wa Community",
    heroTitle: "Become Part of",
    heroTitleEmphasis: "Something Lasting",
    heroSubtitle:
      "The Wa Community is not a club. It is a progression — from curious observer to cultural ambassador. Every step is earned. Every recognition is meaningful.",
    heroCtaPrimary: "Claim Your Place",
    heroCtaSecondary: "Explore the Wa Journey",

    benefits: {
      label: "What You Gain",
      title: "A Community That",
      titleEmphasis: "Opens the World",
      subtitle:
        "Membership in the Wa Community is not just access to events. It is a structured pathway to language proficiency, cultural intelligence, academic opportunity, and professional advantage.",
    },

    memberStories: {
      label: "Member Stories",
      title: "Voices from the",
      titleEmphasis: "Wa Community",
    },

    tiers: {
      label: "The Wa Progression",
      title: "Four Levels.",
      titleEmphasis: "One Journey.",
      subtitle:
        "The Wa Community is built on earned recognition. Each level reflects genuine contribution, cultural engagement, and personal growth.",
      requirement: "Requirement",
      level: "Level",
    },

    steps: {
      label: "How to Join",
      title: "Four Steps to",
      titleEmphasis: "Your First Day",
    },

    apply: {
      label: "Apply",
      title: "Claim Your Place",
      body: "Registration is handled through our official forms. Choose the one that matches you and we will be in touch.",
      communityTitle: "Join the Community",
      communityBody:
        "Become a member of the Woxsen Japan Centre community and take part in cultural events, workshops, and festivals throughout the year.",
      communityBenefits: [
        "Free for all Woxsen students",
        "Access to cultural events",
        "Community networking",
      ],
      communityCta: "Register Now",
      courseTitle: "Enrol in the JLPT Course",
      courseBody:
        "Structured JLPT preparation at N5 and N4 with qualified instructors, mock examinations, and a curriculum shaped by cultural immersion.",
      courseBenefits: [
        "Qualified instructors",
        "N5 and N4 levels",
        "Mock exams included",
      ],
      courseCta: "Enrol Now",
      benefitsHeading: "Includes",
    },

    interest: {
      title: "Express Your Interest",
      subtitle: "Takes 2 minutes. No commitment required.",
      nameLabel: "Full Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email Address",
      selectLabel: "I am interested in",
      selectPlaceholder: "Select your interest",
      optionN5: "JLPT N5 — Foundation",
      optionN4: "JLPT N4 — Intermediate",
      optionCultural: "Cultural Membership Only",
      optionBoth: "JLPT + Cultural Membership",
      messageLabel: "What draws you to Japanese culture?",
      messagePlaceholder: "Tell us briefly...",
      optional: "Optional",
      cta: "Begin Your Journey",
      note: "Opens the Centre's official registration form.",
      thanksTitle: "Thank you for reaching out",
      thanksBody:
        "Your email app will open with your details ready to send. Our team will reply within 48 hours with orientation details.",
      completeRegistration: "Complete Registration",
    },

    faq: {
      label: "Questions",
      title: "Before You",
      titleEmphasis: "Take the Step",
    },
  },

  legal: {
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    lastUpdated: "Last updated",
  },
} as const
