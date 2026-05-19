import React from "react";

const LoadingPage = () => {
  // Generates 4 skeleton placeholder blocks to match your grid structure
  const skeletonCards = Array.from({ length: 4 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {skeletonCards.map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl p-5 space-y-4 bg-white shadow-sm">
            {/* Image Skeleton */}
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl animate-pulse" />
            {/* Text Header Skeleton */}
            <div className="h-5 w-2/3 bg-gray-100 rounded animate-pulse" />
            {/* Details Tags Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="h-7 bg-gray-50 border border-gray-100 rounded-lg animate-pulse" />
              <div className="h-7 bg-gray-50 border border-gray-100 rounded-lg animate-pulse" />
            </div>
            {/* Action Buttons Skeleton */}
            <div className="flex gap-2 pt-2">
              <div className="h-9 flex-1 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-9 flex-1 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;