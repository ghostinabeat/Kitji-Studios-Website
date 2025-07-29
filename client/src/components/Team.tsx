import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award, Users, User, Code2, Database } from "lucide-react";

export default function Team() {
  const teamStats = [
    { icon: Users, number: "10+", label: "Years Combined Experience" },
    { icon: Award, number: "50+", label: "Projects Delivered" },
    { icon: MapPin, number: "3", label: "Continents Served" }
  ];

  const leadership = [
    {
      name: "Shayne Marshall",
      role: "Team Lead & Senior Developer",
      email: "smarshall@kitjistudios.com",
      icon: User,
      specializations: [
        "Project Leadership",
        "Banking & Payment Systems",
        "Real-Time Payment (RTP) Integration",
        "Full-Stack Development"
      ],
      description: "Led the development of the Nickel & Dime peer-to-peer lending platform and specializes in financial systems integration, particularly Real-Time Payment systems in Barbados."
    }
  ];

  const expertise = [
    "Enterprise Architecture",
    "Banking & Payment Systems", 
    "Government Solutions",
    "Web3 & Blockchain",
    "Business Intelligence",
    "System Integration",
    "Legacy Modernization",
    "API Development"
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Our Team
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Industry Nomads with Global Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team brings extensive expertise across multiple industries, specializing in enterprise solutions 
            for banking, insurance, government, and beyond.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center p-8 bg-gray-50 border-0 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Expertise Areas */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Expertise Areas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Industry Experience</h4>
                <p className="text-gray-600 mb-4">
                  Our team boasts extensive expertise across a spectrum of industries, including Insurance, 
                  Banking, Multimedia, Finance, Payroll Management, Logistics Management, and Elections.
                </p>
                <p className="text-gray-600">
                  With a global presence, we serve both Government and Commercial sectors, making us 
                  versatile Industry Nomads capable of adapting to any business environment.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Specializations</h4>
                <div className="grid grid-cols-2 gap-3">
                  {expertise.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Leadership</h3>
          <div className="max-w-4xl mx-auto">
            {leadership.map((leader, index) => {
              const Icon = leader.icon;
              return (
                <Card key={index} className="bg-white shadow-lg border-0 p-8 mb-8">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h4>
                        <p className="text-primary font-medium mb-2">{leader.role}</p>
                        <p className="text-gray-600 text-sm mb-4">
                          <a href={`mailto:${leader.email}`} className="text-primary hover:underline">
                            {leader.email}
                          </a>
                        </p>
                        <p className="text-gray-600 mb-4">{leader.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {leader.specializations.map((spec, specIndex) => (
                            <div key={specIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-sm text-gray-700">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg border-0 p-6">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Systems Integration</h4>
                <p className="text-gray-600">
                  We possess valuable insights into banking and payment infrastructure systems. 
                  Our team has intimate knowledge of Real-Time Payment (RTP) systems and played 
                  an integral role in implementing these integrations in Barbados.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg border-0 p-6">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Data-Driven Decision Making</h4>
                <p className="text-gray-600">
                  We believe in data-driven decision making. Our experts build and leverage BI tools 
                  to provide valuable insights that inform strategic decisions, improve operations, 
                  and drive business growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}