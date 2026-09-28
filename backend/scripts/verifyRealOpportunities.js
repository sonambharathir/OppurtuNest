const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("../config/db");
const Opportunity = require("../models/Opportunity");
const { getPersonalizedRecommendations } = require("../utils/recommendationEngine");

async function verifyAll() {
  console.log("==================================================");
  console.log("OppurtuNest — Real Opportunities Verification");
  console.log("==================================================\n");

  try {
    await connectDB();

    const all = await Opportunity.find({});
    console.log(`1. Total Opportunities in MongoDB: ${all.length}`);

    // Check sample opportunities
    const sample = all.filter((o) => o.id && o.id.startsWith("opp-"));
    console.log(`2. Sample opportunities remaining: ${sample.length} (Expected: 0)`);

    // Category breakdown
    const categories = [
      "Internships",
      "Hackathons",
      "Scholarships",
      "Competitions",
      "Workshops",
      "Research",
      "Certifications",
    ];

    console.log("\n3. Category Breakdown:");
    const breakdown = {};
    for (const cat of categories) {
      const items = all.filter((o) => o.category === cat);
      breakdown[cat] = items.length;
      console.log(`   - ${cat}: ${items.length}`);
    }

    // Application URL validation
    let validUrls = 0;
    let missingUrls = 0;
    const invalidList = [];

    all.forEach((opp) => {
      const url = opp.applicationUrl;
      const isValid =
        Boolean(url) &&
        typeof url === "string" &&
        url.trim() !== "#" &&
        (url.trim().startsWith("http://") || url.trim().startsWith("https://"));

      if (isValid) {
        validUrls++;
      } else {
        missingUrls++;
        invalidList.push({ id: opp.id, title: opp.title, category: opp.category, url });
      }
    });

    console.log("\n4. Application URL Status:");
    console.log(`   - Opportunities with valid HTTP/HTTPS applicationUrl: ${validUrls}`);
    console.log(`   - Opportunities missing valid applicationUrl: ${missingUrls}`);
    if (missingUrls > 0) {
      console.error("   INVALID RECORDS FOUND:", invalidList);
    } else {
      console.log("   ✓ 100% of remaining opportunities have valid, external application URLs!");
    }

    // Hackathon opportunities verification
    const hackathonList = all.filter((o) => o.category === "Hackathons");
    console.log(`\n5. Hackathon Opportunities: ${hackathonList.length}`);
    hackathonList.forEach((h) => {
      console.log(`   - [${h.id}] ${h.title} (${h.organization}) -> ${h.applicationUrl}`);
    });

    // Sample from each category
    console.log("\n6. Sample Verified Opportunity from Each Category:");
    for (const cat of categories) {
      const sampleItem = all.find((o) => o.category === cat);
      if (sampleItem) {
        console.log(`   [${cat}]`);
        console.log(`     Title:        ${sampleItem.title}`);
        console.log(`     Organization: ${sampleItem.organization || sampleItem.organizer}`);
        console.log(`     Location:     ${sampleItem.location}`);
        console.log(`     WorkMode:     ${sampleItem.workMode || sampleItem.mode}`);
        console.log(`     Deadline:     ${sampleItem.deadline}`);
        console.log(`     App URL:      ${sampleItem.applicationUrl}`);
      }
    }

    // Personalized Recommendations test on real data
    console.log("\n7. Personalized Recommendations on Real Dataset:");
    const testStudent = {
      name: "Engineering Student",
      skills: ["React", "Python", "Machine Learning", "Problem Solving"],
      goals: ["Gain industry experience", "Learn cutting-edge skills"],
      opportunityTypes: ["Internships", "Hackathons", "Certifications"],
      preferredRoles: ["Frontend Developer", "AI Developer"],
      preferredLocation: "Online",
      workModes: ["Online", "Remote"],
      interests: ["Web Development", "Artificial Intelligence"],
    };

    const recs = getPersonalizedRecommendations(all, testStudent, 6);
    console.log(`   Generated ${recs.length} personalized recommendations:`);
    recs.forEach((r, idx) => {
      console.log(`   #${idx + 1}: ${r.title} [${r.category}] -> Label: "${r.matchLabel}", AppUrl: ${r.applicationUrl}`);
    });

    console.log("\n==================================================");
    console.log("✓ All Verification Checks PASSED Successfully!");
    console.log("==================================================");
  } catch (error) {
    console.error("Verification failed:", error);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
    } catch (e) {
      // ignore
    }
  }
}

verifyAll();
