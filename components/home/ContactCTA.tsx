import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/components/layout/locale-links";

export function ContactCTA({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contactCta } = dict.home;

  return (
    <Section tone="muted" className="!py-16 lg:!py-20">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">
            {contactCta.title}
          </h2>
          <p className="mt-2 text-base text-brand-muted">{contactCta.subtitle}</p>
        </div>
        <Button href={localePath(locale, "/contact")} variant="primary">
          {contactCta.cta}
        </Button>
      </div>
    </Section>
  );
}
