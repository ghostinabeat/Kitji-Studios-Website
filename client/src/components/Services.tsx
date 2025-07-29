import { Card, CardContent } from "@/components/ui/card";
import { SiDotnet, SiPhp, SiPython, SiJavascript, SiMysql, SiAngular } from "react-icons/si";
import { Database, Code } from "lucide-react";

export default function Services() {
  const technologies = [
    { icon: SiDotnet, name: "ASP.NET", color: "text-blue-600" },
    { icon: SiPhp, name: "PHP", color: "text-indigo-600" },
    { icon: SiPython, name: "Python", color: "text-green-600" },
    { icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
    { icon: Database, name: "SQL Server", color: "text-orange-600" },
    { icon: SiMysql, name: "MySQL", color: "text-emerald-600" },
    { icon: SiAngular, name: "AngularJS", color: "text-red-600" },
    { icon: Code, name: "Visual Basic", color: "text-purple-600" },
  ];

  const stats = [
    { number: "10+", label: "Programming Languages" },
    { number: "15+", label: "Frameworks & Tools" },
    { number: "89+", label: "Frontend Solutions" },
    { number: "150+", label: "Backend Systems" },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Technical Expertise</h2>
          <p className="text-xl text-gray-600">Technologies and frameworks we use to build exceptional software</p>
        </div>

        {/* Technology Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Card key={index} className="bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow border-0">
                <CardContent className="p-0">
                  <Icon className={`text-4xl mx-auto mb-2 ${tech.color}`} />
                  <p className="text-sm font-medium text-gray-700">{tech.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics */}
        <Card className="gradient-bg p-8 text-white border-0">
          <CardContent className="p-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
