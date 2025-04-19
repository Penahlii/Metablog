import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

export default async function Homepage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const category = searchParams.category;

  const res = await fetch(
    `${baseUrl}/api/blogs${category ? `?category=${category}` : ""}`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return (
    <PageWrapper>
      <Header />
      <main className="flex-grow">
        {/* <div className="container px-4 py-8">
          <h1 className="text-2xl font-semibold mb-4">Welcome to MetaBlog</h1>
          {category && (
            <p className="mb-2 text-gray-500">
              Filtering by category: <strong>{category}</strong>
            </p>
          )}
          {blogs.map((blog: any) => (
            <div key={blog.id}>{blog.title}</div>
          ))}
        </div> */}
      </main>
      <Footer />
    </PageWrapper>
  );
}
