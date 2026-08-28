import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-brand-dark">Không tìm thấy trang</h1>
      <p className="mt-2 max-w-sm text-sm text-brand-muted">
        Trang bạn tìm không tồn tại hoặc đã được gỡ bỏ.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-accent-dark"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
