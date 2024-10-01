"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../../utils/constants";

interface DeleteArticleprops {
  commentId: number;
}
const DeleteComment = ({ commentId }: DeleteArticleprops) => {
  const router = useRouter();
  const deleteHandlar = async () => {
    try {
      await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
      toast.success("Comment deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <button
      onClick={deleteHandlar}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteComment;
