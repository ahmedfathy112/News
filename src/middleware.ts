import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const JwtToken = request.cookies.get("JwtToken");
  const token = JwtToken?.value as string;

  // التحقق من وجود التوكن
  if (!token) {
    return NextResponse.json({ message: "Access denied!" }, { status: 401 });
  }

  const response = NextResponse.next();

  // إعدادات CORS
  response.headers.set("Access-Control-Allow-Origin", "*"); // السماح لجميع النطاقات
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // معالجة طلبات OPTIONS
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204 });
  }

  return response;
}

export const config = {
  matcher: "/api/users/profile/:path*", // يمكنك تعديل هذه القيمة لتناسب المسارات التي ترغب في تطبيق الميدل وير عليها
};
