import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, MessageSquare, BarChart4, Clock, CheckCircle, Building2, Globe } from "lucide-react";
import { useLocation } from "wouter";

export default function HeroClean() {
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const keyServices = [
    {
      icon: Code2,
      title: "Custom Software Development",
      description: "Enterprise solutions built for banking, insurance, and government sectors"
    },
    {
      icon: Building2,
      title: "System Design & Consulting",
      description: "Strategic workflow optimization and digital transformation"
    }
  ];

  const keyProducts = [
    {
      icon: MessageSquare,
      title: "WhatsApp Business Integration",
      subtitle: "Official BSP Certified",
      description: "Complete automation and customer engagement platform"
    },
    {
      icon: BarChart4,
      title: "Sales Management Software",
      description: "Cloud-based CRM with pipeline management and analytics"
    },
    {
      icon: Clock,
      title: "Overtime Management",
      description: "Smart time tracking with payroll integration"
    }
  ];

  const trustIndicators = [
    "Official WhatsApp Business Service Provider",
    "Serving clients in Banking, Insurance & Government",
    "Based in Barbados, serving clients worldwide"
  ];

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border border-primary/20 text-sm px-4 py-2">
            Official WhatsApp Business Service Provider
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Enterprise Software Solutions<br />
            <span className="text-primary">Engineered with Precision</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We build custom software and provide ready-to-deploy cloud products for banking, insurance, and government sectors. 
            From system design to implementation, we're your trusted technology partner.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6"
              onClick={() => scrollToSection("contact")}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary"
              onClick={() => setLocation("/products")}
            >
              View Cloud Products
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-16">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-primary mr-2" />
                {indicator}
              </div>
            ))}
          </div>
        </div>

        {/* Services & Products Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Services Preview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Custom Development Services</h2>
              <Button 
                variant="ghost" 
                className="text-primary hover:text-primary/80"
                onClick={() => setLocation("/services")}
              >
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {keyServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="bg-white hover:shadow-lg transition-all cursor-pointer group" onClick={() => setLocation("/services")}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Products Preview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Cloud Products</h2>
              <Button 
                variant="ghost" 
                className="text-primary hover:text-primary/80"
                onClick={() => setLocation("/products")}
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {keyProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Card key={index} className="bg-white hover:shadow-lg transition-all cursor-pointer group" onClick={() => setLocation("/products")}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{product.title}</h3>
                            {product.subtitle && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                {product.subtitle}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{product.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">Based in Barbados, serving clients worldwide with 24/7 support</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Focus</h3>
              <p className="text-gray-600">Specialized in banking, insurance, and government solutions</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp BSP</h3>
              <p className="text-gray-600">Official Business Service Provider with full API access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}