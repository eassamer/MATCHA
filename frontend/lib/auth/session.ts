import * as jose from "jose";

export type SessionState = "none" | "valid" | "expired" | "invalid";

export interface Session {
  state: SessionState;
  userId?: string;
  email?: string;
}

/**
 * Inspects the `jwt` cookie. With `secret` (JWT_SECRET shared with the backend)
 * the signature is verified; without it only the expiry is checked, which is
 * enough to route but not to trust the payload.
 */
export async function getSession(token: string | undefined, secret?: string): Promise<Session> {
  if (!token) return { state: "none" };
  try {
    let payload: jose.JWTPayload;
    if (secret) {
      ({ payload } = await jose.jwtVerify(token, new TextEncoder().encode(secret), {
        algorithms: ["HS256"],
      }));
    } else {
      payload = jose.decodeJwt(token);
      if (typeof payload.exp === "number" && payload.exp <= Math.floor(Date.now() / 1000)) {
        return { state: "expired" };
      }
    }
    return {
      state: "valid",
      userId: payload.id ? String(payload.id) : undefined,
      email: typeof payload.email === "string" ? payload.email : undefined,
    };
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) return { state: "expired" };
    return { state: "invalid" };
  }
}

/** Reachable without an account: landing and legal pages. */
export function isPublicPath(pathname: string): boolean {
  return pathname === "/" || pathname === "/policy" || pathname.startsWith("/policy/");
}

/** Sign-in / sign-up flow: reachable only while logged out. */
export function isAuthPath(pathname: string): boolean {
  return pathname === "/auth" || pathname.startsWith("/auth/");
}

export const SIGN_IN_PATH = "/auth/signin";
export const HOME_PATH = "/home";

/** Where to send the request, or `null` to let it through. */
export function resolveRedirect(pathname: string, session: Session): string | null {
  if (isPublicPath(pathname)) return null;
  if (isAuthPath(pathname)) return session.state === "valid" ? HOME_PATH : null;
  return session.state === "valid" ? null : SIGN_IN_PATH;
}
