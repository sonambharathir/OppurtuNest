const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

function sanitize(student) {
  const obj = student && typeof student.toObject === "function" ? student.toObject() : { ...student };
  if (obj) {
    delete obj.password;
  }
  return obj;
}

// ----------------------------------------------------
// Authenticated Student Endpoints (Protected by JWT)
// ----------------------------------------------------

/**
 * GET /api/students/me
 * Returns full profile, skills, resume analysis, and assessment results for logged-in student
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    return res.status(200).json(sanitize(student));
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch student profile",
      error: error.message,
    });
  }
});

/**
 * PUT /api/students/me
 * Updates profile fields for the authenticated student
 */
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }

    const {
      name,
      college,
      degree,
      branch,
      year,
      goals,
      opportunityTypes,
      workModes,
      preferredLocation,
      preferredRoles,
      interests,
      skills,
      skillLevels,
      learningSkills,
      projects,
      certifications,
    } = req.body;

    if (name !== undefined) student.name = String(name).trim();
    if (college !== undefined) student.college = String(college).trim();
    if (degree !== undefined) student.degree = String(degree).trim();
    if (branch !== undefined) student.branch = String(branch).trim();
    if (year !== undefined) student.year = String(year);
    if (Array.isArray(goals)) student.goals = goals;
    if (Array.isArray(opportunityTypes)) student.opportunityTypes = opportunityTypes;
    if (Array.isArray(workModes)) student.workModes = workModes;
    if (preferredLocation !== undefined) student.preferredLocation = String(preferredLocation).trim();
    if (Array.isArray(preferredRoles)) student.preferredRoles = preferredRoles;
    if (Array.isArray(interests)) student.interests = interests;
    if (Array.isArray(skills)) student.skills = skills;
    if (skillLevels && typeof skillLevels === "object") student.skillLevels = skillLevels;
    if (Array.isArray(learningSkills)) student.learningSkills = learningSkills;
    if (Array.isArray(projects)) student.projects = projects;
    if (Array.isArray(certifications)) student.certifications = certifications;

    await student.save();
    return res.status(200).json(sanitize(student));
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
});

/**
 * PUT /api/students/me/skills
 * Updates skills, skillLevels, and learningSkills for the authenticated student
 */
router.put("/me/skills", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }

    const { skills, skillLevels, learningSkills } = req.body;

    if (Array.isArray(skills)) {
      student.skills = skills;
    }
    if (skillLevels && typeof skillLevels === "object") {
      student.skillLevels = skillLevels;
    }
    if (Array.isArray(learningSkills)) {
      student.learningSkills = learningSkills;
    }

    await student.save();
    return res.status(200).json(sanitize(student));
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update skills",
      error: error.message,
    });
  }
});

/**
 * PUT /api/students/me/resume
 * Saves parsed resume analysis, extracts detectedSkills into resumeSkills, and updates student intelligence
 */
router.put("/me/resume", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }

    const resumeData = req.body.resume || req.body;
    const detected = Array.isArray(resumeData.detectedSkills) ? resumeData.detectedSkills : [];

    student.resume = {
      fileName: resumeData.fileName || "Resume.pdf",
      uploadedAt: resumeData.uploadedAt ? new Date(resumeData.uploadedAt) : new Date(),
      rawTextLength: resumeData.rawTextLength || 0,
      score: typeof resumeData.score === "number" ? resumeData.score : 70,
      status: resumeData.status || "ATS Friendly",
      hasEmail: Boolean(resumeData.hasEmail),
      hasPhone: Boolean(resumeData.hasPhone),
      hasLinks: Boolean(resumeData.hasLinks),
      actionVerbCount: Number(resumeData.actionVerbCount) || 0,
      metricCount: Number(resumeData.metricCount) || 0,
      detectedSkills: detected,
      extractedText: resumeData.extractedText || "",
    };

    // Store detectedSkills as resumeSkills
    student.resumeSkills = detected;

    await student.save();
    return res.status(200).json({
      message: "Resume analysis saved successfully",
      student: sanitize(student),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save resume analysis",
      error: error.message,
    });
  }
});

/**
 * PUT /api/students/me/assessment
 * Saves Quick Skill Assessment result, updates assessmentHistory, and registers assessed skills
 */
router.put("/me/assessment", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }

    const result = req.body.assessmentResults || req.body;
    const snapshot = Array.isArray(result.snapshot) ? result.snapshot : [];
    const recommended = Array.isArray(result.recommendedSkills) ? result.recommendedSkills : [];

    const newAssessmentResult = {
      skillArea: result.skillArea || "",
      skillAreaId: result.skillAreaId || "",
      completedAt: result.completedAt || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      snapshot,
      recommendedSkills: recommended,
    };

    student.assessmentResults = newAssessmentResult;

    // Push to assessment history
    if (!Array.isArray(student.assessmentHistory)) {
      student.assessmentHistory = [];
    }
    student.assessmentHistory.push({
      ...newAssessmentResult,
      savedAt: new Date(),
    });

    // Extract assessed skills into assessmentSkills
    const assessedNames = snapshot.map((s) => s.skill).filter(Boolean);
    const existingAssessed = new Set((student.assessmentSkills || []).map((s) => s.toLowerCase()));
    assessedNames.forEach((s) => {
      if (!existingAssessed.has(s.toLowerCase())) {
        student.assessmentSkills.push(s);
        existingAssessed.add(s.toLowerCase());
      }
    });

    // Optionally update skillLevels for assessed skills with proven level
    if (!student.skillLevels) {
      student.skillLevels = {};
    }
    const levelsMap = { ...student.skillLevels };
    snapshot.forEach((item) => {
      if (item.skill && item.level) {
        levelsMap[item.skill] = item.level;
      }
    });
    student.skillLevels = levelsMap;

    await student.save();
    return res.status(200).json({
      message: "Assessment results saved successfully",
      student: sanitize(student),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save assessment results",
      error: error.message,
    });
  }
});

// ----------------------------------------------------
// Public / Compatibility Routes
// ----------------------------------------------------

// Create a new student profile (e.g. from onboarding when not yet logged in)
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    return res.status(201).json(sanitize(savedStudent));
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Student validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create student",
      error: error.message,
    });
  }
});

// Get all student profiles (sanitized)
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    return res.status(200).json(students.map(sanitize));
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
});

// Get one student profile by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findById(id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(sanitize(student));
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch student",
      error: error.message,
    });
  }
});

// Update one student profile by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const updateData = { ...req.body };
    delete updateData.password; // Do not overwrite password directly via generic PUT

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(sanitize(updatedStudent));
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Student validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
});

// Delete one student profile by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const deletedStudent = await Student.findByIdAndDelete(id).select("-password");
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      student: sanitize(deletedStudent),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
});

module.exports = router;
