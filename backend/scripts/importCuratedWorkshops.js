const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// 1. Load backend/.env using dotenv with the exact path
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 10 Curated Real Workshops Dataset
 */
const curatedWorkshops = [
  {
    title: "ODTL 2026 — Operations Research and Data Analytics in Transportation & Logistics",
    organization: "IIT Bombay / NIT Calicut",
    category: "Workshops",
    location: "India",
    workMode: "On-site",
    deadline: "15 Oct 2026",
    eligibility: "Eligible students and research participants interested in operations research, data analytics, transportation and logistics",
    description: "Workshop focused on operations research and data analytics applications in transportation and logistics.",
    domains: ["Research & Innovation", "Engineering", "Technology & Software", "Data Science"],
    roles: ["Student", "Research Student"],
    skills: ["Data Analysis", "Operations Research", "Problem Solving"],
    source: "IIT Bombay",
    applicationUrl: "https://s3.ieor.iitb.ac.in/odtl2026/register.php?regcat=student_host",
  },
  {
    title: "Exploring Cells and Biological Structures: An Interactive Workshop",
    organization: "IIT Bombay",
    category: "Workshops",
    location: "Mumbai, India",
    workMode: "On-site",
    deadline: "Not specified",
    eligibility: "Students, researchers and other eligible participants interested in cell biology and biological structures",
    description: "Interactive workshop covering cells and biological structures through practical and educational sessions.",
    domains: ["Science & Healthcare", "Research & Innovation"],
    roles: ["Student", "Research Student"],
    skills: ["Cell Biology", "Scientific Research"],
    source: "IIT Bombay",
    applicationUrl: "https://www.bio.iitb.ac.in/exploring-cells-and-biological-structures_workshop/",
  },
  {
    title: "IEEE Ferroschool 2026",
    organization: "IISc Bengaluru",
    category: "Workshops",
    location: "Bengaluru, India",
    workMode: "On-site",
    deadline: "Not specified",
    eligibility: "Selected students and eligible participants interested in ferroelectric materials and related technologies",
    description: "Technical school and workshop focused on ferroelectric materials, devices and related research.",
    domains: ["Engineering", "Research & Innovation", "Science & Healthcare"],
    roles: ["Student", "Research Student"],
    skills: ["Materials Science", "Research", "Engineering"],
    source: "IISc Bengaluru",
    applicationUrl: "https://www.cense.iisc.ac.in/Ferroschool2026/",
  },
  {
    title: "Online Workshop: Bioinformatics, Computational Biology & Molecular Sciences",
    organization: "TDU",
    category: "Workshops",
    location: "India",
    workMode: "Online",
    deadline: "Not specified",
    eligibility: "Students, research scholars, faculty and industry participants interested in bioinformatics, computational biology and molecular sciences",
    description: "Online workshop covering bioinformatics, computational biology and molecular science topics including molecular docking and sequencing analysis.",
    domains: ["Science & Healthcare", "Research & Innovation", "Technology & Software", "Data Science"],
    roles: ["Student", "Research Student"],
    skills: ["Bioinformatics", "Computational Biology", "Data Analysis"],
    source: "TDU",
    applicationUrl: "https://www.tdu.edu.in/event/online-workshop-in-the-fields-of-bioinformatics-computational-biology-and-molecular-sciences",
  },
  {
    title: "Pre-Congress Health Sciences & Technology Workshops",
    organization: "UPES",
    category: "Workshops",
    location: "Dehradun, India",
    workMode: "On-site",
    deadline: "Not specified",
    eligibility: "Students, researchers and professionals interested in health sciences and technology",
    description: "Workshop series covering healthcare startups, microscopy, diagnostics, microbiome research and related health-science technologies.",
    domains: ["Science & Healthcare", "Research & Innovation", "Technology & Software", "Business & Management"],
    roles: ["Student", "Research Student", "Entrepreneur"],
    skills: ["Healthcare", "Research", "Innovation"],
    source: "UPES",
    applicationUrl: "https://wchst2026.in/workshop.html",
  },
  {
    title: "AI for Perovskite Solar Cells",
    organization: "DSTC",
    category: "Workshops",
    location: "India",
    workMode: "Online",
    deadline: "Not specified",
    eligibility: "Students and researchers in relevant science, engineering and materials fields",
    description: "Deep-science workshop exploring the use of artificial intelligence in perovskite solar-cell research.",
    domains: ["Artificial Intelligence", "Engineering", "Research & Innovation", "Energy", "Science & Healthcare"],
    roles: ["Student", "Research Student", "AI Engineer"],
    skills: ["Artificial Intelligence", "Machine Learning", "Materials Science"],
    source: "DSTC",
    applicationUrl: "https://dstc.org.in/deep-science-workshops/",
  },
  {
    title: "Machine Learning for Solid-State Batteries",
    organization: "DSTC",
    category: "Workshops",
    location: "India",
    workMode: "Online",
    deadline: "Not specified",
    eligibility: "Students and researchers in relevant engineering, materials science and related fields",
    description: "Deep-science workshop exploring machine-learning approaches for solid-state battery research.",
    domains: ["Artificial Intelligence", "Engineering", "Research & Innovation", "Energy"],
    roles: ["Student", "Research Student", "AI Engineer"],
    skills: ["Machine Learning", "Materials Science", "Data Analysis"],
    source: "DSTC",
    applicationUrl: "https://dstc.org.in/deep-science-workshops/",
  },
  {
    title: "AI for Multi-Omics & Biomarker Discovery",
    organization: "DSTC",
    category: "Workshops",
    location: "India",
    workMode: "Online",
    deadline: "Not specified",
    eligibility: "Students and researchers in bioinformatics, computational biology, data science and related fields",
    description: "Deep-science workshop exploring AI methods for multi-omics analysis and biomarker discovery.",
    domains: ["Artificial Intelligence", "Science & Healthcare", "Research & Innovation", "Data Science"],
    roles: ["Student", "Research Student", "Data Scientist"],
    skills: ["Artificial Intelligence", "Bioinformatics", "Data Analysis", "Machine Learning"],
    source: "DSTC",
    applicationUrl: "https://dstc.org.in/deep-science-workshops/",
  },
  {
    title: "Bayesian Optimization for Green Chemistry",
    organization: "DSTC",
    category: "Workshops",
    location: "India",
    workMode: "Online",
    deadline: "Not specified",
    eligibility: "Students and researchers in chemistry, chemical engineering, materials science and related fields",
    description: "Deep-science workshop exploring Bayesian optimization methods for green chemistry research.",
    domains: ["Research & Innovation", "Science & Healthcare", "Engineering", "Sustainability"],
    roles: ["Student", "Research Student"],
    skills: ["Bayesian Optimization", "Data Science", "Chemistry", "Research"],
    source: "DSTC",
    applicationUrl: "https://dstc.org.in/deep-science-workshops/",
  },
  {
    title: "World Technocon Workshop Series",
    organization: "IIIT Pune",
    category: "Workshops",
    location: "Pune, India",
    workMode: "On-site",
    deadline: "Not specified",
    eligibility: "University students and eligible professionals interested in the listed technical workshop topics",
    description: "Technical workshop series hosted at IIIT Pune covering current technology and engineering topics.",
    domains: ["Technology & Software", "Engineering", "Research & Innovation"],
    roles: ["Student", "Research Student"],
    skills: ["Technology", "Engineering", "Problem Solving"],
    source: "World Technocon",
    applicationUrl: "https://technocon.org/events/iiit-pune-october-2026/register",
  },
];

/**
 * Generates a stable deterministic unique identifier based on source + applicationUrl + title
 */
function generateStableId(source, applicationUrl, title) {
  // Map World Technocon to the stable existing ID if already in DB
  if (source === "World Technocon") {
    return "workshop-worldtechnocon-19cc2e807cf39ba3";
  }
  const hash = crypto
    .createHash("sha256")
    .update(`${source}:${applicationUrl}:${title}`)
    .digest("hex")
    .slice(0, 16);
  const cleanSource = source.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `workshop-${cleanSource}-${hash}`;
}

async function run() {
  console.log("=== OppurtuNest Curated Workshops Importer ===");

  try {
    // 2. Connect using backend/config/db.js
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial opportunities in MongoDB: ${initialTotal}`);

    let insertedCount = 0;
    let updatedCount = 0;

    // 3. Upsert all 10 records using deterministic unique IDs
    for (const item of curatedWorkshops) {
      const stableId = generateStableId(item.source, item.applicationUrl, item.title);

      const recordData = {
        id: stableId,
        title: item.title,
        category: "Workshops",
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

      // 4. Duplicate-safe query: match by stableId
      const existing = await Opportunity.findOne({ id: stableId });

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
    console.log(`Workshops inserted: ${insertedCount}`);
    console.log(`Workshops updated:  ${updatedCount}`);

    // Print counts
    const totalAfter = await Opportunity.countDocuments();
    console.log(`Total opportunities after import: ${totalAfter}`);

    const totalWorkshops = await Opportunity.countDocuments({ category: "Workshops" });
    const curatedWorkshopsCount = await Opportunity.countDocuments({
      category: "Workshops",
      id: { $regex: /^workshop-/ },
    });
    console.log(`Curated workshops in DB:        ${curatedWorkshopsCount} (Expected: 10)`);
    console.log(`Final workshop count in DB:      ${totalWorkshops} (7 sample + 10 curated = 17)`);

  } catch (error) {
    console.error("Workshop import failed:", error.message);
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
