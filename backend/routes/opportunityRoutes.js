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
