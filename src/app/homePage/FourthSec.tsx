import Image from "next/image";
import FourthImage from "../../../public/FourthSec.png";

const FourthSec = () => {
  return (
    <div className="w-full flex flex-row justify-between max-md:flex-col">
      <div className="w-1/2 max-md:w-auto">
        <Image
          alt="image"
          src={FourthImage}
          className="w-[revert-layer]"
        ></Image>
      </div>
      <div className="w-1/2 translate-y-1/4 max-md:w-full max-md:translate-y-12">
        <h3 className="text-3xl font-bold my-3 text-center">
          ما وراء الكواليس: تجربة ثلاث سنوات في <br /> صحيفه اليوم
        </h3>
        <p className="text-[17px] font-semibold text-gray-400 text-right">
          خلال السنوات الثلاث الماضية، كانت رحلتنا مليئة بالتحديات والفرص لتقديم
          تغطية إخبارية شاملة وموضوعية. سعينا جاهدين لنقل الحقيقة بكل دقة وحياد،
          مع التركيز على تقديم التحليلات العميقة والتقارير الميدانية التي تلبي
          تطلعات جمهورنا. لقد حرصنا على متابعة آخر المستجدات من قلب الحدث، مع
          تسليط الضوء على القضايا التي تؤثر في مجتمعاتنا. مهمتنا لم تقتصر على
          نقل الأخبار فقط، بل أيضًا على تقديم رؤى وتحليلات تساعد القراء على فهم
          أعمق لما يجري حولهم. ومع كل قصة، كنا نلتزم بمبدأ الشفافية والمصداقية
          لضمان أن يكون الخبر بين يديك كما هو.
        </p>
      </div>
    </div>
  );
};

export default FourthSec;
