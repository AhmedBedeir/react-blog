import React from "react";

function MenuButton({ toggleMenu, isMenuOpen, isDark }) {
  return (
    <button
      onClick={toggleMenu}
      className={`relative p-2 rounded-xl transition-all duration-200 ${
        isMenuOpen
          ? isDark
            ? "bg-blue-900/20 text-blue-400 rotate-180"
            : "bg-blue-100 text-blue-600 rotate-180"
          : isDark
          ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <div className="w-6 h-6 relative">
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition-all duration-200 ${
            isMenuOpen ? "rotate-45 top-3" : "top-1"
          }`}
        ></span>
        <span
          className={`absolute h-0.5 w-6 bg-current top-3 transition-all duration-200 ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition-all duration-200 ${
            isMenuOpen ? "-rotate-45 top-3" : "top-5"
          }`}
        ></span>
      </div>
    </button>
  );
}

export default MenuButton;
