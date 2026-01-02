import React from "react";

export default function LoadingCardSkeleton() {
  return (
    <div className="w-full p-4 bg-gray-50 shadow rounded-2xl relative animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* ID circle */}
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          {/* Title placeholder */}
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
        {/* Action buttons placeholders */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>

      {/* Bullet content skeleton */}
      <div className="pl-10 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}

        {/* Add bullet placeholder */}
        <div className="flex items-start gap-2 mt-4">
          <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200 ml-auto"></div>
        </div>
      </div>
    </div>
  );
}
