import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { loadBlogPosts, type BlogPost } from "@/lib/blog";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useState } from "react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts().then(posts => {
      const foundPost = posts.find(p => p.slug === slug);
      setPost(foundPost || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-32 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild size="lg">
              <Link to="/blog">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to Blog
              </Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-20"
      >
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Button
              asChild
              variant="ghost"
              className="hover:bg-muted/50"
            >
              <Link to="/blog">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
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

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground prose-headings:scroll-mt-20
              prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-12
              prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:my-4
              prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6 prose-pre:overflow-x-auto
              prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:my-6 prose-blockquote:not-italic
              prose-ul:text-foreground/90 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:text-foreground/90 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:marker:text-primary prose-li:my-2 prose-li:leading-relaxed
              prose-img:rounded-lg prose-img:border prose-img:border-border prose-img:my-8
              prose-hr:border-border prose-hr:my-12
              prose-table:border-collapse prose-table:w-full prose-table:my-6
              prose-thead:border-b prose-thead:border-border
              prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
              prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-border
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Article Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Enjoyed this article?</h3>
                    <p className="text-sm text-muted-foreground">
                      Share it with others who might find it useful
                    </p>
                  </div>
                  <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Article
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-border flex justify-center"
          >
            <Button asChild size="lg">
              <Link to="/blog">
                <ArrowLeft className="mr-2 w-5 h-5" />
                View All Articles
              </Link>
            </Button>
          </motion.div>
        </article>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
