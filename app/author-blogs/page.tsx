import BlogList from "@/components/ui/blog/BlogList";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import PageWrapper from "@/components/ui/PageWrapper";

export default async function AuthorBlogs({
  searchParams,
}: {
  searchParams: { author?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const author = (await searchParams).author;

  const res = await fetch(
    `${baseUrl}/api/blogs${author ? `?author=${author}` : ""}`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return (
    <PageWrapper>
      <Header />
      <main className="flex-grow">
        <BlogList blogs={blogs} variant="my-blogs" />
      </main>
      <Footer />
    </PageWrapper>
  );
}
