import { useState, useContext } from "react";
import { AuthContext } from "../../context/CreateAuthContext";
import { BlogFormFields } from "./BlogFormFields";
import { BlogPreview } from "./BlogPreview";
import { useFormData } from "../../hooks/useFormData";
import apiProtected from "../../api/apiProtected";
import { toast } from "react-toastify";
import { handleResponseError } from "../../constants";
import { useNavigate, useParams } from "react-router";

export default function CreatePost({ mode = "create" }) {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const { postId } = useParams();

  const {
    formData,
    updateFormData,
    addTag,
    removeTag,
    resetFormData,
    loadingPostData,
    uploadImage,
    imgUploading,
  } = useFormData(postId, mode);
  const [newTag, setNewTag] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required.");
      return;
    }
    if (formData.tags.length === 0) {
      toast.error("At least one tag is required.");
      return;
    }
    setIsLoading(true);
    let blogPost;
    if (mode === "edit" && postId) {
      blogPost = { ...formData };
    } else {
      blogPost = {
        ...formData,
        likes: [],
        publishDate: new Date().toLocaleDateString(),
        author: {
          fullName: userData.fullName,
          id: userData.id,
        },
      };
    }
    try {
      const response =
        mode === "create"
          ? await apiProtected.post("/664/posts", blogPost)
          : await apiProtected.put(`/664/posts/${postId}`, blogPost);
      if (response.status >= 200) {
        toast.success(
          mode === "create"
            ? "Blog post created successfully!"
            : "Blog post updated successfully!"
        );
        resetFormData();
        setIsPreview(false);
        navigate(`/`);
      } else {
        throw new Error("Must be logged in to create a blog post.");
      }
    } catch (err) {
      toast.error(handleResponseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === "edit" && postId && loadingPostData) {
    return (
      <div className="flex items-center justify-center min-h-80">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              {mode === "edit" ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-blue-100 mt-1">
              Share your knowledge with the world
            </p>
          </div>

          <div className="p-6">
            {/* Toggle Preview */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-4 py-2 btn btn-primary"
              >
                {isPreview ? "Edit Mode" : "Preview Mode"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>

            {isPreview ? (
              <BlogPreview formData={formData} />
            ) : (
              <BlogFormFields
                formData={formData}
                newTag={newTag}
                setNewTag={setNewTag}
                onInputChange={updateFormData}
                onAddTag={addTag}
                onRemoveTag={removeTag}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                mode={mode}
                uploadImage={uploadImage}
                imgUploading={imgUploading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
