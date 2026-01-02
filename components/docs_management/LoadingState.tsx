import React from "react";
import { Loader2 } from "lucide-react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64">
      <Loader2 className="h-10 w-10 text-[#06044B] animate-spin mb-4" />
      <p className="text-gray-500">Loading your files and folders...</p>
    </div>
  );
};

export default LoadingState;
