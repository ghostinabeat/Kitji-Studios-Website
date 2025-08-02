import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, TrendingUp, Settings, Cog } from "lucide-react";

export default function About() {
  const services = [
    {
      icon: Laptop,
      title: "Software Development",
      description: "Our team is dedicated to engineering the best custom software solutions for your modern business needs.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Business Analysis",
      description: "We are passionate about improving your business processes. Our team will deliver an effective and efficient solution.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Settings,
      title: "Reverse Engineering",
      description: "See something you like? Our team will engineer from the ground up and deliver a unique product tailored to you.",
      color: "bg-violet-100 text-violet-600"
    },
    {
      icon: Cog,
      title: "Custom Software",
      description: "Bespoke software solutions engineered specifically for your organization's unique requirements and workflows.",
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background dark-theme-bg">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-black/90">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Kitji Studios</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Key features of our company and the spirit behind our name</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:bg-white/10 transition-all group bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardContent className="p-0">
                      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-primary/10`}>
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-300">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Company Story */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">The Spirit of Kitji</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6 text-gray-300">
                    <p className="text-lg">The word "Kitji" is a derivative of the native word <strong className="text-white">Kitjimanitou</strong>, which means the great spirit in Northern native tongue.</p>
                    <p>Kitjimanitou is meant to be representative of the software element of computing. The software of your computer is often abstract and unseen and can be considered the spirit of the computer systematization.</p>
                    <p>At Kitji Studios, our software is engineered to be the <strong className="text-white">great spirit</strong> of your computer system.</p>
                  </div>
                  
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">The Anansi Connection</h3>
                      <p className="text-gray-300 mb-4">Our logo embodies the great animal spirit of Anansi, an African and Caribbean folklore character representing the spirit of knowledge, often portrayed as a spider.</p>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          The abdomen represents the CPU and its circuitry
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          The web symbolizes the internet
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          Binary language communication
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-300">To engineer custom software solutions that embody the great spirit of innovation, empowering businesses to achieve their full potential through technology that is both powerful and accessible.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-gray-300">To be recognized as the leading provider of bespoke software solutions that seamlessly integrate with business processes, creating lasting value and competitive advantages for our clients.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}