const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");
const { authMiddleware, optionalAuth } = require("../middleware/authMiddleware");
const {
  getPersonalizedRecommendations,
  getSkillMatchingOpportunities,
} = require("../utils/recommendationEngine");

const router = express.Router();

/**
 * GET /api/recommendations/me
 * Protected: Returns ranked personalized recommendations for the authenticated student
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;
    const category = req.query.category || null;

    const student = await Student.findById(req.user._id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const opportunities = await Opportunity.find();
    const recommendations = getPersonalizedRecommendations(opportunities, student, limit, {
      categoryFilter: category,
    });

    return res.status(200).json(recommendations);
  } catch (error) {
    console.error("[Recommendations] Error /me:", error.message);
    return res.status(500).json({
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
});

/**
 * GET /api/recommendations/matching
 * Protected: Returns skill-matching opportunities calculated from real MongoDB collection for authenticated student
 */
router.get("/matching", authMiddleware, async (req, res) => {
  try {
    const { matchFilter, categoryFilter, limit } = req.query;
    const student = await Student.findById(req.user._id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const opportunities = await Opportunity.find();
    const matches = getSkillMatchingOpportunities(opportunities, student, {
      matchFilter: matchFilter || "all",
      categoryFilter: categoryFilter || "all",
    });

    const finalMatches = limit ? matches.slice(0, parseInt(limit, 10)) : matches;
    return res.status(200).json(finalMatches);
  } catch (error) {
    console.error("[Recommendations] Error /matching:", error.message);
    return res.status(500).json({
      message: "Failed to calculate skill matches",
      error: error.message,
    });
  }
});

/**
 * POST /api/recommendations/matching
 * Supports passing a profile object directly (or uses authenticated user)
 */
router.post("/matching", optionalAuth, async (req, res) => {
  try {
    const profile = req.body.profile || req.user || req.body || {};
    const { matchFilter, categoryFilter, limit } = req.body;

    const opportunities = await Opportunity.find();
    const matches = getSkillMatchingOpportunities(opportunities, profile, {
      matchFilter: matchFilter || "all",
      categoryFilter: categoryFilter || "all",
    });

    const finalMatches = limit ? matches.slice(0, parseInt(limit, 10)) : matches;
    return res.status(200).json(finalMatches);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to calculate skill matches",
      error: error.message,
    });
  }
});

/**
 * POST /api/recommendations
 * Get personalized recommendations directly from student profile / resume skills
 */
router.post("/", optionalAuth, async (req, res) => {
  try {
    const profile = req.body.profile || req.user || req.body || {};
    const limit = req.body.limit ? parseInt(req.body.limit, 10) : 6;
    const category = req.body.category || null;

    const opportunities = await Opportunity.find();
    const recommendations = getPersonalizedRecommendations(opportunities, profile, limit, {
      categoryFilter: category,
    });

    return res.status(200).json(recommendations);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
});

/**
 * GET /api/recommendations/:studentId
 * Get personalized recommendations for a student by ID
 */
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;
    const category = req.query.category || null;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(studentId).select("-password");
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const opportunities = await Opportunity.find();
    const recommendations = getPersonalizedRecommendations(opportunities, student, limit, {
      categoryFilter: category,
    });
    return res.status(200).json(recommendations);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
});

module.exports = router;
