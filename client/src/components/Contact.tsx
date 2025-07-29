import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours to discuss your project.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const projectTypes = [
    "Custom Software Development",
    "System Integration",
    "Business Intelligence",
    "Web3/Blockchain Solution",
    "API Development",
    "Legacy Modernization",
    "Consulting Services",
    "Other"
  ];

  const budgetRanges = [
    "$10k - $25k",
    "$25k - $50k",
    "$50k - $100k",
    "$100k - $250k",
    "$250k+",
    "Not Sure - Need Consultation"
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@kitjistudios.com",
      description: "Get a response within 24 hours"
    },
    {
      icon: Phone,
      title: "Schedule a Call",
      details: "Free 30-minute consultation",
      description: "Discuss your project requirements"
    },
    {
      icon: MapPin,
      title: "Global Reach",
      details: "Serving clients worldwide",
      description: "Remote-first with local expertise"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "24-hour guarantee",
      description: "We respect your time"
    }
  ];

  const benefits = [
    "Free initial consultation and project scoping",
    "No upfront costs or hidden fees",
    "Enterprise-grade security and compliance",
    "Ongoing support and maintenance included",
    "30% faster delivery than industry average",
    "100% satisfaction guarantee"
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Get Started
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss your project and see how we can build a custom solution that drives real results for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Start Your Project</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="john@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project requirements, challenges, and goals..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full gradient-bg hover:opacity-90 text-white text-lg py-6"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information & Benefits */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="bg-gray-50 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                          <p className="text-primary font-medium text-sm mb-1">{info.details}</p>
                          <p className="text-gray-600 text-xs">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Benefits */}
            <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-0">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold mb-6">What You Get With Kitji Studios</h4>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                  <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  Need Urgent Support?
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  For existing clients with critical issues, we offer 24/7 emergency support.
                </p>
                <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How long does a typical project take?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Project timelines vary based on complexity, but we deliver 30% faster than industry average. 
                Simple APIs take 2-4 weeks, while enterprise solutions take 3-6 months.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Do you work with international clients?</h4>
              <p className="text-gray-600 text-sm">
                Yes! We serve clients globally with proven experience across banking, government, 
                and enterprise sectors in multiple countries.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What happens after I submit this form?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Within 24 hours, you'll receive a response with next steps, including a free 
                consultation call to discuss your project in detail.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Can you work with our existing systems?</h4>
              <p className="text-gray-600 text-sm">
                Absolutely. We specialize in system integration and have extensive experience 
                working with legacy systems, APIs, and enterprise platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}