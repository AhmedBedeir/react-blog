// hooks/useFormData.js
import { useState, useEffect } from "react";
import { estimateReadTime } from "../constants";

export function useFormData() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    readTime: "",
    category: "",
    image: "",
    tags: [],
  });

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
  };
}
