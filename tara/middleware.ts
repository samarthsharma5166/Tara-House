// /middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

// middleware.ts
export function middleware(request: NextRequest) { 
  const token = request.cookies.get("token")?.value;
  console.log('Middleware token:', token); // Add this for debugging

  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    if(!SECRET) {
      console.log('JWT_SECRET not set');
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const decoded = jwt.verify(token, SECRET);
    console.log('Token verified:', decoded);
    return NextResponse.next();
  } catch (err) {
    console.log('Token verification failed:', err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
// Protect only admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
