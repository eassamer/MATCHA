import { describe, it, expect, vi, afterEach } from "vitest";
import { requestCoordinates } from "@/lib/geolocation";

type PositionCb = (pos: { coords: { latitude: number; longitude: number } }) => void;
type ErrorCb = () => void;

function stubGeolocation(impl: ((ok: PositionCb, fail: ErrorCb) => void) | null) {
  Object.defineProperty(navigator, "geolocation", {
    configurable: true,
    value: impl ? { getCurrentPosition: impl } : undefined,
  });
}

const okJson = (body: unknown) =>
  vi.fn(async () => ({ ok: true, json: async () => body })) as unknown as typeof fetch;

describe("requestCoordinates (FE-18 / FE-15)", () => {
  afterEach(() => stubGeolocation(null));

  it("uses the browser position when granted", async () => {
    stubGeolocation((ok) => ok({ coords: { latitude: 1.5, longitude: 2.5 } }));
    const fetchImpl = okJson({ latitude: 9, longitude: 9 });
    expect(await requestCoordinates({ fetchImpl })).toEqual({ latitude: 1.5, longitude: 2.5 });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("falls back to the IP lookup when the user declines", async () => {
    stubGeolocation((_ok, fail) => fail());
    const fetchImpl = okJson({ latitude: "34.02", longitude: "-6.84" });
    expect(await requestCoordinates({ fetchImpl })).toEqual({ latitude: 34.02, longitude: -6.84 });
  });

  it("falls back to the IP lookup when geolocation is unavailable", async () => {
    stubGeolocation(null);
    const fetchImpl = okJson({ latitude: 10, longitude: 20 });
    expect(await requestCoordinates({ fetchImpl })).toEqual({ latitude: 10, longitude: 20 });
  });

  it("returns null when both sources fail", async () => {
    stubGeolocation((_ok, fail) => fail());
    const fetchImpl = vi.fn(async () => {
      throw new Error("offline");
    }) as unknown as typeof fetch;
    expect(await requestCoordinates({ fetchImpl })).toBeNull();
    expect(await requestCoordinates({ fetchImpl: okJson({ latitude: "n/a" }) })).toBeNull();
  });
});
