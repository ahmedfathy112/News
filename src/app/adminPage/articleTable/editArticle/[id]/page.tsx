import axios from "axios";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { verifyTokenForPages } from "../../../../utils/verifyToken";
import { Article } from "@prisma/client";
import { getSingleArticle } from "../../../../../apiCalls/ArticleApiCalls";
import EditForm from "./EditForm";
import AdminSidebar from "../../../AdminSidebar";

interface EditArticleProps {
  params: { id: string };
}
const EditArticle = async ({ params }: EditArticleProps) => {
  const token = cookies().get("JwtToken")?.value;
  if (!token) {
    redirect("/");
  }

  const payLoad = verifyTokenForPages(token);
  if (payLoad?.isAdmin === false) {
    redirect("/");
  }
  const articles: Article = await getSingleArticle(params.id);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex flex-row max-md:flex-col">
        <AdminSidebar />
        <div className="border-2 py-7 px-8 drop-shadow-xl max-md:px-4 w-[80%] max-md:w-full">
          <EditForm article={articles} />
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
