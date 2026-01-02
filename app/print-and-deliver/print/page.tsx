"use client";

import type React from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Bell,
  MessageSquare,
  User,
  X,
  Plus,
  FileText,
} from "lucide-react";
import { useOrder, type DocumentItem } from "@/context/orderContext";
import UseStorage from "@/hooks/useStorage";
import { useRouter } from "next/navigation";

export default function Component() {
  const { order, dispatch } = useOrder();
  const router = useRouter();
  const { uploadFile, deleteFile } = UseStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [applyToAll, setApplyToAll] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState<number>(0);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // Global settings for "apply to all"
  const [globalSettings, setGlobalSettings] = useState({
    copies: 1,
    colorType: "black and white" as "black and white" | "color",
    pageDirection: "vertical" as "vertical" | "horizontal",
    paperSize: "A4 (8.27 x 11.69 inches)" as DocumentItem["paperSize"],
    printType: "front" as "front" | "front and back",
    pagesToPrint: "All",
    pagesPerSheet: "1",
    paperMargin: "Normal",
  });

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      setUploadingFiles(true);
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          await uploadFile(file);
        }
      } finally {
        setUploadingFiles(false);
      }
    },
    [uploadFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files) {
        handleFileUpload(e.dataTransfer.files);
      }
    },
    [handleFileUpload],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const updateDocument = (index: number, updates: Partial<DocumentItem>) => {
    const updatedDoc = { ...order.documents[index], ...updates };
    dispatch({ type: "UPDATE_DOCUMENT", index, payload: updatedDoc });
  };

  const updateGlobalSetting = (
    key: keyof typeof globalSettings,
    value: any,
  ) => {
    setGlobalSettings((prev) => ({ ...prev, [key]: value }));

    if (applyToAll) {
      order.documents.forEach((_, index) => {
        updateDocument(index, { [key]: value });
      });
    }
  };

  const handleApplyToAllToggle = (checked: boolean) => {
    setApplyToAll(checked);
    if (checked) {
      // Apply current global settings to all documents
      order.documents.forEach((_, index) => {
        updateDocument(index, {
          copies: globalSettings.copies,
          colorType: globalSettings.colorType,
          pageDirection: globalSettings.pageDirection,
          paperSize: globalSettings.paperSize,
          printType: globalSettings.printType,
          pagesToPrint: globalSettings.pagesToPrint,
        });
      });
    } else {
      // When turning off "apply to all", sync global settings with the first document
      if (order.documents.length > 0) {
        const firstDoc = order.documents[0];
        setGlobalSettings({
          copies: firstDoc.copies,
          colorType: firstDoc.colorType,
          pageDirection: firstDoc.pageDirection,
          paperSize: firstDoc.paperSize,
          printType: firstDoc.printType,
          pagesToPrint: firstDoc.pagesToPrint,
          pagesPerSheet: globalSettings.pagesPerSheet,
          paperMargin: globalSettings.paperMargin,
        });
        setSelectedDocumentIndex(0);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getTotalPages = () => {
    return order.documents.reduce((total, doc) => {
      return total + (doc.copies || 1);
    }, 0);
  };

  useEffect(() => {
    if (
      selectedDocumentIndex >= order.documents.length &&
      order.documents.length > 0
    ) {
      setSelectedDocumentIndex(0);
    }
  }, [order.documents.length, selectedDocumentIndex]);

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-[#000000] mb-8">
          Print Options
        </h1>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-4 p-3 rounded-lg ${statusMessage.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* File Preview Section */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {order.documents.map((doc, index) => (
            <Card
              key={doc.id}
              className={`relative w-64 h-80 bg-white border-2 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                !applyToAll && selectedDocumentIndex === index
                  ? "border-[#3ae180] shadow-lg ring-2 ring-[#3ae180]/20"
                  : "border-[#e6e6ed] hover:border-[#c9c9c9]"
              }`}
              onClick={() => {
                if (!applyToAll) {
                  setSelectedDocumentIndex(index);
                }
              }}
            >
              {/* Selection indicator */}
              {!applyToAll && selectedDocumentIndex === index && (
                <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-[#3ae180] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(doc.id, doc.fileName, index, setStatusMessage);
                }}
                className="absolute top-2 right-2 z-10 w-6 h-6 bg-[#555555] rounded-full flex items-center justify-center hover:bg-gray-600"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="p-4 h-full">
                <div className="w-full h-48 bg-[#f2f2f2] rounded mb-3 flex items-center justify-center border-2 border-dashed border-[#c9c9c9]">
                  {doc.uploading ? (
                    <div className="text-center">
                      <div className="animate-spin w-8 h-8 border-2 border-[#3ae180] border-t-transparent rounded-full mx-auto mb-2" />
                      <span className="text-xs text-[#555555]">
                        Uploading...
                      </span>
                    </div>
                  ) : doc.error ? (
                    <div className="text-center text-red-500">
                      <X className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-xs">Upload Failed</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-[#3ae180] mx-auto mb-2" />
                      <span className="text-xs text-[#555555]">
                        PDF Document
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <p
                    className="font-medium text-[#000000] truncate"
                    title={doc.fileName}
                  >
                    {doc.fileName}
                  </p>
                  <p className="text-[#555555]">{formatFileSize(doc.size)}</p>
                  {!applyToAll && (
                    <p className="text-xs text-[#3ae180] mt-1">
                      {selectedDocumentIndex === index
                        ? "Currently selected"
                        : "Click to configure"}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* Add Files */}
          <Card
            className={`w-64 h-80 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 ${
              uploadingFiles
                ? "bg-[#dffbe7] border-[#3ae180] cursor-not-allowed"
                : dragActive
                  ? "bg-[#dffbe7] border-[#3ae180]"
                  : "bg-[#effdf3] border-[#61e987] hover:bg-[#dffbe7]"
            }`}
            onDrop={uploadingFiles ? undefined : handleDrop}
            onDragOver={uploadingFiles ? undefined : handleDragOver}
            onDragLeave={uploadingFiles ? undefined : handleDragLeave}
            onClick={
              uploadingFiles ? undefined : () => fileInputRef.current?.click()
            }
          >
            <div className="text-center">
              {uploadingFiles ? (
                <>
                  <div className="animate-spin w-12 h-12 border-3 border-[#3ae180] border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="text-[#000000] font-medium mb-1">
                    Uploading Files...
                  </p>
                  <p className="text-xs text-[#555555]">Please wait</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-[#3ae180] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#000000] font-medium mb-1">Add Files</p>
                  <p className="text-xs text-[#555555]">
                    Drag & drop or click to upload
                  </p>
                </>
              )}
            </div>
          </Card>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,image/*"
            className="hidden"
            disabled={uploadingFiles}
            onChange={(e) =>
              e.target.files &&
              !uploadingFiles &&
              handleFileUpload(e.target.files)
            }
          />
        </div>

        {/* Print Options Form */}
        <Card className="bg-white border border-[#e6e6ed] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[#000000] mb-1">
                Print Options
              </h2>
              <p className="text-sm text-[#555555]">
                {applyToAll
                  ? "Customize your print job settings"
                  : order.documents.length > 0
                    ? `Configuring: ${order.documents[selectedDocumentIndex]?.fileName || "No document selected"}`
                    : "Add documents to configure print settings"}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[#555555]">
                Apply same setting to all files
              </span>
              <Switch
                checked={applyToAll}
                onCheckedChange={handleApplyToAllToggle}
                className="data-[state=checked]:bg-[#3ae180]"
              />
            </div>
          </div>

          {!applyToAll && order.documents.length > 0 && (
            <div className="mb-4 p-3 bg-[#effdf3] border border-[#61e987] rounded-lg">
              <p className="text-sm text-[#555555]">
                💡 Click on a document card above to configure its individual
                print settings
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Number of Copies */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#000000]">
                Enter number of copies
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  value={
                    applyToAll
                      ? globalSettings.copies
                      : order.documents[selectedDocumentIndex]?.copies || 1
                  }
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value) || 1;
                    if (applyToAll) {
                      updateGlobalSetting("copies", value);
                    } else if (order.documents[selectedDocumentIndex]) {
                      updateDocument(selectedDocumentIndex, { copies: value });
                    }
                  }}
                  className="w-24 text-center bg-[#effdf3] border-[#61e987] text-[#000000]"
                />
              </div>
            </div>

            {/* Print Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#000000]">
                Choose print color
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    if (applyToAll) {
                      updateGlobalSetting("colorType", "black and white");
                    } else if (order.documents[selectedDocumentIndex]) {
                      updateDocument(selectedDocumentIndex, {
                        colorType: "black and white",
                      });
                    }
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                    (applyToAll
                      ? globalSettings.colorType
                      : order.documents[selectedDocumentIndex]?.colorType) ===
                    "black and white"
                      ? "border-[#3ae180] bg-[#effdf3]"
                      : "border-[#e6e6ed] bg-white hover:border-[#c9c9c9]"
                  }`}
                >
                  <div className="w-8 h-8 bg-[#000000] rounded mb-2 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm" />
                  </div>
                  <span className="text-xs text-[#555555]">B&W</span>
                </button>
                <button
                  onClick={() => {
                    if (applyToAll) {
                      updateGlobalSetting("colorType", "color");
                    } else if (order.documents[selectedDocumentIndex]) {
                      updateDocument(selectedDocumentIndex, {
                        colorType: "color",
                      });
                    }
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                    (applyToAll
                      ? globalSettings.colorType
                      : order.documents[selectedDocumentIndex]?.colorType) ===
                    "color"
                      ? "border-[#3ae180] bg-[#effdf3]"
                      : "border-[#e6e6ed] bg-white hover:border-[#c9c9c9]"
                  }`}
                >
                  <div className="w-8 h-8 rounded mb-2 flex items-center justify-center bg-gradient-to-br from-[#c53232] via-[#ccc514] to-[#3ae180]">
                    <div className="w-4 h-4 bg-white rounded-sm" />
                  </div>
                  <span className="text-xs text-[#555555]">Color</span>
                </button>
              </div>
            </div>

            {/* Print Orientation */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#000000]">
                Choose print orientation
              </label>
              <div className="flex space-x-3 ">
                <button
                  onClick={() => {
                    if (applyToAll) {
                      updateGlobalSetting("pageDirection", "horizontal");
                    } else if (order.documents[selectedDocumentIndex]) {
                      updateDocument(selectedDocumentIndex, {
                        pageDirection: "horizontal",
                      });
                    }
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                    (applyToAll
                      ? globalSettings.pageDirection
                      : order.documents[selectedDocumentIndex]
                          ?.pageDirection) === "horizontal"
                      ? "border-[#3ae180] bg-[#effdf3]"
                      : "border-[#e6e6ed] bg-white hover:border-[#c9c9c9]"
                  }`}
                >
                  <div className="w-8 h-6 bg-[#f2f2f2] border border-[#c9c9c9] rounded mb-2" />
                  <span className="text-xs text-[#555555]">Landscape</span>
                </button>
                <button
                  onClick={() => {
                    if (applyToAll) {
                      updateGlobalSetting("pageDirection", "vertical");
                    } else if (order.documents[selectedDocumentIndex]) {
                      updateDocument(selectedDocumentIndex, {
                        pageDirection: "vertical",
                      });
                    }
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                    (applyToAll
                      ? globalSettings.pageDirection
                      : order.documents[selectedDocumentIndex]
                          ?.pageDirection) === "vertical"
                      ? "border-[#3ae180] bg-[#effdf3]"
                      : "border-[#e6e6ed] bg-white hover:border-[#c9c9c9]"
                  }`}
                >
                  <div className="w-6 h-8 bg-[#f2f2f2] border border-[#c9c9c9] rounded mb-2" />
                  <span className="text-xs text-[#555555]">Portrait</span>
                </button>
              </div>
            </div>

            {/* Advanced Options */}
            <button
              onClick={() => setAdvancedExpanded(!advancedExpanded)}
              className="w-full flex items-center justify-between p-4 bg-[#f4f7fa] rounded-lg hover:bg-[#e6e6ed] transition-colors"
            >
              <span className="text-sm font-medium text-[#000000]">
                Advanced Print Options
              </span>
              {advancedExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#555555]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#555555]" />
              )}
            </button>

            {/* Advanced Options Content */}
            {advancedExpanded && (
              <div className="space-y-4 p-4 bg-[#f4f7fa] rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">
                      Pages to Print
                    </label>
                    <Input
                      placeholder="e.g. All, 1, 1-3, 1,2,4"
                      value={
                        applyToAll
                          ? globalSettings.pagesToPrint
                          : order.documents[selectedDocumentIndex]
                              ?.pagesToPrint || "All"
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        if (applyToAll) {
                          updateGlobalSetting("pagesToPrint", value);
                        } else if (order.documents[selectedDocumentIndex]) {
                          updateDocument(selectedDocumentIndex, {
                            pagesToPrint: value,
                          });
                        }
                      }}
                      className="bg-[#effdf3] border-[#61e987]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">
                      Paper Size
                    </label>
                    <Select
                      value={
                        applyToAll
                          ? globalSettings.paperSize
                          : order.documents[selectedDocumentIndex]?.paperSize ||
                            "A4 (8.27 x 11.69 inches)"
                      }
                      onValueChange={(value) => {
                        if (applyToAll) {
                          updateGlobalSetting(
                            "paperSize",
                            value as DocumentItem["paperSize"],
                          );
                        } else if (order.documents[selectedDocumentIndex]) {
                          updateDocument(selectedDocumentIndex, {
                            paperSize: value as DocumentItem["paperSize"],
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="bg-[#effdf3] border-[#61e987]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4 (8.27 x 11.69 inches)">
                          A4 (8.27" x 11.69")
                        </SelectItem>
                        <SelectItem value="Letter (8.5 x 11 inches)">
                          Letter (8.5" x 11")
                        </SelectItem>
                        <SelectItem value="Legal (8.5 x 14 inches)">
                          Legal (8.5" x 14")
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">
                      Print Type
                    </label>
                    <Select
                      value={
                        applyToAll
                          ? globalSettings.printType
                          : order.documents[selectedDocumentIndex]?.printType ||
                            "front"
                      }
                      onValueChange={(value) => {
                        if (applyToAll) {
                          updateGlobalSetting(
                            "printType",
                            value as "front" | "front and back",
                          );
                        } else if (order.documents[selectedDocumentIndex]) {
                          updateDocument(selectedDocumentIndex, {
                            printType: value as "front" | "front and back",
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="bg-[#effdf3] border-[#61e987]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front">Front Only</SelectItem>
                        <SelectItem value="front and back">
                          Front and Back
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Bottom Section */}
        <Card className="bg-[#effdf3] border border-[#61e987] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#dffbe7] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#3ae180]" />
              </div>
              <span className="text-sm font-medium text-[#000000]">
                Total {getTotalPages()} documents
              </span>
            </div>
            <Button
              className="bg-[#06044b] hover:bg-[#3822b8] text-white px-6 py-2 rounded-lg"
              disabled={order.documents.length === 0}
              onClick={() =>
                router.push("/print-and-deliver/print/location-selection")
              }
            >
              Select Print Store
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}