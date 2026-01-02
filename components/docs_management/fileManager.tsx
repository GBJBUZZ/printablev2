"use client";
import { useUser } from "@clerk/nextjs";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import AddFileFolderMenu from "./AddFileFolderMenu";
import SearchAndFilter from "./SearchAndFilter";
import FolderSection from "./FolderSection";
import FileSection from "./FileSection";
import CreateFolderDialog from "./CreateFolderDialog";
import RenameFolderDialog from "./RenameFolderDialog";
import LoadingState from "./LoadingState";

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

const API_URL = "http://localhost:5000/api";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

function FileManagerContainer() {
  const { toast } = useToast();
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
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

  const fileInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const emptyStateFileInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible.file]);

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
    if (user?.id) {
      fetchFolders();
    }
  }, [user]);

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
      const response = await fetch(`${API_URL}/esign/upload-document`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        if (currentFolderId !== null && currentFolderId !== undefined) {
          await handleMoveFile(fileId, currentFolderId);
        }
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
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
      e.target.value = ""; // Reset the input
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

  const handleBackgroundClick = () => {
    setVisible((prev) => ({ ...prev, file: false }));
  };

  const currentFolderFiles =
    folders.find((folder) => folder.folderName === fileSelection)?.files || [];

  return (
    <div
      ref={dropAreaRef}
      className="flex flex-col items-center text-black justify-start p-2 bg-[#E6E6ED] rounded-lg min-h-screen w-full transition-colors duration-300"
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

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-x-4">
          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="font-semibold text-[#555555] text-2xl cursor-pointer transition-all duration-200"
            onClick={() => {
              setFileselection("Root");
            }}
          >
            File Manager
          </motion.h2>
        </div>
        <AddFileFolderMenu
          visible={visible.file}
          setVisible={setVisible}
          setCreateFolder={setCreateFolder}
          fileInputRef={fileInputRef}
          isLoadingUploadFile={isLoading.uploadFile}
          addMenuRef={addMenuRef}
        />
      </motion.div>

      <SearchAndFilter searchText={searchText} setSearchText={setSearchText} />

      {isDataLoading ? (
        <LoadingState />
      ) : (
        <>
          <FolderSection
            folders={folders}
            fileSelection={fileSelection}
            setCurrentFolderId={setCurrentFolderId}
            setFileselection={setFileselection}
            handleDeleteFolder={handleDeleteFolder}
            handleRenameFolder={handleRenameFolder}
            setRenameFolder={setRenameFolder}
            isLoadingDeleteFolder={isLoading.deleteFolder}
          />

          <FileSection
            files={currentFolderFiles}
            searchText={searchText}
            handleDeleteFile={handleDeleteFile}
            handleMoveFile={handleMoveFile}
            folders={folders}
            fileSelection={fileSelection}
            isLoadingDeleteFile={isLoading.deleteFile}
            isLoadingMoveFile={isLoading.moveFile}
            emptyStateFileInputRef={emptyStateFileInputRef}
            isLoadingUploadFile={isLoading.uploadFile}
          />
        </>
      )}

      <CreateFolderDialog
        createFolder={createFolder}
        setCreateFolder={setCreateFolder}
        folderName={folderName}
        setFolderName={setFolderName}
        handleAddFolder={handleAddFolder}
        isLoadingAddFolder={isLoading.addFolder}
      />

      <RenameFolderDialog
        renameFolder={renameFolder}
        setRenameFolder={setRenameFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        handleRenameFolder={handleRenameFolder}
      />
    </div>
  );
}

export default FileManagerContainer;
