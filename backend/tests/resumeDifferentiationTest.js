// OppurtuNest — Resume Differentiation & Eligibility Automated Test
// Validates that distinct resumes produce completely distinct, filtered recommendations

const assert = require("assert");
const { getPersonalizedRecommendations, scoreOpportunityForProfile } = require("../utils/recommendationEngine");
const opportunities = require("../data/opportunitiesData");

console.log("==================================================");
console.log("Testing Resume-Driven Recommendations & Differentiation");
console.log("==================================================\n");

// Resume 1: Web / Frontend Developer
const webResumeStudent = {
  name: "Alex Chen",
  degree: "B.Tech",
  year: "3rd Year",
  resumeSkills: ["React", "JavaScript", "TypeScript", "HTML & CSS", "Tailwind", "REST APIs", "Git & GitHub"],
  skills: ["React", "JavaScript", "TypeScript", "HTML & CSS", "Tailwind", "REST APIs", "Git & GitHub"],
  interests: ["Technology & Software", "Web Development"],
  goals: ["Find frontend internship", "Build web projects"],
};

// Resume 2: AI / Machine Learning Engineer
const aiResumeStudent = {
  name: "Sarah Patel",
  degree: "B.Tech",
  year: "Final Year",
  resumeSkills: ["Python", "Machine Learning", "Deep Learning", "Data Science", "PyTorch", "TensorFlow", "Pandas", "NumPy"],
  skills: ["Python", "Machine Learning", "Deep Learning", "Data Science", "PyTorch", "TensorFlow", "Pandas", "NumPy"],
  interests: ["AI & Data", "Machine Learning"],
  goals: ["Find AI research internship", "Build machine learning models"],
};

// Resume 3: Biotechnology / Life Sciences Researcher
const biotechResumeStudent = {
  name: "Elena Rostova",
  degree: "B.S.",
  year: "3rd Year",
  resumeSkills: ["Biotechnology", "Life Sciences", "Bioinformatics", "Biology", "Genetics", "Research", "Pharmaceuticals"],
  skills: ["Biotechnology", "Life Sciences", "Bioinformatics", "Biology", "Genetics", "Research", "Pharmaceuticals"],
  interests: ["Science & Healthcare", "Biotechnology"],
  goals: ["Find research opportunity", "Conduct clinical trials"],
};

// Resume 4: Cyber Security & Cloud Engineer
const cyberResumeStudent = {
  name: "Marcus Vance",
  degree: "B.Tech",
  year: "2nd Year",
  resumeSkills: ["Cybersecurity", "Network Security", "Linux", "Docker", "AWS", "Cloud Computing"],
  skills: ["Cybersecurity", "Network Security", "Linux", "Docker", "AWS", "Cloud Computing"],
  interests: ["Technology & Software", "Cybersecurity", "Cloud Computing"],
  goals: ["Find cybersecurity internship"],
};

// Test 1: Generate recommendations for Web Resume
const webRecs = getPersonalizedRecommendations(opportunities, webResumeStudent, 6);
console.log(`1. Web Developer Resume (${webRecs.length} recommendations):`);
webRecs.forEach((r, idx) => {
  console.log(`   #${idx + 1}: [${r.category}] ${r.title} (Score: ${r.matchScoreNum}, Label: ${r.matchLabel}, Matched Skills: [${r.matchedSkills.join(", ")}])`);
});

// Test 2: Generate recommendations for AI Resume
const aiRecs = getPersonalizedRecommendations(opportunities, aiResumeStudent, 6);
console.log(`\n2. AI / ML Engineer Resume (${aiRecs.length} recommendations):`);
aiRecs.forEach((r, idx) => {
  console.log(`   #${idx + 1}: [${r.category}] ${r.title} (Score: ${r.matchScoreNum}, Label: ${r.matchLabel}, Matched Skills: [${r.matchedSkills.join(", ")}])`);
});

// Test 3: Generate recommendations for Biotech Resume
const bioRecs = getPersonalizedRecommendations(opportunities, biotechResumeStudent, 6);
console.log(`\n3. Biotech Researcher Resume (${bioRecs.length} recommendations):`);
bioRecs.forEach((r, idx) => {
  console.log(`   #${idx + 1}: [${r.category}] ${r.title} (Score: ${r.matchScoreNum}, Label: ${r.matchLabel}, Matched Skills: [${r.matchedSkills.join(", ")}])`);
});

// Test 4: Generate recommendations for Cyber Resume
const cyberRecs = getPersonalizedRecommendations(opportunities, cyberResumeStudent, 6);
console.log(`\n4. Cyber Security Resume (${cyberRecs.length} recommendations):`);
cyberRecs.forEach((r, idx) => {
  console.log(`   #${idx + 1}: [${r.category}] ${r.title} (Score: ${r.matchScoreNum}, Label: ${r.matchLabel}, Matched Skills: [${r.matchedSkills.join(", ")}])`);
});

// Assertions for Differentiation:
const webIds = new Set(webRecs.map((r) => r.id || r._id));
const aiIds = new Set(aiRecs.map((r) => r.id || r._id));
const bioIds = new Set(bioRecs.map((r) => r.id || r._id));
const cyberIds = new Set(cyberRecs.map((r) => r.id || r._id));

// Verify that Web top recommendations contain web/frontend skills
assert.ok(webRecs.length > 0, "Web resume must have recommendations");
assert.ok(webRecs.every((r) => r.matchedSkills.some((s) => ["React", "JavaScript", "HTML & CSS", "TypeScript"].includes(s))), "All Web recs must contain frontend skills");

// Verify that AI top recommendations contain AI/Python skills
assert.ok(aiRecs.length > 0, "AI resume must have recommendations");
assert.ok(aiRecs.every((r) => r.matchedSkills.some((s) => ["Python", "Machine Learning", "Deep Learning", "Data Analysis", "PyTorch"].includes(s)) || r.matchedDomains.includes("AI & Data")), "All AI recs must match AI skills or domain");

// Verify that Biotech recommendations strictly belong to Science & Healthcare
assert.ok(bioRecs.length > 0, "Biotech resume must have recommendations");
assert.ok(bioRecs.every((r) => (r.domains || []).includes("Science & Healthcare") || (r.domains || []).includes("Research & Innovation")), "All Biotech recs must match Science/Healthcare/Research domains");

// Verify Web and Cyber differentiation
let webCyberOverlap = 0;
webIds.forEach((id) => { if (cyberIds.has(id)) webCyberOverlap++; });
console.log(`\n5. Web vs Cyber Overlap: ${webCyberOverlap} (Expected: 0)`);
assert.strictEqual(webCyberOverlap, 0, "Web and Cyber recommendations must have 0 overlap");

// Verify Web and Biotech differentiation
let webBioOverlap = 0;
webIds.forEach((id) => { if (bioIds.has(id)) webBioOverlap++; });
console.log(`   Web vs Biotech Overlap: ${webBioOverlap} (Expected: 0)`);
assert.strictEqual(webBioOverlap, 0, "Web and Biotech recommendations must have 0 overlap");

// Test 5: Ineligible Student Check
console.log("\n6. Testing Ineligible Student Exclusion:");
const ineligibleStudent = {
  name: "Freshman Student",
  degree: "High School",
  year: "1st Year",
  resumeSkills: ["React"],
  skills: ["React"],
};
const testOppRequiresDegree = {
  id: "test-opp-1",
  title: "Senior Master Research Fellow",
  category: "Research",
  skills: ["React"],
  eligibleDegrees: ["M.S.", "Ph.D."],
  deadline: "2029-12-31",
};
const scoredIneligible = scoreOpportunityForProfile(ineligibleStudent, testOppRequiresDegree);
console.log(`   - Ineligible student scored: ${scoredIneligible.matchScoreNum} (isEligible: ${scoredIneligible.isEligible})`);
assert.strictEqual(scoredIneligible.isEligible, false, "Must detect degree mismatch as ineligible");
assert.strictEqual(scoredIneligible.matchScoreNum, 0, "Ineligible opportunity must have rankScore = 0");

console.log("\n✓ ALL RESUME DIFFERENTIATION & ELIGIBILITY TESTS PASSED SUCCESSFULLY!\n");
process.exit(0);
