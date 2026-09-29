// OppurtuNest — Frontend API Helper
// Centralizes all backend interactions with http://localhost:5000 and handles JWT auth tokens

import { getAuthToken } from "./profileStorage";

const API_BASE_URL = "http://localhost:5000";

/**
 * Safe fetch wrapper with timeout, JSON parsing, and automatic Authorization header injection
 */
export async function fetchWithTimeout(endpoint, options = {}, timeoutMs = 5000) {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const token = getAuthToken();
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      let errorJson = null;
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        // Not JSON
      }
      throw new Error(errorJson?.message || `API request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
}

/**
 * Maps frontend profile/onboarding formData to the backend Student schema
 */
export function mapProfileToBackendStudent(formData = {}) {
  const currentYear = formData.currentYear ? String(formData.currentYear) : "";
  let yearDisplay = "";
  if (currentYear) {
    if (currentYear.includes("Year")) {
      yearDisplay = currentYear;
    } else {
      const suffixes = { "1": "1st Year", "2": "2nd Year", "3": "3rd Year", "4": "4th Year", "5": "5th Year" };
      yearDisplay = suffixes[currentYear] || `${currentYear} Year`;
    }
  }

  const name =
    formData.name && formData.name.trim()
      ? formData.name.trim()
      : formData.studentName && formData.studentName.trim()
      ? formData.studentName.trim()
      : formData.degree
      ? `${formData.degree} Student`
      : "OppurtuNest Student";

  const email =
    formData.email && formData.email.trim()
      ? formData.email.trim()
      : `student_${Date.now()}@oppurtunest.local`;

  return {
    name,
    email,
    college: formData.college || "",
    degree: formData.degree || "",
    branch: formData.branch || "",
    year: yearDisplay || formData.year || "",
    goals: Array.isArray(formData.goals) ? formData.goals : [],
    opportunityTypes: Array.isArray(formData.opportunityTypes) ? formData.opportunityTypes : [],
    workModes: Array.isArray(formData.workModes) ? formData.workModes : [],
    preferredLocation: formData.preferredLocation || formData.location || "",
    preferredRoles: Array.isArray(formData.preferredRoles) ? formData.preferredRoles : [],
    interests: Array.isArray(formData.selectedInterests)
      ? formData.selectedInterests
      : Array.isArray(formData.interests)
      ? formData.interests
      : [],
    skills: Array.isArray(formData.selectedSkills)
      ? formData.selectedSkills
      : Array.isArray(formData.skills)
      ? formData.skills
      : [],
    skillLevels: formData.skillLevels && typeof formData.skillLevels === "object" ? formData.skillLevels : {},
    learningSkills: Array.isArray(formData.learningSkills) ? formData.learningSkills : [],
    projects: Array.isArray(formData.projects) ? formData.projects : [],
    certifications: Array.isArray(formData.certifications) ? formData.certifications : [],
  };
}

/**
 * Health check endpoint
 */
export async function checkBackendHealth() {
  try {
    return await fetchWithTimeout("/api/test", { method: "GET" }, 2000);
  } catch (err) {
    return null;
  }
}

// ----------------------------------------------------
// Authentication API Endpoints
// ----------------------------------------------------

/**
 * Log in a student user with email and password
 */
export async function loginUser(email, password) {
  return await fetchWithTimeout("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Register a new student user
 */
export async function registerUser(userData) {
  return await fetchWithTimeout("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

/**
 * Get current authenticated student profile via JWT
 */
export async function getCurrentAuthenticatedStudent() {
  return await fetchWithTimeout("/api/students/me", { method: "GET" });
}

// ----------------------------------------------------
// Authenticated Student Operations
// ----------------------------------------------------

/**
 * Update authenticated student profile fields
 */
export async function updateCurrentStudentProfile(profileData) {
  return await fetchWithTimeout("/api/students/me", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}

/**
 * Update authenticated student's skills, skill levels, and learning skills
 */
export async function updateCurrentStudentSkills({ skills, skillLevels, learningSkills }) {
  return await fetchWithTimeout("/api/students/me/skills", {
    method: "PUT",
    body: JSON.stringify({ skills, skillLevels, learningSkills }),
  });
}

/**
 * Save authenticated student's resume analysis
 */
export async function updateCurrentStudentResume(resumeData) {
  return await fetchWithTimeout("/api/students/me/resume", {
    method: "PUT",
    body: JSON.stringify(resumeData),
  });
}

/**
 * Save authenticated student's assessment results
 */
export async function updateCurrentStudentAssessment(assessmentData) {
  return await fetchWithTimeout("/api/students/me/assessment", {
    method: "PUT",
    body: JSON.stringify(assessmentData),
  });
}

// ----------------------------------------------------
// Recommendation & Skill Matching API Endpoints
// ----------------------------------------------------

/**
 * Get personalized recommendations for the authenticated student
 */
export async function getCurrentStudentRecommendations(limit = 6, category = null) {
  const params = new URLSearchParams();
  if (limit) params.append("limit", String(limit));
  if (category && category !== "All") params.append("category", category);
  const query = params.toString() ? `?${params.toString()}` : "";
  return await fetchWithTimeout(`/api/recommendations/me${query}`, { method: "GET" });
}

/**
 * Get skill-matching opportunities for the authenticated student
 */
export async function getCurrentStudentSkillMatching({ matchFilter, categoryFilter, limit } = {}) {
  const params = new URLSearchParams();
  if (matchFilter && matchFilter !== "all") params.append("matchFilter", matchFilter);
  if (categoryFilter && categoryFilter !== "all") params.append("categoryFilter", categoryFilter);
  if (limit) params.append("limit", String(limit));
  const query = params.toString() ? `?${params.toString()}` : "";
  return await fetchWithTimeout(`/api/recommendations/matching${query}`, { method: "GET" });
}

/**
 * Calculate skill matching opportunities by passing a profile object
 */
export async function getSkillMatchingWithProfile(profile, { matchFilter, categoryFilter, limit } = {}) {
  return await fetchWithTimeout("/api/recommendations/matching", {
    method: "POST",
    body: JSON.stringify({ profile, matchFilter, categoryFilter, limit }),
  });
}

/**
 * Get personalized recommendations by student ID
 */
export async function getRecommendations(studentId, limit = 6) {
  if (!studentId) return null;
  return await fetchWithTimeout(`/api/recommendations/${studentId}?limit=${limit}`, {
    method: "GET",
  });
}

/**
 * Generate recommendations by sending a raw profile payload
 */
export async function getRecommendationsWithProfile(profile, limit = 6) {
  return await fetchWithTimeout("/api/recommendations", {
    method: "POST",
    body: JSON.stringify({ profile, limit }),
  });
}

// ----------------------------------------------------
// Generic Student Profile Endpoints
// ----------------------------------------------------

/**
 * Create a new student profile in the database
 */
export async function createStudent(studentData) {
  return await fetchWithTimeout("/api/students", {
    method: "POST",
    body: JSON.stringify(studentData),
  });
}

/**
 * Get student by MongoDB _id
 */
export async function getStudent(studentId) {
  if (!studentId) return null;
  return await fetchWithTimeout(`/api/students/${studentId}`, { method: "GET" });
}

// ----------------------------------------------------
// Opportunities Endpoints (Public)
// ----------------------------------------------------

/**
 * Get opportunities with optional category, mode, and search filtering
 */
export async function getOpportunities({ category, mode, workMode, search, limit } = {}) {
  const params = new URLSearchParams();
  if (category && category !== "All") params.append("category", category);
  if (mode && mode !== "All") params.append("mode", mode);
  if (workMode && workMode !== "All") params.append("workMode", workMode);
  if (search) params.append("search", search);
  if (limit) params.append("limit", String(limit));

  const query = params.toString() ? `?${params.toString()}` : "";
  return await fetchWithTimeout(`/api/opportunities${query}`, { method: "GET" });
}

/**
 * Get opportunity by ID
 */
export async function getOpportunityById(id) {
  if (!id) return null;
  return await fetchWithTimeout(`/api/opportunities/${id}`, { method: "GET" });
}

/**
 * Get opportunity counts grouped by category
 */
export async function getOpportunityCounts() {
  return await fetchWithTimeout("/api/opportunities/counts", { method: "GET" });
}
