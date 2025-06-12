import BlogCard from "./BlogCard";

function BlogList() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-12 justify-center">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />  
    </div>
  );
}

export default BlogList;
