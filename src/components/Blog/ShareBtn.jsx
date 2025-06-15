
const ShareBtn = ({ postId }) => {
  return (
    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        `${window.location.origin}/post/${postId}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 
           5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11.5 
           19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 
           1.75-1.75S8.75 5 8.75 5.97s-.78 1.75-1.75 
           1.75zM20 19h-3v-4.5c0-1.1-.9-2-2-2s-2 
           .9-2 2V19h-3v-9h3v1.2c.5-.8 1.7-1.2 2.7-1.2 
           2.2 0 4.3 1.8 4.3 4.4V19z"
        />
      </svg>

      <span>Share</span>
    </a>
  );
};

export default ShareBtn;
