import { useState, useEffect, useContext } from "react";
import { estimateReadTime, handleResponseError } from "../constants";
import apiProtected from "../api/apiProtected";
import api from "../api/axios";
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
  const [imgUploading, setImgUploading] = useState(false);

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

  const uploadImage = async (file) => {
    const newFormData = new FormData();
    newFormData.append("image", file);
    setImgUploading(true);
    try {
      // Replace with your actual upload endpoint
      const response = await api.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        image: response.data.data.url,
      }));
      return response.data.url;
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed.");
      return null;
    } finally {
      setImgUploading(false);
    }
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
    uploadImage,
    imgUploading,
  };
}
