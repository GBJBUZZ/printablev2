// "use client";

// import React from "react";
// import Link from "next/link";

// const resourcesLinks = [
//   { label: "Marketplace", link: "/resources/marketplace" },
//   { label: "Blogs", link: "/resources/blogs" },
//   { label: "Support Docs", link: "/resources/support-docs" },
//   { label: "Case Study", link: "/resources/case-study" },
//   { label: "API Docs", link: "/resources/api-docs" },
// ];

// const companyLinks = [
//   { label: "About Printable", link: "/company/about" },
//   { label: "Contact Us", link: "/company/contact" },
//   { label: "Careers", link: "/company/careers" },
//   { label: "Become a Merchant", link: "/company/become-merchant" },
// ];

// const FooterLinks = () => {
//   return (
//     <div className="flex justify-start gap-28 lg:px-[200px] md:px-[100px] sm:px-[100px] px-4 py-6 lg:h-[450px] h-auto bg-white shadow-2xl z-100">
//       {/* Resources Section */}
//       <div>
//         <h2 className="text-gray-500 text-sm font-medium mb-4">Resources</h2>
//         <ul className="space-y-4">
//           {resourcesLinks.map((item, idx) => (
//             <li key={idx}>
//               <Link
//                 href={item.link}
//                 className="text-black text-lg transition-colors hover:bg-[#06044B] hover:text-white px-2 py-2 rounded-[10px] font-medium"
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Company Section */}
//       <div>
//         <h2 className="text-gray-500 text-sm font-medium mb-4">Company</h2>
//         <ul className="space-y-4">
//           {companyLinks.map((item, idx) => (
//             <li key={idx}>
//               <Link
//                 href={item.link}
//                 className="text-black font-semibold hover:bg-[#06044B] hover:text-white transition-colors px-2 py-2 rounded-[10px]"
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FooterLinks;



"use client";

import React from "react";
import Link from "next/link";

const resourcesLinks = [
  { label: "Marketplace", link: "" }, // Disabled
  { label: "Blogs", link: "" },       // Disabled
  { label: "Support Docs", link: "" },
  { label: "Case Study", link: "" },
  { label: "API Docs", link: "" },
];

const companyLinks = [
  { label: "About Printable", link: "" },
  { label: "Contact Us", link: "" },
  { label: "Careers", link: "" },
  { label: "Become a Merchant", link: "" },
];

const FooterLinks = () => {
  return (
    <div className="flex justify-start gap-28 lg:px-[200px] md:px-[100px] sm:px-[100px] px-4 py-6 lg:h-[450px] h-auto bg-white shadow-2xl z-100">
      
      {/* Resources Section - No routing */}
      <div>
        <h2 className="text-gray-500 text-sm font-medium mb-4">Resources</h2>
        <ul className="space-y-4">
          {resourcesLinks.map((item, idx) => (
            <li key={idx}>
              <div className="text-gray-400 text-lg px-2 py-2 rounded-[10px] font-medium cursor-not-allowed bg-gray-100">
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Company Section - Routes enabled */}
      <div>
        <h2 className="text-gray-500 text-sm font-medium mb-4">Company</h2>
        <ul className="space-y-4">
          {companyLinks.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.link}
                className="text-gray-400 text-lg px-2 py-2 rounded-[10px] font-medium cursor-not-allowed bg-gray-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;
