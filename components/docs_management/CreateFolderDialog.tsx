"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateFolderDialogProps {
  createFolder: boolean;
  setCreateFolder: React.Dispatch<React.SetStateAction<boolean>>;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
  handleAddFolder: () => Promise<void>;
  isLoadingAddFolder: boolean;
}

const CreateFolderDialog: React.FC<CreateFolderDialogProps> = ({
  createFolder,
  setCreateFolder,
  folderName,
  setFolderName,
  handleAddFolder,
  isLoadingAddFolder,
}) => {
  return (
    <AnimatePresence>
      {createFolder && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={(e) => {
              e.stopPropagation();
              setCreateFolder(false);
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-xl w-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Enter Folder Name</h2>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-[#06044B] focus:border-transparent transition-all duration-200"
              placeholder="Folder name"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateFolder(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddFolder();
                }}
                className="px-4 py-2 bg-[#06044B] text-white rounded hover:bg-[#06044B]/90 transition-colors duration-200 flex items-center"
                disabled={isLoadingAddFolder}
              >
                Add
                {isLoadingAddFolder && (
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateFolderDialog;
