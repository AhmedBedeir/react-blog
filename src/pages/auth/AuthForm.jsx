import { useContext } from "react";
import { AuthContext } from "../../context/CreateAuthContext";
import Logo from "../../components/Navbar/Logo";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "./authValidation";
import InputElement from "./InputElement";
import {
  EmailIcon,
  LockIcon,
  LoginIcon,
  NewUserIcon,
  UserIcon,
} from "./FormIcons";
import AlertError from "../../components/AlertError";

function AuthForm({ mode }) {
  const {
    loading,
    error,
    login,
    register: registerUser,
    clearError,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(mode === "register" ? registerSchema : loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (mode === "register") {
      registerUser(data);
      return;
    }
    login(data.email, data.password);
  };

  return (
    <div className="bg-card py-8  rounded-2xl shadow-xl flex flex-col items-center justify-center w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto lg:min-h-[calc(100vh-150px)] ">
      <Logo />
      <h1 className="text-3xl font-bold mt-4">
        {mode === "register" ? "Create an Account 🙌" : "Welcome Back 👋"}
      </h1>
      <p className="text-base-content/60 text-center mt-2">
        {mode === "register"
          ? "Create your account to get started"
          : "Sign in to continue to your account"}
      </p>
      <p className="text-base-content/60 text-center mt-1 mb-4">
        {mode === "register"
          ? "Already have an account? "
          : "Don't have an account? "}
        <Link
          to={mode === "register" ? "/login" : "/register"}
          className="text-primary font-semibold hover:underline"
          onClick={clearError}
        >
          {mode === "register" ? "Login here" : "Register here"}
        </Link>
      </p>

      <form
        className="flex flex-col gap-4 w-full max-w-md px-4 md:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <AlertError message={error} styles="w-full" />}
        {mode === "register" && (
          <InputElement
            type="text"
            name={"fullName"}
            label={"Full Name"}
            placeholder={"Enter your full name..."}
            register={register}
            errors={errors}
            dirtyFields={dirtyFields}
            icon={<UserIcon />}
          />
        )}
        <InputElement
          type="email"
          name={"email"}
          label={"Email"}
          placeholder={"Enter your email..."}
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
          icon={<EmailIcon />}
        />
        <InputElement
          type="password"
          name={"password"}
          label={"Password"}
          placeholder={"Enter your password..."}
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
          icon={<LockIcon />}
        />

        {mode === "register" && (
          <InputElement
            type="password"
            name={"confirmPassword"}
            label={"Confirm Password"}
            placeholder={"Confirm your password..."}
            register={register}
            errors={errors}
            dirtyFields={dirtyFields}
            icon={<LockIcon />}
          />
        )}
        <button
          disabled={loading}
          aria-busy={loading}
          aria-label="Login"
          type="submit"
          className="btn btn-primary text-lg w-full mt-4"
        >
          {mode === "register" ? "Register" : "Login"}
          {loading ? (
            <span className="loading loading-spinner loading-sm ml-2"></span>
          ) : mode === "register" ? (
            <NewUserIcon />
          ) : (
            <LoginIcon />
          )}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
