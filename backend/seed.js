const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const connectDB = require("./config/db");
const Opportunity = require("./models/Opportunity");
const opportunities = require("./data/opportunitiesData");

const seedOpportunities = async () => {
  try {
    await connectDB();
    console.log(`Starting seeding of ${opportunities.length} opportunities...`);

    const operations = opportunities.map((opp) => ({
      updateOne: {
        filter: { id: opp.id },
        update: { $set: opp },
        upsert: true,
      },
    }));

    const result = await Opportunity.bulkWrite(operations);
    console.log(
      `Seeding completed. Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}, Matched: ${result.matchedCount}`
    );

    const totalCount = await Opportunity.countDocuments();
    console.log(`Total opportunities in MongoDB: ${totalCount}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedOpportunities();
