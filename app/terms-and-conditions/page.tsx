"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Footer from "@/components/Footer/page"

export default function TermsOfUsePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const terms = [
    {
      icon: "/termicon1.png",
      title: "Acceptance of Terms",
      content:
        "By accessing and using Printable’s services, you acknowledge that you have read, understood and agree to be bound by these Terms of Use. These Terms apply to all users of our platform, including customers, merchants and partners. If you do not agree with any part of these Terms, you must not use our services.",
    },
    {
      icon: "/termicon2.png",
      title: "User Responsibilities",
      content:
        "You must provide accurate and complete information when creating an account or placing orders. You are responsible for maintaining the confidentiality of your account credentials. You must not use our platform for illegal activities. You agree to pay all charges associated with your use of the services.",
    },
    {
      icon: "/termicon3.png",
      title: "Platform Usage Rules",
      content:
        "Our services are intended for lawful printing and document processing only. You may not attempt to gain unauthorized access to our systems or other users’ accounts.",
    },
    {
      icon: "/termicon4.png",
      title: "Intellectual Property Rights",
      content:
        "All content on Printable, including logos, text, graphics and software, is our property or licensed to us. You must not upload content that infringes on others’ intellectual property rights. Our trademarks and brand elements may not be used without express written permission.",
    },
    {
      icon: "/termicon5.png",
      title: "Limitations of Liability",
      content:
        "Printable provides services “as is” without warranties of any kind, express or implied. We do not guarantee uninterrupted or error-free services.",
    },
    {
      icon: "/termicon6.png",
      title: "Service Availability",
      content:
        "We strive to maintain high-quality services but cannot guarantee 100% uptime. Service availability may vary by location and merchant partner availability. We reserve the right to modify or discontinue services with reasonable notice.",
    },
  ];

  const termheadericon = "/termheader.png";
  const calendaricon = "/calender.png";

  return (
    <div>
    <main className="bg-white h-[1300px]">
      {/* Header */}
      <section className="bg-[#DFFBE7] py-20 flex flex-col items-center text-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-b after:from-black/20 after:to-transparent mb-12">
        <img src={termheadericon} alt="Terms icon" className="mb-4" />
        <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
      </section>

      {/* Last Updated */}
      <section className="max-w-4xl mx-auto px-6 flex gap-3 items-center mt-7">
        <img src={calendaricon} className="w-[30px] h-[30px]" />
        <div>
          <h4 className="font-medium">Last Updated</h4>
          <p className="text-[13px] text-gray-600">15 June 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold mb-4">Welcome to Printable</h2>
        <p className="text-gray-600 mb-10">
          These Terms govern your access to Printable’s website and services.
          By using our services, you agree to these Terms.
        </p>

        {/* Accordion */}
        <div className="space-y">
          {terms.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-5 cursor-pointer "
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center gap-2">
                  <img src={item.icon} alt="" />
                  {item.title}
                </h3>

                {openIndex === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>

              {openIndex === index && (
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12">
          <h3 className="font-bold mb-5 text-[20px]">
            Questions about these Terms?
          </h3>
          <p className="text-black mb-6">
            If you have any questions, please contact our Legal Team.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-2 rounded-md text-white bg-[#06044B] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0B1C4D] hover:to-[#2ECC71] shadow-md hover:shadow-lg">
              help@Printable.com
            </button>
            <button className="px-6 py-2 rounded-md text-white bg-[#06044B] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0B1C4D] hover:to-[#2ECC71] shadow-md hover:shadow-lg">
              Contact Legal Team
            </button>
          </div>
        </div>
        
      </section>
      
    </main>
    <Footer/>
    </div>
  );
}
