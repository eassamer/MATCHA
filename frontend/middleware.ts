import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, resolveRedirect } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt")?.value;
  // JWT_SECRET (server-only env, same value as the backend) enables signature
  // verification; without it only the expiry is checked.
  const session = await getSession(token, process.env.JWT_SECRET);
  const target = resolveRedirect(pathname, session);

  if (!target) {
    return NextResponse.next();
  }
  const response = NextResponse.redirect(new URL(target, request.url));
  if (session.state === "expired" || session.state === "invalid") {
    response.cookies.delete("jwt");
  }
  return response;
}

export const config = {
  // everything except Next internals and static assets
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};
