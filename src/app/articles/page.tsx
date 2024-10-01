import Link from "next/link";
import SearchArticle from "./SearchArticle";
import { SimplePagination } from "./Pagination";
import { getArticles, getArticlesCount } from "../../apiCalls/ArticleApiCalls";
import { ARTICLE_PER_PAGE } from "../utils/constants";
interface articlesProps {
  searchParams: { pageNumber: string };
}

const articels = async ({ searchParams }: articlesProps) => {
  const { pageNumber } = searchParams;

  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  const posts = await getArticles(pageNumber);
  return (
    <>
      <div className="flex flex-col w-full justify-center">
        <SearchArticle />
        <div className="w-full flex-wrap flex flex-row justify-center my-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-1/4 rounded-lg m-5 py-3 px-2 border-2 relative pb-[50px] max-md:w-full"
            >
              <h3 className="text-[17px] font-semibold my-3 text-center line-clamp-1 ">
                {post.title}...
              </h3>
              <p className="text-[16px] font-serif font-medium my-3">
                {post.body.slice(0, 150)}...
              </p>
              <Link
                href={`/articles/${post.id}`}
                className="bg-blue-500 font-semibold text-[17px] block py-2 px-4 text-center text-white rounded-lg absolute bottom-0 w-full left-0"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
        <SimplePagination
          route="/articles"
          pageNumber={parseInt(pageNumber)}
          pages={pages}
        />
      </div>
    </>
  );
};

export default articels;
