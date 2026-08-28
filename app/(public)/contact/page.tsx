import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Trao đổi với APM Tech về hệ thống cần triển khai hoặc nâng cấp.",
  alternates: { canonical: "/contact", languages: { en: "/en/contact" } },
};

export default function ContactPage() {
  const dict = getDictionary("vi");
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
              <dt className="text-brand-muted">{dict.contactPage.form.phone}</dt>
              <dd className="mt-0.5 font-medium text-brand-dark">+84 000 000 000</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
