import { Article } from "@prisma/client";
import { SingleArticle } from "../app/utils/types";
import axios from "axios";
import { date } from "zod";
import { DOMAIN } from "../app/utils/constants";

export async function getArticles(
  pageNumber: string | null
): Promise<Article[]> {
  const data = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`, {
    cache: "no-store",
  });
  // if (!data.ok) {
  //   throw new Error("there is error in fetch data");
  // }
  return data.json();
}
// get articles count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`);
  if (!response.ok) {
    throw new Error("there is error in fetch article count");
  }
  return response.json();
}

// get articles by search page
export async function getArticlesBySearch(
  searchText: string
): Promise<Article[]> {
  try {
    const response = await fetch(
      `${DOMAIN}/api/articles/search?searchText=${searchText}`
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    const articlesSearch = data.articles;

    return articlesSearch; // إرجاع البيانات بعد جلبها بنجاح
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // إعادة رمي الخطأ ليتم التعامل معه في مكان آخر
  }
}

// get Single Article
export async function getSingleArticle(
  articleId: string
): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("there is error in fetch data");
  }

  return response.json();
}
