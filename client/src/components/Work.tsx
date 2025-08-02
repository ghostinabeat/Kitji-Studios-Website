import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building, Star, Quote } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase";
import TestimonialCarousel from "./TestimonialCarousel";

export default function Work() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const testimonials = [
    {
      name: "Warren Kellman",
      title: "Founder, Nickel & Dime Ltd",
      company: "Financial Services",
      image: "/api/placeholder/80/80",
      quote: "Kitji Studios delivered outstanding custom software development services, taking the time to understand unique business needs and exceeding expectations with a professional, knowledgeable, and responsive approach.",
      project: "Peer-to-Peer Lending Platform",
      industry: "Fintech"
    },
    {
      name: "Claire Odle",
      title: "General Manager",
      company: "Banking Sector",
      image: "/api/placeholder/80/80",
      quote: "I had the opportunity to see the impact of Kitji's work through a banking project they contributed to, and their expertise was evident. The final product was efficient and clearly well-engineered.",
      project: "Banking Integration System",
      industry: "Banking"
    },
    {
      name: "Troy Reid",
      title: "CEO & Founder",
      company: "TRSol",
      image: "/api/placeholder/80/80",
      quote: "Our experience with Kitji has been extremely phenomenal. Proceeding to have a website built seemed overwhelming initially, but the patience and clarity of everything was top tier.",
      project: "Corporate Website Development",
      industry: "Technology"
    }
  ];

  const caseStudies = [
    {
      title: "Nickel & Dime P2P Lending Platform",
      description: "Revolutionary peer-to-peer lending platform with seamless integration to Barbados financial systems",
      industry: "Fintech",
      technologies: ["Web3", "Smart Contracts", "Payment Integration", "Real-time Processing"],
      results: ["100% Uptime", "Seamless Integration", "Scalable Architecture"]
    },
    {
      title: "Real-Time Payment System Integration",
      description: "Mission-critical RTP system implementation for banking infrastructure in Barbados",
      industry: "Banking",
      technologies: ["RTP Systems", "API Integration", "Security Protocols", "Data Management"],
      results: ["Enterprise Security", "Real-time Processing", "Regulatory Compliance"]
    },
    {
      title: "Government Electoral API",
      description: "Specialized API system for Barbadian Citizens electoral data management",
      industry: "Government",
      technologies: ["RESTful APIs", "Data Security", "IAAM Framework", "Documentation"],
      results: ["Secure Access", "Comprehensive Coverage", "Government Approved"]
    }
  ];

  return (
    <>
      {/* Project Showcase Gallery */}
      <ProjectShowcase />
      
      {/* Dynamic Testimonial Carousel */}
      <TestimonialCarousel />
      
      {/* Case Studies */}
      <section id="work" className="py-20 bg-black/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Real Impact, Real Results</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Detailed case studies showcasing how we've delivered transformative solutions 
            across banking, fintech, and government sectors.
          </p>
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-3 border-primary/30 text-primary">{study.industry}</Badge>
                  <h3 className="text-lg font-bold text-white mb-3">{study.title}</h3>
                  <p className="text-gray-300 text-sm">{study.description}</p>
                </div>
                
                <div className="mb-4 flex-grow">
                  <h4 className="text-sm font-semibold text-white mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-1">
                    {study.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <h4 className="text-sm font-semibold text-white mb-2">Key Results:</h4>
                  <ul className="space-y-1">
                    {study.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-xs text-gray-300">
                        <Star className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let's discuss how we can build a custom solution that transforms your business operations 
            and delivers measurable results.
          </p>
          <Button 
            size="lg" 
            className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6"
            onClick={() => scrollToSection("contact")}
          >
            Start Your Project Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
    </>
  );
}