"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DocumentUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        sessionStorage.setItem(
          "file",
          JSON.stringify({ url: result, fileName: file.name })
        );
      }
      router.push(`/esign/sign-document`);
    };
    fileReader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          sessionStorage.setItem(
            "file",
            JSON.stringify({ url: result, fileName: file.name })
          );
        }
        router.push(`/esign/sign-document`);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />

      <Card
        className={`border-2 border-dashed transition-all  duration-300 ${
          isDragging
            ? "border-green-500 bg-green-50"
            : "border-slate-400 hover:border-slate-900 bg-slate-50 hover:bg-green-200"
        }`}
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center p-4">
          <div
            className={`p-3 rounded-full transition-colors mr-4 ${
              isDragging
                ? "bg-green-100 text-green-600"
                : "bg-green-400  text-black"
            }`}
          >
            <Upload className="h-6 w-6" />
          </div>

          <div className="flex-1 text-black">
            <h2 className="font-medium text-lg">Sign a document</h2>
            <p className="text-sm text-slate-600">
              Drag and drop your PDF or Word file here or{" "}
              <span className="text-blue-500 font-medium">browse</span>
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="ml-4 whitespace-nowrap text-black cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleUploadClick();
            }}
          >
            Select File
          </Button>
        </div>

        <div className="h-[1px] bg-slate-200 mx-4"></div>

        <div className="px-4 py-2 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Supports PDF, DOC, DOCX up to 10MB
          </p>
          <div
            className={`text-xs font-medium ${
              isDragging ? "text-green-600" : "text-slate-500"
            }`}
          >
            {isDragging ? "Release to upload" : "Click or drag file"}
          </div>
        </div>
      </Card>
    </div>
  );
}
