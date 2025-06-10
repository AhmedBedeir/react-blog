import { useContext } from "react";
import { AuthContext } from "../../context/CreateAuthContext";
import Logo from "../../components/Navbar/Logo";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./authValidation";

function Login() {
  const { loading, error, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

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
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <div role="alert" className="alert alert-error w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <label
            className={`input w-full ${
              errors.email?.message
                ? "input-error"
                : dirtyFields.email && !errors.email?.message
                ? "input-success"
                : "input-primary"
            }`}
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email..."
            />
          </label>
          {errors.email?.message && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <label
            className={`input w-full ${
              errors.password?.message
                ? "input-error"
                : dirtyFields.password && !errors.password?.message
                ? "input-success"
                : "input-primary"
            }`}
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
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password..."
            />
          </label>
          {errors.password?.message && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={loading}
          aria-busy={loading}
          aria-label="Login"
          type="submit"
          className="btn btn-primary text-lg w-full mt-4"
        >
          Login
          {loading ? (
            <span className="loading loading-spinner loading-sm ml-2"></span>
          ) : (
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
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
