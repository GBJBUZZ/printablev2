"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LeftSectionElement from "../Convert/LeftSectionElement";
import RightSectionElement from "../Convert/RightSectionElement";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface ToolsDropDownProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  closeNavbar?: () => void; // Add this prop
}

type ActiveSection =
  | "AIPDF"
  | "View&Edit"
  | "Organize"
  | "AIPresenet"
  | "MoreTools";

type MobileSection = {
  title: string;
  isOpen: boolean;
};

const LEFT_FIXED_WIDTH = 369;
const LEFT_FIXED_HEIGHT = 412;
const DIVIDER_WIDTH = 12;

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

const mainDropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
};

export default function ToolsDropDown({
  isOpen,
  onToggle,
  closeNavbar, // Add this prop
  isMobile = false,
}: ToolsDropDownProps & { isMobile?: boolean }) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("AIPDF");
  const [mobileSections, setMobileSections] = useState({
    aiPdf: false,
    viewEdit: false,
    organize: false,
    aiPresentation: false,
    moreTools: false,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const rightWidthMapping: Record<ActiveSection, number> = {
    AIPDF: 301,
    "View&Edit": 241,
    Organize: 241,
    AIPresenet: 211,
    MoreTools: 441,
  };

  const [rightWidth, setRightWidth] = useState<number>(
    rightWidthMapping[activeSection],
  );

  const containerWidth = LEFT_FIXED_WIDTH + DIVIDER_WIDTH + rightWidth;

  useEffect(() => {
    setRightWidth(rightWidthMapping[activeSection]);
  }, [activeSection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle(false);
        setActiveSection("AIPDF");
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const toggleMobileSection = (section: keyof typeof mobileSections) => {
    setMobileSections((prev) => ({
      ...Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === section ? !prev[key as keyof typeof prev] : false,
        }),
        {} as typeof prev,
      ),
    }));
  };

  const renderRightSection = () => {
    switch (activeSection) {
      case "AIPDF":
        return (
          <div className="flex flex-col space-y-2">
            <RightSectionElement
              text="Chat With PDF"
              src="/AI-PDF/chat.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="AI PDF Summarizer"
              src="/AI-PDF/summarize.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Translate PDF"
              src="/AI-PDF/translate.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="AI Questions Generator"
              src="/AI-PDF/aiquestion.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
          </div>
        );
      case "View&Edit":
        return (
          <div className="grid grid-cols gap-2">
            <RightSectionElement
              text="Edit PDF"
              src="/VIEWANDEDIT/text.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Annote PDF"
              src="/VIEWANDEDIT/annote.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="PDF Reader"
              src="/VIEWANDEDIT/reader.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Number Pages"
              src="/VIEWANDEDIT/number.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Crop PDF"
              src="/VIEWANDEDIT/crop.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Redact PDF"
              src="/VIEWANDEDIT/redact.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Watermark PDF"
              src="/VIEWANDEDIT/watermark.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
          </div>
        );
      case "Organize":
        return (
          <div className="flex flex-col space-y-2">
            <RightSectionElement
              text="Merge PDF"
              src="/ORGANIZE/merge.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Split PDF"
              src="/ORGANIZE/split.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Rotate PDF"
              src="/ORGANIZE/rotate.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Delete Pages"
              src="/ORGANIZE/delete.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Extract PDF Pages"
              src="/ORGANIZE/extract.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Organize Pages"
              src="/ORGANIZE/organize.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
          </div>
        );
      case "AIPresenet":
        return (
          <div className="flex flex-col space-y-2">
            <RightSectionElement
              text="Generate"
              src="/AI-PRESENTATION/generate.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Single Slide"
              src="/AI-PRESENTATION/single.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
            <RightSectionElement
              text="Edit PPT"
              src="/AI-PRESENTATION/edit.png"
              onClose={() => onToggle(false)}
              closeNavbar={closeNavbar}
            />
          </div>
        );
      case "MoreTools":
        return (
          <div className="grid grid-cols-2 gap-x-8">
            <div className="flex flex-col space-y-6">
              <div>
                <h5 className="text-xs mb-2">Sign</h5>
                <RightSectionElement
                  text="Sign PDF"
                  src="/tools/sign.png"
                  onClose={() => onToggle(false)}
                  closeNavbar={closeNavbar}
                />
              </div>
              <div>
                <h5 className="text-xs mb-2">Compress</h5>
                <RightSectionElement
                  text="Compress PDF"
                  src="/tools/compress.png"
                  onClose={() => onToggle(false)}
                  link="/pdfcompress"
                  closeNavbar={closeNavbar}
                />
              </div>
              <div>
                <h5 className="text-xs mb-2">Scan</h5>
                <RightSectionElement
                  text="PDF Scanner"
                  src="/tools/scanner.png"
                  onClose={() => onToggle(false)}
                  closeNavbar={closeNavbar}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div>
                <h5 className="text-xs mb-2">PDF Security</h5>
                <div className="flex flex-col space-y-2">
                  <RightSectionElement
                    text="Unlock PDF"
                    src="/tools/unlock.png"
                    onClose={() => onToggle(false)}
                    closeNavbar={closeNavbar}
                  />
                  <RightSectionElement
                    text="Protect PDF"
                    src="/tools/lock.png"
                    onClose={() => onToggle(false)}
                    closeNavbar={closeNavbar}
                  />
                  <RightSectionElement
                    text="Flat PDF"
                    src="/tools/flat.png"
                    onClose={() => onToggle(false)}
                    link="/drop-file"
                    closeNavbar={closeNavbar}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-sm text-gray-500">
            Please select a tool from the left menu
          </div>
        );
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="px-2"
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              opacity: { duration: 0.2 },
              height: { duration: 0.3 },
            }}
            style={{ overflow: "hidden" }}
          >
            <motion.div className="bg-[#06044b]/10 rounded-md p-2 space-y-2">
              {/* AI PDF Section */}
              <motion.div className="space-y-1">
                <motion.button
                  className="w-full text-left px-2  text-base font-medium hover:bg-[#06044b]/50 rounded-md flex justify-between items-center"
                  onClick={() => toggleMobileSection("aiPdf")}
                >
                  <span>AI PDF</span>
                  <span
                    className={`transform transition-transform duration-200 text-xs ${
                      mobileSections.aiPdf ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {mobileSections.aiPdf && (
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
                        text="Chat With PDF"
                        src="/AI-PDF/chat.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="AI PDF Summarizer"
                        src="/AI-PDF/summarize.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Translate PDF"
                        src="/AI-PDF/translate.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* View & Edit Section */}
              <motion.div className="space-y-1">
                <motion.button
                  className="w-full text-left px-2 py-1.5 text-base font-medium hover:bg-[#06044b]/50 rounded-md flex justify-between items-center"
                  onClick={() => toggleMobileSection("viewEdit")}
                >
                  <span>View & Edit</span>
                  <span
                    className={`transform transition-transform duration-200 text-xs ${
                      mobileSections.viewEdit ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {mobileSections.viewEdit && (
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
                        text="Edit PDF"
                        src="/VIEWANDEDIT/text.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="PDF Reader"
                        src="/VIEWANDEDIT/reader.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Organize Section */}
              <motion.div className="space-y-1">
                <motion.button
                  className="w-full text-left px-2 py-1.5 text-base font-medium hover:bg-[#06044b]/50 rounded-md flex justify-between items-center"
                  onClick={() => toggleMobileSection("organize")}
                >
                  <span>Organize</span>
                  <span
                    className={`transform transition-transform duration-200 text-xs ${
                      mobileSections.organize ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {mobileSections.organize && (
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
                        text="Merge PDF"
                        src="/ORGANIZE/merge.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Split PDF"
                        src="/ORGANIZE/split.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* AI Presentation Section */}
              <motion.div className="space-y-1">
                <motion.button
                  className="w-full text-left px-2 py-1.5 text-base font-medium hover:bg-[#06044b]/50 rounded-md flex justify-between items-center"
                  onClick={() => toggleMobileSection("aiPresentation")}
                >
                  <span>AI Presentation</span>
                  <span
                    className={`transform transition-transform duration-200 text-xs ${
                      mobileSections.aiPresentation ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {mobileSections.aiPresentation && (
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
                        text="Generate"
                        src="/AI-PRESENTATION/generate.png"
                        onClose={() => onToggle(false)}
                        onClick={() => router.push("/presentation-maker")}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Single Slide"
                        src="/AI-PRESENTATION/single.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Edit PPT"
                        src="/AI-PRESENTATION/edit.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* More Tools Section */}
              <motion.div className="space-y-1">
                <motion.button
                  className="w-full text-left px-2 py-1.5 text-base font-medium hover:bg-[#06044b]/50 rounded-md flex justify-between items-center"
                  onClick={() => toggleMobileSection("moreTools")}
                >
                  <span>More Tools</span>
                  <span
                    className={`transform transition-transform duration-200 text-xs ${
                      mobileSections.moreTools ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </motion.button>

                <AnimatePresence mode="wait">
                  {mobileSections.moreTools && (
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
                        text="Sign PDF"
                        src="/tools/sign.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Compress PDF"
                        src="/tools/compress.png"
                        onClose={() => onToggle(false)}
                        link="/pdfcompress"
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="PDF Scanner"
                        src="/tools/scanner.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Unlock PDF"
                        src="/tools/unlock.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Protect PDF"
                        src="/tools/lock.png"
                        onClose={() => onToggle(false)}
                        closeNavbar={closeNavbar}
                      />
                      <RightSectionElement
                        text="Flat PDF"
                        src="/tools/flat.png"
                        onClose={() => onToggle(false)}
                        link="/drop-file"
                        closeNavbar={closeNavbar}
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

  return (
    <div className="relative hover:text-[#61e987]">
      <button
        onClick={() => onToggle(!isOpen)}
        className="px-3 py-2 text-sm font-medium flex items-center gap-1 hover:cursor-pointer"
      >
        Tool
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            variants={mainDropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="absolute left-0 mt-6 bg-[#E6E6ED] text-black rounded-md shadow-xl z-50 p-4"
            style={{
              width: containerWidth,
              height: LEFT_FIXED_HEIGHT,
            }}
          >
            <div className="flex h-full">
              {/* Left Section */}
              <motion.div
                className="bg-white rounded-md p-4 flex flex-col h-full"
                style={{ width: LEFT_FIXED_WIDTH, flexShrink: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h5 className="text-xs mb-4">Convert</h5>
                <div className="flex flex-col space-y-2 flex-1 overflow-hidden">
                  <LeftSectionElement
                    text="AI PDF"
                    onClick={() => setActiveSection("AIPDF")}
                    src="/ai.png"
                  />
                  <LeftSectionElement
                    text="View & Edit"
                    onClick={() => setActiveSection("View&Edit")}
                    src="/ai.png"
                  />
                  <LeftSectionElement
                    text="Organize"
                    onClick={() => setActiveSection("Organize")}
                    src="/ai.png"
                  />
                  <LeftSectionElement
                    text="AI Presentation Maker"
                    onClick={() => router.push("/presentation-maker")}
                    src="/ai.png"
                  />
                  <div className="mt-auto pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => setActiveSection("MoreTools")}
                    >
                      <span className="text-sm font-medium text-gray-500">
                        More Tools
                      </span>
                      <Image
                        src="/arrow.png"
                        alt=""
                        width={9}
                        height={4.5}
                        className="transition-transform duration-200 text-xs group-hover:translate-x-1"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <div className="bg-[#E6E6ED]" style={{ width: DIVIDER_WIDTH }} />

              {/* Right Section */}
              <motion.div
                className={`bg-white rounded-md p-4 h-full ${
                  activeSection === "View&Edit"
                    ? "overflow-hidden"
                    : "overflow-y-auto"
                }`}
                animate={{ width: rightWidth }}
                initial={false}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                key={activeSection}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col h-full space-y-4"
                >
                  <h5 className="text-xs mb-2">
                    {activeSection.replace("&", " & ")}
                  </h5>
                  <div className="flex flex-col space-y-2 flex-1">
                    {renderRightSection()}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
