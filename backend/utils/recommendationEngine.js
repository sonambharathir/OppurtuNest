// OppurtuNest — Backend Recommendation Engine
// Faithfully reproduces the deterministic, explainable scoring logic from src/utils/recommendationUtils.js

const interestCategories = {
  "Technology & Software": [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
  ],
  "AI & Data": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Data Analytics",
    "Deep Learning",
    "Natural Language Processing",
  ],
  "Design & Creativity": [
    "UI/UX Design",
    "Graphic Design",
    "Product Design",
    "Animation",
    "Content Creation",
    "Photography",
  ],
  "Business & Entrepreneurship": [
    "Entrepreneurship",
    "Startups",
    "Business Strategy",
    "Product Management",
    "Consulting",
    "Operations",
  ],
  "Marketing & Communication": [
    "Digital Marketing",
    "Social Media",
    "Branding",
    "Content Marketing",
    "Public Relations",
    "Communications",
  ],
  "Research & Innovation": [
    "Scientific Research",
    "Academic Research",
    "Innovation",
    "Emerging Technologies",
    "Research & Development",
  ],
  "Social Impact & Sustainability": [
    "Social Impact",
    "Sustainability",
    "Climate & Environment",
    "Community Development",
    "Non-Profit Work",
    "Education",
  ],
  "Finance & Economics": [
    "Finance",
    "Investment",
    "Economics",
    "FinTech",
    "Accounting",
    "Banking",
  ],
  "Science & Healthcare": [
    "Healthcare",
    "Biotechnology",
    "Medicine",
    "Pharmaceuticals",
    "Life Sciences",
    "Public Health",
  ],
  Engineering: [
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Electronics",
    "Robotics",
    "Automotive",
    "Aerospace",
  ],
  "International Opportunities": [
    "Study Abroad",
    "International Internships",
    "Exchange Programs",
    "Global Fellowships",
    "International Research",
  ],
};

function clean(str) {
  return (str || "").toLowerCase().trim();
}

function isMatch(a, b) {
  const cleanA = clean(a);
  const cleanB = clean(b);
  if (!cleanA || !cleanB) return false;
  return cleanA === cleanB || cleanA.includes(cleanB) || cleanB.includes(cleanA);
}

const subInterestToCategory = {};
Object.entries(interestCategories).forEach(([category, subList]) => {
  if (Array.isArray(subList)) {
    subList.forEach((sub) => {
      subInterestToCategory[clean(sub)] = category;
    });
  }
});

function getParentCategory(term) {
  if (!term) return null;
  const cTerm = clean(term);
  for (const cat of Object.keys(interestCategories)) {
    if (clean(cat) === cTerm || isMatch(cat, cTerm)) {
      return cat;
    }
  }
  return subInterestToCategory[cTerm] || null;
}

function interestMatchesDomain(studentInterest, oppDomain) {
  if (!studentInterest || !oppDomain) return false;
  if (isMatch(studentInterest, oppDomain)) return true;

  const sParent = getParentCategory(studentInterest);
  const dParent = getParentCategory(oppDomain);

  if (sParent && dParent && sParent === dParent) {
    return true;
  }

  if (interestCategories[studentInterest]?.some((sub) => isMatch(sub, oppDomain))) {
    return true;
  }

  if (interestCategories[oppDomain]?.some((sub) => isMatch(sub, studentInterest))) {
    return true;
  }

  return false;
}

function scoreOpportunityForProfile(profile, opp) {
  // Handle mongoose document conversion if needed
  const rawOpp = typeof opp.toObject === "function" ? opp.toObject() : opp;
  const rawProfile = typeof profile?.toObject === "function" ? profile.toObject() : profile;

  if (!rawProfile) {
    return {
      ...rawOpp,
      matchLabel: "Explore",
      matchBadgeColor: "mint",
      matchedSkills: [],
      missingSkills: rawOpp.skills || [],
      matchedDomains: [],
      matchScoreNum: 0,
      matchReason: "Open for all students to explore",
    };
  }

  // 1. Extract Profile Attributes
  const studentGoals = rawProfile.goals || [];
  const studentOppTypes = rawProfile.opportunityTypes || [];
  const studentWorkModes = rawProfile.workModes || [];
  const studentLocation = rawProfile.preferredLocation || rawProfile.location || "";
  const studentRoles = rawProfile.preferredRoles || rawProfile.roles || [];
  const studentDomains = rawProfile.interests || rawProfile.selectedInterests || rawProfile.domains || [];
  const studentSkills = rawProfile.skills || rawProfile.selectedSkills || [];

  let rankScore = 0;
  const matchHighlights = [];

  // 2. Skill Comparison (+3 pts per matched skill)
  const oppSkills = rawOpp.skills || [];
  const matchedSkills = [];
  const missingSkills = [];

  oppSkills.forEach((oppSkill) => {
    const hasSkill = studentSkills.some((sSkill) => isMatch(oppSkill, sSkill));
    if (hasSkill) {
      matchedSkills.push(oppSkill);
    } else {
      missingSkills.push(oppSkill);
    }
  });

  if (matchedSkills.length > 0) {
    rankScore += matchedSkills.length * 3;
    matchHighlights.push(`${matchedSkills.length} matching skill${matchedSkills.length > 1 ? "s" : ""}`);
  }

  // 3. Domain / Broad Interest Comparison (+8 pts for first, +4 for each additional)
  const oppDomains = rawOpp.domains || (rawOpp.domain ? [rawOpp.domain] : []);
  const matchedDomains = [];

  studentDomains.forEach((studentInterest) => {
    const matched = oppDomains.find((oppDomain) => interestMatchesDomain(studentInterest, oppDomain));
    if (matched) {
      if (!matchedDomains.includes(matched)) {
        matchedDomains.push(matched);
      }
    } else if (isMatch(studentInterest, rawOpp.title) || isMatch(studentInterest, rawOpp.description)) {
      if (!matchedDomains.includes(studentInterest)) {
        matchedDomains.push(studentInterest);
      }
    }
  });

  if (matchedDomains.length > 0) {
    rankScore += 8 + (matchedDomains.length - 1) * 4;
    matchHighlights.unshift(`Matches ${matchedDomains[0]}`);
  }

  // 4. Opportunity Type / Category Comparison (+5 pts)
  const oppCategory = rawOpp.category || "";
  const matchesCategory = studentOppTypes.some((type) => isMatch(type, oppCategory));
  if (matchesCategory) {
    rankScore += 5;
    matchHighlights.push(`Matches ${oppCategory}`);
  }

  // 5. Role Comparison (+4 pts)
  const oppRoles = rawOpp.roles || [rawOpp.title];
  const matchesRole = studentRoles.some((studentRole) =>
    oppRoles.some((oppRole) => isMatch(studentRole, oppRole)) || isMatch(studentRole, rawOpp.title)
  );
  if (matchesRole) {
    rankScore += 4;
    matchHighlights.push("Matches target role");
  }

  // 6. Work Mode Comparison (+2 pts)
  const oppMode = rawOpp.workMode || rawOpp.mode || "";
  const isOppRemote = isMatch(oppMode, "Remote") || isMatch(oppMode, "Online") || isMatch(oppMode, "Virtual");
  const matchesWorkMode =
    studentWorkModes.some((mode) => isMatch(mode, oppMode)) ||
    (isOppRemote && studentWorkModes.some((mode) => isMatch(mode, "Remote") || isMatch(mode, "Online")));
  if (matchesWorkMode) {
    rankScore += 2;
  }

  // 7. Location Comparison (+2 pts)
  const oppLocation = rawOpp.location || "";
  const matchesLocation =
    (studentLocation && isMatch(studentLocation, oppLocation)) ||
    isOppRemote ||
    isMatch(studentLocation, "Any") ||
    isMatch(studentLocation, "Remote");
  if (matchesLocation) {
    rankScore += 2;
  }

  // 8. Goal Alignment (+3 pts)
  const matchesGoal = studentGoals.some((goal) => {
    const g = clean(goal);
    if (g.includes("internship") && isMatch(oppCategory, "Internships")) return true;
    if (g.includes("hackathon") && isMatch(oppCategory, "Hackathons")) return true;
    if (g.includes("certif") && isMatch(oppCategory, "Certifications")) return true;
    if (g.includes("scholarship") && isMatch(oppCategory, "Scholarships")) return true;
    if (g.includes("research") && isMatch(oppCategory, "Research")) return true;
    if (g.includes("compet") && isMatch(oppCategory, "Competitions")) return true;
    if (g.includes("skill") && matchedSkills.length > 0) return true;
    return false;
  });
  if (matchesGoal) {
    rankScore += 3;
  }

  // 9. Assign Qualitative Match Label (NO fake percentages)
  let matchLabel = "Explore";
  const matchBadgeColor = "mint";

  if (rankScore >= 14) {
    matchLabel = "Strong match";
  } else if (rankScore >= 7) {
    matchLabel = "Good match";
  } else if (matchedSkills.length > 0 || matchedDomains.length > 0) {
    matchLabel = "Skill match";
  }

  const matchReason =
    matchHighlights.length > 0
      ? matchHighlights.slice(0, 2).join(" • ")
      : "Relevant to your learning path";

  return {
    ...rawOpp,
    matchLabel,
    matchBadgeColor,
    matchedSkills,
    missingSkills,
    matchedDomains,
    matchScoreNum: rankScore,
    matchReason,
  };
}

function getPersonalizedRecommendations(opportunities = [], profile = null, limit = 6) {
  if (!opportunities || opportunities.length === 0) return [];

  const scored = opportunities.map((opp) => scoreOpportunityForProfile(profile, opp));
  scored.sort((a, b) => b.matchScoreNum - a.matchScoreNum);

  return scored.slice(0, limit);
}

module.exports = {
  scoreOpportunityForProfile,
  getPersonalizedRecommendations,
  interestCategories,
  isMatch,
};
