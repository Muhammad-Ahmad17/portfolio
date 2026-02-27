import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronRight, BookOpen, TrendingUp, Search, Sparkles, ArrowRight, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { loadBlogPosts, type BlogPost } from "@/lib/blog";
import { useEffect, useState, useMemo } from "react";

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadBlogPosts().then(posts => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  const allTags = useMemo(() =>
    Array.from(new Set(blogPosts.flatMap(p => p.tags))).sort(),
    [blogPosts]
  );

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (selectedTag) {
      posts = posts.filter(p => p.tags.includes(selectedTag));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [blogPosts, selectedTag, searchQuery]);

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const recentPosts = filteredPosts.filter(post => post !== featuredPost);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-28 pb-16">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6 border border-primary/20"
              >
                <Sparkles className="w-4 h-4" />
                Blog & Articles
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
                Insights & Tutorials
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Exploring backend development, DevOps practices, and cloud architecture — one article at a time.
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-md mx-auto relative"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                />
              </motion.div>
            </motion.div>

            {/* Stats Row */}
            {!loading && blogPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-8 md:gap-12 mt-10"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{blogPosts.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="w-px h-12 bg-border/50" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{allTags.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Topics</div>
                </div>
                <div className="w-px h-12 bg-border/50" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {blogPosts.reduce((acc, p) => acc + getReadingTime(p.content), 0)}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">Min Read</div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tag Filters */}
          {!loading && allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by topic</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    !selectedTag
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary/20 border-t-primary"></div>
                <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
              </div>
              <p className="mt-6 text-muted-foreground">Loading articles...</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Featured Post */}
            {!loading && featuredPost && (
              <motion.div
                key={`featured-${featuredPost.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Featured Article</h2>
                </div>
                <Link to={`/blog/${featuredPost.slug}`}>
                  <Card className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden">
                    {/* Decorative gradient stripe */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40" />

                    <CardContent className="p-8 md:p-10">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-5">
                            <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/20">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(featuredPost.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {getReadingTime(featuredPost.content)} min read
                            </span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                            {featuredPost.title}
                          </h3>

                          <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                            {featuredPost.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {featuredPost.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-primary/10 text-primary/80 hover:bg-primary/20 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                            <span>Read Full Article</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        <div className="hidden md:flex md:w-56 items-center justify-center">
                          <div className="relative">
                            <div className="w-36 h-36 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300 rotate-3 group-hover:rotate-6">
                              <BookOpen className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-36 h-36 rounded-2xl border-2 border-primary/10 -rotate-3" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )}

            {/* Posts Grid */}
            {!loading && recentPosts.length > 0 && (
              <motion.div
                key={`posts-${selectedTag || "all"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {selectedTag ? `${selectedTag} Articles` : "All Articles"}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.4 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="block h-full">
                        <Card className="relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group h-full overflow-hidden">
                          {/* Top accent line */}
                          <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-full">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1 bg-muted/50 px-2.5 py-1 rounded-full">
                                <Clock className="w-3 h-3" />
                                {getReadingTime(post.content)} min
                              </span>
                            </div>

                            <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs bg-muted/60 hover:bg-muted transition-colors px-2 py-0.5"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 text-primary text-sm font-medium mt-auto pt-3 border-t border-border/30">
                              <span>Read Article</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!loading && filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery || selectedTag ? "No matching articles" : "No Articles Yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || selectedTag
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for new content!"}
              </p>
              {(searchQuery || selectedTag) && (
                <button
                  onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                  className="px-6 py-2 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          )}
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPage;
