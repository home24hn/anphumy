"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { localePath, switchLocalePath } from "./locale-links";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: dict.nav.solutions, href: "/solutions" },
    { label: dict.nav.projects, href: "/projects" },
    { label: dict.nav.energy, href: "/energy" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href={localePath(locale, "/")} className="flex items-center">
          <Image
            src="/images/brand/logo.png"
            alt="APM Tech"
            width={1668}
            height={624}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const href = localePath(locale, item.href);
            const isActive = pathname === href;
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "border-b-2 pb-[3px] text-sm font-medium transition-colors hover:text-brand-accent",
                  isActive
                    ? "border-brand-accent text-brand-dark"
                    : "border-transparent text-brand-dark/70",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 text-sm font-medium lg:flex">
          <LocaleSwitch pathname={pathname} locale={locale} />
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center lg:hidden"
          aria-label="Mở menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 bg-brand-dark" />
            <span className="h-0.5 w-5 bg-brand-dark" />
            <span className="h-0.5 w-5 bg-brand-dark" />
          </div>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-brand-border bg-brand-bg lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-light"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 px-2 py-2 text-sm font-medium">
              <LocaleSwitch pathname={pathname} locale={locale} />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function LocaleSwitch({ pathname, locale }: { pathname: string; locale: Locale }) {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={switchLocalePath(pathname, "vi")}
        className={locale === "vi" ? "text-brand-dark" : "text-brand-muted hover:text-brand-dark"}
      >
        VI
      </Link>
      <span className="text-brand-border">|</span>
      <Link
        href={switchLocalePath(pathname, "en")}
        className={locale === "en" ? "text-brand-dark" : "text-brand-muted hover:text-brand-dark"}
      >
        EN
      </Link>
    </div>
  );
}
