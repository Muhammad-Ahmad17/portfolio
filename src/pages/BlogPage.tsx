import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, FileText, Calendar, Tag, ChevronRight, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getBlogPosts } from "@/lib/blog";

const BlogPage = () => {
  const blogPosts = getBlogPosts();

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
          {/* Terminal Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="glass rounded-lg border-2 border-primary/30 overflow-hidden max-w-4xl mx-auto">
              {/* Terminal Title Bar */}
              <div className="bg-primary/10 px-4 py-2 flex items-center justify-between border-b border-primary/20">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-primary/70" />
                  </div>
                  <Terminal className="w-4 h-4 text-primary ml-2" />
                  <span className="text-xs font-mono text-muted-foreground">
                    ~/dev/blog
                  </span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm bg-code-bg">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-foreground">ls -la /blog/posts</span>
                  </div>
                  <div className="text-muted-foreground pl-2">
                    <span className="text-primary">total {blogPosts.length}</span> articles found
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-primary">$</span>
                    <span className="text-foreground">cat README.md</span>
                  </div>
                  <div className="text-muted-foreground pl-2 mt-2">
                    Backend development tutorials, DevOps guides, and system architecture insights.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Posts as File System */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
                <Folder className="w-4 h-4 text-primary" />
                <span className="text-primary">drwxr-xr-x</span>
                <span>muhammad</span>
                <span>muhammad</span>
                <span>{blogPosts.length} items</span>
                <span className="text-foreground">/home/dev/blog/posts</span>
              </div>
            </motion.div>

            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 10 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* File Icon */}
                          <div className="pt-1">
                            <FileText className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* File Name Style */}
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
                                {post.slug}.md
                              </h3>
                              <Badge variant="outline" className="text-xs border-primary/30 text-primary/70">
                                {post.date}
                              </Badge>
                            </div>

                            {/* Title as Comment */}
                            <div className="mb-3">
                              <span className="text-sm font-mono text-muted-foreground">
                                <span className="text-primary">#</span> {post.title}
                              </span>
                            </div>

                            {/* Excerpt */}
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>

                            {/* Tags as File Properties */}
                            <div className="flex flex-wrap gap-2 items-center">
                              <Tag className="w-3 h-3 text-muted-foreground" />
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-mono"
                                >
                                  {tag.toLowerCase()}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="pt-1">
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Terminal Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <div className="glass rounded-lg border border-primary/20 p-4 max-w-4xl mx-auto">
                <div className="font-mono text-sm space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary">$</span>
                    <span>echo "Found <span className="text-primary">{blogPosts.length}</span> blog posts"</span>
                  </div>
                  <div className="text-muted-foreground pl-4">
                    Last updated: {new Date().toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPage;
