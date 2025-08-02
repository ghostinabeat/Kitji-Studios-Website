import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Calendar, Users, Zap, Shield, Globe, BarChart3, Smartphone, Coins, Database, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  features: string[];
  timeline: string;
  teamSize: string;
  status: 'Live' | 'In Development' | 'Completed';
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
  metrics?: {
    users?: string;
    performance?: string;
    uptime?: string;
  };
}

const projects: Project[] = [
  {
    id: "utell",
    title: "Utell - Web3 Trust Platform",
    description: "Decentralized trust platform with IAAM (Identity, Authentication, Authorization & Management) capabilities for secure data transactions.",
    longDescription: "Utell is Kitji Studios' flagship Web3 platform that revolutionizes trust verification through blockchain technology. Built with advanced smart contract capabilities and IAAM integration, it provides enterprise-grade security for decentralized identity management and secure data transactions.",
    category: "Web3/Blockchain",
    technologies: ["Solidity", "Ethereum", "React", "Node.js", "IPFS", "MetaMask"],
    features: [
      "Decentralized identity verification",
      "Smart contract automation", 
      "IAAM integration",
      "Cross-chain compatibility",
      "Zero-knowledge proofs",
      "Enterprise security protocols"
    ],
    timeline: "18 months",
    teamSize: "8 developers",
    status: "Live",
    image: "/api/placeholder/600/400",
    demoUrl: "https://utell.kitjistudios.com",
    icon: Coins,
    metrics: {
      users: "10K+ verified identities",
      performance: "99.9% uptime",
      uptime: "Enterprise-grade"
    }
  },
  {
    id: "pelas",
    title: "Pelas - Resource Management System",
    description: "Personalized Electronic Ledger Accounting System for comprehensive resource management and financial tracking.",
    longDescription: "Pelas is an intelligent resource management platform that combines advanced accounting principles with modern technology. Designed for businesses of all sizes, it provides real-time financial insights, automated reporting, and comprehensive resource allocation tracking.",
    category: "Enterprise Software",
    technologies: ["Python", "Django", "PostgreSQL", "React", "D3.js", "Redis"],
    features: [
      "Real-time financial tracking",
      "Automated expense categorization",
      "Advanced reporting dashboard",
      "Multi-currency support",
      "Audit trail management",
      "API integrations"
    ],
    timeline: "12 months",
    teamSize: "6 developers",
    status: "Live",
    image: "/api/placeholder/600/400",
    demoUrl: "https://pelas.kitjistudios.com",
    icon: BarChart3,
    metrics: {
      users: "500+ businesses",
      performance: "Sub-second response",
      uptime: "99.8% availability"
    }
  },
  {
    id: "whatsapp-bsp",
    title: "WhatsApp Business Integration",
    description: "Official WhatsApp Business Service Provider certified solutions for enterprise communication.",
    longDescription: "As an official WhatsApp Business Service Provider, Kitji Studios delivers enterprise-grade messaging solutions. Our platform enables businesses to integrate WhatsApp messaging into their existing workflows with advanced automation, analytics, and compliance features.",
    category: "Communication Platform",
    technologies: ["Node.js", "WhatsApp Business API", "MongoDB", "React", "Socket.io", "AWS"],
    features: [
      "Official BSP certification",
      "Automated message routing",
      "Rich media support",
      "Analytics dashboard",
      "CRM integration",
      "Compliance management"
    ],
    timeline: "8 months",
    teamSize: "5 developers",
    status: "Live",
    image: "/api/placeholder/600/400",
    icon: Smartphone,
    metrics: {
      users: "100+ enterprise clients",
      performance: "1M+ messages/day",
      uptime: "99.95% delivery rate"
    }
  },
  {
    id: "sales-management",
    title: "Cloud-based Sales Management",
    description: "Comprehensive CRM solution with advanced pipeline management, analytics, and team collaboration features.",
    longDescription: "Our cloud-based sales management platform streamlines the entire sales process from lead generation to deal closure. Built with modern microservices architecture, it provides real-time insights, automated workflows, and seamless integration capabilities.",
    category: "CRM/Sales",
    technologies: ["Node.js", "MongoDB", "React", "AWS", "GraphQL", "Docker"],
    features: [
      "Advanced pipeline management",
      "Automated lead scoring",
      "Real-time analytics",
      "Team collaboration tools",
      "Email automation",
      "Mobile-first design"
    ],
    timeline: "10 months",
    teamSize: "7 developers", 
    status: "Live",
    image: "/api/placeholder/600/400",
    icon: Users,
    metrics: {
      users: "200+ sales teams",
      performance: "40% faster deals",
      uptime: "Increased conversion"
    }
  },
  {
    id: "banking-platform",
    title: "Digital Banking Infrastructure",
    description: "Secure digital banking platform for Caribbean financial institutions with regulatory compliance.",
    longDescription: "A comprehensive digital banking solution designed specifically for Caribbean financial institutions. The platform provides core banking functionality, regulatory compliance, and modern customer experience while meeting strict security and compliance requirements.",
    category: "FinTech",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "React", "Kubernetes", "AWS"],
    features: [
      "Core banking operations",
      "Regulatory compliance",
      "Multi-currency support",
      "Real-time transactions",
      "Advanced security",
      "Mobile banking app"
    ],
    timeline: "24 months",
    teamSize: "12 developers",
    status: "Completed",
    image: "/api/placeholder/600/400",
    icon: Shield,
    metrics: {
      users: "50K+ customers",
      performance: "PCI DSS compliant",
      uptime: "24/7 operations"
    }
  },
  {
    id: "iot-dashboard",
    title: "IoT Analytics Dashboard",
    description: "Real-time IoT data visualization and analytics platform for industrial monitoring and control.",
    longDescription: "An enterprise IoT analytics platform that processes millions of sensor data points in real-time. Built for industrial applications, it provides predictive analytics, automated alerts, and comprehensive reporting for operational efficiency.",
    category: "IoT/Analytics",
    technologies: ["Python", "InfluxDB", "Grafana", "React", "MQTT", "Kubernetes"],
    features: [
      "Real-time data processing",
      "Predictive analytics",
      "Custom dashboards",
      "Automated alerts",
      "Historical reporting",
      "API integrations"
    ],
    timeline: "14 months",
    teamSize: "6 developers",
    status: "Completed",
    image: "/api/placeholder/600/400",
    icon: Database,
    metrics: {
      users: "10+ industrial clients",
      performance: "1M+ data points/sec",
      uptime: "Real-time processing"
    }
  }
];

const categories = [
  "All Projects",
  "Web3/Blockchain", 
  "Enterprise Software",
  "Communication Platform",
  "CRM/Sales",
  "FinTech",
  "IoT/Analytics"
];

const statusColors = {
  "Live": "bg-green-100 text-green-800 border-green-200",
  "In Development": "bg-blue-100 text-blue-800 border-blue-200", 
  "Completed": "bg-gray-100 text-gray-800 border-gray-200"
};

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All Projects" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-black/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Our Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Project Showcase
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of successful projects across Web3, enterprise software, and digital platforms.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "transition-all duration-300",
                selectedCategory === category && "bg-primary text-white"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  className="group"
                >
                  <Card className="h-full hover:bg-white/10 transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-primary" />
                      </div>
                      <Badge 
                        className={cn("absolute top-3 right-3", statusColors[project.status])}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        
                        <Badge variant="outline" className="mb-3 text-xs border-primary/30 text-primary">
                          {project.category}
                        </Badge>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Key Metrics */}
                        {project.metrics && (
                          <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                            {project.metrics.users && (
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-gray-300">{project.metrics.users}</span>
                              </div>
                            )}
                            {project.metrics.performance && (
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" />
                                <span className="text-gray-300">{project.metrics.performance}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">
                              +{project.technologies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          className="flex-1"
                        >
                          View Details
                        </Button>
                        {project.demoUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(project.demoUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedProject.title}
                      </h2>
                      <Badge variant="outline" className="mb-4">
                        {selectedProject.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </Button>
                  </div>

                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Project Info */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">Timeline: {selectedProject.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">Team: {selectedProject.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-primary" />
                          <Badge className={statusColors[selectedProject.status]}>
                            {selectedProject.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Technologies */}
                      <h4 className="text-lg font-semibold mt-6 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Metrics */}
                      {selectedProject.metrics && (
                        <>
                          <h4 className="text-lg font-semibold mt-6 mb-3">Project Impact</h4>
                          <div className="space-y-2">
                            {Object.entries(selectedProject.metrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8 pt-6 border-t">
                    {selectedProject.demoUrl && (
                      <Button
                        onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live Project
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}