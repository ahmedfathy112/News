import Link from "next/link";
import notFoundImage from "../../public/notFoundeImage.png";
import Image from "next/image";
const notFoundPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex justify-center flex-col py-4 px-6 items-center">
        <Image src={notFoundImage} className="w-[450px] h-[350px] my-3"></Image>
        <p className="w-[50%] text-center my-3 font-medium">
          You must have picked the wrong door because i haven`t been able to lay
          my eye on the page you are serching for.
        </p>
        <Link
          href="/"
          className="bg-blue-500 font-medium text-white text-xl py-2 px-4 rounded-lg"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default notFoundPage;
