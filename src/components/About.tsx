import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { Code2, Server, Cloud, Wrench, Sparkles, Target } from "lucide-react";

interface Service {
  name: string;
  icon: typeof Code2;
  description: string;
  color: string;
  bgColor: string;
}

const services: Service[] = [
  {
    name: "Frontend Development",
    icon: Code2,
    description: "Building responsive and intuitive user interfaces with React, TypeScript, and modern UI libraries",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  },
  {
    name: "Backend Architecture",
    icon: Server,
    description: "Designing scalable APIs and microservices with Node.js, Express, and database optimization",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    description: "Automating deployments with Docker, Kubernetes, and AWS cloud infrastructure",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    name: "Problem Solving",
    icon: Wrench,
    description: "Analyzing complex challenges and implementing efficient, maintainable solutions",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

export function About() {

  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold">
              About Me
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Who I Am
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {portfolioData.personal.bio}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <service.icon className={`w-7 h-7 ${service.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${service.color}`}>
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Journey and Values */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/30 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">My Journey</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  <p>Started my journey in computer engineering with a passion for creating impactful digital solutions.</p>
                  <p>Developed deep expertise in full-stack development, specializing in the MERN stack and modern web technologies.</p>
                  <p>Expanded into DevOps practices, mastering cloud infrastructure and automated deployment pipelines.</p>
                  <p className="text-foreground font-medium">Continuously exploring emerging technologies to deliver innovative solutions.</p>
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
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/30 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">What Drives Me</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  <p>Writing clean, maintainable code that stands the test of time and scale.</p>
                  <p>Creating beautiful and functional user experiences that delight users.</p>
                  <p>Bridging technical complexity with intuitive interfaces that anyone can use.</p>
                  <p className="text-foreground font-medium">Solving real-world problems through elegant code solutions.</p>
                  <p className="flex items-center gap-2">
                    <span>Driven by curiosity, powered by dedication</span>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}