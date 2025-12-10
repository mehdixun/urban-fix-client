import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        {/* Loading Text */}
        <p className="mt-4 text-gray-700 font-medium text-lg">Loading data...</p>
      </div>
    </div>
  );
};

export default Loader;
