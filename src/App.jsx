import { containerStyle } from "./constants";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import React, { useEffect, Suspense } from "react";
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const PageNotFound = React.lazy(() => import("./components/PageNotFound"));
const AuthForm = React.lazy(() => import("./pages/auth/AuthForm"));
const ProtectAuthPage = React.lazy(() => import("./utils/ProtectAuthPage"));
const Home = React.lazy(() => import("./pages/Home"));
const CreatePost = React.lazy(() => import("./pages/blog/CreatePost"));
const ProtectPostsCrud = React.lazy(() => import("./utils/ProtectPostsCrud"));
const PostView = React.lazy(() => import("./pages/blog/PostView"));
const Footer = React.lazy(() => import("./components/Footer"));
const BlogList = React.lazy(() => import("./components/Blog/BlogList"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const location = useLocation();
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="transition-colors duration-200">
      <ToastContainer position="top-center" />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        }
      >
        <Navbar />
        <div className={`${containerStyle} mt-28 min-h-screen`}>
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
      </Suspense>
      <SpeedInsights />
    </div>
  );
}

export default App;
