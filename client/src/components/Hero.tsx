import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Linkedin, Github, Twitter, CheckCircle, Clock, Shield } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trustIndicators = [
    { icon: CheckCircle, text: "50+ Projects Delivered" },
    { icon: Clock, text: "Average 30% Faster Delivery" },
    { icon: Shield, text: "Enterprise Security Standards" }
  ];

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
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <Badge variant="secondary" className="mb-4 bg-white/90 text-primary border border-primary/20">
            ⭐ Trusted by 30+ Businesses Worldwide
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stop Overpaying for Software.<br />
            <span className="text-primary">Get Custom Solutions</span> Built Right
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-6 leading-relaxed max-w-4xl mx-auto">
            Skip the expensive off-the-shelf software that doesn't fit your needs. Get powerful, 
            custom-built solutions designed specifically for your business — delivered faster 
            and at a fraction of the cost.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div key={index} className="flex items-center space-x-2 bg-white/80 rounded-lg px-4 py-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-gray-700 font-medium">{indicator.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6 shadow-lg"
              onClick={() => scrollToSection("contact")}
            >
              Get Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary bg-white/80"
              onClick={() => scrollToSection("work")}
            >
              See Success Stories
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Value Proposition */}
          <p className="text-gray-600 max-w-2xl mx-auto">
            <strong>No upfront costs.</strong> No lengthy contracts. Just results-driven software 
            that grows with your business and pays for itself.
          </p>
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