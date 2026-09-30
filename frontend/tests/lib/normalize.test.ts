import { describe, it, expect } from "vitest";
import { normalizeImages, normalizeNearbyUsers, normalizeOrientation, normalizeUser } from "@/lib/normalize";

describe("normalizeUser (FE-01)", () => {
  it("flattens the login / me response", () => {
    const user = normalizeUser({
      userId: "u1",
      firstName: "Ada",
      lastName: "Lovelace",
      displayName: "ada",
      email: "ada@test.com",
      emailVerified: 1,
      latitude: "33.5",
      longitude: -7.6,
      orientation: ["male"],
      userImages: ["https://img/1.jpg", "https://img/2.jpg"],
      fameRating: 72,
      password: "$argon2$secret",
      passwordResetToken: "x",
    });
    expect(user).toMatchObject({
      userId: "u1",
      displayName: "ada",
      emailVerified: true,
      latitude: 33.5,
      longitude: -7.6,
      orientation: ["male"],
      userImages: ["https://img/1.jpg", "https://img/2.jpg"],
      fameRating: 72,
    });
    expect((user as unknown as Record<string, unknown>).password).toBeUndefined();
    expect((user as unknown as Record<string, unknown>).passwordResetToken).toBeUndefined();
  });

  it("accepts a comma-joined userImages string (legacy GROUP_CONCAT shape)", () => {
    expect(normalizeUser({ userImages: "https://a.jpg,https://b.jpg" }).userImages).toEqual([
      "https://a.jpg",
      "https://b.jpg",
    ]);
    expect(normalizeUser({ userImages: null }).userImages).toEqual([]);
  });

  it("flattens the register response { newUser, newImage }", () => {
    const user = normalizeUser({
      newUser: { userId: "u2", displayName: "bob", email: "bob@test.com", userImages: null },
      newImage: [{ imageId: 1, locationUrl: "https://img/bob.jpg", idx: 0 }],
    });
    expect(user.userId).toBe("u2");
    expect(user.userImages).toEqual(["https://img/bob.jpg"]);
  });

  it("parses orientation given as a JSON string", () => {
    expect(normalizeOrientation('["male","female"]')).toEqual(["male", "female"]);
    expect(normalizeOrientation(["other"])).toEqual(["other"]);
    expect(normalizeOrientation(null)).toEqual([]);
  });

  it("normalizeImages parses a JSON array string too", () => {
    expect(normalizeImages('["https://x.jpg"]')).toEqual(["https://x.jpg"]);
  });

  it("uses safe defaults for missing fields", () => {
    const user = normalizeUser({});
    expect(user.latitude).toBeNull();
    expect(user.radiusInKm).toBe(100);
    expect(user.fameRating).toBe(50);
    expect(user.userImages).toEqual([]);
  });
});

describe("normalizeNearbyUsers", () => {
  it("adds distance and a stable deck index", () => {
    const users = normalizeNearbyUsers([
      { userId: "a", distance: "3.4" },
      { userId: "b", distance: 10 },
    ]);
    expect(users.map((u) => u.id)).toEqual([0, 1]);
    expect(users[0].distance).toBeCloseTo(3.4);
    expect(normalizeNearbyUsers(null)).toEqual([]);
  });
});
