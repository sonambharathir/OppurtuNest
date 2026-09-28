const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    organization: {
      type: String,
      default: "",
      trim: true,
    },
    organizer: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    workMode: {
      type: String,
      default: "",
      trim: true,
    },
    mode: {
      type: String,
      default: "",
      trim: true,
    },
    duration: {
      type: String,
      default: "",
    },
    deadline: {
      type: String,
      default: "",
    },
    stipend: {
      type: String,
      default: "",
    },
    domain: {
      type: String,
      default: "",
      trim: true,
    },
    domains: {
      type: [String],
      default: [],
    },
    roles: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    bonusSkills: {
      type: [String],
      default: [],
    },
    eligibility: {
      type: String,
      default: "",
    },
    eligibleDegrees: {
      type: [String],
      default: [],
    },
    eligibleYears: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    applicationUrl: {
      type: String,
      default: "#",
    },
    featuredBadge: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    platform: {
      type: String,
      default: "",
    },
    prize: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    fee: {
      type: String,
      default: "",
    },
    lastChecked: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
