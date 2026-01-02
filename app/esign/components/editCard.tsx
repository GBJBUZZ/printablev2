import { useUser } from "@clerk/nextjs";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSignUrl } from "../useSign";

function EditCard({ index, type }: { index: number; type: string }) {
  const { updateSign, removeSign, signs } = useSignUrl();
  const { user } = useUser();

  // Initialize from signs[index]
  const initialFontSize = signs[index]?.fontSize || 12;
  const initialTextColor = signs[index]?.color || "#000000";
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [textColor, setTextColor] = useState(initialTextColor);
  const [showColorModal, setShowColorModal] = useState(false);

  // Sync local state with signs[index] changes
  useEffect(() => {
    setFontSize(signs[index]?.fontSize || 12);
    setTextColor(signs[index]?.color || "#000000");
  }, [signs, index]);

  return (
    <div
      className={
        "w-[300px] bg-[#fff] -z-50 rounded-3xl card-shadow  flex flex-col  space-x-2 border border-[#C9C9C9] " +
        (type === "documentId" ? "hidden" : "")
      }
    >
      {/* Avatar & Name */}
      <div className="flex items-center space-x-2 p-2  w-full justify-between  ">
        {/* Replace image with SVG user icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-8 h-8 rounded-full object-cover text-gray-400"
          fill="currentColor"
        >
          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
        </svg>
        <div className="text-sm font-medium text-gray-700">
          {user?.primaryEmailAddress?.emailAddress}
          <span className="text-xs font-semibold text-gray-500">(You)</span>
        </div>
        {/* Replace <Arrow ... /> with this: */}
        <button
          type="button"
          className="flex items-center justify-center w-5 h-5 rounded-full bg-[#27396A]"
          style={{ minWidth: 25, minHeight: 25 }}
          tabIndex={-1}
          aria-label="Confirmed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-3 h-3"
            fill="#fff"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
        </button>
      </div>

      {/* Controls */}
      <div className="flex px-3  justify-between  border-top">
        <div className="flex flex-1 center text-gray-700 text-sm gap-x-2">
          <span className="font-bold">{fontSize}</span>
          <div className="chevron flex flex-col">
            <ChevronUp
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                setFontSize(fontSize + 1);
                updateSign(index, { fontSize: fontSize + 1 });
              }}
            />

            <ChevronDown
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                setFontSize(fontSize - 1);
                updateSign(index, { fontSize: fontSize - 1 });
              }}
            />
          </div>
        </div>
  
        <div
          className="delete flex-1 center border border-[#C9C9C9] border-t-transparent border-b-transparent cursor-pointer gap-1 px-2 py-1 hover:bg-gray-100 rounded"
          onClick={() => removeSign(index)}
        >
          <Trash2 className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700 font-semibold text-sm">Delete</span>
        </div>

        {/* Only show color picker if not date */}
        {type !== "date" && (
          <div className="colors flex items-center gap-2 relative px-4.5 py-3">
            <button
              type="button"
              className="flex items-center gap-1 focus:outline-none"
              onClick={() => setShowColorModal(true)}
              style={{ background: "transparent" }}
            >
              <span
                className="inline-block rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: textColor,
                  border: "2px solid #eee",
                }}
              />
              <ChevronDown className="w-5 h-5 text-black pointer-events-none" />
            </button>
            {/* Color modal as dropdown */}
            {showColorModal && (
              <div
                className="absolute top-13 left-0 bg-white rounded-2xl border border-gray-300 px-6 py-4 flex gap-8 shadow-lg z-50"
                style={{ minWidth: 150 }}
                onClick={(e) => e.stopPropagation()}
              >
                {["#a61919", "#3a1ec7", "#000000"].map((color) => (
                  <span
                    key={color}
                    className="inline-block rounded-full cursor-pointer"
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: color,
                      boxShadow: textColor === color ? "0 0 0 2px #888" : "none",
                    }}
                    onClick={() => {
                      setTextColor(color);
                      updateSign(index, { color });
                      setShowColorModal(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {type === "date" && (
          <div className="border flex flex-1 items-center outline-none border-[#C9C9C9] border-t-transparent border-b-transparent border-r-transparent px-1 py-3 relative"
          style={{ minWidth: 100 }}>
            {/* Styled text input for look */}
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={
                signs[index].value
                  ? new Date(signs[index].value as string).toLocaleDateString("en-GB")
                  : ""
              }
              readOnly
              className="w-full bg-transparent outline-none text-black text-base font-normal placeholder:text-black placeholder:opacity-70"
              style={{ letterSpacing: "1px", cursor: "pointer" }}
              onClick={() => {
                (document.getElementById(`date-native-${index}`) as HTMLInputElement)?.showPicker?.();
                (document.getElementById(`date-native-${index}`) as HTMLInputElement)?.focus();
              }}
            />
            {/* Hidden native date input for modal */}
            <input
              id={`date-native-${index}`}
              type="date"
              value={signs[index].value as string}
              onChange={(e) => {
                updateSign(index, { value: e.target.value });
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              tabIndex={-1}
              style={{ pointerEvents: "none" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditCard;