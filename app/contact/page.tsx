"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-gray-50">

      {/* ===== TOP SECTION: ONLY RIGHT SIDE IMAGE ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex justify-end relative">
        <div className="flex justify-center items-start">
          <Image
            src="/buzz1.png"
            alt="Contact Illustration"
            width={550}
            height={400}
            className="object-contain"
          />
        </div>
      </section>

      {/* ===== FORM & CONTACT INFO SIDE BY SIDE ===== */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row gap-12 justify-center">

          {/* ===== CONTACT FORM ===== */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  placeholder="Enter your company name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-900 text-white py-2.5 rounded hover:bg-indigo-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* ===== CONTACT INFO ===== */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>

            <div className="space-y-3">
              {/* Call Us */}
             <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                <span>📞</span>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-500 text-sm">Mon-Fri 9AM-6PM PST</p>
                </div>
              </div>

              {/* Email Us */}
             <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                <span>✉️</span>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-600">hello@printifypaper.com</p>
                  <p className="text-gray-500 text-sm">support@printifypaper.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                <span>⏰</span>
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-500">Sun: Closed</p>
                </div>
              </div>

              {/* Headquarters */}
             <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                <span>📍</span>
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-gray-600">123 Print Street</p>
                  <p className="text-gray-600">Digital City, DC 12345</p>
                </div>
              </div>

              {/* Social Media */}
             <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                
                <div>
                  <p className="font-medium">Follow our Social Media</p>
                  <div className="flex items-center gap-8 mt-1">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      <Image src="/facebook.png" alt="Facebook" width={28} height={28} className="hover:opacity-80 transition" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                      <Image src="/instagram.png" alt="Instagram" width={28} height={28} className="hover:opacity-80 transition" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                      <Image src="/youtube.png" alt="YouTube" width={28} height={28} className="hover:opacity-80 transition" />
                    </a>
                    <a href="https://www.telegram.com" target="_blank" rel="noopener noreferrer">
                      <Image src="/telegram.png" alt="telegram" width={28} height={28} className="hover:opacity-80 transition" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                      <Image src="/twitter.png" alt="Twitter" width={28} height={28} className="hover:opacity-80 transition" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
<section className="w-full pb-12">
  <div className="max-w-6xl mx-auto px-4">
    <div className="bg-[#E8F5E9] rounded-[8px] p-10 flex flex-col items-center">

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-[18px] font-semibold text-gray-900">Our Location</h2>
        <p className="text-[12px] text-gray-500 mt-1">
          Visit us at our office or find us on the map below
        </p>
      </div>

      {/* Map Image */}
      <div className="w-full max-w-[1260px] p-2 bg-white rounded-lg shadow-sm">
        <Image
          src="/map.png"
          alt="Map"
          width={1260}
          height={400}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

    </div>
  </div>
</section>

    {/* ===== FAQ ===== */}
<section className="bg-gray-50 py-16">
  <div className="max-w-6xl mx-auto px-6">
    {/* ===== TITLE ===== */}
    <div className="text-center mb-10">
      <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      <p className="text-gray-500 mt-2">
        Find answers to common questions about our services and support.
      </p>
    </div>

    {/* ===== FAQ BOXES ===== */}
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="p-5 rounded-lg text-gray-900"
          style={{
            background: index % 2 === 0 
              ? "linear-gradient(to right, #dbeafe, #e0fdf4)" // light blue to lighter green
              : "linear-gradient(to right, #e0fdf4, #dbeafe)", // alternate gradient
          }}
        >
          <h4 className="font-semibold text-gray-800">{faq.q}</h4>
          <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===== FOOTER (MATCHING IMAGE) ===== */}
<footer className="bg-[#EAF6EF] text-gray-800">
  {/* Top Footer */}
  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">

    {/* Brand */}
    <div>
      <div className="mb-3">
        
      </div>

      
      <div className="flex gap-3">
        <Image
          src="/footerimg.png"
          alt="Google Play"
          width={120}
          height={36}
        />
        
      </div>
    </div>

    {/* Services & Tools */}
    <div>
      <h4 className="font-semibold mb-3">Services & Tools</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>Print & Delivery</li>
        <li>PDF Converter</li>
        <li>E-Sign</li>
        <li>Printable Marketplace</li>
        <li>PDF Scanner</li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h4 className="font-semibold mb-3">Company</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Blogs</li>
        <li>Careers</li>
        <li>Case Studies</li>
      </ul>
    </div>

    {/* More */}
    <div>
      <h4 className="font-semibold mb-3">More</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>Partners with Us</li>
        <li>Become Merchant</li>
        <li>Support Docs</li>
        <li>Terms of Use</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

    {/* PDF Tools */}
    <div>
      <h4 className="font-semibold mb-3">PDF Tools</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>Merge PDF</li>
        <li>Split PDF</li>
        <li>Compress PDF</li>
        <li>PDF to Word</li>
        <li>PDF OCR</li>
      </ul>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="bg-[#0B0B5C] text-white">
    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm">
        © 2025 Printable · All Rights Reserved
      </p>

      <div className="flex items-center gap-5">
        <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
        <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
        <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
        <Image src="/twitter.png" alt="X" width={20} height={20} />
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}
/* ===== FAQ DATA ===== */
const faqData = [
  { q: "What are your response times?", a: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly." },
  { q: "Do you offer technical support?", a: "Yes, we provide comprehensive technical support for all our products and services. Contact our support team for assistance." },
  { q: "Can I schedule a consultation?", a: "Absolutely! Use the contact form above to request a consultation, and we'll schedule a time that works for you." },
  { q: "What information should I include?", a: "Please provide as much detail as possible about your inquiry, including any relevant project details or specific requirements." },
  { q: "Do you work with international clients?", a: "Yes, we work with clients worldwide. We can accommodate different time zones and communication preferences." },
  { q: "How do I get a quote?", a: "Send us your project details through the contact form, and we'll provide a detailed quote within 2-3 business days." },
];

