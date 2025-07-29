import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Shayne Marshall",
      role: "Software Engineer / Developer",
      title: "Director / Founder Kitji Studios",
      description: "Passionate about software development and technology. Love to learn and create innovative solutions that make a difference.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Frederick Chandler Masterton",
      role: "Software Engineer / Developer",
      title: "Director Kitji Studios",
      description: "Skilled developer with expertise in multiple platforms. Apple enthusiast and advocate for clean, efficient code architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    }
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The Team</h2>
          <p className="text-xl text-gray-600">Meet the minds behind Kitji Studios</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow group border-0">
              <CardContent className="p-0 text-center">
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.role}`}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100 group-hover:border-primary transition-colors"
                />
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.title}</p>
                <p className="text-gray-700 mb-6">{member.description}</p>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <Button variant="ghost" size="icon" className="bg-gray-100 hover:bg-primary hover:text-white rounded-lg">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-gray-100 hover:bg-primary hover:text-white rounded-lg">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-gray-100 hover:bg-primary hover:text-white rounded-lg">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-700 border-0">
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}