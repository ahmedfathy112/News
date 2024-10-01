import jwt, { JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";

// type JwtPayload = {
//   id: number;
//   isAdmin: boolean;
//   email: string;
//   userName: string;
// };

export function generateToken(JwtPayload: JwtPayload): string {
  const token = jwt.sign(JwtPayload, process.env.SECRET_KEY as string, {
    expiresIn: "30d",
  });
  return token;
}

export function SetCookie(JwtPayload: JwtPayload): string {
  const token = generateToken(JwtPayload);
  // generate the cookies
  const cookie = serialize("JwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 30 * 24, //30 days
  });
  return cookie;
}
