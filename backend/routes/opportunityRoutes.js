const express = require("express");
const mongoose = require("mongoose");
const Opportunity = require("../models/Opportunity");

const router = express.Router();

// GET /api/opportunities — Get all opportunities with optional filtering
router.get("/", async (req, res) => {
  try {
    const { category, mode, workMode, search, limit } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = { $regex: new RegExp(category.trim(), "i") };
    }

    const selectedMode = mode || workMode;
    if (selectedMode && selectedMode !== "All") {
      filter.$or = [
        { workMode: { $regex: new RegExp(selectedMode.trim(), "i") } },
        { mode: { $regex: new RegExp(selectedMode.trim(), "i") } },
      ];
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      const searchConditions = [
        { title: { $regex: searchRegex } },
        { organization: { $regex: searchRegex } },
        { organizer: { $regex: searchRegex } },
        { domain: { $regex: searchRegex } },
        { domains: { $in: [searchRegex] } },
        { skills: { $in: [searchRegex] } },
        { roles: { $in: [searchRegex] } },
      ];

      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: searchConditions }];
        delete filter.$or;
      } else {
        filter.$or = searchConditions;
      }
    }

    let query = Opportunity.find(filter);

    if (limit && !isNaN(parseInt(limit, 10))) {
      query = query.limit(parseInt(limit, 10));
    }

    const opportunities = await query;
    return res.status(200).json(opportunities);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch opportunities",
      error: error.message,
    });
  }
});

// GET /api/opportunities/counts — Get opportunity counts grouped by category
router.get("/counts", async (req, res) => {
  try {
    const counts = await Opportunity.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const result = {
      Internships: 0,
      Hackathons: 0,
      Scholarships: 0,
      Competitions: 0,
      Certifications: 0,
      Workshops: 0,
      Research: 0,
    };
    const keyMap = {
      internship: "Internships",
      internships: "Internships",
      hackathon: "Hackathons",
      hackathons: "Hackathons",
      scholarship: "Scholarships",
      scholarships: "Scholarships",
      competition: "Competitions",
      competitions: "Competitions",
      certification: "Certifications",
      certifications: "Certifications",
      workshop: "Workshops",
      workshops: "Workshops",
      research: "Research",
    };
    counts.forEach((c) => {
      if (c._id) {
        const normalized = String(c._id).trim().toLowerCase();
        const targetKey = keyMap[normalized];
        if (targetKey && result.hasOwnProperty(targetKey)) {
          result[targetKey] += c.count;
        } else if (result.hasOwnProperty(c._id)) {
          result[c._id] += c.count;
        }
      }
    });
    result.total = Object.values(result).reduce((a, b) => a + b, 0);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch opportunity counts",
      error: error.message,
    });
  }
});

// GET /api/opportunities/:id — Get one opportunity by custom id or MongoDB ObjectId
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let opportunity = await Opportunity.findOne({ id: id.trim() });

    if (!opportunity && mongoose.Types.ObjectId.isValid(id)) {
      opportunity = await Opportunity.findById(id);
    }

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    return res.status(200).json(opportunity);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch opportunity",
      error: error.message,
    });
  }
});

module.exports = router;
