import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { setUsersNearBy, fetchNearbyUsers } from "@/lib/features/users/userNearBySlice";
import { normalizeNearbyUsers } from "@/lib/normalize";
import { ApiError } from "@/lib/api";
import { getNearbyUsers } from "@/hooks/relations";
import Home from "@/app/(main)/home/page";

vi.mock("@/hooks/relations", () => ({ getNearbyUsers: vi.fn() }));
vi.mock("@/hooks/users", () => ({ getMe: vi.fn(), updateLocation: vi.fn(), updateUser: vi.fn() }));
// heavy children are not under test here
vi.mock("@/components/messages/recent-messages", () => ({ default: () => <div>recent</div> }));
vi.mock("@/components/home/FilterButton", () => ({ default: () => <button>filters</button> }));
vi.mock("@/components/home/SwipeCard", () => ({
  SwipeCard: ({ cards }: { cards: { displayName: string }[] }) => (
    <div data-testid="deck">{cards.length ? cards.map((c) => c.displayName).join(",") : "No more users to swipe"}</div>
  ),
}));
vi.mock("@/components/home/SwipeButtons", () => ({ SwipeButtons: () => <div data-testid="swipe-buttons" /> }));
vi.mock("@/components/profile/details-card", () => ({ default: () => <div>details</div> }));

const mockedGetNearbyUsers = vi.mocked(getNearbyUsers);

function renderHome(store = makeStore()) {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  return store;
}

describe("Home page states (FE-18)", () => {
  beforeEach(() => mockedGetNearbyUsers.mockReset());

  it("shows the loader while nothing has been fetched yet", () => {
    renderHome();
    expect(screen.getByTestId("nearby-loader")).toBeInTheDocument();
    expect(screen.queryByTestId("deck")).not.toBeInTheDocument();
  });

  it("shows the deck and swipe buttons once ready", () => {
    const store = makeStore();
    store.dispatch(setUsersNearBy(normalizeNearbyUsers([{ userId: "a", displayName: "Ada" }])));
    renderHome(store);
    expect(screen.queryByTestId("nearby-loader")).not.toBeInTheDocument();
    expect(screen.getByTestId("deck")).toHaveTextContent("Ada");
    expect(screen.getByTestId("swipe-buttons")).toBeInTheDocument();
  });

  it("shows an empty deck (not the loader) when there is nobody around", () => {
    const store = makeStore();
    store.dispatch(setUsersNearBy([]));
    renderHome(store);
    expect(screen.getByTestId("deck")).toHaveTextContent("No more users to swipe");
    expect(screen.queryByTestId("swipe-buttons")).not.toBeInTheDocument();
  });

  it("shows the error with a retry button that refetches", async () => {
    mockedGetNearbyUsers.mockRejectedValueOnce(new ApiError("User location not found", 503));
    const store = makeStore();
    await store.dispatch(fetchNearbyUsers());
    renderHome(store);

    expect(screen.getByRole("alert")).toHaveTextContent("User location not found");
    expect(screen.queryByTestId("nearby-loader")).not.toBeInTheDocument();

    mockedGetNearbyUsers.mockResolvedValueOnce(normalizeNearbyUsers([{ userId: "b", displayName: "Bob" }]));
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    await waitFor(() => expect(screen.getByTestId("deck")).toHaveTextContent("Bob"));
    expect(mockedGetNearbyUsers).toHaveBeenCalledTimes(2);
  });
});
