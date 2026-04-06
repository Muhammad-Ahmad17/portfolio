import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { Code2, Server, Cloud, Wrench, Target, Sparkles } from "lucide-react";

const iconMap = {
  "Backend Development": Server,
  "DevOps Learning": Cloud,
  "Database Design": Code2,
  "Problem Solving": Wrench
};

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
          {portfolioData.services.map((service, index) => {
            const IconComponent = iconMap[service.name as keyof typeof iconMap];
            return (
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
                        <IconComponent className={`w-7 h-7 ${service.color}`} />
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
            );
          })}
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
                  <p>Started learning programming in my first semester with C and C++, which sparked my interest in software development.</p>
                  <p>Currently building projects with the MERN stack to understand full-stack development and improve my coding skills.</p>
                  <p>Recently started exploring DevOps tools like Docker and GitHub Actions to learn about deployment and automation.</p>
                  <p className="text-foreground font-medium">Every day I'm learning something new and working to become a better software engineer.</p>
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
                  <p>Learning to write clean, readable code that follows best practices and industry standards.</p>
                  <p>Trying to understand user needs and build features that solve real problems.</p>
                  <p>Breaking down complex concepts into simple solutions through practice and iteration.</p>
                  <p className="text-foreground font-medium">Excited about learning new technologies and improving my problem-solving skills.</p>
                  <p className="flex items-center gap-2">
                    <span>Passionate about learning, committed to growth</span>
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