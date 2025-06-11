import Navbar from "./components/Navbar/Navbar";
import { containerStyle } from "./constants";
import { Routes, Route } from "react-router";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";
import AuthForm from "./pages/auth/AuthForm";
import ProtectAuthPage from "./utils/ProtectAuthPage";

function App() {
  console.log("App component rendered");
  return (
    <div className="transition-colors duration-200">
      <ToastContainer position="top-center" />
      <Navbar />
      <div className={`${containerStyle} mt-28`}>
        <Routes>
          <Route path="/" element={<h1 className="text-2xl">Home Page</h1>} />
          <Route
            path="/login"
            element={
              <ProtectAuthPage>
                <AuthForm mode={"login"} />
              </ProtectAuthPage>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectAuthPage>
                <AuthForm mode={"register"} />
              </ProtectAuthPage>
            }
          />

          {/* not found route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
