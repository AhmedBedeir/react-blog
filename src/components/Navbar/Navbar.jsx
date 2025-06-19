import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/CreateAuthContext";
import Logo from "./Logo";
import { containerStyle } from "../../constants";
import ThemeToggle from "./ThemeToggle";
import MenuButton from "./MenuButton";
import { Link } from "react-router";
import LoginBtn from "./LoginBtn";
import RegisterBtn from "./RegisterBtn";
import ProfileBtn from "./ProfileBtn";
import CreatePostBtn from "./CreatePostBtn";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const { userData, isAuthenticated, logout } = useContext(AuthContext);
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
          <SearchInput
            isDark={isDark}
            styles={"hidden md:block flex-1 max-w-md mx-8"}
          />

          {/* Desktop Controls (theme toggle and auth buttons) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {/* CTA Buttons */}
            {isAuthenticated() ? (
              <>
                <CreatePostBtn />
                <ProfileBtn userData={userData} logout={logout} />
              </>
            ) : (
              <>
                <LoginBtn
                  isDark={isDark}
                  styles="group relative px-6 py-2.5 border rounded-xl font-medium active:scale-95 transition-all duration-200 hover:shadow-md flex items-center space-x-2"
                />
                <RegisterBtn
                  isDark={isDark}
                  styles="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2"
                />
              </>
            )}
          </div>

          {/* Mobile controls (menu button and toggle theme button)*/}

          <div className="md:hidden flex items-center gap-1">
            {/* Mobile Theme Toggle */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {/* Mobile menu button */}
            {isAuthenticated() ? (
              <ProfileBtn userData={userData} logout={logout} />
            ) : (
              <MenuButton
                isDark={isDark}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
              />
            )}
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
            <SearchInput isDark={isDark} styles={`w-full`} />

            {/* Mobile Buttons */}
            <div className="flex flex-col space-y-3 pt-2">
              <LoginBtn
                isDark={isDark}
                styles={`w-full px-6 py-3 border rounded-xl font-medium active:scale-98 transition-all duration-200 shadow-md flex items-center justify-center space-x-2`}
                toggleMenu={() => setIsMenuOpen(false)}
              />

              <RegisterBtn
                isDark={isDark}
                styles={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 active:scale-98 transition-all duration-200 shadow-md flex items-center justify-center space-x-2`}
                toggleMenu={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
