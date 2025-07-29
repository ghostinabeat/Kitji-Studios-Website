import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Globe, Users, Database, Lock } from "lucide-react";

export default function Platforms() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const platforms = [
    {
      name: "Utell",
      tagline: "Web3 Trust Platform",
      description: "Decentralized trust platform for secure data transactions with powerful Identity and Access Management (IAAM).",
      features: [
        "Web3 designed decentralized architecture",
        "Powerful IAAM (Identity and Access Management)",
        "Single Source of Truth (SSOT) data platform",
        "Smart contract P2P transactions",
        "Mobile-first responsive design"
      ],
      industries: ["Fintech", "Healthcare", "Government"],
      color: "from-blue-600 to-indigo-600",
      icon: Shield
    },
    {
      name: "Pelas",
      tagline: "Personalized Electronic Ledger Accounting System",
      description: "Next-generation mobile-first SaaS platform for intelligent resource management and financial operations.",
      features: [
        "Web3 designed mobile-first platform",
        "Integrated HR, finance, and time tracking",
        "Real-time automation and insights",
        "Paperless authentication system",
        "High-performance cloud computing"
      ],
      industries: ["Enterprise", "Accounting", "HR"],
      color: "from-emerald-600 to-teal-600",
      icon: Database
    }
  ];

  const webServices = [
    {
      title: "Electorate Web API",
      description: "Specialized API for Barbadian Citizens electoral data",
      icon: Users
    },
    {
      title: "IAAM Framework",
      description: "Identity and Access Management framework",
      icon: Lock
    },
    {
      title: "RESTful CRUD Framework",
      description: "Comprehensive web API development framework",
      icon: Globe
    }
  ];

  return (
    <section id="platforms" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Proprietary Platforms
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Enterprise Platforms</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge proprietary platforms and services designed for modern enterprise needs
          </p>
        </div>

        {/* Main Platforms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Card key={index} className="bg-white shadow-xl border-0 overflow-hidden h-full">
                <div className={`bg-gradient-to-r ${platform.color} p-6 text-white`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{platform.name}</h3>
                      <p className="text-white/90">{platform.tagline}</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">{platform.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Capabilities:</h4>
                    <ul className="space-y-2">
                      {platform.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                          <Zap className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.industries.map((industry, industryIndex) => (
                        <Badge key={industryIndex} variant="outline" className="text-xs">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => scrollToSection("contact")}
                  >
                    Learn More About {platform.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Web Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Kitji Web Services Library</h3>
            <p className="text-gray-600">Pre-built web services and APIs to accelerate your development</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {webServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">Can't find what you need? We'll build it for you.</p>
            <Button 
              variant="outline"
              onClick={() => scrollToSection("contact")}
            >
              Request Custom Web Service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}