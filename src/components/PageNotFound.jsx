import React from "react";

function PageNotFound() {
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
