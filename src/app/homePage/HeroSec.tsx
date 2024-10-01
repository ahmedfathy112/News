import Link from "next/link";
import HeroImage from "../../../public/HeroImage.png";
import Image from "next/image";
const HeroSec = () => {
  return (
    <div className="w-full min-h-screen bg-[#F5F7FA] py-4 flex flex-row justify-around flex-wrap px-6">
      <div className=" h-full translate-y-1/2  text-left max-md:w-[95%] max-md:translate-x-[20px]">
        <h2 className="text-6xl text-right font-bold my-3 max-md:text-3xl">
          صحيفة اليوم <br />
          <span className="text-[#4CAF4F] mt-3">
            مصدرك الامن لمعرفه أخر <br /> الأخبار حول العالم
          </span>
        </h2>
        <p className="text-gray-400 font-semibold text-[16px] my-4 max-md:text-[14px] max-md:my-6 text-right">
          ماذا تنتظر ؟سجل الأن لتحصل علي جميع الاخبار حول العالم مجانا
        </p>
        <div className="flex justify-start">
          <Link
            href="/register"
            className="bg-[#4CAF4F] py-2 px-4 text-[17px] font-medium text-white"
          >
            سجل الأن
          </Link>
        </div>
      </div>
      <div className=" max-md:w-full">
        <Image
          alt="this home page image"
          src={HeroImage}
          className="w-fit mt-[50px] max-md:mt-0 max-md:w-[revert-layer]"
        ></Image>
      </div>
    </div>
  );
};

export default HeroSec;
