import { NextRequest, NextResponse } from "next/server";
import prisma from "../../utils/db";
import { verifyToken } from "../../utils/verifyToken";
import { CommentBody } from "../../utils/dtos";
import { CommentValidation } from "../../utils/validation";

/**
 *
 * @Method POST
 * @Route http://localhost:3000/api/comments
 * @description Create New Comment
 * @access Private "only login users"
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        {
          message: "You can`t comment, Create account first!",
        },
        { status: 401 }
      );
    }
    const body = (await request.json()) as CommentBody;
    const commentValid = CommentValidation.safeParse(body);
    if (!commentValid.success) {
      return NextResponse.json(
        {
          message: commentValid.error.errors[0].message,
        },
        { status: 400 }
      );
    }
    const Comment = await prisma.comment.create({
      data: {
        CommentText: body.commentText,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json({ Comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}

/**
 *
 * @Method GET
 * @Route http://localhost:3000/api/comments
 * @description GET All Comments
 * @access Private "only Admin"
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user.isAdmin === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Sorry!,Only admin can do that" },
        { status: 401 }
      );
    }
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
