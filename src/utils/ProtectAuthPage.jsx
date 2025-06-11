import { useContext } from "react";
import { AuthContext } from "../context/CreateAuthContext";
import { Navigate } from "react-router";
function ProtectAuthPage({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectAuthPage;
