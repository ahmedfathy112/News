import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../../../utils/db";
import { verifyToken } from "../../../../utils/verifyToken";
import { UserUpdate } from "../../../../utils/dtos";
import bcrypt from "bcryptjs";
import { UpdateUserValidation } from "../../../../utils/validation";

/**
 * @Method DELETE
 * @api http://localhost:3000/api/users/profile
 * @description  DELETE USER FROM DATABASE
 * @accsess Private (only user himself can delete his account)
 */

interface props {
  params: { id: string };
}
export async function DELETE(request: NextRequest, { params }: props) {
  try {
    // chek if user in the database or not
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Not found this user!" },
        { status: 404 }
      );
    }
    // verify the token
    const userToken = verifyToken(request);
    // chek if the user hihself want to delete his account or not
    if (userToken !== null && userToken.id === user.id) {
      // delete the user
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      // delete comments of the user
      const commentIDs: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentIDs } } });
      return NextResponse.json(
        { message: "Your account has been deleted" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Only user himself can delete this account!" },
        { status: 403 }
      );
    }
  } catch (error) {
    // return the error
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}

/**
 * @Method GET
 * @api http://localhost:3000/api/users/profile
 * @description  User Can GET His Profile
 * @accsess Private (only user himself can GET his account)
 */

export async function GET(request: NextRequest, { params }: props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json(
        { message: "This User Not Found!" },
        { status: 404 }
      );
    }
    // verify the token
    const userToken = verifyToken(request);
    if (userToken === null || userToken.id !== user.id) {
      return NextResponse.json({ meesage: "Not Allowd!" }, { status: 403 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}

/**
 * @Method PUT
 * @api http://localhost:3000/api/users/profile
 * @description  User Can Update His Profile
 * @accsess Private (only user himself can Update his account)
 */

export async function PUT(request: NextRequest, { params }: props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json(
        { message: "This User Not Found!" },
        { status: 404 }
      );
    }
    // verify the token
    const userToken = verifyToken(request);
    if (userToken === null || userToken.id !== user.id) {
      return NextResponse.json({ meesage: "Not Allowd!" }, { status: 403 });
    }
    const body = (await request.json()) as UserUpdate;
    const Validation = UpdateUserValidation.safeParse(body);
    if (!Validation.success) {
      return NextResponse.json(
        { message: Validation.error.errors[0].message },
        { status: 400 }
      );
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        userName: body.userName,
        Password: body.password,
        email: body.email,
      },
    });
    const { Password, ...other } = updatedUser;
    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
