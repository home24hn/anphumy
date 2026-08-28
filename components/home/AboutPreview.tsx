import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Section } from "@/components/ui/Section";
import { localePath } from "@/components/layout/locale-links";
import Link from "next/link";

export function AboutPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { about } = dict.home;

  return (
    <Section tone="light" compact>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">
          {about.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-brand-muted">{about.body}</p>
        <Link
          href={localePath(locale, "/about")}
          className="mt-6 inline-block text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
        >
          {about.cta} →
        </Link>
      </div>
    </Section>
  );
}
