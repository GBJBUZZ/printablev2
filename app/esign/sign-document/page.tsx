"use client";
import { useUser } from "@clerk/nextjs";
import { Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocumentView from "../components/documentView";
import SingerDetailsForm from "../components/signeeForm";
import SigningTool from "../components/signTool";
import {
  SaveSignDocument,
  sendSignRequestEmail,
  UploadDocument,
} from "../components/utils/apiCalls";

const DOMAIN_BASE_URL = process.env.FRONTEND_PRINTABLE_URL || "http://localhost:3000";
import { drawSignatureOnPdf } from "../components/utils/pdfUtils";
import { useSignUrl } from "../useSign";

function SignDocument() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const file = window
    ? JSON.parse(sessionStorage.getItem("file") as string)
    : null;
  const [fileName, setFileName] = useState(file?.fileName || null);
  const [documentId, setDocumentId] = useState("");
  useEffect(() => {
    setFileName((searchParams.get("fileName") as string) || file.fileName);
    setDocumentId(searchParams.get("fileId") as string);
  }, [searchParams, file]);

  const [onlyOther, setOnlyOther] = useState(true);
  const [loading, setLoading] = useState(false);
  const updateSearchParams = (fileId: string, fileName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("fileId", fileId);
    params.set("fileName", fileName);

    router.replace(`?${params.toString()}`); // no page reload
  };
  const { user } = useUser();
  const { signers_email, signs, pdfData, updateSign } = useSignUrl();

  const handleDownload = async () => {
    if (!pdfData || !signs || !fileName) {
      throw new Error("Missing required data for saving document.");
    }
    const fileBlob = await drawSignatureOnPdf(pdfData, signs);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(fileBlob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const uploadDocument = async () => {
    if (!pdfData || !signs || !fileName) {
      throw new Error("Missing required data for saving document.");
    }
    const fileId = String(Date.now());
    // create a new signs array with updated documentId values
    const updatedSigns = signs.map((sign, index) =>
      sign.type === "documentId"
        ? { ...sign, value: `Printable.com Document ID: ${fileId}` }
        : sign,
    );

    // Update the signs state
    const indexArr = signs
      .map((sign, index) => (sign.type === "documentId" ? index : -1))
      .filter((i) => i !== -1);
    for (const index of indexArr) {
      updateSign(index, { value: `Printable.com Document ID: ${fileId}` });
    }

    const fileBlob = await drawSignatureOnPdf(pdfData, updatedSigns);
    const pdfFile = new File([fileBlob], fileName, { type: "application/pdf" });

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("ownerId", user?.id || "");
    formData.append("fileId", fileId);

    try {
      const response = await UploadDocument(formData);
      const result = await response.json();
      const uploadedFileUrl = result.fileUrl.split("/");
      const str = uploadedFileUrl.pop();
      const index = str.indexOf("_");
      const fileId = str.slice(0, index);
      const fileName = str.slice(index + 1);

      updateSearchParams(fileId, fileName);
      return { fileId, fileName };
    } catch (err) {
      toast.error("Filed saving document.");
      throw err;
    }
  };

  const saveSignedDocument = async () => {
    if (!pdfData || !signs || !fileName || !documentId) {
      throw new Error("Missing required data for saving document.");
    }

    const fileBlob = await drawSignatureOnPdf(pdfData, signs);
    const pdfFile = new File([fileBlob], fileName, { type: "application/pdf" });

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("ownerId", user?.id || "");
    formData.append("fileId", documentId as string);
    formData.append("fileName", fileName);

    try {
      await SaveSignDocument(formData);
      return true;
    } catch (err) {
      toast.error("Filed saving document.");
      throw err;
    }
  };

  const handleSignRequest = async (e: any) => {
    e.preventDefault();
    if (!signers_email || signers_email.length === 0) {
      toast.error("Missing signee for sending request.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (documentId) {
        const link = `${
          process.env.NEXT_PUBLIC_DOMAIN_ROOT_URL || ""
        }/esign/document?id=${documentId}`;
        const payload = {
          requestedBy: user?.id,
          fileIds: [documentId],
          signers_email: [signers_email[signers_email.length - 1]],
          link,
        };
        await saveSignedDocument();
        const res = await sendSignRequestEmail(payload);
        const response = await res.json();

        if (response.success) {
          toast.success("Document saved and sign request sent successfully.");
        } else {
          console.log(documentId);
          toast.error(response.msg);
        }
      } else {
        result = await uploadDocument();
        const link = `${
          process.env.NEXT_PUBLIC_DOMAIN_ROOT_URL || ""
        }/esign/document?id=${result.fileId}`;
        const payload = {
          requestedBy: user?.id,
          fileIds: [result.fileId],
          signers_email: signers_email,
          link,
        };
        const res = await sendSignRequestEmail(payload);
        const response = await res.json();
        if (response.success) {
          toast.success("Sign request sent successfully.");
        } else {
          toast.error(response.msg);
        }
      }
    } catch (err: any) {
      toast.error(`Failed to send sign request: ${err.message}`);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSign = async (e: any) => {
    e.preventDefault();
    if (!signs || signs.length === 0) {
      toast.error("No signatures to save.");
      return;
    }

    setLoading(true);
    try {
      if (documentId) {
        await saveSignedDocument();
        toast.success("Document update saved successfully.");
      } else {
        await uploadDocument();
        toast.success("Document saved successfully.");
      }
    } catch (err: any) {
      toast.error(`Failed to save signatures: ${err.message}`);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = (label: string, onClick: any, color: string) => {
    // Validate color to prevent invalid class names
    const validColors = ["green", "blue", "yellow"];
    const buttonColor = validColors.includes(color) ? color : "gray";

    return (
      <button
        className={`border-1 flex gap-2 text-[18px] rounded-xl cursor-pointer border-[#06044B] p-3
      justify-center items-center
      ${
        buttonColor === "yellow"
          ? "hover:text-green-400"
          : `hover:text-${buttonColor}-500`
      }
      hover:bg-[#06044B]`}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <p className="w-full text-center">{label}</p>
        )}
      </button>
    );
  };

  return (
    <section className="sign-document text-black flex-1">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="doc-title flex items-center shadow-md absolute justify-center bg-white">
        <h1>file-name: {fileName || "Test.pdf"}</h1>
        <div className="icon">
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
        <div className="sign-request w-[23%] bg-pink-400 overflow-y-auto">
          <div className="m-5 my-8 space-y-3">
            <div className="heading">
              <strong>Who is Signing?</strong>
            </div>
            <div className="signerOptions bg-white p-[5px] flex flex-row h-[50px] rounded-md justify-between text-[12px]">
              <div
                className={`onlyOther fade-in center rounded-md cursor-pointer flex-1 ${
                  onlyOther ? "bg-gray-200" : "bg-white"
                }`}
                onClick={() => setOnlyOther(true)}
              >
                <div className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 15.75V11.25M12 13.5H16.5M9 11.25H6C4.60217 11.25 3.90326 11.25 3.35195 11.4784C2.61686 11.7829 2.03285 12.3669 1.72836 13.102C1.5 13.6533 1.5 14.3521 1.5 15.75M11.625 2.46807C12.7244 2.91311 13.5 3.99098 13.5 5.25C13.5 6.50902 12.7244 7.58692 11.625 8.0319M10.125 5.25C10.125 6.90686 8.78182 8.25 7.125 8.25C5.46814 8.25 4.125 6.90686 4.125 5.25C4.125 3.59314 5.46814 2.25 7.125 2.25C8.78182 2.25 10.125 3.59314 10.125 5.25Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Only Others</span>
              </div>
              <div
                className={`youAndOther center rounded-md cursor-pointer p-2 ${
                  onlyOther ? "bg-white" : "bg-gray-200"
                }`}
                onClick={() => setOnlyOther(false)}
              >
                <div className="icon">
                  <svg
                    width="51"
                    height="18"
                    viewBox="0 0 51 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 15.75C15 14.7033 15 14.18 14.8709 13.7542C14.58 12.7954 13.8296 12.045 12.8708 11.7542C12.445 11.625 11.9217 11.625 10.875 11.625H7.125C6.07833 11.625 5.55499 11.625 5.12915 11.7542C4.17034 12.045 3.42003 12.7954 3.12918 13.7542C3 14.18 3 14.7033 3 15.75M12.375 5.625C12.375 7.48896 10.864 9 9 9C7.13604 9 5.625 7.48896 5.625 5.625C5.625 3.76104 7.13604 2.25 9 2.25C10.864 2.25 12.375 3.76104 12.375 5.625Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.5 4.625V13.375M21.125 9H29.875"
                      stroke="#0EB13B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M47.25 15.75V11.25M45 13.5C46.7574 13.5 47.7426 13.5 49.5 13.5M42 11.25H39C37.6022 11.25 36.9033 11.25 36.352 11.4784C35.6169 11.7829 35.0328 12.3669 34.7284 13.102C34.5 13.6533 34.5 14.3521 34.5 15.75M44.625 2.46807C45.7244 2.91311 46.5 3.99098 46.5 5.25C46.5 6.50902 45.7244 7.58692 44.625 8.0319M43.125 5.25C43.125 6.90686 41.7818 8.25 40.125 8.25C38.4681 8.25 37.125 6.90686 37.125 5.25C37.125 3.59314 38.4681 2.25 40.125 2.25C41.7818 2.25 43.125 3.59314 43.125 5.25Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>You and Others</span>
              </div>
            </div>
            <SingerDetailsForm onlyOther={!onlyOther} />
          </div>
        </div>
        <div
          className="DocumentArea flex w-[54%] overflow-y-scroll overflow-x-hidden"
          id="Document"
        >
          <div
            className="download-btn fixed hover:bg-green-400 z-50 my-10 mx-3 cursor-pointer p-2"
            onClick={() => handleDownload()}
          >
            <Download size={20} />
          </div>
          <DocumentView />
        </div>
        <div className="signingTool w-[23%] flex flex-col justify-between p-4 py-6">
          <SigningTool />
          <div className="flex flex-col gap-2">
            {signers_email &&
              signers_email.length > 0 &&
              signs &&
              signs.length > 0 &&
              renderButton("Save and Request Sign", handleSignRequest, "green")}
            {signers_email &&
              signers_email.length > 0 &&
              (!signs || signs.length === 0) &&
              renderButton("Sign Request", handleSignRequest, "blue")}
            {(!signers_email || signers_email.length === 0) &&
              signs &&
              signs.length > 0 &&
              renderButton("Sign Document", handleSaveSign, "yellow")}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignDocument;
