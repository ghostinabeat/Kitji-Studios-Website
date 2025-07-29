import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, TrendingUp, Zap } from "lucide-react";

export default function About() {
  const achievements = [
    "10+ years combined development experience",
    "50+ successful project deliveries",
    "Enterprise-grade security standards",
    "24/7 ongoing support and maintenance"
  ];

  const values = [
    {
      icon: Star,
      title: "Excellence",
      description: "We deliver exceptional software that exceeds expectations and stands the test of time.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We embrace cutting-edge technologies to create forward-thinking solutions.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Efficiency",
      description: "We optimize every process to deliver maximum value in minimum time.",
      color: "bg-green-100 text-green-600"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Kitji Studios?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Your trusted partner for transformative software solutions that drive real business results</p>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow group bg-gray-50 hover:bg-gray-100 border-0">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${value.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-8">Proven Track Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the growing number of businesses that trust Kitji Studios to deliver software solutions that make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6"
              onClick={() => scrollToSection("contact")}
            >
              Start Your Project Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary"
              onClick={() => scrollToSection("work")}
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}