'use client';

import Image from 'next/image';
import { FaStar, FaEllipsisH, FaRegThumbsUp, FaShare, FaTrashAlt } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Jay Vasani");
  const [dob, setDob] = useState("08/12/1999");
  const [email, setEmail] = useState("jxkvasani2909@gmail.com");
  const [mobile, setMobile] = useState("+91 9173664845");

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

const modalRef = useRef<HTMLDivElement>(null);
const otpRefs = useRef<HTMLInputElement[]>([]);

const [showAllReviews, setShowAllReviews] = useState(false);
const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
const menuRef = useRef<HTMLDivElement | null>(null);

const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setShowMenu(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


const reviews = [
  {
    shop: 'Print Master Shop',
    location: 'Wardha Locality',
    rating: 4.5,
    date: 'Jun 23, 2025',
    message: 'Prints are accurate and deliver on time',
  },
  {
    shop: 'Design Studio',
    location: 'Wardha Locality',
    rating: 4.0,
    date: 'One month ago',
    message: 'The black color print is very light shade and little dots are everywhere',
  },
  {
    shop: 'Copy Kart',
    location: 'Gandhi Chowk',
    rating: 4.8,
    date: 'Feb 3, 2025',
    message: 'Excellent service and friendly staff!',
  },
  {
    shop: 'Express Prints',
    location: 'City Mall',
    rating: 4.2,
    date: 'Jan 20, 2025',
    message: 'Decent print quality and quick turnaround.',
  },
];

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowOTPModal(false);
    }
  };

  if (showOTPModal) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showOTPModal]);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setActiveMenuIndex(null);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);





  return (
    <>
      <div className="min-h-screen w-full bg-white px-6 py-8 md:px-12 md:py-12 text-[#000000]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">My Account</h1>
            <p className="text-sm text-gray-600">Manage your account settings and personal information.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="bg-[#F4F7FA] rounded-xl p-6 shadow-sm md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit profile</h2>
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-1 border border-[#06044B] text-sm rounded-lg text-[#06044B] bg-white"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-1 bg-[#06044B] text-white text-sm rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1 border border-gray-400 text-sm rounded-lg hover:bg-gray-100"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <Image
                        src="/user-placeholder.jpg"
                        alt="Profile"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button className="bg-[#06044B] text-white px-4 py-1 rounded-md text-sm">Change</button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#FFFFFF] w-full rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">D.O.B</label>
                    <input
                      type="text"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="bg-[#FFFFFF] w-full rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#FFFFFF] w-full rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Mobile Number</label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="bg-[#FFFFFF] flex-1 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => setShowOTPModal(true)}
                        className="bg-[#06044B] text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Get OTP
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src="/user-placeholder.jpg"
                      alt="Profile"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-sm text-gray-700">{email}</p>
                    <p className="text-sm text-gray-700">{mobile}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Balance Section */}
            <div className="md:col-span-1">
              {!isEditing && (
                <div className="bg-[#F4F7FA] rounded-xl p-6 shadow-sm h-full">
                  <h2 className="text-lg font-semibold mb-4">PrintPay Balance</h2>
                  <p className="text-3xl font-bold">₹0</p>
                </div>
              )}
            </div>
          </div>

          {/* Reviews */}
{!isEditing && (
  <div className="bg-[#F4F7FA] rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">My Reviews</h2>
      <button
        className="text-sm font-medium text-gray-500 hover:underline"
        onClick={() => setShowAllReviews(!showAllReviews)}
      >
        {showAllReviews ? 'Show less' : 'View all'}
      </button>
    </div>

    {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review, idx) => (
  <div key={idx} className="flex gap-4 items-start mb-6">
    <Image
      src="/print-shop.jpg"
      alt="Shop"
      width={60}
      height={60}
      className="rounded-md object-cover"
    />
    <div className="flex-1 border-b pb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{review.shop}</h3>
          <p className="text-sm text-gray-500">{review.location}</p>
        </div>

        <div className="relative flex items-center gap-2 text-sm">
          {/* Rating */}
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1 font-semibold text-xs">
            {review.rating} <FaStar className="text-xs" />
          </span>

          {/* Date */}
          <span className="text-xs text-gray-500">{review.date}</span>

          {/* 3-Dots */}
          <FaEllipsisH
            className="text-gray-500 cursor-pointer"
            onClick={() =>
              setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
            }
          />

          {/* Dropdown Menu */}
          {activeMenuIndex === idx && (
            <div className="absolute top-6 right-0 bg-white  rounded-lg shadow-lg w-32 py-2 z-10">
              <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                <FaRegThumbsUp className="mr-2" /> Like
              </button>
              <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                <FaShare className="mr-2" /> Share
              </button>
              <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                <FaTrashAlt className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700">{review.message}</p>
    </div>
  </div>
))}
  </div>
)}

        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
  <div className="fixed inset-0 z-50 backdrop-brightness-75 flex items-center justify-center">
    <div
      ref={modalRef}
      className="bg-white rounded-lg p-6 shadow-md w-[90%] max-w-sm"
    >
      <h2 className="font-semibold text-lg mb-2 text-black text-center">Verify Phone</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">Code sent to {mobile}</p>

      <div className="flex justify-center gap-2 mb-4">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const val = e.target.value;
              if (!/^\d*$/.test(val)) return; // only allow digits
              const newOtp = [...otp];
              newOtp[idx] = val;
              setOtp(newOtp);

              if (val && idx < otp.length - 1) {
                otpRefs.current[idx + 1]?.focus();
              }
            }}
            ref={(el) => {
  if (el) otpRefs.current[idx] = el;
}}
            className="w-10 h-12 text-center rounded-md bg-[#F1EEFF] text-lg outline-none text-black"
          />
        ))}
      </div>

      <p className="text-sm text-gray-600 mb-4 text-center">
        Didn't receive code?{' '}
        <span className="text-black font-medium underline cursor-pointer">Request again</span>
      </p>

      <button
        onClick={() => {
          setShowOTPModal(false);
          setShowSuccessModal(true);
        }}
        className="bg-[#06044B] text-white py-2 rounded-md w-full"
      >
        Verify Phone Number
      </button>
    </div>
  </div>
)}
      
      
      {showSuccessModal && (
  <div className="fixed inset-0 z-50 backdrop-brightness-75 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 shadow-md text-center w-72">
      {/* Green Tick Image */}
      <div className="flex justify-center mb-4">
        <Image
          src="/Frame.png"
          alt="Success"
          width={64}
          height={64}
        />
      </div>

      <h2 className="text-lg font-semibold mb-2 text-black">Phone Number Changed!</h2>
      <button
        onClick={() => setShowSuccessModal(false)}
        className="bg-[#06044B] text-white px-6 py-2 rounded-lg text-sm mt-2"
      >
        Continue
      </button>
    </div>
  </div>
)}

    </>
  );
}
