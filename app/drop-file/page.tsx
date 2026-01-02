"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

function Page() {
  const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>(
    null
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const name = encodeURIComponent(file.name);
      const size = encodeURIComponent((file.size / (1024 * 1024)).toFixed(1));
      router.push(`/flatten?name=${name}&size=${size}`);

      console.log("Dropped file:", file);
    }
  }, []);
  useEffect(() => {
    console.log(selectedFile);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "text/plain": [".txt"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB limit
  });
  return (
    <div className="mx-auto max-w-screen-2xl bg-[#E6E6ED] w-full h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="w-full flex items-center flex-col mt-8 gap-y-8 max-[800px]:mt-0">
        <h2 className="text-4xl font-bold text-black w-full text-center">
          Flatten PDF Files
        </h2>
        <div className="w-3/5 max-[800px]:w-4/5 rounded-lg bg-white flex items-center justify-center p-6 border-2 border-[#D0D0D0] ">
          <div
            {...getRootProps()}
            className={`flex border-dashed border-2 bg-[#F3F3F3] rounded-lg w-full border  justify-center items-center ${
              isDragActive ? "border-blue-500 bg-blue-100" : "border-[#06044B]"
            }`}
          >
            <input {...getInputProps()} />

            <div className="w-3/5 max-[600px]:w-11/12  flex items-center flex-col  gap-y-8 py-4">
              <p className="text-[20px] capitalize text-black text-center font-bold">
                Drag & Drop your file here
              </p>

              <div className="flex items-center gap-x-2 w-full">
                <p className="h-[1px] bg-black/50 w-1/2 "></p>
                <p className="text-[20px] font-normal text-black">or</p>
                <p className="h-[1px] bg-black/50 w-1/2 "></p>
              </div>

              <div className="flex items-center ">
                <input
                  type="file"
                  name="fileInput"
                  id="fileInput"
                  className="hidden"
                  accept={`
                      .pdf,.doc,.docx,.ppt,.pptx,
                       .xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt
                    `}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // @ts-ignore
                      setSelectedFile(file);
                      const name = encodeURIComponent(file.name);
                      const size = encodeURIComponent(
                        (file.size / (1024 * 1024)).toFixed(1)
                      );
                      router.push(`/flatten?name=${name}&size=${size}`);
                    }
                  }}
                />

                <label htmlFor="fileInput">
                  <div className="p-3 flex items-center justify-center gap-x-2 bg-[#06044B] rounded-l-xl">
                    <img
                      src="./FLATTEN-PDF/file.png"
                      alt=""
                      className="h-6 w-6 object-scale-down"
                    />
                    <p className="text-white font-bold capitalize">
                      Choose Files
                    </p>
                  </div>
                </label>
                <div className="flex items-center justify-center p-3 bg-[#06044B] rounded-r-xl min-h-[48px] border-l border-white  relative">
                  <img
                    src="./FLATTEN-PDF/dropdown.png"
                    className="h-5 w-5 object-scale-down group-focus:rotate-180 transition-all duration-300"
                    alt=""
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <div className="absolute flex flex-col min-w-[200px]   transition-all duration-300 top-12 bg-white rounded-lg p-2">
                      <button
                        className="text-left border-b border-black/50 hover:bg-gradient-to-r from-[#DFFBE7] to-[#CDCDDB]  rounded-t-lg py-1 px-2"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        Choose from Device
                      </button>
                      <button
                        className="text-left  hover:bg-gradient-to-r from-[#DFFBE7] to-[#CDCDDB] rounded-b-lg py-1 px-2"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        Choose from Drive
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex w-full  max-[500px]:w-11/12 items-center justify-center">
                <div className="text-sm max-[500px]:text-xs text-[#555555] text-center w-full text-wrap  flex flex-col items-center">
                  <p className="truncate overflow-hidden w-full">
                    Supported
                    formats: .pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt
                  </p>
                  <p> Max file size: 50MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-black font-thin">
          {`Flatten your PDF and add password protection — no sign-up or
            download required`}
        </p>
      </div>
    </div>
  );
}

export default Page;
