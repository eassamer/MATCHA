import { describe, it, expect, vi, afterEach } from "vitest";
import type { AxiosAdapter, InternalAxiosRequestConfig } from "axios";
import { api, ApiError, getErrorMessage, setUnauthorizedHandler } from "@/lib/api";

function fakeAdapter(status: number, data: unknown): AxiosAdapter {
  return async (config: InternalAxiosRequestConfig) => {
    const response = { data, status, statusText: String(status), headers: {}, config };
    if (status >= 400) {
      const { AxiosError } = await import("axios");
      throw new AxiosError(`Request failed with status code ${status}`, "ERR_BAD_REQUEST", config, null, response);
    }
    return response;
  };
}

describe("api client (FE-41)", () => {
  afterEach(() => {
    setUnauthorizedHandler(null);
  });

  it("is configured with the public API base URL and credentials", () => {
    expect(api.defaults.baseURL).toBe("http://api.test");
    expect(api.defaults.withCredentials).toBe(true);
  });

  it("resolves with the response on success", async () => {
    const res = await api.get("/ping", { adapter: fakeAdapter(200, { ok: true }) });
    expect(res.data).toEqual({ ok: true });
  });

  it("rejects with an ApiError carrying the backend message and status", async () => {
    await expect(
      api.get("/boom", { adapter: fakeAdapter(403, { error: "You cannot like yourself" }) })
    ).rejects.toMatchObject({ name: "ApiError", status: 403, message: "You cannot like yourself" });
  });

  it("calls the unauthorized handler on 401", async () => {
    const handler = vi.fn();
    setUnauthorizedHandler(handler);
    await expect(api.get("/me", { adapter: fakeAdapter(401, { error: "Token is not valid" }) })).rejects.toBeInstanceOf(
      ApiError
    );
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("getErrorMessage handles ApiError, Error and unknown values", () => {
    expect(getErrorMessage(new ApiError("nope", 400))).toBe("nope");
    expect(getErrorMessage(new Error("plain"))).toBe("plain");
    expect(getErrorMessage("???")).toBe("Something went wrong");
  });
});
