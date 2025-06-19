import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../../api/axios";
import apiProtected from "../../api/apiProtected";
import { handleResponseError } from "../../constants";
import useAuth from "../../hooks/useAuth";
import CommentCard from "./CommentCard";
import { toast } from "react-toastify";
import { Link } from "react-router";

function Comments({ styles }) {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState({
    fetching: true,
    addLoading: false,
  });
  const [error, setError] = useState({
    fetching: null,
    add: null,
  });
  const { userData, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!postId) return;
    setLoading((prev) => ({ ...prev, fetching: true }));
    setError({ fetching: null, add: null, delete: null });
    const abortController = new AbortController();
    const fetchComments = async () => {
      try {
        const res = await api.get(
          `/comments?postId=2&_expand=user&_sort=createdAt&_order=desc`,
          {
            signal: abortController.signal,
          }
        );
        setComments(res.data);
      } catch (err) {
        setError((prev) => ({ ...prev, fetching: handleResponseError(err) }));
      } finally {
        setLoading((prev) => ({ ...prev, fetching: false }));
      }
    };
    fetchComments();
    return () => {
      abortController.abort();
    };
  }, [postId]);

  async function handleAddComment(comment) {
    setLoading((prev) => ({ ...prev, addLoading: true }));
    setError((prev) => ({ ...prev, add: null }));
    toast.dismiss();
    try {
      const res = await apiProtected.post("/comments", {
        postId,
        userId: userData.id,
        content: comment,
        createdAt: new Date().toISOString(),
      });
      setComments((prev) => [
        {
          ...res.data,
          user: { fullName: userData.fullName, id: userData.id },
        },
        ...prev,
      ]);
      toast.success("Comment added successfully.");
    } catch (err) {
      setError((prev) => ({ ...prev, add: handleResponseError(err) }));
    } finally {
      setLoading((prev) => ({ ...prev, addLoading: false }));
    }
  }
  function handleDeleteComment(commentId) {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  }
  return (
    <div className={`${styles}`}>
      <h2 className="text-2xl text-primary font-bold mb-4">Comments</h2>
      {isAuthenticated() ? (
        <div className="mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const comment = e.target.comment.value.trim();
              if (comment) {
                handleAddComment(comment);
                e.target.reset();
              }
            }}
            className="flex sm:flex-row flex-col gap-2"
          >
            <input
              name="comment"
              placeholder="Add a comment..."
              className="input input-primary w-full"
              required
            ></input>
            <button
              disabled={loading.addLoading}
              type="submit"
              className="btn btn-primary"
            >
              Add Comment
              {loading.addLoading && (
                <span className="loading loading-spinner loading-xs ml-2"></span>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-6">
          <p className="text-gray-500 mb-2">
            Please{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>{" "}
            to add a comment.
          </p>
        </div>
      )}
      {loading.fetching && (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      {error.fetching && <p className="text-red-500">{error.fetching}</p>}
      {error.add && <p className="text-red-500">{error.add}</p>}
      {comments.length === 0 && !loading && (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      )}
      {!loading.fetching && comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isAuthenticated={isAuthenticated}
              userData={userData}
              handleDelete={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(Comments);
