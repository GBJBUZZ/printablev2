import React from "react";
import Image from "next/image";

export default function Categories() {
  const categories = [
    { img: "/H-1.png", content: "Business Cards" },
    { img: "/H-2.png", content: "Post Card & Advertising" },
    { img: "/H-3.png", content: "Banners & Posters" },
    { img: "/H-4.png", content: "Packing" },
    { img: "/H-5.png", content: "Promotional Products" },
    { img: "/H-6.png", content: "Stationary & Invitations" },
    { img: "/H-7.png", content: "View all" },
  ];

  return (
    <div >
      <div className="lg:pl-[200px] md:pl-[100px] sm:pl-[100px] pl-4 pb-30 bg-white">
        <div>
          <h1 className="text-black text-[32px] text-center lg:text-start md:text-start sm:text-start">
            Explore all Categories
          </h1>
          <div className="flex lg:justify-start justify-center lg:gap-24 gap-10 flex-wrap items-center pl-8">
            {categories.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center lg:h-[100px] md:h-[100px] sm:h-[100px] h-auto lg:w-[100px] md:w-[100px] sm:w-[100px] w-[150px] py-4 lg:mt-0 md:mt-0 sm:mt-0 mt-2"
              >
                <div className="lg:h-[160px] md:h-[180px] sm:h-[180px] h-auto lg:w-[160px] md:w-[180px] sm:w-[180px] w-[150px] rounded-full overflow-visible">
                  <Image
                    src={item.img}
                    alt={item.content}
                    height={100}
                    width={100}
                    className="h-auto w-full transform transition-transform duration-300 hover:scale-125 hover:z-10 hover:cursor-pointer"
                  />
                </div>
                <p className="text-center mt-4 text-black">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
