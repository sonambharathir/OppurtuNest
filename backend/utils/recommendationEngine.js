// OppurtuNest — Backend Recommendation Engine
// Deterministic, explainable scoring engine combining profile, resume, assessment, and eligibility signals

const interestCategories = {
  "Technology & Software": [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
    "Full Stack",
    "Frontend",
    "Backend",
  ],
  "AI & Data": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Data Analytics",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Data Engineering",
  ],
  "Design & Creativity": [
    "UI/UX Design",
    "Graphic Design",
    "Product Design",
    "Animation",
    "Content Creation",
    "Photography",
    "Wireframing",
    "Design Systems",
  ],
  "Business & Entrepreneurship": [
    "Entrepreneurship",
    "Startups",
    "Business Strategy",
    "Product Management",
    "Consulting",
    "Operations",
    "Management",
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
    "Fellowships",
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
    "Biology",
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

const SOFT_SKILLS = new Set([
  "communication",
  "problem solving",
  "leadership",
  "teamwork",
  "time management",
  "critical thinking",
  "collaboration",
  "agile",
  "scrum",
  "project planning",
  "research",
  "scientific research",
]);

function clean(str) {
  return (str || "").toLowerCase().trim();
}

function isMatch(a, b) {
  const cleanA = clean(a);
  const cleanB = clean(b);
  if (!cleanA || !cleanB) return false;
  if (cleanA === cleanB) return true;

  // Disambiguate short distinct terms
  const strictExact = ["c", "r", "go", "java", "sql", "css", "html", "php", "git", "ai", "ml", "nlp", "cad", "iot", "aws", "gcp"];
  if (strictExact.includes(cleanA) || strictExact.includes(cleanB)) {
    return cleanA === cleanB;
  }

  // Prevent "java" matching "javascript"
  if (cleanA === "java" && cleanB.includes("javascript")) return false;
  if (cleanB === "java" && cleanA.includes("javascript")) return false;

  try {
    const escapedA = cleanA.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const escapedB = cleanB.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regexA = new RegExp(`\\b${escapedB}\\b`, "i");
    const regexB = new RegExp(`\\b${escapedA}\\b`, "i");
    return regexA.test(cleanA) || regexB.test(cleanB);
  } catch {
    return cleanA.includes(cleanB) || cleanB.includes(cleanA);
  }
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

/**
 * Checks if a deadline has expired relative to current date
 */
function isExpired(deadlineStr) {
  if (!deadlineStr || !deadlineStr.trim()) return false;
  const cleanDead = deadlineStr.trim().toLowerCase();

  // Non-expiring terms
  if (
    cleanDead.includes("rolling") ||
    cleanDead.includes("ongoing") ||
    cleanDead.includes("open") ||
    cleanDead.includes("flexible") ||
    cleanDead.includes("always")
  ) {
    return false;
  }

  const parsed = Date.parse(deadlineStr);
  if (isNaN(parsed)) return false;

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return parsed < now.getTime();
}

function normalizeYear(yearStr) {
  if (!yearStr) return null;
  const s = String(yearStr).toLowerCase().trim();
  if (s.includes("any") || s.includes("all") || s.includes("open")) return "all";
  if (s.includes("1") || s.includes("first") || s.includes("freshman")) return "1";
  if (s.includes("2") || s.includes("second") || s.includes("sophomore")) return "2";
  if (s.includes("3") || s.includes("third") || s.includes("junior") || s.includes("pre-final")) return "3";
  if (s.includes("4") || s.includes("final") || s.includes("senior") || s.includes("fourth") || s.includes("graduat")) return "4";
  return s;
}

function normalizeDegree(degreeStr) {
  if (!degreeStr) return null;
  const s = String(degreeStr).toLowerCase().trim();
  if (s.includes("any") || s.includes("all") || s.includes("open")) return "all";
  if (s.includes("b.tech") || s.includes("btech") || s.includes("b.e") || s.includes("be") || s.includes("bachelor of engineering") || s.includes("bachelor of technology")) return "btech";
  if (s.includes("b.s") || s.includes("bs") || s.includes("b.sc") || s.includes("bsc") || s.includes("bachelor of science") || s.includes("bachelor")) return "bs";
  if (s.includes("m.tech") || s.includes("mtech") || s.includes("m.e") || s.includes("master of engineering")) return "mtech";
  if (s.includes("m.s") || s.includes("ms") || s.includes("m.sc") || s.includes("msc") || s.includes("master of science") || s.includes("master")) return "ms";
  if (s.includes("mba") || s.includes("bba")) return "business";
  if (s.includes("phd") || s.includes("ph.d") || s.includes("doctor")) return "phd";
  return s;
}

/**
 * Validates student academic eligibility against structured opportunity requirements
 */
function checkAcademicEligibility(student, opp) {
  let isEligible = true;
  let eligibilityNote = "";

  const studentDegree = student?.degree || student?.resume?.detectedDegree;
  const studentYear = student?.year || student?.resume?.detectedYear;

  // 1. Check eligible degrees if opportunity defines them
  if (Array.isArray(opp.eligibleDegrees) && opp.eligibleDegrees.length > 0) {
    const oppAllowsAnyDegree = opp.eligibleDegrees.some((d) => {
      const cleanD = clean(d);
      return cleanD.includes("any") || cleanD.includes("all") || cleanD.includes("open");
    });

    if (!oppAllowsAnyDegree && studentDegree) {
      const normStudentDegree = normalizeDegree(studentDegree);
      const matchesDegree = opp.eligibleDegrees.some((d) => {
        const normOppDegree = normalizeDegree(d);
        return (
          isMatch(d, studentDegree) ||
          (normOppDegree && normStudentDegree && normOppDegree === normStudentDegree)
        );
      });

      if (!matchesDegree) {
        isEligible = false;
        eligibilityNote = `Requires Degree: ${opp.eligibleDegrees.join(", ")}`;
      }
    }
  }

  // 2. Check eligible years if opportunity defines them
  if (Array.isArray(opp.eligibleYears) && opp.eligibleYears.length > 0) {
    const oppAllowsAnyYear = opp.eligibleYears.some((y) => {
      const cleanY = clean(String(y));
      return cleanY.includes("any") || cleanY.includes("all") || cleanY.includes("open");
    });

    if (!oppAllowsAnyYear && studentYear) {
      const normStudentYear = normalizeYear(studentYear);
      const matchesYear = opp.eligibleYears.some((y) => {
        const normOppYear = normalizeYear(y);
        return (
          isMatch(String(y), String(studentYear)) ||
          (normOppYear && normStudentYear && (normOppYear === "all" || normOppYear === normStudentYear))
        );
      });

      if (!matchesYear) {
        isEligible = false;
        eligibilityNote = `Requires Year: ${opp.eligibleYears.join(", ")}`;
      }
    }
  }

  return { isEligible, eligibilityNote };
}

/**
 * Builds the comprehensive deduplicated skill set and domains from all student sources:
 * Manual profile skills + Resume detected skills/domains + Assessment confirmed skills
 */
function getEffectiveStudentSkills(profile) {
  if (!profile) return { knownSkills: [], learningSkills: [], skillSources: {}, effectiveDomains: [] };

  const raw = typeof profile.toObject === "function" ? profile.toObject() : profile;
  const knownSet = new Map(); // lowercase -> canonical name
  const skillSources = {}; // canonical name -> ['profile', 'resume', 'assessment']

  const addSkill = (name, source) => {
    if (!name || typeof name !== "string") return;
    const trimmed = name.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();

    const canonical = knownSet.has(lower) ? knownSet.get(lower) : trimmed;
    knownSet.set(lower, canonical);

    if (!skillSources[canonical]) {
      skillSources[canonical] = [];
    }
    if (!skillSources[canonical].includes(source)) {
      skillSources[canonical].push(source);
    }
  };

  // 1. Profile / Selected Skills
  const manualSkills = raw.skills || raw.selectedSkills || [];
  if (Array.isArray(manualSkills)) {
    manualSkills.forEach((s) => addSkill(s, "profile"));
  }

  // 2. Resume Skills
  const resumeSkills = raw.resumeSkills || raw.resume?.detectedSkills || raw.detectedSkills || [];
  if (Array.isArray(resumeSkills)) {
    resumeSkills.forEach((s) => addSkill(s, "resume"));
  }

  // 3. Assessment Skills & Snapshot
  const assessmentSkills = raw.assessmentSkills || [];
  if (Array.isArray(assessmentSkills)) {
    assessmentSkills.forEach((s) => addSkill(s, "assessment"));
  }
  if (Array.isArray(raw.assessmentResults?.snapshot)) {
    raw.assessmentResults.snapshot.forEach((snap) => {
      if (snap && snap.skill) {
        addSkill(snap.skill, "assessment");
      }
    });
  }

  // Desired Learning Skills
  const learningSkills = Array.isArray(raw.learningSkills) ? raw.learningSkills : [];

  // Effective Domains (combining manual interests and resume detected domains)
  const domainSet = new Set();
  const rawDomains = raw.interests || raw.selectedInterests || raw.domains || [];
  if (Array.isArray(rawDomains)) {
    rawDomains.forEach((d) => d && domainSet.add(d));
  }
  const resumeDomains = raw.resume?.detectedDomains || raw.detectedDomains || [];
  if (Array.isArray(resumeDomains)) {
    resumeDomains.forEach((d) => d && domainSet.add(d));
  }

  return {
    knownSkills: Array.from(knownSet.values()),
    learningSkills,
    skillSources,
    effectiveDomains: Array.from(domainSet),
  };
}

/**
 * Scores an opportunity for a given student profile with full explainability.
 * Differentiates technical domain skills from generic soft skills.
 */
function scoreOpportunityForProfile(profile, opp) {
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
      isEligible: true,
      isExpired: isExpired(rawOpp.deadline),
      isRoleMatch: false,
    };
  }

  const { knownSkills, learningSkills, skillSources, effectiveDomains } = getEffectiveStudentSkills(rawProfile);

  // 1. Profile Attributes
  const studentGoals = rawProfile.goals || [];
  const studentOppTypes = rawProfile.opportunityTypes || [];
  const studentWorkModes = rawProfile.workModes || [];
  const studentLocation = rawProfile.preferredLocation || rawProfile.location || "";
  const studentRoles = rawProfile.preferredRoles || rawProfile.roles || [];
  const studentDomains = effectiveDomains;

  let rankScore = 0;
  const matchHighlights = [];
  const oppSkills = rawOpp.skills || [];
  const matchedSkills = [];
  const missingSkills = [];
  let technicalMatchedCount = 0;

  // 2. Skill Comparison (Differentiating Core Tech Skills vs Generic Soft Skills)
  oppSkills.forEach((oppSkill) => {
    const hasSkill = knownSkills.some((sSkill) => isMatch(oppSkill, sSkill));
    if (hasSkill) {
      matchedSkills.push(oppSkill);
      const isSoft = SOFT_SKILLS.has(clean(oppSkill));
      let skillPoints = isSoft ? 2 : 10;

      if (!isSoft) {
        technicalMatchedCount++;
        const matchedCanonical = knownSkills.find((sSkill) => isMatch(oppSkill, sSkill));
        if (matchedCanonical && skillSources[matchedCanonical]) {
          if (skillSources[matchedCanonical].includes("resume")) {
            skillPoints += 4; // Verified in submitted resume
          }
          if (skillSources[matchedCanonical].includes("assessment")) {
            skillPoints += 3; // Verified in assessment
          }
        }
      }
      rankScore += skillPoints;
    } else {
      missingSkills.push(oppSkill);
    }
  });

  if (matchedSkills.length > 0) {
    matchHighlights.push(
      `Matches ${matchedSkills.slice(0, 2).join(", ")}${matchedSkills.length > 2 ? ` (+${matchedSkills.length - 2})` : ""}`
    );
  }

  // Signal for desired learning skills alignment
  const learningMatches = oppSkills.filter((oppSkill) =>
    learningSkills.some((lSkill) => isMatch(oppSkill, lSkill))
  );
  if (learningMatches.length > 0) {
    rankScore += 3;
    if (!matchHighlights.some((h) => h.includes("learning"))) {
      matchHighlights.push(`Develops ${learningMatches[0]}`);
    }
  }

  // 3. Domain / Broad Interest Comparison (+12 pts for direct domain match)
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
    rankScore += 12 + (matchedDomains.length - 1) * 5;
    matchHighlights.unshift(`Matches ${matchedDomains[0]}`);
  }

  // 4. Role Comparison (+8 pts)
  const oppRoles = rawOpp.roles || [rawOpp.title];
  const matchesRole = studentRoles.some((studentRole) =>
    oppRoles.some((oppRole) => isMatch(studentRole, oppRole)) || isMatch(studentRole, rawOpp.title)
  );
  if (matchesRole) {
    rankScore += 8;
    matchHighlights.push("Matches target role");
  }

  // Relevance filter:
  // If student has defined skills or domains, but this opportunity has 0 skill match, 0 domain match, and 0 role match:
  // Or if it only matched a generic soft skill but has 0 domain match and 0 tech skill match in an unrelated field:
  const hasSignals = knownSkills.length > 0 || studentDomains.length > 0 || studentRoles.length > 0;
  const hasStrongMatch = technicalMatchedCount > 0 || matchedDomains.length > 0 || matchesRole;

  if (hasSignals && !hasStrongMatch) {
    rankScore = 0;
  }

  // Secondary attributes (only apply bonus if there is a core match)
  if (hasStrongMatch || !hasSignals) {
    // 5. Opportunity Category Comparison (+3 pts)
    const oppCategory = rawOpp.category || "";
    const matchesCategory = studentOppTypes.some((type) => isMatch(type, oppCategory));
    if (matchesCategory) {
      rankScore += 3;
      matchHighlights.push(`Matches ${oppCategory}`);
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
  }

  // 9. Academic Eligibility Check
  const { isEligible, eligibilityNote } = checkAcademicEligibility(rawProfile, rawOpp);
  if (!isEligible) {
    rankScore = 0; // Strict eligibility enforcement
  }

  // 10. Deadline Check
  const oppExpired = isExpired(rawOpp.deadline);
  if (oppExpired) {
    rankScore = 0; // Exclude expired opportunities
  }

  // 11. Assign Qualitative Match Label (NO fake percentages)
  let matchLabel = "Explore";
  let matchBadgeColor = "mint";

  if (rankScore >= 16 && isEligible && !oppExpired) {
    matchLabel = "Strong match";
    matchBadgeColor = "mint";
  } else if (rankScore >= 8 && isEligible && !oppExpired) {
    matchLabel = "Good match";
    matchBadgeColor = "sage";
  } else if ((matchedSkills.length > 0 || matchedDomains.length > 0) && isEligible && !oppExpired) {
    matchLabel = "Skill match";
    matchBadgeColor = "amber";
  }

  const matchReason =
    matchHighlights.length > 0
      ? matchHighlights.slice(0, 2).join(" • ")
      : isEligible
      ? "Relevant to your learning path"
      : eligibilityNote || "Check eligibility details";

  return {
    ...rawOpp,
    matchLabel,
    matchBadgeColor,
    matchedSkills,
    missingSkills,
    matchedDomains,
    matchScoreNum: rankScore,
    matchReason,
    isEligible,
    isExpired: oppExpired,
    isRoleMatch: matchesRole,
  };
}

/**
 * Returns ranked personalized recommendations from opportunities based on student profile.
 * Strictly filters out ineligible, expired, and non-matching opportunities.
 */
function getPersonalizedRecommendations(opportunities = [], profile = null, limit = 6, options = {}) {
  if (!opportunities || opportunities.length === 0) return [];

  const { includeExpired = false, categoryFilter = null, minScore = 1 } = options;

  let pool = opportunities;

  if (categoryFilter && categoryFilter !== "all" && categoryFilter !== "All") {
    pool = pool.filter((o) => isMatch(o.category, categoryFilter));
  }

  const rawProfile = typeof profile?.toObject === "function" ? profile.toObject() : profile;
  const { knownSkills, effectiveDomains } = getEffectiveStudentSkills(rawProfile);
  const hasProfileSignals = Boolean(
    (knownSkills && knownSkills.length > 0) ||
    (effectiveDomains && effectiveDomains.length > 0) ||
    (rawProfile?.preferredRoles && rawProfile.preferredRoles.length > 0)
  );

  const scored = pool
    .map((opp) => scoreOpportunityForProfile(rawProfile, opp))
    .filter((opp) => {
      if (!includeExpired && opp.isExpired) return false;
      if (!opp.isEligible) return false;

      // If student has submitted a resume or has known skills/domains,
      // strictly return ONLY those few opportunities that actually match!
      if (hasProfileSignals) {
        if (opp.matchScoreNum < minScore) return false;
        if (opp.matchedSkills.length === 0 && opp.matchedDomains.length === 0 && !opp.isRoleMatch) {
          return false;
        }
      }
      return true;
    });

  // Deterministic tie-breaking:
  // 1. Highest rank score
  // 2. Most matched skills
  // 3. Most matched domains
  // 4. Stable ID sort
  scored.sort((a, b) => {
    if (b.matchScoreNum !== a.matchScoreNum) {
      return b.matchScoreNum - a.matchScoreNum;
    }
    if (b.matchedSkills.length !== a.matchedSkills.length) {
      return b.matchedSkills.length - a.matchedSkills.length;
    }
    if (b.matchedDomains.length !== a.matchedDomains.length) {
      return b.matchedDomains.length - a.matchedDomains.length;
    }
    const idA = String(a.id || a._id || "");
    const idB = String(b.id || b._id || "");
    return idA.localeCompare(idB);
  });

  return limit ? scored.slice(0, limit) : scored;
}

/**
 * Calculates skill matching opportunities specifically for the Skill Matching page
 */
function getSkillMatchingOpportunities(opportunities = [], profile = null, options = {}) {
  if (!opportunities || opportunities.length === 0) return [];

  const { categoryFilter = "all", matchFilter = "all" } = options;

  let scored = opportunities.map((opp) => scoreOpportunityForProfile(profile, opp));

  // Exclude expired and ineligible opportunities
  scored = scored.filter((opp) => !opp.isExpired && opp.isEligible);

  // Filter by qualitative match level if specified
  if (matchFilter && matchFilter !== "all") {
    scored = scored.filter((opp) => isMatch(opp.matchLabel, matchFilter));
  }

  // Filter by category if specified
  if (categoryFilter && categoryFilter !== "all") {
    scored = scored.filter((opp) => isMatch(opp.category, categoryFilter));
  }

  // Strictly filter to opportunities that have an actual calculated match signal
  scored = scored.filter((opp) => opp.matchScoreNum > 0 && (opp.matchedSkills.length > 0 || opp.matchedDomains.length > 0));

  scored.sort((a, b) => {
    if (b.matchScoreNum !== a.matchScoreNum) {
      return b.matchScoreNum - a.matchScoreNum;
    }
    if (b.matchedSkills.length !== a.matchedSkills.length) {
      return b.matchedSkills.length - a.matchedSkills.length;
    }
    if (b.matchedDomains.length !== a.matchedDomains.length) {
      return b.matchedDomains.length - a.matchedDomains.length;
    }
    const idA = String(a.id || a._id || "");
    const idB = String(b.id || b._id || "");
    return idA.localeCompare(idB);
  });

  return scored;
}

module.exports = {
  scoreOpportunityForProfile,
  getPersonalizedRecommendations,
  getSkillMatchingOpportunities,
  getEffectiveStudentSkills,
  checkAcademicEligibility,
  isExpired,
  interestCategories,
  isMatch,
};
