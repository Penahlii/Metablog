import BlogCard from "./BlogCard";
import FeaturedBlogCard from "./FeaturedBlogCard";

type BlogListProps = {
  blogs: any[];
  variant?: "homepage" | "my-blogs";
};

export default function BlogList({
  blogs,
  variant = "homepage",
}: BlogListProps) {
  if (!blogs || blogs.length === 0) {
    return <p className="text-gray-500 text-center">No blogs found.</p>;
  }

  const isHomepage = variant === "homepage";
  const hasFeatured = isHomepage && blogs.length > 0;

  const regularBlogs = hasFeatured ? blogs.slice(0, -1) : blogs;
  const featuredBlog = hasFeatured ? blogs[blogs.length - 1] : null;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {featuredBlog && (
        <div className="lg:col-span-3">
          <FeaturedBlogCard blog={featuredBlog} />
        </div>
      )}

      {regularBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          canDelete={variant === "my-blogs"}
        />
      ))}
    </div>
  );
}
