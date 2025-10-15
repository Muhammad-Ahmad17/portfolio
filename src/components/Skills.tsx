import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { portfolioData } from "@/data/portfolio";
import { useEffect, useState } from "react";

interface ProcessInfo {
  pid: number;
  user: string;
  priority: number;
  nice: number;
  virt: string;
  res: string;
  shr: string;
  status: string;
  cpu: number;
  mem: number;
  time: string;
  command: string;
  category: string;
  color: string;
}

const skillCategories = [
  {
    title: "Frontend",
    skills: portfolioData.skills.frontend,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20"
  },
  {
    title: "Backend",
    skills: portfolioData.skills.backend,
    color: "text-green-400",
    bgColor: "bg-green-500/20"
  },
  {
    title: "DevOps",
    skills: portfolioData.skills.devops,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20"
  },
  {
    title: "Tools",
    skills: portfolioData.skills.tools,
    color: "text-pink-400",
    bgColor: "bg-pink-500/20"
  }
];

// Generate process list from skills
const generateProcesses = (): ProcessInfo[] => {
  let pid = 1000;
  const processes: ProcessInfo[] = [];

  skillCategories.forEach(category => {
    category.skills.forEach(skill => {
      processes.push({
        pid: pid++,
        user: "dev",
        priority: 20,
        nice: 0,
        virt: `${Math.floor(Math.random() * 500 + 100)}M`,
        res: `${Math.floor(Math.random() * 200 + 50)}M`,
        shr: `${Math.floor(Math.random() * 50 + 10)}M`,
        status: "R",
        cpu: skill.level,
        mem: skill.level / 2,
        time: `${Math.floor(Math.random() * 100)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        command: skill.name.toLowerCase().replace(/\s+/g, '-'),
        category: category.title,
        color: category.color
      });
    });
  });

  return processes.sort((a, b) => b.cpu - a.cpu);
};

export function Skills() {
  const [processes] = useState<ProcessInfo[]>(generateProcesses());
  const [uptime, setUptime] = useState({ days: 180, hours: 14, minutes: 22 });
  const [loadAvg] = useState({ one: 0.45, five: 0.38, fifteen: 0.32 });

  // Calculate total CPU and Memory usage
  const totalCpu = processes.reduce((sum, p) => sum + p.cpu, 0) / processes.length;
  const totalMem = processes.reduce((sum, p) => sum + p.mem, 0) / processes.length;

  return (
    <section id="skills" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* htop header */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-mono text-muted-foreground ml-2">
                htop - Interactive Process Viewer
              </span>
            </div>

            {/* System stats */}
            <div className="p-4 font-mono text-xs space-y-2 border-b border-border/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-16">CPU:</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Progress value={totalCpu} className="flex-1 h-3" />
                        <span className="text-cyan-400 w-12 text-right">{totalCpu.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-16">Memory:</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Progress value={totalMem} className="flex-1 h-3" />
                        <span className="text-green-400 w-12 text-right">{totalMem.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-muted-foreground">
                  <div>Tasks: <span className="text-foreground">{processes.length} total</span>, <span className="text-green-400">{processes.length} running</span></div>
                  <div>Load average: <span className="text-cyan-400">{loadAvg.one} {loadAvg.five} {loadAvg.fifteen}</span></div>
                  <div>Uptime: <span className="text-foreground">{uptime.days} days, {uptime.hours}:{String(uptime.minutes).padStart(2, '0')}</span></div>
                </div>
              </div>
            </div>

            {/* Process header */}
            <div className="px-4 py-2 bg-primary/10 font-mono text-xs grid grid-cols-12 gap-2 text-muted-foreground border-b border-border/30">
              <span className="col-span-1">PID</span>
              <span className="col-span-2">COMMAND</span>
              <span className="col-span-2 hidden md:block">CATEGORY</span>
              <span className="col-span-2">CPU%</span>
              <span className="col-span-2">MEM%</span>
              <span className="col-span-2 hidden lg:block">TIME+</span>
              <span className="col-span-1">S</span>
            </div>
          </div>
        </motion.div>

        {/* Process list */}
        <div className="space-y-1">
          {processes.map((process, index) => (
            <motion.div
              key={process.pid}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/30 backdrop-blur-sm border-border/30 hover:bg-card/50 hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-3 font-mono text-xs">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-1 text-muted-foreground">{process.pid}</span>
                    <span className={`col-span-2 ${process.color} font-semibold truncate`}>
                      {process.command}
                    </span>
                    <span className="col-span-2 text-muted-foreground text-xs hidden md:block">
                      {process.category}
                    </span>
                    <div className="col-span-2 flex items-center gap-2">
                      <Progress value={process.cpu} className="flex-1 h-2" />
                      <span className="text-cyan-400 w-10 text-right">{process.cpu}%</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Progress value={process.mem} className="flex-1 h-2" />
                      <span className="text-green-400 w-10 text-right">{process.mem.toFixed(1)}%</span>
                    </div>
                    <span className="col-span-2 text-muted-foreground hidden lg:block">
                      {process.time}
                    </span>
                    <span className={`col-span-1 text-center ${process.status === 'R' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {process.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* System summary at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="font-mono text-xs space-y-3">
                <div className="text-primary font-semibold text-sm mb-4">
                  $ cat /proc/skills_summary
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Total Processes:</div>
                    <div className="text-2xl font-bold text-cyan-400">{processes.length}</div>
                    <div className="text-xs text-muted-foreground">Active Technologies</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Avg Performance:</div>
                    <div className="text-2xl font-bold text-green-400">{totalCpu.toFixed(0)}%</div>
                    <div className="text-xs text-muted-foreground">Proficiency Level</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Experience:</div>
                    <div className="text-2xl font-bold text-orange-400">3+</div>
                    <div className="text-xs text-muted-foreground">Years in Production</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Projects:</div>
                    <div className="text-2xl font-bold text-pink-400">50+</div>
                    <div className="text-xs text-muted-foreground">Successfully Deployed</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30 text-muted-foreground">
                  <span className="text-primary">// </span>
                  Press F1 for help, F10 to quit. All processes running optimally.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}