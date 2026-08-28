import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/components/layout/locale-links";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero } = dict.home;

  return (
    <section className="bg-brand-dark text-white">
      <Container className="py-20 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          {hero.eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {hero.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/70">
          {hero.tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-3">
              {tag}
              {i < hero.tags.length - 1 ? (
                <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden />
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={localePath(locale, "/contact")} variant="primary">
            {hero.ctaPrimary}
          </Button>
          <Button
            href={localePath(locale, "/projects")}
            variant="secondary"
            className="border-white/25 text-white hover:border-white/60"
          >
            {hero.ctaSecondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
