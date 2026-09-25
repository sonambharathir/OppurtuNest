// OppurtuNest — Recommendation Utility
// Computes qualitative recommendations based on student profile attributes
// (goals, opportunity types, work modes, location, roles, domains/interests, skills)

import { interestCategories } from "../data/onboardingData.js";

/**
 * Normalizes text for lenient comparisons
 */
function clean(str) {
  return (str || "").toLowerCase().trim();
}

/**
 * Checks if two text values match leniently
 */
function isMatch(a, b) {
  const cleanA = clean(a);
  const cleanB = clean(b);
  if (!cleanA || !cleanB) return false;
  return cleanA === cleanB || cleanA.includes(cleanB) || cleanB.includes(cleanA);
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
 * Evaluates whether student's selected interests have corresponding sample opportunities.
 * Returns information for graceful fallback and UI feedback.
 */
export function checkInterestCoverage(studentInterests = [], opportunities = []) {
  if (!studentInterests || studentInterests.length === 0) {
    return {
      hasInterests: false,
      hasAnyMatch: true,
      matchedInterests: [],
      unmatchedInterests: [],
    };
  }

  const matchedInterests = [];
  const unmatchedInterests = [];

  studentInterests.forEach((interest) => {
    const hasOpp = opportunities.some((opp) => {
      const oppDomains = opp.domains || (opp.domain ? [opp.domain] : []);
      return (
        oppDomains.some((d) => interestMatchesDomain(interest, d)) ||
        isMatch(interest, opp.title) ||
        isMatch(interest, opp.description)
      );
    });

    if (hasOpp) {
      matchedInterests.push(interest);
    } else {
      unmatchedInterests.push(interest);
    }
  });

  return {
    hasInterests: true,
    hasAnyMatch: matchedInterests.length > 0,
    matchedInterests,
    unmatchedInterests,
  };
}

/**
 * Compares a student profile against an opportunity and computes a qualitative match.
 * @param {Object} profile - Student profile from localStorage or state
 * @param {Object} opp - An opportunity from mockOpportunities
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
    };
  }

  // 1. Extract Profile Attributes
  const studentGoals = profile.goals || [];
  const studentOppTypes = profile.opportunityTypes || [];
  const studentWorkModes = profile.workModes || [];
  const studentLocation = profile.preferredLocation || profile.location || "";
  const studentRoles = profile.preferredRoles || profile.roles || [];
  const studentDomains = profile.selectedInterests || profile.domains || [];
  const studentSkills = profile.selectedSkills || profile.skills || [];

  let rankScore = 0;
  const matchHighlights = [];

  // 2. Skill Comparison
  const oppSkills = opp.skills || [];
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

  // 3. Domain / Broad Interest Comparison
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
    // 8 points for the first matching domain, 4 for each additional
    rankScore += 8 + (matchedDomains.length - 1) * 4;
    // Highlight matched domain prominently
    matchHighlights.unshift(`Matches ${matchedDomains[0]}`);
  }

  // 4. Opportunity Type / Category Comparison
  const oppCategory = opp.category || "";
  const matchesCategory = studentOppTypes.some((type) => isMatch(type, oppCategory));
  if (matchesCategory) {
    rankScore += 5;
    matchHighlights.push(`Matches ${oppCategory}`);
  }

  // 5. Role Comparison
  const oppRoles = opp.roles || [opp.title];
  const matchesRole = studentRoles.some((studentRole) =>
    oppRoles.some((oppRole) => isMatch(studentRole, oppRole)) || isMatch(studentRole, opp.title)
  );
  if (matchesRole) {
    rankScore += 4;
    matchHighlights.push("Matches target role");
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

  // 9. Assign Qualitative Match Label (NO fake percentages!)
  let matchLabel = "Explore";
  let matchBadgeColor = "mint";

  if (rankScore >= 14) {
    matchLabel = "Strong match";
    matchBadgeColor = "mint";
  } else if (rankScore >= 7) {
    matchLabel = "Good match";
    matchBadgeColor = "mint";
  } else if (matchedSkills.length > 0 || matchedDomains.length > 0) {
    matchLabel = "Skill match";
    matchBadgeColor = "mint";
  }

  const matchReason =
    matchHighlights.length > 0
      ? matchHighlights.slice(0, 2).join(" • ")
      : "Relevant to your learning path";

  return {
    ...opp,
    matchLabel,
    matchBadgeColor,
    matchedSkills,
    missingSkills,
    matchedDomains,
    matchScoreNum: rankScore,
    matchReason,
  };
}

/**
 * Filter and score all opportunities based on the student's profile.
 * Sorts highest relevance first and returns qualitative matches.
 * @param {Array} opportunities - Array of opportunities
 * @param {Object} profile - Student profile from localStorage
 * @param {number} limit - Maximum number of recommendations to return
 * @returns {Array} Scored opportunities
 */
export function getPersonalizedRecommendations(opportunities = [], profile = null, limit = 6) {
  if (!opportunities || opportunities.length === 0) return [];

  // Score each opportunity
  const scored = opportunities.map((opp) => scoreOpportunityForProfile(profile, opp));

  // Sort descending by calculated rank score
  scored.sort((a, b) => b.matchScoreNum - a.matchScoreNum);

  return scored.slice(0, limit);
}
