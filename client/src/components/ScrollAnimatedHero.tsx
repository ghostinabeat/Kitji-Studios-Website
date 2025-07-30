import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Zap, Shield, Globe, ChevronDown } from "lucide-react";

export default function ScrollAnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  
  // Scroll-based transforms for hero section
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const textY = useTransform(scrollY, [0, 1000], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.8]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  // Mouse tracking for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Code,
      title: "Web3 & Blockchain",
      description: "Decentralized trust platforms like Utell"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Banking-grade security protocols"
    },
    {
      icon: Zap,
      title: "Real-time Systems",
      description: "High-performance payment processing"
    },
    {
      icon: Globe,
      title: "Cloud Solutions",
      description: "Scalable SaaS platforms"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Hero Content Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Scroll Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        style={{ 
          y: textY, 
          opacity: heroOpacity,
          x: mousePosition.x,
          rotateX: mousePosition.y * 0.1
        }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border border-primary/20 text-sm px-4 py-2">
              Enterprise Software Development
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="text-glow">Innovation.</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Driven.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transforming ambitious ideas into enterprise-grade solutions. 
            From Web3 platforms to banking systems, we make the impossible possible.
          </motion.p>

          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 card-glow"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-8 h-8 text-primary mb-2 mx-auto" />
                  <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 text-white text-lg px-8 py-6 shadow-2xl"
              onClick={scrollToContact}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm"
              onClick={() => window.location.href = '/work'}
            >
              View Our Work
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Additional Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}