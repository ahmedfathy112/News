import Image from "next/image";
import LoginImage from "../../../../public/loginImage.png";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "./registerForm";
const RegisterPage = () => {
  const token = cookies().get("JwtToken")?.value;
  if (token) redirect("/");

  return (
    <div className="w-full h-[100vh] flex flex-row max-md:flex-col">
      <div className="w-1/2 bg-[#080f2c] relative max-md:w-full max-md:h-[350px]">
        <Image
          alt="register image"
          src={LoginImage}
          className="w-full h-full absolute"
        ></Image>
        <p className="text-left font-sans font-thin text-4xl text-white absolute bottom-[15%] left-1/4 leading-[80px]">
          Welcom, <br />
          Start Your Journey <br />
          Now With Us
        </p>
      </div>
      <div className="w-1/2 flex justify-center items-center max-md:w-full">
        <div className="w-[500px] max-md:w-auto">
          <h2 className="text-3xl font-bold my-4 text-center">إنشاء حساب</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
