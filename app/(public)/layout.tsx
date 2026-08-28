import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const dict = getDictionary("vi");

  return (
    <>
      <Header locale="vi" dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale="vi" dict={dict} />
    </>
  );
}
