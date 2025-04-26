import PageWrapper from "@/components/ui/PageWrapper";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import BlogDetail from "@/components/ui/blog/BlogDetail";

export default async function BlogPost({ params }) {
  return (
    <PageWrapper>
      <Header />
      <main className="flex-grow">
        <BlogDetail id={(await params).id} />
      </main>
      <Footer />
    </PageWrapper>
  );
}
