import { Categories } from "../../constants";
import MDEditor from "@uiw/react-md-editor";

export function BlogFormFields({
  formData,
  newTag,
  setNewTag,
  onInputChange,
  onAddTag,
  onRemoveTag,
  onSubmit,
  isLoading,
  mode,
}) {
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          className="w-full px-4 py-5 input input-primary "
          placeholder="Enter your blog post title"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={onInputChange}
          className="select select-primary w-full px-4"
          required
        >
          <option value={""} disabled>
            Select a category
          </option>
          {Categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          Cover Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={onInputChange}
          className="w-full flex-1 px-4 py-5 input input-primary "
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-2 w-full h-48 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddTag())
            }
            className="flex-1 px-4 py-2 input input-primary "
            placeholder="Add a tag"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="btn btn-primary px-4 py-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span key={tag} className="badge-custom badge-indigo flex  gap-1">
              #{tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="text-primary"
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="block text-sm font-medium mb-2">Content *</p>

        <MDEditor
          id="content"
          name="content"
          value={formData.content}
          onChange={(value) => {
            console.log(value);
            onInputChange({ target: { name: "content", value } });
          }}
          textareaProps={{
            placeholder: "Write your blog post content here...",
            required: true,
          }}
          preview="edit"
        />

        {/* <MDEditor.Markdown
          source={formData.content}
          className="mt-4 !bg-card p-4 rounded-lg prose"
        /> */}
        <div className="mt-2 text-sm">
          Estimated read time: {formData.readTime || "..."}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="btn px-8 py-6 btn-primary font-semibold rounded-full"
          disabled={isLoading}
        >
          {mode === "edit" ? "Update Post" : "Create Post"}
          {isLoading ? (
            <span className="loading loading-dots loading-xl"></span>
          ) : (
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
