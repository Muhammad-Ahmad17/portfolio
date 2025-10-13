import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        <Projects />
      </motion.main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
