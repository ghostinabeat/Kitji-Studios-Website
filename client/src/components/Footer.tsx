import { Bug, Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Footer() {
  const [location, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (link: any) => {
    if (link.isRoute) {
      setLocation(link.href);
    } else {
      if (location !== "/") {
        setLocation("/");
        setTimeout(() => scrollToSection(link.href), 100);
      } else {
        scrollToSection(link.href);
      }
    }
  };

  const quickLinks = [
    { href: "/about", label: "About", isRoute: true },
    { href: "services", label: "Services" },
    { href: "team", label: "Team" },
    { href: "work", label: "Work" },
    { href: "contact", label: "Contact" },
  ];

  const services = [
    "Custom Software Development",
    "Business Analysis",
    "Reverse Engineering",
    "Legacy Modernization",
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <Bug className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Kitji Studios</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Engineering custom software solutions that embody the great spirit of innovation for modern business needs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="bg-gray-800 hover:bg-primary text-gray-300 hover:text-white rounded-lg"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Kitji Studios. All rights reserved. Engineered with the great spirit of innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}