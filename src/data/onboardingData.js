// OppurtuNest — Onboarding Data
// Skills categories and interest categories for Profile Onboarding

export const skillCategories = {
  Programming: [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "C#",
    "Go",
    "PHP",
    "R",
  ],
  "Web Development": [
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "Next.js",
    "REST APIs",
    "Git",
    "GitHub",
  ],
  "Data & AI": [
    "SQL",
    "Excel",
    "Power BI",
    "Tableau",
    "Data Analysis",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Data Visualization",
  ],
  Design: [
    "UI/UX Design",
    "Figma",
    "Graphic Design",
    "Canva",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Prototyping",
  ],
  Business: [
    "Marketing",
    "Digital Marketing",
    "Finance",
    "Sales",
    "Business Analysis",
    "Entrepreneurship",
    "Project Management",
  ],
  "Core & Engineering": [
    "MATLAB",
    "AutoCAD",
    "SolidWorks",
    "Electronics",
    "IoT",
    "Robotics",
    "Embedded Systems",
  ],
  "Soft Skills": [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Presentation",
    "Public Speaking",
    "Time Management",
  ],
};

export const allSkills = Object.values(skillCategories).flat();

export const interestCategories = {
  "Technology & Software": [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
  ],
  "AI & Data": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Data Analytics",
    "Deep Learning",
    "Natural Language Processing",
  ],
  "Design & Creativity": [
    "UI/UX Design",
    "Graphic Design",
    "Product Design",
    "Animation",
    "Content Creation",
    "Photography",
  ],
  "Business & Entrepreneurship": [
    "Entrepreneurship",
    "Startups",
    "Business Strategy",
    "Product Management",
    "Consulting",
    "Operations",
  ],
  "Marketing & Communication": [
    "Digital Marketing",
    "Social Media",
    "Branding",
    "Content Marketing",
    "Public Relations",
    "Communications",
  ],
  "Research & Innovation": [
    "Scientific Research",
    "Academic Research",
    "Innovation",
    "Emerging Technologies",
    "Research & Development",
  ],
  "Social Impact & Sustainability": [
    "Social Impact",
    "Sustainability",
    "Climate & Environment",
    "Community Development",
    "Non-Profit Work",
    "Education",
  ],
  "Finance & Economics": [
    "Finance",
    "Investment",
    "Economics",
    "FinTech",
    "Accounting",
    "Banking",
  ],
  "Science & Healthcare": [
    "Healthcare",
    "Biotechnology",
    "Medicine",
    "Pharmaceuticals",
    "Life Sciences",
    "Public Health",
  ],
  Engineering: [
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Electronics",
    "Robotics",
    "Automotive",
    "Aerospace",
  ],
  "International Opportunities": [
    "Study Abroad",
    "International Internships",
    "Exchange Programs",
    "Global Fellowships",
    "International Research",
  ],
};

export const allInterests = Object.values(interestCategories).flat();

export const initialFormData = {
  // Academic
  college: "",
  degree: "",
  branch: "",
  currentYear: "",
  semester: "",
  graduationYear: "",

  // Skills
  selectedSkills: [],
  skillLevels: {},
  learningSkills: [],
  confidence: "",

  // Interests
  selectedInterests: [],
  interestSearch: "",

  // Projects
  projects: [
    {
      title: "",
      description: "",
      technologies: "",
      link: "",
    },
  ],

  // Certifications
  certifications: [
    {
      name: "",
      organization: "",
      year: "",
      link: "",
    },
  ],

  // Goals (Supports multiple selections)
  goals: [],

  // Preferences
  opportunityTypes: [],
  workModes: [],
  preferredLocation: "",
  preferredRoles: [],
  openToOtherDomains: "",
};
