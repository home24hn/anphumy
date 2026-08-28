import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anphumy.vn"),
  title: {
    default: "APM Tech",
    template: "%s | APM Tech",
  },
  description:
    "APM Tech cung cấp giải pháp hạ tầng công nghệ: camera an ninh, hệ thống mạng, kiểm soát ra vào, điện nhẹ và giải pháp năng lượng.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headerList = await headers();
  const locale = headerList.get("x-locale") === "en" ? "en" : "vi";

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-dark">
        {children}
      </body>
    </html>
  );
}
