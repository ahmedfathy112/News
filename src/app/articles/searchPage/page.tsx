import React from "react";
import { getArticlesBySearch } from "../../../apiCalls/ArticleApiCalls";
import Link from "next/link";

interface searchPageParams {
  searchParams: { searchText: string };
}

const SearchPage = async ({
  searchParams: { searchText },
}: searchPageParams) => {
  const searchResult = await getArticlesBySearch(searchText);

  return (
    <>
      <h1 className="text-3xl font-semibold my-4 mx-4">
        Search for: <span className="text-orange-500">{searchText}</span>
      </h1>
      <div className="w-full flex-wrap flex flex-row justify-center my-4">
        {searchResult.length > 0 ? (
          searchResult.map((article) => (
            <div
              key={article.id}
              className="w-1/4 rounded-lg m-5 py-3 px-4 border-2 relative pb-[50px] max-md:w-full"
            >
              <h3 className="text-[17px] font-semibold my-3 text-center line-clamp-1">
                {article.title}
              </h3>
              <p className="text-[16px] font-serif font-medium my-3">
                {article.body.slice(0, 50)}
              </p>
              <div className="flex flex-col">
                <span className="text-[13px]">
                  Created At: {new Date(article.createdAt).toDateString()}
                </span>
              </div>
              <Link
                href={`/articles/${article.id}`}
                className="bg-blue-500 font-semibold text-[17px] block py-2 px-4 text-center text-white rounded-lg absolute bottom-0 w-full left-0"
              >
                Read more
              </Link>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;
