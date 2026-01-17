import React from "react";
import Link from "next/link";
export default function HelpSection() {
  return (
    <div className="lg:px-[200px] md:px-[100px] sm:px-[100px] px-4">
      <div className="flex justify-center py-4 max-w-6xl">
        <div className="w-full h-auto py-8 px-8 bg-[#06044B] rounded-[10px] flex justify-center items-center">
          <div>
            <div>
              {" "}
              <h3 className="text-[32px] text-white">Need Help?</h3>
              <p className="text-[12px] text-white">Our support team is here to help</p>
            </div>

            <div className="py-4 flex justify-center items-center">
              <Link href="/ai-chat">
                <button className="bg-white text-black px-4 py-2 rounded-[10px] text-[12px] flex justify-center items-center cursor-pointer">
                  Get Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
