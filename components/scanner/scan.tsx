"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
export default function Scanner() {
  const faqData = [
    {
      question: "Is it possible to scan PDFs using the Printable Mobile App?",
      answer:
        "Absolutely! All you need to do is download the Printable Mobile App to your device and start scanning.",
    },
    {
      question:
        "Are documents scanned with the Printable Mobile App available on the Printable website?",
      answer:
        "Yes, The Printable Mobile App integrates with the Printable website, so your documents are stored in one place and accessible to you anytime, anywhere.",
    },
    {
      question: "Is the Printable Mobile App free to use?",
      answer:
        "Yes, the Printable Mobile App is free. Printable Pro users get access to expanded mobile tools and features.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="px-4 py-10 max-w-6xl mx-auto">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    {/* Left Side */}
    <div className="text-left">
      <h1 className="text-5xl font-bold leading-tight">
  Free{" "}
  <span className="bg-gradient-to-r from-[#61E987] to-[#06044B] text-transparent bg-clip-text">
    PDF Scanner
  </span>
  <span className="block">for Your Phone</span>
</h1>

      <p className="mt-4 text-base max-w-xl leading-relaxed">
  Scan to PDF for free on your iOS or Android phone. It’s<br />
  never been easier to turn your paper documents<br />
  and photos into high-quality PDFs!
</p>

      <ul className="mt-4 text-sm list-disc list-inside max-w-md">
        <li>Scan to PDF and OCR conversion</li>
        <li>Merge, convert, and compress PDFs on the go</li>
        <li>Share the scanned PDFs directly from your phone</li>
      </ul>
      <div className="flex gap-4 mt-6 ml-10">
  <Image src="/appstore.png" alt="App Store" width={140} height={40} />
  <Image src="/googleplay.png" alt="Google Play" width={140} height={40} />
</div>
    </div>

    {/* Right Side */}
<div className="w-fit mx-auto mt-6 md:mt-0">
  <div className="relative h-[400px] w-[600px]">
    <Image
      src="/scan1.png"
      alt="Phone Scan 1"
      fill
      className="object-contain rounded-xl"
    />
  </div>
</div>


  </div>
</section>

            {/* Features Section */}
<section className="bg-white py-16">
  <h2 className="text-center text-4xl font-bold mb-12">
    Powerful PDF Tools in Your Pocket
  </h2>

  <div className="grid md:grid-cols-3 gap-10 px-8 max-w-6xl mx-auto text-center">
    {[
      {
        title: "Scan to PDF & OCR",
        desc: "Scan and convert any document to PDF. Add filters, crop, rotate, and use OCR to make text searchable and editable.",
        img: "/ocr1.png",
      },
      {
        title: "PDF Management on the Go",
        desc: "Work with your PDFs on the go: Compress, convert, edit, merge, rotate, reorder, crop, and delete pages.",
        img: "/pdfmanage.png",
      },
      {
        title: "Sync to the Cloud",
        desc: "Save scans on your phone or create a Printable account to sync your files across devices and use them on web.",
        scan1: "/scan1.jpg",
        scan2: "/scan2.png",
        scan3: "/scan3.jpg",
      },
    ].map((item, index) => (
      <div key={item.title} className="flex flex-col items-center text-center">
        {/* Standardized image container */}
        <div className="relative w-[150px] h-[150px] mb-6">
          {/* For cards with a single image */}
          {item.img && (
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-contain rounded-lg"
            />
          )}

          {/* For third card with stacked images */}
          {index === 2 && item.scan1 && item.scan2 && item.scan3 && (
            <>
              {/* Main scan1 image */}
              <Image
                src={item.scan1}
                alt="Main Scan"
                fill
                className="object-contain rounded-lg z-20"
              />

              {/* scan2 - top right, behind */}
              <div className="absolute top-0 right-0 w-[75px] h-[75px] z-10 translate-x-4 -translate-y-2">
                <Image
                  src={item.scan2}
                  alt="Scan 2"
                  fill
                  className="object-contain rounded-xl opacity-80"
                />
              </div>

              {/* scan3 - bottom right, in front */}
              <div className="absolute bottom-0 right-0 w-[75px] h-[75px] z-30 translate-x-4 translate-y-2">
                <Image
                  src={item.scan3}
                  alt="Scan 3"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            </>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="font-semibold text-xl">{item.title}</h3>
        <p className="text-base mt-3 px-2">{item.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* Team Tools Section */}
<section className="py-16 bg-white">
  <h2 className="text-center text-3xl font-semibold mb-12">All the PDF Tools Your Team Needs</h2>
  
  {/* Top 3 Items */}
  <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto text-center">
    {/* Merge */}
    <div className="flex flex-col items-center">
      <Image
        src="/merge.png"
        alt="Merge, Split, & Organize"
        width={56}
        height={56}
        className="mb-4"
      />
      <h3 className="font-semibold text-base">Merge, Split, & Organize</h3>
      <p className="text-sm mt-2">
        Turn multiple PDFs into one, separate the files/pages, and reorganize them.
      </p>

      {/* Edit */}
      <div className="mt-10">
        <Image
          src="/edit.png"
          alt="Edit & Annotate"
          width={56}
          height={56}
          className="mb-4 mx-auto"
        />
        <h3 className="font-semibold text-base">Edit & Annotate</h3>
        <p className="text-sm mt-2 max-w-xs">
          Highlight text, redact confidential information, annotate, and even watermark.
        </p>
      </div>
    </div>

    {/* Compress */}
    <div>
      <Image
        src="/compress1.png"
        alt="Compress"
        width={56}
        height={56}
        className="mx-auto mb-4"
      />
      <h3 className="font-semibold text-base">Compress</h3>
      <p className="text-sm mt-2">
        Reduce the size of your PDF files for easy sharing and storage optimization.
      </p>
    </div>

    {/* Convert */}
    <div>
      <Image
        src="/convert1.png"
        alt="Convert"
        width={56}
        height={56}
        className="mx-auto mb-4"
      />
      <h3 className="font-semibold text-base">Convert</h3>
      <p className="text-sm mt-2">
        Convert PDFs to Word documents, Excel sheets, or PowerPoint presentations.
      </p>
    </div>
  </div>
</section>


      {/* How To Section */}
<section className="bg-white py-24 px-6">
  {/* Outer container */}
  <div className="relative max-w-5xl mx-auto min-h-[420px]">
    
    {/* Inner container for content */}
    <div
      className="px-8 py-10 rounded-lg shadow-md w-full relative z-10 text-left text-base space-y-3"
      style={{
        background: "linear-gradient(to right, #CDCDDB, #61E98769)",
      }}
    >
      <h2 className="text-3xl font-bold mb-6">
        How To <span className="bg-gradient-to-r from-[#61E987] to-[#06044B] text-transparent bg-clip-text">Scan to PDF</span> for Free
      </h2>
      <ol className="list-decimal list-inside">
        <li>Download the PDF Scanner app to your phone</li>
        <li>Click the round blue button</li>
        <li>Select “Scan with camera” and take a photo</li>
        <li>Pick a filter, crop, or rotate as you wish</li>
        <li>Tap “Use” if you’re happy or scan more documents</li>
        <li>Tap “Finish”—easy-peasy</li>
      </ol>
    </div>

    {/* Background image */}
    <div className="absolute top-1/2 right-0 -translate-y-[60%] translate-x-30 z-20 w-[560px] h-[360px]">
      <Image
        src="/qr.png"
        alt="QR Scan"
        fill
        className="object-contain rounded-md"
      />
    </div>
  </div>
</section>



      {/* FAQs Section */}
      <section className="py-10 px-6 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-6">
        FAQs About Using Our Free PDF Scanner
      </h2>
      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div
            key={i}
            className="border border-[#61E987] rounded-md p-4 text-sm transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.question}</span>

              {/* Icon with hover effect */}
              <button
                onClick={() => toggleAnswer(i)}
                className="text-gray-500 hover:text-black transition"
              >
                {openIndex === i ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            <AnimatePresence>
              {openIndex === i && (
                <motion.p
                  className="text-gray-600 mt-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>

      {/* Final Download */}
      <section className="text-center py-10 px-4">
        <h2 className="text-xl font-semibold mb-4">Get Your Free PDF Scanner App</h2>
        <div className="flex justify-center gap-4">
          <Image src="/appstore.png" alt="App Store" width={140} height={40} />
          <Image src="/googleplay.png" alt="Google Play" width={140} height={40} />
        </div>
      </section>
    </div>
  );
}