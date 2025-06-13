import { useContext } from "react";
import { AuthContext } from "../context/CreateAuthContext";
import { Navigate } from "react-router";

function ProtectPostsCrud({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectPostsCrud;
