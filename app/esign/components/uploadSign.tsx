import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSignUrl } from "../useSign";
import BackgroundRemoval from "./bgRemover";

const TABS = ["draw", "type", "upload"] as const;
type TabType = typeof TABS[number];

const SignUpload = ({ removeUploadSign }: { removeUploadSign: any }) => {
  const [tab, setTab] = useState<TabType>("draw");

  // Upload state
  const [isDragging, setIsDragging] = useState(false);
  const { addImage } = useSignUrl();
  const [dummySign, setDummySign] = useState<{ signUrl: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  // Draw state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  // Type state
  const [typedSign, setTypedSign] = useState("");
  const [typedFont, setTypedFont] = useState("cursive");

  // Color state
  const [drawColor, setDrawColor] = useState("#D32D2F"); // Default red
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  // Example color options
  const colorOptions = [
    { color: "#D32D2F", name: "Red" },
    { color: "#000000", name: "Black" },
    { color: "#0A1142", name: "Blue" },
    { color: "#388E3C", name: "Green" },
  ];

  // Undo/Redo states
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // Handle Enter key for all tabs
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (tab === "upload" && processedImageUrl) {
          addImage(processedImageUrl);
          removeUploadSign();
        }
        if (tab === "draw") {
          handleDrawSave();
        }
        if (tab === "type" && typedSign) {
          handleTypeSave();
        }
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [tab, processedImageUrl, typedSign]);

  // Upload logic
  const handleDragEvents = useCallback(
    (e: React.DragEvent, type: "enter" | "leave" | "drop") => {
      e.preventDefault();
      e.stopPropagation();
      if (type === "enter") setIsDragging(true);
      if (type === "leave") setIsDragging(false);
      if (type === "drop") {
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && droppedFile !== file) {
          setFile(droppedFile);
          const reader = new FileReader();
          reader.onloadend = () => setDummySign({ signUrl: reader.result as string });
          reader.readAsDataURL(droppedFile);
        }
      }
    },
    [file]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setDummySign({ signUrl: reader.result as string });
      reader.readAsDataURL(selected);
    }
  };

  const handleProcessedImage = (url: string) => setProcessedImageUrl(url);

  const uploadFile = () => {
    if (processedImageUrl) {
      addImage(processedImageUrl);
      removeUploadSign();
    }
  };

  // Draw logic
  const startDrawing = (e: React.MouseEvent) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    // Save current state for undo
    setUndoStack((prev) => [...prev, canvas.toDataURL()]);
    setRedoStack([]); // Clear redo stack on new draw
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setUndoStack([]);
    setRedoStack([]);
  };

  const handleDrawSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    addImage(url);
    removeUploadSign();
  };

  // Undo function
  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const last = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, canvas.toDataURL()]);
    const img = new window.Image();
    img.src = last;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  // Redo function
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const last = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, canvas.toDataURL()]);
    const img = new window.Image();
    img.src = last;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  // Type logic
  const handleTypeSave = () => {
    // Create an image from text
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `48px ${typedFont}`;
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(typedSign, canvas.width / 2, canvas.height / 2);
    const url = canvas.toDataURL("image/png");
    addImage(url);
    removeUploadSign();
  };

  return (
    <Dialog open onOpenChange={removeUploadSign}>
      <DialogContent
        className="max-w-3xl bg-white backdrop-blur-xl md:w-[40%] border border-white/20 shadow-xl rounded-xl transition-all duration-300 ease-out animate-fade-slide"
        // If your DialogContent supports a prop to hide the close icon, add it here (e.g., hideCloseIcon or showClose={false})
      >
        {/* 
          The cross (X) icon is typically rendered by <DialogHeader> or by default in some dialog libraries.
          You have already commented out <DialogHeader> and <DialogTitle>, so NO cross icon will appear.
          If you still see a cross, check your Dialog implementation for a prop like 'hideCloseIcon' or 'showClose={false}' and use it.
        */}

        {/* Tabs */}
        <div className="flex w-full gap-x-1">
          {/* Draw Tab */}
          <button
            className={`flex items-center justify-center px-4 w-1/3 h-12
              ${tab === "draw"
                ? "text-gray-800 bg-white border-t-4 border-t-[#0A1142] border-l-0 border-r-0 border-b-0 rounded-t-lg"
                : "text-gray-500 bg-gray-200 rounded-lg"}
            `}
            style={tab === "draw"
              ? { borderTopWidth: "4px", borderTopColor: "#0A1142", borderLeft: 0, borderRight: 0, borderBottom: 0, height: "48px" }
              : { borderBottomWidth: "5px", borderBottomColor: "#0A1142", height: "48px" }
            }
            onClick={() => setTab("draw")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <path d="M11 11l5 5"></path>
            </svg>
            <span className="ml-2">Draw</span>
          </button>
          {/* Type Tab */}
          <button
            className={`flex items-center justify-center px-4 w-1/3 h-12
              ${tab === "type"
                ? "text-gray-800 bg-white border-t-4 border-t-[#0A1142] border-l-0 border-r-0 border-b-0 rounded-t-lg"
                : "text-gray-500 bg-gray-200 rounded-lg"}
            `}
            style={tab === "type"
              ? { borderTopWidth: "4px", borderTopColor: "#0A1142", borderLeft: 0, borderRight: 0, borderBottom: 0, height: "48px" }
              : { borderBottomWidth: "5px", borderBottomColor: "#0A1142", height: "48px" }
            }
            onClick={() => setTab("type")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 7 4 4 20 4 20 7"></polyline>
              <line x1="9" y1="20" x2="15" y2="20"></line>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
            <span className="ml-2">Type</span>
          </button>
          {/* Upload Tab */}
          <button
            className={`flex items-center justify-center px-4 w-1/3 h-12
              ${tab === "upload"
                ? "text-gray-800 bg-white border-t-4 border-t-[#0A1142] border-l-0 border-r-0 border-b-0 rounded-t-lg"
                : "text-gray-500 bg-gray-200 rounded-lg"}
            `}
            style={tab === "upload"
              ? { borderTopWidth: "4px", borderTopColor: "#0A1142", borderLeft: 0, borderRight: 0, borderBottom: 0, height: "48px" }
              : { borderBottomWidth: "5px", borderBottomColor: "#0A1142", height: "48px" }
            }
            onClick={() => setTab("upload")}
          >
            <Upload size={18} />
            <span className="ml-2">Upload</span>
          </button>
        </div>

        {/* Toolbar (optional, can be customized per tab) */}
        {/* REMOVE THIS DUPLICATE DRAW TOOLBAR */}
        {/* {tab === "draw" && (
          <div className="flex items-center justify-between text-black bg-white mb-2">
            ...duplicate toolbar code...
          </div>
        )} */}

        {/* Main Area */}
        {tab === "draw" && (
          <div className="flex flex-col items-center w-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between w-full mb-4">
              {/* Color Picker */}
              <div className="relative">
                <button
                  className="flex items-center px-3 py-2 rounded-full border border-gray-300 bg-white shadow"
                  onClick={() => setShowColorDropdown((v) => !v)}
                >
                  <span
                    className="w-4 h-4 rounded-full mr-2 border"
                    style={{ background: drawColor }}
                  />
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>
                {showColorDropdown && (
                  <div className="absolute left-0 mt-2 bg-white border rounded shadow z-10">
                    {colorOptions.map((opt) => (
                      <button
                        key={opt.color}
                        className="flex items-center px-3 py-2 w-full hover:bg-gray-100"
                        onClick={() => {
                          setDrawColor(opt.color);
                          setShowColorDropdown(false);
                        }}
                      >
                        <span
                          className="w-4 h-4 rounded-full mr-2 border"
                          style={{ background: opt.color }}
                        />
                        {opt.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Undo/Redo/Clear */}
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow text-lg"
                  title="Undo"
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z"/>
                  </svg>
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow text-lg"
                  title="Redo"
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                </button>
                <button
                  className="px-6 py-1.5 rounded-full border border-gray-300 bg-white text-base"
                  onClick={clearCanvas}
                >
                  Clear
                </button>
              </div>
            </div>
            {/* Canvas Area */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-xl h-[220px] bg-[#E6E6ED] rounded-xl border border-gray-300 flex items-center justify-center relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={180}
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  style={{ touchAction: "none" }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                <span className="text-gray-500 text-lg pointer-events-none select-none z-10">
                  Draw your signature here
                </span>
              </div>
            </div>
          </div>
        )}

        {tab === "type" && (
          <div className="flex flex-col items-center w-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between w-full mb-4">
              {/* Color Picker (optional, for text color) */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    className="flex items-center px-3 py-2 rounded-full border border-gray-300 bg-white shadow"
                    onClick={() => setShowColorDropdown((v) => !v)}
                  >
                    <span
                      className="w-4 h-4 rounded-full mr-2 border"
                      style={{ background: drawColor }}
                    />
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                  {showColorDropdown && (
                    <div className="absolute left-0 mt-2 bg-white border rounded shadow z-10">
                      {colorOptions.map((opt) => (
                        <button
                          key={opt.color}
                          className="flex items-center px-3 py-2 w-full hover:bg-gray-100"
                          onClick={() => {
                            setDrawColor(opt.color);
                            setShowColorDropdown(false);
                          }}
                        >
                          <span
                            className="w-4 h-4 rounded-full mr-2 border"
                            style={{ background: opt.color }}
                          />
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Font Style Dropdown */}
                <select
                  value={typedFont}
                  onChange={e => setTypedFont(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-full px-6 py-1 text-base bg-white shadow focus:outline-none font-medium cursor-pointer transition-colors duration-150 hover:border-[#0A1142] min-w-[160px]"
                  style={{
                    minWidth: 160,
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='16' height='16' fill='gray' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='gray' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.25em 1.25em",
                  }}
                >
                  <option value="cursive">Text Style</option>
                  <option value="cursive">Cursive</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="sans-serif">Sans-serif</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="system-ui">System UI</option>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Impact">Impact</option>
                  <option value="Lucida Console">Lucida Console</option>
                  <option value="Brush Script MT">Brush Script MT</option>
                  <option value="Palatino Linotype">Palatino Linotype</option>
                  <option value="Garamond">Garamond</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Tahoma">Tahoma</option>
                  <option value="Geneva">Geneva</option>
                  <option value="Optima">Optima</option>
                  <option value="Didot">Didot</option>
                  <option value="Rockwell">Rockwell</option>
                  <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                  <option value="Gill Sans">Gill Sans</option>
                  <option value="Century Gothic">Century Gothic</option>
                  <option value="Candara">Candara</option>
                  <option value="Baskerville">Baskerville</option>
                  <option value="Copperplate">Copperplate</option>
                  <option value="Brush Script Std">Brush Script Std</option>
                </select>
              </div>
              {/* Clear Button */}
              <button
                className="px-6 py-1.5 rounded-full border border-gray-300 bg-white text-base"
                onClick={() => setTypedSign("")}
              >
                Clear
              </button>
            </div>
            {/* Canvas Area */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-xl h-[220px] bg-[#E6E6ED] rounded-xl border border-gray-300 flex items-center justify-center relative">
                {typedSign ? (
                  <span
                    className="text-2xl w-full text-center"
                    style={{ fontFamily: typedFont, color: drawColor, minHeight: 40 }}
                  >
                    {typedSign}
                  </span>
                ) : (
                  <span className="text-gray-500 text-lg pointer-events-none select-none z-10">
                    Type your signature here
                  </span>
                )}
                <input
                  type="text"
                  value={typedSign}
                  onChange={e => setTypedSign(e.target.value)}
                  placeholder=""
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text"
                  maxLength={32}
                  style={{ fontFamily: typedFont }}
                />
              </div>
            </div>
          </div>
        )}

        {tab === "upload" && (
          <div
            className={`w-full flex flex-col items-end`}
          >
            {/* Clear Button */}
            <button
              className="px-6 py-1.5 rounded-full border border-gray-300 bg-white text-base mb-4 mr-2"
              onClick={() => {
                setFile(null);
                setDummySign(null);
                setProcessedImageUrl(null);
              }}
            >
              Clear
            </button>
            {/* Upload Area */}
            <div
              className={`w-full max-w-3xl h-[220px] bg-[#E6E6ED] rounded-xl border border-gray-300 flex flex-col items-center justify-center transition-all ${
                isDragging ? "bg-blue-500/10 border-blue-400" : ""
              }`}
              onDragEnter={e => handleDragEvents(e, "enter")}
              onDragOver={e => e.preventDefault()}
              onDragLeave={e => handleDragEvents(e, "leave")}
              onDrop={e => handleDragEvents(e, "drop")}
            >
              {!dummySign?.signUrl ? (
                <>
                  <p className="text-center mb-2 text-black font-semibold text-lg">
                    Drag & Drop your file here
                  </p>
                  <label className="cursor-pointer border border-[#0A1142] text-[#0A1142] px-6 py-2 rounded-lg bg-white hover:bg-[#F5F5FA] font-medium mb-4 transition-colors duration-150"
                    style={{ borderWidth: 1 }}
                  >
                    Select File
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
                      onChange={handleFileChange}
                    />
                  </label>
                  <div className="mt-2 text-center text-sm text-gray-600">
                    <div className="font-medium">Supported</div>
                    formats: <span className="break-all">.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt</span>
                    <br />
                    Max file size: 50MB
                  </div>
                </>
              ) : (
                <BackgroundRemoval
                  signUrl={dummySign.signUrl}
                  onProcessed={handleProcessedImage}
                />
              )}
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-end gap-2 text-black">
          <button
            className="px-6 py-2 text-[14px] rounded-md border border-[#06044B] hover:bg-white/10"
            onClick={removeUploadSign}
          >
            Cancel
          </button>
          {tab === "draw" && (
            <button
              className="px-6 text-[14px] py-2 rounded-md bg-[#0a1142] text-white hover:bg-[#0a1142]/90"
              onClick={handleDrawSave}
            >
              Create Signature
            </button>
          )}
          {tab === "type" && (
            <button
              className="px-6 text-[14px] py-2 rounded-md bg-[#0a1142] text-white hover:bg-[#0a1142]/90"
              onClick={handleTypeSave}
              disabled={!typedSign}
            >
              Create Signature
            </button>
          )}
          {tab === "upload" && (
            <button
              className="px-6 text-[14px] py-2 rounded-md bg-[#0a1142] text-white hover:bg-[#0a1142]/90"
              onClick={uploadFile}
              disabled={!processedImageUrl}
            >
              Create Signature
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpload;
