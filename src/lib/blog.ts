import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    tags: string[];
    content: string;
    featured?: boolean;
}

// Import all markdown files directly from src/content/blogs
const blogModules = import.meta.glob('/src/content/blogs/*.md', {
    query: '?raw',
    import: 'default',
    eager: false
});

// This will be populated with blog posts from markdown files
let cachedBlogPosts: BlogPost[] | null = null;

// Function to load and parse all blog markdown files
export async function loadBlogPosts(): Promise<BlogPost[]> {
    if (cachedBlogPosts) {
        return cachedBlogPosts;
    }

    try {
        const posts: BlogPost[] = [];

        // Load all markdown files
        for (const [path, loadModule] of Object.entries(blogModules)) {
            try {
                // Extract slug from path
                const fileName = path.split('/').pop()?.replace('.md', '') || '';

                // Skip README
                if (fileName === 'README') continue;

                // Load the module content
                const content = await loadModule() as string;

                // Parse frontmatter and content
                const { data, content: markdownContent } = matter(content);

                posts.push({
                    slug: fileName,
                    title: data.title || 'Untitled',
                    date: data.date || new Date().toISOString().split('T')[0],
                    author: data.author || 'Muhammad Ahmad',
                    excerpt: data.excerpt || '',
                    tags: data.tags || [],
                    content: markdownContent,
                    featured: data.featured || false
                });
            } catch (err) {
                console.error(`Error loading blog from ${path}:`, err);
            }
        }

        // Sort by date (newest first)
        cachedBlogPosts = posts.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        console.log(`Loaded ${cachedBlogPosts.length} blog posts`);
        return cachedBlogPosts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

// Synchronous version that returns cached posts or empty array
export function getBlogPosts(): BlogPost[] {
    return cachedBlogPosts || [];
}

export function getBlogPost(slug: string): BlogPost | undefined {
    const posts = getBlogPosts();
    return posts.find(post => post.slug === slug);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
    const posts = getBlogPosts();
    return posts.filter(post => post.tags.includes(tag));
}

export function getFeaturedPosts(): BlogPost[] {
    const posts = getBlogPosts();
    return posts.filter(post => post.featured);
}

// Initialize blog posts on module load
loadBlogPosts();
