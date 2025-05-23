import PageWrapper from "@/components/ui/PageWrapper";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import BlogForm from "@/components/ui/blog/BlogForm";

export default async function WriteBlog() {
  return (
    <PageWrapper>
      <Header />
      <main className="flex-grow"></main>
      <BlogForm />
      <Footer />
    </PageWrapper>
  );
}
