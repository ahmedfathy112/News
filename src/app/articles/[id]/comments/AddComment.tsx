"use client";
import { MdDelete, MdUpdate } from "react-icons/md";
import { CommentWithUser } from "../../../utils/types";
import UpdateComment from "./UpdateComment";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
interface commentProps {
  comment: CommentWithUser;
  userId: number | null;
}
const AddComment = ({ comment, userId }: commentProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const deleteComment = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${comment.id}`);
      router.refresh();
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="w-full bg-gray-200 py-3 px-5">
        <div className="w-[90%] bg-gray-100 py-3 px-5 mt-3 flex justify-between max-md:w-full">
          <div className="flex flex-col mb-4">
            <span className="text-[19px] font-semibold mt-2">
              {comment.user.userName}
            </span>
            <span className="font-medium text-[12px]">
              {new Date(comment.createdAt).toDateString()}
            </span>
            <p className="text-[16px] font-medium text-gray-500">
              {comment.CommentText}
            </p>
          </div>
          {userId && userId === comment.userId && (
            <div className="flex flex-row">
              <button
                title="delete comment!"
                className="text-2xl mr-4 text-red-600"
              >
                <MdDelete onClick={deleteComment} />
              </button>
              <button
                title="Update comment!"
                className="text-2xl mr-4 text-green-600"
                onClick={() => setOpen(true)}
              >
                <MdUpdate />
              </button>
            </div>
          )}
          {open && (
            <UpdateComment
              setOpen={setOpen}
              CommentText={comment.CommentText}
              commentId={comment.id}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddComment;
