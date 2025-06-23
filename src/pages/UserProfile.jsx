import { useState } from "react";
import AuthorInfo from "../components/Blog/AuthorInfo";
import useAuth from "../hooks/useAuth";
import BlogList from "../components/Blog/BlogList";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("my-posts");
  const { userData } = useAuth();

  let url = "";
  let title = "";
  if (activeTab === "my-posts") {
    url = `author.id=${userData.id}`;
    title = "My Posts";
  } else if (activeTab === "liked-posts") {
    url = `likes_like=${userData.id}`;
    title = "Liked Posts";
  }

  return (
    <div className="pb-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <AuthorInfo
          name={userData.fullName}
          avatarStyle="h-24 w-24"
          verifySize="size-8"
          nameStyle="text-2xl"
          titleStyle="text-sm"
        />
        <div className="text-gray-500">{userData.email}</div>
      </div>
      <div className="flex justify-center mt-8 mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold ${
            activeTab === "my-posts"
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => setActiveTab("my-posts")}
        >
          My Posts
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold ${
            activeTab === "liked-posts"
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => setActiveTab("liked-posts")}
        >
          Liked Posts
        </button>
      </div>
      <BlogList url={url} title={title} />
    </div>
  );
};

export default UserProfile;
