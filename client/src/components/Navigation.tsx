import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/about", label: "About", isRoute: true },
    { href: "/services", label: "Services", isRoute: true },
    { href: "/products", label: "Products", isRoute: true },
    { href: "/team", label: "Team", isRoute: true },
    { href: "/work", label: "Work", isRoute: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm border-b" : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => {
              if (location !== "/") {
                setLocation("/");
              } else {
                scrollToSection("home");
              }
            }}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("contact")}
              className="gradient-bg hover:opacity-90 text-white"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link)}
                    className="text-left py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Button 
                  onClick={() => scrollToSection("contact")}
                  className="gradient-bg hover:opacity-90 text-white mt-4"
                >
                  Contact
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}