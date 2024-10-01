import Link from "next/link";
import { FaCommentAlt, FaTable } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const AdminSidebar = () => {
  return (
    <div className="w-auto py-3 px-4 h-screen border-r-2 drop-shadow-lg text-center max-md:flex max-md:justify-between max-md:w-[100%] max-md:h-auto">
      <Link
        href="/adminPage"
        className="flex flex-row-reverse justify-center items-center text-2xl font-bold text-center"
      >
        <MdDashboard className="mr-2 max-md:mr-0" />
        <h3 className="">
          لوحة <span className="text-orange-400">التحكم</span>
        </h3>
      </Link>
      <div className="flex flex-col justify-center items-center text-left my-auto h-[70%] max-md:flex-row max-md:h-auto">
        <Link
          href="/adminPage/articleTable?pageNumber=1"
          className="flex flex-row-reverse justify-center items-center my-3 py-2 px-3 bg-orange-500 text-white font-semibold text-[18px] w-[190px] text-center rounded-lg max-md:w-auto max-md:ml-3"
        >
          <FaTable className="mr-2 max-md:mr-0" />
          <h2 className="">المقالات</h2>
        </Link>
        <Link
          href="/adminPage/commentTable"
          className="flex flex-row-reverse justify-center items-center my-3 py-2 px-3 bg-orange-500 text-white font-semibold text-[18px] w-[190px] rounded-lg max-md:w-auto"
        >
          <FaCommentAlt className="mr-2 max-md:mr-0" />

          <h2 className="">التعليقات</h2>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
