import Navigation from "@/components/Navigation";
import ScrollAnimatedHero from "@/components/ScrollAnimatedHero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Scroll-based opacity and position transforms
  const sectionOpacity = useTransform(scrollY, [800, 1200], [0, 1]);
  const sectionY = useTransform(scrollY, [800, 1200], [50, 0]);
  return (
    <div className="min-h-screen bg-background smooth-scroll">
      {/* Dark themed background that extends through entire page */}
      <div className="fixed inset-0 dark-theme-bg -z-10">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="home-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(207, 90%, 54%)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid)" />
          </svg>
        </div>
      </div>
      
      <Navigation />
      <main className="relative z-10">
        <ScrollAnimatedHero />
        <Contact />
        {/* Next Steps Section */}
        <motion.section 
          ref={sectionRef}
          className="py-20 bg-black/90"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            opacity: sectionOpacity,
            y: sectionY 
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
                Next Steps
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your Journey Starts Here</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transform your business with enterprise-grade solutions designed for scale, security, and success.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-white mb-2">How long does a typical project take?</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Project timelines vary based on complexity, but we deliver 30% faster than industry average. 
                    Simple APIs take 2-4 weeks, while enterprise solutions take 3-6 months.
                  </p>
                  
                  <h4 className="font-semibold text-white mb-2">Do you work with international clients?</h4>
                  <p className="text-gray-300 text-sm">
                    Yes! We serve clients globally with proven experience across banking, government, 
                    and enterprise sectors in multiple countries.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">What happens after I submit this form?</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Within 24 hours, you'll receive a response with next steps, including a free 
                    consultation call to discuss your project in detail.
                  </p>
                  
                  <h4 className="font-semibold text-white mb-2">Can you work with our existing systems?</h4>
                  <p className="text-gray-300 text-sm">
                    Absolutely. We specialize in system integration and have extensive experience 
                    working with legacy systems, APIs, and enterprise platforms.
                  </p>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-white/10">
                <h4 className="text-xl font-bold text-white mb-4">Ready to Build Something Amazing?</h4>
                <p className="text-gray-300 mb-6">Join the growing list of enterprises that trust Kitji Studios for their critical software solutions.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 px-8"
                    onClick={() => {
                      window.open('mailto:support@kitjistudios.com?subject=Urgent Project Inquiry', '_blank');
                    }}
                  >
                    Emergency Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
