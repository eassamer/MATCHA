/**
 * Distinguishes a genuine tap from the click browsers fire right after a drag.
 * Wire `onDragStart`/`onDragEnd` to the draggable element and check
 * `shouldHandleClick()` inside its click handler.
 */
export function createDragGuard() {
  let dragging = false;
  let resetTimer: ReturnType<typeof setTimeout> | null = null;

  return {
    onDragStart() {
      if (resetTimer) clearTimeout(resetTimer);
      dragging = true;
    },
    onDragEnd() {
      // the synthetic click is dispatched right after pointerup, before timers run
      resetTimer = setTimeout(() => {
        dragging = false;
        resetTimer = null;
      }, 0);
    },
    shouldHandleClick() {
      return !dragging;
    },
    isDragging() {
      return dragging;
    },
  };
}

export type DragGuard = ReturnType<typeof createDragGuard>;
