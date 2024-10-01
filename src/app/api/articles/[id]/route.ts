import { NextRequest, NextResponse } from "next/server";
import { Article } from "@prisma/client";
import prisma from "../../../utils/db";
import { date } from "zod";
import { verifyToken } from "../../../utils/verifyToken";

/**
 *
 * @Method GET
 * @Route http://localhost:3000/api/articles
 * @description Get Single Article
 * @access public
 */

interface props {
  params: { id: string };
}
export async function GET(request: NextRequest, { params }: props) {
  try {
    // find the article form the id
    const singleArticle = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          include: { user: { select: { userName: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    // check if the article in the database or not
    if (!singleArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(singleArticle, { status: 200 });
  } catch (error) {
    // catch the error
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}

/**
 *
 * @Method PUT
 * @Route http://localhost:3000/api/articles
 * @description Update Article by id
 * @access public
 */

interface props {
  params: { id: string };
}
interface updateArticle {
  title?: string;
  body?: string;
}
export async function PUT(request: NextRequest, { params }: props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Only admin can update on article!" },
        { status: 403 }
      );
    }
    // find the article that we want to update
    const singleArticle = prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });
    // check if the article in the database
    if (!singleArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    // set the data in the uodated article
    const body = (await request.json()) as updateArticle;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        body: body.body,
      },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
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
 * @Route http://localhost:3000/api/articles
 * @description Delete Article by id
 * @access public
 */

interface props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Only admin can delete the article!" },
        { status: 403 }
      );
    }
    // find the article that we want to delete
    const singleArticle = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });
    // check if the article in the database
    if (!singleArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    // delete the article from the database
    await prisma.article.delete({
      where: { id: parseInt(params.id) },
    });
    // delete the comments from the database
    const commentIDs: number[] = singleArticle?.comments.map(
      (comment) => comment.id
    );
    await prisma.comment.deleteMany({ where: { id: { in: commentIDs } } });
    return NextResponse.json(
      { message: "Deleted succsesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
