// OppurtuNest — Route and Model Integrity Test
// Verifies that all models, routes, and utilities load without syntax or dependency errors.

console.log("Checking backend models and routes integrity...");

try {
  // 1. Models
  const Student = require("../models/Student");
  console.log("✓ Student model loaded successfully:", Student.modelName);

  const Opportunity = require("../models/Opportunity");
  console.log("✓ Opportunity model loaded successfully:", Opportunity.modelName);

  // 2. Data
  const opportunities = require("../data/opportunitiesData");
  console.log(`✓ Seed opportunities loaded successfully: ${opportunities.length} items`);

  // 3. Recommendation Engine
  const { getPersonalizedRecommendations, scoreOpportunityForProfile } = require("../utils/recommendationEngine");
  console.log("✓ Recommendation engine loaded successfully");

  // 4. Routes
  const studentRoutes = require("../routes/studentRoutes");
  console.log("✓ Student routes loaded successfully");

  const opportunityRoutes = require("../routes/opportunityRoutes");
  console.log("✓ Opportunity routes loaded successfully");

  const recommendationRoutes = require("../routes/recommendationRoutes");
  console.log("✓ Recommendation routes loaded successfully");

  // 5. Server
  // Ensure server.js exports the express app
  const serverPath = require.resolve("../server");
  console.log("✓ Server file resolves at:", serverPath);

  console.log("\n==================================================");
  console.log("All backend modules, schemas, and routes verified!");
  console.log("==================================================");
  process.exit(0);
} catch (error) {
  console.error("✗ Module verification failed:", error);
  process.exit(1);
}
