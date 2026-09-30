import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignIn } from "@/components/auth/Signin/Signin";
import { login } from "@/hooks/auth";
import { ApiError } from "@/lib/api";
import toast from "react-hot-toast";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/hooks/auth", () => ({ login: vi.fn() }));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));

const mockedLogin = vi.mocked(login);
// jsdom's Storage is not exposed on this Node version; a stub is enough to prove nothing is written
const storage = { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn(), clear: vi.fn() };
Object.defineProperty(window, "localStorage", { configurable: true, value: storage });

describe("SignIn (FE-01)", () => {
  beforeEach(() => {
    push.mockReset();
    mockedLogin.mockReset();
    storage.setItem.mockReset();
  });

  it("logs in through the API layer and navigates home without a localStorage hand-off", async () => {
    mockedLogin.mockResolvedValueOnce({ userId: "u1" } as never);
    render(<SignIn />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@test.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Password123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/home"));
    expect(mockedLogin).toHaveBeenCalledWith({ email: "ada@test.com", password: "Password123" });
    expect(storage.setItem).not.toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
  });

  it("shows the backend error and stays on the page", async () => {
    mockedLogin.mockRejectedValueOnce(new ApiError("Invalid email or password", 401));
    render(<SignIn />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Invalid email or password"));
    expect(push).not.toHaveBeenCalled();
  });
});
