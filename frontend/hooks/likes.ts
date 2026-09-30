import { api } from "@/lib/api";
import { normalizeLike, normalizeMatch } from "@/lib/normalize";
import type { Like, Match } from "@/lib/types";

/** Who liked me. NOTE: the HTTP route is added in BE-17; until then the store uses the socket `getLikes` event. */
export async function getLikes(): Promise<Like[]> {
  const res = await api.get("/relations/likes");
  return Array.isArray(res.data) ? res.data.map(normalizeLike) : [];
}

export async function addLike(receiverId: string): Promise<unknown> {
  const res = await api.post("/relations/like", { id: receiverId });
  return res.data;
}

export async function addDislike(receiverId: string): Promise<unknown> {
  const res = await api.post("/relations/dislike", { id: receiverId });
  return res.data;
}

export async function addSuperLike(receiverId: string): Promise<unknown> {
  const res = await api.post("/relations/superlike", { id: receiverId });
  return res.data;
}

export async function unmatch(userId: string): Promise<Match | unknown> {
  const res = await api.delete("/relations/match", { data: { id: userId } });
  return res.data;
}

export async function getMatches(): Promise<Match[]> {
  const res = await api.get("/relations/matches");
  return Array.isArray(res.data) ? res.data.map(normalizeMatch) : [];
}
