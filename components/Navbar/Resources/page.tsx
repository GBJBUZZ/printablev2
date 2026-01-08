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
  { label: "Marketplace", link: "/marketplace" },
  { label: "Blogs", link: "/blog" },
  { label: "Support Docs", link: "/printablesupportdocs/supportdocs" },
  { label: "Case Study", link: "/case-studies" },
  { label: "API Docs", link: "/api" },
];

const companyLinks = [
  { label: "About Printable", link: "/about" },
  { label: "Contact Us", link: "/contact" },
  { label: "Careers", link: "/careers" },
  { label: "Become a Merchant", link: "/merchant" },
];

const FooterLinks = () => {
  return (
    <div className="flex justify-start gap-28 lg:px-[200px] md:px-[100px] sm:px-[100px] px-4 py-12 lg:h-[450px] h-auto bg-white shadow-2xl z-50">
      
      {/* Resources Section - Now Enabled */}
      <div>
        <h2 className="text-gray-500 text-sm font-semibold mb-6 uppercase tracking-wider">Resources</h2>
        <ul className="space-y-3">
          {resourcesLinks.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.link}
                className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-lg px-3 py-2 rounded-[10px] font-medium transition-all duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company Section - Now Enabled */}
      <div>
        <h2 className="text-gray-500 text-sm font-semibold mb-6 uppercase tracking-wider">Company</h2>
        <ul className="space-y-3">
          {companyLinks.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.link}
                className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-lg px-3 py-2 rounded-[10px] font-medium transition-all duration-200"
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