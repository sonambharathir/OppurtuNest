// OppurtuNest — Resume Text & Skill Parser
// Extracts real skills, contact information, and ATS score from resume text

import * as pdfjsLib from "pdfjs-dist";

// Set worker for pdfjs-dist if in browser environment
if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "3.11.174"}/pdf.worker.min.js`;
}

export const KNOWN_SKILLS = [
  // Web & Frontend
  "React", "JavaScript", "TypeScript", "HTML & CSS", "HTML", "CSS", "Tailwind", "Tailwind CSS",
  "Bootstrap", "Next.js", "Vue", "Vue.js", "Angular", "Redux", "Sass", "SCSS", "Web Development",
  "Frontend", "Frontend Development", "Full Stack", "Full Stack Development", "Webpack", "Vite",
  "Responsive Design",

  // Backend & Systems Programming
  "Node.js", "Express.js", "Express", "Python", "Java", "C++", "C#", "C", "PHP", "Go", "Golang",
  "Rust", "Django", "Flask", "FastAPI", "Spring Boot", "Spring", "Backend", "Backend Development",
  "REST APIs", "REST API", "GraphQL", "Microservices", "gRPC", "ASP.NET", "Ruby", "Ruby on Rails",

  // Databases & Storage
  "SQL", "MySQL", "PostgreSQL", "Postgres", "MongoDB", "Firebase", "Redis", "SQLite",
  "NoSQL", "Oracle", "Cassandra", "Database Management",

  // Cloud, DevOps & Infrastructure
  "Git & GitHub", "Git", "GitHub", "GitLab", "Docker", "Kubernetes", "AWS", "Amazon Web Services",
  "Azure", "GCP", "Google Cloud", "Linux", "Unix", "CI/CD", "DevOps", "Terraform", "Nginx",
  "Cloud Computing", "Postman",

  // Cybersecurity
  "Cybersecurity", "Network Security", "Information Security", "Ethical Hacking", "Penetration Testing",
  "Cryptography", "SIEM", "SOC", "Vulnerability Assessment", "Firewalls", "Wireshark", "Linux Security",

  // AI, Machine Learning & Data Science
  "Machine Learning", "Deep Learning", "Data Analysis", "Data Analytics", "Data Science", "Data Engineering",
  "Pandas", "NumPy", "Scikit-Learn", "PyTorch", "TensorFlow", "Keras", "Tableau", "Power BI",
  "Statistics", "Artificial Intelligence", "AI", "NLP", "Natural Language Processing", "Computer Vision",
  "Big Data", "Spark", "Hadoop", "R", "Neural Networks", "LLMs", "Generative AI",

  // Design, UX & Creative
  "Figma", "UI/UX", "UI/UX Design", "Adobe XD", "Wireframing", "Prototyping", "Design Systems",
  "Graphic Design", "Product Design", "Photoshop", "Illustrator", "Canva", "User Research",

  // Biotechnology, Healthcare & Life Sciences
  "Biotechnology", "Life Sciences", "Bioinformatics", "Healthcare", "Genetics", "Biology",
  "Pharmaceuticals", "Public Health", "Medical Research", "Molecular Biology", "Clinical Trials",
  "Biomedical Engineering", "Biochemistry", "Microbiology",

  // Engineering & Hardware
  "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Robotics", "MATLAB",
  "Simulink", "CAD", "AutoCAD", "SolidWorks", "Embedded Systems", "IoT", "Internet of Things",
  "Arduino", "Raspberry Pi", "Microcontrollers", "VLSI", "PCB Design",

  // Business, Marketing & Finance
  "Business Strategy", "Entrepreneurship", "Product Management", "Project Management",
  "Digital Marketing", "SEO", "Search Engine Optimization", "Social Media", "Social Media Marketing",
  "Content Marketing", "Public Relations", "Brand Management", "Finance", "FinTech", "Accounting",
  "Financial Analysis", "Financial Modeling", "Investment", "Investment Banking", "Economics",
  "Market Research", "Sales", "Business Development",

  // Professional & Soft Skills
  "Problem Solving", "Communication", "Leadership", "Teamwork", "Agile", "Scrum",
  "Critical Thinking", "Research", "Project Planning", "Time Management", "Collaboration"
];

const ACTION_VERBS = [
  "built", "created", "developed", "designed", "implemented", "engineered",
  "managed", "led", "increased", "improved", "reduced", "optimized",
  "spearheaded", "deployed", "collaborated", "automated", "launched", "tested"
];

/**
 * Parses raw text from a resume to find real skills, contact details, domains, education and ATS metrics.
 * If no skills are recognized, detectedSkills is an empty array (NO fabricated skills).
 */
export function parseResumeText(rawText, fileName = "Resume.pdf") {
  const text = rawText || "";
  const lowerText = text.toLowerCase();

  // 1. Detect Email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
  const hasEmail = emailRegex.test(text);

  // 2. Detect Phone Number
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const hasPhone = phoneRegex.test(text);

  // 3. Detect Links (GitHub / LinkedIn / Portfolio)
  const hasLinks = /(github\.com|linkedin\.com|http:\/\/|https:\/\/|\.dev|\.io)/i.test(text);

  // 4. Detect Action Verbs
  const foundVerbs = ACTION_VERBS.filter((verb) =>
    new RegExp(`\\b${verb}\\b`, "i").test(lowerText)
  );

  // 5. Detect Numbers / Quantifiable Metrics
  const metricMatches = text.match(/\b(\d+%\s*|\$\d+|\d+\+|\d+\s*(users|clients|projects|ms|seconds|hours))/gi) || [];

  // 6. Detect Real Skills from dictionary
  const foundSkills = [];
  for (const skill of KNOWN_SKILLS) {
    // Escape special chars for regex (like C++, Node.js)
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(^|[^a-zA-Z0-9#+])${escaped}([^a-zA-Z0-9#+]|$)`, "i");
    if (regex.test(text)) {
      if (!foundSkills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    }
  }

  // 7. Detect Broad Domains from detected skills and resume text
  const detectedDomains = [];
  const domainKeywordMap = {
    "Technology & Software": ["software", "web", "frontend", "backend", "full stack", "react", "node", "javascript", "typescript", "cloud", "devops", "cybersecurity", "git"],
    "AI & Data": ["machine learning", "deep learning", "data science", "data analysis", "data analytics", "artificial intelligence", "python", "pytorch", "tensorflow", "nlp", "computer vision", "pandas"],
    "Science & Healthcare": ["biotechnology", "bioinformatics", "healthcare", "medicine", "biology", "genetics", "pharmaceutical", "life sciences", "clinical", "biomedical"],
    "Design & Creativity": ["ui/ux", "figma", "graphic design", "product design", "design systems", "wireframing", "adobe xd", "photoshop"],
    "Business & Entrepreneurship": ["entrepreneurship", "business strategy", "product management", "startup", "operations", "consulting", "management"],
    "Marketing & Communication": ["digital marketing", "seo", "social media", "content marketing", "public relations", "branding", "communications"],
    "Finance & Economics": ["finance", "fintech", "accounting", "investment", "economics", "banking", "financial analysis", "financial modeling"],
    "Engineering": ["mechanical", "electrical", "civil", "robotics", "matlab", "cad", "solidworks", "embedded", "iot", "arduino"],
    "Research & Innovation": ["research", "academic research", "scientific research", "fellowship", "publications", "paper", "r&d"],
  };

  Object.entries(domainKeywordMap).forEach(([dom, keywords]) => {
    const hasKeyword = keywords.some((kw) => {
      const escaped = kw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      return regex.test(lowerText) || foundSkills.some((s) => s.toLowerCase() === kw);
    });
    if (hasKeyword && !detectedDomains.includes(dom)) {
      detectedDomains.push(dom);
    }
  });

  // 8. Detect Degree / Major if present
  let detectedDegree = "";
  if (/\b(b\.?tech|bachelor of technology|b\.?e|bachelor of engineering)\b/i.test(text)) detectedDegree = "B.Tech";
  else if (/\b(b\.?s|b\.?sc|bachelor of science|bachelor)\b/i.test(text)) detectedDegree = "B.S.";
  else if (/\b(m\.?tech|master of technology|m\.?s|m\.?sc|master of science|master)\b/i.test(text)) detectedDegree = "M.S.";
  else if (/\b(ph\.?d|doctorate)\b/i.test(text)) detectedDegree = "Ph.D.";
  else if (/\b(m\.?b\.?a|b\.?b\.?a)\b/i.test(text)) detectedDegree = "MBA";

  // 9. Calculate Real ATS Score
  let score = 45; // Baseline starting score
  if (hasEmail) score += 12;
  if (hasPhone) score += 12;
  if (hasLinks) score += 10;
  if (foundVerbs.length >= 3) score += 10;
  if (metricMatches.length >= 1) score += 6;
  if (foundSkills.length >= 4) score += 5;
  score = Math.min(96, Math.max(50, score));

  let status = "ATS Friendly";
  if (score < 65) status = "Needs Work";
  else if (score < 80) status = "Good Start";
  else status = "Strong Resume";

  return {
    fileName,
    rawTextLength: text.length,
    score,
    status,
    hasEmail,
    hasPhone,
    hasLinks,
    actionVerbCount: foundVerbs.length,
    metricCount: metricMatches.length,
    detectedSkills: foundSkills, // Real detected skills (empty if none match)
    detectedDomains,
    detectedDegree,
    extractedText: text.slice(0, 4000),
    isRealData: true,
  };
}

/**
 * Extracts readable text from an uploaded File object in the browser
 */
export async function extractTextFromFile(file) {
  if (!file) return "";

  // If text file (.txt, .md, .csv)
  if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
    return await file.text();
  }

  // If PDF file, use pdfjs-dist for accurate text stream extraction
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      });
      const pdf = await loadingTask.promise;
      let fullText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      if (fullText.trim().length > 0) {
        return fullText;
      }
    } catch (pdfErr) {
      console.warn("[resumeParser] PDF text extraction fallback:", pdfErr.message);
    }
  }

  // Fallback for DOC / DOCX / other formats: extract printable strings
  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binaryString = "";
    const len = Math.min(bytes.length, 500000);
    for (let i = 0; i < len; i++) {
      const code = bytes[i];
      if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
        binaryString += String.fromCharCode(code);
      } else {
        binaryString += " ";
      }
    }
    return binaryString;
  } catch (err) {
    console.error("[resumeParser] Error reading file buffer:", err);
    return file.name || "";
  }
}
