"use client";
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { DOMAIN } from "../utils/constants";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [body, setDiscription] = useState("");
  const router = useRouter();
  const formHandelr = async (e: FormEvent) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Error in title");
    }
    if (body === "") {
      toast.error("Error in description");
    }
    try {
      await axios.post(`${DOMAIN}/api/articles`, {
        title,
        body,
      });
      setDiscription("");
      setTitle("");
      toast.success("Article created successfully");
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="border-2 py-7 px-8 drop-shadow-xl max-md:px-4 w-[80%]">
      <h2 className="my-3 text-2xl font-semibold text-center">
        يمكنك اضافه المقاله من هنا
      </h2>
      <form onSubmit={formHandelr}>
        <div className="flex flex-col text-left my-3">
          <label className="my-1 font-semibold text-[17px] text-right">
            عنوان المقاله
          </label>
          <input
            title="enter article title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none py-[6px] px-1 border-[3px]"
          ></input>
        </div>
        <div className="flex flex-col text-left my-3">
          <label className="my-1 font-semibold text-[17px] text-right">
            وصف المقاله
          </label>
          <textarea
            title="enter article body"
            value={body}
            onChange={(e) => setDiscription(e.target.value)}
            rows={6}
            className="outline-none py-[6px] px-1 border-[3px]"
          ></textarea>
        </div>
        <button className="py-2 px-4 bg-blue-500 text-white text-[18px] font-semibold w-full rounded-lg border-2">
          أضف الأن
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
