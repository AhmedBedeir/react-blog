import { useContext } from "react";
import { AuthContext } from "../context/CreateAuthContext";

function useAuth() {
  const {
    userData,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    clearError,
  } = useContext(AuthContext);
  
  return {
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
}

export default useAuth;
