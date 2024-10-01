import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../utils/db";

/**
 *
 * @Method GET
 * @Route http://localhost:3000/api/articles?searchText=value
 * @description Search for article
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: { contains: searchText, mode: "insensitive" },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
