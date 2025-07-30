import Navigation from "@/components/Navigation";
import ScrollAnimatedHero from "@/components/ScrollAnimatedHero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark-theme-bg smooth-scroll">
      <Navigation />
      <main>
        <ScrollAnimatedHero />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
