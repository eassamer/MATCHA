import axios, { AxiosError } from "axios";

/**
 * Single axios instance for the Matcha backend. Every helper in hooks/*.ts goes
 * through it, so credentials, base URL and error handling live in one place.
 *
 * Errors are rethrown as ApiError (never resolved with the AxiosError, which the
 * old helpers did — callers then crashed on `res.data.x`).
 */
export class ApiError extends Error {
  status: number | undefined;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string; message?: string } | undefined;
    return data?.error || data?.message || error.message || "Request failed";
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

type UnauthorizedHandler = (() => void) | null;
let onUnauthorized: UnauthorizedHandler = null;

/** Registered once by the app shell; called when the backend answers 401 (session expired). */
export function setUnauthorizedHandler(handler: UnauthorizedHandler) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(new ApiError(getErrorMessage(error), status));
  }
);
