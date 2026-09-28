const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// 1. Load backend/.env using dotenv with the exact path
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 8 Curated Real Competitions Dataset
 */
const curatedCompetitions = [
  {
    title: "Seva First Innovation Challenge 2026",
    organization: "Ministry of Education, Government of India",
    category: "Competitions",
    location: "India",
    workMode: "Hybrid",
    deadline: "24 October 2026",
    eligibility: "Undergraduate students, postgraduate students and research scholars participating through eligible institutions in the Open level",
    description: "National innovation challenge focused on community-rooted problems across clean and sustainable development, agriculture, health and inclusion, education and skills, and security.",
    domains: ["Research & Innovation", "Social Impact & Sustainability", "Engineering", "Science & Healthcare", "Technology & Software"],
    roles: ["Student", "Innovator", "Research Student"],
    skills: ["Problem Solving", "Innovation", "Prototyping"],
    source: "Seva First Innovation Challenge",
    applicationUrl: "https://sevafirst.mic.gov.in/",
  },
  {
    title: "India Business Case Programme 2026-27",
    organization: "United Way Mumbai and Sattva Consulting, supported by HSBC India",
    category: "Competitions",
    location: "India",
    workMode: "Hybrid",
    deadline: "6 October 2026",
    eligibility: "Currently enrolled undergraduate students from recognized Indian institutions. Teams consist of four students from the same college. Students from disciplines including B.Com, BBA, BMS, BA, B.Sc, B.Tech, BE, BCA, B.Des, B.Pharm and equivalent programmes are eligible.",
    description: "Undergraduate business case-solving programme involving assessments, case-solving rounds, business simulations, workshops and employability activities.",
    domains: ["Business & Management", "Finance & Economics", "Technology & Software", "Research & Innovation"],
    roles: ["Student", "Business Analyst", "Consulting"],
    skills: ["Problem Solving", "Business Analysis", "Communication", "Presentation", "Teamwork"],
    source: "India Business Case Programme",
    applicationUrl: "https://indiabusinesscaseprogramme.com/",
  },
  {
    title: "GITAM Innovation Challenge 2026 - Main Track",
    organization: "GITAM",
    category: "Competitions",
    location: "India",
    workMode: "Hybrid",
    deadline: "4 October 2026",
    eligibility: "Current undergraduate students and graduates from 2024 onwards from Indian institutions. Teams consist of 2-4 members. Ideas may be at ideation, prototype or MVP stage.",
    description: "National student pitching competition for ideas, prototypes and early-stage ventures focused on building sustainable and resilient communities.",
    domains: ["Research & Innovation", "Engineering", "Technology & Software", "Social Impact & Sustainability", "Agriculture"],
    roles: ["Student", "Founder", "Innovator"],
    skills: ["Innovation", "Pitching", "Entrepreneurship", "Prototyping"],
    source: "GITAM Innovation Challenge",
    applicationUrl: "https://gic.gitam.edu/",
  },
  {
    title: "EY CAFTA Case Championship 2026",
    organization: "EY",
    category: "Competitions",
    location: "India",
    workMode: "Hybrid",
    deadline: "3 October 2026",
    eligibility: "College students from all academic disciplines and backgrounds. Students who graduated in or before 2025 are not eligible.",
    description: "Case championship requiring participants to analyze business problems and develop practical, well-researched solutions.",
    domains: ["Business & Management", "Finance & Economics", "Research & Innovation", "Technology & Software"],
    roles: ["Student", "Business Analyst", "Consulting"],
    skills: ["Case Analysis", "Research", "Problem Solving", "Presentation", "Communication"],
    source: "EY",
    applicationUrl: "https://www.ey.com/en_in/services/consulting/cafta-case-championship-2026-12th-edition",
  },
  {
    title: "Synergy: Where Law Meets Society Case Study Competition 2026",
    organization: "Vivekananda Institute of Professional Studies",
    category: "Competitions",
    location: "Delhi, India",
    workMode: "On-site",
    deadline: "20 October 2026",
    eligibility: "Undergraduate and postgraduate students from recognized institutions across India. Teams may contain 1-3 members from the same institution.",
    description: "Case study competition examining real-world issues at the intersection of law, society, technology, governance and public policy.",
    domains: ["Law & Policy", "Social Impact & Sustainability", "Technology & Software", "Finance & Economics"],
    roles: ["Student", "Research Student", "Policy"],
    skills: ["Case Analysis", "Research", "Problem Solving", "Presentation", "Communication"],
    source: "SCC Times",
    applicationUrl: "https://www.scconline.com/blog/post/2026/09/14/synergy-where-law-meets-society-case-study-competition-2026/",
  },
  {
    title: "GMC India Student Championship 2026",
    organization: "Global Management Challenge India",
    category: "Competitions",
    location: "India",
    workMode: "Online",
    deadline: "5 October 2026",
    eligibility: "First- and second-year MBA or PGDM students from eligible management institutes in India. Teams consist of four students from the same institute.",
    description: "Interactive business simulation competition where student teams manage a virtual company and make strategic management decisions.",
    domains: ["Business & Management", "Finance & Economics"],
    roles: ["MBA Student", "Management Student", "Business Analyst"],
    skills: ["Strategy", "Decision Making", "Business Analysis", "Teamwork"],
    source: "GMC India",
    applicationUrl: "https://gmcindia.in/student-2026/",
  },
  {
    title: "25th MicrobiOlympiad 2026",
    organization: "MicrobiOlympiad",
    category: "Competitions",
    location: "India",
    workMode: "Online",
    deadline: "30 October 2026",
    eligibility: "Undergraduate and postgraduate life-science students in India"
    ,
    description: "National life-science competition featuring quizzes and themed contests covering scientific writing, art, presentations, reading, R programming, terminology, AI, scientific models and other formats.",
    domains: ["Science & Healthcare", "Research & Innovation"],
    roles: ["Student", "Research Student"],
    skills: ["Biology", "Microbiology", "Scientific Writing", "Data Analysis", "R Programming"],
    source: "MicrobiOlympiad",
    applicationUrl: "https://microbiolympiad.org/brochure/",
  },
  {
    title: "Snapdragon AI Lab Build & Present Challenge 2026",
    organization: "Qualcomm",
    category: "Competitions",
    location: "India",
    workMode: "Online",
    deadline: "30 September 2026",
    eligibility: "Residents of India aged 18 or above who own a Snapdragon-powered laptop and meet the official challenge requirements",
    description: "Individual AI solution challenge focused on building or proposing AI use cases optimized for Snapdragon-powered HP PCs.",
    domains: ["Artificial Intelligence", "Technology & Software", "Engineering"],
    roles: ["Student", "Developer", "AI Engineer", "Innovator"],
    skills: ["Artificial Intelligence", "Machine Learning", "Software Development", "AI Model Integration", "On-device AI"],
    source: "Qualcomm",
    applicationUrl: "https://unstop.com/competitions/crp-snapdragon-ai-lab-build-present-challenge-qualcomm-1748893",
  },
];

/**
 * Generates a stable deterministic unique identifier based on source + applicationUrl
 */
function generateStableId(source, applicationUrl) {
  const hash = crypto
    .createHash("sha256")
    .update(`${source}:${applicationUrl}`)
    .digest("hex")
    .slice(0, 16);
  const cleanSource = source.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `competition-${cleanSource}-${hash}`;
}

async function run() {
  console.log("=== OppurtuNest Curated Competitions Importer ===");

  try {
    // 2. Connect to MongoDB using existing configuration
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial opportunities in MongoDB: ${initialTotal}`);

    let insertedCount = 0;
    let updatedCount = 0;

    // 3. Upsert each competition using deterministic unique ID based on source + applicationUrl
    for (const item of curatedCompetitions) {
      const stableId = generateStableId(item.source, item.applicationUrl);

      const recordData = {
        id: stableId,
        title: item.title,
        category: "Competitions",
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
        applicationUrl: item.applicationUrl,
        lastChecked: "2026-09-27",
        // Schema default empty values for unused fields
        duration: "",
        stipend: "",
        bonusSkills: [],
        eligibleDegrees: [],
        eligibleYears: [],
        featuredBadge: "",
        platform: "",
        prize: null,
        fee: "",
      };

      // 4. Duplicate-safe query
      const existing = await Opportunity.findOne({
        $or: [
          { id: stableId },
          { applicationUrl: item.applicationUrl },
          { title: item.title, category: "Competitions" },
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

    // 7. Print inserted count
    // 8. Print updated count
    console.log("\n=== Insertion / Upsert Summary ===");
    console.log(`Competitions inserted: ${insertedCount}`);
    console.log(`Competitions updated:  ${updatedCount}`);

    // 9. Print total opportunity count
    const totalAfter = await Opportunity.countDocuments();
    console.log(`Total opportunities after import: ${totalAfter}`);

    // 10. Print total Competition count
    const totalCompetitions = await Opportunity.countDocuments({ category: "Competitions" });
    const curatedCompetitionsCount = await Opportunity.countDocuments({
      category: "Competitions",
      id: { $regex: /^competition-/ },
    });
    console.log(`Curated competitions imported:   ${curatedCompetitionsCount} (Expected: 8)`);
    console.log(`Final competition count in DB:    ${totalCompetitions} (7 sample + 8 curated = 15)`);

  } catch (error) {
    console.error("Competition import failed:", error.message);
    process.exitCode = 1;
  } finally {
    // 11. Close MongoDB connection cleanly
    try {
      await mongoose.connection.close();
      console.log("\nMongoDB connection closed cleanly.");
    } catch (closeErr) {
      console.error("Error closing connection:", closeErr.message);
    }
  }
}

run();
