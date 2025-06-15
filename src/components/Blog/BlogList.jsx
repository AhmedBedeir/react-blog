import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { handleResponseError } from "../../constants";
import AlertError from "../AlertError";
import { Categories } from "../../constants";
import NoPostYet from "./NoPostYet";

const POSTS_PER_PAGE = 3; // Change as needed

function BlogList() {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [category, setCategory] = useState("");
  useEffect(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const getPosts = async () => {
      try {
        const response = await api.get(
          `/posts?_page=${page}&_limit=${POSTS_PER_PAGE}${
            category ? `&category=${encodeURIComponent(category)}` : ""
          }`,
          { signal: controller.signal }
        );
        setPostsData(response.data);
        console.log(response);
        // For json-server, total count is in x-total-count header
        setTotalPosts(Number(response.headers["x-total-count"] || 0));
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
  }, [page, category]);

  const handleDelete = (id) => {
    setPostsData((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-center mb-15">
        <select
          className="select select-primary"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1); // Reset to first page when category changes
          }}
        >
          <option value="">All Categories</option>
          {Categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

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
          <NoPostYet
            title={"No Posts Yet"}
            message={"Create your first post to see it here!"}
          />
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
              onDelete={handleDelete}
            />
          ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn btn-sm ${page === idx + 1 ? "btn-primary" : ""}`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogList;
