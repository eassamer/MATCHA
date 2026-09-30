// reverseGeocode never throws and falls back from Google to OpenStreetMap
const mockReverse = jest.fn();
jest.mock("node-geocoder", () => jest.fn(() => ({ reverse: mockReverse })));

const nodeGeocoder = require("node-geocoder");
const { reverseGeocode, primaryProviderName, toPlace } = require("@lib/geocode");

describe("geocode", () => {
  const log = jest.fn();
  beforeEach(() => {
    mockReverse.mockReset();
    log.mockReset();
    delete process.env.GEOCODER_PROVIDER;
  });

  test("chooses Google when a key is set, OpenStreetMap otherwise, env override wins", () => {
    process.env.GOOGLE_GEOCODE_API_KEY = "abc";
    expect(primaryProviderName()).toBe("google");
    process.env.GEOCODER_PROVIDER = "openstreetmap";
    expect(primaryProviderName()).toBe("openstreetmap");
  });

  test("falls back to OpenStreetMap when Google denies the key", async () => {
    process.env.GOOGLE_GEOCODE_API_KEY = "abc";
    mockReverse
      .mockRejectedValueOnce(new Error("Status is REQUEST_DENIED. The provided API key is invalid."))
      .mockResolvedValueOnce([{ city: "Casablanca", state: "Casablanca-Settat", country: "Morocco" }]);

    const place = await reverseGeocode(33.57, -7.59, { log });

    expect(place).toEqual({ city: "Casablanca", region: "Casablanca-Settat", country: "Morocco" });
    expect(nodeGeocoder).toHaveBeenCalledWith(expect.objectContaining({ provider: "google" }));
    expect(nodeGeocoder).toHaveBeenCalledWith(expect.objectContaining({ provider: "openstreetmap" }));
    expect(log).toHaveBeenCalledWith(expect.stringContaining("REQUEST_DENIED"));
  });

  test("returns null (never throws) when every provider fails or is empty", async () => {
    mockReverse.mockRejectedValueOnce(new Error("boom")).mockResolvedValueOnce([]);
    expect(await reverseGeocode(1, 2, { log })).toBeNull();
    mockReverse.mockRejectedValue(new Error("offline"));
    expect(await reverseGeocode(1, 2, { log })).toBeNull();
  });

  test("toPlace prefers administrative levels and tolerates missing fields", () => {
    expect(
      toPlace({ city: "Agadir", administrativeLevels: { level1short: "SM" }, country: "Morocco" })
    ).toEqual({ city: "Agadir", region: "SM", country: "Morocco" });
    expect(toPlace({ name: "Somewhere" })).toEqual({ city: "Somewhere", region: null, country: null });
    expect(toPlace(undefined)).toBeNull();
  });
});
