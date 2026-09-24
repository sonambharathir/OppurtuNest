// OppurtuNest — Skills Data Layer
// Modular structured data layer for student skills and categories

export const defaultStudentSkills = [
  {
    id: "sk-react",
    name: "React",
    category: "Technical Skills",
    level: "Intermediate",
    confidence: "Comfortable",
    verified: true,
  },
  {
    id: "sk-js",
    name: "JavaScript",
    category: "Technical Skills",
    level: "Intermediate",
    confidence: "Comfortable",
    verified: true,
  },
  {
    id: "sk-python",
    name: "Python",
    category: "Technical Skills",
    level: "Beginner",
    confidence: "Still learning",
    verified: false,
  },
  {
    id: "sk-git",
    name: "Git & GitHub",
    category: "Tools",
    level: "Intermediate",
    confidence: "Comfortable",
    verified: true,
  },
  {
    id: "sk-htmlcss",
    name: "HTML & CSS",
    category: "Technical Skills",
    level: "Advanced",
    confidence: "Very confident",
    verified: true,
  },
  {
    id: "sk-figma",
    name: "Figma",
    category: "Tools",
    level: "Beginner",
    confidence: "Still learning",
    verified: false,
  },
  {
    id: "sk-problem-solving",
    name: "Problem Solving",
    category: "Other Skills",
    level: "Intermediate",
    confidence: "Comfortable",
    verified: false,
  },
  {
    id: "sk-communication",
    name: "Communication",
    category: "Other Skills",
    level: "Intermediate",
    confidence: "Comfortable",
    verified: false,
  },
];

export const skillCategories = [
  "Technical Skills",
  "Tools",
  "Other Skills",
];

export const proficiencyLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

// Re-export other journey data for convenience
export { careerPathways, matchedOpportunities, initialGrowthMilestones } from "./skillJourneyData";
