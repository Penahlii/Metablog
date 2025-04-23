import BlogList from "@/components/ui/blog/BlogList";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import PageWrapper from "@/components/ui/PageWrapper";
import AuthorInfoBox from "@/components/ui/authorBlogs/AuthorInfoBox";
import { createClient } from "@/utils/supabase/server";
import LatestPostTitle from "@/components/ui/authorBlogs/LatestPostTitle";

export default async function AuthorBlogs({
  searchParams,
}: {
  searchParams: { author?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const author = (await searchParams).author;

  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const isCurrentUser = currentUser?.id === author;

  const res = await fetch(
    `${baseUrl}/api/blogs${author ? `?author=${author}` : ""}`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  const authRes = await fetch(`${baseUrl}/api/authors/${author}`, {
    cache: "no-store",
  });
  const authMain = await authRes.json();

  return (
    <PageWrapper>
      <Header />
      {authMain?.email && <AuthorInfoBox email={authMain.email} />}
      <main className="flex-grow">
        {blogs.length && <LatestPostTitle />}
        <BlogList blogs={blogs} variant="my-blogs" canDelete={isCurrentUser} />
      </main>
      <Footer />
    </PageWrapper>
  );
}
