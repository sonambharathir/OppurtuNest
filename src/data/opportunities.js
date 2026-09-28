// OppurtuNest — Opportunity Data Module
// Original sample opportunities have been deprecated and deactivated.
// Live opportunities are now loaded exclusively through the backend API from MongoDB.

import { getPersonalizedRecommendations } from "../utils/recommendationUtils";

/**
 * Deactivated mock opportunities dataset.
 * Active opportunities must be fetched from the backend API (GET /api/opportunities).
 */
export const mockOpportunities = [];

/**
 * Legacy personalized recommendations helper (deactivated - returns empty array if no external list provided).
 */
export function getTopPersonalizedRecommendations(profileData, limit = 3) {
  return getPersonalizedRecommendations(mockOpportunities, profileData, limit);
}

/**
 * Category-specific helper returning opportunities matching category and scored for the profile.
 */
export function getOpportunitiesByCategory(category = "All", profileData = null) {
  let list = mockOpportunities;
  if (category && category !== "All") {
    list = list.filter((opp) => opp.category && opp.category.toLowerCase().includes(category.toLowerCase()));
  }
  return getPersonalizedRecommendations(list, profileData, 50);
}

/**
 * Filter and personalize opportunities based on student's profile & resume data.
 */
export function getPersonalizedOpportunities({ userProfile, uploadedResume, category = "All" } = {}) {
  const resumeSkills = uploadedResume?.detectedSkills || [];
  const profileSkills = userProfile?.selectedSkills || userProfile?.skills || [];
  const allUserSkills = Array.from(new Set([...resumeSkills, ...profileSkills]));

  const mergedProfile = {
    ...(userProfile || {}),
    selectedSkills: allUserSkills,
    skills: allUserSkills,
  };

  const opportunities = getOpportunitiesByCategory(category, mergedProfile);
  const hasEnteredData = Boolean(
    allUserSkills.length > 0 ||
    mergedProfile.goals?.length > 0 ||
    mergedProfile.preferredRoles?.length > 0 ||
    mergedProfile.degree
  );

  return {
    opportunities,
    hasEnteredData,
    userSkills: allUserSkills,
    userGoals: mergedProfile.goals || mergedProfile.preferredRoles || [],
  };
}
