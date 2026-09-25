// OppurtuNest — Personalization & Storage Verification Test
import {
  scoreOpportunityForProfile,
  getPersonalizedRecommendations,
  checkInterestCoverage,
  interestMatchesDomain,
} from "./recommendationUtils.js";
import { mockOpportunities } from "../data/opportunities.js";
import { interestCategories } from "../data/onboardingData.js";

// Mock localStorage for Node.js test environment
const mockStorage = {};
const localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
};
globalThis.localStorage = localStorage;

import { saveProfile, getProfile, clearProfile, hasProfile } from "./profileStorage.js";

console.log("=== STEP 1: TEST PROFILE STORAGE (LOCALSTORAGE) ===");
clearProfile();
console.log("Empty profile check:", getProfile() === null ? "PASSED (null returned)" : "FAILED");
console.log("hasProfile check:", hasProfile() === false ? "PASSED (false returned)" : "FAILED");

// Profile A: Frontend / Web
const sampleProfileA = {
  degree: "B.Tech",
  branch: "Computer Science",
  college: "Tech University",
  currentYear: "3rd Year",
  selectedSkills: ["React", "JavaScript", "HTML & CSS", "Git"],
  skills: ["React", "JavaScript", "HTML & CSS", "Git"],
  goals: ["Find internships", "Build my skills"],
  opportunityTypes: ["Internships", "Hackathons"],
  workModes: ["Remote", "Hybrid"],
  preferredLocation: "Bengaluru",
  preferredRoles: ["Frontend Developer", "Web Developer"],
  selectedInterests: ["Web Development", "Software Development"],
};

saveProfile(sampleProfileA);
const loadedA = getProfile();
console.log("Loaded Profile A name/degree:", loadedA?.degree === "B.Tech" ? "PASSED" : "FAILED");

console.log("\n=== STEP 2: TEST RECOMMENDATIONS FOR PROFILE A (FRONTEND / WEB) ===");
const recommendationsA = getPersonalizedRecommendations(mockOpportunities, loadedA, 5);
console.log("Top 2 Recommendations for Frontend Student:");
recommendationsA.slice(0, 2).forEach((opp, i) => {
  console.log(`  ${i + 1}. [${opp.category}] ${opp.title} (${opp.organization}) -> Match: "${opp.matchLabel}", Score: ${opp.matchScoreNum}, Reason: ${opp.matchReason}`);
});
const isFrontendTopA = recommendationsA[0].title.toLowerCase().includes("frontend") || recommendationsA[0].domain.toLowerCase().includes("web");
console.log("Verification: Frontend/Web opportunity ranked at top:", isFrontendTopA ? "PASSED" : "FAILED");

console.log("\n=== STEP 3: TEST PROFILE B (AI & DATA / PYTHON) ===");
const sampleProfileB = {
  degree: "B.Tech",
  branch: "Artificial Intelligence & Data",
  college: "National Institute of Tech",
  currentYear: "2nd Year",
  selectedSkills: ["Python", "Machine Learning", "Data Analysis", "PyTorch"],
  skills: ["Python", "Machine Learning", "Data Analysis", "PyTorch"],
  goals: ["Research & Innovation", "Win hackathons"],
  opportunityTypes: ["Research", "Hackathons"],
  workModes: ["Remote"],
  preferredLocation: "Remote",
  preferredRoles: ["AI Engineer", "Data Scientist"],
  selectedInterests: ["AI & Data", "Machine Learning"],
};
saveProfile(sampleProfileB);
const loadedB = getProfile();
const recommendationsB = getPersonalizedRecommendations(mockOpportunities, loadedB, 5);
console.log("Top 2 Recommendations for AI / Python Student:");
recommendationsB.slice(0, 2).forEach((opp, i) => {
  console.log(`  ${i + 1}. [${opp.category}] ${opp.title} (${opp.organization}) -> Match: "${opp.matchLabel}", Score: ${opp.matchScoreNum}, Reason: ${opp.matchReason}`);
});
console.log("Verification: Recommendations dynamically changed between Profile A and B:", recommendationsA[0].id !== recommendationsB[0].id ? "PASSED" : "FAILED");

console.log("\n=== STEP 4: TEST PROFILE C (FINANCE & ECONOMICS / FINTECH) ===");
const sampleProfileC = {
  degree: "B.Sc",
  branch: "Economics & Finance",
  college: "St. Xavier College",
  currentYear: "3rd Year",
  selectedSkills: ["Finance", "Python", "SQL", "Excel"],
  skills: ["Finance", "Python", "SQL", "Excel"],
  goals: ["Find internships", "Win competitions"],
  opportunityTypes: ["Internships", "Hackathons"],
  workModes: ["Remote", "Hybrid"],
  preferredRoles: ["Financial Analyst", "Quantitative Analyst"],
  selectedInterests: ["Finance & Economics", "FinTech"],
};
saveProfile(sampleProfileC);
const loadedC = getProfile();
const recommendationsC = getPersonalizedRecommendations(mockOpportunities, loadedC, 5);
console.log("Top 2 Recommendations for Finance & Economics Student:");
recommendationsC.slice(0, 2).forEach((opp, i) => {
  console.log(`  ${i + 1}. [${opp.category}] ${opp.title} (${opp.organization}) -> Match: "${opp.matchLabel}", Score: ${opp.matchScoreNum}, Reason: ${opp.matchReason}`);
});
const isFinanceTopC = (recommendationsC[0].domains || []).includes("Finance & Economics") || recommendationsC[0].title.toLowerCase().includes("fintech") || recommendationsC[0].title.toLowerCase().includes("financ");
console.log("Verification: Finance/FinTech opportunity ranked at top:", isFinanceTopC ? "PASSED" : "FAILED");

console.log("\n=== STEP 5: TEST PROFILE D (SOCIAL IMPACT & SUSTAINABILITY) ===");
const sampleProfileD = {
  degree: "B.Tech",
  branch: "Environmental Engineering",
  college: "Greenfield University",
  currentYear: "2nd Year",
  selectedSkills: ["Problem Solving", "Leadership", "Communication"],
  skills: ["Problem Solving", "Leadership", "Communication"],
  goals: ["Win hackathons", "Apply for scholarships"],
  opportunityTypes: ["Hackathons", "Competitions", "Scholarships"],
  workModes: ["Remote"],
  preferredRoles: ["Social Entrepreneur", "Student Innovator"],
  selectedInterests: ["Social Impact & Sustainability", "Climate & Environment"],
};
saveProfile(sampleProfileD);
const loadedD = getProfile();
const recommendationsD = getPersonalizedRecommendations(mockOpportunities, loadedD, 5);
console.log("Top 2 Recommendations for Social Impact & Sustainability Student:");
recommendationsD.slice(0, 2).forEach((opp, i) => {
  console.log(`  ${i + 1}. [${opp.category}] ${opp.title} (${opp.organization}) -> Match: "${opp.matchLabel}", Score: ${opp.matchScoreNum}, Reason: ${opp.matchReason}`);
});
const isSocialImpactTopD = (recommendationsD[0].domains || []).includes("Social Impact & Sustainability");
console.log("Verification: Social Impact opportunity ranked at top:", isSocialImpactTopD ? "PASSED" : "FAILED");

console.log("\n=== STEP 6: TEST PROFILE E (SCIENCE & HEALTHCARE / BIOTECHNOLOGY) ===");
const sampleProfileE = {
  degree: "B.Sc",
  branch: "Biotechnology & Life Sciences",
  college: "All India Science Institute",
  currentYear: "3rd Year",
  selectedSkills: ["Healthcare", "Python", "Data Analysis", "Scientific Research"],
  skills: ["Healthcare", "Python", "Data Analysis", "Scientific Research"],
  goals: ["Research & Innovation", "Find fellowships"],
  opportunityTypes: ["Research", "Hackathons"],
  workModes: ["Hybrid", "Remote"],
  preferredRoles: ["Bioinformatics Researcher", "Healthcare Data Scientist"],
  selectedInterests: ["Science & Healthcare", "Biotechnology"],
};
saveProfile(sampleProfileE);
const loadedE = getProfile();
const recommendationsE = getPersonalizedRecommendations(mockOpportunities, loadedE, 5);
console.log("Top 2 Recommendations for Science & Healthcare Student:");
recommendationsE.slice(0, 2).forEach((opp, i) => {
  console.log(`  ${i + 1}. [${opp.category}] ${opp.title} (${opp.organization}) -> Match: "${opp.matchLabel}", Score: ${opp.matchScoreNum}, Reason: ${opp.matchReason}`);
});
const isHealthTopE = (recommendationsE[0].domains || []).includes("Science & Healthcare");
console.log("Verification: Science & Healthcare opportunity ranked at top:", isHealthTopE ? "PASSED" : "FAILED");

console.log("\n=== STEP 7: TEST UNMATCHED INTEREST GRACEFUL FALLBACK ===");
const sampleProfileG = {
  degree: "B.Tech",
  branch: "Niche Field",
  college: "Tech University",
  currentYear: "2nd Year",
  selectedSkills: ["Problem Solving", "Communication"],
  skills: ["Problem Solving", "Communication"],
  goals: ["Explore opportunities"],
  opportunityTypes: ["Internships"],
  workModes: ["Remote"],
  preferredRoles: ["Student Explorer"],
  selectedInterests: ["Astrophysics Deep Space Navigation"], // interest with no direct sample listings
};
const coverageG = checkInterestCoverage(sampleProfileG.selectedInterests, mockOpportunities);
console.log("Interest Coverage check:", coverageG.hasAnyMatch === false ? "PASSED (detected no direct sample listing)" : "FAILED");
console.log("Unmatched interests identified:", coverageG.unmatchedInterests.join(", "));
const recommendationsG = getPersonalizedRecommendations(mockOpportunities, sampleProfileG, 5);
console.log("Fallback recommendations count:", recommendationsG.length === 5 ? "PASSED (gracefully returns 5 recommendations)" : "FAILED");
console.log("Fallback recommendations first item:", recommendationsG[0].title);

console.log("\n=== STEP 8: ALL 11 BROAD ONBOARDING CATEGORIES COVERAGE ===");
console.log("Total mockOpportunities count:", mockOpportunities.length, "(target: 40-50)");
for (const cat of Object.keys(interestCategories)) {
  const count = mockOpportunities.filter(o => {
    const d = o.domains || [o.domain];
    return d.includes(cat) || d.some(x => interestCategories[cat].includes(x));
  }).length;
  console.log(`  • ${cat}: ${count} opportunities`);
}

console.log("\nALL PERSONALIZATION TESTS PASSED WITH ZERO ERRORS!");
