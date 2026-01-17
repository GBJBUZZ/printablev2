"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Footer from "@/components/Footer/page"

export default function PrivacyPolicyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const privacyDetails = [
    {
      title: "What Data We Collect",
      content:
        "When you use our printing service, we collect information necessary to fulfill your orders and improve your experience. This includes your name, email address, contact number, delivery address,and payment details. We also collect any files or documents you upload for printing, along withtechnical data like device type and browser information to help optimize our platform. We only collect what's essential-nothing more"
    },
    {
      title: "Why We Collect Data",
      content:
        "We collect your data to process orders accurately, deliver your printed materials, and provide customer support when needed. It also helps us improve our services, personalize your experience,and ensure the security of our platform. We use this information solely to enhance your interactionwith our printing service-never for unrelated purposes.",
    },
    {
      title: "How Data Is Stored and Protected",
      content:
        "Your data is stored on secure servers with encryption protocols in place to prevent unauthorized access. We use industry-standard security measures, including firewalls and regular system monitoring, to protect your files and personal information. Access is restricted to authorized personnel only, and we routinely update our systems to guard against emerging threats.",
    },
    {
      title: "Third-Party Sharing Policy",
      content:
        "We do not sell, trade, or rent your personal information to third parties. However, we may share certain data with trusted service providers-such as payment processors, cloud storage partners, or delivery services-strictly for the purpose of completing your order. These partners are contractually obligated to handle your data securely and in compliance with privacy regulations.",
    },
    {
      title: "Use of Cookies",
      content:
        "Our website uses cookies to enhance your browsing experience, remember your preferences, and help us understand how our platform is used. These small text files are stored on your device and may be used for things like login sessions, order tracking, or basic analytics. You can manage or disable cookies anytime through your browser settings without affecting core functionality.",
    },
  ];

  const dataTypes = [
    {
      title: "Document Files",
      desc: "Files you upload for printing services.",
      tag: "Temporary",
      icon: "/document.png",
    },
    {
      title: "Location Data",
      desc: "Address & location for delivery services.",
      tag: "Service Only",
      icon: "/location.png",
    },
    {
      title: "Payment Info",
      desc: "Payment method & transaction details.",
      tag: "Encrypted",
      icon: "/payment.png",
    },
    {
      title: "Contact Details",
      desc: "Email & phone for communication references.",
      tag: "Required",
      icon: "/contact.png",
    },
  ];

  const termheadericon = "/termheader.png";
  const calendaricon = "/calender.png";

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-[#DFFBE7] py-20 flex flex-col items-center text-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-b after:from-black/20 after:to-transparent mb-12">
        <img src={termheadericon} alt="Privacy icon" className="mb-4" />
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      </section>

      {/* Last Updated */}
      <section className="max-w-4xl mx-64 px-6 flex gap-3 items-center mt-7">
        <img src={calendaricon} className="w-[30px] h-[30px]" />
        <div>
          <h4 className="font-medium">Last Updated</h4>
          <p className="text-[13px] text-black">15 June 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold mb-4">
          Our Commitment to Your Privacy
        </h2>

        <p className="text-black mb-8">
          We value your trust and are committed to protecting your personal
          information. Whether you're uploading documents or placing an order,
          we ensure your data is handled securely and used only for providing
          our services.
          <br />
          <br />
          Your files are stored securely and are never accessed for anything
          beyond fulfilling your order.
        </p>

        {/* Data Types */}
        <h3 className="font-semibold mb-12 text-[20px]">
          Types of Data We Collect
        </h3>

        <div className="grid md:grid-cols-[368px_368px] gap-y-4 mb-12">
          {dataTypes.map((item, i) => (
            <div
              key={i}
              className="
                bg-gradient-to-r
                from-[#34C759]/15 to-[#06044B]/50
                hover:from-[#06044B]/50 hover:to-[#34C759]/15
                transition-all duration-700 ease-in-out
                rounded-xl p-3 shadow-sm
                w-[338px] h-[99px]
              "
            >

              <div className="flex items-center justify-between mb-5 mt-2">
                <div className="flex items-center gap-3">
                  <div className=" ml-3 ">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-6 h-6"
                    />
                  </div>
                  <h4 className="font-semibold text-[17px] text-black">
                    {item.title}
                  </h4>
                </div>

                <span className="text-xs bg-white/70 backdrop-blur px-5 py-1 rounded-full text-[#555555]">
                  {item.tag}
                </span>
              </div>

              <p className="text-sm text-black pl-6 ">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <h3 className="font-semibold mb-4 text-[20px]">Privacy Details</h3>

        <div className="space-y mb-11">
          {privacyDetails.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 cursor-pointer"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{item.title}</h4>
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

        {/* Rights */}
        {/* Rights */}
      <h3 className="font-semibold mb-6 text-[20px]">
        Your Privacy Rights
      </h3>

      <div className="grid md:grid-cols-[347px_347px] gap-y-4 mb-12">

        {[
          {
            title: "Access your Data",
            desc: "Request a copy of all your personal data we have about you.",
            icon: "/access.png",
          },
          {
            title: "Data Portability",
            desc: "Export your data in a machine readable format.",
            icon: "/download.png",
          },
          {
            title: "Request Deletion",
            desc: "Ask us to delete your personal data from our systems.",
            icon: "/delete.png",
          },
          {
            title: "Control Processing",
            desc: "Opt-out of certain data processing activities.",
            icon: "/lock.png",
          },
        ].map((item, i) => (
        <div
          key={i}
          className="
            relative rounded-xl p-6 flex items-start gap-4
            bg-[linear-gradient(90deg,rgba(6,4,75,0.12)_0%,rgba(6,4,75,0.18)_20%,rgba(6,4,75,0.22)_50%,rgba(6,4,75,0.18)_80%,rgba(6,4,75,0.12)_100%)]
            w-[338px] h-[114px]

            before:absolute before:inset-x-6 before:bottom-[-6px]
            before:h-2 before:bg-black/10 before:blur-xl before:rounded-full
            before:content-['']

            flex-col justify-center

            transition-transform duration-300 ease-out
            hover:-translate-y-1
          "
>
            <div className=" flex items-center gap-2 justify-center">
              <img src={item.icon} alt={item.title} className="w-auto h-auto" />
              <h4 className="font-medium mb-1">{item.title}</h4>
            </div>

    
              
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            

          </div>
        ))}
      </div>


        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4 text-[18px]">
            Privacy Questions or Requests
          </h3>
          <p className="text-gray-600 mb-8">
            To exercise your privacy rights or ask questions, please contact
            our Privacy Policy Team.
          </p>

          <div className="flex gap-4 mb-35">
            <button className="bg-[#0B1C4D] text-white px-6 py-2 rounded-md">
              privacy@Printable.com
            </button>
            <button className="border border-[#0B1C4D] text-[#0B1C4D] px-6 py-2 rounded-md ">
              Contact Legal Team
            </button>
          </div>
        </div>
      </section>
      <Footer/>

    </main>
  );
}
