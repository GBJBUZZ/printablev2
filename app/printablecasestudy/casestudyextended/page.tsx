"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Footer from "@/components/Footer/page";

export default function HelpCenter() {
  const articles = [
    { 
      date: '05/06/2021',
      title: 'Doubling Print Orders: How Local Shop Transformed Its Business', 
      src: "/article-1.png" // Replace with your local path
    },
    { 
      date: '06/08/2021',
      title: 'Case Study: How a Local Print Shop Increased Orders By 2x', 
      src: "/article-2.png" // Replace with your local path
    },
    { 
      date: '09/09/2021',
      title: 'From Local to Leading: The Print Shop That Doubled Its Orders', 
      src: "/article-3.png" // Replace with your local path
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      
      {/* --- SECTION 1: CASE STUDY HERO --- */}
      <section className="relative w-full h-[400px] md:h-[600px]">
        <Image 
          src="/landing header.png" // The Case Study Header Image
          alt="Case Study Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for text readability */}
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 text-white">
          
        </div>
      </section>

    <section className="max-w-7xl mx-auto py-12 px-6">
      {/* Container to match the styling of your page */}
      <div className="bg-[#f8f9fb] rounded-[2rem] p-8 border border-gray-100 shadow-sm">

        {/* Image Wrapper */}
        <div className="relative w-full overflow-hidden">
          <Image
            src="/Text and data.png" // Ensure this matches your filename in /public
            alt="Visual Storytelling Dashboard - Order Growth and Top Locations"
            width={1200} // Adjust based on original image dimensions
            height={750}
            className="w-full h-auto object-contain rounded-xl"
            priority // Use priority if this is a main section of your landing page
          />
        </div>
        
      </div>
    </section>
  );


     <section className="max-w-7xl mx-auto py-4 px-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Visual Storytelling</h2>
        <div className="relative aspect-video bg-gray rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer shadow-md max-w-8xl mx-auto">
          <img src="/4.png" alt="Video" className="absolute inset-0 w-full h-full object-cover" />
        </div>
          </section>

    <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="relative h-[400px] rounded-[2rem] overflow-hidden flex items-center px-12 md:px-20 shadow-xl">
          <div className="absolute inset-0">
            <img src="/Author.png" className="w-full h-full object-cover"  />
            <div className="absolute inset-0 bg-gray-900/60"></div>
          </div>
          <div className="relative z-10 text-white max-w-lg">
              
          </div>
        </div>
      </section>
      
      
      {/* --- SECTION 4: MORE SUCCESS STORIES --- */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">More Success Stories</h2>
          <Link href="/all-stories" className="text-gray-500 hover:text-black font-medium">View All</Link>
        </div>

         {/* --- SECTION 4: VIDEO WALKTHROUGHS --- */}
      <section className="max-w-7xl mx-auto py-12 px-6">
       
        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer shadow-md max-w-8xl mx-auto">
                      <img src="/Success Stories (1).png" alt="Video" className="absolute inset-0 w-full h-full object-cover" /> 
        </div>
      </section>
      </section>

      <Footer />
    </div>
  );
}