"use client";

import React from 'react';
import { Cloud, Printer, Compass } from 'lucide-react';
// Import your Footer component
import FooterSection from "@/components/Footer/page";

const PrintableOnboarding = () => {
  const steps = [
    {
      title: "Connect a Device",
      description: "Connect your first device and start printing from anywhere.",
      icon: <Cloud className="w-6 h-6 text-gray-600" />,
      buttonText: "Connect",
      onClick: () => alert("Connecting device...")
    },
    {
      title: "Print a Test Document",
      description: "Print a test document to ensure your device is connected and working correctly.",
      icon: <Printer className="w-6 h-6 text-gray-600" />,
      buttonText: "Print",
      onClick: () => alert("Printing test document...")
    },
    {
      title: "Explore Printable",
      description: "Explore the Printable platform and discover all the features and functionalities available.",
      icon: <Compass className="w-6 h-6 text-gray-600" />,
      buttonText: "Explore",
      onClick: () => alert("Exploring platform...")
    }
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto p-8 font-sans text-slate-900">
        {/* --- HEADER SECTION --- */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to Printable</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
            Printable is a platform that allows you to print from any device, anywhere. 
            This guide will help you get started with Printable and show you how to use 
            the platform&apos;s core features.
          </p>
        </header>

        {/* --- GETTING STARTED SECTION --- */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Getting Started</h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-6">
                  {/* Icon Box */}
                  <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center">
                    {step.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                    <p className="text-slate-500 max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={step.onClick}
                  className="px-6 py-2 border border-slate-300 rounded-full text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors"
                >
                  {step.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEED HELP SECTION --- */}
        <section className="pt-8 border-t border-slate-100">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-slate-600 mb-8">
            If you have any questions or need assistance, please refer to our 
            comprehensive documentation or contact our support team.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-[#0A054F] text-white rounded-md font-semibold text-sm hover:bg-black transition-colors">
              View Documentation
            </button>
            <button className="px-8 py-3 bg-[#63E691] text-[#0A054F] rounded-md font-semibold text-sm hover:bg-[#4fd17d] transition-colors">
              Contact Support
            </button>
          </div>
        </section>
      </div>

      {/* --- FOOTER COMPONENT --- */}
      <FooterSection />
    </>
  );
};

export default PrintableOnboarding;