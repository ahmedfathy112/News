import { NextRequest, NextResponse } from "next/server";
import { LogInValidation } from "../../../utils/validation";
import prisma from "../../../utils/db";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";
import { generateToken, SetCookie } from "../../../utils/generateToken";
/**
 * @Method POST
 * @api http://localhost:3000/api/users/login
 * @description  Login For User(LogIn)
 * @acsses public
 */

interface LogInUser {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    // validation the data that comes from the user
    const body = (await request.json()) as LogInUser;
    const Validation = LogInValidation.safeParse(body);
    if (!Validation.success) {
      return NextResponse.json(
        { message: Validation.error.errors[0].message },
        { status: 400 }
      );
    }
    // check if the email and the password is right or not
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Password Or Email!" },
        { status: 400 }
      );
    }
    const passwordCheck = await bcrypt.compare(body.password, user.Password);
    if (!passwordCheck) {
      return NextResponse.json(
        { message: "Invalid Password Or Email!" },
        { status: 400 }
      );
    }
    // generate the token
    const Payload: JwtPayload = {
      id: user.id,
      userName: user.userName,
      isAdmin: user.isAdmin,
    };
    const token = generateToken(Payload);
    // generate the cookies
    const cookie = SetCookie(Payload);
    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200, headers: { "Set-cookie": cookie } }
    );
  } catch (error) {
    // catch the error
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
