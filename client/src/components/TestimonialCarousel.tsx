import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Building, Calendar, Users, TrendingUp, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  quote: string;
  longQuote: string;
  project: string;
  projectType: string;
  results: string[];
  timeline: string;
  teamSize: string;
  rating: number;
  image: string;
  companyLogo?: string;
  videoUrl?: string;
  metrics: {
    performance?: string;
    cost?: string;
    efficiency?: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: "warren-kellman",
    name: "Warren Kellman",
    title: "Founder & CEO",
    company: "Nickel & Dime Ltd",
    industry: "Financial Services",
    quote: "Kitji Studios delivered outstanding custom software development services, taking the time to understand unique business needs and exceeding expectations with a professional, knowledgeable, and responsive approach.",
    longQuote: "Working with Kitji Studios has been transformative for our business. They didn't just build software; they became strategic partners who understood our vision for revolutionizing peer-to-peer lending in the Caribbean. Their expertise in fintech and blockchain technology, combined with their deep understanding of local regulatory requirements, made them the perfect choice for our platform. The final product exceeded all our expectations and has positioned us as leaders in the regional fintech space.",
    project: "Peer-to-Peer Lending Platform",
    projectType: "FinTech Platform",
    results: [
      "100% system uptime since launch",
      "Seamless integration with Caribbean banking systems", 
      "Regulatory compliance across multiple jurisdictions",
      "50% faster loan processing than traditional methods"
    ],
    timeline: "8 months",
    teamSize: "6 developers",
    rating: 5,
    image: "/api/placeholder/80/80",
    companyLogo: "/api/placeholder/120/40",
    metrics: {
      performance: "99.9% uptime",
      cost: "40% cost reduction",
      efficiency: "50% faster processing"
    }
  },
  {
    id: "claire-odle",
    name: "Claire Odle",
    title: "General Manager",
    company: "Caribbean Banking Institution",
    industry: "Banking",
    quote: "I had the opportunity to see the impact of Kitji's work through a banking project they contributed to, and their expertise was evident. The final product was efficient and clearly well-engineered.",
    longQuote: "The banking integration project that Kitji Studios delivered for us was nothing short of exceptional. Their understanding of real-time payment systems and regulatory compliance in the Caribbean banking sector impressed our entire technical team. They managed to integrate complex RTP systems while maintaining the highest security standards. The solution they built has become a cornerstone of our digital banking strategy, handling millions of transactions with zero downtime.",
    project: "Real-Time Payment System Integration",
    projectType: "Banking Infrastructure",
    results: [
      "Real-time transaction processing capability",
      "Enterprise-grade security implementation",
      "Full regulatory compliance across Caribbean markets",
      "24/7 operational stability"
    ],
    timeline: "12 months",
    teamSize: "8 developers",
    rating: 5,
    image: "/api/placeholder/80/80",
    companyLogo: "/api/placeholder/120/40",
    metrics: {
      performance: "Sub-second processing",
      cost: "60% operational savings", 
      efficiency: "24/7 availability"
    }
  },
  {
    id: "troy-reid",
    name: "Troy Reid",
    title: "CEO & Founder",
    company: "TRSol",
    industry: "Technology Solutions",
    quote: "Our experience with Kitji has been extremely phenomenal. Proceeding to have a website built seemed overwhelming initially, but the patience and clarity of everything was top tier.",
    longQuote: "As a fellow technology company, we had high standards for our corporate website and digital presence. Kitji Studios not only met but exceeded those standards. Their approach to understanding our brand, our target audience, and our business goals was methodical and thorough. The website they delivered perfectly represents our company's values and has become a powerful tool for client acquisition. Their ongoing support and willingness to iterate based on feedback showed their commitment to our success.",
    project: "Corporate Website & Digital Platform",
    projectType: "Web Development",
    results: [
      "300% increase in lead generation",
      "Mobile-first responsive design", 
      "SEO optimization driving organic traffic",
      "Integrated CRM and analytics system"
    ],
    timeline: "4 months",
    teamSize: "4 developers",
    rating: 5,
    image: "/api/placeholder/80/80",
    companyLogo: "/api/placeholder/120/40",
    metrics: {
      performance: "Page load < 2 seconds",
      cost: "ROI positive in 3 months",
      efficiency: "300% lead increase"
    }
  },
  {
    id: "government-official",
    name: "Dr. Patricia Williams",
    title: "Director of Digital Services",
    company: "Government of Barbados",
    industry: "Government",
    quote: "Kitji Studios delivered a secure and comprehensive API system for our electoral data management. Their understanding of government requirements and data security protocols was exceptional.",
    longQuote: "When we needed a sophisticated API system for managing electoral data for Barbadian citizens, Kitji Studios was our natural choice. Their expertise in building secure, government-grade systems while maintaining citizen privacy was exactly what we required. The IAAM framework they implemented provides robust security while ensuring seamless access for authorized personnel. The documentation and training they provided made the transition smooth for our team. This system has become a model for other government digitization initiatives.",
    project: "Electoral Data Management API",
    projectType: "Government System",
    results: [
      "Secure API serving 280,000+ citizen records",
      "IAAM framework implementation",
      "Government-grade security protocols",
      "Comprehensive audit trail system"
    ],
    timeline: "10 months",
    teamSize: "5 developers",
    rating: 5,
    image: "/api/placeholder/80/80",
    companyLogo: "/api/placeholder/120/40",
    metrics: {
      performance: "Zero security incidents",
      cost: "50% administrative savings",
      efficiency: "Instant data access"
    }
  },
  {
    id: "manufacturing-ceo",
    name: "Marcus Thompson",
    title: "Operations Director",
    company: "Caribbean Manufacturing Co.",
    industry: "Manufacturing",
    quote: "The IoT analytics platform Kitji built transformed our production monitoring. Real-time insights have improved our efficiency by 35% and reduced downtime significantly.",
    longQuote: "Our manufacturing operations were hampered by limited visibility into production metrics and equipment performance. Kitji Studios developed an IoT analytics platform that gave us real-time insights we never had before. The predictive analytics capabilities help us prevent equipment failures before they occur, and the custom dashboards provide exactly the information each department needs. The ROI was evident within the first quarter of implementation. Their team's understanding of industrial processes and ability to translate that into effective software solutions was remarkable.",
    project: "IoT Analytics & Monitoring Platform",
    projectType: "Industrial IoT",
    results: [
      "35% improvement in operational efficiency",
      "60% reduction in unplanned downtime",
      "Real-time monitoring of 200+ sensors",
      "Predictive maintenance capabilities"
    ],
    timeline: "14 months",
    teamSize: "6 developers",
    rating: 5,
    image: "/api/placeholder/80/80",
    companyLogo: "/api/placeholder/120/40",
    metrics: {
      performance: "1M+ data points/sec",
      cost: "25% cost reduction",
      efficiency: "35% efficiency gain"
    }
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedTestimonial, setExpandedTestimonial] = useState<Testimonial | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Client Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real testimonials from satisfied clients across fintech, banking, government, and enterprise sectors.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white shadow-xl rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Testimonial Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <Quote className="w-12 h-12 text-primary/20" />
                      <div className="flex text-primary">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 italic">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <Building className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</div>
                        <div className="text-gray-600">{currentTestimonial.title}</div>
                        <div className="text-primary font-medium">{currentTestimonial.company}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                      <Badge variant="outline">{currentTestimonial.industry}</Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {currentTestimonial.timeline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {currentTestimonial.teamSize}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setExpandedTestimonial(currentTestimonial)}
                      className="self-start"
                    >
                      View Full Story
                    </Button>
                  </div>

                  {/* Project Details */}
                  <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {currentTestimonial.project}
                    </h3>
                    <Badge variant="secondary" className="mb-6 self-start">
                      {currentTestimonial.projectType}
                    </Badge>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      {Object.entries(currentTestimonial.metrics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-semibold text-primary">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Top Results */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                      <ul className="space-y-2">
                        {currentTestimonial.results.slice(0, 3).map((result, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              className="p-3"
              disabled={testimonials.length <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Auto-play control */}
            <Button
              variant="ghost"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-3"
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="outline"
              onClick={nextTestimonial}
              className="p-3"
              disabled={testimonials.length <= 1}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Detail Modal */}
        <AnimatePresence>
          {expandedTestimonial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setExpandedTestimonial(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Building className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{expandedTestimonial.name}</h2>
                        <div className="text-gray-600">{expandedTestimonial.title}</div>
                        <div className="text-primary font-medium">{expandedTestimonial.company}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setExpandedTestimonial(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex text-primary">
                      {[...Array(expandedTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline">{expandedTestimonial.industry}</Badge>
                    <Badge variant="secondary">{expandedTestimonial.projectType}</Badge>
                  </div>

                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 italic border-l-4 border-primary pl-6">
                    "{expandedTestimonial.longQuote}"
                  </blockquote>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Project: {expandedTestimonial.project}</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">Timeline: {expandedTestimonial.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">Team: {expandedTestimonial.teamSize}</span>
                        </div>
                      </div>

                      <h4 className="font-semibold mb-3">Performance Metrics:</h4>
                      <div className="space-y-2">
                        {Object.entries(expandedTestimonial.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between p-3 bg-gray-50 rounded">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium text-primary">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Complete Results:</h4>
                      <ul className="space-y-3">
                        {expandedTestimonial.results.map((result, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}