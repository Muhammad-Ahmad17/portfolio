import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Mock blog post data - will be replaced with actual markdown files
const blogPostsContent: Record<string, {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}> = {
  "react-best-practices": {
    title: "React Best Practices in 2025",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Web Development"],
    content: `
# React Best Practices in 2025

React continues to evolve, and with it, our best practices. Here are the essential patterns you should follow in 2025.

## 1. Use TypeScript

TypeScript has become the de facto standard for React applications. It provides:

- **Type safety**: Catch errors at compile time
- **Better IDE support**: Autocomplete and refactoring tools
- **Self-documenting code**: Types serve as inline documentation

\`\`\`typescript
interface UserProps {
  name: string;
  email: string;
  isActive: boolean;
}

const UserCard: React.FC<UserProps> = ({ name, email, isActive }) => {
  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
\`\`\`

## 2. Component Composition

Break down complex components into smaller, reusable pieces.

## 3. Custom Hooks

Extract reusable logic into custom hooks for better code organization.

## 4. Performance Optimization

Use React.memo, useMemo, and useCallback wisely, but don't over-optimize prematurely.

## Conclusion

Following these practices will help you build maintainable and scalable React applications in 2025.
    `
  },
  "devops-cicd": {
    title: "CI/CD Pipeline with GitHub Actions",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["DevOps", "CI/CD", "GitHub Actions"],
    content: `
# CI/CD Pipeline with GitHub Actions

Automating your deployment pipeline is essential for modern software development. Let's build one with GitHub Actions.

## What is CI/CD?

**Continuous Integration (CI)** and **Continuous Deployment (CD)** are practices that automate the process of:

1. Testing code changes
2. Building applications
3. Deploying to production

## Setting Up GitHub Actions

Create a \`.github/workflows/deploy.yml\` file:

\`\`\`yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
\`\`\`

## Benefits

- Automated testing
- Faster deployments
- Reduced human error
- Better code quality

## Conclusion

GitHub Actions makes it easy to implement CI/CD for your projects.
    `
  },
  "mern-stack-guide": {
    title: "Complete MERN Stack Guide",
    date: "2025-01-05",
    readTime: "15 min read",
    tags: ["MERN", "Full Stack", "MongoDB"],
    content: `
# Complete MERN Stack Guide

The MERN stack (MongoDB, Express, React, Node.js) is a powerful combination for building full-stack web applications.

## Stack Components

### MongoDB
NoSQL database for flexible data storage.

### Express.js
Minimal web framework for Node.js.

### React
Frontend library for building user interfaces.

### Node.js
JavaScript runtime for server-side code.

## Project Structure

\`\`\`
mern-app/
├── client/          # React frontend
├── server/          # Express backend
├── models/          # MongoDB models
└── package.json
\`\`\`

## Building a Simple App

Let's create a basic todo application with the MERN stack.

### Backend Setup

\`\`\`javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

// Routes
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
\`\`\`

## Deployment

Deploy your MERN app to platforms like Heroku, Vercel, or AWS.

## Conclusion

The MERN stack provides everything you need to build modern web applications.
    `
  }
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsContent[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold">Post not found</h1>
          <Button asChild className="mt-4">
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
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
          <Button 
            asChild 
            variant="ghost" 
            className="mb-8 hover:bg-primary/10"
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <Button variant="ghost" size="sm" className="ml-auto hover:bg-primary/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-foreground/90 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-blockquote:border-l-primary prose-blockquote:text-foreground/80
              prose-ul:text-foreground/90 prose-ol:text-foreground/90
              prose-li:marker:text-primary
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        </article>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
