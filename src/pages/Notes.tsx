import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";
import { usePageTitle } from "@/hooks/usePageTitle";
import { formatDate } from "@/lib/formatDate";
import { loadBlogPosts, type BlogPost } from "@/lib/blog";
import { FullScreenReveal } from "@/motion/FullScreenReveal";

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function Blog() {
  usePageTitle("Notes — Muhammad Ahmad");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPosts().then((next) => {
      setPosts(next);
      setLoading(false);
    });
  }, []);

  const tags = useMemo(() => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(), [posts]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const tagged = tag ? post.tags.includes(tag) : true;
      if (!tagged) return false;
      if (!needle) return true;
      return (
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle) ||
        post.tags.some((item) => item.toLowerCase().includes(needle))
      );
    });
  }, [posts, query, tag]);

  return (
    <FullScreenReveal>
      <PageHeader
        index="04"
        label="Notes"
        title="Field notes"
        lede="Write-ups from the work: deploys, pipelines, and things I had to learn in public."
      />
      <div className="px-6 pb-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-6 border-b border-regal/15 py-6 md:flex-row md:items-end md:justify-between">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
              className="w-full border-b border-regal/30 bg-transparent py-2 font-mono text-sm outline-none placeholder:text-regal/50 md:max-w-xs"
            />
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <button
                type="button"
                onClick={() => setTag(null)}
                className={`font-mono text-[11px] uppercase tracking-[0.16em] ${tag === null ? "text-redmark" : "opacity-70"}`}
              >
                All
              </button>
              {tags.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTag(item === tag ? null : item)}
                  className={`font-mono text-[11px] uppercase tracking-[0.16em] ${tag === item ? "text-redmark" : "opacity-70"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="py-12 font-mono text-[12px] uppercase tracking-[0.16em] opacity-60">Opening the notebook…</p>}

          {!loading && visible.length === 0 && (
            <p className="py-12 text-sm opacity-70">Nothing in the notebook matches that.</p>
          )}

          <ul>
            {visible.map((post) => (
              <li key={post.slug} className="border-b border-regal/15">
                <Link to={`/notes/${post.slug}`} className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-redmark md:col-span-3">
                    {formatDate(post.date)}
                    {post.featured ? "  ·  marked" : ""}
                  </span>
                  <span className="md:col-span-6">
                    <span className="block font-serif text-3xl leading-tight transition-colors group-hover:text-redmark">{post.title}</span>
                    <span className="mt-2 block max-w-lg text-sm leading-relaxed opacity-70">{post.excerpt}</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-60 md:col-span-3 md:text-right">
                    {readingTime(post.content)} min · {post.tags.slice(0, 2).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FullScreenReveal>
  );
}
