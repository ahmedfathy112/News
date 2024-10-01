"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SwiperNews() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/articles`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const windowWidth = window.innerWidth;
  return (
    <>
      <div className="my-6">
        <div className="w-full text-right font-semibold text-4xl pr-10 mb-6 max-md:text-center max-md:pr-0">
          اخر الاخبار
        </div>
        {(windowWidth <= 767 && (
          <Swiper
            slidesPerView={1.5}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {article.map((article) => (
              <SwiperSlide
                key={article.id}
                className="text-center py-3 px-6 bg-white drop-shadow-xl rounded-md flex flex-col w-fit min-h-[250px]"
              >
                <h2 className="text-center font-medium text-2xl mb-4">
                  {article.title}
                </h2>
                <p className="text-gray-400 font-medium text-[17px] my-4">
                  {article.body.slice(0, 60)}...
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="bg-green-600 py-2 px-6 rounded-md text-center w-full text-white"
                >
                  اقرأ المزيد
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )) || (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {article.map((article) => (
              <SwiperSlide
                key={article.id}
                className="text-center py-3 px-6 bg-white drop-shadow-xl rounded-md flex flex-col w-fit min-h-[250px]"
              >
                <h2 className="text-center font-medium text-2xl mb-4">
                  {article.title}
                </h2>
                <p className="text-gray-400 font-medium text-[17px] my-4">
                  {article.body.slice(0, 60)}...
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="bg-green-600 py-2 px-6 rounded-md text-center w-full text-white"
                >
                  اقرأ المزيد
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
