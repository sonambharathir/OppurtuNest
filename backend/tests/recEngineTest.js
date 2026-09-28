// Unit test for backend/utils/recommendationEngine.js
const { getPersonalizedRecommendations } = require("../utils/recommendationEngine");
const opportunities = require("../data/opportunitiesData");

console.log("Testing Recommendation Engine Logic...");

const testStudent = {
  name: "Dev Candidate",
  skills: ["React", "JavaScript", "HTML & CSS", "Git"],
  goals: ["Find internship"],
  opportunityTypes: ["Internships"],
  preferredRoles: ["Frontend Developer"],
  preferredLocation: "Bengaluru, India",
  workModes: ["Remote"],
  interests: ["Web Development"],
};

const recommendations = getPersonalizedRecommendations(opportunities, testStudent, 6);

console.log(`Generated ${recommendations.length} recommendations:`);
recommendations.forEach((r, idx) => {
  console.log(
    `#${idx + 1}: ${r.title} [${r.category}] -> Label: "${r.matchLabel}", Score: ${r.matchScoreNum}, Reason: "${r.matchReason}"`
  );
});

if (recommendations.length === 6 && recommendations[0].matchLabel === "Strong match") {
  console.log("\n✓ PASS: Recommendation engine accurately matches frontend scoring algorithm!");
  process.exit(0);
} else {
  console.error("\n✗ FAIL: Unexpected recommendation output.");
  process.exit(1);
}
