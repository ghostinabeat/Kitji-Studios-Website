import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle, Check, X, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .max(100, "Email is too long")
    .refine((email) => email.includes('.'), "Email must contain a domain"),
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long")
    .refine((company) => company.trim().length > 0, "Company name cannot be empty"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long (max 1000 characters)")
    .refine((msg) => msg.trim().length >= 10, "Message must contain meaningful content"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [fieldValidation, setFieldValidation] = useState<Record<string, 'idle' | 'validating' | 'valid' | 'invalid'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  // Real-time validation with debounce
  const watchedFields = form.watch();
  
  useEffect(() => {
    const timeouts: Record<string, NodeJS.Timeout> = {};
    
    Object.keys(watchedFields).forEach((fieldName) => {
      const fieldValue = watchedFields[fieldName as keyof ContactFormData];
      
      if (fieldValue && fieldValue.length > 0) {
        setFieldValidation(prev => ({ ...prev, [fieldName]: 'validating' }));
        
        timeouts[fieldName] = setTimeout(() => {
          try {
            const fieldSchema = contactSchema.shape[fieldName as keyof typeof contactSchema.shape];
            fieldSchema.parse(fieldValue);
            setFieldValidation(prev => ({ ...prev, [fieldName]: 'valid' }));
          } catch {
            setFieldValidation(prev => ({ ...prev, [fieldName]: 'invalid' }));
          }
        }, 300);
      } else {
        setFieldValidation(prev => ({ ...prev, [fieldName]: 'idle' }));
      }
    });
    
    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, [watchedFields]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: result.message || "We'll get back to you within 24 hours to discuss your project.",
        });
        form.reset();
        setFieldValidation({});
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact our sales team directly at sales@kitjistudios.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation icon component with animations
  const ValidationIcon = ({ fieldName }: { fieldName: string }) => {
    const status = fieldValidation[fieldName] || 'idle';
    
    return (
      <AnimatePresence mode="wait">
        {status !== 'idle' && (
          <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {status === 'validating' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
              />
            )}
            {status === 'valid' && (
              <Check className="w-4 h-4 text-green-500" />
            )}
            {status === 'invalid' && (
              <X className="w-4 h-4 text-red-500" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const projectTypes = [
    "Custom Software Development",
    "Utell - Web3 Trust Platform",
    "Pelas - Resource Management System",
    "Sales Management Software",
    "WhatsApp Business Integration",
    "System Design & Workflow Optimization",
    "Legacy System Modernization",
    "Business Intelligence & Analytics",
    "Web3/Blockchain Solution",
    "API Development",
    "System Integration",
    "Management Consulting",
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
      details: "support@kitjistudios.com",
      description: "General inquiries and support"
    },
    {
      icon: Phone,
      title: "WhatsApp Business",
      details: "+1 (246) 123-4567",
      description: "Instant messaging & voice calls"
    },
    {
      icon: MapPin,
      title: "Based in Barbados",
      details: "Serving clients globally",
      description: "Caribbean expertise, worldwide reach"
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
                          <FormLabel className="flex items-center gap-2">
                            Full Name *
                            {fieldValidation.name === 'valid' && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-xs text-green-600"
                              >
                                ✓ Looks good
                              </motion.span>
                            )}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="John Doe" 
                                {...field}
                                className={cn(
                                  "pr-10 transition-all duration-200",
                                  fieldValidation.name === 'valid' && "border-green-500 focus:border-green-600",
                                  fieldValidation.name === 'invalid' && "border-red-500 focus:border-red-600"
                                )}
                              />
                              <ValidationIcon fieldName="name" />
                            </div>
                          </FormControl>
                          <AnimatePresence>
                            {form.formState.errors.name && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FormMessage className="flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {form.formState.errors.name?.message}
                                </FormMessage>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Email Address *
                            {fieldValidation.email === 'valid' && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-xs text-green-600"
                              >
                                ✓ Valid email
                              </motion.span>
                            )}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="john@company.com" 
                                type="email"
                                {...field}
                                className={cn(
                                  "pr-10 transition-all duration-200",
                                  fieldValidation.email === 'valid' && "border-green-500 focus:border-green-600",
                                  fieldValidation.email === 'invalid' && "border-red-500 focus:border-red-600"
                                )}
                              />
                              <ValidationIcon fieldName="email" />
                            </div>
                          </FormControl>
                          <AnimatePresence>
                            {form.formState.errors.email && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FormMessage className="flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {form.formState.errors.email?.message}
                                </FormMessage>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Company Name *
                          {fieldValidation.company === 'valid' && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-xs text-green-600"
                            >
                              ✓ Company verified
                            </motion.span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="Your Company Inc." 
                              {...field}
                              className={cn(
                                "pr-10 transition-all duration-200",
                                fieldValidation.company === 'valid' && "border-green-500 focus:border-green-600",
                                fieldValidation.company === 'invalid' && "border-red-500 focus:border-red-600"
                              )}
                            />
                            <ValidationIcon fieldName="company" />
                          </div>
                        </FormControl>
                        <AnimatePresence>
                          {form.formState.errors.company && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FormMessage className="flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {form.formState.errors.company?.message}
                              </FormMessage>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                        <FormLabel className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            Project Details *
                            {fieldValidation.message === 'valid' && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-xs text-green-600"
                              >
                                ✓ Detailed description
                              </motion.span>
                            )}
                          </span>
                          <span className="text-xs text-gray-500">
                            {field.value?.length || 0}/1000
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea 
                              placeholder="Tell us about your project requirements, challenges, and goals..."
                              className={cn(
                                "min-h-[120px] transition-all duration-200",
                                fieldValidation.message === 'valid' && "border-green-500 focus:border-green-600",
                                fieldValidation.message === 'invalid' && "border-red-500 focus:border-red-600"
                              )}
                              {...field}
                            />
                            {fieldValidation.message && fieldValidation.message !== 'idle' && (
                              <div className="absolute top-3 right-3">
                                <ValidationIcon fieldName="message" />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <AnimatePresence>
                          {form.formState.errors.message && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FormMessage className="flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {form.formState.errors.message?.message}
                              </FormMessage>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </FormItem>
                    )}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full gradient-bg hover:opacity-90 text-white text-lg py-6 relative overflow-hidden"
                      disabled={isSubmitting || !form.formState.isValid}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.span
                            key="submitting"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending Message...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="send"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            Send Message
                            <ArrowRight className="h-5 w-5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-orange-300 text-orange-700 hover:bg-orange-100"
                  onClick={() => window.open('mailto:support@kitjistudios.com?subject=URGENT: Emergency Support Request&body=Please describe your emergency:', '_blank')}
                >
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