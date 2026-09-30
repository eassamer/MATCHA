import { api, ApiError } from "@/lib/api";
import { normalizeUser } from "@/lib/normalize";
import type { User } from "@/lib/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName: string;
  birthDate: Date | string | undefined;
  sex: string;
  orientation: string[];
  interests: number;
  img: { data: string; idx: number };
}

/** Sets the `jwt` cookie (backend) and returns the user. */
export async function login(payload: LoginPayload): Promise<User> {
  try {
    const res = await api.post("/auth/login", payload);
    return normalizeUser(res.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new ApiError("Invalid email or password", 401);
    }
    throw error;
  }
}

/** Creates the account, sets the `jwt` cookie and returns the flat user. */
export async function register(payload: RegisterPayload): Promise<User> {
  const res = await api.post("/auth/register", payload);
  return normalizeUser(res.data);
}
