import avatarImg from "../../assets/images/avatar2.png";

function AuthorInfo({
  name,
  avatarStyle = "h-12 w-12",
  verifySize = "size-5",
  nameStyle = "text-sm",
  titleStyle = "text-xs",
}) {
  return (
    <div className="flex items-center">
      <div className="relative  mx-auto rounded-full shadow-md">
        <img
          src={avatarImg}
          alt="Author"
          className={`${avatarStyle} rounded-full border-2 border-white shadow-md object-cover`}
        />
        <div className="absolute bottom-0 right-0 text-blue-500 bg-card rounded-full shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${verifySize}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        </div>
      </div>
      <span
        className={`${nameStyle} ml-3 font-sans font-semibold text-blue-gray-900 antialiased`}
      >
        {name}
        <br />
        <span className={`${titleStyle} font-normal text-blue-gray-600`}>
          Software Engineer
        </span>
      </span>
    </div>
  );
}

export default AuthorInfo;
