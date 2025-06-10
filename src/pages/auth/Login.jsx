import React from "react";
import Logo from "../../components/Navbar/Logo";
import { Link } from "react-router";
function Login() {
  return (
    <div className="bg-card py-8  rounded-2xl shadow-xl flex flex-col items-center justify-center w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto lg:min-h-[calc(100vh-150px)] ">
      <Logo />
      <h1 className="text-3xl font-bold mt-4">Welcome Back 👋</h1>
      <p className="text-base-content/60 text-center mt-2">
        Sign in to continue to your account
      </p>
      <p className="text-base-content/60 text-center mt-1 mb-4">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary hover:text-primary-focus font-medium hover:underline"
        >
          Create one here
        </Link>
      </p>
      <form
        className="flex flex-col gap-4 w-full max-w-md px-4 md:px-0"
        onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission logic here
          alert("Login form submitted");
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <label className="input input-primary w-full">
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <input id="email" type="email" placeholder="Enter your email..." />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <label className="input input-primary w-full">
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
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <input
              id="password"
              type="password"
              placeholder="Enter your password..."
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary text-lg w-full mt-4">
          Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Login;
