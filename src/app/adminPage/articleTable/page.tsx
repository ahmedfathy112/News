import React from "react";
import AdminSidebar from "../AdminSidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPages } from "../../utils/verifyToken";
import { Article } from "@prisma/client";
import {
  getArticles,
  getArticlesCount,
} from "../../../apiCalls/ArticleApiCalls";
import { ARTICLE_PER_PAGE } from "../../utils/constants";
import { SimplePagination } from "../../articles/Pagination";
import DeleteArticle from "./DeleteArticle";
import Link from "next/link";

interface ArticleTableprops {
  searchParams: { pageNumber: string };
}

const ArticleTable = async ({
  searchParams: { pageNumber },
}: ArticleTableprops) => {
  const token = cookies().get("JwtToken")?.value;
  if (!token) {
    redirect("/");
  }

  const payLoad = verifyTokenForPages(token);
  if (payLoad?.isAdmin === false) {
    redirect("/");
  }

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex flex-row md:flex-row max-md:flex-col">
        {/* AdminSidebar with 10% width */}
        <div className="w-[20%] max-md:w-[100%]">
          <AdminSidebar />
        </div>
        <div className="w-full md:w-[100%] flex justify-center items-center max-md:w-[100%]">
          <div className="container mx-auto max-md:w-max">
            <table className="min-w-full bg-white border border-gray-300 max-md:w-[-webkit-fill-available]">
              <thead>
                <tr className="w-full bg-gray-200">
                  <th className="px-4 py-2 text-left">Article ID</th>
                  <th className="px-4 py-2 text-left">Article Title</th>
                  <th className="px-4 py-2 text-left">Published At</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <>
                    <tr className="border-b">
                      <td className="px-4 py-2">{article.id}</td>
                      <td className="px-4 py-2">{article.title}</td>
                      <td className="px-4 py-2">
                        {new Date(article.createdAt).toDateString()}
                      </td>
                      <td className="px-4 py-2 max-md:flex max-md:flex-col max-md:justify-between">
                        <Link
                          href={`/adminPage/articleTable/editArticle/${article.id}`}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 max-md:mb-2"
                        >
                          Edit
                        </Link>
                        <DeleteArticle articleId={article.id} />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <SimplePagination
              pageNumber={parseInt(pageNumber)}
              pages={pages}
              route="/adminPage/articleTable"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleTable;
