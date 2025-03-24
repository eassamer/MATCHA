import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/public/") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico)$/) ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/auth")) {
    const token = request.cookies.get("jwt");
    if (token && token.value) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/`,
          {
            headers: {
              Authorization: `bearer ${token.value}`,
            },
          }
        );
        if (response.status !== 200) {
          return NextResponse.next();
        }
      } catch (error) {
        //@ts-expect-error error.response.data is not always defined
        console.error(error?.response?.data);
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }
  try {
    const jwt = request.cookies.get("jwt");
    if (!jwt || !jwt.value) {
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }
    const decodedToken = jose.decodeJwt(jwt.value);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp > currentTime) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`, {
        headers: {
          Authorization: `bearer ${jwt.value}`,
        },
      });
      if (response.status !== 200) {
        return NextResponse.redirect(new URL("/auth/signup", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    //@ts-expect-error error.response.data is not always defined
    console.error(error?.response?.data);
    return NextResponse.redirect(new URL("/auth/signup", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
