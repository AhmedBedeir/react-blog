import Navbar from "./components/Navbar/Navbar";
import { containerStyle } from "./constants";
import { Routes, Route } from "react-router";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";
import AuthForm from "./pages/auth/AuthForm";
import ProtectAuthPage from "./utils/ProtectAuthPage";
import Home from "./pages/Home";
import CreatePost from "./pages/blog/CreatePost";
import ProtectPostsCrud from "./utils/ProtectPostsCrud";

function App() {
  console.log("App component rendered");
  return (
    <div className="transition-colors duration-200">
      <ToastContainer position="top-center" />
      <Navbar />
      <div className={`${containerStyle} mt-28`}>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route
            path="/post/create"
            element={
              <ProtectPostsCrud>
                <CreatePost />
              </ProtectPostsCrud>
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
