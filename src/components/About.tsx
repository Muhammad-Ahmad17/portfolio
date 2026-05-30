import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code, Cloud, Lightbulb, Database, Microchip, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceIcons = {
  code: Code,
  cloud: Cloud,
  database: Database,
  lightbulb: Lightbulb,
  chip: Microchip,
} as const;

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-heading mb-4 block">{portfolioData.sections.about.eyebrow}</span>
          <h2 className="mb-6 text-4xl text-primary md:text-5xl uppercase">
            {portfolioData.sections.about.title}
          </h2>
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
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
                {portfolioData.personal.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <h3 className="text-xl text-foreground">{portfolioData.about.journeyTitle}</h3>
                <div className="text-sm text-muted-foreground">{portfolioData.personal.title}</div>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{portfolioData.personal.bio}</p>
              <p>{portfolioData.about.secondaryBio}</p>
            </div>

            <div className="mt-6">
              <Button asChild className="btn-soft">
                <a href={`mailto:${portfolioData.personal.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>

            {/* Quote */}
            <blockquote className="mt-8 editorial-quote">
              "{portfolioData.about.quote}"
            </blockquote>
          </motion.div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.services.map((service, index) => {
                const Icon = serviceIcons[service.icon];
                return (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <div>
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-muted/40">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <h4 className="mb-2 text-base text-foreground">{service.name}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-border/40 pt-12"
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="graphic-container">
              <img src="/graphics/appple-on-book.png" alt="" className="graphic-icon" />
            </div>
            <h3 className="text-xl text-foreground">{portfolioData.sections.about.valuesTitle}</h3>
          </div>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {portfolioData.about.coreValues.map((value) => (
              <div key={value.title}>
                <div className="mb-2 text-lg text-foreground">{value.title}</div>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
