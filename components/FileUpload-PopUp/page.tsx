// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation"; // ✅ This is what you asked

// type Props = {
//   onClose: () => void;
// };

// const FileUploadPopUp: React.FC<Props> = ({ onClose }) => {
//   const router = useRouter(); // ✅ use it here

//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 200);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (progress >= 100) {
//       router.push("/print-and-deliver/print"); // ✅ Navigates when progress is 100
//     }
//   }, [progress, router]);

//   return (
//     <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-[1px] bg-black/60">
//       <div className="h-auto w-[350px] px-4 shadow-2xl bg-white py-6 rounded-[10px]">
//         {/* Image */}
//         <div className="flex justify-center items-center">
//           <Image
//             src="/uploadFile.png"
//             alt="uploadFile Image"
//             height={50}
//             width={50}
//             className="h-auto w-[100px]"
//           />
//         </div>

//         {/* Text */}
//         <div className="flex justify-center items-center text-sm mt-2 text-center text-black font-semibold">
//           <h1>Upload your file on printable network</h1>
//         </div>

//         {/* Progress bar */}
//         <div className="w-full mt-4 mb-2">
//           <div className="w-full h-[15px] bg-gray-300 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] transition-all duration-200"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <p className="text-center text-xs mt-1">{progress}%</p>
//         </div>

//         {/* Cancel Button */}
//         <div className="flex justify-center items-center h-auto w-full text-red-500 pt-1">
//           <button className="hover:cursor-pointer" onClick={onClose}>
//             Cancel Upload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUploadPopUp;

"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

type Props = {
  onClose: () => void
}

const FileUploadPopUp: React.FC<Props> = ({ onClose }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-[1px] bg-black/60">
      <div className="h-auto w-[350px] px-4 shadow-2xl bg-white py-6 rounded-[10px]">
        {/* Image */}
        <div className="flex justify-center items-center">
          <Image
            src="/uploadFile.png"
            alt="uploadFile Image"
            height={50}
            width={50}
            className="h-auto w-[100px]"
          />
        </div>

        {/* Title */}
        <div className="flex justify-center items-center text-sm mt-2 text-center text-black font-semibold">
          <h1>Uploading your file to Printable network</h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-4 mb-2">
          <div className="w-full h-[15px] bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs mt-1">{progress}%</p>
        </div>

        {/* Cancel Button */}
        <div className="flex justify-center items-center h-auto w-full text-red-500 pt-1">
          <button className="hover:cursor-pointer" onClick={onClose}>
            Cancel Upload
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileUploadPopUp

