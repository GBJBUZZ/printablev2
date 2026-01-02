"use client";
import { useEffect, useRef, useState } from "react";
import PdfCanvasPage from "./pdfCanvasPage";
import { drawSignatureOnPdf } from "./utils/pdfUtils";

import { useSignUrl } from "../useSign";
import { SignData } from "../components/utils/pdfUtils";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

const PdfLoader = ({ pdfUrl }: { pdfUrl: string }) => {
  const { signs, setPdfData, addSign } = useSignUrl();
  const [pdfData, setPdfBuffer] = useState<ArrayBuffer | null>(null);
  const [pdfPages, setPdfPages] = useState<any[]>([]);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadPdf = async (url: string, newScale: number) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const options: SignData = {
        type: "documentId" as "documentId",
        value: "true", // Make sure it's a string
        color: "#80919E",
        fontSize: 10,
        signSize: { width: 100, height: 30 },
        position: { x: 380, y: 5, pageIndex: i - 1 },
      };

      addSign(options);
      const page = await pdf.getPage(i);
      const rotation = page.rotate;
      const viewport = page.getViewport({ scale: newScale, rotation });
      pages.push({ page, viewport });
    }
    console.log("file url", url);
    const bytes = await fetch(url).then((res) => res.arrayBuffer());
    setPdfBuffer(bytes);
    setPdfData(bytes);
    setPdfPages(pages);
  };

  useEffect(() => {
    if (!pdfUrl) return;
    loadPdf(pdfUrl, scale);
  }, [pdfUrl, scale]);

  const handleDownload = async () => {
    if (pdfData && signs) {
      await drawSignatureOnPdf(pdfData, signs);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="relative space-y-4">
      <div
        ref={containerRef}
        className="overflow-x-hidden center"
        style={{ maxWidth: "100%" }}
      >
        <div className="flex flex-col gap-y-8">
          {pdfPages.map((p, i) => (
            <PdfCanvasPage
              key={i}
              page={p.page}
              viewport={p.viewport}
              pageIndex={i}
            />
          ))}
        </div>
      </div>

      {/* Zoom Control Buttons */}
      {/* <div className="fixed bottom-4 left-1/2 transform -translate-x-[250px] z-50">
        <div className="flex gap-4 bg-black/90 backdrop-blur-md shadow-lg px-6 py-3 rounded-full border border-gray-300">
          <button
            onClick={handleZoomOut}
            className="text-xl center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 active:scale-95 transition"
            title="Zoom Out"
          >
            −
          </button>
          <button
            onClick={handleZoomIn}
            className="text-xl w-10 h-10 rounded-full center  bg-gray-200 hover:bg-gray-300 active:scale-95 transition"
            title="Zoom In"
          >
            +
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default PdfLoader;
