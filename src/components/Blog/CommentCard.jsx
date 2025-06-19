import { useState } from "react";
import AuthorInfo from "./AuthorInfo";
import apiProtected from "../../api/apiProtected";
import { toast } from "react-toastify";

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
    <div className="mb-4 border-b border-base-300/70 pb-4">
      <div className="comment-header flex items-center mb-6 justify-between">
        <AuthorInfo name={comment.user.fullName} />
        <span className="text-xs font-normal text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="comment-content ml-4">
        <p className="text-base-content/70 ">{comment.content}</p>
      </div>
      {isAuthenticated() && userData.id === comment.userId && (
        <div className="flex justify-end">
          <button
            className="btn btn-sm btn-error mt-2"
            onClick={() => handleDeleteComment(comment.id)}
            disabled={loadingDelete}
          >
            {loadingDelete ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
