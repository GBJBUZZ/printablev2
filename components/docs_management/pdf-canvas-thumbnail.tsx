import { useEffect, useState, useRef } from "react";
import { Loader2, FileIcon } from "lucide-react";
import { convertPdfToImage } from "./pdf-to-thumbnail";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Ensure the worker is set
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

interface PDFThumbnailProps {
  url: string;
  alt: string;
}

const PDFThumbnail = ({ url, alt }: PDFThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only load if we have a URL
    if (!url) {
      setIsLoading(false);
      return;
    }

    const loadPdfThumbnail = async () => {
      try {
        // Convert the PDF to an image
        const result = await convertPdfToImage(url);

        if (result.success && result.imageUrl) {
          setThumbnailUrl(result.imageUrl);
        } else {
          setError(result.error || "Failed to generate thumbnail");
        }
      } catch (err) {
        console.error("Error generating PDF thumbnail:", err);
        setError("Failed to generate thumbnail");
      } finally {
        setIsLoading(false);
      }
    };

    loadPdfThumbnail();

    // Set up a timeout to handle cases where the PDF might not load
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError("Thumbnail generation timed out");
      }
    }, 10000);

    // Clean up function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [url, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-[200px] h-[150px] bg-gray-100 rounded-lg">
        <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (error || !thumbnailUrl) {
    return (
      <div className="flex flex-col items-center justify-center w-[200px] h-[150px] bg-gray-100 rounded-lg">
        <FileIcon className="h-10 w-10 text-gray-400 mb-2" />
        <p className="text-xs text-gray-500 text-center px-2">
          {error || "PDF preview unavailable"}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-[200px] h-[150px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Hidden canvas for potential future use */}
      <canvas ref={canvasRef} className="hidden" />

      <img
        src={thumbnailUrl || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-contain scale-220 mt-20"
        onError={() => {
          setThumbnailUrl(null);
          setError("Failed to load thumbnail");
        }}
      />
    </div>
  );
};

export default PDFThumbnail;
