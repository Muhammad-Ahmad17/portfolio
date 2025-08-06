export const portfolioData = {
  personal: {
    name: "Muhammad",
    title: "Computer Engineer | MERN Developer | DevOps Learner",
    tagline: "Building scalable web solutions with modern technologies",
    bio: "Passionate full-stack developer with expertise in MERN stack and a growing interest in DevOps practices. I enjoy creating user-centric applications that solve real-world problems.",
    email: "muhammad@example.com",
    phone: "+1 (555) 123-4567",
    location: "Remote / On-site",
    resume: "/resume.pdf"
  },

  social: {
    github: "https://github.com/muhammad",
    linkedin: "https://linkedin.com/in/muhammad-dev",
    twitter: "https://twitter.com/muhammad_dev",
    portfolio: "https://muhammad-portfolio.vercel.app"
  },

  skills: {
    frontend: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML5 & CSS3", level: 95 }
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 90 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 70 }
    ],
    devops: [
      { name: "Docker", level: 70 },
      { name: "GitHub Actions", level: 75 },
      { name: "AWS", level: 65 },
      { name: "Vercel", level: 85 },
      { name: "Linux", level: 70 },
      { name: "Git", level: 90 }
    ],
    tools: [
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 80 },
      { name: "Postman", level: 85 },
      { name: "MongoDB Compass", level: 80 },
      { name: "Chrome DevTools", level: 90 }
    ]
  },

  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.",
      image: "/projects/ecommerce.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
      github: "https://github.com/muhammad/ecommerce-platform",
      live: "https://ecommerce-demo.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "Task Management System",
      description: "Collaborative task management application with real-time updates, team collaboration, and progress tracking.",
      image: "/projects/taskmanager.jpg",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "WebSocket"],
      github: "https://github.com/muhammad/task-manager",
      live: "https://taskmanager-demo.vercel.app",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather application with location-based forecasts, interactive maps, and historical data analysis.",
      image: "/projects/weather.jpg",
      technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
      github: "https://github.com/muhammad/weather-dashboard",
      live: "https://weather-demo.vercel.app",
      featured: false
    },
    {
      id: 4,
      title: "Blog CMS",
      description: "Content management system for bloggers with markdown support, SEO optimization, and analytics.",
      image: "/projects/blog.jpg",
      technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel Analytics"],
      github: "https://github.com/muhammad/blog-cms",
      live: "https://blog-demo.vercel.app",
      featured: false
    },
    {
      id: 5,
      title: "AI Chat Application",
      description: "Real-time chat application with AI integration, message encryption, and multimedia support.",
      image: "/projects/chat.jpg",
      technologies: ["React", "Socket.io", "OpenAI API", "Node.js", "Redis"],
      github: "https://github.com/muhammad/ai-chat",
      live: "https://chat-demo.vercel.app",
      featured: true
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Modern portfolio website with 3D animations, dark mode, and responsive design.",
      image: "/projects/portfolio.jpg",
      technologies: ["React", "Framer Motion", "Spline", "Tailwind CSS"],
      github: "https://github.com/muhammad/portfolio",
      live: "https://muhammad-portfolio.vercel.app",
      featured: false
    }
  ],

  experience: [
    {
      title: "Full Stack Developer",
      company: "Tech Solutions Inc.",
      period: "2023 - Present",
      description: "Leading development of web applications using MERN stack, implementing CI/CD pipelines, and mentoring junior developers.",
      achievements: [
        "Reduced application load time by 40% through code optimization",
        "Implemented automated testing, increasing code coverage to 90%",
        "Led a team of 4 developers on multiple client projects"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2022 - 2023",
      description: "Developed responsive web applications and collaborated with design teams to create pixel-perfect user interfaces.",
      achievements: [
        "Built 15+ responsive websites with 99% client satisfaction",
        "Improved website performance scores by average 35%",
        "Mentored 2 junior developers in React best practices"
      ]
    },
    {
      title: "Junior Web Developer",
      company: "StartUp Hub",
      period: "2021 - 2022",
      description: "Started career in web development, working on various client projects and learning modern web technologies.",
      achievements: [
        "Successfully delivered 10+ client projects on time",
        "Learned MERN stack and modern development practices",
        "Contributed to open source projects"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "Tech University",
      period: "2018 - 2022",
      description: "Graduated with honors, specializing in software engineering and web technologies.",
      gpa: "3.8/4.0"
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      institution: "Code Academy",
      period: "2021",
      description: "Intensive 6-month program covering MERN stack, DevOps basics, and project development.",
      completion: "Top 5% of cohort"
    }
  ]
};