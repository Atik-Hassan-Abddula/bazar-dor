
import { NextResponse } from "next/server";

export function proxy(request) {
  const sessionToken = request.cookies.get(
    "better-auth.session_token"
  )?.value;
console.log(sessionToken)
  if (!sessionToken) {
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",
    "/category/:path*",
  ],
};
