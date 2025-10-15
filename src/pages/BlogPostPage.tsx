import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal, FileText, Tag, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getBlogPost } from "@/lib/blog";
import "highlight.js/styles/atom-one-dark.css";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <div className="glass rounded-lg border-2 border-destructive/50 p-8 max-w-2xl mx-auto">
            <div className="font-mono space-y-4">
              <div className="flex items-center gap-2 text-destructive">
                <Terminal className="w-6 h-6" />
                <span className="text-lg font-semibold">ERROR 404</span>
              </div>
              <p className="text-foreground">cat: {slug}: No such file or directory</p>
              <Button asChild className="mt-4 font-mono">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  cd /blog
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          {/* Terminal Navigation */}
          <Button
            asChild
            variant="ghost"
            className="mb-8 hover:bg-primary/10 font-mono"
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              cd ../
            </Link>
          </Button>

          {/* Terminal Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="glass rounded-lg border-2 border-primary/30 overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="bg-primary/10 px-4 py-2 flex items-center space-x-2 border-b border-primary/20">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                </div>
                <Terminal className="w-4 h-4 text-primary ml-2" />
                <span className="text-xs font-mono text-muted-foreground">
                  ~/dev/blog/{post.slug}.md
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm bg-code-bg space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-foreground">cat {post.slug}.md</span>
                </div>

                <div className="border-t border-primary/20 pt-3 space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <FileText className="w-4 h-4 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-muted-foreground">
                        <span className="text-primary">File:</span> {post.slug}.md
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-primary">Modified:</span> {post.date}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-primary">Author:</span> {post.author}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Article Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
              <span className="text-primary">#</span> {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {post.author}
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-primary" />
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-primary/10 text-primary font-mono text-xs"
                >
                  {tag.toLowerCase()}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-lg border border-primary/20 p-8 md:p-12"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-mono prose-headings:font-bold prose-headings:text-foreground
              prose-h1:text-3xl prose-h1:border-b prose-h1:border-primary/20 prose-h1:pb-4 prose-h1:mb-6
              prose-h2:text-2xl prose-h2:text-primary prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:text-primary/80 prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:my-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-pre:bg-code-bg prose-pre:border-2 prose-pre:border-primary/20 prose-pre:rounded-lg prose-pre:p-0 prose-pre:my-6
              prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-6
              prose-ul:text-foreground/90 prose-ul:my-4 prose-ol:text-foreground/90 prose-ol:my-4
              prose-li:marker:text-primary prose-li:my-2
              prose-img:rounded-lg prose-img:border prose-img:border-primary/20
              prose-hr:border-primary/20 prose-hr:my-8
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Terminal Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="glass rounded-lg border border-primary/20 p-4">
              <div className="font-mono text-sm space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-primary">$</span>
                  <span>echo "End of file"</span>
                </div>
                <div className="text-muted-foreground pl-4 text-xs">
                  EOF
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <Button
              asChild
              size="lg"
              className="font-mono"
            >
              <Link to="/blog">
                <ArrowLeft className="mr-2 w-5 h-5" />
                ls /blog
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
