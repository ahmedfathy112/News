import Image from "next/image";
import ClientsLogos from "../../../public/Clients Logos.png";
import icon1 from "../../../public/icon.png";
import icon2 from "../../../public/icon2.png";
import icon3 from "../../../public/icon3.png";
const ManageSec = () => {
  return (
    <div className="w-full h-auto pt-5 pb-10 flex flex-col justify-center text-center">
      <h2 className="text-2xl font-semibold my-3">فئات الأخبار</h2>
      <p className="text-[17px] font-semibold my-3 text-gray-400">
        ماذا يقدم موقعنا؟
      </p>

      <div className="w-full flex flex-row flex-wrap justify-center my-5 max-md:flex-col">
        <div className="w-1/3 drop-shadow-md flex justify-center flex-col max-md:w-full">
          <Image
            alt="icon"
            src={icon1}
            className="w-[50px] h-[50px] mx-auto my-5"
          ></Image>
          <h2 className="text-xl font-semibold my-3">الأخبار الرياضية</h2>
          <p className="text-sm text-gray-400 font-semibold">
            نقدم لكم حصر شامل لجميع الاحداث الرياضيه حول العالم لكل عشاق الرياضة
          </p>
        </div>
        <div className="w-1/3 drop-shadow-md flex justify-center flex-col max-md:w-full">
          <Image
            alt="icon"
            src={icon2}
            className="w-[50px] h-[50px] mx-auto my-5"
          ></Image>
          <h2 className="text-xl font-semibold my-3">الأخبار السياسية</h2>
          <p className="text-sm text-gray-400 font-semibold">
            تغطية لجميع الاحداث السياسية التي تحدث حول العالم ستجدوها هنا
          </p>
        </div>
        <div className="w-1/3 drop-shadow-md flex justify-center flex-col max-md:w-full">
          <Image
            alt="icon"
            src={icon3}
            className="w-[50px] h-[50px] mx-auto my-5"
          ></Image>
          <h2 className="text-xl font-semibold my-3">الأخبار الاقتصادية</h2>
          <p className="text-sm text-gray-400 font-semibold">
            تغطيه لكافة الاخبار الاقتصادية حول العالم ستكون بين يديكم
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageSec;
