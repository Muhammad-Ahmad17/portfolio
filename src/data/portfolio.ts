export const portfolioData = {
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
      description: "Learning to build REST APIs with Node.js and Express, practicing with MongoDB and PostgreSQL databases through student projects",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      name: "DevOps Learning",
      description: "Exploring Docker containers, GitHub Actions for CI/CD, and learning cloud deployment basics with AWS and Vercel",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Database Design",
      description: "Studying database fundamentals, practicing query optimization, and learning the differences between SQL and NoSQL databases",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      name: "Problem Solving",
      description: "Practicing Data Structures & Algorithms on LeetCode and building projects to strengthen my programming fundamentals",
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
      { name: "SQL", level: 60, icon: "sql", category: "backend" },
      { name: "RESTful APIs", level: 45, icon: "api", category: "backend" }
    ],
    frontend: [
      { name: "React", level: 60, icon: "react", category: "frontend" },
      { name: "Next.js", level: 40, icon: "nextjs", category: "frontend" },
      { name: "Tailwind CSS", level: 65, icon: "tailwind", category: "frontend" },
      { name: "HTML/CSS", level: 70, icon: "html", category: "frontend" },
      { name: "Framer Motion", level: 45, icon: "framer", category: "frontend" }
    ],
    devops: [
      { name: "Docker", level: 40, icon: "docker", category: "devops" },
      { name: "GitHub Actions", level: 30, icon: "github", category: "devops" },
      { name: "AWS", level: 30, icon: "aws", category: "devops" },
      { name: "Vercel", level: 55, icon: "vercel", category: "devops" },
      { name: "Linux", level: 60, icon: "linux", category: "devops" },
      { name: "Git", level: 50, icon: "git", category: "devops" }
    ],
    tools: [
      { name: "VS Code", level: 70, icon: "vscode", category: "tools" },
      { name: "Figma", level: 50, icon: "figma", category: "tools" },
      { name: "Postman", level: 65, icon: "postman", category: "tools" },
      { name: "MongoDB Compass", level: 60, icon: "mongodb", category: "tools" },
      { name: "Chrome DevTools", level: 55, icon: "chrome", category: "tools" }
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
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and TypeScript. Features dark/light theme switching, smooth animations with Framer Motion, a blog system with markdown support, and a fully customizable color picker. Showcases my projects, skills, and experience with an elegant UI/UX design.",
      image: "/projects/portfolio.jpg",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/Muhammad-Ahmad17/portfolio",
      live: "https://aahmad.app",
      featured: true
    },
    {
      id: 3,
      title: "User Processing System",
      description: "A static website (React) with a serverless backend using AWS Lambda function (Node.js) triggered by API Gateway GET method to display records stored in DynamoDB. Demonstrates cloud infrastructure integration with AWS services.",
      image: "/projects/aws-project.jpg",
      technologies: ["React", "AWS Lambda", "API Gateway", "DynamoDB", "S3"],
      github: "https://github.com/Muhammad-Ahmad17/getApiForUserData",
      live: "http://user-processing-system-ahmad.s3-website-us-east-1.amazonaws.com/",
      featured: true
    },
    {
      id: 4,
      title: "Real-Time Smart Room Automation System",
      description: "An embedded systems project using STM32F407 microcontroller integrating RFID card access control, motion detection (IR & accelerometer), real-time temperature monitoring with LM35 sensor, automated lighting control, and intelligent fan management. Features multi-sensor data fusion, real-time LCD display feedback, and audio alert system via buzzer. Demonstrates IoT device integration with real-time processing capabilities.",
      image: "/projects/smart-room-automation.jpg",
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