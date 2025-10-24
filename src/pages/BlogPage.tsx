import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, ChevronRight, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogPosts, loadBlogPosts, type BlogPost } from "@/lib/blog";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts().then(posts => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  const recentPosts = blogPosts.filter(post => post !== featuredPost);

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 text-center"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold">
                Blog & Articles
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Latest Insights & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing knowledge about backend development, DevOps, and cloud architecture
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading articles...</p>
            </div>
          )}

          {/* Featured Post */}
          {!loading && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Featured Article</h2>
              </div>
              <Link to={`/blog/${featuredPost.slug}`}>
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group overflow-hidden">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                            Featured
                          </Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(featuredPost.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-primary font-medium">
                          <span>Read Article</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      <div className="md:w-48 flex items-center justify-center">
                        <BookOpen className="w-32 h-32 text-primary/20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}

          {/* Recent Posts Grid */}
          {!loading && recentPosts.length > 0 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">All Articles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-muted hover:bg-muted/80 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-primary text-sm font-medium">
                            <span>Read More</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {!loading && blogPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-20"
            >
              <BookOpen className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Articles Yet</h3>
              <p className="text-muted-foreground">
                Check back soon for new content!
              </p>
            </motion.div>
          )}

          {/* Stats Footer */}
          {!loading && blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 inline-block">
                <CardContent className="p-6">
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-3xl font-bold text-primary">{blogPosts.length}</div>
                      <div className="text-sm text-muted-foreground">Articles</div>
                    </div>
                    <div className="w-px h-12 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        {Array.from(new Set(blogPosts.flatMap(p => p.tags))).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Topics</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPage;
