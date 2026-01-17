// Timeline.tsx
import React from "react";

const data = [
  {
    year: "2020",
    title: "Company Founded",
    desc: "Started with a vision to revolutionize local printing services",
  },
  {
    year: "2021",
    title: "First 100 Partners",
    desc: "Onboarded our first 100 printing partners across major cities",
  },
  {
    year: "2022",
    title: "Platform Launch",
    desc: "Launched our comprehensive printing platform with full automation",
  },
  {
    year: "2023",
    title: "1M+ Orders",
    desc: "Processed over 1 million print orders with 99% customer satisfaction",
  },
  {
    year: "2024",
    title: "Global Expansion",
    desc: "Expanding to new markets and introducing innovative printing solutions",
  },
];

export default function Timeline() {
  return (
    <section className="bg-[#ECEEF2] py-16">
      <div className="mx-auto max-w-[1100px]">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
          <p className="mt-2 text-gray-600">
            From a simple idea to a platform serving millions, here’s how <br />
            <span>we’ve grown</span>
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[5px] -translate-x-1/2 bg-[#06044B]" />

          <div className="space-y-24">
            {data.map((item, i) => {
              const isLeft = i % 2 === 1;

              return (
                <div key={i} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-2 -translate-x-1/2 z-10">
                    <div className="h-4 w-4 rounded-full bg-white ring-[8px] ring-[#06044B]" />
                  </div>

                  {/* Year Badge */}
                  <div
                    className={`absolute top-1 ${
                      isLeft ? "left-1/2 ml-6" : "left-1/2 -ml-25"
                    }`}
                  >
                    <span className="inline-flex items-center justify-center rounded-md bg-[linear-gradient(180deg,#61E987_0%,#06044B_100%)] px-5 py-1 text-base font-bold text-white shadow">
                      {item.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`relative mt-6 max-w-[420px] rounded-md bg-white p-6 shadow-lg
                      ${
                        isLeft
                          ? `
                            ml-auto mr-[53%]
                            before:absolute before:top-3 before:right-0
                            before:translate-x-full
                            before:border-y-[10px] before:border-y-transparent
                            before:border-l-[14px] before:border-l-white
                          `
                          : `
                            mr-auto ml-[53%]
                            before:absolute before:top-3 before:left-0
                            before:-translate-x-full
                            before:border-y-[10px] before:border-y-transparent
                            before:border-r-[14px] before:border-r-white
                          `
                      }
                    `}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
