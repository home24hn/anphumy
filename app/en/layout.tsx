import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n";

export default function EnLayout({ children }: { children: ReactNode }) {
  const dict = getDictionary("en");

  return (
    <>
      <Header locale="en" dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale="en" dict={dict} />
    </>
  );
}
