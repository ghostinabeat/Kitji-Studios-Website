import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Linkedin, Github, Twitter } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-violet-500/10 rounded-full blur-lg"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Save time and money.<br />
            <span className="text-primary">Kitji Studios</span> will build it for you
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
            Engineering custom software solutions that embody the great spirit of innovation for your modern business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6"
              onClick={() => scrollToSection("about")}
            >
              Learn More & Start Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary"
              onClick={() => scrollToSection("work")}
            >
              View Our Work
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute bottom-8 left-8 hidden sm:flex space-x-4">
        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-lg">
          <Linkedin className="h-5 w-5 text-gray-600 hover:text-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-lg">
          <Github className="h-5 w-5 text-gray-600 hover:text-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-lg">
          <Twitter className="h-5 w-5 text-gray-600 hover:text-primary" />
        </Button>
      </div>
    </section>
  );
}