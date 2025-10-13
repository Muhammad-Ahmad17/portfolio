import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock blog data - will be replaced with actual markdown files
const blogPosts = [
  {
    id: "react-best-practices",
    title: "React Best Practices in 2025",
    description: "Essential patterns and practices for modern React development",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Web Development"],
    slug: "react-best-practices"
  },
  {
    id: "devops-cicd",
    title: "CI/CD Pipeline with GitHub Actions",
    description: "Building automated deployment pipelines for modern web apps",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["DevOps", "CI/CD", "GitHub Actions"],
    slug: "devops-cicd"
  },
  {
    id: "mern-stack-guide",
    title: "Complete MERN Stack Guide",
    description: "Building full-stack applications with MongoDB, Express, React, and Node.js",
    date: "2025-01-05",
    readTime: "15 min read",
    tags: ["MERN", "Full Stack", "MongoDB"],
    slug: "mern-stack-guide"
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-20"
      >
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Tech Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Thoughts, tutorials, and insights on modern web development, DevOps, and software engineering
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      asChild
                      variant="ghost" 
                      className="w-full group hover:bg-primary/10"
                    >
                      <Link to={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPage;
