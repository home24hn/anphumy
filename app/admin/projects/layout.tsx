import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Container } from "@/components/ui/Container";

export default function AdminProjectsLayout({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  return (
    <>
      <header className="border-b border-brand-border bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/admin/projects" className="text-sm font-bold tracking-[0.15em] text-brand-dark">
            APM TECH ADMIN
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-sm font-medium text-brand-muted hover:text-brand-dark">
              Đăng xuất
            </button>
          </form>
        </Container>
      </header>
      <Container className="py-10">{children}</Container>
    </>
  );
}
