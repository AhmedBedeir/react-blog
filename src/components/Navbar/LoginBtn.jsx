import { Link } from "react-router";

const LoginBtn = ({ isDark, styles, toggleMenu = null }) => (
  <Link
    to="/login"
    onClick={toggleMenu}
    className={`${styles} ${
      isDark
        ? "border-blue-500 text-blue-400 hover:bg-blue-900/20 hover:shadow-blue-500/20"
        : "border-blue-500 text-blue-600 hover:bg-blue-50 hover:shadow-blue-500/20"
    }`}
  >
    <span>Login</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
      />
    </svg>
  </Link>
);

export default LoginBtn;
