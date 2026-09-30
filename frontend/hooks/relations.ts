import { api } from "@/lib/api";
import { normalizeNearbyUsers } from "@/lib/normalize";
import type { NearbyUser } from "@/lib/types";

/** Suggested profiles around the current user (GET /relations). */
export async function getNearbyUsers(): Promise<NearbyUser[]> {
  const res = await api.get("/relations/");
  return normalizeNearbyUsers(res.data);
}
