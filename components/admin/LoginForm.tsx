"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = { status: "idle" };

const inputClasses =
  "w-full rounded-md border border-brand-border bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-dark">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-brand-dark">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClasses}
        />
      </div>

      {state.status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-brand-accent px-5 py-3 text-sm font-medium text-white hover:bg-brand-accent-dark disabled:opacity-60"
      >
        {pending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
