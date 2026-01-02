"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

// Dummy link generator
const generateLink = (text: string) =>
  "/" +
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

// Footer links
const Footer = [
  {
    Heading: "AI PDF",
    NavLink: [
      "Chat with PDF",
      "AI PDF Summarizer",
      "Translate PDF",
      "AI Questions Generator",
    ],
  },
  {
    Heading: "VIEW & EDIT",
    NavLink: [
      "Edit PDF",
      "Annote PDF",
      "PDF Reader",
      "Number Pages",
      "Crop PDF",
      "Redact PDF",
      "Watermark PDF",
    ],
  },
  {
    Heading: "ORGANIZE",
    NavLink: [
      "Merge PDF",
      "",
      "Split PDF",
      "Rotate PDF",
      "Delete Pages",
      "Extract PDF Pages",
      "Organize PDF",
    ],
  },
  {
    Heading: "CONVERT FROM PDF",
    NavLink: ["PDF To Word", "", "PDF to Excel", "PDF to PPT", "PDF to JPG"],
  },
  {
    Heading: "CONVERT TO PDF",
    NavLink: [
      "Word to PDF",
      "",
      "Excel to PDF",
      "PPT to PDF",
      "JPG to PDF",
      "PDF to OCR",
    ],
  },
  {
    Heading: "AI PRESENTATION MAKER",
    NavLink: ["Generate PPT"],
    additionalContent: [
      {
        Heading: "SIGN",
        NavLink: ["Sign PDF"],
      },
      {
        Heading: "COMPRESS",
        NavLink: ["Compress PDF"],
      },
      {
        Heading: "SCAN",
        NavLink: ["PDF Scanner"],
      },
      {
        Heading: "PDF SECURITY",
        NavLink: ["Unlock PDF", "Protect PDF", "Flat PDF"],
      },
    ],
  },
];

const links = [
  {
    Heading: "SERVICE & TOOLS",
    NavLink: [
      "Print & Deliver",
      "PDF Converter",
      "E-Sign",
      "Printable Market Place",
      "PDF Scanner",
    ],
  },
  {
    Heading: "COMPANY",
    NavLink: ["About Us", "Contact Us", "Blogs", "Career", "Case Studies"],
  },
  {
    Heading: "MORE",
    NavLink: [
      "Partner with us",
      "Become Merchant",
      "Support Docs",
      "Terms of use",
      "Privacy Policy",
    ],
  },
];

export default function FooterSection() {
  return (
    <div>
      <div className="overflow-x-hidden bg-[#EFFDF3] lg:px-[200px] md:px-[100px] sm:px-[100px] px-4">
        <footer className="bg-[#EFFDF3] py-10  overflow-x-hidden">
          <div className="w-full  flex flex-wrap lg:gap-14 gap-4  mx-auto overflow-x-hidden">
            {Footer.map((section, idx) => (
              <div key={idx} className="min-w-[120px]">
                <h3 className="text-sm font-semibold mb-3 text-black">
                  {section.Heading}
                </h3>
                <ul className="space-y-2 mb-4">
                  {section.NavLink.filter(Boolean).map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={generateLink(link)}>
                        <span className="text-gray-700 hover:text-black cursor-pointer text-[12px]">
                          {link}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {section.additionalContent?.map((subSection, subIdx) => (
                  <div key={subIdx} className="mb-4">
                    <h4 className="text-xs font-medium text-black mb-2">
                      {subSection.Heading}
                    </h4>
                    <ul className="space-y-1">
                      {subSection.NavLink.filter(Boolean).map(
                        (link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link href={generateLink(link)}>
                              <span className="text-gray-700 hover:text-black cursor-pointer text-[12px]">
                                {link}
                              </span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </footer>
        <hr className="text-gray-500 py-2" />

        {/* Flex container for Printable and Sample sections */}
        <div className="flex flex-wrap justify-between overflow-x-hidden px-4">
          {/* Left: Printable */}
          <div className="overflow-x-hidden">
            <div className="flex gap-2">
              <div className="h-[50px] w-[50px]">
                <Image
                  src="/printable-Logo.png"
                  alt="Printable Logo"
                  height={100}
                  width={100}
                  className="h-auto w-full"
                />
              </div>
              <div>
                <p className="text-black font-semibold text-[20px]">
                  Printable
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-black">Print</p>
              <GoDotFill className="text-black" />
              <p className="text-black">Anytime</p>
              <GoDotFill className="text-black" />
              <p className="text-black">Anywhere</p>
            </div>

            <div>
              <p className="text-black py-4">Printable Mobile App</p>
              <div className="flex gap-2">
                <div className="flex items-center mb-10">
                  <button className="bg-black text-white px-4 rounded-[10px] hover:cursor-pointer">
                    <div className="flex gap-2">
                      <div className="h-[50px] w-[20px] flex items-center">
                        <Image
                          src="/Playstore.png"
                          alt="Playstore logo"
                          height={100}
                          width={100}
                          className="h-auto w-full"
                        />
                      </div>
                      <div>
                        <div className="text-[12px] h-[10px] w-full mt-1">
                          GET IT ON
                        </div>
                        <div className="h-auto w-full mt-1 font-semibold">
                          Google Play
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center mb-10">
                  <button className="bg-black text-white px-4 rounded-[10px] hover:cursor-pointer">
                    <div className="flex gap-2">
                      <div className="h-[50px] w-[20px] flex items-center">
                        <Image
                          src="/Apple.png"
                          alt="Apple logo"
                          height={100}
                          width={100}
                          className="h-auto w-full"
                        />
                      </div>
                      <div>
                        <div className="text-[12px] h-[10px] w-full mt-1">
                          Download on the
                        </div>
                        <div className="h-auto w-full mt-1 font-semibold">
                          App Store
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-wrap gap-4 overflow-x-hidden">
            {links.map((section, idx) => (
              <div key={idx} className="min-w-[150px]">
                <h3 className="text-sm font-semibold mb-3 text-black">
                  {section.Heading}
                </h3>
                <ul className="space-y-2">
                  {section.NavLink.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={generateLink(link)}>
                        <span className="text-gray-700 hover:text-black cursor-pointer text-[12px]">
                          {link}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="w-full h-auto lg:px-[200px] md:px-[100px] sm:px-[100px] px-0 py-6 bg-[#06044B]">
          <div className="flex lg:justify-between md:justify-between sm:justify-between justify-center flex-wrap items-center gap-4 px-2">
            <div className="flex items-center gap-1 text-white lg:text-sm md:text-sm sm:text-sm text-[12px]">
              <p>2025 Printable</p>
              <GoDotFill className="text-white" />
              <p>All Right Reserved</p>
            </div>

            <div className="mt-4 lg:mt-0 md:mt-0 sm:mt-0">
              <div className="flex gap-4  items-center">
                <Link href="https://www.instagram.com" target="_blank">
                  <FaInstagram
                    size={20}
                    className="text-white hover:cursor-pointer"
                  />
                </Link>
                <Link href="https://www.facebook.com" target="_blank">
                  <FaFacebook
                    size={20}
                    className="text-white hover:cursor-pointer"
                  />
                </Link>
                <Link href="https://www.linkedin.com" target="_blank">
                  <FaLinkedin
                    size={20}
                    className="text-white hover:cursor-pointer"
                  />
                </Link>
                <Link href="https://www.twitter.com" target="_blank">
                  <BsTwitterX
                    size={20}
                    className="text-white hover:cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
