import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "./header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "صحيفه اليوم",
  description:
    "صحيفه اليوم للاطلاع علي كافه الاخبار السياسيه والرياضيه وغيرها حول العالم",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
