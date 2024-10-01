"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddCommentForm {
  articleId: number;
}
const CommentForm = ({ articleId }: AddCommentForm) => {
  const [commentText, setText] = useState("");
  const router = useRouter();
  const formHandelar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText === "") return toast.error("Please Write Something!");
    try {
      await axios.post(`http://localhost:3000/api/comments`, {
        commentText,
        articleId,
      });
      router.refresh();
      setText("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <form
      onSubmit={formHandelar}
      className="my-7 w-full flex flex-row max-md:flex-col max-md:justify-center max-md:items-center"
    >
      <input
        type="text"
        value={commentText}
        onChange={(e) => setText(e.target.value)}
        placeholder="اضافه التعليق هنا.."
        className="w-[80%] border-2 outline-none rounded-lg py-1 px-2 max-md:w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 font-semibold text-[17px] block py-2 px-4 text-center text-white rounded-lg ml-4 max-md:mt-4"
      >
        أضف تعليق
      </button>
    </form>
  );
};

export default CommentForm;
