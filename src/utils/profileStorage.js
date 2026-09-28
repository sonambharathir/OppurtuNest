// OppurtuNest — Profile Storage Utility
// Manages safe persistence of student profile data in browser localStorage

const PROFILE_STORAGE_KEY = "oppurtunest_profile";
export const STUDENT_ID_KEY = "oppurtunest_student_id";

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
 * Saves the backend MongoDB student _id to localStorage.
 * @param {string} id - The MongoDB ObjectId string
 */
export function saveStudentId(id) {
  if (!id) return;
  try {
    localStorage.setItem(STUDENT_ID_KEY, String(id));
  } catch (error) {
    console.error("[profileStorage] Failed to save student ID to localStorage:", error);
  }
}

/**
 * Retrieves the backend MongoDB student _id from localStorage.
 * @returns {string|null} - The MongoDB ObjectId string or null
 */
export function getStudentId() {
  try {
    const id = localStorage.getItem(STUDENT_ID_KEY);
    return id ? id.trim() : null;
  } catch (error) {
    console.error("[profileStorage] Error reading student ID from localStorage:", error);
    return null;
  }
}

/**
 * Removes the stored student ID from localStorage.
 */
export function clearStudentId() {
  try {
    localStorage.removeItem(STUDENT_ID_KEY);
  } catch (error) {
    console.error("[profileStorage] Error clearing student ID from localStorage:", error);
  }
}

/**
 * Removes the stored student profile and student ID from localStorage.
 */
export function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(STUDENT_ID_KEY);
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

// ----------------------------------------------------
// Multi-User Authentication & Vault Management
// ----------------------------------------------------

export const AUTH_USER_KEY = "oppurtunest_auth_user";
export const USERS_VAULT_KEY = "oppurtunest_users_vault";

/**
 * Saves current authenticated user session
 */
export function saveCurrentUser(user) {
  if (!user) return;
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("[profileStorage] Failed to save current user:", e);
  }
}

/**
 * Retrieves current authenticated user session
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Clears current authenticated user session
 */
export function clearCurrentUser() {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (e) {
    console.error("[profileStorage] Failed to clear current user:", e);
  }
}

/**
 * Saves a user's full account (credentials + profile) into the local accounts vault
 */
export function saveUserToVault(account) {
  if (!account || !account.email) return;
  try {
    const rawVault = localStorage.getItem(USERS_VAULT_KEY);
    const vault = rawVault ? JSON.parse(rawVault) : {};
    const key = account.email.trim().toLowerCase();
    vault[key] = {
      ...account,
      email: key,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(USERS_VAULT_KEY, JSON.stringify(vault));
  } catch (e) {
    console.error("[profileStorage] Failed to update user vault:", e);
  }
}

/**
 * Retrieves a user's account from the local accounts vault
 */
export function getUserFromVault(email) {
  if (!email) return null;
  try {
    const rawVault = localStorage.getItem(USERS_VAULT_KEY);
    const vault = rawVault ? JSON.parse(rawVault) : {};
    const key = email.trim().toLowerCase();
    return vault[key] || null;
  } catch (e) {
    return null;
  }
}

/**
 * Maps a backend student record or raw user account to the frontend userProfile structure
 */
export function mapStudentToProfile(student) {
  if (!student) return null;
  return {
    _id: student._id || student.id,
    name: student.name || "",
    studentName: student.name || "",
    email: student.email || "",
    college: student.college || "",
    degree: student.degree || "",
    branch: student.branch || "",
    currentYear: student.year ? String(student.year).replace(/\D/g, "") : "",
    semester: student.semester || "N/A",
    goals: Array.isArray(student.goals) ? student.goals : [],
    opportunityTypes: Array.isArray(student.opportunityTypes) ? student.opportunityTypes : [],
    workModes: Array.isArray(student.workModes) ? student.workModes : [],
    preferredLocation: student.preferredLocation || "",
    preferredRoles: Array.isArray(student.preferredRoles) ? student.preferredRoles : [],
    selectedInterests: Array.isArray(student.interests) ? student.interests : [],
    selectedSkills: Array.isArray(student.skills) ? student.skills : [],
    skills: Array.isArray(student.skills) ? student.skills : [],
    skillLevels: Array.isArray(student.skills)
      ? student.skills.reduce((acc, s) => ({ ...acc, [s]: "Intermediate" }), {})
      : {},
    learningSkills: Array.isArray(student.learningSkills) ? student.learningSkills : [],
    projects: Array.isArray(student.projects) ? student.projects : [],
    certifications: Array.isArray(student.certifications) ? student.certifications : [],
  };
}

/**
 * Performs a complete user logout:
 * - Clears session user
 * - Clears active profile & skills from active storage
 * - Clears active student ID
 */
export function logoutUserSession() {
  clearCurrentUser();
  clearProfile();
}

