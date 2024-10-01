import { NextRequest, NextResponse } from "next/server";
import { RegisterValidation } from "../../../utils/validation";
import prisma from "../../../utils/db";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { SetCookie } from "../../../utils/generateToken";

/**
 * @Method POST
 * @api http://localhost:3000/api/users/register
 * @description  Create New User(Register)
 * @acsses public
 */

interface RegisterUser {
  userName: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUser;
    const Validation = RegisterValidation.safeParse(body);
    if (!Validation.success) {
      return NextResponse.json(
        { message: Validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "This User Already Registerd!" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    const NewUser = await prisma.user.create({
      data: {
        userName: body.userName,
        email: body.email,
        Password: hashPassword,
      },
      select: {
        userName: true,
        email: true,
        isAdmin: true,
        id: true,
      },
    });

    const payLoad: JwtPayload = {
      id: NewUser.id,
      isAdmin: NewUser.isAdmin,
      userName: NewUser.userName,
    };
    // generate the cookies
    const cookie = SetCookie(payLoad);

    return NextResponse.json(
      { NewUser, message: "Registerd & Authenticated" },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
