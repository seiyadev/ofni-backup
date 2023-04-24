import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("ssn");
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET?.toString().trim();
  if (!jwt) return NextResponse.redirect(new URL("/auth/login", request.url));
  try {
    await jwtVerify(jwt.value, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/closet/:path*",
    "/fairing/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
