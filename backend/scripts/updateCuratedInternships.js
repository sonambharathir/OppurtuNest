const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 10 Curated Real Internships with exact user-specified details
 */
const updatedInternships = [
  {
    title: "Software Engineer Intern – Full Stack",
    organization: "Growati",
    category: "Internships",
    location: "Pune",
    workMode: "Remote / flexible",
    deadline: "Not specified",
    duration:
      "Initial 1-month assessment, followed by paid internship/full-time opportunity based on performance",
    stipend: "₹5,000–₹15,000 after the assessment period",
    eligibility: "No prior professional experience required",
    description:
      "Full-stack software engineering internship involving frontend and backend product development.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "REST APIs",
      "databases",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "AI/LLM",
    ],
    domains: [
      "Software Engineering",
      "Full-Stack Development",
      "Web Development",
      "AI",
    ],
    roles: ["Software Engineer", "Full-Stack Developer", "Web Developer"],
    applicationUrl:
      "https://wellfound.com/jobs/4408827-software-engineer-intern-full-stack?autoOpenApplication=true",
    source: "Wellfound",
    platform: "Wellfound",
  },
  {
    title: "Backend Software Engineering Intern",
    organization: "Enterpret",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "Internship",
    stipend: "Competitive; exact amount not specified",
    eligibility:
      "Students pursuing Computer Science/Engineering. The listing asks for strong programming fundamentals and prior relevant engineering, backend, or AI internship experience.",
    description:
      "Backend engineering role involving backend systems, distributed systems, serverless technologies and AI-related engineering.",
    skills: [
      "Programming fundamentals",
      "backend engineering",
      "AWS",
      "distributed systems",
      "serverless systems",
      "AI",
    ],
    domains: [
      "Backend Engineering",
      "Distributed Systems",
      "Cloud Computing",
      "AI",
    ],
    roles: ["Backend Engineer", "Software Engineer"],
    applicationUrl:
      "https://wellfound.com/jobs/4573005-backend-onsite-software-engineering-intern",
    source: "Wellfound",
    platform: "Wellfound",
  },
  {
    title: "Frontend Development Intern – Mobile App Development",
    organization: "MAVR",
    category: "Internships",
    location: "India",
    workMode: "Remote",
    deadline: "Not specified",
    duration: "3 months",
    stipend: "First 3 months unpaid according to the listing",
    eligibility:
      "Diploma, Bachelor's or Master's students in CS, IT, Software Engineering or related fields. Recent graduates and self-taught developers are also encouraged.",
    description:
      "Frontend and mobile-development internship involving web/mobile applications, APIs, databases and product interfaces.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "PostgreSQL",
      "Postman",
      "Git",
      "APIs",
      "UI/UX",
      "MERN",
    ],
    domains: [
      "Frontend Development",
      "Mobile Development",
      "Software Engineering",
    ],
    roles: [
      "Frontend Developer",
      "React Developer",
      "React Native Developer",
      "Software Developer",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4704098-frontend-development-intern-mobile-app-development",
    source: "Wellfound",
    platform: "Wellfound",
  },
  {
    title: "Software/Product Engineering Intern",
    organization: "Matiks",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "Internship",
    stipend: "Listing currently shows ₹6L–₹6L in its compensation field",
    eligibility: "No experience required according to the listing",
    description:
      "Product-engineering internship focused on real-time multiplayer experiences and modern frontend, backend and cloud technologies.",
    responsibilities: [
      "Real-time multiplayer development",
      "WebSockets",
      "backend systems",
      "cloud infrastructure",
      "product engineering",
    ],
    skills: [
      "React.js",
      "React Native",
      "Go",
      "AWS",
      "GCP",
      "WebSockets",
      "GKE",
      "BigQuery",
    ],
    domains: [
      "Software Engineering",
      "Product Engineering",
      "Cloud Computing",
      "Mobile Development",
      "Real-Time Systems",
    ],
    roles: [
      "Software Engineer",
      "Product Engineer",
      "Frontend Engineer",
      "Backend Engineer",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4523214-software-product-engineering-intern",
    source: "Wellfound",
    platform: "Wellfound",
  },
  {
    title: "AI Software Engineering Intern",
    organization: "Fluexy",
    category: "Internships",
    location: "India",
    workMode: "Remote",
    deadline: "Not specified",
    duration: "3 months",
    stipend: "₹5,000–₹10,000 + AI subscriptions",
    eligibility:
      "Listing requests around 1 year of experience and full-time commitment",
    description:
      "AI-focused software engineering internship covering modern web development, backend engineering, LLMs, AI agents and cloud deployment.",
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
      "Cloud Deployment",
    ],
    domains: [
      "Artificial Intelligence",
      "Software Engineering",
      "Web Development",
      "Backend Engineering",
    ],
    roles: [
      "AI Engineer",
      "Software Engineer",
      "Full-Stack Developer",
      "AI/ML Engineer",
    ],
    applicationUrl:
      "https://wellfound.com/jobs/4683437-ai-software-engineering-intern",
    source: "Wellfound",
    platform: "Wellfound",
  },
  {
    title: "Backend Intern",
    organization: "MikeLegal",
    category: "Internships",
    location: "India",
    workMode: "Remote",
    deadline: "Not specified",
    duration: "Internship",
    stipend: "₹10,000–₹12,000",
    eligibility: "Third-year B.E./B.Tech engineering students",
    description:
      "Backend engineering internship working on software within a legal-technology environment.",
    skills: [
      "Python",
      "Django",
      "SQL",
      "Git",
      "GitHub",
      "Backend Development",
    ],
    domains: [
      "Backend Engineering",
      "Software Engineering",
      "Legal Technology",
    ],
    roles: ["Backend Developer", "Software Engineer", "Python Developer"],
    applicationUrl: "https://wellfound.com/jobs/2657129-backend-intern",
    source: "Wellfound",
    platform: "Wellfound",
  },
  {
    title: "IT Administrator Intern",
    organization: "Josys",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "6 months",
    stipend: "₹30,000/month",
    eligibility:
      "Bachelor's degree or diploma in IT, Computer Science or related field",
    description:
      "IT administration internship involving hardware, operating systems, networking, troubleshooting and endpoint support.",
    skills: [
      "IT Administration",
      "Hardware",
      "Operating Systems",
      "Networking",
      "Troubleshooting",
      "Endpoint Support",
    ],
    domains: [
      "IT Infrastructure",
      "IT Administration",
      "Networking",
      "Technical Support",
    ],
    roles: ["IT Administrator", "IT Support", "IT Operations"],
    applicationUrl:
      "https://jobs.ashbyhq.com/josys/83229282-68cb-475c-8948-f293850e8657",
    source: "Ashby",
    platform: "Josys Careers",
  },
  {
    title: "AI Engineer Intern",
    organization: "Meraki-Labs",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "Internship",
    stipend: "Not specified",
    eligibility:
      "Students pursuing CS, IT, Computer Engineering, AI/ML, AI/DS or related fields. The listing also asks for strong academic performance, public GitHub/proof of work and AI/ML experience.",
    description:
      "AI-engineering internship focused on practical machine-learning and modern generative-AI development.",
    skills: [
      "Python",
      "AI/ML",
      "TensorFlow",
      "PyTorch",
      "LLMs",
      "RAG",
      "AI Agents",
      "Model Evaluation",
      "Fine-tuning",
    ],
    domains: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "LLMs",
      "AI Agents",
    ],
    roles: ["AI Engineer", "Machine Learning Engineer", "AI/ML Engineer"],
    applicationUrl:
      "https://jobs.ashbyhq.com/Meraki-Labs/93ff65d2-f0cd-4fd1-b76f-b2e350f2d6c8",
    source: "Ashby",
    platform: "Meraki-Labs Careers",
  },
  {
    title: "HR Intern",
    organization: "SPAN",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "6 months",
    stipend: "₹20,000/month",
    eligibility:
      "The current listing does not specify a particular degree requirement.",
    description:
      "Human-resources internship focused on talent acquisition and HR operations.",
    skills: [
      "Communication",
      "Talent Acquisition",
      "HR Operations",
      "Recruitment",
      "People Operations",
    ],
    domains: [
      "Human Resources",
      "Talent Acquisition",
      "Recruitment",
      "People Operations",
    ],
    roles: ["HR Intern", "Talent Acquisition Intern", "HR Operations Intern"],
    applicationUrl:
      "https://jobs.ashbyhq.com/span/1a44454a-c4eb-4a73-8f5b-7d3b921c0c1f/",
    source: "Ashby",
    platform: "SPAN Careers",
  },
  {
    title: "Software Development Engineer Intern – Jan 2027",
    organization: "Amazon",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    deadline: "Not specified",
    duration: "6 months, starting January 2027",
    stipend: "Not specified",
    eligibility:
      "Bachelor's degree or above in Computer Science, Computer Engineering or related field, with 2027 graduation.",
    description:
      "Software-development internship involving engineering and software development within Amazon's technology environment.",
    skills: [
      "Java",
      "Python",
      "C++",
      "C#",
      "Go",
      "Software Development",
      "Computer Science",
    ],
    domains: ["Software Engineering", "Technology", "Cloud Computing"],
    roles: ["Software Development Engineer", "Software Engineer"],
    applicationUrl:
      "https://www.amazon.jobs/en/jobs/10517894/software-development-engineer-intern-jan-2027-6-month-amazon-university-talent-acquisition",
    source: "Amazon Jobs",
    platform: "Amazon Careers",
  },
];

async function updateInternships() {
  console.log("=== OppurtuNest: Updating 10 Curated Internship Records ===");

  try {
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    const initialInternships = await Opportunity.countDocuments({
      category: "Internships",
    });
    console.log(`Initial total opportunities: ${initialTotal}`);
    console.log(`Initial internships count:  ${initialInternships}`);

    let updatedCount = 0;
    let notFoundCount = 0;

    for (const item of updatedInternships) {
      // Match existing record by applicationUrl or organization/title within Internships
      const existing = await Opportunity.findOne({
        $or: [
          { applicationUrl: item.applicationUrl },
          { organization: item.organization, category: "Internships" },
          { title: { $regex: new RegExp(item.organization, "i") }, category: "Internships" },
        ],
      });

      if (!existing) {
        console.warn(`WARNING: Existing record not found for: ${item.title}`);
        notFoundCount++;
        continue;
      }

      const updateData = {
        title: item.title,
        organization: item.organization,
        organizer: item.organization,
        category: "Internships",
        location: item.location,
        workMode: item.workMode,
        mode: item.workMode,
        deadline: item.deadline,
        duration: item.duration,
        stipend: item.stipend,
        eligibility: item.eligibility,
        description: item.description,
        responsibilities: item.responsibilities || [],
        skills: item.skills,
        domains: item.domains,
        domain: item.domains[0] || "",
        roles: item.roles,
        applicationUrl: item.applicationUrl,
        source: item.source,
        platform: item.platform,
        lastChecked: "2026-09-28",
      };

      await Opportunity.updateOne({ _id: existing._id }, { $set: updateData });
      console.log(`✓ Updated [${existing.id}] ${item.title} (${item.organization})`);
      updatedCount++;
    }

    console.log("\n=== Update Summary ===");
    console.log(`Records updated:       ${updatedCount} (Expected: 10)`);
    console.log(`Records not found:     ${notFoundCount} (Expected: 0)`);
    console.log(`Duplicates created:    0`);

    const finalTotal = await Opportunity.countDocuments();
    const finalInternships = await Opportunity.countDocuments({
      category: "Internships",
    });
    console.log(`Final total in DB:     ${finalTotal} (Expected: 73)`);
    console.log(`Final internships:     ${finalInternships} (Expected: 10)`);
  } catch (error) {
    console.error("Update failed:", error.message);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed cleanly.");
    } catch (e) {
      // ignore
    }
  }
}

updateInternships();
