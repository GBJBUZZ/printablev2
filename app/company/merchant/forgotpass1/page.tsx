"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// Optional: Using Lucide-React for the eye icons (npm install lucide-react)
import { Eye, EyeOff } from 'lucide-react';

const SetNewPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div 
      className="min-h-screen w-full flex flex-col bg-[#020631] bg-cover bg-center bg-no-repeat text-white font-sans p-6 lg:p-12"
      style={{ backgroundImage: "url('/loading Screen.png')" }} 
    >
      {/* LOGO SECTION */}
      <div className="mb-8 flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Printable Logo" 
          className="h-10 w-auto object-contain"
        />
        <span className="text-3xl font-bold text-white tracking-tight">
          Printable
        </span>
      </div>

      {/* CENTERED CARD SECTION */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white text-gray-900 w-full max-w-[600px] rounded-[2.5rem] p-8 lg:p-14 shadow-2xl border border-gray-100 text-left">
          
          <h2 className="text-2xl font-bold mb-3">Set a new password</h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-sm">
            Your previous password has been reseted. Please set a new password for your account.
          </p>

          {/* New Password Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Create Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Create Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  defaultValue="Test@1234"
                  className="w-full px-4 py-4 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#020631] outline-none text-sm transition-all bg-gray-50/30 font-medium" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Re-enter Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Re-enter Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  defaultValue="Test@1234"
                  className="w-full px-4 py-4 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#020631] outline-none text-sm transition-all bg-gray-50/30 font-medium" 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#020631] text-white font-bold py-4 rounded-full hover:bg-black transition-all text-sm shadow-md active:scale-[0.98] mt-4"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetNewPasswordPage;