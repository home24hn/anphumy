import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  ENERGY_HERO_IMAGE,
  ENERGY_OUTLOOK_IMAGE,
  ENERGY_PAGE_IMAGES,
} from "@/lib/media/energy-images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "APM Energy",
  description:
    "APM Tech đang mở rộng năng lực sang lĩnh vực năng lượng: Solar PV, Battery Energy Storage System (BESS) và Energy Management.",
  alternates: { canonical: "/energy", languages: { en: "/en/energy" } },
};

export default function EnergyPage() {
  const dict = getDictionary("vi");
  const { energyPage } = dict;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark-2 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image src={ENERGY_HERO_IMAGE} alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,1)_0%,rgba(11,18,32,1)_42%,rgba(11,18,32,0.55)_70%,rgba(11,18,32,0.15)_100%)]" />
        </div>
        <Container className="relative py-20 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            {energyPage.eyebrow}
          </p>
          <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {energyPage.title}
          </h1>
          <div className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-white/75">
            {energyPage.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Solutions */}
      {energyPage.items.map((item, i) => {
        const imageRight = i % 2 === 0;
        return (
          <Section
            key={item.title}
            tone={i % 2 === 0 ? "light" : "muted"}
            className="!py-12 lg:!py-16"
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-lg",
                  imageRight ? "lg:order-2" : "lg:order-1",
                )}
              >
                <Image
                  src={ENERGY_PAGE_IMAGES[i]}
                  alt={item.heading}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className={imageRight ? "lg:order-1" : "lg:order-2"}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent">
                  {item.title}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-brand-dark">
                  {item.heading}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">{item.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-brand-dark/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        );
      })}

      {/* Outlook */}
      <Section tone="light" border className="!pt-12 !pb-14 lg:!pt-16 lg:!pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="border-l-2 border-brand-accent pl-6">
            <h2 className="text-lg font-semibold text-brand-dark">{energyPage.outlook.title}</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-muted">
              {energyPage.outlook.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={ENERGY_OUTLOOK_IMAGE}
              alt=""
              fill
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
