export interface Dictionary {
  locale: "vi" | "en";
  nav: {
    solutions: string;
    projects: string;
    energy: string;
    about: string;
    contact: string;
  };
  common: {
    ctaConsult: string;
    ctaViewProjects: string;
    ctaContact: string;
    allCategories: string;
    year: string;
    location: string;
    category: string;
    languageNotice: string;
    backToProjects: string;
    scopeOfWork: string;
    overview: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string[];
      tags: string[];
      ctaPrimary: string;
      ctaSecondary: string;
    };
    intro: { title: string; body: string };
    solutions: {
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
      cta: string;
    };
    featuredProjects: { title: string; subtitle: string; empty: string; cta: string };
    maintenance: {
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
    };
    energy: {
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
      note: string;
      cta: string;
    };
    about: { title: string; body: string; cta: string };
    contactCta: { title: string; subtitle: string; cta: string };
  };
  solutionsPage: {
    title: string;
    subtitle: string;
    items: { title: string; description: string; points: string[] }[];
  };
  energyPage: {
    eyebrow: string;
    title: string;
    intro: string[];
    items: { title: string; heading: string; description: string; points: string[] }[];
    outlook: { title: string; paragraphs: string[] };
  };
  aboutPage: {
    title: string;
    subtitle: string;
    body: string[];
    pillarsTitle: string;
    pillars: { title: string; description: string; points: string[] }[];
    pillarsNote: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    intro: string;
    formTitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      need: string;
      needPlaceholder: string;
      needOptions: string[];
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
    infoTitle: string;
    companyLegalName: string;
    brandLine: string;
    websiteLabel: string;
  };
  projectsPage: {
    title: string;
    subtitle: string;
    empty: string;
  };
  footer: {
    tagline: string;
    solutionsTitle: string;
    companyTitle: string;
    contactTitle: string;
    rights: string;
  };
}
