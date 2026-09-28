const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");

async function removeSampleOpportunities() {
  console.log("=== OppurtuNest: Remove Original Sample Opportunities ===");

  try {
    await connectDB();

    const initialTotal = await Opportunity.countDocuments();
    console.log(`Initial total opportunities in MongoDB: ${initialTotal}`);

    // Identify sample records (IDs starting with 'opp-')
    const sampleQuery = { id: { $regex: /^opp-/ } };
    const sampleCount = await Opportunity.countDocuments(sampleQuery);
    console.log(`Sample opportunities identified for removal: ${sampleCount}`);

    // Safety check: ensure real opportunities are NOT matched
    const protectedCount = await Opportunity.countDocuments({
      $or: [
        { id: { $regex: /^brabble-/ } },
        { id: { $regex: /^curated-/ } },
        { id: { $regex: /^scholarship-/ } },
        { id: { $regex: /^competition-/ } },
        { id: { $regex: /^workshop-/ } },
        { id: { $regex: /^research-/ } },
        { id: { $regex: /^certification-/ } },
      ],
    });
    console.log(`Protected real opportunities found: ${protectedCount}`);

    if (sampleCount === 0) {
      console.log("No sample opportunities found. Database already contains only real data.");
    } else {
      const deleteResult = await Opportunity.deleteMany(sampleQuery);
      console.log(`Successfully deleted ${deleteResult.deletedCount} sample opportunities from MongoDB.`);
    }

    // Verify remaining data
    const remainingTotal = await Opportunity.countDocuments();
    console.log(`Remaining total opportunities in MongoDB: ${remainingTotal}`);

    // Verify breakdown by category
    const categories = [
      "Internships",
      "Hackathons",
      "Scholarships",
      "Competitions",
      "Workshops",
      "Research",
      "Certifications",
    ];

    console.log("\n--- Category Breakdown of Real Opportunities ---");
    for (const cat of categories) {
      const count = await Opportunity.countDocuments({ category: cat });
      console.log(`  - ${cat}: ${count}`);
    }

    // Verify applicationUrl integrity
    const allRemaining = await Opportunity.find({});
    let validUrls = 0;
    let missingUrls = 0;
    const missingList = [];

    allRemaining.forEach((opp) => {
      const url = opp.applicationUrl;
      if (url && typeof url === "string" && (url.startsWith("http://") || url.startsWith("https://"))) {
        validUrls++;
      } else {
        missingUrls++;
        missingList.push({ id: opp.id, title: opp.title, category: opp.category, url });
      }
    });

    console.log("\n--- Application URL Integrity ---");
    console.log(`  Valid HTTP/HTTPS application URLs: ${validUrls}`);
    console.log(`  Missing or invalid application URLs: ${missingUrls}`);
    if (missingUrls > 0) {
      console.warn("  Opportunities missing valid applicationUrl:", missingList);
    } else {
      console.log("  ✓ All remaining opportunities have verified, valid application URLs!");
    }

    console.log("\nSample data cleanup completed successfully.");
  } catch (error) {
    console.error("Failed to remove sample opportunities:", error.message);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed cleanly.");
    } catch (closeErr) {
      console.error("Error closing connection:", closeErr.message);
    }
  }
}

removeSampleOpportunities();
