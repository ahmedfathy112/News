"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../../utils/constants";

const RegisterForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUser] = useState();
  const router = useRouter();
  const formHandelr = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Error in email");
    }
    if (userName === "") {
      toast.error("Error in userName");
    }
    if (password === "") {
      toast.error("Error in password");
    }
    try {
      await axios.post(`${DOMAIN}/api/users/register`, {
        email,
        password,
        userName,
      });

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={formHandelr}>
      <div className="flex flex-col text-left my-3">
        <label className="my-1 font-semibold text-[17px] text-right">
          أسم المستخدم
        </label>
        <input
          title="userName"
          onChange={(e: any) => setUser(e.target.value)}
          type="text"
          className="outline-none py-[6px] px-1 border-[3px]"
        ></input>
      </div>
      <div className="flex flex-col text-left my-3">
        <label className="my-1 font-semibold text-[17px] text-right">
          البريد الالكتروني
        </label>
        <input
          title="email"
          onChange={(e: any) => setEmail(e.target.value)}
          type="email"
          className="outline-none py-[6px] px-1 border-[3px]"
        ></input>
      </div>
      <div className="flex flex-col text-left my-3">
        <label className="my-1 font-semibold text-[17px] text-right">
          كلمة السر
        </label>
        <input
          title="password"
          onChange={(e: any) => setPassword(e.target.value)}
          type="password"
          className="outline-none py-[6px] px-1 border-[3px]"
        ></input>
      </div>
      <button className="py-2 px-4 bg-blue-500 text-white text-[18px] font-semibold w-full rounded-lg border-2">
        أنشئ حساب
      </button>
      <p className="my-4 text-gray-400 font-medium text-[17px] text-center">
        لديك حساب بالفعل؟
        <Link
          href="/login"
          className="text-blue-500 font-semibold cursor-pointer"
        >
          تسجيل دخول
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
