const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    degree: {
      type: String,
      default: "",
      trim: true,
    },

    branch: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
    },

    goals: {
      type: [String],
      default: [],
    },

    opportunityTypes: {
      type: [String],
      default: [],
    },

    workModes: {
      type: [String],
      default: [],
    },

    preferredLocation: {
      type: String,
      default: "",
      trim: true,
    },

    preferredRoles: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);