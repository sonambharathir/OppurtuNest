const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// 1. Load backend/.env using dotenv with the exact path
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * 15 Curated Real Scholarships Dataset
 */
const curatedScholarships = [
  {
    organization: "AICTE",
    title: "AICTE Pragati Scholarship Scheme for Girl Students (Technical Degree)",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Girl students pursuing eligible technical degree programmes",
    description: "AICTE scholarship scheme supporting eligible girl students pursuing technical degree programmes.",
    domains: ["Engineering", "Technology & Software", "Education"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "AICTE",
    title: "AICTE Saksham Scholarship Scheme for Specially Abled Students (Technical Degree)",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible specially abled students pursuing technical degree programmes",
    description: "AICTE scholarship scheme supporting eligible specially abled students pursuing technical degree programmes.",
    domains: ["Engineering", "Technology & Software", "Education"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "AICTE",
    title: "AICTE Swanath Scholarship Scheme (Technical Degree)",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible students pursuing technical degree programmes under the Swanath Scholarship criteria",
    description: "AICTE welfare scholarship supporting eligible students pursuing technical degree programmes.",
    domains: ["Engineering", "Technology & Software", "Education"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "Ministry of Social Justice & Empowerment",
    title: "PM YASASVI – Top Class Education for College Students",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible OBC, EBC and DNT students pursuing higher education",
    description: "Government scholarship support for eligible OBC, EBC and DNT students pursuing higher education.",
    domains: ["Education", "Engineering", "Technology & Software", "Business & Management"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "Department of Social Justice & Empowerment",
    title: "Central Sector Scholarship – Top Class Education for SC Students",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible SC students pursuing higher education",
    description: "Scholarship support for eligible SC students pursuing higher education in India.",
    domains: ["Education", "Engineering", "Technology & Software", "Business & Management"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "Ministry of Tribal Affairs",
    title: "National Fellowship and Scholarship for Higher Education of ST Students – Scholarship",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible ST students pursuing higher education",
    description: "Scholarship support for eligible Scheduled Tribe students pursuing higher education.",
    domains: ["Education", "Engineering", "Science & Healthcare", "Technology & Software"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "University Grants Commission",
    title: "Ishan Uday Special Scholarship Scheme for NER",
    category: "Scholarships",
    location: "North Eastern Region, India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible students from the North Eastern Region pursuing higher education",
    description: "Scholarship scheme supporting eligible students from India's North Eastern Region pursuing higher education.",
    domains: ["Education", "Engineering", "Technology & Software", "Science & Healthcare"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "North Eastern Council",
    title: "Financial Support to Students of NER for Higher Professional Courses – NEC Merit Scholarship",
    category: "Scholarships",
    location: "North Eastern Region, India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible students from the North Eastern Region pursuing higher professional courses",
    description: "Merit scholarship supporting eligible students from the North Eastern Region pursuing professional higher education.",
    domains: ["Education", "Engineering", "Technology & Software", "Business & Management"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "Ministry of Home Affairs",
    title: "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible wards of Central Armed Police Forces and Assam Rifles personnel pursuing higher education",
    description: "Scholarship scheme for eligible wards of Central Armed Police Forces and Assam Rifles personnel pursuing higher education.",
    domains: ["Education"],
    roles: ["Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "Reliance Foundation",
    title: "Reliance Foundation Undergraduate Scholarship 2026-27",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "Not specified",
    eligibility: "First-year undergraduate students enrolled in full-time degree programmes in India who meet the scholarship eligibility criteria",
    description: "Undergraduate scholarship supporting eligible first-year students through financial assistance, mentorship and development opportunities.",
    domains: ["Engineering", "Technology & Software", "Science & Healthcare", "Business & Management", "Education"],
    roles: ["Student"],
    source: "Reliance Foundation",
    applicationUrl: "https://scholarships.reliancefoundation.org/",
    skills: [],
  },
  {
    organization: "University Grants Commission",
    title: "National Scholarship for Post Graduate Studies",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Students admitted to the first year of an eligible regular full-time postgraduate degree programme",
    description: "UGC scholarship providing financial assistance to eligible students pursuing postgraduate degree programmes.",
    domains: ["Education", "Engineering", "Science & Healthcare", "Technology & Software", "Business & Management"],
    roles: ["Postgraduate Student", "Research Student"],
    source: "University Grants Commission",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "Reliance Foundation",
    title: "Reliance Foundation Postgraduate Scholarship 2026-27",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "Not specified",
    eligibility: "First-year postgraduate students enrolled in eligible full-time degree programmes in India",
    description: "Postgraduate scholarship supporting selected students through financial assistance, mentorship and development opportunities.",
    domains: ["Engineering", "Technology & Software", "Science & Healthcare", "Energy"],
    roles: ["Postgraduate Student", "Research Student"],
    source: "Reliance Foundation",
    applicationUrl: "https://scholarships.reliancefoundation.org/",
    skills: [],
  },
  {
    organization: "Indian Council of Agricultural Research",
    title: "ICAR Post Graduate Scholarship",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible postgraduate students pursuing agriculture and allied disciplines",
    description: "ICAR scholarship supporting eligible postgraduate students pursuing agriculture and related disciplines.",
    domains: ["Agriculture", "Science & Healthcare", "Research & Innovation"],
    roles: ["Postgraduate Student", "Research Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "Indian Council of Agricultural Research",
    title: "ICAR National Talent Scholarship – PG",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "31 October 2026",
    eligibility: "Eligible postgraduate students pursuing agriculture and allied disciplines",
    description: "ICAR national talent scholarship for eligible postgraduate students in agriculture and allied fields.",
    domains: ["Agriculture", "Science & Healthcare", "Research & Innovation"],
    roles: ["Postgraduate Student", "Research Student"],
    source: "National Scholarship Portal",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
  },
  {
    organization: "University Grants Commission",
    title: "P.G. Scholarship for University Rank Holders",
    category: "Scholarships",
    location: "India",
    workMode: "On-site",
    deadline: "Not specified",
    eligibility: "First and second rank holders at undergraduate level who are admitted to eligible postgraduate courses",
    description: "UGC scholarship providing financial assistance to eligible university rank holders pursuing postgraduate study.",
    domains: ["Education", "Engineering", "Science & Healthcare", "Technology & Software", "Business & Management"],
    roles: ["Postgraduate Student"],
    source: "University Grants Commission",
    applicationUrl: "https://scholarships.gov.in/",
    skills: [],
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
  return `scholarship-${cleanSource}-${hash}`;
}

async function run() {
  console.log("=== OppurtuNest Curated Scholarships Importer ===");

  try {
    // 2. Connect to MongoDB using existing configuration
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial opportunities in MongoDB: ${initialTotal}`);

    let insertedCount = 0;
    let updatedCount = 0;

    // 3. Upsert each scholarship using a deterministic unique ID
    for (const item of curatedScholarships) {
      const stableId = generateStableId(item.source, item.title);

      const recordData = {
        id: stableId,
        title: item.title,
        category: "Scholarships",
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
        source: item.source,
        applicationUrl: item.applicationUrl,
        skills: item.skills || [],
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
          { title: item.title, organization: item.organization, category: "Scholarships" },
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

    // 5. Print how many scholarships were inserted and updated
    console.log("\n=== Insertion / Upsert Summary ===");
    console.log(`Scholarships inserted: ${insertedCount}`);
    console.log(`Scholarships updated:  ${updatedCount}`);

    const totalAfter = await Opportunity.countDocuments();
    console.log(`Total opportunities after import: ${totalAfter}`);

    // 6. Print the final scholarship count
    const totalScholarships = await Opportunity.countDocuments({ category: "Scholarships" });
    const curatedScholarshipsCount = await Opportunity.countDocuments({
      category: "Scholarships",
      id: { $regex: /^scholarship-/ },
    });
    console.log(`Curated scholarships imported:    ${curatedScholarshipsCount} (Expected: 15)`);
    console.log(`Final scholarship count in DB:     ${totalScholarships} (6 sample + 15 curated = 21)`);

  } catch (error) {
    console.error("Scholarship import failed:", error.message);
    process.exitCode = 1;
  } finally {
    // 7. Close MongoDB cleanly
    try {
      await mongoose.connection.close();
      console.log("\nMongoDB connection closed cleanly.");
    } catch (closeErr) {
      console.error("Error closing connection:", closeErr.message);
    }
  }
}

run();
