import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Terminal, Server, Database, FileCode, GitBranch, Cpu } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Hero() {
  const navigate = useNavigate();
  const [displayedTitle, setDisplayedTitle] = useState("");
  const fullTitle = portfolioData.personal.title;
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const commands = [
      "$ whoami",
      "> backend_developer",
      "$ cat /etc/skills.conf",
      "> Node.js | Python | PostgreSQL | Docker",
      "$ systemctl status projects",
      "> active (running) - 24+ projects deployed",
      "$ uptime",
      "> system operational - 99.9% uptime"
    ];

    let lineIndex = 0;
    const terminalInterval = setInterval(() => {
      if (lineIndex < commands.length) {
        setTerminalLines(prev => [...prev, commands[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(terminalInterval);
      }
    }, 400);

    return () => clearInterval(terminalInterval);
  }, []);

  const techStack = [
    { icon: Server, label: "Node.js", delay: 0 },
    { icon: Database, label: "PostgreSQL", delay: 0.1 },
    { icon: FileCode, label: "Python", delay: 0.2 },
    { icon: GitBranch, label: "Git", delay: 0.3 },
    { icon: Cpu, label: "Docker", delay: 0.4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Enhanced Background with visible patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Linux file tree decoration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-4 top-1/4 hidden lg:block text-xs font-mono text-muted-foreground/40 leading-relaxed"
      >
        <div>├── src/</div>
        <div>│   ├── api/</div>
        <div>│   ├── models/</div>
        <div>│   └── controllers/</div>
        <div>├── docker/</div>
        <div>├── scripts/</div>
        <div>└── .env</div>
      </motion.div>

      {/* System info decoration */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute right-4 top-1/4 hidden lg:block text-xs font-mono text-muted-foreground/40 leading-relaxed"
      >
        <div>System: Linux 5.15.0</div>
        <div>Shell: zsh 5.8</div>
        <div>Memory: 16GB</div>
        <div>CPU: 8 cores</div>
        <div>Uptime: 365 days</div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main terminal window */}
            <div className="glass rounded-lg border-2 border-primary/30 shadow-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="bg-primary/10 px-4 py-2 flex items-center space-x-2 border-b border-primary/20">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-4">
                  muhammad@devmachine: ~
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm space-y-1 bg-code-bg min-h-[320px]">
                {terminalLines.filter(line => line != null).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={line.startsWith('$') ? 'text-primary font-semibold' :
                      line.startsWith('>') ? 'text-foreground/80 pl-2' :
                        'text-muted-foreground'}
                  >
                    {line}
                  </motion.div>
                ))}
                {terminalLines.length > 0 && (
                  <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                )}
              </div>
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + tech.delay, duration: 0.4 }}
                  className="glass rounded-lg px-4 py-2 flex items-center space-x-2 border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <tech.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-foreground">{tech.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main heading with command-line style */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <p className="text-sm font-mono text-muted-foreground">
                  <span className="text-primary">~</span> /home/developer
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-primary font-mono"># </span>
                  {portfolioData.personal.name}
                </h1>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Role:
                </p>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-foreground">
                  {displayedTitle}
                  <span className="inline-block w-0.5 h-6 sm:h-8 bg-primary animate-pulse ml-1" />
                </div>
              </motion.div>
            </div>

            {/* Description with code comment style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <div className="flex items-start space-x-2">
                <span className="text-primary font-mono text-sm mt-1">/*</span>
                <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">
                  {portfolioData.personal.bio}
                </p>
              </div>
              <span className="text-primary font-mono text-sm">*/</span>
            </motion.div>

            {/* CTA Buttons with command style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/projects")}
                  className="group relative overflow-hidden bg-primary text-primary-foreground hover:shadow-glow transition-all duration-300 font-mono"
                >
                  <Terminal className="mr-2 w-5 h-5" />
                  <span className="relative z-10">./view_projects.sh</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/contact")}
                  className="group border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 font-mono"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  <span>contact --now</span>
                </Button>
              </div>
            </motion.div>

            {/* Social Links with Linux style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="space-y-3"
            >
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                $ ls -la /social/
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg"
                >
                  <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg"
                >
                  <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg"
                >
                  <a href={`mailto:${portfolioData.personal.email}`}>
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
