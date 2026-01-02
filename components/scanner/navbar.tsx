"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import ToolsDropDown from "@/components/Tools/ToolsDropDown";
import ConvertDropDown from "@/components/Convert/ConvertDropDown";
import { useState } from "react";
import MainLogo from "@/public/main-log"; // Assumes this is a React component

export default function NewNavBar() {
  const [activeDropdown, setActiveDropdown] = useState<
    "tools" | "convert" | "resources" | null
  >(null);

  const { isLoaded, isSignedIn } = useUser();

  return (
    <header className="w-full bg-[#edf1f4] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <MainLogo />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm text-black font-medium">
            <ToolsDropDown
              isOpen={activeDropdown === "tools"}
              onToggle={(open) =>
                setActiveDropdown(open ? "tools" : null)
              }
            />

            <ConvertDropDown
              isOpen={activeDropdown === "convert"}
              onToggle={(open) =>
                setActiveDropdown(open ? "convert" : null)
              }
            />

            <Link
              href="/print-and-deliver/print"
              className="hover:underline hover:text-[#06044B]"
            >
              Print & Deliver
            </Link>

            <Link
              href="/esign"
              className="hover:underline hover:text-[#06044B]"
            >
              E - Sign
            </Link>

            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "resources" ? null : "resources"
                )
              }
              className="hover:underline hover:text-[#06044B]"
            >
              Resources ▾
            </button>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {/* ✅ "Log in" button shows when signed out */}
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <button className="text-black hover:text-[#06044B]">
                Log in
              </button>
            </SignInButton>
          )}

          {/* ✅ Optional: show Clerk UserButton if logged in */}
          {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}

          {/* Download Button */}
          <Button className="bg-[#61E987] text-black hover:bg-[#4dd876] rounded-full px-5 py-2">
            <span className="mr-1 text-black text-xs">●</span> DOWNLOAD
          </Button>

          {/* Start for Free Button */}
          <Button className="bg-[#06044B] text-[#61E987] hover:bg-[#06044B]/90 rounded-full px-5 py-2">
            <span className="mr-1 text-[#61E987] text-xs">●</span> START FOR FREE
          </Button>
        </div>
      </div>
    </header>
  );
}