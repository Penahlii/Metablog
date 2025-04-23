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

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const featuredBlog = hasFeatured ? sortedBlogs[0] : null;
  const regularBlogs = hasFeatured ? sortedBlogs.slice(1) : sortedBlogs;

  return (
    <div className="mb-16">
      <div className="max-w-[1520px] mx-auto px-4">
        {featuredBlog && (
          <div className="lg:col-span-3 mb-4">
            <FeaturedBlogCard blog={featuredBlog} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-4 md:px-6 lg:px-8">
          {regularBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              canDelete={variant === "my-blogs"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
