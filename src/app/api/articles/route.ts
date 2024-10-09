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
    // إعداد رؤوس CORS
    const response = NextResponse.json({}); // إنشاء استجابة فارغة
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://vercel.live/link/news-two-rouge.vercel.app?via=project-dashboard-alias-list&p=1"
    ); // تغيير هذا إذا كنت تريد السماح بنطاقات أخرى
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    response.body = articles; // إضافة المقالات إلى الاستجابة
    return response; // إرجاع الاستجابة
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

    // إعداد رؤوس CORS هنا أيضًا
    const response = NextResponse.json(newArticle, { status: 201 });
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://vercel.live/link/news-two-rouge.vercel.app?via=project-dashboard-alias-list&p=1"
    );
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
