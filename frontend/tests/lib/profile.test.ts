import { describe, it, expect } from "vitest";
import { buildProfileUpdatePayload } from "@/lib/profile";
import { initialState } from "@/lib/features/user/userSlice";
import { InterestsHandler } from "@/lib/InterestsHandler";
import { interestsShifter } from "@/lib/constants";

const user = {
  ...initialState,
  userId: "u1",
  firstName: "Ada",
  lastName: "Lovelace",
  displayName: "ada",
  email: "ada@test.com",
  sex: "female",
  orientation: ["male"],
  radiusInKm: 40,
  latitude: 33.5731,
  longitude: -7.5898,
};

describe("buildProfileUpdatePayload (FE-11)", () => {
  it("keeps the user's real coordinates and identity, applies the form fields", () => {
    const interest = interestsShifter[0].name;
    const payload = buildProfileUpdatePayload(user, {
      displayName: " ada2 ",
      bio: " hello ",
      job: "engineer",
      interests: [interest],
    });
    expect(payload.latitude).toBe(33.5731);
    expect(payload.longitude).toBe(-7.5898);
    expect(payload).toMatchObject({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@test.com",
      sex: "female",
      orientation: ["male"],
      radiusInKm: 40,
      displayName: "ada2",
      bio: "hello",
      profession: "engineer",
      interests: InterestsHandler.interestsToInt([interest]),
    });
    // never the hardcoded Colombia coordinates from the old dialog
    expect(String(payload.latitude)).not.toBe("3.13");
  });

  it("refuses to save when the location is unknown (it would be wiped)", () => {
    expect(() =>
      buildProfileUpdatePayload({ ...user, latitude: null, longitude: null }, { displayName: "x" })
    ).toThrow(/location/i);
  });
});
