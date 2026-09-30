import type { Coordinates } from "@/lib/types";

const IP_LOOKUP_URL = "https://geolocation-db.com/json/";

function browserPosition(timeoutMs: number): Promise<Coordinates | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      () => resolve(null),
      { timeout: timeoutMs, maximumAge: 5 * 60 * 1000 }
    );
  });
}

async function ipPosition(fetchImpl: typeof fetch): Promise<Coordinates | null> {
  try {
    const res = await fetchImpl(IP_LOOKUP_URL);
    if (!res.ok) return null;
    const data = (await res.json()) as { latitude?: unknown; longitude?: unknown };
    const latitude = Number(data.latitude);
    const longitude = Number(data.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return { latitude, longitude };
  } catch {
    return null;
  }
}

/**
 * Browser geolocation first; if the user declines or it fails, an IP-based
 * lookup; `null` when neither is available.
 */
export async function requestCoordinates({
  timeoutMs = 8000,
  fetchImpl = typeof fetch === "function" ? fetch : undefined,
}: { timeoutMs?: number; fetchImpl?: typeof fetch } = {}): Promise<Coordinates | null> {
  const fromBrowser = await browserPosition(timeoutMs);
  if (fromBrowser) return fromBrowser;
  if (!fetchImpl) return null;
  return ipPosition(fetchImpl);
}
