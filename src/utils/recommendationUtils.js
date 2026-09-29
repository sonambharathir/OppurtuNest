// OppurtuNest — Recommendation Utility
// Computes qualitative recommendations based on student profile attributes and resume signals
// (goals, opportunity types, work modes, location, roles, domains/interests, skills)

import { interestCategories } from "../data/onboardingData.js";

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

/**
 * Normalizes text for lenient comparisons
 */
function clean(str) {
  return (str || "").toLowerCase().trim();
}

/**
 * Checks if two text values match leniently
 */
export function isMatch(a, b) {
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

// Build sub-interest to parent category map
const subInterestToCategory = {};
if (typeof interestCategories === "object" && interestCategories !== null) {
  Object.entries(interestCategories).forEach(([category, subList]) => {
    if (Array.isArray(subList)) {
      subList.forEach((sub) => {
        subInterestToCategory[clean(sub)] = category;
      });
    }
  });
}

/**
 * Returns parent category name if term is a known category or sub-interest
 */
export function getParentCategory(term) {
  if (!term) return null;
  const cTerm = clean(term);
  for (const cat of Object.keys(interestCategories || {})) {
    if (clean(cat) === cTerm || isMatch(cat, cTerm)) {
      return cat;
    }
  }
  return subInterestToCategory[cTerm] || null;
}

/**
 * Checks if a student's interest matches an opportunity's domain
 * Hierarchically checks category vs sub-interest, sub-interest vs category, and direct match.
 */
export function interestMatchesDomain(studentInterest, oppDomain) {
  if (!studentInterest || !oppDomain) return false;
  if (isMatch(studentInterest, oppDomain)) return true;

  const sParent = getParentCategory(studentInterest);
  const dParent = getParentCategory(oppDomain);

  // Both share the same canonical broad category
  if (sParent && dParent && sParent === dParent) {
    return true;
  }

  // If student selected broad category and oppDomain is one of its sub-interests
  if (interestCategories?.[studentInterest]?.some((sub) => isMatch(sub, oppDomain))) {
    return true;
  }

  // If oppDomain is broad category and studentInterest is one of its sub-interests
  if (interestCategories?.[oppDomain]?.some((sub) => isMatch(sub, studentInterest))) {
    return true;
  }

  return false;
}

/**
 * Checks if a deadline has expired relative to current date
 */
export function isExpired(deadlineStr) {
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
export function checkAcademicEligibility(student, opp) {
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
 * Builds the deduplicated skill set and domains from all student profile sources
 */
export function getEffectiveStudentSkills(profile) {
  if (!profile) return { knownSkills: [], effectiveDomains: [], skillSources: {} };

  const knownSet = new Map();
  const skillSources = {};

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
  const manualSkills = profile.skills || profile.selectedSkills || [];
  if (Array.isArray(manualSkills)) {
    manualSkills.forEach((s) => addSkill(s, "profile"));
  }

  // 2. Resume Skills
  const resumeSkills = profile.resumeSkills || profile.resume?.detectedSkills || profile.detectedSkills || [];
  if (Array.isArray(resumeSkills)) {
    resumeSkills.forEach((s) => addSkill(s, "resume"));
  }

  // 3. Assessment Skills
  const assessmentSkills = profile.assessmentSkills || [];
  if (Array.isArray(assessmentSkills)) {
    assessmentSkills.forEach((s) => addSkill(s, "assessment"));
  }

  // 4. Domains
  const domainSet = new Set();
  const rawDomains = profile.interests || profile.selectedInterests || profile.domains || [];
  if (Array.isArray(rawDomains)) {
    rawDomains.forEach((d) => d && domainSet.add(d));
  }
  const resumeDomains = profile.resume?.detectedDomains || profile.detectedDomains || [];
  if (Array.isArray(resumeDomains)) {
    resumeDomains.forEach((d) => d && domainSet.add(d));
  }

  return {
    knownSkills: Array.from(knownSet.values()),
    effectiveDomains: Array.from(domainSet),
    skillSources,
  };
}

/**
 * Compares a student profile against an opportunity and computes a qualitative match.
 * @param {Object} profile - Student profile from localStorage or state
 * @param {Object} opp - An opportunity
 * @returns {Object} Scored opportunity with qualitative matchLabel, matchedSkills, matchReason, and numeric rank
 */
export function scoreOpportunityForProfile(profile, opp) {
  if (!profile) {
    return {
      ...opp,
      matchLabel: "Explore",
      matchBadgeColor: "mint",
      matchedSkills: [],
      missingSkills: opp.skills || [],
      matchedDomains: [],
      matchScoreNum: 0,
      matchReason: "Open for all students to explore",
      isEligible: true,
      isExpired: isExpired(opp.deadline),
      isRoleMatch: false,
    };
  }

  const { knownSkills, effectiveDomains, skillSources } = getEffectiveStudentSkills(profile);

  // 1. Extract Profile Attributes
  const studentGoals = profile.goals || [];
  const studentOppTypes = profile.opportunityTypes || [];
  const studentWorkModes = profile.workModes || [];
  const studentLocation = profile.preferredLocation || profile.location || "";
  const studentRoles = profile.preferredRoles || profile.roles || [];
  const studentDomains = effectiveDomains;

  let rankScore = 0;
  const matchHighlights = [];

  // 2. Skill Comparison (+8 pts per tech skill, +2 for soft skill)
  const oppSkills = opp.skills || [];
  const matchedSkills = [];
  const missingSkills = [];
  let technicalMatchedCount = 0;

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
            skillPoints += 4;
          }
          if (skillSources[matchedCanonical].includes("assessment")) {
            skillPoints += 3;
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

  // 3. Domain / Broad Interest Comparison (+12 pts for first, +5 for each additional)
  const oppDomains = opp.domains || (opp.domain ? [opp.domain] : []);
  const matchedDomains = [];

  studentDomains.forEach((studentInterest) => {
    const matched = oppDomains.find((oppDomain) => interestMatchesDomain(studentInterest, oppDomain));
    if (matched) {
      if (!matchedDomains.includes(matched)) {
        matchedDomains.push(matched);
      }
    } else if (isMatch(studentInterest, opp.title) || isMatch(studentInterest, opp.description)) {
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
  const oppRoles = opp.roles || [opp.title];
  const matchesRole = studentRoles.some((studentRole) =>
    oppRoles.some((oppRole) => isMatch(studentRole, oppRole)) || isMatch(studentRole, opp.title)
  );
  if (matchesRole) {
    rankScore += 8;
    matchHighlights.push("Matches target role");
  }

  // Relevance check:
  const hasSignals = knownSkills.length > 0 || studentDomains.length > 0 || studentRoles.length > 0;
  const hasStrongMatch = technicalMatchedCount > 0 || matchedDomains.length > 0 || matchesRole;

  if (hasSignals && !hasStrongMatch) {
    rankScore = 0;
  }

  // Secondary attributes
  if (hasStrongMatch || !hasSignals) {
    // 5. Opportunity Type / Category Comparison
    const oppCategory = opp.category || "";
    const matchesCategory = studentOppTypes.some((type) => isMatch(type, oppCategory));
    if (matchesCategory) {
      rankScore += 3;
      matchHighlights.push(`Matches ${oppCategory}`);
    }

    // 6. Work Mode Comparison
    const oppMode = opp.workMode || opp.mode || "";
    const isOppRemote = isMatch(oppMode, "Remote") || isMatch(oppMode, "Online") || isMatch(oppMode, "Virtual");
    const matchesWorkMode =
      studentWorkModes.some((mode) => isMatch(mode, oppMode)) ||
      (isOppRemote && studentWorkModes.some((mode) => isMatch(mode, "Remote") || isMatch(mode, "Online")));
    if (matchesWorkMode) {
      rankScore += 2;
    }

    // 7. Location Comparison
    const oppLocation = opp.location || "";
    const matchesLocation =
      (studentLocation && isMatch(studentLocation, oppLocation)) ||
      isOppRemote ||
      isMatch(studentLocation, "Any") ||
      isMatch(studentLocation, "Remote");
    if (matchesLocation) {
      rankScore += 2;
    }

    // 8. Goal Alignment
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
  const { isEligible, eligibilityNote } = checkAcademicEligibility(profile, opp);
  if (!isEligible) {
    rankScore = 0;
  }

  // 10. Deadline Check
  const oppExpired = isExpired(opp.deadline);
  if (oppExpired) {
    rankScore = 0;
  }

  // 11. Assign Qualitative Match Label (NO fake percentages!)
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
    ...opp,
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
 * Filter and score all opportunities based on the student's profile and resume.
 * Strictly returns only eligible matching opportunities.
 * @param {Array} opportunities - Array of opportunities
 * @param {Object} profile - Student profile from localStorage / API
 * @param {number} limit - Maximum number of recommendations to return
 * @returns {Array} Scored opportunities
 */
export function getPersonalizedRecommendations(opportunities = [], profile = null, limit = 6, options = {}) {
  if (!opportunities || opportunities.length === 0) return [];

  const { includeExpired = false, categoryFilter = null, minScore = 1 } = options;

  let pool = opportunities;

  if (categoryFilter && categoryFilter !== "all" && categoryFilter !== "All") {
    pool = pool.filter((o) => isMatch(o.category, categoryFilter));
  }

  const { knownSkills, effectiveDomains } = getEffectiveStudentSkills(profile);
  const hasProfileSignals = Boolean(
    (knownSkills && knownSkills.length > 0) ||
    (effectiveDomains && effectiveDomains.length > 0) ||
    (profile?.preferredRoles && profile.preferredRoles.length > 0)
  );

  const scored = pool
    .map((opp) => scoreOpportunityForProfile(profile, opp))
    .filter((opp) => {
      if (!includeExpired && opp.isExpired) return false;
      if (!opp.isEligible) return false;

      // If profile has signals (resume/skills/domains), strictly filter out non-matches!
      if (hasProfileSignals) {
        if (opp.matchScoreNum < minScore) return false;
        if (opp.matchedSkills.length === 0 && opp.matchedDomains.length === 0 && !opp.isRoleMatch) {
          return false;
        }
      }
      return true;
    });

  // Sort descending by calculated rank score, then matched skills, then matched domains
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
