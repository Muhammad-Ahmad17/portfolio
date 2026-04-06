# Muhammad Ahmad - Portfolio Website

A modern, minimalist portfolio website built with React, TypeScript, and Tailwind CSS. Features a handcrafted aesthetic with soft cream backgrounds, elegant typography, and smooth animations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx        # Landing section with expertise slider
│   ├── About.tsx       # About section with services
│   ├── Projects.tsx    # Projects showcase
│   ├── Skills.tsx      # Skills grid
│   ├── Experience.tsx  # Work experience
│   ├── Contact.tsx     # Contact form
│   ├── Navbar.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── AboutPage.tsx   # About page
│   ├── ProjectsPage.tsx
│   ├── SkillsPage.tsx
│   ├── ExperiencePage.tsx
│   ├── BlogPage.tsx
│   └── ContactPage.tsx
├── data/
│   └── portfolio.ts    # 📌 MAIN DATA FILE - Edit this to customize
├── lib/
│   └── blog.ts         # Blog posts data
└── index.css           # Global styles and design system
```

---

## ✏️ How to Customize Your Portfolio

### 1. Edit Personal Information

Open `src/data/portfolio.ts` and modify the `personal` object:

```typescript
personal: {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your Tagline",
  bio: "Your bio description...",
  email: "your@email.com",
  phone: "+1 234 567890",
  location: "Your City, Country",
  resume: "/resume.pdf"  // Place resume.pdf in public/ folder
}
```

### 2. Update Social Links

```typescript
social: {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  leetcode: "https://leetcode.com/yourusername",
  portfolio: "https://yoursite.com"
}
```

### 3. Add or Edit Projects

Add new projects to the `projects` array:

```typescript
projects: [
  {
    id: 1,                                    // Unique ID
    title: "Project Name",
    description: "Project description...",
    image: "/projects/project-image.jpg",     // Place in public/projects/
    technologies: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/user/repo",
    live: "https://project-url.com",          // Optional
    demo: "/projects/demo.mp4",               // Optional video demo
    featured: true                            // Shows on homepage if true
  }
]
```

**Note:** Place project images in `public/projects/` folder.

### 4. Update Skills

Skills are organized by category. Edit the `skills` object:

```typescript
skills: {
  languages: [
    { name: "JavaScript", level: 65, icon: "js", category: "language" },
    // Add more...
  ],
  backend: [
    { name: "Node.js", level: 40, icon: "nodejs", category: "backend" },
    // Add more...
  ],
  frontend: [...],
  devops: [...],
  tools: [...],
  hardware: [...]
}
```

- `level`: Skill proficiency (0-100)
- `icon`: Icon identifier (displayed with lucide-react icons)

### 5. Update Experience

```typescript
experience: [
  {
    title: "Job Title",
    company: "Company Name",
    period: "Jan 2024 - Present",
    description: "Brief description of role...",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3"
    ]
  }
]
```

### 6. Update Education

```typescript
education: [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "University Name",
    period: "2023 - 2027",
    description: "Description...",
    gpa: "3.6/4.0",              // Optional
    grade: "A",                   // Optional
    status: "in-progress"         // or "completed"
  }
]
```

### 7. Update Hero Section Expertise Slider

The expertise slider shows rotating text on the homepage:

```typescript
expertise: [
  "Learning Backend Development with Node.js",
  "Exploring DevOps & Cloud Technologies",
  // Add more items...
]
```

### 8. Update Services/About Section

```typescript
services: [
  {
    name: "Service Name",
    description: "Service description...",
    color: "text-green-500",      // Icon color
    bgColor: "bg-green-500/10"    // Background tint
  }
]
```

---

## 📝 How to Add Blog Posts

Edit `src/lib/blog.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "my-new-post",                    // URL slug
    title: "My New Blog Post",
    excerpt: "Short description for listing...",
    content: `
      # Full Markdown Content
      
      Your blog post content in markdown format.
      
      ## Subheading
      
      More content...
      
      \`\`\`javascript
      // Code blocks supported
      console.log('Hello World');
      \`\`\`
    `,
    author: "Muhammad Ahmad",
    date: "2025-01-15",
    readTime: "5 min read",
    tags: ["React", "Tutorial"],
    image: "/blog/post-image.jpg"           // Place in public/blog/
  }
];
```

---

## 🎨 Customizing Design

### Colors

The design system uses CSS variables in `src/index.css`:

```css
:root {
  --background: 36 16% 90%;          /* Light cream background */
  --foreground: 30 8% 25%;           /* Dark brown text */
  --cream: 36 16% 87%;               /* Primary cream accent */
  --primary: 30 10% 40%;
  /* ... more variables */
}

.dark {
  --background: 30 10% 12%;          /* Dark mode background */
  --foreground: 36 20% 90%;          /* Light text for dark mode */
  /* ... dark mode overrides */
}
```

### Fonts

The design uses:
- **Headings**: Cormorant Garamond (elegant serif)
- **Body**: DM Sans (clean sans-serif)

To change fonts, update the `@import` in `src/index.css` and the font-family variables.

### Graphics Background

Graphics use a cream background to ensure visibility in both themes:

```css
.graphic-container {
  background-color: #E5E0D8;
}
```

---

## 🖼️ Adding Images

1. **Profile Photo**: Place in `public/` as specified in your components
2. **Project Images**: Place in `public/projects/`
3. **Blog Images**: Place in `public/blog/`
4. **Graphics/Icons**: Place in `public/graphics/` (SVG or PNG)

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy automatically

### Manual Build

```bash
npm run build
# Output in dist/ folder - upload to any static host
```

---

## 📄 Files to Update for Full Customization

| File | What to Edit |
|------|--------------|
| `src/data/portfolio.ts` | All personal info, projects, skills, experience |
| `src/lib/blog.ts` | Blog posts |
| `public/resume.pdf` | Your resume |
| `public/projects/` | Project images |
| `public/graphics/` | Custom icons/graphics |
| `src/index.css` | Colors, fonts, design system |

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Routing**: React Router DOM

---

## 📞 Support

For questions or issues, create an issue in the repository.
