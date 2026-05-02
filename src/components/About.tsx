import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code, Cloud, Lightbulb, Database, Microchip } from "lucide-react";

const serviceIcons = {
  code: Code,
  cloud: Cloud,
  database: Database,
  lightbulb: Lightbulb,
  chip: Microchip,
} as const;

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
          <span className="section-heading mb-4 block">{portfolioData.sections.about.eyebrow}</span>
          <h2 className="mb-6 text-4xl text-foreground md:text-5xl">{portfolioData.sections.about.title}</h2>
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
              <h3 className="text-xl text-foreground">{portfolioData.about.journeyTitle}</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{portfolioData.personal.bio}</p>
              <p>{portfolioData.about.secondaryBio}</p>
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
                    className="rounded-xl border border-border/50 bg-[#E5E0D8]/90 p-5 shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md dark:bg-card/90"
                  >
                    <div>
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 ring-1 ring-border/40 dark:bg-muted">
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
