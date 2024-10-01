import AdminSidebar from "./AdminSidebar";
import { cookies } from "next/headers";
import { verifyToken, verifyTokenForPages } from "../utils/verifyToken";
import ArticleForm from "./ArticleForm";
import { redirect } from "next/navigation";

const AdminPage = () => {
  const token = cookies().get("JwtToken")?.value;
  if (!token) {
    redirect("/");
  }
  const payLoad = verifyTokenForPages(token);
  if (payLoad?.isAdmin === false) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen max-md:flex max-md:flex-col">
      <div className="w-full h-screen flex flex-row max-md:flex-col">
        <div className="max-md:w-[100%]">
          <AdminSidebar />
        </div>
        <div className="w-[80%] flex justify-center items-center max-md:w-[100%]">
          <ArticleForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
