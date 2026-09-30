// @vitest-environment node
import { describe, it, expect } from "vitest";
import * as jose from "jose";
import { getSession, resolveRedirect, isPublicPath, isAuthPath } from "@/lib/auth/session";

const SECRET = "test-jwt-secret";
const key = new TextEncoder().encode(SECRET);

async function token(expiresIn: string, secret = SECRET) {
  return new jose.SignJWT({ id: "u1", email: "u1@test.com" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret === SECRET ? key : new TextEncoder().encode(secret));
}

describe("getSession (FE-03)", () => {
  it("is 'none' without a cookie", async () => {
    expect(await getSession(undefined)).toEqual({ state: "none" });
  });

  it("verifies a valid token with the secret", async () => {
    const session = await getSession(await token("1h"), SECRET);
    expect(session).toEqual({ state: "valid", userId: "u1", email: "u1@test.com" });
  });

  it("rejects an expired token", async () => {
    const expired = await token("-10s");
    expect((await getSession(expired, SECRET)).state).toBe("expired");
    expect((await getSession(expired)).state).toBe("expired"); // decode-only mode too
  });

  it("rejects a token signed with another secret when a secret is configured", async () => {
    expect((await getSession(await token("1h", "other-secret"), SECRET)).state).toBe("invalid");
  });

  it("rejects garbage", async () => {
    expect((await getSession("not-a-jwt", SECRET)).state).toBe("invalid");
    expect((await getSession("not-a-jwt")).state).toBe("invalid");
  });
});

describe("resolveRedirect", () => {
  const valid = { state: "valid" as const, userId: "u1" };
  const none = { state: "none" as const };
  const expired = { state: "expired" as const };

  it("keeps the landing and policy pages public", () => {
    expect(isPublicPath("/")).toBe(true);
    expect(isPublicPath("/policy/privacy")).toBe(true);
    expect(resolveRedirect("/", none)).toBeNull();
    expect(resolveRedirect("/policy/termsofuse", expired)).toBeNull();
    expect(resolveRedirect("/", valid)).toBeNull();
  });

  it("sends logged-in users away from the auth flow", () => {
    expect(isAuthPath("/auth/signup/2")).toBe(true);
    expect(resolveRedirect("/auth/signin", valid)).toBe("/home");
    expect(resolveRedirect("/auth/signup/2", none)).toBeNull();
  });

  it("protects everything else, including expired sessions", () => {
    expect(resolveRedirect("/home", valid)).toBeNull();
    expect(resolveRedirect("/home", none)).toBe("/auth/signin");
    expect(resolveRedirect("/messages/abc", expired)).toBe("/auth/signin");
    expect(resolveRedirect("/profile", { state: "invalid" })).toBe("/auth/signin");
  });
});
