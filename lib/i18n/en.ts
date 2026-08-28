import type { Dictionary } from "./types";

export const en: Dictionary = {
  locale: "en",
  nav: {
    solutions: "Solutions",
    projects: "Projects",
    energy: "Energy",
    about: "About",
    contact: "Contact",
  },
  common: {
    ctaConsult: "Talk to us",
    ctaViewProjects: "View projects",
    ctaContact: "Contact us",
    allCategories: "All",
    year: "Year",
    location: "Location",
    category: "Category",
    languageNotice: "English translation is not available yet.",
    backToProjects: "All projects",
    scopeOfWork: "Scope of work",
    overview: "Overview",
  },
  home: {
    hero: {
      eyebrow: "APM TECH",
      title: ["Technology infrastructure", "for businesses and facilities."],
      tags: [
        "Security & CCTV",
        "Network Infrastructure",
        "Access Control",
        "ELV",
        "Maintenance",
        "Energy Solutions",
      ],
      ctaPrimary: "Talk to us",
      ctaSecondary: "View projects",
    },
    intro: {
      title: "What APM Tech does",
      body: "APM Tech provides technology infrastructure solutions for businesses and facilities — from survey, design and installation to maintenance of CCTV, network, access control and ELV systems.",
    },
    solutions: {
      title: "Solutions",
      subtitle: "Four core technology infrastructure solutions APM Tech delivers.",
      items: [
        {
          title: "Security & CCTV",
          description:
            "Design and installation of IP camera systems, centralized monitoring, storage and remote viewing.",
        },
        {
          title: "Network Infrastructure",
          description:
            "LAN/Wi-Fi infrastructure for offices, factories and facilities, built for stable connectivity.",
        },
        {
          title: "Access Control",
          description:
            "Access control by card, fingerprint or facial recognition for each area.",
        },
        {
          title: "ELV Maintenance",
          description: "Scheduled maintenance and troubleshooting for ELV systems in operation.",
        },
      ],
      cta: "See solution details",
    },
    featuredProjects: {
      title: "Completed projects",
      subtitle: "A selection of projects APM Tech has delivered.",
      empty: "Projects will be updated soon.",
      cta: "View all projects",
    },
    maintenance: {
      title: "System maintenance",
      subtitle: "Supporting your system after handover.",
      items: [
        {
          title: "System Health Check",
          description: "Regular checks of the overall system's operating condition.",
        },
        {
          title: "Preventive Maintenance",
          description: "Preventive maintenance to reduce the risk of failures.",
        },
        {
          title: "Troubleshooting",
          description: "Resolving issues when the system encounters a problem.",
        },
        {
          title: "Annual Maintenance",
          description: "Yearly maintenance packages for businesses.",
        },
      ],
    },
    energy: {
      title: "APM Energy",
      subtitle: "Expanding into energy solutions.",
      items: [
        {
          title: "Solar PV",
          description: "Solar power systems for businesses and facilities.",
        },
        {
          title: "BESS",
          description: "Battery Energy Storage Systems.",
        },
        {
          title: "Energy Management",
          description: "Solutions for monitoring and managing energy usage.",
        },
      ],
      note: "APM Tech is building its capability in the energy sector.",
      cta: "Learn about APM Energy",
    },
    about: {
      title: "About APM Tech",
      body: "APM Tech is a technical solutions company focused on technology infrastructure for businesses and facilities.",
      cta: "Learn more",
    },
    contactCta: {
      title: "Have a system to deploy or upgrade?",
      subtitle: "Talk to APM Tech.",
      cta: "Contact us",
    },
  },
  solutionsPage: {
    title: "Solutions",
    subtitle:
      "APM Tech delivers four core technology infrastructure solutions for businesses and facilities.",
    items: [
      {
        title: "Security & CCTV",
        description:
          "Design and installation of security camera systems for offices, factories, apartments and facilities.",
        points: [
          "Site survey and solution consulting",
          "IP camera installation, NVR configuration",
          "Centralized monitoring and data storage",
          "Remote viewing via mobile app",
        ],
      },
      {
        title: "Network Infrastructure",
        description: "Stable LAN/Wi-Fi infrastructure for continuous operation.",
        points: [
          "Network infrastructure design by facility scale",
          "Structured cabling and rack installation",
          "Wi-Fi deployment and coverage optimization",
          "Network device configuration and segmentation",
        ],
      },
      {
        title: "Access Control",
        description: "Access control solutions by area and access level.",
        points: [
          "Card, fingerprint and facial recognition access",
          "Access permissions by zone",
          "Integration with existing CCTV systems",
          "Access history logging",
        ],
      },
      {
        title: "ELV Maintenance",
        description: "Scheduled maintenance for stable long-term operation.",
        points: [
          "Regular system condition checks",
          "Preventive maintenance",
          "Issue troubleshooting",
          "Annual maintenance packages",
        ],
      },
    ],
  },
  energyPage: {
    title: "APM Energy",
    subtitle: "Expanding technology infrastructure capability into energy.",
    intro:
      "Alongside technology infrastructure, APM Tech is building capability in the energy sector, including solar PV, battery energy storage and energy management.",
    items: [
      {
        title: "Solar PV",
        description: "Solar power systems for businesses and facilities.",
      },
      {
        title: "BESS",
        description:
          "Battery Energy Storage Systems supporting stable operation.",
      },
      {
        title: "Energy Management",
        description: "Solutions for monitoring and managing energy consumption.",
      },
    ],
    note: "APM Tech is in the process of building capability in the energy sector. Specific project information will be updated as real deployment data becomes available.",
  },
  aboutPage: {
    title: "About APM Tech",
    subtitle: "A technical solutions company for technology infrastructure.",
    body: [
      "APM Tech is a technical solutions company providing technology infrastructure for businesses and facilities — including security cameras, network systems, access control and ELV.",
      "Alongside its Technology Infrastructure business, APM Tech is expanding into Energy with Solar PV, BESS and Energy Management.",
      "APM Tech supports customers from survey, design and installation through to maintenance after systems are handed over.",
    ],
    pillarsTitle: "Two business pillars",
    pillars: [
      {
        title: "Technology Infrastructure",
        description: "Security & CCTV, network, access control, ELV and maintenance.",
      },
      {
        title: "Energy",
        description: "Solar PV, BESS and Energy Management.",
      },
    ],
  },
  contactPage: {
    title: "Contact",
    subtitle: "Talk to APM Tech about a system to deploy or upgrade.",
    form: {
      name: "Full name",
      company: "Company",
      phone: "Phone",
      email: "Email",
      need: "Need",
      needPlaceholder: "Select a related need",
      needOther: "Other",
      message: "Message",
      submit: "Send",
      submitting: "Sending...",
      success: "Thank you. APM Tech has received your information and will get back to you soon.",
      error: "Something went wrong, please try again or contact us directly.",
    },
    infoTitle: "Contact information",
  },
  projectsPage: {
    title: "APM Tech Projects",
    subtitle: "Projects we have delivered.",
    empty: "No projects in this category yet.",
  },
  footer: {
    tagline: "Technology infrastructure for businesses and facilities.",
    solutionsTitle: "Solutions",
    companyTitle: "Company",
    contactTitle: "Contact",
    rights: "All rights reserved by APM Tech.",
  },
};
