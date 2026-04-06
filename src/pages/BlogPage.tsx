import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronRight, BookOpen, Search, ArrowRight, Hash } from "lucide-react";
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
        {/* Compact Header */}
        <section className="pt-20 pb-10 bg-background">
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <span className="section-heading block mb-3">Blog</span>
                <h1 className="text-3xl md:text-4xl text-foreground">Insights & Tutorials</h1>
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-card border border-border/50 focus:border-foreground/30 focus:outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-[#E5E0D8] dark:bg-card">
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
            {/* Tag Filters */}
            {!loading && allTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      !selectedTag
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedTag === tag
                          ? "bg-foreground text-background"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-foreground/10 border-t-foreground/50 mx-auto"></div>
                <p className="mt-4 text-muted-foreground text-sm">Loading articles...</p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Featured Post */}
              {!loading && featuredPost && (
                <motion.div
                  key={`featured-${featuredPost.slug}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-10"
                >
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <div className="bg-background rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-[#E5E0D8] dark:bg-muted text-muted-foreground">Featured</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {getReadingTime(featuredPost.content)} min
                        </span>
                      </div>
                      <h3 className="text-2xl text-foreground mb-3">{featuredPost.title}</h3>
                      <p className="text-muted-foreground mb-5 leading-relaxed max-w-2xl">{featuredPost.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {featuredPost.tags.map((tag) => (
                          <span key={tag} className="cream-tag text-xs">{tag}</span>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 text-foreground text-sm">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
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
                    <h2 className="text-lg text-foreground">
                      {selectedTag ? `${selectedTag} Articles` : "All Articles"}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {recentPosts.map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * index, duration: 0.4 }}
                      >
                        <Link to={`/blog/${post.slug}`} className="block h-full">
                          <div className="bg-background rounded-xl p-5 h-full hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              <span className="text-xs text-muted-foreground">{getReadingTime(post.content)} min</span>
                            </div>
                            <h3 className="text-base text-foreground mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="px-2 py-1 text-xs rounded-full bg-[#E5E0D8] dark:bg-muted text-muted-foreground">{tag}</span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-foreground text-sm pt-3 border-t border-border/30">
                              <span>Read</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-muted-foreground/40" />
                </div>
                <h3 className="text-lg text-foreground mb-2">
                  {searchQuery || selectedTag ? "No matching articles" : "No Articles Yet"}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {searchQuery || selectedTag ? "Try adjusting your filters." : "Check back soon!"}
                </p>
                {(searchQuery || selectedTag) && (
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                    className="btn-soft text-sm"
                  >
                    Clear filters
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPage;
