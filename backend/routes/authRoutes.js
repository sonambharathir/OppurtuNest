const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const { authMiddleware, JWT_SECRET } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Strips sensitive fields (like password) before returning student object
 */
function sanitizeStudent(student) {
  const obj = student && typeof student.toObject === "function" ? student.toObject() : { ...student };
  if (obj) {
    delete obj.password;
  }
  return obj;
}

/**
 * Generates signed JWT authentication token for a student
 */
function generateToken(student) {
  return jwt.sign(
    {
      id: student._id.toString(),
      email: student.email,
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
}

/**
 * POST /api/auth/register
 * Registers a new student account with hashed password or updates existing credentials
 */
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      college,
      degree,
      branch,
      year,
      skills,
      goals,
      opportunityTypes,
      workModes,
      preferredLocation,
      preferredRoles,
      interests,
      skillLevels,
      learningSkills,
      projects,
      certifications,
    } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // Check if a student already exists with this email
    let student = await Student.findOne({ email: cleanEmail });

    if (student) {
      // If student exists, update credentials and profile details
      student.password = hashedPassword;
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
      if (skillLevels && typeof skillLevels === "object") student.skillLevels = skillLevels;
      if (Array.isArray(learningSkills)) student.learningSkills = learningSkills;
      if (Array.isArray(projects)) student.projects = projects;
      if (Array.isArray(certifications)) student.certifications = certifications;

      await student.save();
      const token = generateToken(student);

      return res.status(200).json({
        message: "Account updated successfully",
        token,
        user: sanitizeStudent(student),
      });
    }

    // Create a new student with hashed password
    student = new Student({
      name: name && name.trim() ? name.trim() : "OppurtuNest Student",
      email: cleanEmail,
      password: hashedPassword,
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
      skillLevels: skillLevels && typeof skillLevels === "object" ? skillLevels : {},
      learningSkills: Array.isArray(learningSkills) ? learningSkills : [],
      projects: Array.isArray(projects) ? projects : [],
      certifications: Array.isArray(certifications) ? certifications : [],
    });

    await student.save();
    const token = generateToken(student);

    return res.status(201).json({
      message: "Account created successfully",
      token,
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
 * Validates credentials using bcrypt and returns signed JWT + sanitized profile
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

    if (!student.password) {
      // If legacy student had no password set, set hashed password now
      student.password = await bcrypt.hash(password.trim(), 10);
      await student.save();
    } else {
      let isMatch = false;
      const storedPass = student.password;

      if (storedPass.startsWith("$2a$") || storedPass.startsWith("$2b$") || storedPass.startsWith("$2y$")) {
        isMatch = await bcrypt.compare(password.trim(), storedPass);
      } else {
        // Plaintext legacy fallback with automatic migration to bcrypt
        isMatch = storedPass === password.trim();
        if (isMatch) {
          student.password = await bcrypt.hash(password.trim(), 10);
          await student.save();
        }
      }

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }
    }

    const token = generateToken(student);

    return res.status(200).json({
      message: "Login successful",
      token,
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
 * GET /api/auth/me
 * Protected route: returns current authenticated user from token
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    return res.status(200).json({
      user: sanitizeStudent(req.user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
});

/**
 * GET /api/auth/me/:id
 * Retrieves the user by ID (for backward compatibility)
 */
router.get("/me/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const student = await Student.findById(id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: sanitizeStudent(student) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
});

module.exports = router;
