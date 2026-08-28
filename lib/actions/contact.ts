"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGES = {
  vi: {
    name: "Vui lòng nhập họ tên.",
    contact: "Vui lòng nhập số điện thoại hoặc email.",
    email: "Email không hợp lệ.",
    message: "Vui lòng mô tả ngắn gọn nhu cầu của bạn.",
  },
  en: {
    name: "Please enter your name.",
    contact: "Please enter a phone number or email.",
    email: "Invalid email address.",
    message: "Please briefly describe your need.",
  },
};

/**
 * Validates and "submits" the contact form (section 28).
 *
 * NOTE: ARCHITECTURE.md explicitly says a database table is not required in
 * V1 ("Không cần lưu vào database trong V1 nếu chưa có CRM."), but it also
 * doesn't specify a delivery channel (email/webhook/CRM). This action
 * validates input and blocks obvious spam, then logs the submission
 * server-side. Wire it up to a real channel (e.g. an email API, or a
 * Supabase table) once that decision is made.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real users never fill this hidden field.
  if ((formData.get("website") as string | null)?.trim()) {
    return { status: "success" };
  }

  const locale = formData.get("locale") === "en" ? "en" : "vi";
  const t = MESSAGES[locale];

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const company = (formData.get("company") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const need = (formData.get("need") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || name.length < 2) {
    return { status: "error", message: t.name };
  }
  if (!phone && !email) {
    return { status: "error", message: t.contact };
  }
  if (email && !EMAIL_RE.test(email)) {
    return { status: "error", message: t.email };
  }
  if (!message || message.length < 5) {
    return { status: "error", message: t.message };
  }

  console.log("[contact-form] new submission", {
    locale,
    name,
    company,
    phone,
    email,
    need,
    message,
    at: new Date().toISOString(),
  });

  return { status: "success" };
}
