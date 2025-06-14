import React from "react";

const SearchInput = ({ isDark }) => {
  return (
    <div className="hidden md:block flex-1 max-w-md mx-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className={`h-5 w-5 transition-colors ${
              isDark
                ? "text-gray-400 group-focus-within:text-blue-400"
                : "text-gray-400 group-focus-within:text-blue-500"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        <input
          type="search"
          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl transition-all duration-200 ${
            isDark
              ? "border-gray-700 bg-gray-800/50 focus:bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              : "border-gray-200 bg-gray-50/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          } focus:outline-none`}
          placeholder="Search anything..."
        />
      </div>
    </div>
  );
};

export default SearchInput;
