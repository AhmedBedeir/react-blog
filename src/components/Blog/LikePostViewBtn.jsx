import React from "react";

const LikePostViewBtn = ({ isLiked, toggleLike, likesCount }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium shadow-lg transform transition-all duration-200 hover:scale-105 ${
        isLiked
          ? "bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-xl"
          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl"
      }`}
      onClick={toggleLike}
    >
      <svg
        className="w-5 h-5"
        fill={isLiked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
        4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 
        16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
        11.54L12 21.35z"
        />
      </svg>
      <span>{isLiked ? "Liked" : "Like"}</span>
      <span>{likesCount}</span>
    </button>
  );
};

export default LikePostViewBtn;
