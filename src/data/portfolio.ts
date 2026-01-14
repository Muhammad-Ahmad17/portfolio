export const portfolioData = {
  personal: {
    name: "Muhammad Ahmad",
    title: "Computer Engineering Student",
    tagline: "Backend Engineering & DevOps Enthusiast",
    bio: "6th semester Computer Engineering student at COMSATS University, specializing in backend development and exploring DevOps practices. Building scalable server-side applications and learning cloud infrastructure.",
    email: "muhammadahmad171105@gmail.com",
    phone: "+92 337 147947",
    location: "Lahore, Pakistan",
    resume: "/resume.pdf"
  },

  social: {
    github: "https://github.com/muhammad-ahmad17",
    linkedin: "https://linkedin.com/in/muhammad-ahmad17",
    leetcode: "https://leetcode.com/muhammad-ahmad17",
    portfolio: "https://aahmad.app"
  },

  services: [
    {
      name: "Backend Development",
      description: "Building REST APIs with Node.js and Express, working with MongoDB and PostgreSQL databases",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      name: "DevOps Learning",
      description: "Exploring Docker, GitHub Actions, and cloud deployment with AWS and Vercel",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Database Design",
      description: "Learning database architecture, query optimization, and working with SQL and NoSQL databases",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      name: "Problem Solving",
      description: "Practicing DSA and working on real-world projects to improve coding skills",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ],

  stats: [
    { label: "Current Semester", value: "6th" },
    { label: "Projects Built", value: "15+" },
    { label: "Technologies Learning", value: "20+" }
  ],

  expertise: [
    "Learning Backend Development with Node.js",
    "Exploring DevOps & Cloud Technologies",
    "Building RESTful APIs & Microservices",
    "Understanding API Design & Architecture",
    "Working with Docker Containers",
    "Practicing Database Design (MongoDB, PostgreSQL)",
    "Learning CI/CD Pipeline Automation",
    "Developing Problem-Solving Skills with DSA"
  ],

  hero: {
    greeting: "👋 Welcome to my portfolio",
    availability: {
      status: "Open to Internships",
      statusColor: "text-green-500",
      responseTime: "Within 24 hours",
      message: "Looking for internships, freelance opportunities, and collaborative projects to gain real-world experience. Let's learn and build together!"
    }
  },

  skills: {
    languages: [
      { name: "JavaScript", level: 80, icon: "js", category: "language" },
      { name: "TypeScript", level: 70, icon: "ts", category: "language" },
      { name: "Python", level: 65, icon: "python", category: "language" },
      { name: "C++", level: 60, icon: "cpp", category: "language" },
      { name: "SQL", level: 70, icon: "sql", category: "language" }
    ],
    backend: [
      { name: "Node.js", level: 70, icon: "nodejs", category: "backend" },
      { name: "Express.js", level: 75, icon: "express", category: "backend" },
      { name: "MongoDB", level: 70, icon: "mongodb", category: "backend" },
      { name: "PostgreSQL", level: 60, icon: "postgresql", category: "backend" },
      { name: "RESTful APIs", level: 75, icon: "api", category: "backend" },
      { name: "GraphQL", level: 50, icon: "graphql", category: "backend" }
    ],
    frontend: [
      { name: "React", level: 75, icon: "react", category: "frontend" },
      { name: "Next.js", level: 60, icon: "nextjs", category: "frontend" },
      { name: "Tailwind CSS", level: 85, icon: "tailwind", category: "frontend" },
      { name: "HTML/CSS", level: 90, icon: "html", category: "frontend" },
      { name: "Framer Motion", level: 65, icon: "framer", category: "frontend" }
    ],
    devops: [
      { name: "Docker", level: 55, icon: "docker", category: "devops" },
      { name: "GitHub Actions", level: 60, icon: "github", category: "devops" },
      { name: "AWS", level: 45, icon: "aws", category: "devops" },
      { name: "Vercel", level: 70, icon: "vercel", category: "devops" },
      { name: "Linux", level: 60, icon: "linux", category: "devops" },
      { name: "Git", level: 75, icon: "git", category: "devops" }
    ],
    tools: [
      { name: "VS Code", level: 85, icon: "vscode", category: "tools" },
      { name: "Figma", level: 80, icon: "figma", category: "tools" },
      { name: "Postman", level: 85, icon: "postman", category: "tools" },
      { name: "MongoDB Compass", level: 80, icon: "mongodb", category: "tools" },
      { name: "Chrome DevTools", level: 90, icon: "chrome", category: "tools" }
    ]
  },

  projects: [
    {
      id: 1,
      title: "Multi-Buyer & Vendor E-Commerce Platform",
      description: "A modular full-stack e-commerce web application with multi-role support (Buyer, Vendor). This project is designed using a 3-tier architecture with a modern frontend and robust backend, backed by database modeling.",
      image: "/projects/ecommerce.jpg",
      technologies: ["React", "Node.js", "Express.js", "SQL Server"],
      github: "https://github.com/Muhammad-Ahmad17/E_Commerce",
      live: "https://e-commerce1-muhammad-ahmads-projects-1458b467.vercel.app/",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "University project: Collaborative task manager with authentication, CRUD operations, and real-time updates.",
      image: "/projects/taskmanager.jpg",
      technologies: ["React", "Express", "MongoDB", "Socket.io"],
      github: "https://github.com/muhammad-ahmad17/task-manager",
      live: "https://taskmanager-demo.vercel.app",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Practice project: Weather app using OpenWeather API with location search and 5-day forecast display.",
      image: "/projects/weather.jpg",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      github: "https://github.com/muhammad-ahmad17/weather-dashboard",
      live: "https://weather-demo.vercel.app",
      featured: false
    },
    {
      id: 4,
      title: "Personal Blog",
      description: "Built a markdown-based blog to document my learning journey with automatic post generation from .md files.",
      image: "/projects/blog.jpg",
      technologies: ["React", "Markdown", "Tailwind CSS"],
      github: "https://github.com/muhammad/blog-cms",
      live: "https://blog-demo.vercel.app",
      featured: false
    },
    {
      id: 5,
      title: "Chat Application",
      description: "Semester project: Real-time chat app with rooms, message history, and basic authentication.",
      image: "/projects/chat.jpg",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
      github: "https://github.com/muhammad/ai-chat",
      live: "https://chat-demo.vercel.app",
      featured: false
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Personal portfolio to showcase my learning journey and projects, with theme customization and blog integration.",
      image: "/projects/portfolio.jpg",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/muhammad/portfolio",
      live: "https://muhammad-portfolio.vercel.app",
      featured: true
    }
  ],

  experience: [
    {
      title: "Backend Engineer Intern",
      company: "Innovative Saudia",
      period: "Jul 2025 - Aug 2025",
      description: "2-month on-site internship in Lahore focusing on backend development and DevOps practices under the guidance of experienced professionals.",
      achievements: [
        "Learned backend and DevOps practices under the guidance of experienced professionals",
        "Documented daily progress and key learnings to track skill growth",
        "Prepared for the AWS Cloud Practitioner certification, completing multiple mock tests"
      ]
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2024 - Present",
      description: "Taking on small freelance projects to gain practical experience while studying. Building websites and helping local businesses establish online presence.",
      achievements: [
        "Completed 5+ freelance projects for local clients",
        "Learned client communication and project management",
        "Gained hands-on experience with deployment and hosting"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "COMSATS University Islamabad, Lahore Campus",
      period: "2023 - 2027",
      description: "Currently in 6th semester. Learning software engineering, data structures, algorithms, databases, and web technologies. Actively participating in coding clubs and tech events.",
      gpa: "3.5/4.0",
      status: "in-progress"
    },
    {
      degree: "FSC (Pre-Engineering)",
      institution: "Punjab College of Science, Ferozpur Road, Lahore",
      period: "2021 - 2023",
      description: "Completed intermediate education with focus on Mathematics, Physics, and Computer Science.",
      grade: "A",
      status: "completed"
    }
  ]
};