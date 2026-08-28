"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent">Lỗi</p>
      <h1 className="mt-3 text-2xl font-semibold text-brand-dark">Đã có lỗi xảy ra</h1>
      <p className="mt-2 max-w-sm text-sm text-brand-muted">
        Vui lòng thử lại. Nếu lỗi tiếp diễn, hãy liên hệ với chúng tôi.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-accent-dark"
      >
        Thử lại
      </button>
    </div>
  );
}
