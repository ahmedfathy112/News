import Link from "next/link";
import "./header.css";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "../utils/verifyToken";
import LoginBtns from "./NavBar";
import LogOut from "./LogoutBtn";

const Header = () => {
  const token = cookies().get("JwtToken")?.value || "";
  const user = verifyTokenForPages(token);
  return (
    <>
      <header className="w-full border-b-2 pb-3 relative">
        <nav className="w-full flex justify-evenly py-4 px-8 max-md:flex-col max-md:justify-center">
          <LoginBtns isAdmin={user?.isAdmin || false} />
          <div className="max-md:mt-4">
            {user ? (
              <>
                <div className="flex max-md:justify-center max-md:mt-2">
                  <h2 className="ml-3 font-semibold my-auto">
                    مرحبا, {user.userName}
                  </h2>
                  <LogOut />
                </div>
              </>
            ) : (
              <>
                <div className="max-md:hidden">
                  <Link
                    href="/login"
                    className="py-1 px-4 rounded-lg bg-blue-500 text-white text-[18px] font-semibold mr-3 mt-auto"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="py-1 px-4 rounded-lg bg-blue-500 text-white text-[18px] font-semibold mr-3 mt-auto"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
