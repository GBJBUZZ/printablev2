"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, FolderIcon } from "lucide-react";

interface AddFileFolderMenuProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<{ file: boolean }>>;
  setCreateFolder: React.Dispatch<React.SetStateAction<boolean>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isLoadingUploadFile: boolean;
  addMenuRef: React.RefObject<HTMLDivElement>;
}

const AddFileFolderMenu: React.FC<AddFileFolderMenuProps> = ({
  visible,
  setVisible,
  setCreateFolder,
  fileInputRef,
  isLoadingUploadFile,
  addMenuRef,
}) => {
  return (
    <div
      data-add-button="true"
      className="flex bg-white rounded-full items-center cursor-pointer p-2 px-4 hover:shadow-md transition-all duration-200"
      onClick={(e) => {
        e.stopPropagation();
        setVisible((prev) => ({
          ...prev,
          file: !prev.file,
        }));
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3 mr-2"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      <p className="text-black">Add</p>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={addMenuRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col p-2 absolute bg-white top-12 right-12 min-w-[190px] rounded-lg z-50 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer py-2 p-2 rounded-md transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setCreateFolder(true);
                setVisible((prev) => ({ ...prev, file: false }));
              }}
            >
              <FolderIcon className="h-5 w-5" />
              <p>New Folder</p>
            </div>
            <div
              className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer py-2 p-2 rounded-md transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
                setVisible((prev) => ({ ...prev, file: false }));
              }}
            >
              <Upload className="h-5 w-5" />
              <p>Upload File</p>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddFileFolderMenu;
