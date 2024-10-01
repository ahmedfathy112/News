"use client";
import Link from "next/link";
import { useState } from "react";
import { FaAppStoreIos } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { TiThMenuOutline } from "react-icons/ti";

interface NavBarProps {
  isAdmin: boolean;
}
const LoginBtns = ({ isAdmin }: NavBarProps) => {
  const [Toggle, setToggle] = useState(false);

  return (
    <>
      <div className="relative">
        <div
          className="menuBox fixed flex self-stretch flex-col py-5 px-6 w-[300px] h-full bg-[#088a08f2] z-10 left-0 top-0"
          id="MenuBox"
          style={{
            clipPath:
              (Toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
          }}
        >
          <div className="flex flex-row-reverse justify-between mb-5">
            <div className="flex flex-row text-white">
              <Link href="/" className="text-2xl font-semibold">
                صحيفة اليوم
              </Link>
              <FaAppStoreIos className="text-2xl my-auto mr-2" />
            </div>
            <MdCancel
              className="text-white right-0 text-3xl cursor-pointer"
              onClick={() => {
                setToggle(false);
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <Link
              href="/"
              className="text-[18px] text-white font-medium mr-2 mb-3 hover:bg-orange-400"
            >
              الرئيسية
            </Link>
            <Link
              href="/articles"
              className="text-[18px] text-white font-medium mr-2 mb-3 hover:bg-orange-400"
            >
              الأخبار
            </Link>
            {isAdmin && (
              <Link
                href="/adminPage"
                className="text-[18px] text-white font-medium mr-2 mb-3 hover:bg-orange-400"
              >
                لوحة التحكم
              </Link>
            )}
            <Link
              href="/about"
              className="text-[18px] text-white font-medium mr-2 mb-3 hover:bg-orange-400"
            >
              ماذا عنا؟
            </Link>
          </div>
        </div>
      </div>
      <div className=" flex justify-evenly max-md:justify-center max-md:flex-row-reverse w-[75%] max-md:w-full">
        <TiThMenuOutline
          className="text-3xl right-0 my-auto ml-2 menuHeader"
          onClick={() => {
            setToggle(true);
          }}
        />
        <div className="flex flex-row max-md:w-full max-md:justify-center max-md:-translate-y-1 max-md:mr-0">
          <Link href="/" className="text-2xl font-semibold">
            صحيفة اليوم
          </Link>
          <FaAppStoreIos className="text-2xl my-auto mr-2" />
        </div>
        <div className="max-md:hidden my-auto">
          <Link href="/" className="text-[16px] font-semibold mr-4">
            الرئيسيه
          </Link>
          <Link
            href="/articles?pageNumber=1"
            className="text-[16px] font-semibold mr-4"
          >
            الاخبار
          </Link>
          {isAdmin && (
            <Link href="/adminPage" className="text-[16px] font-semibold mr-4">
              لوحة التحكم
            </Link>
          )}
          <Link href="/about" className="text-[16px] font-semibold mr-4">
            ماذا عنا؟
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginBtns;
