import { Navbar } from "@/components/Navbar";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const ExperiencePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-4"
      >
        <Experience />
      </motion.main>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
