import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to APM Tech – An Phu My Development Joint Stock Company about a system to deploy, upgrade, or maintain.",
  alternates: { canonical: "/en/contact", languages: { vi: "/contact" } },
};

export default function EnContactPage() {
  const dict = getDictionary("en");
  const { contactPage } = dict;

  return (
    <Section tone="light">
      <SectionHeading title={contactPage.title} subtitle={contactPage.subtitle} />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted">
        {contactPage.intro}
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-5 text-base font-semibold text-brand-dark">{contactPage.formTitle}</h2>
          <ContactForm dict={dict} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
            {contactPage.infoTitle}
          </p>
          <div className="mt-4">
            <p className="text-sm font-semibold text-brand-dark">{contactPage.companyLegalName}</p>
            <p className="mt-1 text-sm text-brand-muted">{contactPage.brandLine}</p>
          </div>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-brand-muted">Email</dt>
              <dd className="mt-0.5 font-medium text-brand-dark">
                <a href="mailto:contact@anphumy.vn" className="hover:text-brand-accent">
                  contact@anphumy.vn
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-brand-muted">{contactPage.form.phone}</dt>
              <dd className="mt-0.5 font-medium text-brand-dark">
                <a href="tel:+84901652555" className="hover:text-brand-accent">
                  +84 901 652 555
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-brand-muted">{contactPage.websiteLabel}</dt>
              <dd className="mt-0.5 font-medium text-brand-dark">
                <a
                  href="https://anphumy.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent"
                >
                  anphumy.vn
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
