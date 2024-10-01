"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchArticle = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const formHandlar = (e) => {
    e.preventDefault();
    router.push(`/articles/searchPage?searchText=${searchText}`);
  };
  return (
    <form
      className="my-7 w-full flex justify-center items-center"
      onSubmit={formHandlar}
    >
      <input
        type="search"
        placeholder="Search for article"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        className="w-[500px] border-2 outline-none rounded-lg py-1 px-2"
      />
    </form>
  );
};

export default SearchArticle;
