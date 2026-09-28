// OppurtuNest — Frontend API Helper
// Centralizes all backend interactions with http://localhost:5000

const API_BASE_URL = "http://localhost:5000";

/**
 * Safe fetch wrapper with timeout and JSON parsing
 */
async function fetchWithTimeout(endpoint, options = {}, timeoutMs = 4000) {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
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

  // Name: Use formData.name if provided; otherwise derive a natural student title
  const name =
    formData.name && formData.name.trim()
      ? formData.name.trim()
      : formData.degree
      ? `${formData.degree} Student`
      : "OppurtuNest Student";

  // Email: Use formData.email if provided; otherwise provide a valid default mailbox
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
    year: yearDisplay,
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

/**
 * Create a new student profile in the backend database
 * @param {Object} studentData
 * @returns {Promise<Object>} The created student object from MongoDB with _id
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

/**
 * Get personalized recommendations for a student
 * @param {string} studentId - MongoDB _id of the student
 * @param {number} limit - Maximum recommendations to return
 * @returns {Promise<Array>} Array of recommendation objects
 */
export async function getRecommendations(studentId, limit = 6) {
  if (!studentId) return null;
  return await fetchWithTimeout(`/api/recommendations/${studentId}?limit=${limit}`, {
    method: "GET",
  });
}

/**
 * Get opportunities with optional category and search filtering
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
