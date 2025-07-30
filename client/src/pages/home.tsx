import Navigation from "@/components/Navigation";
import ScrollAnimatedHero from "@/components/ScrollAnimatedHero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background smooth-scroll">
      {/* Dark themed background that extends through entire page */}
      <div className="fixed inset-0 dark-theme-bg -z-10">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="home-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(207, 90%, 54%)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid)" />
          </svg>
        </div>
      </div>
      
      <Navigation />
      <main className="relative z-10">
        <ScrollAnimatedHero />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
