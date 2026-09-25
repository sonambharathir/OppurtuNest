// OppurtuNest — Profile Storage Utility
// Manages safe persistence of student profile data in browser localStorage

const PROFILE_STORAGE_KEY = "oppurtunest_profile";

/**
 * Saves the student profile object to browser localStorage.
 * Ensures arrays and structured fields are preserved.
 * @param {Object} profile - Completed student profile object
 * @returns {boolean} - True if saved successfully, false otherwise
 */
export function saveProfile(profile) {
  if (!profile || typeof profile !== "object") {
    console.warn("[profileStorage] Invalid profile object provided to saveProfile.");
    return false;
  }

  try {
    const payload = JSON.stringify(profile);
    localStorage.setItem(PROFILE_STORAGE_KEY, payload);
    return true;
  } catch (error) {
    console.error("[profileStorage] Failed to save profile to localStorage:", error);
    return false;
  }
}

/**
 * Retrieves the student profile from browser localStorage.
 * Safely parses the stored JSON, returning null if empty or invalid.
 * @returns {Object|null} - The student profile object or null
 */
export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    return null;
  } catch (error) {
    console.error("[profileStorage] Error reading profile from localStorage:", error);
    return null;
  }
}

/**
 * Removes the stored student profile from localStorage.
 */
export function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (error) {
    console.error("[profileStorage] Error clearing profile from localStorage:", error);
  }
}

/**
 * Checks if a valid student profile exists in localStorage.
 * @returns {boolean}
 */
export function hasProfile() {
  const profile = getProfile();
  return Boolean(
    profile &&
    (profile.degree ||
      profile.selectedSkills?.length > 0 ||
      profile.skills?.length > 0 ||
      profile.goals?.length > 0 ||
      profile.opportunityTypes?.length > 0)
  );
}
