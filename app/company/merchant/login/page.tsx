"use client";

import React from 'react';
import Link from 'next/link';
// Note: Ensure you have installed next-auth: npm install next-auth
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      // triggers the Google OAuth flow
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col lg:flex-row bg-[#020631] bg-cover bg-center bg-no-repeat text-white font-sans p-6 lg:p-12 overflow-x-hidden"
      style={{ backgroundImage: "url('/loading Screen.png')" }} 
    >
      {/* LEFT SECTION: Branding */}
      <div className="lg:w-[40%] flex flex-col justify-between py-8 lg:pl-10 lg:pr-2">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Printable Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="text-4xl font-bold text-white tracking-tight">
              Printable
            </span>
          </div>

          <h1 className="text-4xl lg:text-4xl font-bold leading-tight mb-6 max-w-md">
            Increase Your Shop <br /> Productivity with Printable
          </h1>

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <h2 className="font-bold text-lg mb-1 text-white">Lorem Lorem ipsum</h2>
                <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.
                        Lorem ipsum Lorem ipsum Lorem ipsum.
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-12 text-sm text-gray-400">
          2025 Printable • All right Reserved
        </footer>
      </div>

      {/* RIGHT SECTION: Login Card */}
      <div className="lg:w-[60%] flex items-center justify-start lg:pl-8 mt-8 lg:mt-0">
        <div className="bg-white text-gray-900 w-full max-w-[720px] rounded-[3rem] px-8 lg:px-14 py-10 lg:py-14 shadow-2xl border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Login with Printable</h2>
            <p className="text-gray-500 text-sm">Welcome back! Select method to Log in</p>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 border border-gray-200 rounded-full py-2.5 hover:bg-gray-50 transition font-medium text-xs active:scale-95 shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
              Login with Google
            </button>
            
            <button type="button" className="flex items-center justify-center gap-2 border border-gray-200 rounded-full py-2.5 hover:bg-gray-50 transition font-medium text-xs active:scale-95 shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] lowercase font-medium">or continue with email/phone</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Email/Phone</label>
              <input 
                type="text" 
                placeholder="example@gmail.com" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#020631] outline-none text-sm transition-all bg-gray-50/30" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link href="/forgot-password" gap-2 className="text-[11px] text-blue-600 hover:underline">Forgot Password?</Link>
              </div>
              <input 
                type="password" 
                placeholder="enter strong password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#020631] outline-none text-sm transition-all bg-gray-50/30" 
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-[#020631] cursor-pointer" />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button 
                type="submit" 
                className="bg-[#020631] text-white font-bold py-3 px-12 rounded-xl hover:bg-black transition-all text-sm shadow-md active:scale-95"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            Don&apos;t have an account yet? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;