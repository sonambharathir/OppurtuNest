const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Load backend/.env using dotenv with the exact path
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 10 Manually curated real internship opportunities with rich, authentic details
 */
const curatedInternships = [
  {
    title: "Software Engineer Intern – Full Stack",
    organization: "Growati",
    category: "Internships",
    location: "Pune, India",
    workMode: "Remote / On-site",
    deadline: "Not specified",
    duration:
      "First month is an unpaid assessment internship; based on performance, the role can move into a paid internship and potentially a longer-term/full-time opportunity.",
    stipend: "₹5,000–₹15,000 listed on the current job listing.",
    eligibility:
      "No prior professional experience is required. Candidates should have strong JavaScript/TypeScript knowledge, good understanding of React and Node.js, basic knowledge of databases and REST APIs, and an ability to learn independently. Personal projects, GitHub work, portfolio projects, or open-source contributions are relevant.",
    description:
      "Growati is building an AI platform that automates YouTube post-production for creators, including thumbnails, titles, descriptions, chapters, and automation workflows. The intern will work on production-ready frontend and backend features, APIs, database schemas, debugging, AI integrations, automation workflows, and system design.",
    responsibilities: [
      "Build frontend and backend product features.",
      "Design APIs and database schemas.",
      "Debug issues and improve performance.",
      "Work with AI integrations and automation workflows.",
      "Contribute to architecture and system design.",
      "Ship product features with guidance and increasing ownership.",
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "REST APIs",
      "Databases",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "AI / LLMs",
    ],
    domains: [
      "Software Engineering",
      "Full-Stack Development",
      "Artificial Intelligence",
      "SaaS",
      "Developer Tools",
    ],
    roles: [
      "Software Engineering",
      "Full-Stack Development",
      "Backend Development",
      "Frontend Development",
      "AI Engineering",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4408827-software-engineer-intern-full-stack?autoOpenApplication=true",
    source: "Wellfound",
    platform: "Wellfound",
    lastChecked: "2026-09-28",
  },
  {
    title: "Backend Software Engineering Intern",
    organization: "Enterpret",
    category: "Internships",
    location: "Bengaluru, Karnataka, India",
    workMode: "On-site",
    deadline: "Not specified / rolling",
    duration: "6 months",
    stipend:
      "Competitive internship stipend; exact amount is not publicly specified in the listing.",
    eligibility:
      "Pursuing a Computer Science or Engineering degree. The current listing specifies a Tier 1 college requirement, strong programming fundamentals, at least one prior relevant engineering/backend/AI internship, and willingness to work on-site in Bengaluru.",
    description:
      "Enterpret builds an AI-native customer intelligence platform that turns large amounts of raw customer feedback into structured, queryable data. The intern will work on backend engineering, serverless AWS infrastructure, AI feature integrations, distributed systems, and real-time inference.",
    responsibilities: [
      "Participate in system design discussions.",
      "Build production backend solutions with guidance.",
      "Develop scalable backend components using AWS serverless architecture.",
      "Build proof-of-concepts connecting backend systems with AI models.",
      "Work with engineers on AI-native infrastructure.",
      "Debug and improve backend systems.",
    ],
    skills: [
      "AWS",
      "Backend Development",
      "Python",
      "Distributed Systems",
      "Serverless Architecture",
      "REST APIs",
      "AI / ML",
      "Natural Language Processing",
      "Debugging",
      "System Design",
      "Git",
    ],
    domains: [
      "Backend Engineering",
      "Artificial Intelligence",
      "Natural Language Processing",
      "Cloud Computing",
      "Distributed Systems",
      "Customer Intelligence",
    ],
    roles: [
      "Backend Engineering",
      "Software Engineering",
      "AI Engineering",
      "Cloud Engineering",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4573005-backend-onsite-software-engineering-intern",
    source: "Wellfound",
    platform: "Wellfound",
    lastChecked: "2026-09-28",
  },
  {
    title: "Frontend Development Intern – Mobile App Development",
    organization: "MAVR",
    category: "Internships",
    location: "Remote, India",
    workMode: "Remote",
    deadline: "Not specified",
    duration: "3 months",
    stipend: "Unpaid for the first 3 months according to the listing.",
    eligibility:
      "Students pursuing Diploma, Bachelor's, or Master's degrees in Computer Science, Information Technology, Software Engineering, or related fields. Recent graduates and self-taught developers with a strong interest in application development are also encouraged to apply.",
    description:
      "MAVR is looking for an intern to work on frontend and mobile application development. The role includes building application interfaces, converting UI/UX designs into functional screens, integrating APIs, debugging, testing, and learning modern software engineering workflows.",
    responsibilities: [
      "Develop mobile application interfaces.",
      "Convert UI/UX designs into functional screens.",
      "Build reusable frontend components.",
      "Integrate frontend applications with APIs and backend services.",
      "Debug and optimize applications.",
      "Participate in code reviews and team discussions.",
      "Work with Git and modern development workflows.",
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "React Native",
      "PostgreSQL",
      "Postman",
      "APIs",
      "Git",
      "Responsive Design",
      "MERN Stack",
      "MongoDB",
      "Express.js",
      "Node.js",
    ],
    domains: [
      "Frontend Development",
      "Mobile App Development",
      "Full-Stack Development",
      "Software Engineering",
      "Product Development",
    ],
    roles: [
      "Frontend Development",
      "Mobile Development",
      "React Development",
      "React Native Development",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4704098-frontend-development-intern-mobile-app-development",
    source: "Wellfound",
    platform: "Wellfound",
    lastChecked: "2026-09-28",
  },
  {
    title: "Software/Product Engineering Intern",
    organization: "Matiks",
    category: "Internships",
    location: "Bengaluru, Karnataka, India",
    workMode: "On-site / In-office",
    deadline: "Not specified",
    duration: "Not specified",
    stipend:
      "₹6,00,000 listed on the current Wellfound listing. Preserve this exactly as the listing's compensation information rather than converting or estimating it.",
    eligibility:
      "No professional experience is required according to the listing. Candidates should have strong product-engineering instincts, be able to reason about system design and scalability, and be willing to work from the Bengaluru office.",
    description:
      "Matiks is building a real-time competitive math platform with live 1v1 duels, tournaments, and a large user community. Interns work directly with the product engineering team on real product features and real-time systems.",
    responsibilities: [
      "Build and ship product features.",
      "Work on real-time multiplayer systems.",
      "Contribute to backend services.",
      "Work with scalable system architecture.",
      "Think about product experience, edge cases, and performance.",
      "Collaborate with founders and senior engineers.",
    ],
    skills: [
      "React.js",
      "Go / Golang",
      "AWS",
      "React Native",
      "GCP",
      "WebSockets",
      "BigQuery",
      "System Design",
      "Real-Time Systems",
    ],
    domains: [
      "Software Engineering",
      "Product Engineering",
      "Cloud Computing",
      "Real-Time Systems",
      "Mobile Development",
      "Gaming Technology",
    ],
    roles: [
      "Software Engineering",
      "Product Engineering",
      "Backend Engineering",
      "Full-Stack Development",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4523214-software-product-engineering-intern",
    source: "Wellfound",
    platform: "Wellfound",
    lastChecked: "2026-09-28",
  },
  {
    title: "AI Software Engineering Intern",
    organization: "Fluexy",
    category: "Internships",
    location: "India",
    workMode: "Remote",
    deadline: "Not specified",
    duration: "3 months",
    stipend:
      "₹5,000–₹10,000 listed on the current listing, plus the listing mentions separate AI subscriptions.",
    eligibility:
      "The listing requests around 1 year of experience and asks candidates to be able to manage a full-time internship commitment for the duration. Candidates should have experience shipping production code and be comfortable with Python, JavaScript/TypeScript, React/Next.js, FastAPI, PostgreSQL, REST APIs, and AI/LLM technologies.",
    description:
      "Fluexy is building a decision-intelligence and simulation platform. The intern will work on production software, AI integrations, automation workflows, backend systems, and AI-agent/LLM-related technologies in a remote startup environment.",
    responsibilities: [
      "Build and ship production software.",
      "Work on frontend and backend systems.",
      "Develop APIs and integrations.",
      "Work with AI/LLM systems and agents.",
      "Contribute to cloud deployment.",
      "Take ownership of technical problems end-to-end.",
    ],
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
      "LLMs",
      "AI Agents",
      "AWS",
      "Vercel",
      "Modal",
    ],
    domains: [
      "Artificial Intelligence",
      "Software Engineering",
      "AI Agents",
      "SaaS",
      "Decision Intelligence",
      "Cloud Computing",
    ],
    roles: [
      "AI Engineering",
      "Software Engineering",
      "Full-Stack Development",
      "Backend Engineering",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4683437-ai-software-engineering-intern",
    source: "Wellfound",
    platform: "Wellfound",
    lastChecked: "2026-09-28",
  },
  {
    title: "Backend Intern",
    organization: "MikeLegal",
    category: "Internships",
    location: "India",
    workMode: "Remote",
    deadline: "Not specified",
    duration: "Not specified",
    stipend: "₹10,000–₹12,000 listed on the current Wellfound listing.",
    eligibility:
      "The listing specifically seeks a third-year engineering student. Candidates should have Python and Django knowledge and should be able to discuss existing projects or technical work. Git/GitHub familiarity is relevant.",
    description:
      "MikeLegal builds software that helps law firms and in-house legal teams automate legal processes. The backend role involves working on software infrastructure supporting document processing, permissions, multi-tenant systems, and audit trails.",
    responsibilities: [
      "Contribute to backend software development.",
      "Work on backend systems and APIs.",
      "Build and improve software used by legal teams.",
      "Work with data processing workflows.",
      "Improve reliability and maintainability.",
      "Contribute through readable, testable code.",
    ],
    skills: [
      "Python",
      "Django",
      "SQL",
      "Git",
      "GitHub",
      "Backend Development",
      "APIs",
      "Databases",
    ],
    domains: [
      "Backend Engineering",
      "Legal Technology",
      "Artificial Intelligence",
      "SaaS",
      "Software Engineering",
    ],
    roles: [
      "Backend Development",
      "Software Engineering",
      "Python Development",
    ],
    applicationUrl: "https://wellfound.com/jobs/2657129-backend-intern",
    source: "Wellfound",
    platform: "Wellfound",
    lastChecked: "2026-09-28",
  },
  {
    title: "IT Administrator Intern",
    organization: "Josys",
    category: "Internships",
    location: "Bengaluru, Karnataka, India",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "6 months",
    stipend: "₹30,000 per month",
    eligibility:
      "Bachelor's degree or diploma in IT, Computer Science, or a related field, according to the listing.",
    description:
      "Josys is an identity security and governance platform. The IT Administrator Intern works with the internal IT team on employee support, IT assets, endpoint support, software and hardware configuration, networking, troubleshooting, and IT operations.",
    responsibilities: [
      "Support employees with IT issues.",
      "Install and configure computers and software.",
      "Maintain IT assets and peripherals.",
      "Troubleshoot technical problems.",
      "Support endpoint and internal IT operations.",
      "Help improve IT administration processes.",
    ],
    skills: [
      "IT Administration",
      "Hardware",
      "Operating Systems",
      "Networking",
      "Troubleshooting",
      "Endpoint Support",
      "Asset Management",
      "Software Configuration",
    ],
    domains: [
      "IT Administration",
      "Information Technology",
      "Enterprise IT",
      "Identity and Security",
    ],
    roles: [
      "IT Administration",
      "IT Support",
      "Systems Administration",
      "Technical Support",
    ],
    applicationUrl:
      "https://jobs.ashbyhq.com/josys/83229282-68cb-475c-8948-f293850e8657",
    source: "Ashby",
    platform: "Josys Careers",
    lastChecked: "2026-09-28",
  },
  {
    title: "AI Engineer Intern",
    organization: "Meraki-Labs",
    category: "Internships",
    location: "Bengaluru, Karnataka, India",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "Not specified",
    stipend: "Not specified",
    eligibility:
      "The employer listing targets students pursuing degrees in Computer Science, Information Technology, Computer Engineering, AI/ML, AI/Data Science, or related areas. The role emphasizes strong academic performance, a public GitHub profile, demonstrable proof of work, and practical AI/ML experience. The listing also references students from selected leading institutions.",
    description:
      "Meraki Labs is a technology company and startup studio working on AI-driven products. The intern will assist with AI model and application development, data preparation, experimentation, product integration, research, code reviews, and technical documentation.",
    responsibilities: [
      "Assist in designing and developing AI models and applications.",
      "Research current AI/ML developments.",
      "Help integrate AI systems into products.",
      "Collect, preprocess, and analyze data.",
      "Participate in code reviews.",
      "Document technical work.",
      "Support AI product development.",
    ],
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "LLMs",
      "RAG",
      "AI Agents",
      "Model Evaluation",
      "Fine-Tuning",
      "Machine Learning",
      "Data Processing",
      "GitHub",
    ],
    domains: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Natural Language Processing",
      "AI Agents",
      "Research & Development",
    ],
    roles: [
      "AI Engineering",
      "Machine Learning Engineering",
      "AI Research",
      "Software Engineering",
    ],
    applicationUrl:
      "https://jobs.ashbyhq.com/Meraki-Labs/93ff65d2-f0cd-4fd1-b76f-b2e350f2d6c8",
    source: "Ashby",
    platform: "Meraki-Labs Careers",
    lastChecked: "2026-09-28",
  },
  {
    title: "HR Intern",
    organization: "SPAN",
    category: "Internships",
    location: "Bengaluru, Karnataka, India",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "6 months",
    stipend: "₹20,000 per month",
    eligibility:
      "The current listing does not provide a detailed degree-specific eligibility requirement. Do not invent one.",
    description:
      "SPAN is working on electrification products and technologies designed to support lower-carbon and more resilient energy systems. The HR Intern will support HR activities, especially talent acquisition, in SPAN's Bengaluru team.",
    responsibilities: [
      "Support talent acquisition activities.",
      "Assist with HR operations.",
      "Coordinate HR-related tasks.",
      "Manage multiple tasks in a fast-paced environment.",
      "Communicate with candidates and team members.",
    ],
    skills: [
      "Communication",
      "Talent Acquisition",
      "HR Operations",
      "Coordination",
      "Organization",
      "Interpersonal Skills",
    ],
    domains: [
      "Human Resources",
      "Talent Acquisition",
      "Clean Energy",
      "Climate Technology",
    ],
    roles: [
      "Human Resources",
      "Talent Acquisition",
      "HR Operations",
    ],
    applicationUrl:
      "https://jobs.ashbyhq.com/span/1a44454a-c4eb-4a73-8f5b-7d3b921c0c1f/",
    source: "Ashby",
    platform: "SPAN Careers",
    lastChecked: "2026-09-28",
  },
  {
    title: "Software Development Engineer Intern – Jan 2027 (6 month)",
    organization: "Amazon",
    category: "Internships",
    location: "Bengaluru, Karnataka, India",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "6 months",
    stipend: "Not specified",
    eligibility:
      "Bachelor's degree or above in Computer Science, Computer Engineering, or a related field. The program is for students graduating in 2027 according to the opportunity record.",
    description:
      "Amazon's six-month Software Development Engineer Internship in Bengaluru gives students the opportunity to work on software systems, cloud services, and customer-facing products at large scale. Interns can take ownership of engineering work and collaborate with experienced engineers.",
    responsibilities: [
      "Design and develop software solutions.",
      "Work with scalable systems and cloud services.",
      "Write maintainable production-quality code.",
      "Participate in technical discussions and code reviews.",
      "Work with distributed/cloud-native systems.",
      "Debug and troubleshoot software.",
      "Collaborate with engineers and cross-functional teams.",
    ],
    skills: [
      "Java",
      "Python",
      "C++",
      "C#",
      "Go",
      "Data Structures",
      "Algorithms",
      "Object-Oriented Programming",
      "Software Engineering",
      "Cloud Computing",
    ],
    domains: [
      "Software Engineering",
      "Cloud Computing",
      "Distributed Systems",
      "Web Services",
      "Artificial Intelligence / Technology",
    ],
    roles: [
      "Software Engineering",
      "Backend Engineering",
      "Full-Stack Development",
      "Cloud Engineering",
    ],
    applicationUrl:
      "https://www.amazon.jobs/en/jobs/10517894/software-development-engineer-intern-jan-2027-6-month-amazon-university-talent-acquisition",
    source: "Amazon Jobs",
    platform: "Amazon Careers",
    lastChecked: "2026-09-28",
  },
];

function generateStableId(source, title) {
  const hash = crypto
    .createHash("sha256")
    .update(`${source}:${title}`)
    .digest("hex")
    .slice(0, 16);
  const cleanSource = source.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `curated-${cleanSource}-${hash}`;
}

async function run() {
  console.log("=== OppurtuNest Curated Internships Importer / Updater ===");

  try {
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial total opportunities: ${initialTotal}`);

    let insertedCount = 0;
    let updatedCount = 0;

    for (const item of curatedInternships) {
      const stableId = generateStableId(item.source, item.title);

      const recordData = {
        id: stableId,
        title: item.title,
        category: "Internships",
        organization: item.organization,
        organizer: item.organization,
        location: item.location,
        workMode: item.workMode,
        mode: item.workMode,
        deadline: item.deadline,
        duration: item.duration,
        stipend: item.stipend,
        eligibility: item.eligibility,
        description: item.description,
        responsibilities: item.responsibilities,
        domain: item.domains[0] || "",
        domains: item.domains,
        roles: item.roles,
        skills: item.skills,
        source: item.source,
        platform: item.platform,
        applicationUrl: item.applicationUrl,
        lastChecked: item.lastChecked,
      };

      const existing = await Opportunity.findOne({
        $or: [
          { id: stableId },
          { applicationUrl: item.applicationUrl },
          { title: item.title, category: "Internships" },
        ],
      });

      if (existing) {
        await Opportunity.updateOne({ _id: existing._id }, { $set: recordData });
        updatedCount++;
      } else {
        await Opportunity.create(recordData);
        insertedCount++;
      }
    }

    console.log("\n=== Insertion / Upsert Summary ===");
    console.log(`Number inserted: ${insertedCount}`);
    console.log(`Number updated:  ${updatedCount}`);

    const totalAfter = await Opportunity.countDocuments();
    console.log(`Total opportunities after import: ${totalAfter}`);

    const totalInternships = await Opportunity.countDocuments({ category: "Internships" });
    console.log(`Total 'Internships' in DB: ${totalInternships}`);

  } catch (error) {
    console.error("Import failed:", error.message);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.connection.close();
      console.log("\nMongoDB connection closed cleanly.");
    } catch (closeErr) {
      console.error("Error closing connection:", closeErr.message);
    }
  }
}

run();
