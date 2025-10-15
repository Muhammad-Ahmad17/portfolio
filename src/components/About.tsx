import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { useEffect, useState } from "react";

interface ServiceStatus {
  name: string;
  status: "active" | "running" | "loaded";
  uptime: string;
  memory: string;
  description: string;
  icon: string;
  color: string;
}

const services: ServiceStatus[] = [
  {
    name: "frontend.service",
    status: "active",
    uptime: "6 months 12 days",
    memory: "128M",
    description: "React/TypeScript UI service with modern component architecture",
    icon: "⚛️",
    color: "text-cyan-400"
  },
  {
    name: "api-backend.service",
    status: "running",
    uptime: "180 days",
    memory: "512M",
    description: "Node.js Express REST API with PostgreSQL and Redis integration",
    icon: "🟢",
    color: "text-green-400"
  },
  {
    name: "devops-pipeline.service",
    status: "active",
    uptime: "8 months 3 days",
    memory: "256M",
    description: "Docker/Kubernetes CI/CD automation with GitHub Actions",
    icon: "🐳",
    color: "text-blue-400"
  },
  {
    name: "problem-solver.service",
    status: "loaded",
    uptime: "∞",
    memory: "∞",
    description: "Analytical debugging and optimization algorithms",
    icon: "🔧",
    color: "text-yellow-400"
  }
];

export function About() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logLines = [
      `[${new Date().toISOString()}] INFO: System initialization started...`,
      `[${new Date().toISOString()}] INFO: Loading developer profile: ${portfolioData.personal.name}`,
      `[${new Date().toISOString()}] SUCCESS: All services initialized successfully`,
      `[${new Date().toISOString()}] INFO: System running at optimal capacity`
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logLines.length) {
        setLogs(prev => [...prev, logLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Terminal header with systemctl status */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-mono text-muted-foreground ml-2">
                systemctl status developer.service
              </span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="space-y-2">
                <div className="text-green-400">● developer.service - {portfolioData.personal.name}</div>
                <div className="text-muted-foreground ml-4">
                  Loaded: <span className="text-foreground">loaded</span> (/etc/systemd/system/developer.service; enabled)
                </div>
                <div className="text-muted-foreground ml-4">
                  Active: <span className="text-green-400">active (running)</span> since {new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="text-muted-foreground ml-4">
                  Main PID: <span className="text-foreground">1337</span> (developer)
                </div>
                <div className="text-muted-foreground ml-4">
                  Memory: <span className="text-cyan-400">896.0M</span>
                </div>
                <div className="text-muted-foreground ml-4">
                  CPU: <span className="text-cyan-400">2h 45min 38s</span>
                </div>
              </div>

              <div className="mt-6 space-y-1 text-muted-foreground">
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-primary">$</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
            <span className="text-primary">// </span>
            {portfolioData.personal.bio}
          </p>
        </motion.div>

        {/* Service Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 font-mono text-sm">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">{service.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-semibold ${service.color}`}>
                          {service.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                          {service.status}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-xs space-y-1">
                        <div className="flex justify-between">
                          <span>Uptime:</span>
                          <span className="text-foreground">{service.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Memory:</span>
                          <span className="text-cyan-400">{service.memory}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4 text-xs text-muted-foreground">
                    <span className="text-primary"># </span>
                    {service.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Journey and Drive as server logs */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-colors h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground font-mono flex items-center gap-2">
                  <span className="text-primary">$</span> cat journey.log
                </h3>
                <div className="font-mono text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <p><span className="text-cyan-400">[INFO]</span> Started journey in computer engineering</p>
                  <p><span className="text-green-400">[SUCCESS]</span> Developed expertise in MERN stack</p>
                  <p><span className="text-blue-400">[UPDATE]</span> Expanded into DevOps practices</p>
                  <p><span className="text-yellow-400">[ACTIVE]</span> Continuously exploring emerging technologies</p>
                  <p className="text-foreground pt-2">Creating digital solutions with impact and purpose.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-colors h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground font-mono flex items-center gap-2">
                  <span className="text-primary">$</span> tail -f motivation.log
                </h3>
                <div className="font-mono text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <p><span className="text-primary">[CORE]</span> Clean, maintainable code architecture</p>
                  <p><span className="text-green-400">[GOAL]</span> Beautiful & functional user experiences</p>
                  <p><span className="text-cyan-400">[MISSION]</span> Bridging technical complexity with intuitive UI</p>
                  <p><span className="text-yellow-400">[PASSION]</span> Solving real-world problems through code</p>
                  <p className="text-foreground pt-2">Driven by curiosity, powered by caffeine ☕</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}