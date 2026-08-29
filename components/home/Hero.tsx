import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/components/layout/locale-links";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero } = dict.home;

  return (
    <section className="relative overflow-hidden border-b border-brand-border bg-brand-bg text-brand-dark">
      {/* Tech background photo — a white gradient washes the left (where the
       * text sits) to full opacity so copy stays sharp, and fades out toward
       * the right so the scene (camera, rack, solar, BESS) stays visible. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/hero/tech-services.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.94)_30%,rgba(255,255,255,0.55)_58%,rgba(255,255,255,0.22)_100%)]" />
      </div>
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-accent/15 blur-3xl"
        aria-hidden
      />

      <Container className="relative py-20 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          {hero.eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
          {hero.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-sm text-brand-muted">
          {hero.tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-3">
              {tag}
              {i < hero.tags.length - 1 ? (
                <span className="h-1 w-1 rounded-full bg-brand-border" aria-hidden />
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={localePath(locale, "/contact")} variant="primary">
            {hero.ctaPrimary}
          </Button>
          <Button href={localePath(locale, "/projects")} variant="secondary">
            {hero.ctaSecondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
