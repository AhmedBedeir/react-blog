import React from "react";
import avatar2 from "../../assets/images/avatar2.png";

function ProfileBtn({ userData, logout }) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex justify-center items-center gap-3 cursor-pointer border border-primary rounded-md px-2 md:px-4 py-2"
      >
        <div className="avatar">
          <div className="ring-white ring-offset-white w-6 md:w-7 rounded-full ring-1 shadow-md ring-offset-1">
            <img src={avatar2} />
          </div>
        </div>
        <p className={`text-sm font-medium `}>
          {userData?.fullName.slice(0, 10)}
          {userData?.fullName.length > 10 ? "..." : ""}
        </p>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-card rounded-box z-1 mt-4 w-52 p-2 shadow-xl"
      >
        <li className="pointer-events-none hover:bg-transparent cursor-default border-b-1 border-gray-200/50 mb-4">
          <div className="flex flex-col items-start gap-1">
            <p>{userData.fullName}</p>
            <p>{userData.email}</p>
          </div>
        </li>

        <li>
          <button
            className="btn btn-outline btn-error rounded-xl px-6 py-5 font-medium
              "
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileBtn;
