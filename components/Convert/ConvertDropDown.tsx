"use client";

import { useState, useEffect, useRef } from "react";
import LeftSectionElement from "./LeftSectionElement";
import RightSectionElement from "./RightSectionElement";
import { motion, AnimatePresence } from "framer-motion";

// Add new variants for animations
const mobileDropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const mobileItemVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Add these animation variants at the top (same as ToolsDropDown)
const dropdownContentVariants = {
  initial: {
    height: 0,
    opacity: 0,
    y: -10,
  },
  animate: {
    height: "auto",
    opacity: 1,
    y: 0,
  },
  exit: {
    height: 0,
    opacity: 0,
    y: -10,
  },
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

interface ConvertDropDownProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  closeNavbar?: () => void; // Add this prop definition
}

export default function ConvertDropdown({
  isOpen,
  onToggle,
  closeNavbar, // Add this prop
  isMobile = false,
}: ConvertDropDownProps & { isMobile?: boolean }) {
  const [activeSection, setActiveSection] = useState<"from-pdf" | "to-pdf">("from-pdf");
  const [mobileSections, setMobileSections] = useState({
    fromPdf: false,
    toPdf: false,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add toggleMobileSection function
  const toggleMobileSection = (section: keyof typeof mobileSections) => {
    setMobileSections((prev) => ({
      ...Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === section ? !prev[key as keyof typeof prev] : false,
        }),
        {} as typeof prev
      ),
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle(false);
        setActiveSection("from-pdf");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="px-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <motion.div className="bg-[#06044b]/10 rounded-md p-2 space-y-2">
              {/* From PDF Section */}
              <motion.div className="space-y-1">
                <motion.button
                  className="w-full text-left px-2 text-base font-medium hover:bg-[#06044b]/50 rounded-md flex justify-between items-center"
                  onClick={() => toggleMobileSection("fromPdf")}
                >
                  <span>Convert from PDF</span>
                  <span
                    className={`transform transition-transform duration-200 text-xs ${
                      mobileSections.fromPdf ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {mobileSections.fromPdf && (
                    <motion.div
                      className="grid grid-cols-1 gap-1.5 pl-2"
                      variants={dropdownContentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 },
                      }}
                    >
                      <RightSectionElement
                        text="PDF to Word"
                        src="/docx.png"
                        link="/pdf/to/word"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="PDF to Excel"
                        src="/excel.png"
                        link="/pdf/to/excel"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="PDF to PPT"
                        src="/ppt.png"
                        link="/pdf/to/ppt"
                        onClose={() => onToggle(false)}
                      />
                      <RightSectionElement
                        text="PDF to JPG"
                        src="/img.png"
                        link="/pdf/to/image"
                        onClose={() => onToggle(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* To PDF Section */}
              <motion.div className="space-y-1">
                <motion.button
                  className="w-full text-left px-2 py-1.5 text-base font-medium hover:bg-[#06044b]/50 rounded-md flex justify-between items-center"
                  onClick={() => toggleMobileSection("toPdf")}
                >
                  <span>Convert to PDF</span>
                  <span
                    className={`transform transition-transform duration-200 text-xs ${
                      mobileSections.toPdf ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {mobileSections.toPdf && (
                    <motion.div
                      className="grid grid-cols-1 gap-1.5 pl-2"
                      variants={dropdownContentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 },
                      }}
                    >
                      <RightSectionElement
                        text="Word to PDF"
                        src="/docx.png"
                        link="/word/to/pdf"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar} // Add this
                      />
                      <RightSectionElement
                        text="Excel to PDF"
                        src="/excel.png"
                        link="/excel/to/pdf"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar} // Add this
                      />
                      <RightSectionElement
                        text="PPT to PDF"
                        src="/ppt.png"
                        link="/ppt/to/pdf"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar} // Add this
                      />
                      <RightSectionElement
                        text="JPG to PDF"
                        src="/img.png"
                        link="/image/to/pdf"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar} // Add this
                      />
                      <RightSectionElement
                        text="PDF OCR"
                        src="/ocr.png"
                        link=""
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar} // Add this
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // For desktop view, update the animation timing
  return (
    <div className="relative hover:text-[#61e987]">
      <button
        onClick={() => onToggle(!isOpen)}
        className="px-3 py-2 text-sm font-medium flex items-center hover:cursor-pointer hover:underline"
      >
        Convert ▼
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            initial={{
              opacity: 0,
              scale: 0.98,
              y: -10,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: -10,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="absolute top-full left-0 mt-6 w-[655px] h-[421px] bg-[#E6E6ED] text-black rounded-md shadow-xl z-50 p-4 flex gap-4"
          >
            {/* Left Section */}
            <motion.div className="bg-[#FFFFFF] rounded-md z-50 p-4 w-3/5">
              <h5 className="text-xs mb-4">Convert</h5>
              <div className="flex flex-col space-y-2">
                <LeftSectionElement
                  text="Convert from PDF"
                  onClick={() => setActiveSection("from-pdf")}
                  src="/ai.png"
                />
                <LeftSectionElement
                  text="Convert to PDF"
                  onClick={() => setActiveSection("to-pdf")}
                  src="/ai.png"
                />
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div className="bg-[#FFFFFF] rounded-md z-50 p-4 w-2/5">
              {activeSection === "from-pdf" ? (
                <motion.div>
                  <h5 className="text-xs mb-4">Convert from PDF</h5>
                  <div className="flex flex-col space-y-2">
                    <RightSectionElement
                      text="PDF to Word"
                      src="/docx.png"
                      link="/pdf/to/word"
                      onClose={() => onToggle(false)}
                      closeNavbar={closeNavbar}
                    />
                    <RightSectionElement
                      text="PDF to Excel"
                      src="/excel.png"
                      link="/pdf/to/excel"
                      onClose={() => onToggle(false)}
                      closeNavbar={closeNavbar}
                    />
                    <RightSectionElement
                      text="PDF to PPT"
                      src="/ppt.png"
                      link="/pdf/to/ppt"
                      onClose={() => onToggle(false)}
                    />
                    <RightSectionElement
                      text="PDF to JPG"
                      src="/img.png"
                      link="/pdf/to/image"
                      onClose={() => onToggle(false)}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div>
                  <h5 className="text-xs mb-4">Convert to PDF</h5>
                  <div className="flex flex-col space-y-2">
                    <RightSectionElement
                      text="Word to PDF"
                      src="/docx.png"
                      link="/word/to/pdf"
                      onClose={() => onToggle(false)}
                      closeNavbar={closeNavbar} // Add this
                    />
                    <RightSectionElement
                      text="Excel to PDF"
                      src="/excel.png"
                      link="/excel/to/pdf"
                      onClose={() => onToggle(false)}
                      closeNavbar={closeNavbar} // Add this
                    />
                    <RightSectionElement
                      text="PPT to PDF"
                      src="/ppt.png"
                      link="/ppt/to/pdf"
                      onClose={() => onToggle(false)}
                      closeNavbar={closeNavbar} // Add this
                    />
                    <RightSectionElement
                      text="JPG to PDF"
                      src="/img.png"
                      link="/image/to/pdf"
                      onClose={() => onToggle(false)}
                      closeNavbar={closeNavbar} // Add this
                    />
                    <RightSectionElement
                      text="PDF OCR"
                      src="/ocr.png"
                      link=""
                      onClose={() => onToggle(false)}
                      closeNavbar={closeNavbar} // Add this
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
