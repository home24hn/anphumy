import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const response = await updateSession(request);
  const locale = request.nextUrl.pathname.startsWith("/en") ? "en" : "vi";
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every route except static assets, so we can:
     * - refresh the Supabase auth session
     * - protect /admin routes
     * - tag the request with the current locale for <html lang>
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
