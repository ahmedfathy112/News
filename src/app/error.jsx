"use client";

import Link from "next/link";

const errorPage = ({ error, reset }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[550px] h-[400px] bg-gray-200 text-center py-6 px-8 flex justify-center items-center flex-col rounded-lg">
        <h4 className="text-[55px] font-bold text-red-600">ERROR!</h4>
        <p className="text-xl font-semibold my-3">Some Thing Went Wrong</p>
        <p className="text-xl font-semibold my-3">{error.message}</p>
        <div className="w-full flex flex-row justify-evenly">
          <Link
            href="/"
            className="bg-blue-500 font-semibold py-3 px-5 rounded-lg my-3 text-white"
          >
            Go home
          </Link>
          <button
            onClick={() => reset()}
            className="bg-blue-500 font-semibold py-3 px-5 rounded-lg my-3 text-white"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default errorPage;
