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
import PostView from "./pages/blog/PostView";
import Footer from "./components/Footer";
import { useLocation } from "react-router";
import { useEffect } from "react";
import BlogList from "./components/Blog/BlogList";
import UserProfile from "./pages/UserProfile";
function App() {
  const location = useLocation();
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);
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
          <Route
            path="/post/edit/:postId"
            element={
              <ProtectPostsCrud>
                <CreatePost mode={"edit"} />
              </ProtectPostsCrud>
            }
          />
          <Route path="/post/:postId" element={<PostView />} />
          <Route path="/posts" element={<BlogList />} />
          <Route
            path="/profile"
            element={
              <ProtectPostsCrud>
                <UserProfile />
              </ProtectPostsCrud>
            }
          />
          {/* not found route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
