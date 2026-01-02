"use client";
import { useUser } from "@clerk/nextjs";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Search, X, FolderIcon, FileIcon, Loader2, Upload } from "lucide-react";
import PDFThumbnail from "./pdf-canvas-thumbnail";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Ensure the worker is set
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

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

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api`;

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

function AllFile() {
  const { toast } = useToast();
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [openFolderMenuIndex, setOpenFolderMenuIndex] = useState<number | null>(
    null
  );
  const [openFileMenuIndex, setOpenFileMenuIndex] = useState<string | null>(
    null
  );
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [originalFolders, setOriginalFolders] = useState<FolderType[]>([]);
  const [fileSelection, setFileselection] = useState<string>("Root");
  const [searchText, setSearchText] = useState<string>("");
  const [visible, setVisible] = useState({ file: false });
  const { user, isLoaded } = useUser();

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<{
    addFolder: boolean;
    uploadFile: boolean;
    deleteFolder: boolean;
    moveFile: boolean;
    deleteFile: boolean;
  }>({
    addFolder: false,
    uploadFile: false,
    deleteFolder: false,
    moveFile: false,
    deleteFile: false,
  });
  const [renameFolder, setRenameFolder] = useState<{
    isOpen: boolean;
    folder: FolderType | null;
  }>({
    isOpen: false,
    folder: null,
  });
  const [newFolderName, setNewFolderName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const emptyStateFileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const folderMenuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fileMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close Add menu if clicked outside
      if (
        visible.file &&
        addMenuRef.current &&
        !addMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-add-button="true"]')
      ) {
        setVisible((prev) => ({ ...prev, file: false }));
      }

      // Close folder menus if clicked outside
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

      // Close file menus if clicked outside
      if (openFileMenuIndex !== null) {
        const fileMenuRef = document.querySelector(
          `[data-file-menu="${openFileMenuIndex}"]`
        );
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
  }, [visible.file, openFolderMenuIndex, openFileMenuIndex]);

  // Fetch folders and files from backend
  const fetchFolders = async () => {
    setIsDataLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/fileManagement/getFiles/${user?.id}`,
        {
          method: "GET",
        }
      );
      const result: { msg: string; data: FolderType[] } = await response.json();
      setFolders(result.data);
      setOriginalFolders(result.data); // Store original data for search filtering
    } catch (error) {
      console.error("Error fetching folders:", error);
      toast({
        title: "Error",
        description: "Failed to load your files and folders",
        variant: "destructive",
      });
    } finally {
      setIsDataLoading(false);
    }
  };

  // Initial data fetch and refetch after actions
  useEffect(() => {
    fetchFolders();
  }, [user]);

  // Add this useEffect after the other useEffects
  useEffect(() => {
    if (renameFolder.isOpen && renameFolder.folder) {
      setNewFolderName(renameFolder.folder.folderName);
    }
  }, [renameFolder]);

  // Search logic
  useEffect(() => {
    if (searchText.trim() === "") {
      // Reset to original data when search is cleared
      setFolders(originalFolders);
    } else {
      const regex = new RegExp(searchText, "i");

      // If we're searching, create a filtered version of folders
      // where each folder only contains files that match the search
      const filteredFolders = originalFolders.map((folder) => ({
        ...folder,
        files: folder.files.filter((file) => regex.test(file.fileName)),
      }));

      setFolders(filteredFolders);
    }
  }, [searchText, originalFolders]);

  // Drag and drop functionality
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.add("bg-blue-50", "border-blue-300");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("bg-blue-50", "border-blue-300");
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("bg-blue-50", "border-blue-300");

      if (!e.dataTransfer?.files.length) return;

      const file = e.dataTransfer.files[0];
      await uploadFile(file);
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [fileSelection]);

  // Add folder
  const handleAddFolder = async () => {
    if (!folderName.trim()) return;
    setIsLoading((prev) => ({ ...prev, addFolder: true }));

    const payload = {
      folderName,
      ownerId: user?.id,
    };

    try {
      const response = await fetch(`${API_URL}/fileManagement/createFolder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFolderName("");
        setCreateFolder(false);
        await fetchFolders(); // Refetch data
        toast({
          title: "Success",
          description: `Folder "${folderName}" created successfully`,
        });
      } else {
        console.error("Failed to add folder");
        toast({
          title: "Error",
          description: "Failed to create folder",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding folder:", error);
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, addFolder: false }));
    }
  };

  // Upload file
  const uploadFile = async (file: File) => {
    if (!file) {
      console.error("No file provided");
      return;
    }

    if (!fileSelection) {
      console.error("No folder selected");
      return;
    }

    console.log("Uploading file:", file.name, "to folder:", fileSelection);

    setIsLoading((prev) => ({ ...prev, uploadFile: true }));
    const formData = new FormData();
    const fileId = String(Date.now());
    formData.append("file", file);
    formData.append("ownerId", user?.id as string);
    formData.append("fileId", fileId);

    // Find the current folder ID
    const currentFolder = folders.find(
      (folder) => folder.folderName === fileSelection
    );
    if (currentFolder?.folderId) {
      formData.append("folderId", currentFolder.folderId);
    }

    try {
      console.log("Sending request to upload file");
      const response = await fetch(`${API_URL}/esign/upload-document`, {
        method: "POST",
        body: formData,
      });
      if (currentFolderId !== null) {
        await handleMoveFile(fileId, currentFolderId);
      }

      if (response.ok) {
        console.log("File uploaded successfully");
        await fetchFolders(); // Refetch data
        toast({
          title: "Success",
          description: `File "${file.name}" uploaded successfully`,
        });
      } else {
        const errorText = await response.text();
        console.error("Failed to upload file:", errorText);
        toast({
          title: "Error",
          description: "Failed to upload file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, uploadFile: false }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input change detected");
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      await uploadFile(file);
      // Reset the input so the same file can be selected again
      e.target.value = "";
    }
  };

  // Rename folder
  const handleRenameFolder = async (folder: FolderType, newName: string) => {
    if (!newName.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/fileManagement/renameFolder/${folder.folderId}/${newName}`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        setOpenFolderMenuIndex(null);
        await fetchFolders(); // Refetch data
        toast({
          title: "Success",
          description: `Folder renamed to "${newName}" successfully`,
        });
      } else {
        console.error("Failed to rename folder");
        toast({
          title: "Error",
          description: "Failed to rename folder",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error renaming folder:", error);
      toast({
        title: "Error",
        description: "Failed to rename folder",
        variant: "destructive",
      });
    }
  };

  // Delete folder
  const handleDeleteFolder = async (folder: FolderType) => {
    setIsLoading((prev) => ({ ...prev, deleteFolder: true }));
    try {
      const response = await fetch(
        `${API_URL}/fileManagement/deleteFolder/${folder.folderId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOpenFolderMenuIndex(null);
        await fetchFolders(); // Refetch data
        toast({
          title: "Success",
          description: `Folder "${folder.folderName}" deleted successfully`,
        });
      } else {
        console.error("Failed to delete folder");
        toast({
          title: "Error",
          description: "Failed to delete folder",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, deleteFolder: false }));
    }
  };

  // Move file to folder
  const handleMoveFile = async (fileId: string, folderId: string) => {
    setIsLoading((prev) => ({ ...prev, moveFile: true }));
    try {
      const response = await fetch(
        `${API_URL}/fileManagement/moveFileToFolder`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId, folderId }),
        }
      );

      if (response.ok) {
        setOpenFileMenuIndex(null);
        await fetchFolders(); // Refetch data
        toast({
          title: "Success",
          description: "File moved successfully",
        });
      } else {
        console.error("Failed to move file");
        toast({
          title: "Error",
          description: "Failed to move file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error moving file:", error);
      toast({
        title: "Error",
        description: "Failed to move file",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, moveFile: false }));
    }
  };

  // Delete file
  const handleDeleteFile = async (fileId: string, fileName: string) => {
    setIsLoading((prev) => ({ ...prev, deleteFile: true }));
    try {
      const response = await fetch(`${API_URL}/fileManagement/deleteFile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId,
          ownerId: user?.id,
          fileName,
        }),
      });

      if (response.ok) {
        setOpenFileMenuIndex(null);
        await fetchFolders(); // Refetch data
        toast({
          title: "Success",
          description: `File "${fileName}" deleted successfully`,
        });
      } else {
        console.error("Failed to delete file");
        toast({
          title: "Error",
          description: "Failed to delete file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, deleteFile: false }));
    }
  };

  // Handle background click to close menus
  const handleBackgroundClick = () => {
    // Close all menus when clicking on the background
    setOpenFolderMenuIndex(null);
    setOpenFileMenuIndex(null);
    setVisible((prev) => ({ ...prev, file: false }));
  };

  return (
    <div
      ref={dropAreaRef}
      className="flex flex-col items-center justify-start p-2 bg-[#E6E6ED] rounded-lg min-h-screen w-full transition-colors duration-300"
      onClick={handleBackgroundClick}
    >
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
      />
      <input
        ref={emptyStateFileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
      />

      {/* Add/upload dropdown */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between w-full"
        onClick={(e) => e.stopPropagation()} // Prevent background click from closing menus
      >
        <div className="flex items-center gap-x-4">
          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="font-semibold  text-[#555555] text-2xl  cursor-pointer transition-all duration-200"
            onClick={() => {
              setFileselection("Root");
            }}
          >
            File Manager
          </motion.h2>
        </div>
        <div
          data-add-button="true"
          className="flex bg-white rounded-full items-center cursor-pointer p-2 px-4 hover:shadow-md transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent background click
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
            {visible.file && (
              <motion.div
                ref={addMenuRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col p-2 absolute bg-white top-12 right-12 min-w-[190px] rounded-lg z-50 shadow-lg"
                onClick={(e) => e.stopPropagation()} // Prevent background click
              >
                <div
                  className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer py-2 p-2 rounded-md transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent background click
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
                    e.stopPropagation(); // Prevent background click
                    fileInputRef.current?.click();
                    setVisible((prev) => ({ ...prev, file: false }));
                  }}
                >
                  <Upload className="h-5 w-5" />
                  <p>Upload File</p>
                  {isLoading.uploadFile && (
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
      </motion.div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="w-full mt-6 flex items-center gap-x-2"
        onClick={(e) => e.stopPropagation()} // Prevent background click
      >
        <div className="relative w-11/12">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 py-2 rounded-lg text-sm bg-white w-full focus:ring-2 focus:ring-[#06044B] transition-all duration-200"
            placeholder="Search"
          />
          <Search className="absolute h-4 w-4 top-3 left-3 text-gray-400" />
          {searchText && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent background click
                setSearchText("");
              }}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="bg-white rounded-lg flex items-center px-4 py-2 hover:shadow-md transition-all duration-200 cursor-pointer">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <p className="text-black text-sm ml-2">Filter</p>
        </div>
      </motion.div>

      {isDataLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-64">
          <Loader2 className="h-10 w-10 text-[#06044B] animate-spin mb-4" />
          <p className="text-gray-500">Loading your files and folders...</p>
        </div>
      ) : (
        <>
          {/* Folders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col items-start w-full mt-12"
            onClick={(e) => e.stopPropagation()} // Prevent background click from closing menus
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
                        e.stopPropagation(); // Prevent background click
                        setCurrentFolderId(folder.folderId);
                        setFileselection(folder.folderName);
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
                          e.stopPropagation(); // Prevent background click and folder selection
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
                            ref={(el) => {
                              folderMenuRefs.current[idx] = el;
                            }}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-10 bg-white border shadow-lg rounded-lg z-50 w-[120px] text-sm overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Prevent background click
                          >
                            <div
                              className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent background click
                                setRenameFolder({
                                  isOpen: true,
                                  folder: folder,
                                });
                                setOpenFolderMenuIndex(null);
                              }}
                            >
                              Rename
                            </div>
                            <div
                              className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent background click
                                handleDeleteFolder(folder);
                              }}
                            >
                              Delete
                              {isLoading.deleteFolder && (
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
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent background click
                    setCreateFolder(true);
                  }}
                  className="mt-2 px-4 py-2 bg-[#06044B] text-white rounded-md hover:bg-[#06044B]/90 transition-colors duration-200"
                >
                  Create Folder
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Folder creation */}
          <AnimatePresence>
            {createFolder && (
              <>
                {/* Backdrop blur overlay */}
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

                {/* Folder creation dialog */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-xl w-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevent background click
                >
                  <h2 className="text-lg font-semibold mb-4">
                    Enter Folder Name
                  </h2>
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
                        e.stopPropagation(); // Prevent background click
                        setCreateFolder(false);
                      }}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent background click
                        handleAddFolder();
                      }}
                      className="px-4 py-2 bg-[#06044B] text-white rounded hover:bg-[#06044B]/90 transition-colors duration-200 flex items-center"
                      disabled={isLoading.addFolder}
                    >
                      Add
                      {isLoading.addFolder && (
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

          {/* Folder rename dialog */}
          <AnimatePresence>
            {renameFolder.isOpen && renameFolder.folder && (
              <>
                {/* Backdrop blur overlay */}
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

                {/* Folder rename dialog */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-xl w-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevent background click
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
                        e.stopPropagation(); // Prevent background click
                        setRenameFolder({ isOpen: false, folder: null });
                        setNewFolderName("");
                      }}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent background click
                        if (renameFolder.folder && newFolderName.trim()) {
                          handleRenameFolder(
                            renameFolder.folder,
                            newFolderName
                          );
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

          {/* Files Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-col justify-start w-full mt-12"
            onClick={(e) => e.stopPropagation()} // Prevent background click
          >
            <p className="text-black mb-6 font-medium">
              {searchText.trim() !== ""
                ? `Search Results for "${searchText}"`
                : `Files of ${fileSelection}`}
            </p>

            {/* Get the current folder's files */}
            {(() => {
              const currentFolder = folders.find(
                (folder) => folder.folderName === fileSelection
              );
              const files = currentFolder?.files || [];

              return files.length > 0 ? (
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
                        onClick={(e) => e.stopPropagation()} // Prevent background click
                      >
                        <div className="overflow-hidden rounded-lg">
                          {item.fileType.includes("pdf") ? (
                            <PDFThumbnail
                              url={item.fileUrl}
                              alt={item.fileName}
                            />
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
                              e.stopPropagation(); // Prevent background click
                              if (openFileMenuIndex === item.fileId) {
                                setOpenFileMenuIndex(null);
                              } else {
                                // First set the menu to be shown
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
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-0 top-8 bg-white border shadow-lg rounded-lg z-[100] w-[150px] text-sm overflow-hidden"
                              onClick={(e) => e.stopPropagation()} // Prevent background click
                            >
                              <div
                                className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent background click
                                  setOpenFileMenuIndex(null);
                                }}
                              >
                                Rename
                              </div>
                              <div
                                className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer transition-colors duration-200"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent background click
                                  handleDeleteFile(item.fileId, item.fileName);
                                }}
                              >
                                Delete
                                {isLoading.deleteFile && (
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
                                  {isLoading.moveFile && (
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
                                    e.stopPropagation(); // Prevent background click
                                    if (e.target.value) {
                                      handleMoveFile(
                                        item.fileId,
                                        e.target.value
                                      );
                                    }
                                  }}
                                  onClick={(e) => e.stopPropagation()} // Prevent background click
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
                      e.stopPropagation(); // Prevent background click
                      emptyStateFileInputRef.current?.click();
                    }}
                    className="mt-2 px-4 py-2 bg-[#06044B] text-white rounded-md hover:bg-[#06044B]/90 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Files
                    {isLoading.uploadFile && (
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
              );
            })()}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default AllFile;
