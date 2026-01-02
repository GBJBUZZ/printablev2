'use client';

import Image from 'next/image';
import { FaStar, FaBookmark, FaPrint } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';

interface Shop {
  name: string;
  address: string;
  distance: string;
  time: string;
  rating: string;
  tags: string[];
  image: string;
}

const shops: Shop[] = Array(3).fill({
  name: 'Print Master Shop',
  address: '123 Main St, New York, NY 10001',
  distance: '1.2 km',
  time: '15 mins',
  rating: '4.5',
  tags: ['Poster Printing', 'Business Cards', 'Photo Books', 'Document Printing', 'Business Cards'],
  image: '/shop.png',
});

export default function Favorites() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">Favorites</h1>
        <p className="text-gray-500 mt-1 mb-6">
          Your collection of saved templates and printable shops.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />

                {/* Bottom left print time + distance */}
                <div className="absolute bottom-2 left-2 bg-white text-sm px-2 py-1 rounded-full flex items-center gap-1 shadow">
                  <FaPrint className="text-gray-600" />
                  <span>{shop.time} • {shop.distance}</span>
                </div>

                {/* Top right action buttons */}
                <div className="absolute top-2 right-2 flex gap-2 items-center">
                  {/* Share Icon – plain black arrow */}
                  <button className="hover:opacity-80 transition">
                    <IoIosShareAlt className="text-black w-5 h-5" />
                  </button>

                  {/* Save Icon – in white circle */}
                  <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                    <FaBookmark className="text-gray-600 w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-900">{shop.name}</h2>
                  <div className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-2 py-0.5 rounded-full">
                    {shop.rating}
                    <FaStar className="ml-1 text-green-500" />
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-1 truncate">{shop.address}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {shop.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full mt-4 text-green-700 border border-green-300 hover:bg-green-50 transition py-2 rounded-lg text-sm font-medium">
                  Select Shop
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
