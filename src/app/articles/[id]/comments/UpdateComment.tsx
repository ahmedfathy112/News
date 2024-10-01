import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { MdCancel } from "react-icons/md";

interface UpdateCommentProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  CommentText: string;
  commentId: number;
}

const UpdateComment = ({
  setOpen,
  commentId,
  CommentText,
}: UpdateCommentProps) => {
  const [updatedText, setUpdatedText] = useState(CommentText);
  const router = useRouter();
  const formHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (updatedText === "") return toast.error("please write any thing!");
    try {
      await axios.put(`http://localhost:3000/api/comments/${commentId}`, {
        CommentText: updatedText,
      });
      setUpdatedText("");
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000db] w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-[50%] rounded-lg bg-white py-4 px-6 h-[250px] justify-between max-md:w-[80%]">
        <div className="w-full text-right">
          <MdCancel
            onClick={() => setOpen(false)}
            className="text-red-600 text-2xl cursor-pointer text-right"
          />
        </div>
        <form onSubmit={formHandler} className="w-full">
          <input
            type="text"
            placeholder="Update comment..."
            className="w-full py-1 px-2 outline-none border-2 mb-7"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          ></input>
          <button
            type="submit"
            title="edit the comment"
            className="w-full py-2 px-4 bg-green-600 text-white text-center"
          >
            تعديل
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
