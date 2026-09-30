import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  fetchNearbyUsers,
  removeUserNearBy,
  setUsersNearBy,
} from "@/lib/features/users/userNearBySlice";
import { normalizeNearbyUsers } from "@/lib/normalize";
import { ApiError } from "@/lib/api";
import { getNearbyUsers } from "@/hooks/relations";

vi.mock("@/hooks/relations", () => ({ getNearbyUsers: vi.fn() }));

const mockedGetNearbyUsers = vi.mocked(getNearbyUsers);
const makeStore = () => configureStore({ reducer: { usersNearBy: reducer } });

describe("usersNearBy slice (FE-18)", () => {
  beforeEach(() => mockedGetNearbyUsers.mockReset());

  it("starts idle with no sentinel card", () => {
    const state = makeStore().getState().usersNearBy;
    expect(state).toEqual({ items: [], status: "idle", error: null });
  });

  it("goes loading → ready with the fetched deck", async () => {
    const deck = normalizeNearbyUsers([{ userId: "a" }, { userId: "b" }]);
    let resolve!: (v: typeof deck) => void;
    mockedGetNearbyUsers.mockReturnValue(new Promise((r) => (resolve = r)));
    const store = makeStore();

    const pending = store.dispatch(fetchNearbyUsers());
    expect(store.getState().usersNearBy.status).toBe("loading");

    resolve(deck);
    await pending;
    expect(store.getState().usersNearBy).toEqual({ items: deck, status: "ready", error: null });
  });

  it("goes to error with the backend message and can be retried", async () => {
    mockedGetNearbyUsers.mockRejectedValueOnce(new ApiError("User location not found", 503));
    const store = makeStore();
    await store.dispatch(fetchNearbyUsers());
    expect(store.getState().usersNearBy).toEqual({
      items: [],
      status: "error",
      error: "User location not found",
    });

    mockedGetNearbyUsers.mockResolvedValueOnce([]);
    await store.dispatch(fetchNearbyUsers());
    expect(store.getState().usersNearBy.status).toBe("ready"); // empty deck is a distinct, ready state
  });

  it("setUsersNearBy / removeUserNearBy keep the deck consistent", () => {
    const deck = normalizeNearbyUsers([{ userId: "a" }, { userId: "b" }]);
    const store = makeStore();
    store.dispatch(setUsersNearBy(deck));
    store.dispatch(removeUserNearBy("a"));
    expect(store.getState().usersNearBy.items.map((u) => u.userId)).toEqual(["b"]);
    expect(store.getState().usersNearBy.status).toBe("ready");
  });
});
