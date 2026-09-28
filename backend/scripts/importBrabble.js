const path = require("path");
const mongoose = require("mongoose");

// Load backend/.env using dotenv with the exact path to backend/.env
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

// Verify that BRABBLE_API_KEY exists without printing or exposing it
if (!process.env.BRABBLE_API_KEY || !process.env.BRABBLE_API_KEY.trim()) {
  console.error("BRABBLE_API_KEY is missing from backend/.env");
  process.exit(1);
}

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

/**
 * Normalizes Brabble mode values to OppurtuNest standard work modes
 */
function normalizeMode(modeStr) {
  if (!modeStr) return "";
  const m = String(modeStr).toLowerCase().trim();
  if (m === "online") return "Remote";
  if (m === "offline" || m === "in-person") return "On-site";
  if (m === "hybrid") return "Hybrid";
  return modeStr.charAt(0).toUpperCase() + modeStr.slice(1).toLowerCase();
}

/**
 * Formats ISO deadline into human-readable date string
 */
function formatDeadline(deadlineStr) {
  if (!deadlineStr) return "";
  try {
    const d = new Date(deadlineStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch {
    // Fall back to original string
  }
  return String(deadlineStr);
}

/**
 * Normalizes a single Brabble listing into the OppurtuNest Opportunity schema format
 */
function normalizeBrabbleListing(listing) {
  if (!listing || !listing.id) return null;

  const recordId = `brabble-${listing.id}`;
  const normMode = normalizeMode(listing.mode);

  // Normalize eligibility string
  let eligibilityStr = "";
  if (Array.isArray(listing.eligibility)) {
    eligibilityStr = listing.eligibility.filter(Boolean).join(", ");
  } else if (typeof listing.eligibility === "string") {
    eligibilityStr = listing.eligibility.trim();
  }

  // Preserve prize information in stipend and prize field
  let stipendStr = "";
  if (listing.prize && typeof listing.prize === "object" && listing.prize.label) {
    stipendStr = `Prize: ${listing.prize.label}`;
  } else if (typeof listing.prize === "string") {
    stipendStr = listing.prize;
  }

  return {
    id: recordId,
    title: listing.title ? String(listing.title).trim() : "Untitled Hackathon",
    category: "Hackathons",
    organization: listing.organiser ? String(listing.organiser).trim() : "",
    organizer: listing.organiser ? String(listing.organiser).trim() : "",
    location: listing.city ? String(listing.city).trim() : (normMode === "Remote" ? "Remote" : ""),
    workMode: normMode,
    mode: normMode,
    deadline: formatDeadline(listing.deadline),
    stipend: stipendStr,
    applicationUrl: listing.url || listing.shareUrl || "#",
    eligibility: eligibilityStr,
    source: "Brabble",
    platform: listing.platform ? String(listing.platform).trim() : "",
    prize: listing.prize || null,
    fee: listing.fee ? String(listing.fee).trim() : "",
    // Schema default values for fields not provided by Brabble
    duration: "",
    domain: "",
    domains: [],
    roles: [],
    skills: [],
    bonusSkills: [],
    eligibleDegrees: [],
    eligibleYears: [],
    description: listing.description ? String(listing.description).trim() : "",
    featuredBadge: "",
  };
}

async function runImporter() {
  console.log("=== OppurtuNest Brabble Hackathons Importer ===");

  try {
    // 1. Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await connectDB();

    // 2. Fetch listings from official Brabble API
    const apiUrl = "https://brabble.ai/api/listings?hub=hackathons&limit=10";
    console.log("Fetching hackathon listings from Brabble API...");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BRABBLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Brabble API returned HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.listings)) {
      throw new Error("Brabble API response did not contain a valid listings array");
    }

    const brabbleTotal = typeof data.total === "number" ? data.total : "Unknown";
    const fetchedCount = data.listings.length;
    console.log(`Brabble total available: ${brabbleTotal}`);
    console.log(`Fetched listings count: ${fetchedCount}`);

    // 3. Normalize and Upsert listings into MongoDB
    let normalizedCount = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    for (const listing of data.listings) {
      const normalized = normalizeBrabbleListing(listing);
      if (!normalized) continue;
      normalizedCount++;

      const existing = await Opportunity.findOne({ id: normalized.id });

      if (existing) {
        await Opportunity.updateOne({ id: normalized.id }, { $set: normalized });
        updatedCount++;
      } else {
        await Opportunity.create(normalized);
        insertedCount++;
      }
    }

    // 4. Report Safe Summary
    console.log("\n=== Import Results Summary ===");
    console.log(`Brabble total reported: ${brabbleTotal}`);
    console.log(`Listings fetched:       ${fetchedCount}`);
    console.log(`Successfully normalized: ${normalizedCount}`);
    console.log(`Newly inserted:         ${insertedCount}`);
    console.log(`Existing updated:       ${updatedCount}`);
    console.log(`Status:                 Completed successfully`);

    // Verify existing sample opportunities count
    const totalInDb = await Opportunity.countDocuments();
    const brabbleInDb = await Opportunity.countDocuments({ source: "Brabble" });
    const sampleInDb = await Opportunity.countDocuments({ source: { $ne: "Brabble" } });
    console.log(`\nDatabase Totals:`);
    console.log(`- Total opportunities in DB:    ${totalInDb}`);
    console.log(`- Real Brabble opportunities:    ${brabbleInDb}`);
    console.log(`- Preserved sample opportunities: ${sampleInDb}`);

  } catch (error) {
    console.error("Importer failed:", error.message);
    process.exitCode = 1;
  } finally {
    // 5. Cleanly close MongoDB connection
    try {
      await mongoose.connection.close();
      console.log("\nMongoDB connection closed cleanly.");
    } catch (closeErr) {
      console.error("Error closing MongoDB connection:", closeErr.message);
    }
  }
}

runImporter();
