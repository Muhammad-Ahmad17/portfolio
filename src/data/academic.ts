import { freelance } from "./freelance";
import { person } from "./person";

export type ArtKind = "embedded" | "pipeline" | "deploy" | "shop" | "cloud";
export type Track = "systems" | "software";

export type ProjectLink = { label: string; href: string };

export type AcademicProject = {
  index: string;
  title: string;
  domain: string;
  summary: string;
  tags: readonly string[];
  links: readonly ProjectLink[];
  art: ArtKind;
  track: Track;
};

export type SkillItem = { name: string; note: string };
export type SkillGroup = {
  title: string;
  icon: "code" | "chip" | "server" | "cloud" | "tools";
  blurb: string;
  items: readonly SkillItem[];
};

export const academic = {
  role: "Computer Engineer",
  institution: "COMSATS University Islamabad, Lahore Campus",
  program: "Bachelor of Computer Engineering",
  period: "2023 — 2027",
  semester: "Seventh semester",
  semesterNumber: 7,
  semesterTotal: 8,
  cgpa: "3.54 / 4.0",
  lede: "I am in my seventh semester of computer engineering at COMSATS Lahore. The work is the whole machine: C and VHDL underneath, boards on the bench, and, in parallel, the software engineering that those boards finally talk to.",
  quote: "Every day is a chance to learn something deeper about systems, code, and scale.",
  availability: "Seventh semester · open to internships",
  github: person.social.github,
  values: [
    {
      title: "Systems thinking",
      text: "I don't stop at a single function. I want to see how the pins, the process, and the data share one machine.",
    },
    {
      title: "Debug the whole path",
      text: "A fault can sit in a register, a query, or a wire. I treat it as one investigation.",
    },
    {
      title: "Own the stack",
      text: "From the board on the desk to the service in the cloud, I would rather understand the path than rent it.",
    },
  ],
  study: [
    {
      word: "Logic.",
      note: "VHDL, gates, and the FPGA that has to mean what the schematic says.",
    },
    {
      word: "Hardware.",
      note: "STM32, ESP32, Jetson Nano, and time that does not wait for a framework.",
    },
    {
      word: "Systems.",
      note: "Pipelines, queues, and a machine that keeps more than one job in the air.",
    },
    {
      word: "Software.",
      note: "Backends and cloud, the layer that gives the hardware somewhere to report.",
    },
  ],
  education: [
    {
      period: "2023 — 2027",
      title: "Bachelor of Computer Engineering",
      place: "COMSATS University Islamabad, Lahore Campus",
      meta: "In progress · seventh semester · CGPA 3.54 / 4.0",
      text: "A general computer engineering degree: digital design, embedded systems, networks, and the software that sits on the same problems.",
    },
    {
      period: "2021 — 2023",
      title: "FSc, Pre-Engineering",
      place: "Punjab College of Science, Ferozpur Road, Lahore",
      meta: "Completed · grade A",
      text: "Intermediate study in mathematics, physics, and computer science.",
    },
  ],
  bench: [
    { name: "STM32F407", note: "ARM Cortex-M4F · HAL · I2C, SPI, ADC, DMA" },
    { name: "ESP32", note: "Wi-Fi and Bluetooth microcontroller for connected devices" },
    { name: "Jetson Nano", note: "Edge computing, machine learning and vision at the edge" },
    { name: "IoT cloud", note: "Devices publishing sensor data to a cloud backend and dashboard" },
    { name: "FPGA", note: "VHDL, simulated and synthesized" },
  ],
  projects: [
    {
      index: "01",
      title: "Real-time smart room on the STM32F407",
      domain: "Embedded systems",
      summary:
        "RFID entry, motion from an IR sensor and an accelerometer, temperature from an LM35, lights, a fan, an LCD, and a buzzer. Written in C against the HAL, with the sensors fused in real time on I2C, SPI, ADC, and DMA.",
      tags: ["STM32F407", "Embedded C", "HAL", "MFRC522 RFID", "LIS302DL", "LM35", "I2C", "SPI", "ADC", "DMA"],
      links: [
        { label: "Source", href: "https://github.com/Muhammad-Ahmad17/RealTimeSmartRoomAutomation" },
      ],
      art: "embedded",
      track: "systems",
    },
    {
      index: "02",
      title: "Cancer-cell imaging pipeline",
      domain: "Distributed systems · AI",
      summary:
        "An event-driven pipeline for medical images: upload, preprocessing, TensorFlow inference, and an Ollama chatbot for questions about the result. Containerized and running on Oracle Cloud, with Kafka, Redis, OpenCV, and PostgreSQL between the stages.",
      tags: ["Python", "TensorFlow", "OpenCV", "Kafka", "Redis", "PostgreSQL", "Ollama", "Docker", "Oracle Cloud", "Node.js"],
      links: [
        { label: "Source", href: "https://github.com/Muhammad-Ahmad17/cancer_cells" },
        { label: "Demo", href: "/projects/cancer-cells.webm" },
      ],
      art: "pipeline",
      track: "systems",
    },
    {
      index: "03",
      title: "CRUD app with an automated deploy",
      domain: "Cloud · DevOps",
      summary:
        "The deploy is the project. On every push GitHub Actions builds the Docker image, pushes it to a registry, and ships it to Oracle Cloud, with no manual step. Nginx in front, Node and Express behind, PostgreSQL for the data.",
      tags: ["Oracle Cloud", "Docker", "GitHub Actions", "Nginx", "Node.js", "Express", "PostgreSQL", "React"],
      links: [
        { label: "Live", href: "https://cicd.aahmad.app/" },
        { label: "Source", href: "https://github.com/Muhammad-Ahmad17/root" },
      ],
      art: "deploy",
      track: "software",
    },
    {
      index: "04",
      title: "Multi-buyer, multi-vendor e-commerce platform",
      domain: "Full-stack",
      summary:
        "Buyer and vendor roles, authentication, orders, and a REST API, set out as three tiers: React on the front, Node and Express in the middle, and Azure SQL for the records, designed from the data model up.",
      tags: ["React", "Node.js", "Express", "SQL Server", "Azure SQL"],
      links: [
        { label: "Live", href: "https://e-commerce1-muhammad-ahmads-projects-1458b467.vercel.app/" },
        { label: "Source", href: "https://github.com/Muhammad-Ahmad17/E_Commerce" },
      ],
      art: "shop",
      track: "software",
    },
    {
      index: "05",
      title: "Serverless user processing system",
      domain: "Cloud",
      summary:
        "A static site on S3. API Gateway calls a Node.js Lambda function, which reads records from DynamoDB. Four AWS pieces wired end to end to understand how the serverless path actually fits together.",
      tags: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "Node.js"],
      links: [
        { label: "Live", href: "http://user-processing-system-ahmad.s3-website-us-east-1.amazonaws.com/" },
        { label: "Source", href: "https://github.com/Muhammad-Ahmad17/getApiForUserData" },
      ],
      art: "cloud",
      track: "software",
    },
  ] satisfies AcademicProject[],
  parallel: {
    kicker: "In parallel",
    title: "Software, running beside the degree.",
    lede: "I never studied hardware in isolation. Since the first semesters I have built software at the same time: backends, cloud deploys, and now work for real clients. Two tracks, one timeline.",
    degree: {
      label: "The degree",
      points: ["Digital design and VHDL", "STM32, ESP32, Jetson Nano", "Embedded and edge systems"],
    },
    software: {
      label: "The software",
      points: ["Node.js, React, PostgreSQL", "Docker, CI/CD, AWS, Oracle Cloud", "Freelance and internship work"],
    },
    entries: [
      {
        period: "2023 — now",
        title: "Full-stack and cloud projects",
        text: "A CI/CD pipeline, an e-commerce platform, and a serverless AWS system, all built during semesters and listed under software on the projects page.",
        to: "/academic/projects#software",
        cta: "See the software projects",
      },
      {
        period: freelance.experience.period,
        title: `${freelance.experience.title}, ${freelance.experience.company}`,
        text: freelance.experience.text,
        to: "/freelance",
        cta: "Freelance side",
      },
      {
        period: "Now",
        title: freelance.project.title,
        text: "A client storefront built and shipped while in the seventh semester. The full client work lives on the freelance side.",
        to: "/freelance/work",
        cta: "See the client work",
      },
    ],
  },
  skills: [
    {
      title: "Languages",
      icon: "code",
      blurb: "The ones I reach for first.",
      items: [
        { name: "C", note: "Coursework · embedded" },
        { name: "C++", note: "Coursework" },
        { name: "VHDL", note: "Digital design" },
        { name: "Python", note: "Imaging pipeline" },
        { name: "JavaScript", note: "Backend · front end" },
        { name: "SQL", note: "Databases" },
      ],
    },
    {
      title: "Hardware",
      icon: "chip",
      blurb: "Boards and silicon from the lab and the desk.",
      items: [
        { name: "STM32", note: "Smart room project" },
        { name: "ESP32", note: "Wi-Fi and IoT" },
        { name: "Jetson Nano", note: "Edge computing" },
        { name: "FPGA (VHDL)", note: "Lab" },
        { name: "Embedded systems", note: "Lab" },
        { name: "I2C, SPI, ADC, DMA", note: "Peripherals" },
      ],
    },
    {
      title: "Backend",
      icon: "server",
      blurb: "Services and the data behind them.",
      items: [
        { name: "Node.js", note: "Services" },
        { name: "Express", note: "REST APIs" },
        { name: "PostgreSQL", note: "Relational data" },
        { name: "MongoDB", note: "Practicing" },
        { name: "SQL Server", note: "E-commerce platform" },
        { name: "Redis", note: "Imaging pipeline" },
        { name: "Kafka", note: "Imaging pipeline" },
        { name: "Nginx", note: "Reverse proxy" },
      ],
    },
    {
      title: "Cloud & delivery",
      icon: "cloud",
      blurb: "Where it runs and how it gets there.",
      items: [
        { name: "AWS", note: "Lambda · API Gateway · DynamoDB · S3" },
        { name: "Oracle Cloud", note: "Two deployed projects" },
        { name: "Docker", note: "Containers" },
        { name: "GitHub Actions", note: "CI/CD" },
        { name: "Linux", note: "Daily" },
        { name: "Git", note: "Daily" },
      ],
    },
    {
      title: "Tools",
      icon: "tools",
      blurb: "What sits on the desk.",
      items: [
        { name: "VS Code", note: "Editor" },
        { name: "Cursor", note: "AI editor" },
        { name: "LaTeX", note: "Writing" },
        { name: "LeetCode", note: "Practice" },
      ],
    },
  ] satisfies SkillGroup[],
  contact: person,
};
