import { useState, useEffect } from "react";
import Logo from "./Logo";
import { containerStyle } from "../../constants";
import ThemeToggle from "./ThemeToggle";
import MenuButton from "./MenuButton";
import { Link } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
    }
    // Save theme preference to localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? isDark
            ? "bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-700/50"
            : "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : isDark
          ? "bg-gray-900 shadow-sm border-b border-gray-800"
          : "bg-white shadow-sm"
      }`}
    >
      <div className={containerStyle}>
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo isDark={isDark} />
          </div>

          {/* search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 transition-colors ${
                    isDark
                      ? "text-gray-400 group-focus-within:text-blue-400"
                      : "text-gray-400 group-focus-within:text-blue-500"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="search"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl transition-all duration-200 ${
                  isDark
                    ? "border-gray-700 bg-gray-800/50 focus:bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    : "border-gray-200 bg-gray-50/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Search anything..."
              />
            </div>
          </div>

          {/* Desktop Controls (theme toggle and auth buttons) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {/* CTA Buttons */}
            <Link
              to="/login"
              className={`group relative px-6 py-2.5 border rounded-xl font-medium active:scale-95 transition-all duration-200 hover:shadow-md flex items-center space-x-2 ${
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

            <Link
              to="/register"
              className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2"
            >
              <span>Sign Up</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 group-hover:rotate-12 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile controls (menu button and toggle theme button)*/}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {/* Mobile menu button */}
            <MenuButton
              isDark={isDark}
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`backdrop-blur-md border-t ${
            isDark
              ? "bg-gray-900/95 border-gray-700/50"
              : "bg-white/95 border-gray-200/50"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    isDark ? "text-gray-400" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="search"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none ${
                  isDark
                    ? "border-gray-700 bg-gray-800/50 focus:bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    : "border-gray-200 bg-gray-50/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
                placeholder="Search anything..."
              />
            </div>

            {/* Mobile Buttons */}
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                to="/login"
                className={`w-full px-6 py-3 border rounded-xl font-medium active:scale-98 transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isDark
                    ? "border-blue-500 text-blue-400 hover:bg-blue-900/20"
                    : "border-blue-500 text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span>Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </Link>

              <Link
                to="/register"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 active:scale-98 transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
              >
                <span>Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
