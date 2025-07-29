import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CloudProducts from "@/components/CloudProducts";
import Platforms from "@/components/Platforms";
import Team from "@/components/Team";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <CloudProducts />
        <Platforms />
        <Team />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
