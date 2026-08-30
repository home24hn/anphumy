"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full rounded-md border border-brand-border bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const { form } = dict.contactPage;

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-brand-accent/30 bg-brand-accent/5 p-6 text-sm text-brand-dark"
      >
        {form.success}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="locale" value={dict.locale} />
      {/* Honeypot field — hidden from real users via CSS, not display:none, to defeat basic bots. */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={form.name} htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={form.namePlaceholder}
            className={inputClasses}
          />
        </Field>
        <Field label={form.company} htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            placeholder={form.companyPlaceholder}
            className={inputClasses}
          />
        </Field>
        <Field label={form.phone} htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={form.phonePlaceholder}
            className={inputClasses}
          />
        </Field>
        <Field label={form.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            placeholder={form.emailPlaceholder}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label={form.need} htmlFor="need" required>
        <select id="need" name="need" required defaultValue="" className={inputClasses}>
          <option value="" disabled>
            {form.needPlaceholder}
          </option>
          {form.needOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label={form.message} htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={form.messagePlaceholder}
          className={inputClasses}
        />
      </Field>

      {state.status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          {state.message ?? form.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-accent-dark disabled:opacity-60"
      >
        {pending ? form.submitting : form.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-dark">
        {label}
        {required ? <span className="text-brand-accent"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
