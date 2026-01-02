import React from "react";

type PageCardCompomnentProps = {
  value: {
    name: string;
    address: string;
    rating: number;
    distance: string;
    services: string[];
    image: string;
  }[];
};

export default function PageCardComponent({ value }: PageCardCompomnentProps) {
  return (
    <div className="overflow-x-hidden">
      <div className="flex justify-start items-center overflow-x-hidden">
        <div
          className="lg:w-[1200px]  md:w-[800px] sm:w-[600px] w-[350px]  overflow-x-auto scrollbar-hide  py-4"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          <div className="flex gap-4 w-max">
            {value.map((shop, index) => (
              <div
                key={index}
                className="bg-[#E6E6ED] rounded-lg shadow-md overflow-hidden border border-gray-200 w-[220px] transition-transform transform hover:scale-102 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow-md">
                    {shop.distance}
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {shop.name}
                    </h3>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {shop.rating} ★
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{shop.address}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {shop.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
