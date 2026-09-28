const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");
const { getPersonalizedRecommendations } = require("../utils/recommendationEngine");

const router = express.Router();

// GET /api/recommendations/:studentId — Get personalized recommendations for a student
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const opportunities = await Opportunity.find();
    const recommendations = getPersonalizedRecommendations(opportunities, student, limit);

    return res.status(200).json(recommendations);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
});

module.exports = router;
