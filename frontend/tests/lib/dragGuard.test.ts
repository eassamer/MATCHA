import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createDragGuard } from "@/lib/dragGuard";

describe("createDragGuard (swipe card click-after-drag)", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("lets a plain click through", () => {
    const guard = createDragGuard();
    expect(guard.shouldHandleClick()).toBe(true);
  });

  it("swallows the click that follows a drag release", () => {
    const guard = createDragGuard();
    guard.onDragStart();
    expect(guard.shouldHandleClick()).toBe(false);
    guard.onDragEnd();
    // the browser's click arrives synchronously after pointerup, before any timer
    expect(guard.shouldHandleClick()).toBe(false);
  });

  it("accepts clicks again once the post-drag tick has passed", () => {
    const guard = createDragGuard();
    guard.onDragStart();
    guard.onDragEnd();
    vi.runAllTimers();
    expect(guard.shouldHandleClick()).toBe(true);
  });

  it("stays blocked when a new drag starts before the reset fires", () => {
    const guard = createDragGuard();
    guard.onDragStart();
    guard.onDragEnd();
    guard.onDragStart();
    vi.runAllTimers();
    expect(guard.shouldHandleClick()).toBe(false);
  });
});
