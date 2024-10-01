import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTpayload } from "./types";

export function verifyToken(request: NextRequest): JWTpayload | null {
  try {
    const JwtToken = request.cookies.get("JwtToken");
    const token = JwtToken?.value as string;
    if (!token) {
      return null;
    }
    const privateKey = process.env.SECRET_KEY;
    const userPayload = jwt.verify(token, privateKey) as JWTpayload;
    return userPayload;
  } catch (error) {
    return null;
  }
}

// verify token for pages to check if user login or not
export function verifyTokenForPages(token: string): JWTpayload | null {
  try {
    const privateKey = process.env.SECRET_KEY;
    const userPayload = jwt.verify(token, privateKey) as JWTpayload;
    if (!userPayload) return null;
    return userPayload;
  } catch (error) {
    return null;
  }
}
