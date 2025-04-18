import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* You can put your homepage content here */}
        <div className="container px-4 py-8">
          <h1 className="text-2xl font-semibold mb-4">Welcome to MetaBlog</h1>
          <p className="text-gray-600">
            This is your homepage content. Add blog previews or sections here.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
