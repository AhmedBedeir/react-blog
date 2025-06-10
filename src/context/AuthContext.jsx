import { useState } from "react";
import { AuthContext } from "./CreateAuthContext";
import { useNavigate } from "react-router";
import api from "../api/axios";
import { toast } from "react-toastify";

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
      console.log(err);
      setError(err.response ? err.response.data : "Login failed");
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

  const contextValue = {
    userData,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// need to make custom toast for confirmation messages with action buttons
// Are you sure you want to logout?
// Yes, No
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
      position: "top-center",
      className: "custom-toast",
    }
  );
};

export default AuthContextProvider;
