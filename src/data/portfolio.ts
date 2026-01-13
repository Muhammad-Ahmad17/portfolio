export const portfolioData = {
  personal: {
    name: "Muhammad Ahmad",
    title: "Computer Engineering Student",
    tagline: "Backend Engineering & DevOps Enthusiast",
    bio: "6th semester Computer Engineering student at COMSATS University, specializing in backend development and exploring DevOps practices. Building scalable server-side applications and learning cloud infrastructure.",
    email: "muhammadahmad171105@gmail.com",
    phone: "+1 (555) 123-4567",
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
    backend: [
      { name: "Node.js", level: 70 },
      { name: "Express.js", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 60 },
      { name: "RESTful APIs", level: 75 },
      { name: "GraphQL", level: 50 }
    ],
    devops: [
      { name: "Docker", level: 55 },
      { name: "GitHub Actions", level: 60 },
      { name: "AWS", level: 45 },
      { name: "Vercel", level: 70 },
      { name: "Linux", level: 60 },
      { name: "Git", level: 75 }
    ],
    tools: [
      { name: "VS Code", level: 85 },
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
      description: "Learning project: Built a full-stack e-commerce app with product listings, cart functionality, and basic payment flow using Stripe.",
      image: "/projects/ecommerce.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/muhammad-ahmad17/ecommerce-platform",
      live: "https://ecommerce-demo.vercel.app",
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
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2024 - Present",
      description: "Taking on small freelance projects to gain practical experience while studying. Building websites and helping local businesses establish online presence.",
      achievements: [
        "Completed 5+ freelance projects for local clients",
        "Learned client communication and project management",
        "Gained hands-on experience with deployment and hosting"
      ]
    },
    {
      title: "Web Development Intern",
      company: "Local Tech Startup (Remote)",
      period: "Summer 2024",
      description: "3-month internship working on frontend tasks and learning professional development workflows.",
      achievements: [
        "Built responsive UI components using React and Tailwind",
        "Learned Git workflow and collaborative coding practices",
        "Fixed bugs and implemented small features under supervision"
      ]
    },
    {
      title: "Computer Engineering Student",
      company: "COMSATS University",
      period: "2023 - Present",
      description: "Currently in 6th semester, focusing on software engineering courses and building personal projects to practice concepts.",
      achievements: [
        "Maintaining 3.5+ GPA while learning full-stack development",
        "Active participant in university coding competitions",
        "Built multiple academic and personal projects"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "COMSATS University Islamabad, Lahore Campus",
      period: "2023 - 2027",
      description: "Currently in 6th semester. Learning software engineering, data structures, algorithms, databases, and web technologies. Actively participating in coding clubs and tech events.",
      gpa: "3.5/4.0"
    },
    {
      degree: "FSC (Pre-Engineering)",
      institution: "Punjab College of Science, Ferozpur Road, Lahore",
      period: "2021 - 2023",
      description: "Completed intermediate education with focus on Mathematics, Physics, and Computer Science.",
      grade: "A"
    }
  ]
};