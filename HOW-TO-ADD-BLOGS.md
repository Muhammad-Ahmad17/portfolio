# 📝 How to Add New Blog Posts

## Quick Start

To add a new blog post, edit `/src/lib/blog.ts` and add a new entry to the `blogPosts` array.

## Blog Post Template

```typescript
{
    slug: 'your-blog-url-slug',  // Used in URL: /blog/your-blog-url-slug
    title: 'Your Blog Post Title',
    date: '2024-10-14',  // Format: YYYY-MM-DD
    author: 'Your Name',
    excerpt: 'A short description that appears in the blog listing',
    tags: ['Tag1', 'Tag2', 'Tag3'],  // Add relevant tags
    content: `# Your Blog Title

## Section 1

Your content here...

\\\`\\\`\\\`bash
# Code blocks work too!
npm install package-name
\\\`\\\`\\\`

## Section 2

More content...
`
}
```

## Example: Adding a New Blog Post

1. Open `/src/lib/blog.ts`
2. Find the `blogPosts` array
3. Add your new blog post at the top (most recent first)
4. Save the file
5. The blog will automatically appear on your blog page!

```typescript
export const blogPosts: BlogPost[] = [
    // ✨ ADD YOUR NEW BLOG HERE ✨
    {
        slug: 'kubernetes-deployment-guide',
        title: 'Kubernetes Deployment Guide for Beginners',
        date: '2024-10-14',
        author: 'Muhammad',
        excerpt: 'Learn how to deploy your first application to Kubernetes with this step-by-step guide.',
        tags: ['Kubernetes', 'DevOps', 'Deployment'],
        content: `# Kubernetes Deployment Guide

Kubernetes (K8s) is a powerful container orchestration platform...

## Prerequisites

- Docker installed
- kubectl installed
- Access to a Kubernetes cluster

## Step 1: Create a Deployment

\\\`\\\`\\\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 8080
\\\`\\\`\\\`

## Conclusion

You now have a basic Kubernetes deployment running!`
    },
    // ... existing blog posts below
];
```

## Markdown Features

Your blog posts support:

- **Headings**: # H1, ## H2, ### H3
- **Bold**: **text** or __text__
- **Italic**: *text* or _text_
- **Code blocks**: \`\`\`language
- **Inline code**: \`code\`
- **Lists**: - item or 1. item
- **Links**: [text](url)
- **Blockquotes**: > quote

## Code Syntax Highlighting

Supported languages:
- `bash` - Shell commands
- `javascript` / `js` - JavaScript
- `typescript` / `ts` - TypeScript
- `python` / `py` - Python
- `dockerfile` - Dockerfile
- `yaml` / `yml` - YAML
- `json` - JSON
- `sql` - SQL
- `nginx` - Nginx config
- `conf` - Configuration files

## Tips

1. **Use descriptive slugs**: `kubernetes-guide` not `blog-1`
2. **Write good excerpts**: They appear in blog listings
3. **Add relevant tags**: Helps with organization
4. **Date format**: Always use YYYY-MM-DD
5. **Test locally**: Check your blog post renders correctly

## File Location

📁 `/src/lib/blog.ts` - Main blog configuration file

That's it! Your blog system is ready to use! 🚀
