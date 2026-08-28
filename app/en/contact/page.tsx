import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to APM Tech about a system to deploy or upgrade.",
  alternates: { canonical: "/en/contact", languages: { vi: "/contact" } },
};

export default function EnContactPage() {
  const dict = getDictionary("en");
  const { contactPage } = dict;

  return (
    <Section tone="light">
      <SectionHeading title={contactPage.title} subtitle={contactPage.subtitle} />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <ContactForm dict={dict} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
            {contactPage.infoTitle}
          </p>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-brand-muted">Email</dt>
              <dd className="mt-0.5 font-medium text-brand-dark">contact@anphumy.vn</dd>
            </div>
            <div>
              <dt className="text-brand-muted">{contactPage.form.phone}</dt>
              <dd className="mt-0.5 font-medium text-brand-dark">+84 000 000 000</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
