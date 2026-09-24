// OppurtuNest — Recommended Opportunities Mock Data
// Structured data for recommended opportunities with support for profile-based filtering

export const mockOpportunities = [
  {
    id: "opp-1",
    title: "Frontend Development Intern",
    category: "Internships",
    organization: "Starlight Tech Labs",
    location: "Bengaluru, India",
    workMode: "Remote",
    duration: "2 months",
    stipend: "₹25,000 / month",
    domain: "Software Development",
    skills: ["React", "JavaScript", "CSS", "Git"],
    description: "Build real-world responsive web experiences with modern React and component libraries.",
    link: "#",
    featuredBadge: "High Match",
  },
  {
    id: "opp-2",
    title: "AI Hackathon: NextGen Innovators",
    category: "Hackathons",
    organization: "DevGlobal & OpenTech",
    location: "Virtual",
    workMode: "Remote",
    duration: "48 hours",
    stipend: "₹1,50,000 Prize Pool",
    domain: "Data & AI",
    skills: ["Python", "Machine Learning", "Artificial Intelligence", "REST APIs"],
    description: "Team up to create generative AI solutions for education and sustainable development.",
    link: "#",
    featuredBadge: "Upcoming",
  },
  {
    id: "opp-3",
    title: "Google Generation Scholarship (APAC)",
    category: "Scholarships",
    organization: "Google",
    location: "Global / APAC",
    workMode: "Remote",
    duration: "Academic Year 2026-27",
    stipend: "$1,000 Grant + Mentorship",
    domain: "Software Development",
    skills: ["Communication", "Leadership", "Problem Solving"],
    description: "Financial assistance and community mentorship for undergraduate women in computer science.",
    link: "#",
    featuredBadge: "Prestigious",
  },
  {
    id: "opp-4",
    title: "Full-Stack Web Dev Workshop",
    category: "Workshops",
    organization: "TechSprint Academy",
    location: "Hyderabad, India",
    workMode: "Hybrid",
    duration: "3 days intensive",
    stipend: "Certificate + Projects",
    domain: "Web Development",
    skills: ["HTML", "Node.js", "Express.js", "SQL"],
    description: "Hands-on guided workshop designing scalable backend APIs and database-backed web services.",
    link: "#",
    featuredBadge: "Free Registration",
  },
  {
    id: "opp-5",
    title: "AWS Certified Cloud Practitioner Cohort",
    category: "Certifications",
    organization: "Amazon Web Services",
    location: "Self-Paced / Online",
    workMode: "Remote",
    duration: "4 weeks",
    stipend: "Exam Voucher 50% Off",
    domain: "Cloud Computing",
    skills: ["Cloud Computing", "DevOps", "Problem Solving"],
    description: "Structured learning track preparing university students for globally recognized cloud certification.",
    link: "#",
    featuredBadge: "Industry Standard",
  },
  {
    id: "opp-6",
    title: "Undergraduate ML Research Fellowship",
    category: "Research",
    organization: "Indo-Global AI Research Lab",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    duration: "6 months",
    stipend: "₹30,000 / month",
    domain: "AI & Data",
    skills: ["Python", "Deep Learning", "Data Analysis", "Research & Development"],
    description: "Investigate multimodal computer vision models alongside senior faculty and postgrad researchers.",
    link: "#",
    featuredBadge: "Research Grant",
  },
  {
    id: "opp-7",
    title: "National Student Code Championship",
    category: "Competitions",
    organization: "CodeNation & HackerLeague",
    location: "Online",
    workMode: "Remote",
    duration: "1 week",
    stipend: "₹75,000 + Tech Interviews",
    domain: "Programming",
    skills: ["C++", "Java", "Python", "Problem Solving"],
    description: "Compete with 5,000+ engineering students in algorithmic problem-solving and optimization.",
    link: "#",
    featuredBadge: "Closing Soon",
  },
  {
    id: "opp-8",
    title: "UI/UX Product Design Apprentice",
    category: "Internships",
    organization: "Bloom Design Studio",
    location: "Mumbai, India",
    workMode: "Remote",
    duration: "3 months",
    stipend: "₹20,000 / month",
    domain: "Design",
    skills: ["UI/UX Design", "Figma", "Prototyping", "Design"],
    description: "Craft accessible mobile UI components and participate in weekly user research interviews.",
    link: "#",
    featuredBadge: "High Match",
  },
];

/**
 * Filter or score opportunities based on the student's profile data.
 * Structure accommodates real-time personalization logic.
 */
export function getRecommendedOpportunities(profileData, limit = 6) {
  if (!profileData) {
    return mockOpportunities.slice(0, limit);
  }

  const {
    opportunityTypes = [],
    workModes = [],
    selectedSkills = [],
    selectedInterests = [],
    preferredRoles = [],
  } = profileData;

  // Compute a match score for each opportunity
  const scored = mockOpportunities.map((opp) => {
    let score = 0;

    // Match opportunity type / category
    const catMatch = opportunityTypes.some((type) =>
      opp.category.toLowerCase().includes(type.toLowerCase()) ||
      type.toLowerCase().includes(opp.category.toLowerCase())
    );
    if (catMatch) score += 4;

    // Match work mode
    if (workModes.includes(opp.workMode)) score += 3;

    // Match preferred roles or domain
    const roleMatch = preferredRoles.some((role) =>
      opp.domain.toLowerCase().includes(role.toLowerCase()) ||
      role.toLowerCase().includes(opp.domain.toLowerCase())
    );
    if (roleMatch) score += 3;

    // Match skills
    const skillMatches = opp.skills.filter((sk) =>
      selectedSkills.includes(sk)
    ).length;
    score += skillMatches * 2;

    // Match interests
    const interestMatches = selectedInterests.filter((intr) =>
      opp.domain.toLowerCase().includes(intr.toLowerCase()) ||
      opp.description.toLowerCase().includes(intr.toLowerCase())
    ).length;
    score += interestMatches * 1;

    return { ...opp, matchScore: score };
  });

  // Sort by highest match score first
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, limit);
}
