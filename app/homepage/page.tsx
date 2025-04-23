import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import BlogList from "@/components/ui/blog/BlogList";

export default async function Homepage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const category = (await searchParams).category;

  const res = await fetch(
    `${baseUrl}/api/blogs${category ? `?category=${category}` : ""}`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return (
    <PageWrapper>
      <Header />
      <main className="flex-grow">
        <BlogList blogs={blogs} />
      </main>
      <Footer />
    </PageWrapper>
  );
}
