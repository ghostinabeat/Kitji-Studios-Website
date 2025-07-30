import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Zap, Shield, Globe, ChevronDown } from "lucide-react";

export default function ScrollAnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  
  // Comprehensive scroll-based transforms for office productivity flow
  const backgroundY = useTransform(scrollY, [0, 2000], [0, 600]);
  const textY = useTransform(scrollY, [0, 1000], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.8]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  
  // Office productivity scene transforms
  const scene1Opacity = useTransform(scrollY, [0, 300, 600], [1, 1, 0]);
  const scene2Opacity = useTransform(scrollY, [300, 600, 900], [0, 1, 0]);
  const scene3Opacity = useTransform(scrollY, [600, 900, 1200], [0, 1, 0]);
  const scene4Opacity = useTransform(scrollY, [900, 1200, 1500], [0, 1, 0]);
  
  // Silhouette and element positioning
  const silhouetteX = useTransform(scrollY, [0, 1500], [0, -200]);
  const silhouetteScale = useTransform(scrollY, [0, 800], [1, 0.8]);
  const deskElementsY = useTransform(scrollY, [0, 600], [0, -100]);

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
    <div ref={containerRef} className="relative overflow-hidden" style={{ height: '200vh' }}>
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 dark-theme-bg"
        style={{ y: backgroundY, scale: heroScale }}
      >
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(207, 90%, 54%)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </motion.div>

      {/* Office Productivity Flow Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Scene 1: Person typing at desk silhouette */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: scene1Opacity, x: silhouetteX, scale: silhouetteScale }}
        >
          <svg viewBox="0 0 400 300" className="w-96 h-72 text-white/30">
            {/* Desk */}
            <rect x="50" y="200" width="300" height="80" rx="8" fill="currentColor" />
            {/* Monitor */}
            <rect x="120" y="120" width="160" height="100" rx="4" fill="currentColor" />
            <rect x="125" y="125" width="150" height="85" rx="2" fill="hsl(207, 90%, 54%)" opacity="0.3" />
            {/* Person silhouette */}
            <ellipse cx="200" cy="180" rx="25" ry="20" fill="currentColor" />
            <rect x="185" y="180" width="30" height="40" rx="15" fill="currentColor" />
            <rect x="175" y="210" width="15" height="30" rx="7" fill="currentColor" />
            <rect x="210" y="210" width="15" height="30" rx="7" fill="currentColor" />
            {/* Typing hands */}
            <motion.g
              animate={{
                translateY: [0, -2, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <circle cx="175" cy="220" r="8" fill="currentColor" />
              <circle cx="225" cy="220" r="8" fill="currentColor" />
            </motion.g>
            {/* Keyboard */}
            <rect x="140" y="230" width="120" height="20" rx="4" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Scene 2: Code/Development */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: scene2Opacity, y: deskElementsY }}
        >
          <svg viewBox="0 0 400 300" className="w-96 h-72 text-white/40">
            {/* Code editor interface */}
            <rect x="50" y="50" width="300" height="200" rx="8" fill="currentColor" />
            <rect x="55" y="55" width="290" height="30" fill="hsl(207, 90%, 54%)" opacity="0.4" />
            {/* Code lines with animation */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.g key={i}>
                <rect 
                  x={70 + (i % 2) * 20} 
                  y={100 + i * 20} 
                  width={200 - i * 15} 
                  height="4" 
                  fill="hsl(207, 90%, 54%)" 
                  opacity="0.6"
                />
                <motion.rect
                  x={270 - i * 15}
                  y={100 + i * 20}
                  width="8"
                  height="4"
                  fill="hsl(207, 90%, 54%)"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              </motion.g>
            ))}
          </svg>
        </motion.div>

        {/* Scene 3: Data/Analytics */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: scene3Opacity }}
        >
          <svg viewBox="0 0 400 300" className="w-96 h-72 text-white/40">
            {/* Dashboard interface */}
            <rect x="50" y="50" width="300" height="200" rx="8" fill="currentColor" />
            {/* Charts and graphs */}
            <rect x="70" y="80" width="100" height="60" fill="hsl(207, 90%, 54%)" opacity="0.3" />
            <rect x="190" y="80" width="100" height="60" fill="hsl(207, 90%, 54%)" opacity="0.3" />
            {/* Animated bars */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.rect
                key={i}
                x={80 + i * 15}
                y={120}
                width="10"
                height="0"
                fill="hsl(207, 90%, 54%)"
                animate={{
                  height: [0, (i + 1) * 8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
            {/* Pie chart simulation */}
            <circle cx="240" cy="110" r="25" fill="none" stroke="hsl(207, 90%, 54%)" strokeWidth="8" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Scene 4: Team collaboration/Meeting */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: scene4Opacity }}
        >
          <svg viewBox="0 0 400 300" className="w-96 h-72 text-white/40">
            {/* Meeting room table */}
            <ellipse cx="200" cy="180" rx="120" ry="40" fill="currentColor" />
            {/* People silhouettes around table */}
            {[0, 1, 2, 3].map((i) => {
              const angle = (i * 90) * (Math.PI / 180);
              const x = 200 + Math.cos(angle) * 80;
              const y = 160 + Math.sin(angle) * 30;
              return (
                <motion.g key={i}>
                  <motion.circle 
                    cx={x} 
                    cy={y} 
                    r="12" 
                    fill="currentColor"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                  <rect x={x - 8} y={y + 8} width="16" height="20" rx="8" fill="currentColor" />
                </motion.g>
              );
            })}
            {/* Presentation screen */}
            <rect x="120" y="60" width="160" height="80" rx="4" fill="currentColor" />
            <rect x="125" y="65" width="150" height="70" fill="hsl(207, 90%, 54%)" opacity="0.3" />
          </svg>
        </motion.div>
      </div>

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
            <span className="text-glow">Impossible.</span>
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