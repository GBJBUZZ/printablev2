"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Settings,
  Bell,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import MainLogo from "@/public/main-log";
import { IoIosArrowDown } from "react-icons/io";

// Dropdown Components
import Tools from "@/components/Navbar/Tools/page";
import Convert from "@/components/Navbar/Convert/page";
import Resources from "@/components/Navbar/Resources/page";

export function NavBar() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔥 INSTANT REDIRECT AFTER LOGIN
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/home");
    }
  }, [isSignedIn, router]);

  if (!mounted) return null;

  const toggleMobileDropdown = (item: string) => {
    setMobileDropdown(mobileDropdown === item ? null : item);
  };

  return (
    <header
      className={`w-full z-50 relative ${
        isSignedIn
          ? "bg-[#06044b] text-white"
          : "bg-white text-black lg:px-[200px]"
      }`}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Nav */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <MainLogo />
            </Link>

            <nav className="hidden md:flex md:space-x-6 items-center lg:ml-8">
              <span
                className="cursor-pointer hover:text-[#61e987] flex items-center gap-2"
                onMouseEnter={() => setHoveredItem("tools")}
              >
                Tools
                <span
                  className={`transition-transform duration-300 ${
                    hoveredItem === "tools" ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              </span>

              <span
                className="cursor-pointer hover:text-[#61e987] flex items-center gap-2"
                onMouseEnter={() => setHoveredItem("convert")}
              >
                Convert
                <span
                  className={`transition-transform duration-300 ${
                    hoveredItem === "convert" ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              </span>

              <Link
                href="/esign"
                className="px-1 py-2 text-sm font-medium hover:text-[#61e987]"
              >
                E - Sign
              </Link>

              <Link
                href={`/print-and-deliver/print`}
                className="px-1 py-2 text-sm font-medium hover:text-[#61e987]"
              >
                Print & Deliver
              </Link>

              <span
                className="cursor-pointer hover:text-[#61e987]"
                onMouseEnter={() => setHoveredItem("resources")}
              >
                Resources
              </span>
            </nav>
          </div>

          {/* Right Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <SignedIn>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-white text-black rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#61e987]"
                />
              </div>

              {[Settings, Bell, ShoppingBag].map((Icon, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-[#06044b]/50"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </SignedIn>

            <SignedOut>
              <div className="flex gap-3">
                <SignInButton>
                  <Button variant="ghost" className="text-black cursor-pointer">
                    Login
                  </Button>
                </SignInButton>

                <Button
                  variant="ghost"
                  className="text-[#06044B] bg-[#61E987] cursor-pointer"
                >
                  DOWNLOAD
                </Button>

                <Button
                  variant="ghost"
                  className="text-[#61E987] bg-[#06044B] cursor-pointer"
                >
                  START FOR FREE
                </Button>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" size="sm" className="text-white">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Dropdowns */}
      {hoveredItem && (
        <div
          className="absolute top-full left-0 w-full bg-white text-black shadow-lg z-40"
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === "tools" && <Tools />}
          {hoveredItem === "convert" && <Convert />}
          {hoveredItem === "resources" && <Resources />}
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#06044b] border-t border-white/10 py-2">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div>
              <button
                onClick={() => toggleMobileDropdown("tools")}
                className="w-full text-left flex justify-between items-center px-3 py-2 text-base font-medium hover:bg-[#06044b]/50 rounded-md"
              >
                Tools <ChevronDown className="w-4 h-4" />
              </button>
              {mobileDropdown === "tools" && <Tools />}
            </div>

            <div>
              <button
                onClick={() => toggleMobileDropdown("convert")}
                className="w-full text-left flex justify-between items-center px-3 py-2 text-base font-medium hover:bg-[#06044b]/50 rounded-md"
              >
                Convert <ChevronDown className="w-4 h-4" />
              </button>
              {mobileDropdown === "convert" && <Convert />}
            </div>

            <Link
              href="/esign"
              className="block px-3 py-2 text-base font-medium hover:bg-[#06044b]/50 rounded-md"
            >
              E - Sign
            </Link>

            <Link
              href={`/print-and-deliver/print`}
              className="block px-3 py-2 text-base font-medium hover:bg-[#06044b]/50 rounded-md"
            >
              Print & Deliver
            </Link>

            <div>
              <button
                onClick={() => toggleMobileDropdown("resources")}
                className="w-full text-left flex justify-between items-center px-3 py-2 text-base font-medium hover:bg-[#06044b]/50 rounded-md"
              >
                Resources <ChevronDown className="w-4 h-4" />
              </button>
              {mobileDropdown === "resources" && <Resources />}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
