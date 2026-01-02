"use client";
import Link from "next/link";
import {
  FaCommentDots,
  FaFileAlt,
  FaLanguage,
  FaQuestionCircle,
  FaChalkboardTeacher,
  FaEdit,
  FaPencilAlt,
  FaBookOpen,
  FaHashtag,
  FaCrop,
  FaEraser,
  FaTint,
  FaObjectGroup,
  FaCodeBranch,
  FaRedo,
  FaTrash,
  FaFileExport,
  FaTh,
  FaUnlock,
  FaLock,
  FaFileDownload,
  FaSignature,
  FaCompress,
} from "react-icons/fa";
import { LuFileScan } from "react-icons/lu";
import { PiChatsBold } from "react-icons/pi";
import { MdOutlineTranslate } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { TbDeviceTv } from "react-icons/tb";

const tools = [
  {
    sections: [
      {
        title: "AI PDF",
        items: [
          { icon: <PiChatsBold size={16} />, label: "Chat With PDF", link: "" },
          { icon: <FaFileAlt size={16} />, label: "AI PDF Summarizer", link: "" },
          { icon: <MdOutlineTranslate size={16} />, label: "Translate PDF", link: "" },
          { icon: <GoQuestion size={16} />, label: "AI Question Generator", link: "" },
        ],
      },
      {
        title: "AI presentation maker",
        items: [
          { icon: <TbDeviceTv size={16} />, label: "Generate PPT", link: "" },
          { icon: <FaEdit size={16} />, label: "Edit PPT", link: "" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "View & Edit",
        items: [
          { icon: <FaPencilAlt size={16} />, label: "Edit PDF", link: "" },
          { icon: <FaEdit size={16} />, label: "Annote PDF", link: "" },
          { icon: <FaBookOpen size={16} />, label: "PDF Reader", link: "" },
          { icon: <FaHashtag size={16} />, label: "Number Pages", link: "" },
          { icon: <FaCrop size={16} />, label: "Crop PDF", link: "" },
          { icon: <FaEraser size={16} />, label: "Redact PDF", link: "" },
          { icon: <FaTint size={16} />, label: "Watermark PDF", link: "" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Organize",
        items: [
          { icon: <FaObjectGroup size={16} />, label: "Merge PDF", link: "/Organize" },
          { icon: <FaCodeBranch size={16} />, label: "Split PDF", link: "/Organize-Split-PDF/Pdf-Upload" },
          { icon: <FaRedo size={16} />, label: "Rotate PDF", link: "" },
          { icon: <FaTrash size={16} />, label: "Delete PDF", link: "" },
          { icon: <FaFileExport size={16} />, label: "Extract PDF", link: "" },
          { icon: <FaTh size={16} />, label: "Organize PDF", link: "" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "PDF Security",
        items: [
          { icon: <FaUnlock size={16} />, label: "Unlock PDF", link: "" },
          { icon: <FaLock size={16} />, label: "Lock PDF", link: "" },
          { icon: <FaFileDownload size={16} />, label: "Flat PDF", link: "/drop-file" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Sign",
        items: [{ icon: <FaSignature size={16} />, label: "Sign PDF", link: "/esign" }],
      },
      {
        title: "Compress",
        items: [{ icon: <FaCompress size={16} />, label: "Compress PDF", link: "/pdfcompress" }],
      },
      {
        title: "Scan",
        items: [{ icon: <LuFileScan size={16} />, label: "PDF Scanner", link: "/scanner" }],
      },
    ],
  },
];

export default function PdfToolsSection() {
  return (
    <div className="bg-white px-4 lg:px-[200px] md:px-[100px] sm:px-[100px] py-16 lg:h-[450px] h-auto w-full shadow-2xl overflow-x-hidden lg:overflow-y-hidden z-100">
      <div className="flex flex-wrap gap-14 items-start">
        {tools.map((group, index) => (
          <div key={index} className="flex flex-col gap-4" style={{ height: "400px" }}>
            {group.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-gray-500 font-medium mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      {item.link && item.link !== "#" ? (
                        <Link href={item.link}>
                          <div className="flex items-center gap-2 text-[12px] text-black hover:text-white hover:bg-[#06044B] px-2 py-1 rounded-md transition-all duration-200 cursor-pointer">
                            <div className="bg-[#06044B] text-white p-1.5 rounded-md text-[12px]">
                              {item.icon}
                            </div>
                            {item.label}
                          </div>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2 text-[12px] text-gray-400 bg-gray-100 px-2 py-1 rounded-md cursor-not-allowed">
                          <div className="bg-gray-400 text-white p-1.5 rounded-md text-[12px]">
                            {item.icon}
                          </div>
                          {item.label}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
