import { api } from "@/lib/api";
import { normalizeUser } from "@/lib/normalize";
import type { Coordinates, User } from "@/lib/types";

/** The fields `POST /users/update` expects (the backend rewrites all of them). */
export interface UserUpdatePayload {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  latitude: number;
  longitude: number;
  radiusInKm: number;
  interests: number;
  sex: string;
  orientation: string[];
  bio: string;
  profession?: string;
}

export async function getMe(): Promise<User> {
  const res = await api.get("/users/user/me");
  return normalizeUser(res.data);
}

export async function getUser(id: string): Promise<User> {
  const res = await api.get("/users/user", { params: { id } });
  return normalizeUser(res.data);
}

export async function updateUser(payload: UserUpdatePayload): Promise<User> {
  const res = await api.post("/users/update", payload);
  return normalizeUser(res.data);
}

export async function updateLocation(coords: Coordinates): Promise<User> {
  const res = await api.post("/users/update/location", {
    latitude: coords.latitude,
    longitude: coords.longitude,
  });
  return normalizeUser(res.data);
}

export async function updatePassword(currentPassword: string, password: string): Promise<void> {
  await api.post("/users/update/password", { currentPassword, password });
}
