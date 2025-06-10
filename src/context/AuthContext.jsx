import { useState } from "react";
import { AuthContext } from "./CreateAuthContext";
import { useNavigate } from "react-router";
import api from "../api/axios";

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
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.response ? err.response.data : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    userData,
    token,
    loading,
    error,
    isAuthenticated,
    login,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
