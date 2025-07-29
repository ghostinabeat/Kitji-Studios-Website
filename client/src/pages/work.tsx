import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Work from "@/components/Work";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Work />
      </main>
      <Footer />
    </div>
  );
}