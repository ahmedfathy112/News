import { NextRequest, NextResponse } from "next/server";
import { createValidation } from "../../utils/validation";
import { Article } from "@prisma/client";
import prisma from "../../utils/db";
import { ARTICLE_PER_PAGE } from "../../utils/constants";
import { verifyToken } from "../../utils/verifyToken";

/**
 *
 * @Method GET
 * @Route http://localhost:3000/api/articles
 * @description Get All Articles
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}

/**
 *
 * @Method POST
 * @Route http://localhost:3000/api/articles
 * @description Create New Article
 * @access public
 */
interface createArticle {
  body: string;
  title: string;
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Only admin can create article!" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as createArticle;

    const validError = createValidation.safeParse(body);
    if (!validError.success) {
      return NextResponse.json(validError.error, { status: 400 });
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        body: body.body,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
