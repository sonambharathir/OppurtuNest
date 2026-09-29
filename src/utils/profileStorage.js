// OppurtuNest — Profile Storage Utility
// Manages safe persistence of student profile data and auth session tokens

const PROFILE_STORAGE_KEY = "oppurtunest_profile";
export const STUDENT_ID_KEY = "oppurtunest_student_id";
export const AUTH_USER_KEY = "oppurtunest_auth_user";
export const AUTH_TOKEN_KEY = "oppurtunest_auth_token";
export const USERS_VAULT_KEY = "oppurtunest_users_vault";
export const RESUME_CACHE_KEY = "oppurtunest_resume_cache";

// ----------------------------------------------------
// Auth Token Management
// ----------------------------------------------------

export function saveAuthToken(token) {
  if (!token) return;
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, String(token));
  } catch (e) {
    console.error("[profileStorage] Failed to save auth token:", e);
  }
}

export function getAuthToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || null;
  } catch (e) {
    return null;
  }
}

export function clearAuthToken() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (e) {
    console.error("[profileStorage] Failed to clear auth token:", e);
  }
}

// ----------------------------------------------------
// Profile Storage Management
// ----------------------------------------------------

/**
 * Saves the student profile object to browser localStorage.
 * @param {Object} profile - Student profile object
 * @returns {boolean} - True if saved successfully, false otherwise
 */
export function saveProfile(profile) {
  if (!profile || typeof profile !== "object") {
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
 */
export function getStudentId() {
  try {
    const id = localStorage.getItem(STUDENT_ID_KEY);
    return id ? id.trim() : null;
  } catch (error) {
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
    console.error("[profileStorage] Error clearing student ID:", error);
  }
}

/**
 * Removes the stored student profile and student ID from localStorage.
 */
export function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(STUDENT_ID_KEY);
    localStorage.removeItem(RESUME_CACHE_KEY);
  } catch (error) {
    console.error("[profileStorage] Error clearing profile from localStorage:", error);
  }
}

/**
 * Saves analyzed resume object to localStorage and merges detected skills into the active profile
 */
export function saveResume(resume) {
  if (!resume || typeof resume !== "object") return;
  try {
    localStorage.setItem(RESUME_CACHE_KEY, JSON.stringify(resume));

    // Auto-merge resume detected skills into current profile if available
    const profile = getProfile() || {};
    const existingSkills = profile.selectedSkills || profile.skills || [];
    const newSkills = resume.detectedSkills || [];

    const existingLower = new Set(existingSkills.map((s) => s.toLowerCase().trim()));
    const mergedSkills = [...existingSkills];

    newSkills.forEach((s) => {
      if (s && !existingLower.has(s.toLowerCase().trim())) {
        existingLower.add(s.toLowerCase().trim());
        mergedSkills.push(s);
      }
    });

    const updatedProfile = {
      ...profile,
      selectedSkills: mergedSkills,
      skills: mergedSkills,
      resumeData: {
        fileName: resume.fileName || "Resume.pdf",
        score: resume.score,
        detectedSkills: resume.detectedSkills || [],
        updatedAt: new Date().toISOString(),
      },
    };
    saveProfile(updatedProfile);
  } catch (e) {
    console.error("[profileStorage] Failed to save resume:", e);
  }
}

/**
 * Retrieves analyzed resume from localStorage
 */
export function getResume() {
  try {
    const raw = localStorage.getItem(RESUME_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Clears stored resume from localStorage
 */
export function clearResume() {
  try {
    localStorage.removeItem(RESUME_CACHE_KEY);
  } catch (e) {
    console.error("[profileStorage] Failed to clear resume:", e);
  }
}

/**
 * Checks if a valid student profile exists in localStorage.
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
// Multi-User Authentication & Session Management
// ----------------------------------------------------

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
 * Saves a user's full account into the local accounts vault
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
 * Maps a backend student MongoDB record to the frontend userProfile structure
 */
export function mapStudentToProfile(student) {
  if (!student) return null;

  const rawSkills = Array.isArray(student.skills) ? student.skills : [];
  const rawSkillLevels =
    student.skillLevels && typeof student.skillLevels === "object"
      ? student.skillLevels
      : rawSkills.reduce((acc, s) => ({ ...acc, [s]: "Intermediate" }), {});

  return {
    _id: student._id || student.id,
    name: student.name || "",
    studentName: student.name || "",
    email: student.email || "",
    college: student.college || "",
    degree: student.degree || "",
    branch: student.branch || "",
    year: student.year || "",
    currentYear: student.year ? String(student.year).replace(/\D/g, "") : "",
    semester: student.semester || "N/A",
    goals: Array.isArray(student.goals) ? student.goals : [],
    opportunityTypes: Array.isArray(student.opportunityTypes) ? student.opportunityTypes : [],
    workModes: Array.isArray(student.workModes) ? student.workModes : [],
    preferredLocation: student.preferredLocation || "",
    preferredRoles: Array.isArray(student.preferredRoles) ? student.preferredRoles : [],
    selectedInterests: Array.isArray(student.interests) ? student.interests : [],
    interests: Array.isArray(student.interests) ? student.interests : [],
    selectedSkills: rawSkills,
    skills: rawSkills,
    skillLevels: rawSkillLevels,
    resumeSkills: Array.isArray(student.resumeSkills) ? student.resumeSkills : [],
    resume: student.resume || null,
    learningSkills: Array.isArray(student.learningSkills) ? student.learningSkills : [],
    projects: Array.isArray(student.projects) ? student.projects : [],
    certifications: Array.isArray(student.certifications) ? student.certifications : [],
    assessmentResults: student.assessmentResults || null,
    assessmentHistory: Array.isArray(student.assessmentHistory) ? student.assessmentHistory : [],
    assessmentSkills: Array.isArray(student.assessmentSkills) ? student.assessmentSkills : [],
  };
}

/**
 * Performs a complete user logout:
 * - Clears session token
 * - Clears session user
 * - Clears active profile & skills from active storage
 * - Clears active student ID and cached resume
 */
export function logoutUserSession() {
  clearAuthToken();
  clearCurrentUser();
  clearProfile();
}
