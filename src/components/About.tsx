import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code, Cloud, Lightbulb, Cpu } from "lucide-react";

const services = [
  { name: "Backend Development", icon: Code, description: "Building robust server-side applications with Node.js, Express, and REST APIs" },
  { name: "Edge GPU Deployment", icon: Cpu, description: "Working with Jetson Nano for edge computing, GPU acceleration, and embedded AI applications" },
  { name: "DevOps Learning", icon: Cloud, description: "Exploring Docker, CI/CD pipelines, and cloud deployment practices" },
  { name: "Problem Solving", icon: Lightbulb, description: "Breaking down complex problems into elegant, maintainable solutions" }
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-15" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-heading block mb-4">About</span>
          <h2 className="text-4xl md:text-5xl text-foreground mb-6">Who I Am</h2>
          <div className="w-12 h-px bg-border/50 mx-auto" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="graphic-container">
                <img src="/graphics/graduation-cap.png" alt="" className="graphic-icon" />
              </div>
              <h3 className="text-xl text-foreground">My Journey</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{portfolioData.personal.bio}</p>
              <p>Started with C/C++ in my first semester, now building full-stack applications with the MERN stack and exploring DevOps practices.</p>
            </div>
            
            {/* Quote */}
            <blockquote className="mt-8 pl-6 border-l-2 border-primary/30 italic text-muted-foreground">
              "Every day brings a new opportunity to learn and grow as a developer."
            </blockquote>
          </motion.div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-lg bg-[#E5E0D8] dark:bg-card"
                >
                  <div className="w-10 h-10 rounded-full bg-background dark:bg-muted flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="text-base text-foreground mb-2">{service.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-border/40"
        >
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="graphic-container">
              <img src="/graphics/appple-on-book.png" alt="" className="graphic-icon" />
            </div>
            <h3 className="text-xl text-foreground">Core Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {["Clean Code", "Continuous Learning", "User-Focused"].map((value, i) => (
              <div key={value}>
                <div className="text-lg text-foreground mb-2">{value}</div>
                <p className="text-sm text-muted-foreground">
                  {i === 0 && "Writing readable, maintainable code that follows best practices"}
                  {i === 1 && "Always exploring new technologies and improving my skills"}
                  {i === 2 && "Building features that solve real problems for users"}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}