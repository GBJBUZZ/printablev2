"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PdfViewer = dynamic(
  () => import("./pdfLoader").then((mod) => mod.default),
  {
    ssr: false,
  }
);
function dataURLtoFile(dataUrl: string, fileName: string): File {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], fileName, { type: mime });
}

export default function DocumentView() {
  const searchParams = useSearchParams();
  const params = {
    fileId: searchParams.get("fileId"),
    fileName: searchParams.get("fileName"),
  };
  // console.log(params);
  const { fileId, fileName } = params;
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  useEffect(() => {
    // console.log(params);
    if (fileId && fileName) {
      setFileUrl(
        `https://blog-storage-printable.s3.amazonaws.com/documents/${fileId}_${fileName}`
      );
      // sessionStorage.removeItem("file");
    } else {
      if (window) {
        const fileData = sessionStorage.getItem("file");
        if (fileData) {
          const { url, fileName } = JSON.parse(fileData);
          if (url) {
            setFileUrl(url);
            const file = dataURLtoFile(url, fileName);
            // console.log(file);
          }
        }
      }
    }
  }, [fileUrl]);

  // Check if fileId and fileName are missing
  if (!fileUrl) {
    return (
      <div className="text-center text-black mt-8 h-full w-full">
        <p className="center">Invalid or missing file information.</p>
      </div>
    );
  }

  return (
    <section className="pdfView w-full h-full">
      {fileUrl ? (
        <PdfViewer pdfUrl={fileUrl} />
      ) : (
        <p className="text-center mt-8">Loading document...</p>
      )}
    </section>
  );
}
