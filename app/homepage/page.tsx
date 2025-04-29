import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import BlogList from "@/components/ui/blog/BlogList";

export default async function Homepage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const category = searchParams.category;
  const search = searchParams.search;

  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const res = await fetch(
    `${baseUrl}/api/blogs${params.toString() ? `?${params.toString()}` : ""}`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return (
    <PageWrapper>
      <Header />
      <main className="flex-grow">
        <BlogList initialBlogs={blogs} category={category} searchQuery={search} />
      </main>
      <Footer />
    </PageWrapper>
  );
}
