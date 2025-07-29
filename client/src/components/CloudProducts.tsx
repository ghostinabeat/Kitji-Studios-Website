import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  BarChart4, 
  Clock,
  ArrowRight,
  CheckCircle,
  Cloud,
  Shield,
  Zap,
  Globe,
  Smartphone,
  TrendingUp
} from "lucide-react";

export default function CloudProducts() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cloudProducts = [
    {
      icon: MessageSquare,
      title: "WhatsApp Business Integration",
      subtitle: "Official WhatsApp Service Provider",
      description: "Complete WhatsApp Business API integration with advanced automation, customer support, and marketing capabilities.",
      features: [
        "Official WhatsApp BSP certification",
        "Automated customer support chatbots",
        "Bulk messaging and campaigns",
        "CRM and e-commerce integration",
        "Multi-agent support dashboard",
        "Advanced analytics and reporting"
      ],
      benefits: [
        "24/7 customer engagement",
        "90% reduction in response time",
        "Seamless omnichannel experience",
        "Compliance with WhatsApp policies"
      ],
      color: "from-green-600 to-emerald-600",
      pricing: "Starting from $299/month"
    },
    {
      icon: BarChart4,
      title: "Sales Management Software",
      subtitle: "Cloud-Based CRM Solution",
      description: "Comprehensive cloud-based sales management platform designed to streamline your sales processes and boost revenue.",
      features: [
        "Lead management and tracking",
        "Pipeline visualization and forecasting",
        "Customer relationship management",
        "Sales team performance analytics",
        "Integration with email and calendar",
        "Mobile-first responsive design"
      ],
      benefits: [
        "30% increase in sales productivity",
        "Real-time sales insights",
        "Automated follow-up sequences",
        "Seamless team collaboration"
      ],
      color: "from-blue-600 to-indigo-600",
      pricing: "Starting from $49/user/month"
    },
    {
      icon: Clock,
      title: "Overtime Management Software",
      subtitle: "Smart Time Tracking Solution",
      description: "Advanced cloud-based overtime management system with intelligent time tracking, compliance monitoring, and automated payroll integration.",
      features: [
        "Intelligent time tracking and clocking",
        "Overtime calculation and approval workflows",
        "Compliance with labor regulations",
        "Payroll system integration",
        "Employee self-service portal",
        "Manager dashboard and reporting"
      ],
      benefits: [
        "95% reduction in payroll errors",
        "Automated compliance reporting",
        "Improved employee satisfaction",
        "Streamlined HR processes"
      ],
      color: "from-purple-600 to-pink-600",
      pricing: "Starting from $29/employee/month"
    }
  ];

  const cloudBenefits = [
    { icon: Cloud, title: "99.9% Uptime", description: "Enterprise-grade cloud infrastructure" },
    { icon: Shield, title: "Bank-Level Security", description: "Advanced encryption and compliance" },
    { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance" },
    { icon: Globe, title: "Global Access", description: "Access from anywhere, anytime" },
    { icon: Smartphone, title: "Mobile Ready", description: "Native mobile apps and responsive design" },
    { icon: TrendingUp, title: "Scalable", description: "Grows with your business needs" }
  ];

  return (
    <section id="cloud-products" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Cloud Products
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready-to-Deploy Cloud Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful cloud-based software products designed to accelerate your business growth with enterprise-grade features and reliability.
          </p>
        </div>

        {/* Cloud Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {cloudBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 text-center p-4 hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{benefit.title}</h4>
                  <p className="text-xs text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Products */}
        <div className="space-y-12 mb-16">
          {cloudProducts.map((product, index) => {
            const Icon = product.icon;
            const isEven = index % 2 === 0;
            
            return (
              <Card key={index} className="bg-white shadow-2xl border-0 overflow-hidden">
                <div className={`grid grid-cols-1 ${isEven ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-0`}>
                  {/* Content */}
                  <div className={`p-8 lg:p-12 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{product.title}</h3>
                        <p className="text-primary font-medium">{product.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Business Benefits:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center text-sm text-gray-600">
                            <TrendingUp className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Starting at</p>
                        <p className="text-2xl font-bold text-primary">{product.pricing}</p>
                      </div>
                      <Button 
                        className={`bg-gradient-to-r ${product.color} hover:opacity-90 text-white px-8 py-3`}
                        onClick={() => scrollToSection("contact")}
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Visual/Stats */}
                  <div className={`bg-gradient-to-br ${product.color} p-8 lg:p-12 text-white flex items-center justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-16 h-16 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold mb-4">Ready to Deploy</h4>
                      <p className="text-white/90 mb-6">
                        Enterprise-ready solution with comprehensive onboarding and 24/7 support.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">30 Days</div>
                          <div className="text-sm text-white/80">Free Trial</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">24/7</div>
                          <div className="text-sm text-white/80">Support</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Cloud Solution?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't see exactly what you need? We can build a custom cloud-based solution tailored 
            specifically to your business requirements and industry needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6"
              onClick={() => scrollToSection("contact")}
            >
              Discuss Custom Solution
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary"
              onClick={() => scrollToSection("contact")}
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}