import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TableOfContents } from "@/components/TableOfContents";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Github, Linkedin, Mail, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { loadBlogPosts, type BlogPost } from "@/lib/blog";
import { portfolioData } from "@/data/portfolio";
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
      
      {/* Table of Contents */}
      {post && <TableOfContents content={post.content} />}

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-20"
      >
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
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
                className="hover:bg-muted/50 backdrop-blur-sm"
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
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
              <CardContent className="p-6 md:p-8">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-primary" />
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
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <Separator className="my-4" />

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground text-sm">{post.author}</div>
                      <div className="text-xs text-muted-foreground">Author</div>
                    </div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-8" />
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">{readingTime} min read</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm">{post.content.split(' ').length} words</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-foreground
              prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-10 prose-h1:leading-tight prose-h1:font-black
              prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8 prose-h2:leading-snug prose-h2:font-extrabold
              prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6 prose-h3:leading-snug prose-h3:font-bold
              prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-5 prose-h4:font-semibold
              prose-h5:text-base prose-h5:mb-1.5 prose-h5:mt-4 prose-h5:font-semibold
              prose-h6:text-sm prose-h6:mb-1 prose-h6:mt-3 prose-h6:font-medium
              prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:my-3 prose-p:text-base prose-p:font-normal
              prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80
              prose-strong:text-foreground prose-strong:font-bold
              prose-em:text-foreground/80 prose-em:italic
              prose-code:text-primary prose-code:bg-muted/80 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:font-mono
              prose-pre:!bg-[#282c34] prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg prose-pre:p-5 prose-pre:my-5 prose-pre:leading-relaxed prose-pre:text-sm prose-pre:shadow-lg
              [&_pre_code]:!bg-transparent [&_pre_code]:!text-[#abb2bf] [&_pre_code]:!p-0 [&_pre_code]:!text-sm
              prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:my-5 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/30 prose-blockquote:rounded-r prose-blockquote:text-base
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-8 prose-ul:space-y-1.5
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-8 prose-ol:space-y-1.5
              prose-li:text-foreground/90 prose-li:leading-relaxed prose-li:text-base
              prose-img:rounded-lg prose-img:my-6 prose-img:shadow-md
              prose-hr:border-border prose-hr:my-8
              prose-table:my-6 prose-table:text-base
              prose-thead:border-b-2 prose-thead:border-border
              prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-base
              prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-border prose-td:text-base
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="w-20 h-20 border-4 border-primary/30 shadow-lg">
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                      {portfolioData.personal.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Written by {portfolioData.personal.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {portfolioData.personal.bio}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" asChild className="border-primary/30 hover:bg-primary/10">
                        <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="border-primary/30 hover:bg-primary/10">
                        <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="border-primary/30 hover:bg-primary/10">
                        <a href={`mailto:${portfolioData.personal.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Article Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-primary" />
                      Enjoyed this article?
                    </h3>
                    <p className="text-muted-foreground">
                      Share it with others who might find it useful and help spread the knowledge!
                    </p>
                  </div>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                    <Share2 className="w-5 h-5 mr-2" />
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
            transition={{ delay: 0.6 }}
            className="pt-8 border-t border-border flex justify-center"
          >
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
              <Link to="/blog">
                <ArrowLeft className="mr-2 w-5 h-5" />
                View All Articles
              </Link>
            </Button>
          </motion.div>
        </div>
        </article>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
