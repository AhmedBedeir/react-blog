export function BlogPreview({ formData }) {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="prose max-w-none">
      <div className="mb-6">
        {formData.image && (
          <img
            src={formData.image}
            alt="Blog post cover"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <div className="flex items-center gap-4 text-sm mb-4">
          <span className="badge badge-warning px-2 py-1 rounded">
            {formData.category || "UnCategorized"}
          </span>
          <span>{currentDate}</span>
          <span>{formData.readTime}</span>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          {formData.title || "Blog Post Title"}
        </h1>
        <div className="flex gap-2 mb-6">
          {formData.tags.map((tag) => (
            <span key={tag} className="badge-custom badge-blue">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="whitespace-pre-wrap leading-relaxed">
        {formData.content || "Your blog post content will appear here..."}
      </div>
    </div>
  );
}
