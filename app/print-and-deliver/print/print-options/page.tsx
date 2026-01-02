"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  Printer,
  MapPin,
  CreditCard,
  ChevronDown,
  X,
  ChevronLeft,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Use Input component
import { cn } from "@/lib/utils";
import { useOrder, DocumentItem } from "@/context/orderContext";
import UseStorage from "@/hooks/useStorage";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// Base class for form elements for consistent styling
const formElementBaseClass =
  "w-full pl-3 pr-3 py-2 border border-[#d0d0d0] rounded-md bg-[#f0fdf4] focus:outline-none focus:ring-1 focus:ring-[#61e987] focus:border-[#61e987] text-sm"; // Base for Input
const selectElementClass = cn(formElementBaseClass, "appearance-none pr-8"); // Specific for select

export default function PrintOptionsPage() {
  const { order, dispatch } = useOrder();
  const { uploadFile, deleteFile } = UseStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const User = useUser();
  const router = useRouter();

  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
  useEffect(() => {
    console.log(order);
  }, [order]);

  // --- Effects and Handlers (Upload, Delete, Expand, Update) remain the same ---
  useEffect(() => {
    const currentExpandedDocExists = order.documents.some(
      (doc) => doc.id === expandedDocId
    );
    if (
      (!currentExpandedDocExists || !expandedDocId) &&
      order.documents.length > 0
    ) {
      setExpandedDocId(order.documents[0].id);
    } else if (order.documents.length === 0) {
      setExpandedDocId(null);
    }
  }, [order.documents, expandedDocId]);

  const handleAddDocumentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setStatusMessage({ text: `Uploading ${files.length} file(s)...` });
      for (const file of Array.from(files)) {
        await uploadFile(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setStatusMessage(null);
    }
  };

  const handleRemoveFile = async (id: string) => {
    const indexToRemove = order.documents.findIndex((doc) => doc.id === id);
    const docToRemove = order.documents[indexToRemove];
    if (indexToRemove !== -1 && docToRemove) {
      setStatusMessage(null);
      await deleteFile(
        docToRemove.id,
        docToRemove.fileName,
        indexToRemove,
        setStatusMessage
      );
    } else {
      console.error("Document not found for deletion:", id);
      setStatusMessage({ text: "Error: Document not found.", isError: true });
    }
  };

  const handleDocumentUpdate = (
    index: number,
    field: keyof DocumentItem,
    value: any
  ) => {
    const currentDoc = order.documents[index];
    if (!currentDoc) return;

    let processedValue = value;
    if (field === "copies") {
      processedValue = parseInt(value, 10) || 1;
      if (processedValue < 1) processedValue = 1;
    }
    // No special processing needed for pagesToPrint string here,
    // validation could happen elsewhere if needed

    const updatedDoc: DocumentItem = {
      ...currentDoc,
      [field]: processedValue,
    };

    dispatch({ type: "UPDATE_DOCUMENT", index, payload: updatedDoc });
  };

  const toggleDocumentOptions = (id: string) => {
    setExpandedDocId(expandedDocId === id ? null : id);
  };
  // --- Helper Functions (getFileIcon, formatFileSize) remain the same ---
  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    let fillColor = "#FF5252"; // Default PDF-like
    let pathColor = "#FF8A80";

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
      fillColor = "#4CAF50"; // Green for images
      pathColor = "#A5D6A7";
    } else if (["doc", "docx", "odt"].includes(ext)) {
      fillColor = "#2196F3"; // Blue for Word
      pathColor = "#90CAF9";
    } else if (["xls", "xlsx", "ods"].includes(ext)) {
      fillColor = "#FF9800"; // Orange for Excel
      pathColor = "#FFCC80";
    } else if (["ppt", "pptx", "odp"].includes(ext)) {
      fillColor = "#E91E63"; // Pink/Red for PowerPoint
      pathColor = "#F48FB1";
    } else if (["txt", "rtf"].includes(ext)) {
      fillColor = "#9E9E9E"; // Gray for text
      pathColor = "#E0E0E0";
    }

    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill={fillColor} />
        <path
          d="M7 18V6C7 5.44772 7.44772 5 8 5H16C16.5523 5 17 5.44772 17 6V18C17 18.5523 16.5523 19 16 19H8C7.44772 19 7 18.5523 7 18Z"
          fill={pathColor}
        />
        <path
          d="M9 9H15M9 12H15M9 15H13"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const formatFileSize = (bytes: number | string | undefined): string => {
    if (typeof bytes !== "number") {
      const parsed = parseInt(String(bytes), 10);
      if (isNaN(parsed)) return "N/A";
      bytes = parsed;
    }
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-[#dffbe7] flex flex-col">
      {/* ... File Input, Header, Progress Steps, Status Message ... */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.txt,.rtf,.odt,.ods,.odp,.webp,.svg" // Example accept list
      />

      <div className="flex-1 flex flex-col items-center py-12 px-4">
        {/* Header and Progress Steps (no changes needed here) */}
        <div className="max-w-3xl w-full text-center mb-8">
          {/* ... Header ... */}
          <h1 className="text-3xl font-bold mb-2">
            Print Your Documents with
            <span className="block text-[#61e987]">Printable</span>
          </h1>
          <p className="text-center max-w-xl mx-auto">
            Seamlessly upload your files, customize your print job, and have it
            delivered or ready for pickup
          </p>
        </div>
        <div className="flex justify-center items-center w-full max-w-2xl mb-12 overflow-x-auto py-4">
          {/* ... steps remain the same ... */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#61e987] flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs mt-2 whitespace-nowrap">Upload Files</span>
          </div>
          <div className="h-[2px] w-16 bg-[#61e987] flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-[#61e987] flex items-center justify-center">
              {" "}
              {/* Highlight current step */}
              <Printer className="h-6 w-6 text-[#06044b]" />
            </div>
            <span className="text-xs mt-2 whitespace-nowrap font-semibold text-[#06044b]">
              {" "}
              {/* Highlight current step text */}
              Print Options
            </span>
          </div>
          <div className="h-[2px] w-16 bg-[#e0e0e0] flex-shrink-0"></div>{" "}
          {/* Use a neutral color for future steps */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <MapPin className="h-6 w-6 text-[#999999]" />{" "}
              {/* Dim future steps */}
            </div>
            <span className="text-xs mt-2 whitespace-nowrap text-[#999999]">
              Select Location
            </span>
          </div>
          <div className="h-[2px] w-16 bg-[#e0e0e0] flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-[#999999]" />{" "}
              {/* Dim future steps */}
            </div>
            <span className="text-xs mt-2 whitespace-nowrap text-[#999999]">
              Review & Pay
            </span>
          </div>
        </div>

        {/* Status Message Display */}
        {statusMessage && (
          <div
            className={`w-full max-w-2xl p-3 mb-4 rounded-md text-center text-sm ${
              statusMessage.isError
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Print Options Card */}
        <div className="bg-white rounded-xl p-8 w-full max-w-2xl border border-[#90f0ab] mb-6">
          {/* ... Card Header ... */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mr-4">
              <Printer className="h-6 w-6 text-[#06044b]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Print options</h2>
              <p className="text-sm text-[#555555]">
                Customize your print job settings
              </p>
            </div>
          </div>
          {/* Document List */}
          <div className="space-y-4">
            {/* ... Empty List Message ... */}
            {order.documents.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No documents uploaded yet. Click below to add documents.
              </p>
            )}

            {order.documents.map((file, index) => (
              <div
                key={file.id}
                className="border border-[#e0e0e0] rounded-lg overflow-hidden"
              >
                {/* ... Document Header (Clickable) ... */}
                <div
                  className={cn(
                    "flex items-center justify-between p-3 cursor-pointer transition-colors",
                    expandedDocId === file.id
                      ? "bg-[#f0fdf4] border-b border-[#e0e0e0]"
                      : "bg-white hover:bg-gray-50",
                    file.error ? "border-l-4 border-red-500" : ""
                  )}
                  onClick={() => !file.error && toggleDocumentOptions(file.id)}
                >
                  {/* ... Document Header Left (Icon, Name, Size/Error) ... */}
                  <div className="flex items-center overflow-hidden mr-2">
                    {" "}
                    {/* Added overflow-hidden */}
                    <div className="w-8 h-8 mr-3 flex-shrink-0">
                      {" "}
                      {/* Added flex-shrink-0 */}
                      {getFileIcon(file.fileName)}
                    </div>
                    <div className="overflow-hidden">
                      {" "}
                      {/* Added overflow-hidden */}
                      <p
                        className="text-sm font-medium text-[#06044b] truncate"
                        title={file.fileName}
                      >
                        {" "}
                        {/* Added truncate and title */}
                        {file.fileName}
                      </p>
                      {file.error ? (
                        <p className="text-xs text-red-600" title={file.error}>
                          Upload Error
                        </p>
                      ) : (
                        <p className="text-xs text-[#999999]">
                          {formatFileSize(file.size)}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* ... Document Header Right (Hint, Delete, Chevron) ... */}
                  <div className="flex items-center flex-shrink-0">
                    {" "}
                    {/* Added flex-shrink-0 */}
                    {!file.error &&
                      expandedDocId !== file.id && ( // Only show hint if not error and not expanded
                        <div className="mr-3 text-xs text-[#61e987] flex items-center whitespace-nowrap">
                          {" "}
                          {/* Added whitespace-nowrap */}
                          <span>Configure</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      )}
                    <div className="flex items-center">
                      <button
                        className="text-[#999999] hover:text-red-600 mr-2 p-1" // Added padding
                        title="Remove Document"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent opening options
                          handleRemoveFile(file.id); // Use the new handler
                        }}
                      >
                        <X className="h-5 w-5" />
                      </button>
                      {!file.error && ( // Hide chevron if error
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-[#999999] transition-transform",
                            expandedDocId === file.id
                              ? "transform rotate-180"
                              : ""
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Print Options Form */}
                {expandedDocId === file.id && !file.error && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      {/* === NEW: Pages to Print === */}
                      <div>
                        <label
                          htmlFor={`pages-${file.id}`}
                          className="block text-sm font-medium text-[#555555] mb-1"
                        >
                          Pages to Print
                        </label>
                        <Input
                          id={`pages-${file.id}`}
                          type="text"
                          name="pagesToPrint"
                          value={file.pagesToPrint}
                          onChange={(e) =>
                            handleDocumentUpdate(
                              index,
                              "pagesToPrint",
                              e.target.value
                            )
                          }
                          placeholder="All, 1, 3-5, 7" // Add placeholder
                          className={formElementBaseClass} // Use base class
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter 'All' or specific pages/ranges (e.g., 1, 3-5).
                        </p>
                      </div>

                      {/* Print Color */}
                      <div>
                        <label
                          htmlFor={`color-${file.id}`}
                          className="block text-sm font-medium text-[#555555] mb-1"
                        >
                          Print Color
                        </label>
                        <div className="relative">
                          <select
                            id={`color-${file.id}`}
                            name="colorType"
                            value={file.colorType}
                            onChange={(e) =>
                              handleDocumentUpdate(
                                index,
                                "colorType",
                                e.target.value
                              )
                            }
                            className={selectElementClass} // Use select class
                          >
                            <option value="black and white">
                              Black and White
                            </option>
                            <option value="color">Color</option>
                          </select>
                          <ChevronDown className="h-4 w-4 text-[#999999] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Page Orientation */}
                      <div>
                        <label
                          htmlFor={`orientation-${file.id}`}
                          className="block text-sm font-medium text-[#555555] mb-1"
                        >
                          Page Orientation
                        </label>
                        <div className="relative">
                          <select
                            id={`orientation-${file.id}`}
                            name="pageDirection"
                            value={file.pageDirection}
                            onChange={(e) =>
                              handleDocumentUpdate(
                                index,
                                "pageDirection",
                                e.target.value
                              )
                            }
                            className={selectElementClass} // Use select class
                          >
                            <option value="vertical">
                              Portrait (Vertical)
                            </option>
                            <option value="horizontal">
                              Landscape (Horizontal)
                            </option>
                          </select>
                          <ChevronDown className="h-4 w-4 text-[#999999] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Print Sides */}
                      <div>
                        <label
                          htmlFor={`sides-${file.id}`}
                          className="block text-sm font-medium text-[#555555] mb-1"
                        >
                          Print Sides
                        </label>
                        <div className="relative">
                          <select
                            id={`sides-${file.id}`}
                            name="printType"
                            value={file.printType}
                            onChange={(e) =>
                              handleDocumentUpdate(
                                index,
                                "printType",
                                e.target.value
                              )
                            }
                            className={selectElementClass} // Use select class
                          >
                            <option value="front">
                              Print on one side (Front)
                            </option>
                            <option value="front and back">
                              Print on both sides (Front and Back)
                            </option>
                          </select>
                          <ChevronDown className="h-4 w-4 text-[#999999] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Number of Copies */}
                      <div>
                        <label
                          htmlFor={`copies-${file.id}`}
                          className="block text-sm font-medium text-[#555555] mb-1"
                        >
                          Number of Copies
                        </label>
                        <Input
                          id={`copies-${file.id}`}
                          type="number"
                          name="copies" // Add name attribute
                          value={file.copies}
                          onChange={(e) =>
                            handleDocumentUpdate(
                              index,
                              "copies",
                              e.target.value
                            )
                          }
                          min="1"
                          className={formElementBaseClass} // Use base class
                        />
                      </div>

                      {/* Paper Size */}
                      {/* Making paper size span full width for better layout */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor={`paper-${file.id}`}
                          className="block text-sm font-medium text-[#555555] mb-1"
                        >
                          Paper Size
                        </label>
                        <div className="relative">
                          <select
                            id={`paper-${file.id}`}
                            name="paperSize"
                            value={file.paperSize}
                            onChange={(e) =>
                              handleDocumentUpdate(
                                index,
                                "paperSize",
                                e.target.value
                              )
                            }
                            className={selectElementClass} // Use select class
                          >
                            <option value="A4 (8.27 x 11.69 inches)">
                              A4 (8.27" x 11.69")
                            </option>
                            <option value="Letter (8.5 x 11 inches)">
                              Letter (8.5" x 11")
                            </option>
                            <option value="Legal (8.5 x 14 inches)">
                              Legal (8.5" x 14")
                            </option>
                          </select>
                          <ChevronDown className="h-4 w-4 text-[#999999] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ... Add Document Button ... */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full border-dashed border-[#61e987] text-[#06044b] hover:bg-[#f0fdf4] hover:border-[#61e987] py-3"
              onClick={handleAddDocumentClick}
            >
              + Add another document
            </Button>
          </div>
        </div>

        {/* ... Navigation Buttons (with disabled logic) ... */}
        <div className="flex justify-between w-full max-w-2xl">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#d0d0d0] text-[#555555] hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            className={cn(
              "text-white px-6 uppercase text-xs font-semibold tracking-wider",
              order.documents.length === 0 ||
                order.documents.some((doc) => !!doc.error) // Also disable if any document has an error
                ? "bg-gray-400 cursor-not-allowed" // Disabled style
                : "bg-[#06044b] hover:bg-[#06044b]/90" // Enabled style
            )}
            onClick={() =>
              router.push(`/print-and-deliver/print/location-selection`)
            } // TODO: Add onClick handler for navigation
            disabled={
              order.documents.length === 0 ||
              order.documents.some((doc) => !!doc.error)
            } // Disable button if no docs or error exists
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
