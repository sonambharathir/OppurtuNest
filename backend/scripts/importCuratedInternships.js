const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Load backend/.env using dotenv with the exact path
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 10 Manually curated real internship opportunities
 */
const curatedInternships = [
  {
    title: "Software Engineer Intern – Full Stack",
    organization: "Growati",
    category: "Internships",
    location: "Pune",
    workMode: "Remote",
    eligibility: "Not specified",
    deadline: "Not specified",
    source: "Wellfound",
    applicationUrl: "https://wellfound.com/jobs/4408827-software-engineer-intern-full-stack?autoOpenApplication=true",
    skills: ["JavaScript", "React", "Node.js", "APIs", "databases", "AI/automation"],
    roles: ["Software Engineer", "Full Stack Developer"],
    lastChecked: "2026-09-27",
  },
  {
    title: "Backend Software Engineering Intern",
    organization: "Enterpret",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    eligibility: "Pursuing a Computer Science or Engineering degree; relevant engineering/backend/AI experience is requested",
    deadline: "Not specified",
    source: "Wellfound",
    applicationUrl: "https://wellfound.com/jobs/4573005-backend-onsite-software-engineering-intern",
    skills: ["Programming fundamentals", "AWS", "backend engineering", "serverless systems", "AI"],
    roles: ["Backend Developer", "Software Engineer"],
    lastChecked: "2026-09-27",
  },
  {
    title: "Frontend Development Intern – Mobile App Development",
    organization: "MAVR",
    category: "Internships",
    location: "Remote India",
    workMode: "Remote",
    eligibility: "Not specified",
    deadline: "Not specified",
    source: "Wellfound",
    applicationUrl: "https://wellfound.com/jobs/4704098-frontend-development-intern-mobile-app-development",
    skills: ["JavaScript", "React.js", "React Native", "PostgreSQL", "Postman", "MERN"],
    roles: ["Frontend Developer", "Mobile App Developer"],
    lastChecked: "2026-09-27",
  },
  {
    title: "Software/Product Engineering Intern",
    organization: "Matiks",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    eligibility: "No experience required according to the listing",
    deadline: "Not specified",
    source: "Wellfound",
    applicationUrl: "https://wellfound.com/jobs/4523214-software-product-engineering-intern",
    skills: ["React.js", "Go", "AWS", "React Native", "GCP"],
    roles: ["Software Engineer", "Product Engineer"],
    lastChecked: "2026-09-27",
  },
  {
    title: "AI Software Engineering Intern",
    organization: "Fluexy",
    category: "Internships",
    location: "India",
    workMode: "Remote",
    eligibility: "1 year experience requested; full-time commitment for the internship",
    deadline: "Not specified",
    source: "Wellfound",
    applicationUrl: "https://wellfound.com/jobs/4683437-ai-software-engineering-intern",
    skills: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "FastAPI", "PostgreSQL", "REST APIs", "AI/LLMs"],
    roles: ["AI Engineer", "Software Engineer"],
    lastChecked: "2026-09-27",
  },
  {
    title: "Backend Intern",
    organization: "MikeLegal",
    category: "Internships",
    location: "India",
    workMode: "Remote",
    eligibility: "Third-year B.E./B.Tech student; Python and SQL knowledge; Git/GitHub familiarity",
    deadline: "Not specified",
    source: "Wellfound",
    applicationUrl: "https://wellfound.com/jobs/2657129-backend-intern",
    skills: ["Python", "Django", "SQL", "Git", "GitHub", "web fundamentals"],
    roles: ["Backend Developer", "Software Engineer"],
    lastChecked: "2026-09-27",
  },
  {
    title: "IT Administrator Intern",
    organization: "Josys",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    eligibility: "Bachelor's degree or diploma in IT, Computer Science, or related field",
    deadline: "Not specified",
    source: "Ashby",
    applicationUrl: "https://jobs.ashbyhq.com/josys/83229282-68cb-475c-8948-f293850e8657",
    skills: ["IT administration", "hardware", "operating systems", "networking", "troubleshooting"],
    roles: ["IT Administrator", "IT Support"],
    lastChecked: "2026-09-27",
  },
  {
    title: "AI Engineer Intern",
    organization: "Meraki-Labs",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    eligibility: "Currently pursuing a degree in CS, IT, Computer Engineering, AI/ML, AI/DS or related field; strong academic/proof-of-work requirements listed by employer",
    deadline: "Not specified",
    source: "Ashby",
    applicationUrl: "https://jobs.ashbyhq.com/Meraki-Labs/93ff65d2-f0cd-4fd1-b76f-b2e350f2d6c8",
    skills: ["Python", "AI/ML", "TensorFlow", "PyTorch", "LLMs"],
    roles: ["AI Engineer", "Machine Learning Engineer"],
    lastChecked: "2026-09-27",
  },
  {
    title: "HR Intern",
    organization: "SPAN",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    eligibility: "Not specified",
    deadline: "Not specified",
    source: "Ashby",
    applicationUrl: "https://jobs.ashbyhq.com/span/1a44454a-c4eb-4a73-8f5b-7d3b921c0c1f/",
    skills: ["Communication", "talent acquisition", "HR operations"],
    roles: ["HR Intern", "Talent Acquisition"],
    lastChecked: "2026-09-27",
  },
  {
    title: "Software Development Engineer Intern – Jan 2027 (6 month)",
    organization: "Amazon",
    category: "Internships",
    location: "Bengaluru",
    workMode: "On-site",
    eligibility: "Bachelor's degree or above in Computer Science, Computer Engineering, or related field; program is for students graduating in 2027",
    deadline: "Not specified",
    source: "Amazon Jobs",
    applicationUrl: "https://www.amazon.jobs/en/jobs/10517894/software-development-engineer-intern-jan-2027-6-month-amazon-university-talent-acquisition",
    skills: ["Java", "Python", "C++", "C#", "Go", "Rust", "TypeScript", "data structures", "algorithms", "distributed systems"],
    roles: ["Software Development Engineer"],
    lastChecked: "2026-09-27",
  },
];

/**
 * Generates a stable unique identifier based on source + applicationUrl
 */
function generateStableId(source, applicationUrl) {
  const hash = crypto
    .createHash("sha256")
    .update(`${source}:${applicationUrl}`)
    .digest("hex")
    .slice(0, 16);
  const cleanSource = source.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `curated-${cleanSource}-${hash}`;
}

async function run() {
  console.log("=== OppurtuNest Curated Real Internships Importer ===");

  try {
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial opportunities in MongoDB: ${initialTotal}`);

    let insertedCount = 0;
    let updatedCount = 0;

    for (const item of curatedInternships) {
      const stableId = generateStableId(item.source, item.applicationUrl);

      const recordData = {
        id: stableId,
        title: item.title,
        category: "Internships",
        organization: item.organization,
        organizer: item.organization,
        location: item.location,
        workMode: item.workMode,
        mode: item.workMode,
        eligibility: item.eligibility,
        deadline: item.deadline,
        source: item.source,
        applicationUrl: item.applicationUrl,
        skills: item.skills,
        roles: item.roles,
        lastChecked: item.lastChecked,
        // Preserve default empty values for unused schema fields
        duration: "",
        stipend: "",
        domain: "",
        domains: [],
        bonusSkills: [],
        eligibleDegrees: [],
        eligibleYears: [],
        description: "",
        featuredBadge: "",
        platform: "",
        prize: null,
        fee: "",
      };

      // Duplicate-safe check by stable ID or applicationUrl
      const existing = await Opportunity.findOne({
        $or: [{ id: stableId }, { applicationUrl: item.applicationUrl }],
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

    // Verify requirements
    const curatedInDb = await Opportunity.find({
      applicationUrl: { $in: curatedInternships.map((i) => i.applicationUrl) },
    });

    console.log(`\n=== Verification Checklist ===`);
    console.log(`- Curated records found in DB: ${curatedInDb.length} (Expected: 10)`);

    const urls = curatedInDb.map((doc) => doc.applicationUrl);
    const uniqueUrls = new Set(urls);
    console.log(`- Unique application URLs among curated: ${uniqueUrls.size} (Expected: 10)`);
    console.log(`- All have source: ${curatedInDb.every((doc) => Boolean(doc.source))}`);
    console.log(`- All have category 'Internships': ${curatedInDb.every((doc) => doc.category === "Internships")}`);
    console.log(`- All have lastChecked '2026-09-27': ${curatedInDb.every((doc) => doc.lastChecked === "2026-09-27")}`);

    const totalInternships = await Opportunity.countDocuments({ category: "Internships" });
    console.log(`- Total 'Internships' in DB (sample + curated): ${totalInternships} (Expected: 19)`);

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
