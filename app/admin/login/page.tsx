import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin — Đăng nhập", robots: { index: false } };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-lg border border-brand-border bg-white p-8">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-brand-dark">APM TECH</p>
        <h1 className="mt-1 text-center text-sm font-medium uppercase tracking-[0.15em] text-brand-muted">
          Admin
        </h1>

        <div className="mt-8">
          {isSupabaseConfigured() ? (
            <LoginForm />
          ) : (
            <div className="rounded-md bg-brand-light p-4 text-sm text-brand-muted">
              Supabase chưa được cấu hình. Sao chép <code>.env.local.example</code> thành{" "}
              <code>.env.local</code>, điền URL và anon key của dự án Supabase, rồi tạo tài khoản
              admin trực tiếp trong Supabase Auth (không có đăng ký công khai).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
