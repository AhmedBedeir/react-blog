import notFound from "../assets/images/notFound.png";
import { useNavigate } from "react-router";
function PageNotFound({ title, message, action = "/", actionText }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        {/* <h1 className="text-6xl font-bold text-error">404</h1> */}
        <div className="avatar">
          <div className="w-52 ">
            <img src={notFound} />
          </div>
        </div>
        <p className="mt-4 text-xl text-gray-700">
          {title || "Page Not Found!"}
        </p>
        <p className="mt-2 text-gray-500">
          {message || "OOPS! The page you are looking for does not exist."}
        </p>
        <button
          className="cursor-pointer bg-card shadow-md mt-4 text-center w-48 rounded-2xl h-14 relative text-xl font-semibold group"
          type="button"
          onClick={() => navigate(action, { replace: true })}
        >
          <div className="bg-info rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">{actionText || "To Home"}</p>
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
