"use client";
import React, { useState, useEffect, useRef } from "react";
import { useOrder, DocumentItem } from "@/context/orderContext"; // Ensure DocumentItem is imported
import { motion, AnimatePresence } from "framer-motion";
import { FileIcon, Upload } from "lucide-react";
import PDFThumbnail from "./pdf-canvas-thumbnail"; // Assuming this is a separate component
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

interface FileType {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

interface FolderType {
  folderId: string | null;
  folderName: string;
  files: FileType[];
}

interface FileSectionProps {
  files: FileType[];
  searchText: string;
  handleDeleteFile: (fileId: string, fileName: string) => Promise<void>;
  handleMoveFile: (fileId: string, folderId: string) => Promise<void>;
  folders: FolderType[];
  fileSelection: string;
  isLoadingDeleteFile: boolean;
  isLoadingMoveFile: boolean;
  emptyStateFileInputRef: React.RefObject<HTMLInputElement>;
  isLoadingUploadFile: boolean;
}

const FileSection: React.FC<FileSectionProps> = ({
  files,
  searchText,
  handleDeleteFile,
  handleMoveFile,
  folders,
  fileSelection,
  isLoadingDeleteFile,
  isLoadingMoveFile,
  emptyStateFileInputRef,
  isLoadingUploadFile,
}) => {
  const [openFileMenuIndex, setOpenFileMenuIndex] = useState<string | null>(
    null
  );
  const [select, setSelect] = useState<boolean>(false);
  const { order, dispatch } = useOrder();
  const router = useRouter();
  const { user } = useUser();
  const [isPageTransition, setPageTrasition] = useState<boolean>(false);
  const fileMenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const handleTransition = (file: any, type: string) => {
    switch (type) {
      case "printAndDeliver":
        setPageTrasition(true);
        console.log(file);
        const newDoc: DocumentItem = {
          id: file.fileId,
          fileName: file.fileName,
          fileUrl: file.fileUrl,
          copies: 1,
          colorType: "black and white", // Match exact type string
          paperSize: "A4 (8.27 x 11.69 inches)", // Match exact type string
          printType: "front",
          pageDirection: "vertical",
          pagesToPrint: "All", // <<<---- ADDED DEFAULT
          size: file.fileSize,
        };
        dispatch({ type: "ADD_DOCUMENT", payload: newDoc });
        break;
      case "sign":
        //document other than pdf must be convert into pdf first then process
        console.log("sign");
        const type = file.fileName.split(".").pop()?.toLowerCase();
        console.log(type, file.fileName);
        if (type === "pdf") {
          router.push(
            `/esign/sign-document?fileId=${file.fileId}&fileName=${file.fileName}`
          );
        } else {
          console.log("error");
          toast.error("only pdf file is allowed!!");
        }
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (isPageTransition && order.documents.length > 0) {
      console.log(order);
      setPageTrasition(false);
      router.push(`/print-and-deliver/print/print-options`);
    }
  }, [order.documents, isPageTransition]);
  useEffect(() => {
    const handleCtrlPress = (e : any) => {
      if (select && e.key == "Control") {
        console.log("select");
      } else {
        console.log("unselect");
      }
    };
    document.addEventListener("keydown", handleCtrlPress);
    return () => document.removeEventListener("keydown", handleCtrlPress);
  }, [select]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openFileMenuIndex !== null) {
        const fileMenuRef = fileMenuRefs.current[openFileMenuIndex];
        const fileMenuButton = document.querySelector(
          `[data-file-menu-button="${openFileMenuIndex}"]`
        );
        if (
          fileMenuRef &&
          !fileMenuRef.contains(event.target as Node) &&
          fileMenuButton !== event.target &&
          !fileMenuButton?.contains(event.target as Node)
        ) {
          setOpenFileMenuIndex(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFileMenuIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="flex flex-col justify-start w-full mt-12"
      onClick={(e) => e.stopPropagation()}
    >
      <ToastContainer />
      <p className="text-black mb-6 font-medium">
        {searchText.trim() !== ""
          ? `Search Results for "${searchText}"`
          : `Files of ${fileSelection}`}
      </p>

      {files.length > 0 ? (
        <div className="flex flex-wrap gap-4 w-full">
          <AnimatePresence>
            {files.map((item: FileType, index) => (
              <motion.div
                key={item.fileId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  staggerChildren: 0.05,
                  delayChildren: 0.05 * index,
                }}
                className="relative flex flex-col bg-white rounded-lg p-2 min-w-[200px] min-h-[150px] group"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="overflow-hidden rounded-lg "
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(select);
                    setSelect((prev) => !prev);
                  }}
                >
                  {item.fileType.includes("pdf") ? (
                    <PDFThumbnail url={item.fileUrl} alt={item.fileName} />
                  ) : (
                    <img
                      src={item.fileUrl || "/placeholder.svg"}
                      alt={item.fileName}
                      className="w-[200px] h-[150px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-black/70 text-sm truncate max-w-[160px]">
                    {item.fileName}
                  </p>
                  <button
                    data-file-menu-button={item.fileId}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (openFileMenuIndex === item.fileId) {
                        setOpenFileMenuIndex(null);
                      } else {
                        setOpenFileMenuIndex(item.fileId);
                      }
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
                <AnimatePresence>
                  {openFileMenuIndex === item.fileId && (
                    <motion.div
                      data-file-menu={item.fileId}
                      ref={(el : any) => (fileMenuRefs.current[item.fileId] = el)}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-8 bg-white border shadow-lg rounded-lg z-[100] w-[150px] text-sm overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenFileMenuIndex(null);
                          console.log("renames");
                          // Handle rename file logic if needed
                        }}
                      >
                        Rename
                      </div>
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("renames");
                          handleDeleteFile(item.fileId, item.fileName);
                        }}
                      >
                        Delete
                        {isLoadingDeleteFile && (
                          <svg
                            className="animate-spin ml-2 h-4 w-4 inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </div>
                      <div className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <span>Move to Folder</span>
                          {isLoadingMoveFile && (
                            <svg
                              className="animate-spin ml-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <select
                          className="w-full mt-1 p-1 text-black bg-white rounded focus:ring-2 focus:ring-[#06044B] focus:outline-none transition-all duration-200"
                          onChange={(e) => {
                            e.stopPropagation();
                            if (e.target.value) {
                              handleMoveFile(item.fileId, e.target.value);
                              setOpenFileMenuIndex(null); // Close menu after selection
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="">Select folder</option>
                          {folders.map(
                            (folder) =>
                              folder.folderName !== fileSelection && (
                                <option
                                  key={folder.folderId}
                                  value={folder.folderId || ""}
                                >
                                  {folder.folderName}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenFileMenuIndex(null);
                          console.log("renames");
                          handleTransition(item, "sign");
                        }}
                      >
                        Sign Document
                      </div>
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTransition(item, "printAndDeliver");
                        }}
                      >
                        <span>Order Print</span>
                        {isPageTransition && (
                          <svg
                            className="animate-spin ml-2 h-4 w-4 inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center w-full p-8 bg-white/50 rounded-lg border border-dashed border-gray-300"
        >
          <FileIcon className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500 mb-2">
            {searchText.trim() !== ""
              ? "No files match your search"
              : "No files in this folder"}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              emptyStateFileInputRef.current?.click();
            }}
            className="mt-2 px-4 py-2 bg-[#06044B] text-white rounded-md hover:bg-[#06044B]/90 transition-colors duration-200 flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Files
            {isLoadingUploadFile && (
              <svg
                className="animate-spin ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Or drag and drop files here
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileSection;
