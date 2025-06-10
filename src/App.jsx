import Navbar from "./components/Navbar/Navbar";
import { containerStyle } from "./constants";
import { useContext } from "react";
import { AuthContext } from "./context/CreateAuthContext";
import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";

function App() {
  const data = useContext(AuthContext);
  console.log(data);
  return (
    <div className="transition-colors duration-200">
      <ToastContainer position="top-center" />
      <Navbar />
      <div className={`${containerStyle} mt-28`}>
        <Routes>
          <Route path="/" element={<h1 className="text-2xl">Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          {/* not found route */}
          <Route
            path="/register"
            element={<h1 className="text-2xl">Register Page</h1>}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
