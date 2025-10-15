import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Terminal, CheckCircle } from "lucide-react";
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
  const [responseLog, setResponseLog] = useState<string[]>([]);
  const [showResponse, setShowResponse] = useState(false);
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
    setShowResponse(true);
    setResponseLog([]);

    // Simulate API call with logs
    const logs = [
      `$ curl -X POST https://api.portfolio.dev/contact \\`,
      `  -H "Content-Type: application/json" \\`,
      `  -d '${JSON.stringify(formData, null, 2)}'`,
      ``,
      `[${new Date().toISOString()}] Establishing connection...`,
      `[${new Date().toISOString()}] TLS handshake completed`,
      `[${new Date().toISOString()}] Sending request...`,
    ];

    // Show logs progressively
    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setResponseLog(prev => [...prev, logs[i]]);
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    const successLogs = [
      `[${new Date().toISOString()}] Response received: 200 OK`,
      `{`,
      `  "status": "success",`,
      `  "message": "Message sent successfully",`,
      `  "data": {`,
      `    "messageId": "${Math.random().toString(36).substr(2, 9)}",`,
      `    "timestamp": "${new Date().toISOString()}"`,
      `  }`,
      `}`,
    ];

    for (const log of successLogs) {
      setResponseLog(prev => [...prev, log]);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });

    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
      setShowResponse(false);
    }, 3000);
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: portfolioData.social.github,
      username: "github.com/" + portfolioData.social.github.split('/').pop()
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: portfolioData.social.linkedin,
      username: "linkedin.com/in/" + portfolioData.social.linkedin.split('/').pop()
    },
    // {
    //   icon: Twitter,
    //   label: "Twitter",
    //   href: portfolioData.social.twitter,
    //   username: "twitter.com/" + portfolioData.social.twitter.split('/').pop()
    // }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Terminal header */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-mono text-muted-foreground ml-2">
                POST /api/contact - REST API Endpoint
              </span>
            </div>
            <div className="p-6 font-mono text-xs space-y-2">
              <div className="text-primary font-semibold">
                $ curl -X POST https://api.portfolio.dev/contact
              </div>
              <div className="text-muted-foreground space-y-1">
                <div><span className="text-cyan-400">Endpoint:</span> /api/contact</div>
                <div><span className="text-green-400">Method:</span> POST</div>
                <div><span className="text-orange-400">Content-Type:</span> application/json</div>
                <div><span className="text-blue-400">Authentication:</span> Not required</div>
              </div>
              <div className="pt-2 text-muted-foreground">
                Send a message via REST API or connect through social channels
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Info - Server Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="font-mono text-xs space-y-4">
                  <div className="text-primary font-semibold text-sm mb-4">
                    $ cat /etc/contact/server.conf
                  </div>

                  <div className="space-y-3">
                    <div className="bg-muted/20 rounded p-3 space-y-1.5">
                      <div className="text-cyan-400 font-semibold">## Email Server</div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">SMTP_USER=</span>
                        <a href={`mailto:${portfolioData.personal.email}`} className="text-primary hover:underline">
                          {portfolioData.personal.email}
                        </a>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">SMTP_PORT=</span>587
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">TLS_ENABLED=</span>true
                      </div>
                    </div>

                    <div className="bg-muted/20 rounded p-3 space-y-1.5">
                      <div className="text-green-400 font-semibold">## Phone Gateway</div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">TEL_NUMBER=</span>
                        <a href={`tel:${portfolioData.personal.phone}`} className="text-primary hover:underline">
                          {portfolioData.personal.phone}
                        </a>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">TIMEZONE=</span>UTC+0
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">AVAILABLE=</span>24/7
                      </div>
                    </div>

                    <div className="bg-muted/20 rounded p-3 space-y-1.5">
                      <div className="text-orange-400 font-semibold">## Location</div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">GEO_LOCATION=</span>{portfolioData.personal.location}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">REMOTE_WORK=</span>enabled
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links - Network Connections */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="font-mono text-xs space-y-3">
                  <div className="text-primary font-semibold text-sm">
                    $ netstat -an | grep ESTABLISHED
                  </div>
                  <div className="space-y-2">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-muted/20 hover:bg-muted/30 rounded p-3 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <social.icon className="w-4 h-4 text-primary" />
                            <div>
                              <div className="text-foreground font-semibold">{social.label}</div>
                              <div className="text-muted-foreground text-xs">{social.username}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-xs">LIVE</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form - curl POST */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <div className="bg-muted/50 px-4 py-2 border-b border-border/50 font-mono text-xs text-muted-foreground">
                $ vim /tmp/message.json
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="font-mono text-xs space-y-4">
                    {/* JSON-like form */}
                    <div className="text-muted-foreground">
                      <span className="text-foreground">{'{'}</span>
                    </div>

                    <div className="ml-4 space-y-3">
                      <div>
                        <label className="text-cyan-400">"from_name":</label>
                        <Input
                          name="name"
                          placeholder='"John Doe"'
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-1 bg-background/50 border-border/50 focus:border-primary font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-green-400">"from_email":</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder='"john@example.com"'
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1 bg-background/50 border-border/50 focus:border-primary font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-orange-400">"subject":</label>
                        <Input
                          name="subject"
                          placeholder='"Project Inquiry"'
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="mt-1 bg-background/50 border-border/50 focus:border-primary font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-blue-400">"message":</label>
                        <Textarea
                          name="message"
                          placeholder='"Your message here..."'
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="mt-1 bg-background/50 border-border/50 focus:border-primary resize-none font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="text-muted-foreground">
                      <span className="text-foreground">{'}'}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                  >
                    {isSubmitting ? (
                      <span className="text-xs">$ Sending... please wait</span>
                    ) : (
                      <>
                        <Terminal className="w-4 h-4 mr-2" />
                        <span className="text-xs">$ curl -X POST /api/contact</span>
                      </>
                    )}
                  </Button>
                </form>

                {/* Response Log */}
                {showResponse && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 bg-background/80 rounded p-4 border border-border/50 overflow-hidden"
                  >
                    <div className="font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                      {responseLog.map((log, index) => (
                        <div
                          key={index}
                          className={
                            log.includes('200 OK') ? 'text-green-400' :
                              log.includes('success') ? 'text-cyan-400' :
                                log.includes('$') ? 'text-primary' :
                                  log.includes('{') || log.includes('}') ? 'text-orange-400' :
                                    'text-muted-foreground'
                          }
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}