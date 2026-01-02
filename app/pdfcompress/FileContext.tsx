"use client";
import { createContext, useContext, useState, ReactNode, Suspense } from "react";

interface FileContextType {
  file: File | null;
  setFile: (file: File | null) => void;
}

const FileContext = createContext<FileContextType>({
  file: null,
  setFile: () => {},
});

export const useFileContext = () => useContext(FileContext);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Suspense>
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
    </Suspense>
  );
};
