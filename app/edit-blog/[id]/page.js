import PageWrapper from "@/components/ui/PageWrapper";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import BlogForm from "@/components/ui/blog/BlogForm";

export default async function EditBlog({ params }) {
  return (
    <PageWrapper>
      <Header />
      <main className="flex-grow">
        <BlogForm id={(await params).id} />
      </main>
      <Footer />
    </PageWrapper>
  );
}
