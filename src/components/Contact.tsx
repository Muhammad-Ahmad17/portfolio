import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { portfolioData } from "@/data/portfolio";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mailtoLink = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.open(mailtoLink, '_blank');

    toast({
      title: "Opening Email Client",
      description: "Your default email client should open with the message details.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`
    },
    {
      icon: Phone,
      label: "Phone",
      value: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone}`
    },
    {
      icon: MapPin,
      label: "Location",
      value: portfolioData.personal.location,
      href: null
    }
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-heading block mb-4">Connect</span>
          <h2 className="text-4xl md:text-5xl font-normal text-primary mb-8 uppercase">
            Let's Connect
          </h2>
          <div className="w-16 h-px bg-border mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            I'm always open to learning opportunities, collaboration, or just chatting about tech
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="icon-container">
                        <info.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{info.label}</div>
                        <div className="text-foreground group-hover:text-primary transition-colors">{info.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="icon-container">
                        <info.icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{info.label}</div>
                        <div className="text-foreground">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-border">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-4">
                Social
              </span>
              <div className="flex gap-4">
                <a 
                  href={portfolioData.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="icon-container hover:border-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </a>
                <a 
                  href={portfolioData.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="icon-container hover:border-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </a>
              </div>
            </div>

            {/* Response Note */}
            <div className="editorial-quote text-sm">
              I typically respond to all inquiries within 24 hours. Looking forward to hearing from you!
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="handcrafted-card">
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-foreground mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/80 border-border focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/80 border-border focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-background/80 border-border focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-background/80 border-border focus:border-foreground resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-editorial-primary"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
