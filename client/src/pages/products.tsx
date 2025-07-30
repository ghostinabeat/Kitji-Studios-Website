import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CloudProducts from "@/components/CloudProducts";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background dark-theme-bg">
      <Navigation />
      <main className="pt-16">
        <CloudProducts />
      </main>
      <Footer />
    </div>
  );
}