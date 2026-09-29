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
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      default: "",
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

    // Persistent resume analysis data
    resume: {
      fileName: { type: String, default: "" },
      uploadedAt: { type: Date, default: null },
      rawTextLength: { type: Number, default: 0 },
      score: { type: Number, default: 0 },
      status: { type: String, default: "" },
      hasEmail: { type: Boolean, default: false },
      hasPhone: { type: Boolean, default: false },
      hasLinks: { type: Boolean, default: false },
      actionVerbCount: { type: Number, default: 0 },
      metricCount: { type: Number, default: 0 },
      detectedSkills: { type: [String], default: [] },
      extractedText: { type: String, default: "" },
    },

    // Extracted skills from resume
    resumeSkills: {
      type: [String],
      default: [],
    },

    // Map of skill name -> proficiency level (Beginner, Intermediate, Advanced)
    skillLevels: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Desired skills student is actively learning
    learningSkills: {
      type: [String],
      default: [],
    },

    // Student projects
    projects: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        technologies: { type: String, default: "" },
        link: { type: String, default: "" },
      },
    ],

    // Student certifications
    certifications: [
      {
        name: { type: String, default: "" },
        organization: { type: String, default: "" },
        year: { type: String, default: "" },
        link: { type: String, default: "" },
      },
    ],

    // Latest Quick Skill Assessment result
    assessmentResults: {
      skillArea: { type: String, default: "" },
      skillAreaId: { type: String, default: "" },
      completedAt: { type: String, default: "" },
      snapshot: [
        {
          skill: { type: String, default: "" },
          level: { type: String, default: "" },
          levelClass: { type: String, default: "" },
          knowledgeScore: { type: String, default: "" },
        },
      ],
      recommendedSkills: [
        {
          name: { type: String, default: "" },
          reason: { type: String, default: "" },
          suggestion: { type: String, default: "" },
        },
      ],
    },

    // Assessment historical logs
    assessmentHistory: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    // Skills confirmed through assessment
    assessmentSkills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);