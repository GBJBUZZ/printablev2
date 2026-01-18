"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";

export default function SetupStorePage() {
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);

  const handleImageUpload = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") return;

      const newImages = [...images];
      newImages[index] = result;
      setImages(newImages);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex gap-32 bg-[url('/backgroundMerchant.png')] text-white">
      {/* LEFT SECTION */}
      <div className="w-[600px] pl-14 py-10">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logom.png" alt="Printable Logo" className="w-10 h-9" />
          <h3 className="text-[30px] font-semibold">Printable</h3>
          <span className="text-sm opacity-70 mt-2">(Merchant)</span>
        </div>

        <div className="ml-8">
          <h1 className="text-[30px] font-semibold mb-3">
            Set Up Your Print Store
          </h1>
          <p className="text-white/60 mb-8">Basic Store Information</p>

          {/* Image Upload */}
          <div className="mb-8">
            <p className="mb-3 text-sm text-white/70">
              Upload up to 3 images
            </p>

            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i}>
                  <label htmlFor={`image-upload-${i}`}>
                    <div className="w-36 h-20 rounded-lg bg-[rgba(97,233,135,0.25)] flex items-center justify-center cursor-pointer hover:bg-[rgba(97,233,135,0.4)] transition">
                      {images[i] ? (
                        <img
                          src={images[i]!}
                          alt={`Uploaded ${i + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          src="/photoplus.png"
                          alt="Upload Icon"
                          className="w-5 h-5"
                        />
                      )}
                    </div>
                  </label>

                  <input
                    id={`image-upload-${i}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(i, e)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="text-sm block mb-2">Store Name</label>
              <input className="w-full h-11 rounded-lg bg-transparent border border-white px-3 outline-none" />
            </div>

            <div>
              <label className="text-sm block mb-2">
                Store Address <span className="text-white">*</span>
              </label>
              <input className="w-full h-11 rounded-lg bg-transparent border border-white px-3 outline-none" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm block mb-2">
                  City <span className="text-white">*</span>
                </label>
                <input className="w-full h-11 rounded-lg bg-transparent border border-white px-3 outline-none" />
              </div>

              <div className="flex-1">
                <label className="text-sm block mb-2">
                  State <span className="text-white">*</span>
                </label>
                <input className="w-full h-11 rounded-lg bg-transparent border border-white px-3 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-sm block mb-2">
                Postal Code <span className="text-white">*</span>
              </label>
              <input className="w-full h-11 rounded-lg bg-transparent border border-white px-3 outline-none" />
            </div>

            <div className="flex justify-end mt-6">
              <Link href="/company/merchant/mechent-setup-store/print-capabilitie">
                <button className="bg-[#61E987] text-black px-8 py-3 rounded-full font-medium">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-[910px] px-10 py-10 mt-17">
        <h2 className="text-2xl font-semibold mb-3">
          Pin Your Store Location
        </h2>
        <p className="text-white/60 mb-17">
          Point out your store location for better results
        </p>

        <div className="w-full h-[520px] rounded-xl overflow-hidden border border-white/10">
          <iframe
            title="Store Location Map"
            src="https://www.google.com/maps?q=Nagpur,India&z=14&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
