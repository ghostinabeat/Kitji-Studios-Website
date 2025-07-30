import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  Settings, 
  Database,
  Code2,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Cog,
  Zap,
  Shield
} from "lucide-react";

export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mainServices = [
    {
      icon: Code2,
      title: "Custom Software Development",
      description: "Tailored enterprise solutions built specifically for your business processes and requirements. From concept to deployment.",
      features: ["Enterprise Architecture", "Scalable Solutions", "Legacy System Integration", "Cloud-Native Development"],
      color: "bg-blue-100 text-blue-600",
      industries: ["Banking", "Insurance", "Government"]
    },
    {
      icon: Building2,
      title: "System Design & Workflow Optimization",
      description: "Strategic consulting services to optimize your business processes, system architecture, and operational workflows for maximum efficiency.",
      features: ["System Architecture Design", "Process Optimization", "Workflow Automation", "Digital Transformation Strategy"],
      color: "bg-emerald-100 text-emerald-600",
      industries: ["Finance", "Healthcare", "Manufacturing"]
    },
    {
      icon: BarChart3,
      title: "Business Intelligence & Analytics",
      description: "Transform your data into actionable insights with powerful BI tools and real-time analytics platforms.",
      features: ["Data Visualization", "Real-time Dashboards", "Predictive Analytics", "Custom Reporting"],
      color: "bg-purple-100 text-purple-600",
      industries: ["Retail", "Logistics", "Operations"]
    },
    {
      icon: Database,
      title: "System Integration & Data Management",
      description: "Connect all your business systems seamlessly. Expert integration of payment systems, APIs, and enterprise platforms.",
      features: ["API Integration", "Payment Systems", "Real-time Processing", "Data Migration"],
      color: "bg-orange-100 text-orange-600",
      industries: ["Banking", "E-commerce", "Fintech"]
    },
    {
      icon: Settings,
      title: "Legacy System Modernization",
      description: "Modernize legacy systems or recreate existing solutions with improved functionality, security, and performance.",
      features: ["Legacy Modernization", "Code Analysis", "System Recreation", "Cloud Migration"],
      color: "bg-indigo-100 text-indigo-600",
      industries: ["Enterprise", "Government", "Healthcare"]
    },
    {
      icon: Cog,
      title: "Web Services & API Development",
      description: "Build robust web services and APIs that connect your systems and enable seamless data exchange.",
      features: ["RESTful APIs", "Microservices", "Third-party Integration", "Documentation"],
      color: "bg-teal-100 text-teal-600",
      industries: ["SaaS", "Mobile Apps", "IoT"]
    }
  ];

  const valueProps = [
    { icon: Zap, text: "30% Faster Delivery" },
    { icon: Shield, text: "Enterprise Security" },
    { icon: CheckCircle, text: "Proven Track Record" }
  ];

  return (
    <section id="services" className="py-20 bg-black/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Enterprise Solutions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What We Build For You</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive software solutions designed to solve real business problems and drive measurable results
          </p>
          
          {/* Value Propositions */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon;
              return (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-4 py-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-gray-700 font-medium text-sm">{prop.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="bg-white p-6 shadow-lg hover:shadow-xl transition-all group border-0 h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${service.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                  
                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Industries Served */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Industries:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.industries.map((industry, industryIndex) => (
                        <Badge key={industryIndex} variant="outline" className="text-xs px-2 py-1">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-primary/80 p-0 mt-auto justify-start"
                    onClick={() => scrollToSection("contact")}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business Operations?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join enterprise clients across banking, insurance, and government who trust us to deliver 
            mission-critical software solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => scrollToSection("contact")}
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => scrollToSection("work")}
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}