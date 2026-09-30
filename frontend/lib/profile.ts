import type { UserUpdatePayload } from "@/hooks/users";
import type { User } from "@/lib/types";
import { InterestsHandler } from "@/lib/InterestsHandler";

export interface ProfileFormValues {
  displayName: string;
  bio?: string;
  job?: string;
  interests?: string[];
}

/**
 * Builds the `POST /users/update` body from the stored user and the edit form.
 * The backend rewrites every column, so untouched fields (name, email, sex,
 * orientation and, crucially, the real coordinates) come from the store.
 */
export function buildProfileUpdatePayload(user: User, form: ProfileFormValues): UserUpdatePayload {
  if (user.latitude === null || user.longitude === null) {
    throw new Error("Your location is not set yet; allow geolocation or set it manually first");
  }
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    sex: user.sex,
    orientation: user.orientation,
    radiusInKm: user.radiusInKm,
    latitude: user.latitude,
    longitude: user.longitude,
    displayName: form.displayName.trim(),
    bio: (form.bio ?? "").trim(),
    profession: (form.job ?? "").trim(),
    interests: InterestsHandler.interestsToInt(form.interests ?? []),
  };
}
