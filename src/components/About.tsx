import { motion } from "framer-motion";
import { Code, Database, Cloud, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";

const features = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces with modern frameworks and libraries."
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Building robust server-side applications and RESTful APIs with secure data management."
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description: "Implementing CI/CD pipelines and cloud deployment strategies for scalable applications."
  },
  {
    icon: Wrench,
    title: "Problem Solving",
    description: "Analytical thinking and creative solutions to complex technical challenges."
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {portfolioData.personal.bio}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Personal info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  My Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I started my journey in computer engineering with a passion for creating 
                  digital solutions that make a difference. Over the years, I've developed 
                  expertise in the MERN stack and expanded into DevOps practices, always 
                  staying curious about emerging technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  What Drives Me
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I believe in writing clean, maintainable code and creating user experiences 
                  that are both beautiful and functional. My goal is to bridge the gap between 
                  complex technical requirements and intuitive user interfaces.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side - Features grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-elegant transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}