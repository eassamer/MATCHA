// Shapes returned by the Matcha backend, after normalisation (see lib/normalize.ts).

export type Sex = "male" | "female" | "other" | string;

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  bio: string;
  birthDate: string | null;
  createdAt: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  profession: string | null;
  latitude: number | null;
  longitude: number | null;
  radiusInKm: number;
  includingRange: number;
  interests: number;
  sex: Sex;
  orientation: string[];
  fameRating: number;
  isOnline: boolean;
  lastOnline: string | null;
  userImages: string[];
}

/** A user as returned by GET /relations (suggestions) — includes the distance in km. */
export interface NearbyUser extends User {
  distance: number;
  /** transient index used by the swipe deck (see components/Card.tsx); removed in FE-19 */
  id: number;
}

/** A like row joined with the sender's profile (GET /relations/likes, socket `likesResponse`). */
export interface Like extends User {
  id: string;
  senderId: string;
  receiverId: string;
  superLike: boolean;
}

/** GET /relations/matches: the other user's profile plus the match row id. */
export interface Match extends User {
  matchId: string;
  matchedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

export type NotificationType = "like" | "superLike" | "dislike" | "match" | "unmatch" | "view" | "message" | string;

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
