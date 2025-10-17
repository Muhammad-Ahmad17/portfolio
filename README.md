# Muhammad Ahmad - Portfolio

A modern, responsive portfolio website showcasing my work as a full-stack developer specializing in MERN stack and DevOps practices.

## 🚀 Features

- **Terminal-themed UI**: Unique backend/Linux inspired design with terminal aesthetics
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: Multiple color themes with smooth transitions
- **Interactive Components**: Animated terminal interfaces, typing effects, and smooth scrolling
- **Blog System**: Markdown-based blog with syntax highlighting
- **Contact Form**: Functional contact form with API integration
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Shadcn/ui, Radix UI
- **Routing**: React Router v6
- **Content**: Markdown, Gray Matter
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammad-Ahmad17/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Hero.tsx        # Landing section with terminal theme
│   ├── About.tsx       # About section with service status
│   ├── Projects.tsx    # Projects showcase with git theme
│   ├── Skills.tsx      # Skills display with htop interface
│   ├── Experience.tsx  # Experience timeline with journalctl
│   ├── Contact.tsx     # Contact form with curl API theme
│   ├── Navbar.tsx      # Navigation with terminal commands
│   └── Footer.tsx      # Footer with server info
├── pages/              # Page components
├── data/               # Static data and content
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles and CSS
```

## 🎨 Customization

### Themes
The portfolio supports multiple color themes. To add a new theme:

1. Update `tailwind.config.ts` with new color variables
2. Add theme option to the theme provider
3. Update CSS custom properties in `index.css`

### Content
Update the portfolio content in `src/data/portfolio.ts`:
- Personal information
- Skills and experience
- Projects
- Social links

### Blog Posts
Add new blog posts in the `public/blogs/` directory as Markdown files with frontmatter.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain support included

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Enable form handling for contact form

### Manual Deployment
```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: muhammad@example.com
- **LinkedIn**: [Muhammad Ahmad](https://linkedin.com/in/muhammad-dev)
- **GitHub**: [Muhammad-Ahmad17](https://github.com/Muhammad-Ahmad17)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
