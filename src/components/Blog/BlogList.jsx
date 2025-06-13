import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { handleResponseError } from "../../constants";
import AlertError from "../AlertError";
function BlogList() {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const getPosts = async () => {
      try {
        const response = await api.get("/posts", {
          signal: controller.signal,
        });
        setPostsData(response.data);
      } catch (err) {
        setError(handleResponseError(err));
      } finally {
        setLoading(false);
      }
    };
    getPosts();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-12 justify-center">
      {loading && (
        <div
          className="flex items-center justify-center w-full h-full"
          data-testid="loading-spinner"
        >
          <span className="loading loading-circle loading-xl"></span>
        </div>
      )}
      {error && <AlertError message={error} styles="w-full" />}
      {!loading && !error && postsData.length === 0 && (
        <div className="text-gray-500 text-center">No posts available</div>
      )}
      {!loading &&
        !error &&
        postsData.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            date={new Date(post.publishDate).toLocaleDateString()}
            tags={post.tags}
            postImg={post.image}
            likes={post.likes}
            id={post.id}
          />
        ))}
    </div>
  );
}

export default BlogList;
