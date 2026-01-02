import {
  Calendar,
  CheckSquare,
  Type
} from "lucide-react";
import { useState } from "react";
// import UploadSign from "./uploadSign";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";

const UploadSign = dynamic(() => import("./uploadSign"), {
  ssr: false,
});

import { useUser } from "@clerk/clerk-react";
import { useSignUrl } from "../useSign";

const SigningTool = () => {
  const {
    signImages,
    setCurrentSignIndex,
    setSignDragging,
    addSign,
    currentSlide,
  } = useSignUrl();
  const { isLoaded, user } = useUser();
  const [uploadSign, setUploadSign] = useState(false);
  const closeUploadSign = () => {
    setUploadSign(false);
  };

  const handleInitials = () => {
    const options = {
      type: "initials" as "initials",
      value: "demo",
      signSize: { width: 60, height: 20 },
      fontSize: 12,
      position: { x: 200, y: 200, pageIndex: currentSlide },
    };
    addSign(options);
  };

  const handleAddText = () => {
    const options = {
      type: "text" as "text",
      value: "Sample text",
      signSize: { width: 100, height: 30 }, // Match handleInitials size
      fontSize: 12,
      position: { x: 200, y: 200, pageIndex: currentSlide },
    };
    addSign(options);
  };

  const handleAddDate = () => {
    const options = {
      type: "date" as "date",
      value: new Date().toISOString().split("T")[0],
      signSize: { width: 100, height: 30 },
      fontSize: 12,
      position: { x: 200, y: 200, pageIndex: currentSlide },
    };
    addSign(options);
  };

  const handleAddCheckbox = () => {
    const options = {
      type: "checkbox" as "checkbox",
      value: false,
      signSize: { width: 20, height: 20 },
      fontSize: 12,
      position: { x: 200, y: 200, pageIndex: currentSlide },
    };
    addSign(options);
  };

  if (!isLoaded) {
    return <p className="center">Loading...</p>;
  }

  return (
    <section className="signTool bg-white rounded-lg">
      {uploadSign && <UploadSign removeUploadSign={closeUploadSign} />}

      <div className="rounded-xl shadow p-4 space-y-4 font-sans">
        <div className="flex items-center">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={25}
                height={25}
                fill="#9ca3af"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
              </svg>
            </span>
          )}
          <div className="ml-2 text-sm font-medium text-gray-800 truncate">
            {user?.primaryEmailAddress?.emailAddress}
          </div>
          <span className="ml-1 text-sm text-gray-500 font-semibold">
            (You)
          </span>
          <button className="ml-auto text-gray-600 group relative">
            {/* Outline icon (hover) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={18}
              height={18}
              className="hidden group-hover:block"
              fill="none"
              stroke="currentColor"
              strokeWidth={32}
            >
              <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
            {/* Filled icon (default) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={18}
              height={18}
              className="block group-hover:hidden"
            >
              <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
          </button>
        </div>

        <div className="space-y-1 text-sm">
          <button
            className="w-full flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-400 transition"
            onClick={() => setUploadSign(true)}
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                width={25}
                height={25}
              >
                <path d="M192 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 7.8c0 27.7-2.4 55.3-7.1 82.5l-84.4 25.3c-40.6 12.2-68.4 49.6-68.4 92l0 71.9c0 40 32.5 72.5 72.5 72.5c26 0 50-13.9 62.9-36.5l13.9-24.3c26.8-47 46.5-97.7 58.4-150.5l94.4-28.3-12.5 37.5c-3.3 9.8-1.6 20.5 4.4 28.8s15.7 13.3 26 13.3l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-83.6 0 18-53.9c3.8-11.3 .9-23.8-7.4-32.4s-20.7-11.8-32.2-8.4L316.4 198.1c2.4-20.7 3.6-41.4 3.6-62.3l0-7.8c0-53-43-96-96-96s-96 43-96 96l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32zm-9.2 177l49-14.7c-10.4 33.8-24.5 66.4-42.1 97.2l-13.9 24.3c-1.5 2.6-4.3 4.3-7.4 4.3c-4.7 0-8.5-3.8-8.5-8.5l0-71.9c0-14.1 9.3-26.6 22.8-30.7zM24 368c-13.3 0-24 10.7-24 24s10.7 24 24 24l40.3 0c-.2-2.8-.3-5.6-.3-8.5L64 368l-40 0zm592 48c13.3 0 24-10.7 24-24s-10.7-24-24-24l-310.1 0c-6.7 16.3-14.2 32.3-22.3 48L616 416z" />
              </svg>
              <span className="text-gray-800">Your sign</span>
            </div>
            <FontAwesomeIcon icon={faCirclePlus} className="text-gray-500 text-xl" />
          </button>

          {signImages && (
            <div className="flex flex-row flex-wrap">
              {signImages.map((sign, index) => (
                <img
                  key={index}
                  src={sign}
                  alt="Signature"
                  className="cursor-move w-[40%]"
                  draggable
                  onDragStart={() => {
                    setSignDragging(true);
                    setCurrentSignIndex(index);
                  }}
                />
              ))}
            </div>
          )}

          <ButtonItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                width={25}
                height={25}
              >
                <path d="M192 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 7.8c0 27.7-2.4 55.3-7.1 82.5l-84.4 25.3c-40.6 12.2-68.4 49.6-68.4 92l0 71.9c0 40 32.5 72.5 72.5 72.5c26 0 50-13.9 62.9-36.5l13.9-24.3c26.8-47 46.5-97.7 58.4-150.5l94.4-28.3-12.5 37.5c-3.3 9.8-1.6 20.5 4.4 28.8s15.7 13.3 26 13.3l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-83.6 0 18-53.9c3.8-11.3 .9-23.8-7.4-32.4s-20.7-11.8-32.2-8.4L316.4 198.1c2.4-20.7 3.6-41.4 3.6-62.3l0-7.8c0-53-43-96-96-96s-96 43-96 96l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32zm-9.2 177l49-14.7c-10.4 33.8-24.5 66.4-42.1 97.2l-13.9 24.3c-1.5 2.6-4.3 4.3-7.4 4.3c-4.7 0-8.5-3.8-8.5-8.5l0-71.9c0-14.1 9.3-26.6 22.8-30.7zM24 368c-13.3 0-24 10.7-24 24s10.7 24 24 24l40.3 0c-.2-2.8-.3-5.6-.3-8.5L64 368l-40 0zm592 48c13.3 0 24-10.7 24-24s-10.7-24-24-24l-310.1 0c-6.7 16.3-14.2 32.3-22.3 48L616 416z" />
              </svg>
            }
            label="Your Initials"
            handleClickOnInitials={handleInitials}
          />
          <StaticItem
            icon={<Type size={25} />}
            label="Text"
            onClick={handleAddText}
          />
          <StaticItem
            icon={<Calendar size={25} />}
            label="Date"
            onClick={handleAddDate}
          />
          <StaticItem
            icon={<CheckSquare size={25} />}
            label="Checkbox"
            onClick={handleAddCheckbox}
          />
        </div>
      </div>
    </section>
  );
};

const ButtonItem = ({ icon, label, handleClickOnInitials }: any) => (
  <button
    className="w-full flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-400 transition"
    onClick={handleClickOnInitials}
  >
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-800">{label}</span>
    </div>
    <FontAwesomeIcon icon={faCirclePlus} className="text-gray-500 text-xl" />
  </button>
);

const StaticItem = ({ icon, label, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg mt-2 hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-400 transition"
  >
    {icon}
    <span className="text-gray-800">{label}</span>
  </button>
);

export default SigningTool;
