"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
import { DOMAIN } from "../utils/constants";

export default function LogOut() {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        title="LogOut"
        onClick={logoutHandler}
        className="py-1 px-5 font-medium text-[18px] bg-green-500 text-white rounded-lg"
      >
        <FaSignOutAlt />
      </button>
    </>
  );
}
