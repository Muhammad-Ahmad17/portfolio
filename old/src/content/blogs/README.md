# Blog System - How to Add New Articles

This directory (`src/content/blogs/`) contains all your blog articles in Markdown format. **The blog system automatically discovers and loads all `.md` files from this folder!**

## 📝 How to Add a New Blog Post

1. Create a new `.md` file in this directory (`src/content/blogs/my-awesome-tutorial.md`)
2. Add frontmatter at the top of the file
3. Write your content in Markdown below the frontmatter
4. **That's it!** The blog will automatically appear on your blog page!

**No code changes needed** - just drop a markdown file here and it works!

## 📋 Required Frontmatter Format

Every blog post must start with frontmatter containing metadata:

```markdown
---
title: "Your Blog Title Here"
date: "2024-10-15"
author: "Muhammad Ahmad"
excerpt: "A short description of your blog post that appears in the blog list"
tags: ["Node.js", "React", "DevOps"]
featured: true
---

# Your content starts here...
```

### Frontmatter Fields:

- **title**: The main title of your blog post (required)
- **date**: Publication date in `YYYY-MM-DD` format (required)
- **author**: Author name (required)
- **excerpt**: Short description shown on blog listing page (required)
- **tags**: Array of relevant tags/topics (required)
- **featured**: Set to `true` to make it the featured post on blog page (optional)

## ✍️ Writing Content

After the frontmatter, write your content using standard Markdown:

### Headings
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### Code Blocks
\`\`\`javascript
const hello = () => {
  console.log("Hello World!");
};
\`\`\`

### Lists
```markdown
- Item 1
- Item 2
- Item 3

1. First
2. Second
3. Third
```

### Links
```markdown
[Link Text](https://example.com)
```

### Images
```markdown
![Alt Text](https://example.com/image.jpg)
```

### Blockquotes
```markdown
> This is a blockquote
```

## 🎯 Example Blog Post

Create a file called `my-tutorial.md`:

```markdown
---
title: "Building a REST API with Express.js"
date: "2024-10-20"
author: "Muhammad Ahmad"
excerpt: "Learn how to build a production-ready REST API using Express.js with authentication and validation"
tags: ["Node.js", "Express", "API", "Backend"]
featured: false
---

# Building a REST API with Express.js

In this tutorial, we'll build a complete REST API...

## Prerequisites

- Node.js 18+
- Basic JavaScript knowledge

## Setup

First, install Express:

\`\`\`bash
npm install express
\`\`\`

## Creating the Server

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);
\`\`\`

## Conclusion

You now have a basic REST API!
```

## 🚀 Best Practices

1. **Use descriptive filenames**: `nodejs-best-practices.md` not `blog1.md`
2. **Keep excerpts short**: 1-2 sentences max
3. **Use relevant tags**: Help readers find related content
4. **Format code properly**: Use syntax highlighting with language tags
5. **Add frontmatter to every file**: Required for the blog to work
6. **Test locally**: Run `npm run dev` to preview your blog

## 🔧 Troubleshooting

**Blog not appearing?**
- Check that frontmatter is properly formatted with `---` delimiters
- Ensure the file has `.md` extension
- Verify all required fields are present
- Check for syntax errors in frontmatter YAML

**Images not loading?**
- Place images in `/public/images/blog/`
- Reference them as `/images/blog/your-image.jpg`

## 📁 File Naming Convention

Use kebab-case for filenames:
- ✅ `docker-best-practices.md`
- ✅ `nodejs-production-setup.md`
- ❌ `Docker Best Practices.md`
- ❌ `nodejs_production_setup.md`

The filename becomes the URL slug:
- File: `docker-best-practices.md`
- URL: `https://yoursite.com/blog/docker-best-practices`

---

Happy blogging! 🎉
