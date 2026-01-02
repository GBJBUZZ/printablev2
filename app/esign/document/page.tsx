"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SigningTool from "../components/signTool";
import { GetFiles, SubmitSign } from "../components/utils/apiCalls";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useSignUrl } from "../useSign";
import { drawSignatureOnPdf } from "../components/utils/pdfUtils";
import TimeLine from "../components/timeLine";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}`;

const PdfViewer = dynamic(
  () => import("../components/pdfLoader").then((mod) => mod.default),
  {
    ssr: false,
  }
);

interface FileData {
  fileUrl: string;
  view: boolean;
  sign: boolean;
  status: string;
}

export default function SignDocument() {
  const searchParams = useSearchParams();
  const { pdfData, signs, resetSign } = useSignUrl();
  const fileId = searchParams.get("id");
  const [file, setFile] = useState<any>(null); // using any to allow timeline
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [toEdit, setToEdit] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // For button loading state
  const { user } = useUser();

  const handleSignSubmit = async () => {
    if (!pdfData || !signs || !fileId) {
      toast.error("Missing required data for saving document.");
      return;
    }

    setSubmitting(true);
    try {
      const fileBlob = await drawSignatureOnPdf(pdfData, signs);
      const pdfFile = new File([fileBlob], "signed.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("signeeId", user?.id as string);

      formData.append("fileId", fileId);
      const res = await SubmitSign(formData);
      const response = await res.json();
      if (response.success) {
        resetSign();

        toast.success(
          response.msg || "signed and saved document successfully!!"
        );
        // Refresh file data to update statusS
        const FileData = await GetFiles(fileId, user?.id as string);
        console.log(FileData);
        setFileUrl(FileData.fileUrl);
        const found = FileData.info.find(
          (info: any) =>
            info.signeeEmail === user?.primaryEmailAddress &&
            info.signeeSignStatus === "pending"
        );
        found ? setToEdit(true) : setToEdit(false);
        setFile(FileData.info);
      } else {
        toast.error(response.msg || "Failed to save document.");
      }
    } catch (err) {
      toast.error("Failed to save document.");
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      if (!user || !fileId) return;

      try {
        const FileData = await GetFiles(fileId, user?.id);
        console.log(FileData, toEdit);

        setFileUrl(FileData.fileUrl);
        const found = FileData.info.some(
          (info: any) =>
            info.signeeEmail === user?.primaryEmailAddress?.emailAddress &&
            info.signeeSignStatus === "pending"
        );
        console.log("value of :", found);
        found ? setToEdit(true) : setToEdit(false);

        setFile(FileData.info);
      } catch (err) {
        toast.error("Failed to fetch file data.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [searchParams, user, fileId]);

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <section className="sign-document text-black flex-1">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="doc-title flex items-center shadow-md absolute justify-center bg-white w-full">
        <h1>file-name: {file?.fileName || "Test.pdf"}</h1>
        <div className="icon ml-2">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_165_1467)">
              <path
                d="M16.0837 8.35767L12.7504 5.02434M3.16699 17.941L5.9873 17.6277C6.33188 17.5893 6.50416 17.5702 6.6652 17.5181C6.80807 17.4718 6.94403 17.4065 7.0694 17.3238C7.2107 17.2306 7.33328 17.1081 7.57843 16.8629L18.5837 5.85767C19.5042 4.9372 19.5042 3.44482 18.5837 2.52434C17.6632 1.60387 16.1709 1.60387 15.2504 2.52434L4.2451 13.5296C3.99995 13.7748 3.87737 13.8973 3.78419 14.0386C3.70152 14.164 3.63617 14.2999 3.58992 14.4428C3.53779 14.6038 3.51864 14.7761 3.48036 15.1207L3.16699 17.941Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_165_1467">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className="document-body flex flex-row pt-10 h-[90vh] justify-between">
        <div className="DocumentArea flex flex-3 overflow-y-scroll overflow-x-hidden">
          {loading ? (
            <p className="w-full h-full flex items-center justify-center">
              Loading File...
            </p>
          ) : fileUrl ? (
            <div className="pdf-container w-full h-full">
              <PdfViewer pdfUrl={fileUrl} />
            </div>
          ) : (
            <p className="w-full h-full flex items-center justify-center">
              No Such File Exists with Requested ID
            </p>
          )}
        </div>

        <div className="signingTool flex flex-col flex-1 justify-between p-4 py-6">
          {!loading && toEdit && (
            <>
              <SigningTool />
              <button
                className="border-1 text-[18px] rounded-xl border-[#06044B] p-3 hover:bg-[#06044B] hover:text-green-500 transition-all duration-300 ease-in-out"
                onClick={handleSignSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <div
                    role="status"
                    className="flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="ml-2">Submitting...</span>
                  </div>
                ) : (
                  <p>Sign Document</p>
                )}
              </button>
            </>
          )}

          {file && !toEdit && <TimeLine timelineItems={file} />}
        </div>
      </div>
    </section>
  );
}
