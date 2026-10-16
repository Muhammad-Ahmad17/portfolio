import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/atom-one-dark.css";
import { usePageTitle } from "@/hooks/usePageTitle";
import { formatDate } from "@/lib/formatDate";
import { loadBlogPosts, type BlogPost } from "@/lib/blog";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { StrokeDraw } from "@/motion/StrokeDraw";

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function stripLeadingTitle(markdown: string) {
  return markdown.replace(/^\s*#\s+[^\n]+\n+/, "");
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    loadBlogPosts().then((posts) => {
      if (!active) return;
      setPost(posts.find((item) => item.slug === slug) ?? null);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  usePageTitle(post ? `${post.title} — Muhammad Ahmad` : "Notes — Muhammad Ahmad");

  if (post === undefined) {
    return <p className="px-6 py-24 font-mono text-[12px] uppercase tracking-[0.16em] opacity-60">Opening the note…</p>;
  }

  if (post === null) {
    return (
      <div className="px-6 py-24 md:px-10">
        <h1 className="font-serif text-5xl">This note is not here.</h1>
        <Link to="/freelance/blog" className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.18em] hover:text-redmark">
          Back to notes
        </Link>
      </div>
    );
  }

  return (
    <FullScreenReveal>
      <header className="on-red bg-redmark px-6 pb-12 pt-16 text-chiffon md:px-10 lg:px-14">
        <div className="mx-auto max-w-[860px]">
          <Link to="/freelance/blog" className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-85 hover:opacity-100">
            ← Notes
          </Link>
          <h1 className="mt-5 font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95]">{post.title}</h1>
          <div className="mt-3 w-28 text-chiffon">
            <StrokeDraw delay={0.15} />
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-chiffon/85">
            {formatDate(post.date)} · {readingTime(post.content)} min · {post.author}
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-chiffon/75">{post.tags.join("  ·  ")}</p>
        </div>
      </header>
      <article className="px-6 py-14 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[860px] text-[17px] leading-[1.7] [&_a]:text-redmark [&_a]:underline [&_a]:decoration-redmark/40 [&_a]:underline-offset-4 [&_blockquote]:border-l [&_blockquote]:border-redmark [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-4xl [&_h2]:font-normal [&_h2]:leading-tight [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:font-normal [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-4 [&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-chiffon/20 [&_pre]:bg-regal [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-chiffon [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>
                  {children}
                </a>
              ),
              code: ({ className, children }) => {
                if (className) return <code className={className}>{children}</code>;
                return <code className="bg-regal px-1 py-0.5 text-chiffon font-mono text-[0.9em]">{children}</code>;
              },
            }}
          >
            {stripLeadingTitle(post.content)}
          </ReactMarkdown>
        </div>
      </article>
    </FullScreenReveal>
  );
}
