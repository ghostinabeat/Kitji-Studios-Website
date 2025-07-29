import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Team from "@/components/Team";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Team />
      </main>
      <Footer />
    </div>
  );
}