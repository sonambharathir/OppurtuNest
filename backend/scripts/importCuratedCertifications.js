const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// 1. Load backend/.env using dotenv with the exact path
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 10 Curated Real Certifications Dataset
 */
const curatedCertifications = [
  {
    title: "IBM SkillsBuild — AI Fundamentals / AI Credentials",
    organization: "IBM SkillsBuild",
    category: "Certifications",
    location: "Online",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Designed for learners and students building foundational AI and career skills. Follow the official IBM SkillsBuild eligibility/access requirements.",
    description: "Free online AI learning and credential opportunities covering foundational artificial intelligence concepts and job-relevant skills. Students can complete eligible learning activities and earn IBM SkillsBuild digital credentials.",
    skills: ["Artificial Intelligence", "Generative AI", "Machine Learning", "Digital Skills"],
    domains: ["AI & Machine Learning", "Engineering", "Research & Innovation"],
    roles: ["AI Learner", "AI/ML Beginner"],
    fee: "Free for eligible SkillsBuild learning/credential activities",
    applicationUrl: "https://skillsbuild.org/",
    source: "IBM SkillsBuild",
    platform: "IBM SkillsBuild",
    lastChecked: "2026-09-28",
  },
  {
    title: "IBM SkillsBuild — Cybersecurity Fundamentals",
    organization: "IBM SkillsBuild",
    category: "Certifications",
    location: "Online",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Students and learners using IBM SkillsBuild, subject to the provider's current access requirements.",
    description: "Free online cybersecurity learning and credential opportunities covering cybersecurity fundamentals and job-relevant security skills.",
    skills: ["Cybersecurity", "Network Security", "Security Fundamentals"],
    domains: ["Cybersecurity", "Engineering"],
    roles: ["Cybersecurity Learner", "Security Beginner"],
    fee: "Free for eligible SkillsBuild learning/credential activities",
    applicationUrl: "https://skillsbuild.org/",
    source: "IBM SkillsBuild",
    platform: "IBM SkillsBuild",
    lastChecked: "2026-09-28",
  },
  {
    title: "IBM SkillsBuild — Data Analytics Fundamentals",
    organization: "IBM SkillsBuild",
    category: "Certifications",
    location: "Online",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Students and learners using IBM SkillsBuild, subject to the provider's current access requirements.",
    description: "Free online learning and credential opportunities covering data analytics and foundational data skills.",
    skills: ["Data Analytics", "Data Literacy", "Data Visualization"],
    domains: ["Data & Analytics", "Finance & Economics", "Engineering"],
    roles: ["Data Analyst Beginner", "Data Learner"],
    fee: "Free for eligible SkillsBuild learning/credential activities",
    applicationUrl: "https://skillsbuild.org/",
    source: "IBM SkillsBuild",
    platform: "IBM SkillsBuild",
    lastChecked: "2026-09-28",
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    organization: "Microsoft",
    category: "Certifications",
    location: "Online / Exam Center",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Beginner-friendly certification for students, aspiring technology professionals and learners interested in cloud computing. Microsoft recommends familiarity with an area such as infrastructure management, database management or software development.",
    description: "Foundational Microsoft certification covering cloud concepts, core Azure services, Azure architecture, security, governance and management.",
    skills: ["Cloud Computing", "Microsoft Azure", "Networking", "Storage", "Security"],
    domains: ["Cloud Computing", "Engineering", "Software Development"],
    roles: ["Cloud Beginner", "Cloud Administrator"],
    fee: "Paid certification exam. Microsoft currently lists ₹3,691 in India; verify the current price on the official page before applying.",
    applicationUrl: "https://learn.microsoft.com/en-in/certifications/azure-fundamentals/",
    source: "Microsoft",
    platform: "Microsoft Learn",
    lastChecked: "2026-09-28",
  },
  {
    title: "Microsoft Azure AI Fundamentals (AI-901)",
    organization: "Microsoft",
    category: "Certifications",
    location: "Online / Exam Center",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Beginner/early-career learners interested in AI solution development. Microsoft recommends conceptual AI knowledge, basic Python coding knowledge and familiarity with Azure resources.",
    description: "Foundational AI certification covering AI concepts, machine learning principles, computer vision, NLP and generative AI workloads on Azure.",
    skills: ["Artificial Intelligence", "Machine Learning", "Python", "Generative AI", "Azure"],
    domains: ["AI & Machine Learning", "Engineering"],
    roles: ["AI Engineer Beginner", "AI Developer Beginner"],
    fee: "Paid certification exam. Price varies by country/region; verify the current India price on the official Microsoft page.",
    applicationUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/",
    source: "Microsoft",
    platform: "Microsoft Learn",
    lastChecked: "2026-09-28",
  },
  {
    title: "Microsoft Azure Data Fundamentals (DP-900)",
    organization: "Microsoft",
    category: "Certifications",
    location: "Online / Exam Center",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Beginner/early-career learners interested in data and cloud technologies. Follow Microsoft's current exam requirements and recommendations.",
    description: "Foundational certification covering core data concepts, relational and non-relational data, analytics and Microsoft Azure data services.",
    skills: ["SQL", "Databases", "Data Analytics", "Azure Data Services"],
    domains: ["Data & Analytics", "Cloud Computing", "Engineering"],
    roles: ["Data Analyst Beginner", "Database Beginner"],
    fee: "Paid certification exam. Verify the current regional price on Microsoft's official page.",
    applicationUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/",
    source: "Microsoft",
    platform: "Microsoft Learn",
    lastChecked: "2026-09-28",
  },
  {
    title: "Microsoft Applied Skills — Create an AI Agent",
    organization: "Microsoft",
    category: "Certifications",
    location: "Online",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Early-career learners and students who want to demonstrate practical AI-agent development skills. Follow Microsoft's current Applied Skills assessment requirements.",
    description: "Scenario-based Microsoft Applied Skills credential where learners demonstrate practical ability to create an AI agent using Microsoft Foundry.",
    skills: ["Generative AI", "AI Agents", "Microsoft Foundry"],
    domains: ["AI & Machine Learning", "Engineering"],
    roles: ["AI Developer", "AI Engineer Beginner"],
    fee: "Verify current Microsoft assessment availability and requirements.",
    applicationUrl: "https://learn.microsoft.com/en-us/training/student-hub/certifications",
    source: "Microsoft",
    platform: "Microsoft Learn",
    lastChecked: "2026-09-28",
  },
  {
    title: "Microsoft Applied Skills — Get Started with C#",
    organization: "Microsoft",
    category: "Certifications",
    location: "Online",
    workMode: "Online",
    deadline: "No fixed deadline",
    eligibility: "Students and early-career learners interested in demonstrating practical C# programming skills. Follow Microsoft's current Applied Skills assessment requirements.",
    description: "Scenario-based Microsoft credential focused on demonstrating practical C# programming knowledge, including classes, properties and methods.",
    skills: ["C#", "Object-Oriented Programming", "Programming Fundamentals"],
    domains: ["Software Development", "Engineering"],
    roles: ["Software Developer Beginner", "C# Developer Beginner"],
    fee: "Verify current Microsoft assessment availability and requirements.",
    applicationUrl: "https://learn.microsoft.com/en-us/training/student-hub/certifications",
    source: "Microsoft",
    platform: "Microsoft Learn",
    lastChecked: "2026-09-28",
  },
  {
    title: "NPTEL Online Certification Courses",
    organization: "NPTEL / IITs and IISc",
    category: "Certifications",
    location: "India / Online",
    workMode: "Online",
    deadline: "Course-specific",
    eligibility: "Open to learners and students; individual course eligibility and examination requirements depend on the selected NPTEL course.",
    description: "Online courses from NPTEL covering engineering, computer science, programming, management, science and many other subjects. Learning is generally free, while learners can take the optional proctored certification examination for a fee.",
    skills: ["Course-specific"],
    domains: ["Engineering", "Computer Science", "Science & Healthcare", "Finance & Economics", "Research & Innovation"],
    roles: ["Student Learner", "Technical Learner"],
    fee: "Learning is free; optional certification examination fee applies.",
    applicationUrl: "https://nptel.ac.in/",
    source: "NPTEL",
    platform: "NPTEL",
    lastChecked: "2026-09-28",
  },
  {
    title: "NPTEL Programming / Data Structures & Algorithms Courses",
    organization: "NPTEL / IITs and IISc",
    category: "Certifications",
    location: "India / Online",
    workMode: "Online",
    deadline: "Course-specific",
    eligibility: "Students and learners can enroll subject to the individual course requirements and current enrollment schedule.",
    description: "Programming-focused NPTEL courses covering areas such as programming fundamentals, data structures, algorithms and problem solving. Learning is online and certification can be earned through the official examination process.",
    skills: ["Programming", "Data Structures", "Algorithms", "Problem Solving"],
    domains: ["Software Development", "Engineering", "Computer Science"],
    roles: ["Software Developer Beginner", "Programmer", "Competitive Programmer"],
    fee: "Course learning is free; optional certification examination fee applies.",
    applicationUrl: "https://nptel.ac.in/",
    source: "NPTEL",
    platform: "NPTEL",
    lastChecked: "2026-09-28",
  },
];

/**
 * Generates a stable deterministic unique identifier based on source + title
 */
function generateStableId(source, title) {
  const hash = crypto
    .createHash("sha256")
    .update(`${source}:${title}`)
    .digest("hex")
    .slice(0, 16);
  const cleanSource = source.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `certification-${cleanSource}-${hash}`;
}

async function run() {
  console.log("=== OppurtuNest Curated Certifications Importer ===");

  try {
    // 2. Connect to MongoDB
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial opportunities in MongoDB: ${initialTotal}`);

    let insertedCount = 0;
    let updatedCount = 0;

    // 3. Upsert all 10 records using deterministic unique IDs
    for (const item of curatedCertifications) {
      const stableId = generateStableId(item.source, item.title);

      const recordData = {
        id: stableId,
        title: item.title,
        category: "Certifications",
        organization: item.organization,
        organizer: item.organization,
        location: item.location,
        workMode: item.workMode,
        mode: item.workMode,
        deadline: item.deadline,
        eligibility: item.eligibility,
        description: item.description,
        domain: item.domains?.[0] || "",
        domains: item.domains || [],
        roles: item.roles || [],
        skills: item.skills || [],
        source: item.source,
        platform: item.platform || "",
        fee: item.fee || "",
        applicationUrl: item.applicationUrl,
        lastChecked: item.lastChecked || "2026-09-28",
        // Schema default empty values for unused fields
        duration: "",
        stipend: "",
        bonusSkills: [],
        eligibleDegrees: [],
        eligibleYears: [],
        featuredBadge: "",
        prize: null,
      };

      // 4. Duplicate-safe query by stableId or title within Certifications
      const existing = await Opportunity.findOne({
        $or: [
          { id: stableId },
          { title: item.title, category: "Certifications" },
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

    // Print summary
    console.log("\n=== Insertion / Upsert Summary ===");
    console.log(`Certifications inserted: ${insertedCount}`);
    console.log(`Certifications updated:  ${updatedCount}`);
    console.log(`Duplicate / skipped count: 0`);

    // Print counts
    const totalAfter = await Opportunity.countDocuments();
    console.log(`Total opportunities after import: ${totalAfter}`);

    const totalCertifications = await Opportunity.countDocuments({ category: "Certifications" });
    const curatedCertificationsCount = await Opportunity.countDocuments({
      category: "Certifications",
      id: { $regex: /^certification-/ },
    });
    console.log(`Curated Certifications in DB:     ${curatedCertificationsCount} (Expected: 10)`);
    console.log(`Final Certifications count in DB: ${totalCertifications} (6 sample + 10 curated = 16)`);

    // Verify all 15 required fields across all 10 curated records
    const verifiedRecords = await Opportunity.find({
      category: "Certifications",
      id: { $regex: /^certification-/ },
    });

    const requiredFields = [
      "title",
      "organization",
      "category",
      "description",
      "eligibility",
      "location",
      "workMode",
      "deadline",
      "skills",
      "domains",
      "roles",
      "fee",
      "applicationUrl",
      "source",
      "platform",
    ];

    const allValid = verifiedRecords.every((rec) =>
      requiredFields.every((f) => rec[f] !== undefined && rec[f] !== null && rec[f] !== "")
    );
    console.log(`\nAll 10 records have all 15 required fields: ${allValid}`);

  } catch (error) {
    console.error("Certifications import failed:", error.message);
    process.exitCode = 1;
  } finally {
    // Clean close
    try {
      await mongoose.connection.close();
      console.log("\nMongoDB connection closed cleanly.");
    } catch (closeErr) {
      console.error("Error closing connection:", closeErr.message);
    }
  }
}

run();
