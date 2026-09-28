const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// 1. Load backend/.env using dotenv with the exact path
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 10 Curated Real Research Opportunities Dataset
 */
const curatedResearch = [
  {
    title: "IIT Bombay Research Internship Award 2026–27",
    organization: "IIT Bombay",
    category: "Research",
    location: "Mumbai, Maharashtra",
    workMode: "On-site",
    deadline: "29 Sep 2026",
    eligibility: "Students meeting IIT Bombay's official Research Internship Award eligibility and applying to eligible research projects.",
    description: "Research internship involving full-time work on a specific research project under an IIT Bombay faculty member. Internship duration is generally 4–6 months.",
    skills: ["Research", "Problem Solving"],
    domains: ["Research & Innovation", "Engineering", "Science & Technology"],
    roles: ["Research Intern"],
    applicationUrl: "https://www.ircc.iitb.ac.in/IRCC-Webpage/IITBInternship/",
    source: "IIT Bombay",
    platform: "IIT Bombay IRCC",
    stipend: "₹15,000/month",
    duration: "4–6 months",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "ISRO–IIRS External Student's Internship Programme 2026",
    organization: "Indian Institute of Remote Sensing (IIRS), ISRO",
    category: "Research",
    location: "Dehradun / IIRS",
    workMode: "On-site",
    deadline: "30 Oct 2026",
    eligibility: "UG/PG/PhD students from recognized institutions in relevant Science/Technology fields, subject to the official eligibility requirements.",
    description: "Research-oriented student internship at IIRS covering areas related to remote sensing, geospatial technology, Earth observation and related applications.",
    skills: ["Research", "Data Analysis", "Remote Sensing", "GIS"],
    domains: ["Research & Innovation", "Engineering", "Earth & Environmental Science"],
    roles: ["Research Intern", "Student Researcher"],
    applicationUrl: "https://admissions.iirs.gov.in/index.php/coursecalender",
    source: "IIRS / ISRO",
    platform: "IIRS",
    stipend: "",
    duration: "",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "NCESS Internship / Dissertation / Training — September 2026 Session",
    organization: "National Centre for Earth Science Studies (NCESS)",
    category: "Research",
    location: "Thiruvananthapuram, Kerala",
    workMode: "On-site",
    deadline: "30 Sep 2026",
    eligibility: "Eligible students in specified M.Sc./M.Sc.Tech./M.Tech and integrated programmes according to the current NCESS notification.",
    description: "Research internship, dissertation or training opportunity in Earth and environmental sciences. Minimum duration is two months.",
    skills: ["Research", "Data Analysis"],
    domains: ["Research & Innovation", "Earth & Environmental Science"],
    roles: ["Research Intern", "Dissertation Student"],
    applicationUrl: "https://vacancy.ncess.gov.in/dissertation/index.php",
    source: "NCESS",
    platform: "NCESS",
    fee: "No internship fee",
    stipend: "No stipend",
    duration: "2 months",
    lastChecked: "2026-09-28",
  },
  {
    title: "Def-Space Autumn Internship 2026",
    organization: "Bharat Space Education Research Centre (BSERC)",
    category: "Research",
    location: "India",
    workMode: "Online",
    deadline: "30 Sep 2026",
    eligibility: "UG and PG students from recognized government and private colleges/universities, according to the official programme requirements.",
    description: "Six-week research and technical learning internship covering space science, defence technology and emerging technologies.",
    skills: ["Research", "Space Technology", "Emerging Technologies"],
    domains: ["Research & Innovation", "Engineering", "International/Space Opportunities"],
    roles: ["Research Intern", "Technology Intern"],
    applicationUrl: "https://internship.bserc.org/",
    source: "BSERC",
    platform: "BSERC",
    duration: "6 weeks",
    stipend: "",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "India Space Lab Winter Internship 2026",
    organization: "India Space Lab",
    category: "Research",
    location: "India",
    workMode: "Online",
    deadline: "22 Oct 2026 for Batch I; 18 Dec 2026 for Batch II",
    eligibility: "UG/PG students and research scholars from recognized institutions, subject to the official programme requirements.",
    description: "Space-focused research and technical internship covering areas such as space technology, rocketry, CubeSat/CanSat, remote sensing, GIS, drones and AI.",
    skills: ["Research", "Space Technology", "Remote Sensing", "GIS", "Artificial Intelligence"],
    domains: ["Research & Innovation", "Engineering", "Space Technology"],
    roles: ["Research Intern", "Space Technology Intern"],
    applicationUrl: "https://isl.ac.in/internship/",
    source: "India Space Lab",
    platform: "India Space Lab",
    duration: "",
    stipend: "",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "DRDO–CASDIC Paid Internship 2026",
    organization: "DRDO — CASDIC",
    category: "Research",
    location: "Bengaluru, Karnataka",
    workMode: "On-site",
    deadline: "11 Oct 2026",
    eligibility: "B.E./B.Tech and M.Sc students meeting the official CASDIC notification requirements.",
    description: "Research and technical internship at a DRDO Bengaluru establishment, with work related to defence research and advanced technologies.",
    skills: ["Research", "Engineering", "Artificial Intelligence"],
    domains: ["Research & Innovation", "Engineering", "Defence Technology"],
    roles: ["Research Intern", "Engineering Intern"],
    applicationUrl: "https://www.drdo.gov.in/drdo/en/offerings/vacancies/Skill-Seeker",
    source: "DRDO",
    platform: "DRDO",
    duration: "",
    stipend: "",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "DRDO–SSPL Paid Internship 2026",
    organization: "DRDO — Solid State Physics Laboratory (SSPL)",
    category: "Research",
    location: "Delhi",
    workMode: "On-site",
    deadline: "30 Sep 2026",
    eligibility: "Students meeting the specific engineering/science eligibility requirements in the official SSPL internship notification.",
    description: "Six-month research internship involving work at DRDO's Solid State Physics Laboratory.",
    skills: ["Research", "Physics", "Engineering"],
    domains: ["Research & Innovation", "Science & Technology", "Engineering"],
    roles: ["Research Intern"],
    applicationUrl: "https://www.drdo.gov.in/drdo/en/offerings/vacancies/Skill-Seeker",
    source: "DRDO",
    platform: "DRDO",
    duration: "6 months",
    stipend: "",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "DRDO–LRDE Junior Research Fellowship 2026",
    organization: "DRDO — Electronics & Radar Development Establishment (LRDE)",
    category: "Research",
    location: "Bengaluru, Karnataka",
    workMode: "On-site",
    deadline: "8 Oct 2026",
    eligibility: "Postgraduate candidates meeting the discipline and qualification requirements in the official LRDE JRF notification.",
    description: "Junior Research Fellowship involving research work at DRDO LRDE in Bengaluru.",
    skills: ["Research", "Electronics", "Radar Technology"],
    domains: ["Research & Innovation", "Engineering", "Defence Technology"],
    roles: ["Junior Research Fellow"],
    applicationUrl: "https://www.drdo.gov.in/drdo/offerings/vacancies",
    source: "DRDO",
    platform: "DRDO",
    duration: "",
    stipend: "",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "DRDO–NPOL Junior Research Fellowship 2026",
    organization: "DRDO — Naval Physical & Oceanographic Laboratory (NPOL)",
    category: "Research",
    location: "Kochi, Kerala",
    workMode: "On-site",
    deadline: "10 Oct 2026",
    eligibility: "Postgraduate candidates meeting the discipline and qualification requirements in the official NPOL notification.",
    description: "Junior Research Fellowship involving research work at DRDO NPOL in areas related to naval and oceanographic technologies.",
    skills: ["Research", "Science & Technology"],
    domains: ["Research & Innovation", "Engineering", "Defence Technology"],
    roles: ["Junior Research Fellow"],
    applicationUrl: "https://www.drdo.gov.in/drdo/offerings/vacancies",
    source: "DRDO",
    platform: "DRDO",
    duration: "",
    stipend: "",
    fee: "",
    lastChecked: "2026-09-28",
  },
  {
    title: "Indian Pharmacopoeia Commission — Microbiology Division Internship",
    organization: "Indian Pharmacopoeia Commission",
    category: "Research",
    location: "Ghaziabad, Uttar Pradesh",
    workMode: "On-site",
    deadline: "10 Oct 2026",
    eligibility: "M.Sc students in Microbiology, Biotechnology or Molecular Biology, and M.Pharm Pharmaceutical Biotechnology students, according to the official notification.",
    description: "Research internship in the Microbiology Division involving laboratory/research exposure in pharmaceutical and microbiological sciences.",
    skills: ["Microbiology", "Biotechnology", "Molecular Biology", "Research"],
    domains: ["Research & Innovation", "Science & Healthcare"],
    roles: ["Research Intern", "Laboratory Intern"],
    applicationUrl: "https://ipc.gov.in/news-highlights/1511-applications-open-microbiology-division-internship-programme.html",
    source: "Indian Pharmacopoeia Commission",
    platform: "IPC",
    duration: "",
    stipend: "",
    fee: "",
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
  return `research-${cleanSource}-${hash}`;
}

async function run() {
  console.log("=== OppurtuNest Curated Research Opportunities Importer ===");

  try {
    // 2. Connect to MongoDB
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial opportunities in MongoDB: ${initialTotal}`);

    let insertedCount = 0;
    let updatedCount = 0;

    // 3. Upsert all 10 records using deterministic unique IDs
    for (const item of curatedResearch) {
      const stableId = generateStableId(item.source, item.title);

      const recordData = {
        id: stableId,
        title: item.title,
        category: "Research",
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
        stipend: item.stipend || "",
        duration: item.duration || "",
        fee: item.fee || "",
        applicationUrl: item.applicationUrl,
        lastChecked: item.lastChecked || "2026-09-28",
        // Schema default empty values for unused fields
        bonusSkills: [],
        eligibleDegrees: [],
        eligibleYears: [],
        featuredBadge: "",
        prize: null,
      };

      // 4. Duplicate-safe query by stableId or title within Research
      const existing = await Opportunity.findOne({
        $or: [
          { id: stableId },
          { title: item.title, category: "Research" },
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
    console.log(`Research records inserted: ${insertedCount}`);
    console.log(`Research records updated:  ${updatedCount}`);
    console.log(`Duplicate / skipped count: 0`);

    // Print counts
    const totalAfter = await Opportunity.countDocuments();
    console.log(`Total opportunities after import: ${totalAfter}`);

    const totalResearch = await Opportunity.countDocuments({ category: "Research" });
    const curatedResearchCount = await Opportunity.countDocuments({
      category: "Research",
      id: { $regex: /^research-/ },
    });
    console.log(`Curated Research records in DB:   ${curatedResearchCount} (Expected: 10)`);
    console.log(`Final Research count in DB:       ${totalResearch} (7 sample + 10 curated = 17)`);

    // Verify required fields on all 10 curated records
    const verifiedRecords = await Opportunity.find({
      category: "Research",
      id: { $regex: /^research-/ },
    });

    const requiredFields = [
      "title",
      "organization",
      "category",
      "description",
      "deadline",
      "eligibility",
      "location",
      "workMode",
      "skills",
      "domains",
      "roles",
      "applicationUrl",
    ];

    const allValid = verifiedRecords.every((rec) =>
      requiredFields.every((f) => rec[f] !== undefined && rec[f] !== null && rec[f] !== "")
    );
    console.log(`\nAll 10 records have all 12 required fields: ${allValid}`);

  } catch (error) {
    console.error("Research import failed:", error.message);
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
