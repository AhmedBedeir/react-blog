import { useState } from "react";
import AuthorInfo from "./AuthorInfo";
import apiProtected from "../../api/apiProtected";
import { toast } from "react-toastify";
import { timeAgo } from "../../constants";

function CommentCard({ comment, isAuthenticated, userData, handleDelete }) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function handleDeleteComment(commentId) {
    setLoadingDelete(true);
    toast.dismiss();
    try {
      await apiProtected.delete(`/comments/${commentId}`);
      handleDelete(commentId);
      toast.success("Comment deleted successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete comment. Please try again.");
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <div className="bg-base-100/20 border border-primary/10 rounded-xl shadow-sm p-5 transition hover:shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <AuthorInfo
            name={comment.user.fullName}
            avatarStyle="h-10 w-10"
            verifySize="h-4 w-4"
            nameStyle="text-sm font-semibold"
          />
          <span className="text-xs text-gray-400 ml-2">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        {isAuthenticated() && userData.id === comment.userId && (
          <button
            className="btn btn-xs btn-error hover:scale-105 transition"
            onClick={() => handleDeleteComment(comment.id)}
            disabled={loadingDelete}
            title="Delete comment"
          >
            {loadingDelete ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Delete"
            )}
          </button>
        )}
      </div>
      <div className="ml-2 pl-2 border-l-2 border-primary/20">
        <p className="text-base-content/80 text-sm">{comment.content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
