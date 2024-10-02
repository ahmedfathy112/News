"use client";
import Image from "next/image";
import LoginImage from "../../../../public/loginImage.png";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "../../utils/constants";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const formHandelr = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("خطأ في البريد الالكتروني");
    }
    if (password === "") {
      toast.error("خطأ في كلمه السر");
    }
    try {
      await axios.post(`${DOMAIN}/api/users/login`, {
        email,
        password,
      });
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <div className="bg-[#080f2c] w-full h-full absolute -z-10">
        <Image
          alt="login image"
          src={LoginImage}
          className="w-full h-full"
        ></Image>
      </div>
      <div className="py-5 px-7 bg-white rounded-lg">
        <h2 className="my-3 font-semibold text-2xl text-center">
          تسجيل دخول لحسابك
        </h2>
        <form onSubmit={formHandelr}>
          <div className="flex flex-col text-left my-3">
            <label className="my-1 font-semibold text-[17px] text-right">
              البريد الالكتروني
            </label>
            <input
              title="setEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none py-[6px] px-1 border-[3px]"
            ></input>
          </div>
          <div className="flex flex-col text-left my-3">
            <label className="my-1 font-semibold text-[17px] text-right">
              كلمة السر
            </label>
            <input
              title="setPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none py-[6px] px-1 border-[3px]"
            ></input>
          </div>
          <button className="py-2 px-4 bg-blue-500 text-white text-[18px] font-semibold w-full rounded-lg border-2">
            تسجيل الدخول
          </button>
          <p className="my-4 text-gray-400 font-medium text-[17px] text-center">
            ليس لديك حساب؟
            <Link
              href="/register"
              className="text-blue-500 font-semibold cursor-pointer"
            >
              إنشاء حساب
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
