import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/CreateAuthContext";
import { useNavigate, useParams } from "react-router";
import api from "../../api/axios";
import { handleResponseError } from "../../constants";
import PageNotFound from "../../components/PageNotFound";
import avatarImg from "../../assets/images/avatar.png";
import { badgeStyles } from "../../constants";
import MDEditor from "@uiw/react-md-editor";
import DeletePostBtn from "../../components/Blog/DeletePostBtn";
import EditPostBtn from "../../components/Blog/EditPostBtn";
import { toast } from "react-toastify";
import apiProtected from "../../api/apiProtected";
import LikePostViewBtn from "../../components/Blog/LikePostViewBtn";
import ShareBtn from "../../components/Blog/ShareBtn";

function PostView() {
  const navigate = useNavigate();
  const { userData, isAuthenticated } = useContext(AuthContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    message: "",
    code: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    setError({
      message: "",
      code: 0,
    });
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`, {
          signal: controller.signal,
        });
        setPost(response.data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else if (err.status === 404) {
          setError({
            message: "Post not found",
            code: 404,
          });
        } else {
          setError({
            message: handleResponseError(err),
            code: err.status || 500,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
    return () => {
      controller.abort();
    };
  }, [postId]);

  let isLiked = false;
  if (post && isAuthenticated()) {
    isLiked = post.likes.includes(userData.id);
  }

  const toggleLike = async () => {
    if (!post) return;
    toast.dismiss();
    if (!isAuthenticated()) {
      toast.dismiss();
      toast.error("Please login to like the post.");
      return;
    }
    const { likes } = post;
    const snapshotPost = post;
    const updatedLikes = isLiked
      ? likes.filter((like) => like !== userData.id)
      : [...likes, userData.id];
    const updatedPost = {
      ...post,
      likes: updatedLikes,
    };
    setPost(updatedPost);
    try {
      const res = await apiProtected.put(`/664/posts/${post.id}`, {
        ...updatedPost,
      });
      console.log(res);
    } catch (error) {
      // If the API call fails, revert to the previous state
      setPost(snapshotPost);
      toast.dismiss();
      toast.error(handleResponseError(error));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {isLoading && (
          <div className="flex items-center justify-center min-h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin animate-reverse"></div>
            </div>
          </div>
        )}

        {error.message && (
          <div className="animate-fade-in">
            <PageNotFound
              message={`Post you are looking for does not exist or has been deleted.`}
              title={"Post Not Found!"}
              actionText={"New Post"}
              action={"/post/create"}
            />
          </div>
        )}

        {post && !error.message && !isLoading && (
          <article className="rounded-3xl shadow-md bg-card overflow-hidden">
            {/* Hero Image */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                  {post.title}
                </h1>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Author Section */}
              <div className="flex flex-col gap-6 md:gap-0 md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="relative">
                      <img
                        src={avatarImg}
                        alt="Author"
                        className="w-14 h-14 rounded-full border-1 border-white shadow-lg object-cover ring-1 ring-blue-100"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-1 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="white"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold mb-1">
                      {post.author.fullName}
                    </h3>
                    <span className="text-sm">Software Engineer</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {post.publishDate}
                  </span>
                </div>
              </div>

              {/* Tags Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Topics</h4>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                        badgeStyles[index % badgeStyles.length]
                      } shadow-sm`}
                    >
                      <span className="mr-1">#</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

              {/* Content Section */}

              <MDEditor.Markdown
                source={post.content}
                className="px-2 prose prose-lg"
              />

              {/* Bottom Actions */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex space-x-4 flex-col gap-4 md:flex-row md:gap-0 justify-between items-center">
                  {isAuthenticated() &&
                    String(userData.id) === String(post.author.id) && (
                      <div>
                        <EditPostBtn postId={postId} />
                        <DeletePostBtn
                          id={postId}
                          onDelete={() => {
                            navigate("/");
                          }}
                        />
                      </div>
                    )}
                  <div className="flex gap-4 items-center">
                    <LikePostViewBtn
                      isLiked={isLiked}
                      toggleLike={toggleLike}
                      likesCount={post.likes.length}
                    />

                    <ShareBtn postId={postId} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default PostView;
