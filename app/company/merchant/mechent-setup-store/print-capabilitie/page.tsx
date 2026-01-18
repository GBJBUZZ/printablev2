"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  "B&W Printing",
  "Color Printing",
  "A4 Printing",
  "A3 Printing",
  "Binding",
  "Lamination",
  "Scanning",
  "Thesis Printing",
  "Poster Printing",
  "Business Cards",
  "Banners",
] as const;

// derive a strict union type from the array above
type Service = (typeof services)[number];

export default function PrintCapabilityPage() {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleService = (service: Service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/backgroundMerchant.png')]">
      {/* Header */}
      <header className="max-w-[1400px] flex gap-5 pt-8 ml-13">
        <img
          src="/logom.png"
          alt="Printable Logo"
          className="w-10 h-9"
        />
        <h3 className="text-[30px] font-semibold text-white">Printable</h3>
      </header>

      {/* Main */}
      <main className="max-w-[1400px] mx-auto px-14 mt-3 grid grid-cols-[1fr_640px] gap-24 items-center">
        {/* Left Section */}
        <section className="text-white">
          <h1 className="text-[36px] font-bold tracking-tight mb-3">
            Print Capabilities
          </h1>

          <p className="text-white/60 text-base mb-10">
            Choose the printing services your business provides.
          </p>

          {/* Services */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 mb-16 max-w-[520px]">
            {services.map((item) => (
              <div
                key={item}
                onClick={() => toggleService(item)}
                className={`
                  px-4 py-2.5
                  text-sm
                  rounded-lg
                  border
                  text-white/90
                  cursor-pointer
                  transition
                  ${
                    selectedServices.includes(item)
                      ? "border-[#6B7CFF] bg-white/5"
                      : "border-white/20 hover:border-[#6B7CFF] hover:bg-white/5"
                  }
                `}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between max-w-[520px]">
            <Link href="/company/merchant/mechent-setup-store">
              <button
                className="
                  px-8 py-2.5
                  rounded-full
                  border border-white/40
                  text-white
                  hover:bg-white/5
                  transition
                "
              >
                Back
              </button>
            </Link>

            <Link href="/company/merchant/mechent-setup-store/print-capabilitie/operational-hours">
              <button
                className="
                  px-10 py-2.5
                  rounded-full
                  bg-[#4DFF88]
                  text-black
                  font-semibold
                  shadow-[0_0_20px_rgba(77,255,136,0.35)]
                  hover:brightness-110
                  transition
                "
              >
                Continue
              </button>
            </Link>
          </div>
        </section>

        {/* Right Preview */}
        <aside className="w-full h-[600px] bg-white rounded-3xl shadow-xl" />
      </main>
    </div>
  );
}
