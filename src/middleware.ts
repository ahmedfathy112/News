import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const JwtToken = request.cookies.get("JwtToken");
  const token = JwtToken?.value as string;
  if (!token) {
    return NextResponse.json({ message: "Accsess denaid!" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/users/profile/:path*",
};
