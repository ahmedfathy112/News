import Image from "next/image";
import ClientsLogos from "../../../public/Clients Logos.png";
import "./homeDesign.css";

const ClientsSec = () => {
  return (
    <div className="w-full h-auto pt-5 pb-10 flex flex-col justify-center text-center max-md:mt-7">
      <h2 className="text-2xl font-semibold my-3">عملائنا المميزون</h2>
      <p className="text-[17px] font-semibold my-3 text-gray-400">
        لدينا مجموعه مميزه جدا من العملاء حول العالم
      </p>

      <Image
        alt="Client logos"
        src={ClientsLogos}
        className="mx-auto max-md:w-[90%]"
      ></Image>
    </div>
  );
};

export default ClientsSec;
