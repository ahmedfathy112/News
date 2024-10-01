import React from "react";

const AboutHero = () => {
  return (
    <div className="bg-gray-200 w-full h-screen max-md:h-svh">
      <div className="flex flex-col translate-x-12 translate-y-[75%] w-1/2 max-md:w-full max-md:translate-y-11 max-md:translate-x-0 max-md:px-3">
        <h2 className="abouthead text-5xl font-bold my-2 max-md:text-4xl">
          What is Next and <br />
          how valid is it?
        </h2>
        <p className="text-gray-600 font-semibold text-[17px] max-md:text-[15px]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
          voluptatem laborum ipsum, blanditiis recusandae porro quia laudantium
          tempore eos. Dolores, fugit rem quo perferendis animi officia pariatur
          veniam ipsam magnam sequi, inventore, laborum illum velit.
        </p>
        <div>
          <button className="py-2 px-3 text-white bg-green-600 mr-6 my-3 font-semibold">
            Buy Products
          </button>
          <button className="py-2 px-3 text-black mr-6 my-3 font-semibold border-2">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
