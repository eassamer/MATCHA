import type { Like, Match, NearbyUser, User } from "./types";

type Raw = Record<string, unknown>;

/** `userImages` arrives as a JSON array, a comma-joined string (older queries) or null. */
export function normalizeImages(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string" && v.length > 0);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        return normalizeImages(JSON.parse(trimmed));
      } catch {
        /* fall through to comma split */
      }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

/** `orientation` is a JSON column: parsed array, or a JSON string in some code paths. */
export function normalizeOrientation(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
    } catch {
      return value ? [value] : [];
    }
  }
  return [];
}

function toNumber(value: unknown, fallback: number): number {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : fallback;
}

function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

function toNullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

const SENSITIVE_KEYS = [
  "password",
  "emailVerificationToken",
  "emailVerificationTokenExpiresAt",
  "passwordResetToken",
  "passwordResetTokenExpiresAt",
];

/**
 * Turns any backend user payload into the flat `User` shape the store expects.
 * Accepts the login/me shape, the `GET /users/user` shape and the register
 * response `{ newUser, newImage }`.
 */
export function normalizeUser(input: unknown): User {
  let raw: Raw = (input && typeof input === "object" ? input : {}) as Raw;
  let extraImages: unknown = undefined;
  if (raw.newUser && typeof raw.newUser === "object") {
    extraImages = raw.newImage;
    raw = raw.newUser as Raw;
  }
  const images = normalizeImages(raw.userImages);
  const registered = Array.isArray(extraImages)
    ? normalizeImages(
        (extraImages as Raw[]).map((img) => (typeof img === "string" ? img : (img?.locationUrl as string)))
      )
    : [];

  const user: User = {
    userId: String(raw.userId ?? ""),
    firstName: String(raw.firstName ?? ""),
    lastName: String(raw.lastName ?? ""),
    displayName: String(raw.displayName ?? ""),
    email: String(raw.email ?? ""),
    emailVerified: raw.emailVerified === true || raw.emailVerified === 1,
    bio: typeof raw.bio === "string" ? raw.bio : "",
    birthDate: toNullableString(raw.birthDate ?? raw.birthdate),
    createdAt: toNullableString(raw.createdAt),
    city: toNullableString(raw.city),
    region: toNullableString(raw.region),
    country: toNullableString(raw.country),
    profession: toNullableString(raw.profession),
    latitude: toNullableNumber(raw.latitude),
    longitude: toNullableNumber(raw.longitude),
    radiusInKm: toNumber(raw.radiusInKm, 100),
    includingRange: toNumber(raw.includingRange, 0),
    interests: toNumber(raw.interests, 0),
    sex: String(raw.sex ?? ""),
    orientation: normalizeOrientation(raw.orientation),
    fameRating: toNumber(raw.fameRating, 50),
    isOnline: raw.isOnline === true || raw.isOnline === 1,
    lastOnline: toNullableString(raw.lastOnline),
    userImages: images.length ? images : registered,
  };
  for (const key of SENSITIVE_KEYS) {
    if (key in raw) delete (user as unknown as Raw)[key];
  }
  return user;
}

export function normalizeNearbyUsers(input: unknown): NearbyUser[] {
  if (!Array.isArray(input)) return [];
  return input.map((raw, index) => ({
    ...normalizeUser(raw),
    distance: toNumber((raw as Raw)?.distance, 0),
    id: index,
  }));
}

export function normalizeLike(input: unknown): Like {
  const raw = (input && typeof input === "object" ? input : {}) as Raw;
  return {
    ...normalizeUser(raw),
    id: String(raw.id ?? raw.likeId ?? ""),
    senderId: String(raw.senderId ?? ""),
    receiverId: String(raw.receiverId ?? ""),
    superLike: raw.superLike === true || raw.superLike === 1,
  };
}

export function normalizeMatch(input: unknown): Match {
  const raw = (input && typeof input === "object" ? input : {}) as Raw;
  return {
    ...normalizeUser(raw),
    matchId: String(raw.matchId ?? ""),
    matchedAt: toNullableString(raw.matchedAt) ?? "",
  };
}
