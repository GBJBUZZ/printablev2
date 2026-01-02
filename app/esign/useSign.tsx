"use client";
import React, { createContext, useContext, useState } from "react";

export interface SignData {
  type: "sign" | "text" | "date" | "checkbox" | "initials" | "documentId";
  signUrl?: string;
  value?: string | boolean ;
  checked?: boolean;
  fontSize?: number;
  color?: string;
  signSize: { width: number; height: number };
  position: { x: number; y: number; pageIndex: number | null };
}

interface SignProps {
  signs: SignData[];
  currentSignIndex: number | null;
  setCurrentSignIndex: (index: number) => void;
  signDragging: boolean;
  setSignDragging: (val: boolean) => void;

  addSign: (sign: SignData) => void;
  updateSign: (id: number, updatedData: Partial<SignData>) => void;
  removeSign: (id: number) => void;
  fileId: string | null;
  setFile_id: (id: string) => void;
  signers_email: string[];
  setSignerEmail: (email: string) => void;
  updateSignerEmail: (deletedEmail: string) => void;
  signImages: string[];
  addImage: (signUrl: string) => void;
  currentSlide: number;
  setCurrentSlide: (pageIndex: number) => void;

  currentDocument: string | null;
  setCurrentDocument: (doc: string) => void;
  pdfData: ArrayBuffer | null;
  setPdfData: (data: ArrayBuffer) => void;
  resetSign: () => void;
}

const SignContext = createContext<SignProps | undefined>(undefined);

export default function SignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [signs, setSigns] = useState<SignData[]>([]);
  const [signIndex, setSignIndex] = useState<number | null>(null);
  const [signDragging, setSignDragStatus] = useState<boolean>(false);
  const [signImages, setSignImages] = useState<string[]>([]);
  const [fileId, setFileIdState] = useState<string | null>(null);
  const [signerEmail, setSignerEmailState] = useState<string[]>([]);
  const [currentPdfPage, setCurrentPage] = useState<number>(0);
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  const addSign = (sign: SignData) => setSigns((prev) => [...prev, sign]);
  const resetSign = () => {
    setSigns([]);
  };

  const setSignDragging = (val: boolean) => setSignDragStatus(val);
  const setCurrentSlide = (pageIndex: number) => setCurrentPage(pageIndex);
  const addImage = (signUrl: string) =>
    setSignImages((prev) => [...prev, signUrl]);

  const updateSign = (id: number, updatedData: Partial<SignData>) => {
    setSigns((prev) =>
      prev.map((sign, index) =>
        index === id ? { ...sign, ...updatedData } : sign
      )
    );
  };

  const removeSign = (id: number) => {
    setSigns((prev) => prev.filter((_, index) => index !== id));
  };

  const setCurrentSignIndex = (index: number) => {
    setSignIndex(index);
  };

  const setFile_id = (id: string) => {
    setFileIdState(id);
  };

  const setSignerEmail = (email: string) => {
    setSignerEmailState((prev) => [...prev, email]);
  };

  const updateSignerEmail = (deletedEmail: string) => {
    setSignerEmailState((prev) =>
      prev.filter((email) => email !== deletedEmail)
    );
  };

  return (
    <SignContext.Provider
      value={{
        signs,
        addSign,
        updateSign,
        removeSign,
        fileId,
        setFile_id,
        signers_email: signerEmail,
        setSignerEmail,
        currentSignIndex: signIndex,
        setCurrentSignIndex,
        signDragging,
        setSignDragging,
        signImages,
        addImage,
        currentSlide: currentPdfPage,
        setCurrentSlide,
        currentDocument,
        setCurrentDocument,
        updateSignerEmail,
        pdfData,
        setPdfData,
        resetSign,
      }}
    >
      {children}
    </SignContext.Provider>
  );
}

export const useSignUrl = () => {
  const context = useContext(SignContext);
  if (!context) {
    throw new Error("useSignContext must be used within a SignProvider");
  }
  return context;
};
