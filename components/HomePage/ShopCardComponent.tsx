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
import React from "react";

export default function PageCardComponent({ value }: PageCardCompomnentProps) {
  const shops = value;
  return (
    <div className="flex flex-wrap justify-center gap-4 ">
      {shops.map((shop, index) => (
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
  );
}
