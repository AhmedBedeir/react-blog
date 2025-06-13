import { useState, useEffect, useContext } from "react";
import { estimateReadTime, handleResponseError } from "../constants";
import apiProtected from "../api/apiProtected";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/CreateAuthContext";

export function useFormData(postId, mode) {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    readTime: "",
    category: "",
    image: "",
    tags: [],
  });
  const [loadingPostData, setLoadingPostData] = useState(false);

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      content: "",
      readTime: "",
      category: "",
      image: "",
      tags: [],
    });
  };

  // If postId is provided, fetch existing post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await apiProtected.get(`/664/posts/${postId}`);
        const postData = response.data;
        if (String(postData.author.id) !== String(userData.id)) {
          toast.error("You can only edit your own posts.");
          navigate("/");
          return;
        }
        setFormData(postData);
      } catch (err) {
        if (err.status === 404) {
          toast.error("Post not found.");
          navigate("/", { replace: true });
        }
        toast.error(handleResponseError(err));
      } finally {
        setLoadingPostData(false);
      }
    };

    if (postId && mode === "edit") {
      setLoadingPostData(true);
      toast.dismiss();
      fetchPostData();
    }
  }, [postId, mode, userData.id, navigate]);

  // Auto-calculate read time when content changes
  useEffect(() => {
    if (formData.content) {
      setFormData((prev) => ({
        ...prev,
        readTime: estimateReadTime(formData.content),
      }));
    }
  }, [formData.content]);

  return {
    formData,
    updateFormData,
    addTag,
    removeTag,
    resetFormData,
    loadingPostData,
  };
}
