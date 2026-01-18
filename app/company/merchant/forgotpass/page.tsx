"use client";

import React from 'react';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col bg-[#020631] bg-cover bg-center bg-no-repeat text-white font-sans p-6 lg:p-12"
      // Ensure this matches the image path in your public folder
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
          
          <h2 className="text-2xl font-bold mb-3">Forgot your password?</h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Don&apos;t worry, happens to all of us. Enter your email or phone below to recover your password
          </p>

          {/* Recovery Form */}
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email/Phone</label>
              <input 
                type="text" 
                placeholder="John" 
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#020631] outline-none text-sm transition-all bg-gray-50/30" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#020631] text-white font-bold py-4 rounded-full hover:bg-black transition-all text-sm shadow-md active:scale-[0.98]"
            >
              Get Code
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-left">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;