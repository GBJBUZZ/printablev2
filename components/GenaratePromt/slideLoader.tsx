import React from "react";
import { motion } from "framer-motion";

const shimmerStyle = {
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.4s ease infinite",
};

const SlidesLoader: React.FC = () => {
  const placeholders = Array.from({ length: 3 });

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-10 w-full">
      {placeholders.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="w-1/2 h-60 rounded-xl shadow-md"
          style={shimmerStyle}
        />
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -400% 0;
          }
          100% {
            background-position: 400% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SlidesLoader;
