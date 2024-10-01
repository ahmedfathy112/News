import React from "react";
import AdminSidebar from "../AdminSidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPages } from "../../utils/verifyToken";
import DeleteComment from "./DeleteComment";
import { comment } from "@prisma/client";
import { error } from "console";

const CommentTable = async () => {
  const token = cookies().get("JwtToken")?.value;
  if (!token) {
    redirect("/");
  }
  const payLoad = verifyTokenForPages(token);
  if (payLoad?.isAdmin === false) {
    redirect("/");
  }

  const response = await fetch("http://localhost:3000/api/comments", {
    headers: { Cookie: `JwtToken=${token}` },
  });
  if (!response.ok) {
    throw new error("There is error in fetch comment!");
  }
  const comments: comment[] = await response.json();
  return (
    <div className="w-full h-screen ">
      <div className="w-full h-screen flex flex-row max-md:flex-col">
        {/* AdminSidebar with 10% width */}
        <div className="w-[20%] max-md:w-[100%]">
          <AdminSidebar />
        </div>

        {/* Content area with 90% width */}
        <div className="w-full md:w-[100%] flex justify-center items-center max-md:w-[95%]">
          <div className="container mx-auto px-4 md:px-0 max-md:w-fit">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left">ID</th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left ">
                    User Id
                  </th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left">
                    Comment Text
                  </th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left">
                    Published At
                  </th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id} className="border-b">
                    <td className="px-2 py-1 md:px-4 md:py-2">{comment.id}</td>
                    <td className="px-2 py-1 md:px-4 md:py-2">
                      {comment.userId}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2">
                      {comment.CommentText.slice(0, 30)}...
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2">
                      {new Date(comment.createdAt).toDateString()}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2">
                      <DeleteComment commentId={comment.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentTable;
