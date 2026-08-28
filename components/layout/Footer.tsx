import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Container } from "@/components/ui/Container";
import { localePath } from "./locale-links";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const solutionLinks = [
    { label: dict.nav.solutions, href: "/solutions" },
    { label: dict.nav.energy, href: "/energy" },
  ];

  const companyLinks = [
    { label: dict.nav.projects, href: "/projects" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-brand-dark text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-bold tracking-[0.15em]">APM TECH</p>
          <p className="mt-3 max-w-[220px] text-sm text-white/60">{dict.footer.tagline}</p>
        </div>

        <FooterColumn title={dict.footer.solutionsTitle} links={solutionLinks} locale={locale} />
        <FooterColumn title={dict.footer.companyTitle} links={companyLinks} locale={locale} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
            {dict.footer.contactTitle}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href="mailto:contact@anphumy.vn" className="hover:text-white">
                contact@anphumy.vn
              </a>
            </li>
            <li>
              <a href="tel:+84000000000" className="hover:text-white">
                +84 000 000 000
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} APM Tech. {dict.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  locale,
}: {
  title: string;
  links: { label: string; href: string }[];
  locale: Locale;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={localePath(locale, link.href)} className="hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
