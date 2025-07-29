import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Rocket } from "lucide-react";
import { SiDotnet, SiPhp, SiPython } from "react-icons/si";

export default function Work() {
  const projects = [
    {
      icon: SiDotnet,
      title: "Enterprise .NET Solutions",
      description: "Robust, scalable applications built with ASP.NET framework for enterprise-level requirements.",
      technologies: ["ASP.NET", "C#", "SQL Server"],
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: SiPhp,
      title: "Dynamic Web Applications",
      description: "Custom web solutions using PHP and modern frameworks for dynamic, data-driven applications.",
      technologies: ["PHP", "Laravel", "MySQL"],
      color: "text-indigo-600 bg-indigo-100"
    },
    {
      icon: SiPython,
      title: "Data Analytics & Automation",
      description: "Python-powered solutions for data analysis, machine learning, and business process automation.",
      technologies: ["Python", "Data Science", "Automation"],
      color: "text-green-600 bg-green-100"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
          <p className="text-xl text-gray-600">Excellence under the hood - technologies and solutions we deliver</p>
        </div>

        {/* Featured Projects/Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card key={index} className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow group border-0">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${project.color}`}>
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className={project.color}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Let's discuss how we can engineer the perfect software solution for your business needs.</p>
          <Button 
            size="lg" 
            className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6"
            onClick={() => scrollToSection("contact")}
          >
            Start Your Project
            <Rocket className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}