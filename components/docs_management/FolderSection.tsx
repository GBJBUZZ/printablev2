"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderIcon } from "lucide-react";

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

interface FolderSectionProps {
  folders: FolderType[];
  fileSelection: string;
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string | null>>;
  setFileselection: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteFolder: (folder: FolderType) => Promise<void>;
  handleRenameFolder: (folder: FolderType, newName: string) => Promise<void>;
  setRenameFolder: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; folder: FolderType | null }>
  >;
  isLoadingDeleteFolder: boolean;
}

const FolderSection: React.FC<FolderSectionProps> = ({
  folders,
  fileSelection,
  setCurrentFolderId,
  setFileselection,
  handleDeleteFolder,
  setRenameFolder,
  isLoadingDeleteFolder,
}) => {
  const [openFolderMenuIndex, setOpenFolderMenuIndex] = useState<number | null>(
    null
  );
  const folderMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openFolderMenuIndex !== null) {
        const currentRef = folderMenuRefs.current[openFolderMenuIndex];
        if (
          currentRef &&
          !currentRef.contains(event.target as Node) &&
          !(event.target as HTMLElement).closest(
            `[data-folder-menu="${openFolderMenuIndex}"]`
          )
        ) {
          setOpenFolderMenuIndex(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFolderMenuIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex flex-col items-start w-full mt-12"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-black mb-6 font-medium">Folders</p>
      {folders.length > 0 ? (
        <div className="flex flex-wrap gap-4 w-full">
          <AnimatePresence>
            {folders.map((folder, idx) => (
              <motion.div
                key={folder.folderId || "root"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className={`relative flex items-center justify-between ${
                  fileSelection === folder.folderName
                    ? "bg-[#06044B] text-white"
                    : "bg-white"
                } rounded-lg p-2 min-w-[150px] w-1/5 cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentFolderId(folder.folderId);
                  setFileselection(folder.folderName);
                  setOpenFolderMenuIndex(null); // Close any open folder menus
                }}
              >
                <div className="flex items-center gap-x-2">
                  <FolderIcon className="h-6 w-6" />
                  <p
                    className={
                      fileSelection === folder.folderName
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    {folder.folderName}
                  </p>
                </div>
                <button
                  data-folder-menu={idx}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenFolderMenuIndex(
                      openFolderMenuIndex === idx ? null : idx
                    );
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
                <AnimatePresence>
                  {openFolderMenuIndex === idx && (
                    <motion.div
                      ref={(el : any) => (folderMenuRefs.current[idx] = el)}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-10 bg-white border shadow-lg rounded-lg z-50 w-[120px] text-sm overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenameFolder({ isOpen: true, folder: folder });
                          setOpenFolderMenuIndex(null);
                        }}
                      >
                        Rename
                      </div>
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder);
                          setOpenFolderMenuIndex(null);
                        }}
                      >
                        Delete
                        {isLoadingDeleteFolder && (
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
          <FolderIcon className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500 mb-2">No folders found</p>
          {/* This button will be handled by the parent to open the create folder dialog */}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FolderSection;
