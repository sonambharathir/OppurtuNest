const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

/**
 * Strips sensitive fields (like password) before returning student object
 */
function sanitizeStudent(student) {
  const obj = student.toObject ? student.toObject() : { ...student };
  delete obj.password;
  return obj;
}

/**
 * POST /api/auth/register
 * Registers a new student account or updates an existing one with credentials
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, college, degree, branch, year, skills, goals, opportunityTypes, workModes, preferredLocation, preferredRoles, interests } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if a student already exists with this email
    let student = await Student.findOne({ email: cleanEmail });

    if (student) {
      // If student exists, update credentials and profile details
      student.password = password.trim();
      if (name) student.name = name.trim();
      if (college) student.college = college.trim();
      if (degree) student.degree = degree.trim();
      if (branch) student.branch = branch.trim();
      if (year) student.year = year;
      if (Array.isArray(skills) && skills.length > 0) student.skills = skills;
      if (Array.isArray(goals) && goals.length > 0) student.goals = goals;
      if (Array.isArray(opportunityTypes) && opportunityTypes.length > 0) student.opportunityTypes = opportunityTypes;
      if (Array.isArray(workModes) && workModes.length > 0) student.workModes = workModes;
      if (preferredLocation) student.preferredLocation = preferredLocation;
      if (Array.isArray(preferredRoles) && preferredRoles.length > 0) student.preferredRoles = preferredRoles;
      if (Array.isArray(interests) && interests.length > 0) student.interests = interests;

      await student.save();
      return res.status(200).json({
        message: "Account updated successfully",
        user: sanitizeStudent(student),
      });
    }

    // Create a new student
    student = new Student({
      name: name && name.trim() ? name.trim() : "OppurtuNest Student",
      email: cleanEmail,
      password: password.trim(),
      college: college || "",
      degree: degree || "",
      branch: branch || "",
      year: year || "",
      skills: Array.isArray(skills) ? skills : [],
      goals: Array.isArray(goals) ? goals : [],
      opportunityTypes: Array.isArray(opportunityTypes) ? opportunityTypes : [],
      workModes: Array.isArray(workModes) ? workModes : [],
      preferredLocation: preferredLocation || "",
      preferredRoles: Array.isArray(preferredRoles) ? preferredRoles : [],
      interests: Array.isArray(interests) ? interests : [],
    });

    await student.save();

    return res.status(201).json({
      message: "Account created successfully",
      user: sanitizeStudent(student),
    });
  } catch (error) {
    console.error("[Auth] Register error:", error.message);
    return res.status(500).json({
      message: "Failed to create account",
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/login
 * Validates credentials and returns the student's profile & skills
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }

    const cleanEmail = email.trim().toLowerCase();

    const student = await Student.findOne({ email: cleanEmail });

    if (!student) {
      return res.status(401).json({
        message: "No account found with this email. Please sign up first.",
      });
    }

    // If student has a password, verify it matches
    if (student.password && student.password !== password.trim()) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // If student had no password set yet (legacy onboarding record), attach it
    if (!student.password) {
      student.password = password.trim();
      await student.save();
    }

    return res.status(200).json({
      message: "Login successful",
      user: sanitizeStudent(student),
    });
  } catch (error) {
    console.error("[Auth] Login error:", error.message);
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

/**
 * GET /api/auth/me/:id
 * Retrieves the current logged-in user by ID
 */
router.get("/me/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: sanitizeStudent(student) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
});

module.exports = router;
