import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// unmount rendered trees between tests (automatic only with `globals: true`)
afterEach(() => cleanup());

process.env.NEXT_PUBLIC_API_URL = "http://api.test";

// next/image renders a plain <img> in tests
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props as Record<string, unknown> & { fill?: boolean; priority?: boolean };
    void fill;
    void priority;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

// the socket connects at import time; never do that in tests
vi.mock("@/lib/socket", () => ({
  __esModule: true,
  default: { on: vi.fn(), off: vi.fn(), emit: vi.fn(), connect: vi.fn(), disconnect: vi.fn() },
}));
