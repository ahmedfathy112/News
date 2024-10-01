import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../utils/db";
import { verifyToken } from "../../../utils/verifyToken";
import { UpdatedComment } from "../../../utils/dtos";

interface Props {
  params: { id: string };
}

/**
 *
 * @Method PUT
 * @Route http://localhost:3000/api/comments
 * @description Update Comment
 * @access Private "only User Himself can update his comment"
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found!" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "That`s not your comment!" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdatedComment;
    const newComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { CommentText: body.CommentText },
    });
    return NextResponse.json({ newComment }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}

/**
 *
 * @Method DELETE
 * @Route http://localhost:3000/api/comments
 * @description DELETE Comment
 * @access Private "only User Himself can delete his comment"
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "There`s no comment to delete!" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        {
          message: "That`s not your comment to delete it!",
        },
        { status: 403 }
      );
    }
    await prisma.comment.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json(
      { message: "Comment has been deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
