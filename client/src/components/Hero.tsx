import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Linkedin, Github, Twitter, CheckCircle, Clock, Shield, Code2, Database, Cog } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trustIndicators = [
    { icon: CheckCircle, text: "50+ Projects Delivered" },
    { icon: Clock, text: "30% Faster Than Industry Average" },
    { icon: Shield, text: "Enterprise-Grade Security" }
  ];

  const quickServices = [
    { icon: Code2, title: "Custom Software", description: "Tailored solutions built for your exact needs" },
    { icon: Database, title: "System Integration", description: "Connect all your business systems seamlessly" },
    { icon: Cog, title: "Business Intelligence", description: "Transform data into actionable insights" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Tech-inspired background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-indigo-600/5"></div>
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Floating tech elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600/10 rounded-lg blur-sm rotate-12"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-600/10 rounded-lg blur-sm -rotate-12"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-600/10 rounded-full blur-sm"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-6 bg-white/90 text-primary border border-primary/20 text-sm px-4 py-2">
              ⭐ Trusted by Enterprise Clients Across Banking, Insurance & Government
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Overpaying for Software.<br />
              <span className="text-primary">Get Enterprise Solutions</span> Built Right
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Skip expensive off-the-shelf software that doesn't fit. Get powerful, custom-built enterprise solutions 
              designed specifically for your business — delivered faster and more cost-effectively.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {trustIndicators.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 bg-white/80 rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-gray-700 font-medium">{indicator.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
                onClick={() => scrollToSection("services")}
              >
                Explore Solutions
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Services Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group cursor-pointer"
                     onClick={() => scrollToSection("services")}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>

          {/* Value Proposition */}
          <div className="text-center mt-8">
            <p className="text-gray-600 max-w-2xl mx-auto">
              <strong>No upfront costs.</strong> No lengthy contracts. Just results-driven enterprise software 
              that scales with your business and pays for itself.
            </p>
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