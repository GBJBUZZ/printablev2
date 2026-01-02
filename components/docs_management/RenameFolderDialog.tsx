"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface RenameFolderDialogProps {
  renameFolder: {
    isOpen: boolean;
    folder: FolderType | null;
  };
  setRenameFolder: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; folder: FolderType | null }>
  >;
  newFolderName: string;
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>;
  handleRenameFolder: (folder: FolderType, newName: string) => Promise<void>;
}

const RenameFolderDialog: React.FC<RenameFolderDialogProps> = ({
  renameFolder,
  setRenameFolder,
  newFolderName,
  setNewFolderName,
  handleRenameFolder,
}) => {
  return (
    <AnimatePresence>
      {renameFolder.isOpen && renameFolder.folder && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={(e) => {
              e.stopPropagation();
              setRenameFolder({ isOpen: false, folder: null });
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
            <h2 className="text-lg font-semibold mb-4">Rename Folder</h2>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-[#06044B] focus:border-transparent transition-all duration-200"
              placeholder="New folder name"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRenameFolder({ isOpen: false, folder: null });
                  setNewFolderName("");
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (renameFolder.folder && newFolderName.trim()) {
                    handleRenameFolder(renameFolder.folder, newFolderName);
                    setRenameFolder({ isOpen: false, folder: null });
                    setNewFolderName("");
                  }
                }}
                className="px-4 py-2 bg-[#06044B] text-white rounded hover:bg-[#06044B]/90 transition-colors duration-200"
              >
                Rename
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RenameFolderDialog;
