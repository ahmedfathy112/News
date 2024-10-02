import React from "react";
import Link from "next/link";

const AboutHero = () => {
  return (
    <div className="bg-gray-200 w-full h-screen max-md:h-svh">
      <div className="flex flex-col -translate-x-12 translate-y-[75%] w-1/2 max-md:w-full max-md:translate-y-11 max-md:-translate-x-0 max-md:px-3">
        <h2 className="abouthead text-5xl font-bold my-2 max-md:text-4xl">
          ما هي صحيفه اليوم <br />{" "}
          <span className="text-green-700 mt-4">وما هي قيمتها؟</span>
        </h2>
        <p className="text-gray-600 font-semibold text-[17px] max-md:text-[15px]">
          نحن فريق متخصص في تقديم أحدث الأخبار والمستجدات في مختلف المجالات، بما
          في ذلك الأخبار المحلية، والعالمية، والاقتصادية، والثقافية، والرياضية،
          والتكنولوجية. نسعى دائمًا إلى تقديم محتوى دقيق وموثوق، ونهدف إلى تزويد
          قرائنا بالمعلومات الهامة والتحليلات العميقة التي تساعدهم على فهم ما
          يحدث حولهم. من خلال فريقنا المحترف من الصحفيين والمحررين، نضمن توفير
          تغطية شاملة للأحداث الجارية، مع الحفاظ على أعلى معايير النزاهة
          والمصداقية في تقديم الأخبار. كما نلتزم بتحديث موقعنا باستمرار لضمان
          حصولك على أحدث الأخبار أولاً بأول. شكرًا لكم على ثقتكم بنا، ونتطلع إلى
          أن نكون مصدرًا موثوقًا للمعلومات التي تهمكم.
        </p>
        <div className="mt-5">
          <Link
            href="/articles"
            className="py-2 px-3 text-white rounded bg-green-600 mr-6 my-3  font-semibold"
          >
            تابع الاخبار
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
