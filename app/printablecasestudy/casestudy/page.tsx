"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown, Play } from 'lucide-react';
import { GoDotFill } from "react-icons/go";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

// --- HELPERS FROM YOUR CODE ---
const generateLink = (text: string) =>
  "/" +
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

// --- DATA FROM YOUR CODE ---
const FooterData = [
  {
    Heading: "AI PDF",
    NavLink: ["Chat with PDF", "AI PDF Summarizer", "Translate PDF", "AI Questions Generator"],
  },
  {
    Heading: "VIEW & EDIT",
    NavLink: ["Edit PDF", "Annote PDF", "PDF Reader", "Number Pages", "Crop PDF", "Redact PDF", "Watermark PDF"],
  },
  {
    Heading: "ORGANIZE",
    NavLink: ["Merge PDF", "Split PDF", "Rotate PDF", "Delete Pages", "Extract PDF Pages", "Organize PDF"],
  },
  {
    Heading: "CONVERT FROM PDF",
    NavLink: ["PDF To Word", "PDF to Excel", "PDF to PPT", "PDF to JPG"],
  },
  {
    Heading: "CONVERT TO PDF",
    NavLink: ["Word to PDF", "Excel to PDF", "PPT to PDF", "JPG to PDF", "PDF to OCR"],
  },
  {
    Heading: "AI PRESENTATION MAKER",
    NavLink: ["Generate PPT"],
    additionalContent: [
      { Heading: "SIGN", NavLink: ["Sign PDF"] },
      { Heading: "COMPRESS", NavLink: ["Compress PDF"] },
      { Heading: "SCAN", NavLink: ["PDF Scanner"] },
      { Heading: "PDF SECURITY", NavLink: ["Unlock PDF", "Protect PDF", "Flat PDF"] },
    ],
  },
];

const sideLinks = [
  { Heading: "SERVICE & TOOLS", NavLink: ["Print & Deliver", "PDF Converter", "E-Sign", "Printable Market Place", "PDF Scanner"] },
  { Heading: "COMPANY", NavLink: ["About Us", "Contact Us", "Blogs", "Career", "Case Studies"] },
  { Heading: "MORE", NavLink: ["Partner with us", "Become Merchant", "Support Docs", "Terms of use", "Privacy Policy"] },
];

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const articles = [
    { title: 'Getting Started With Printable', src: "/article-1.png" },
    { title: 'Creating and Publishing your first Product', src: "/article-2.png" },
    { title: 'Connecting Your Store', src: "/article-3.png" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      
      {/* --- SECTION 1: HERO --- */}
      <section className="relative h-[500px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/1.png" alt="Hero BG" className="w-full h-full object-cover" />
          <div className="absolute inset-0 opacity-50 bg-black"></div>
        </div>
        <div className="relative z-10 w-full max-w-2xl text-white">
            
         
        </div>
      </section>

          <section className="max-w-7xl mx-auto py-16 px-6">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Success Stories</h2>
        <div className="w-full h-[400px] rounded-xl overflow-hidden relative shadow-sm">
          <img src="/2.png" className="w-full h-full object-cover" />
        </div>
      </section>

     <section className="max-w-7xl mx-auto py-12 px-6">
  {/* Flex container to align heading and button */}
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold text-gray-800">More Success Stories</h2>
    <Link href="/printablecasestudy/casestudyextended">
      <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
        View all &rarr;
      </button>
    </Link>
  </div>

  <div className="aspect-video bg-gray-200 rounded-lg mb-8 overflow-hidden w-full max-w-8xl mx-auto">
    <img src="/3.png" className="w-full h-full object-cover" alt="Popular" />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {articles.map((article, idx) => (
      <div key={idx} className="group cursor-pointer border-l-2 border-gray-100 pl-4 hover:border-[#0A054F] transition-all">
        <h3 className="text-lg font-bold group-hover:text-[#0A054F] transition-colors">{article.title}</h3>
        <p className="text-sm text-gray-500 mt-1">View details</p>
      </div>
    ))}
  </div>
</section>

      <section className="max-w-7xl mx-auto py-4 px-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Visual Storytelling</h2>
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer shadow-md max-w-8xl mx-auto">
          <img src="/4.png" alt="Video" className="absolute inset-0 w-full h-full object-cover" />
        </div>
          </section>
          
          <section className="max-w-7xl mx-auto px-6 py-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Testinonials</h2>
        <div className="relative h-[400px] rounded-[2rem] overflow-hidden flex items-center px-12 md:px-20 shadow-xl">
          <div className="absolute inset-0">
            <img src="/5.png" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-white max-w-lg">
              
          </div>
        </div>
      </section>
      
          <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="relative h-[400px] rounded-[2rem] overflow-hidden flex items-center px-12 md:px-20 shadow-xl">
          <div className="absolute inset-0">
            <img src="/6.png" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-white max-w-lg">
              
          </div>
        </div>
      </section>
      
      <div className="overflow-x-hidden bg-[#EFFDF3] lg:px-[200px] md:px-[100px] sm:px-[100px] px-4 border-t border-gray-200">
        <footer className="py-10">
          <div className="w-full flex flex-wrap lg:gap-14 gap-4 mx-auto">
            {FooterData.map((section, idx) => (
              <div key={idx} className="min-w-[120px]">
                <h3 className="text-sm font-semibold mb-3 text-black uppercase">{section.Heading}</h3>
                <ul className="space-y-2 mb-4">
                  {section.NavLink.filter(Boolean).map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={generateLink(link)}>
                        <span className="text-gray-700 hover:text-black cursor-pointer text-[12px]">{link}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {section.additionalContent?.map((subSection, subIdx) => (
                  <div key={subIdx} className="mb-4">
                    <h4 className="text-xs font-medium text-black mb-2 uppercase">{subSection.Heading}</h4>
                    <ul className="space-y-1">
                      {subSection.NavLink.filter(Boolean).map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link href={generateLink(link)}>
                            <span className="text-gray-700 hover:text-black cursor-pointer text-[12px]">{link}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </footer>

        <hr className="text-gray-300 py-2" />

        <div className="flex flex-wrap justify-between pb-10">
          {/* Logo & Mobile App Section */}
          <div className="mb-8 lg:mb-0">
            <div className="flex gap-2 items-center mb-4">
              <div className="h-[40px] w-[40px] relative">
                <Image src="/printable-Logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <p className="text-black font-semibold text-[20px]">Printable</p>
            </div>
            <div className="flex gap-2 items-center text-sm mb-6">
              <p>Print</p><GoDotFill size={10}/><p>Anytime</p><GoDotFill size={10}/><p>Anywhere</p>
            </div>
            <p className="text-black mb-4 font-medium">Printable Mobile App</p>
            <div className="flex gap-4">
              <button className="bg-black text-white px-4 py-1 rounded-[10px] flex gap-2 items-center hover:opacity-80 transition-all">
                <Image src="/Playstore.png" alt="Playstore" height={20} width={20} />
                <div className="text-left"><p className="text-[10px]">GET IT ON</p><p className="font-semibold text-sm">Google Play</p></div>
              </button>
              <button className="bg-black text-white px-4 py-1 rounded-[10px] flex gap-2 items-center hover:opacity-80 transition-all">
                <Image src="/Apple.png" alt="Apple" height={20} width={20} />
                <div className="text-left"><p className="text-[10px]">Download on the</p><p className="font-semibold text-sm">App Store</p></div>
              </button>
            </div>
          </div>

          {/* Right Links Section */}
          <div className="flex flex-wrap gap-8 lg:gap-16">
            {sideLinks.map((section, idx) => (
              <div key={idx} className="min-w-[140px]">
                <h3 className="text-sm font-semibold mb-4 text-black uppercase">{section.Heading}</h3>
                <ul className="space-y-3">
                  {section.NavLink.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={generateLink(link)}>
                        <span className="text-gray-600 hover:text-black cursor-pointer text-[12px]">{link}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- DARK BOTTOM BAR --- */}
      <div className="w-full bg-[#06044B] lg:px-[200px] md:px-[100px] px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white text-[12px] sm:text-sm">
            <p>2025 Printable</p>
            <GoDotFill size={8} />
            <p>All Rights Reserved</p>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="https://instagram.com" target="_blank"><FaInstagram size={20} className="text-white hover:text-pink-400" /></Link>
            <Link href="https://facebook.com" target="_blank"><FaFacebook size={20} className="text-white hover:text-blue-500" /></Link>
            <Link href="https://linkedin.com" target="_blank"><FaLinkedin size={20} className="text-white hover:text-blue-400" /></Link>
            <Link href="https://twitter.com" target="_blank"><BsTwitterX size={18} className="text-white hover:text-gray-400" /></Link>
          </div>
        </div>
      </div>

    </div>
  );
}