"use client";
import { Article } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../../../../utils/constants";

interface EditFormProps {
  article: Article;
}
const EditForm = ({ article }: EditFormProps) => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [UpdatedBody, setUpdatedDiscription] = useState("");
  const router = useRouter();
  const formHandelr = async (e: FormEvent) => {
    e.preventDefault();
    if (updatedTitle === "") {
      toast.error("Error in title");
    }
    if (UpdatedBody === "") {
      toast.error("Error in description");
    }
    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
        title: updatedTitle,
        body: UpdatedBody,
      });
      setUpdatedDiscription("");
      setUpdatedTitle("");
      router.refresh();
      toast.success("Article updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <h2 className="my-3 text-2xl font-semibold text-center">
        يمكنك هنا التعديل علي المقالات
      </h2>
      <form onSubmit={formHandelr}>
        <div className="flex flex-col text-left my-3">
          <label className="my-1 font-semibold text-[17px] text-right">
            عنوان المقاله الجديد
          </label>
          <input
            title="enter the title"
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="outline-none py-[6px] px-1 border-[3px]"
          ></input>
        </div>
        <div className="flex flex-col text-left my-3">
          <label className="my-1 font-semibold text-[17px] text-right">
            وصف المقاله الجديد
          </label>
          <textarea
            title="enter the body"
            value={UpdatedBody}
            onChange={(e) => setUpdatedDiscription(e.target.value)}
            rows={6}
            className="outline-none py-[6px] px-1 border-[3px]"
          ></textarea>
        </div>
        <button className="py-2 px-4 bg-blue-500 text-white text-[18px] font-semibold w-full rounded-lg border-2">
          التعديل الأن
        </button>
      </form>
    </>
  );
};

export default EditForm;
