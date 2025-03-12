import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/icon.png") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/auth/signin") ||
    pathname.startsWith("/auth/signup")
  ) {
    return NextResponse.next();
  }
  const jwt = request.cookies.get("jwt");
  if (!jwt) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/user/me`,
      {
        headers: {
          Authorization: `bearer ${jwt.value}`,
        },
      }
    );
    if (response.status !== 200) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    //@ts-expect-error error.response.data is not always defined
    console.error(error?.response?.data);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/((?!auth/signin|auth/signup).*)"],
};
