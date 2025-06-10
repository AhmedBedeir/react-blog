import { useState } from "react";
import { AuthContext } from "./CreateAuthContext";

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = () => {
    return user && token;
  };
  const contextValue = {
    user,
    setUser,
    token,
    setToken,
    loading,
    setLoading,
    error,
    setError,
    isAuthenticated,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
