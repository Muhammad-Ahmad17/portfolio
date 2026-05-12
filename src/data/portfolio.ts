export type NavItem = { href: string; label: string };

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  /** Source repo — omit if none */
  github?: string;
  /** Deployed app URL */
  live?: string;
  /** Video path (/foo.mp4) or external demo URL */
  demo?: string;
  featured?: boolean;
};

export const portfolioData = {
  /** Main nav (Navbar + Footer quick links) */
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
  ] as const satisfies readonly NavItem[],

  site: {
    builtWithLabel: "Built with React, TypeScript & Tailwind CSS"
  },

  sections: {
    about: {
      eyebrow: "About",
      title: "Who I Am",
      valuesTitle: "Core Values"
    },
    projects: {
      eyebrow: "Work",
      title: "Featured Projects",
      subtitle:
        "Projects I've built while learning full-stack development, cloud deployment, and DevOps.",
      featuredBadge: "Featured",
      viewReposCta: "View All Repositories"
    },
    skills: {
      eyebrow: "Expertise",
      title: "Technologies & Skills",
      subtitle: "Tools and technologies I work with"
    }
  },

  about: {
    journeyTitle: "My Journey",
    secondaryBio:
      "Started with C/C++ in my first semester, now building full-stack applications with the MERN stack and exploring DevOps practices.",
    quote: "Every day brings a new opportunity to learn and grow as a developer.",
    coreValues: [
      {
        title: "Clean Code",
        description: "Writing readable, maintainable code that follows best practices"
      },
      {
        title: "Continuous Learning",
        description: "Always exploring new technologies and improving my skills"
      },
      {
        title: "User-Focused",
        description: "Building features that solve real problems for users"
      }
    ] as const
  },

  personal: {
    name: "Muhammad Ahmad",
    title: "Computer Engineering Student",
    tagline: "Learning Backend Development & DevOps",
    bio: "I'm a 6th semester Computer Engineering student at COMSATS University, passionate about learning backend development and DevOps. Currently building projects to improve my skills in Node.js, Express, and cloud technologies while exploring the world of software engineering.",
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
      description:
        "Learning to build REST APIs with Node.js and Express, practicing with MongoDB and PostgreSQL databases through student projects",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      icon: "code" as const
    },
    {
      name: "DevOps Learning",
      description:
        "Exploring Docker containers, GitHub Actions for CI/CD, and learning cloud deployment basics with AWS and Oracle Cloud",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      icon: "cloud" as const
    },
    {
      name: "Edge Computing",
      description:"Exploring edge computing with devices like Jetson Nano, understanding distributed systems, and tackling the real-world challenges of deploying machine learning and computer vision solutions at the network edge",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      icon: "chip" as const
    },
    {
      name: "Problem Solving",
      description:
        "Practicing Data Structures & Algorithms on LeetCode and building projects to strengthen my programming fundamentals",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      icon: "lightbulb" as const
    }
  ],

  stats: [
    { label: "Current Semester", value: "6th" },
    { label: "Projects Built", value: "10+" },
    { label: "Technologies Learning", value: "17+" }
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
    greeting: "👋 Welcome to my learning journey",
    availability: {
      status: "Open to Internships & Learning",
      statusColor: "text-green-500",
      responseTime: "Within 24 hours",
      message: "Actively seeking internships and collaborative projects to learn from experienced developers. I'm eager to contribute, learn, and grow in a real-world engineering environment!"
    }
  },

  skills: {
    languages: [
      { name: "JavaScript", level: 65, icon: "js", category: "language" },
      { name: "Python", level: 55, icon: "python", category: "language" },
      { name: "C", level: 60, icon: "c", category: "language" },
      { name: "C++", level: 50, icon: "cpp", category: "language" },
      { name: "VHDL", level: 45, icon: "vhdl", category: "language" },
      { name: "SQL", level: 55, icon: "sql", category: "language" }
    ],
    backend: [
      { name: "Node.js", level: 40, icon: "nodejs", category: "backend" },
      { name: "Express.js", level: 40, icon: "express", category: "backend" },
      { name: "MongoDB", level: 40, icon: "mongodb", category: "backend" },
      { name: "RESTful APIs", level: 45, icon: "api", category: "backend" },
      { name: "Message Broker", level: 40, icon: "message-broker", category: "backend" },
      { name: "Nginx", level: 40, icon: "nginx", category: "backend" },
      { name: "Redis", level: 40, icon: "redis", category: "backend" }
      ],
    devops: [
      { name: "Docker", level: 40, icon: "docker", category: "devops" },
      { name: "GitHub Actions", level: 30, icon: "github", category: "devops" },
      { name: "AWS", level: 30, icon: "aws", category: "devops" },
      { name: "Linux", level: 60, icon: "linux", category: "devops" },
      { name: "Git", level: 50, icon: "git", category: "devops" }
    ],
    tools: [
      { name: "VS Code", level: 70, icon: "vscode", category: "tools" },
      { name: "Cursor", level: 60, icon: "cursor", category: "tools" },
      { name: "Claude AI", level: 65, icon: "claude", category: "tools" },
      { name: "GitHub Copilot", level: 55, icon: "copilot", category: "tools" },
      {name: "LaTeX", level: 50, icon: "latex", category: "tools"}

    ],
    hardware: [
      { name: "STM32", level: 50, icon: "stm32", category: "hardware" },
      { name: "Embedded Systems", level: 45, icon: "embedded", category: "hardware" },
      { name: "FPGA (VHDL)", level: 40, icon: "fpga", category: "hardware" },
      { name: "Microcontrollers", level: 55, icon: "micro", category: "hardware" }
    ]
  },

  projects: [
    {
      id: 1,
      title: "AI-Powered Event-Driven Medical Image Processing System for Cancer Cell Detection",
      description: "Developed a distributed event-driven microservices application for detection and analysis of cancer cells in medical images. Built the complete end-to-end pipeline including image upload, preprocessing, deep learning inference, and result processing, fully containerized with Docker. Integrated Ollama LLM on cloud and built an AI chatbot for interactive medical image analysis and query support.",
      technologies: ["Docker", "Kafka", "Redis", "OpenCV", "TensorFlow", "Ollama", "Python", "Node.js", "PostgreSQL"],
      github: "https://github.com/Muhammad-Ahmad17/cancer_cells",
      featured: true,
      demo: "/projects/cancer-cells.mp4"
    },
    {
      id: 2,
      title: "Full-Stack CRUD App with Automated CI/CD & Docker Containerization",
      description: "Engineered a complete DevOps-first application from conception to production.Implemented fully automated deployment pipeline using GitHub Actions, Docker, and Oracle Cloud Infrastructure. Every git push triggers containerized builds, registry pushes, and cloud deployment—reducing manual intervention to zero.",
      technologies: ["Docker", "GitHub Actions", "Oracle Cloud", "Node.js", "Express.js", "PostgreSQL", "React"],
      github: "https://github.com/Muhammad-Ahmad17/root",
      live: "https://cicd.aahmad.app/",
      demo: "/projects/cicd-oracle-githubaction.mp4",
      featured: true
    },
    {
      id: 3,
      title: "User Processing System",
      description: "A static website (React) with a serverless backend using AWS Lambda function (Node.js) triggered by API Gateway GET method to display records stored in DynamoDB. Demonstrates cloud infrastructure integration with AWS services.",
      technologies: ["React", "AWS Lambda", "API Gateway", "DynamoDB", "S3"],
      github: "https://github.com/Muhammad-Ahmad17/getApiForUserData",
      live: "http://user-processing-system-ahmad.s3-website-us-east-1.amazonaws.com/",
      featured: true
    },
    {
      id: 4,
      title: "Multi-Buyer & Vendor E-Commerce Platform",
      description: "A modular full-stack e-commerce web application with multi-role support (Buyer, Vendor). This project is designed using a 3-tier architecture with a modern frontend and robust backend, backed by database modeling.",
      technologies: ["React", "Node.js", "Express.js", "SQL Server", "Azure SQL Database"],
      github: "https://github.com/Muhammad-Ahmad17/E_Commerce",
      live: "https://e-commerce1-muhammad-ahmads-projects-1458b467.vercel.app/",
      featured: true
    },
    {
      id: 5,
      title: "Real-Time Smart Room Automation System",
      description: "An embedded systems project using STM32F407 microcontroller integrating RFID card access control, motion detection (IR & accelerometer), real-time temperature monitoring with LM35 sensor, automated lighting control, and intelligent fan management. Features multi-sensor data fusion, real-time LCD display feedback, and audio alert system via buzzer. Demonstrates IoT device integration with real-time processing capabilities.",
      technologies: ["STM32F407", "C/Embedded C", "HAL Library", "MFRC522 RFID", "LIS302DL Accelerometer", "LM35 Temperature Sensor", "I2C", "SPI", "ADC", "DMA", "ARM Cortex-M4F"],
      github: "https://github.com/Muhammad-Ahmad17/RealTimeSmartRoomAutomation",
      demo: "/projects/brokendemo.mp4",
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
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "COMSATS University Islamabad, Lahore Campus",
      period: "2023 - 2027",
      description: "Currently in 6th semester. Learning software engineering, data structures, algorithms, databases, and web technologies. Actively participating in coding clubs and tech events.",
      gpa: "3.6/4.0",
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