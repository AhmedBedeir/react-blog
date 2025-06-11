import { useState } from "react";
import { AuthContext } from "./CreateAuthContext";
import { useNavigate } from "react-router";
import api from "../api/axios";
import { toast } from "react-toastify";

const customToast = (message, action) => {
  toast.info(
    <div>
      <p>{message}</p>
      <div className="mt-2 flex gap-2 justify-center">
        <button
          className="btn btn-sm btn-error"
          onClick={() => {
            toast.dismiss();
            action();
          }}
        >
          Yes
        </button>
        <button className="btn btn-sm" onClick={() => toast.dismiss()}>
          No
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      position: "top-right",
      className: "custom-toast",
    }
  );
};

function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = () => {
    return userData && token;
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/login", { email, password });
      const { user, accessToken } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);

      setUserData(user);
      setToken(accessToken);
      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    toast.dismiss();
    customToast("Are you sure you want to logout?", () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUserData(null);
      setToken(null);
      navigate("/");
      toast.success("Logout successful!");
    });
  };

  const register = async ({ fullName, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/register", {
        fullName,
        email,
        password,
      });
      const { user, accessToken } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);

      setUserData(user);
      setToken(accessToken);
      toast.success("Registration successful!");
      navigate("/", { replace: true });
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setError(error.response.data);
    } else if (error.request) {
      setError("Network error, please try again later.");
    } else {
      setError("An unexpected error occurred.");
    }
  };

  const clearError = () => {
    setError(null);
  };

  const contextValue = {
    userData,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    clearError,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
