// Location update must persist coordinates even when reverse geocoding fails (and in the right order)
const { truncateAll, createUser, one } = require("../helpers/db");
const { api } = require("../helpers/http");
const { reverseGeocode } = require("@lib/geocode");

jest.mock("@lib/geocode", () => ({ reverseGeocode: jest.fn() }));

const coordsOf = async (user) =>
  one("SELECT latitude, longitude, city, region, country FROM users WHERE userId = ?", [user.userId]);

describe("POST /users/update/location", () => {
  beforeEach(async () => {
    await truncateAll();
    reverseGeocode.mockReset();
  });

  test("stores latitude/longitude in the right columns and the resolved place", async () => {
    reverseGeocode.mockResolvedValueOnce({ city: "Rabat", region: "Rabat-Sale", country: "Morocco" });
    const me = await createUser({ latitude: null, longitude: null });

    const res = await api(me).post("/users/update/location").send({ latitude: 34.0209, longitude: -6.8416 });

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(me.userId);
    const row = await coordsOf(me);
    expect(row.latitude).toBeCloseTo(34.0209, 3);
    expect(row.longitude).toBeCloseTo(-6.8416, 3);
    expect(row).toMatchObject({ city: "Rabat", region: "Rabat-Sale", country: "Morocco" });
    expect(reverseGeocode).toHaveBeenCalledWith(34.0209, -6.8416);
  });

  test("still saves the coordinates when the geocoder fails (invalid key, offline...)", async () => {
    reverseGeocode.mockResolvedValueOnce(null);
    const me = await createUser({ latitude: null, longitude: null });

    const res = await api(me).post("/users/update/location").send({ latitude: 31.6295, longitude: -7.9811 });

    expect(res.status).toBe(200);
    const row = await coordsOf(me);
    expect(row.latitude).toBeCloseTo(31.6295, 3);
    expect(row.longitude).toBeCloseTo(-7.9811, 3);
    expect(row.city).toBe("Khouribga"); // schema default kept, not wiped
  });

  test("rejects invalid or non-numeric coordinates", async () => {
    const me = await createUser();
    await api(me).post("/users/update/location").send({ latitude: 91, longitude: 0 }).expect(400);
    await api(me).post("/users/update/location").send({ latitude: "33.5", longitude: "-7.5" }).expect(400);
    expect(reverseGeocode).not.toHaveBeenCalled();
  });
});

describe("GET /relations without a location", () => {
  beforeEach(async () => {
    await truncateAll();
    reverseGeocode.mockReset();
    reverseGeocode.mockResolvedValue(null);
  });

  test("answers 400 with an actionable message, then works once the location is set", async () => {
    const me = await createUser({ latitude: null, longitude: null, sex: "female", orientation: ["male"] });
    await createUser({ sex: "male", orientation: ["female"] }); // 0 km away from the default coords

    const before = await api(me).get("/relations/");
    expect(before.status).toBe(400);
    expect(before.body.error).toMatch(/location is not set/i);

    await api(me).post("/users/update/location").send({ latitude: 33.5731, longitude: -7.5898 }).expect(200);

    const after = await api(me).get("/relations/").expect(200);
    expect(after.body).toHaveLength(1);
    expect(after.body[0].distance).toBeLessThan(1);
  });
});
