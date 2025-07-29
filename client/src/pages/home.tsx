import Navigation from "@/components/Navigation";
import HeroClean from "@/components/HeroClean";
import Team from "@/components/Team";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroClean />
        <Team />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
