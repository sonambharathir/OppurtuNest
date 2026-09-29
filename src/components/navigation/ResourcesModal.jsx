import { useState, useEffect } from "react";

export default function ResourcesModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resources = [
    {
      id: "res-1",
      category: "resume",
      title: "ATS-Compliant Resume Template & Checklist",
      tag: "Resume",
      badgeColor: "#eaf3e6",
      badgeTextColor: "#2b5735",
      desc: "Single-page clean markdown and LaTeX format optimized for modern Applicant Tracking Systems (ATS).",
      actionText: "Copy Template",
      content: `# Alex Doe\nEmail: alex.doe@example.com | Phone: (555) 123-4567 | GitHub: github.com/alexdoe | LinkedIn: linkedin.com/in/alexdoe\n\n## Education\n**Bachelor of Technology in Computer Science** — XYZ University (2023 - 2027)\n\n## Technical Skills\n- **Languages**: JavaScript, TypeScript, Python, Java, SQL\n- **Frameworks & Libraries**: React, Node.js, Express, Tailwind CSS\n- **Tools & Platforms**: Git, GitHub, Docker, AWS, Postman\n\n## Projects\n### Project Name | React, Node.js, MongoDB\n- Engineered full-stack web application with responsive UI and JWT authentication.\n- Reduced API latency by 35% through query optimization and database indexing.\n\n## Experience & Extracurriculars\n- **Campus Developer Club**: Organized 2 hackathons with 200+ participants.`,
      icon: "📄",
    },
    {
      id: "res-2",
      category: "interview",
      title: "Tech Interview & DSA Roadmap (B.Tech Edition)",
      tag: "Interviews",
      badgeColor: "#fbf5e6",
      badgeTextColor: "#73592c",
      desc: "Curated 75 core LeetCode/GeeksforGeeks problems covering Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and SQL.",
      actionText: "View Problem List",
      content: `### Core 75 DSA Roadmap\n1. Two Sum (Hash Map)\n2. Valid Parentheses (Stack)\n3. Merge Two Sorted Lists (Linked List)\n4. Best Time to Buy and Sell Stock (Two Pointers)\n5. Invert Binary Tree (Tree DFS)\n6. Number of Islands (Graph BFS/DFS)\n7. Longest Increasing Subsequence (Dynamic Programming)\n8. Top K Frequent Elements (Heap/Priority Queue)`,
      icon: "💼",
    },
    {
      id: "res-3",
      category: "roadmap",
      title: "Full-Stack Web Developer 2026 Roadmap",
      tag: "Career Roadmap",
      badgeColor: "#eaf0f8",
      badgeTextColor: "#27486e",
      desc: "Step-by-step learning progression from HTML/CSS/JS fundamentals to React 19, Node.js, MongoDB, Docker, and Cloud deployments.",
      actionText: "View Roadmap",
      content: `### Full-Stack Developer Path\n- Month 1: Semantic HTML5, CSS Grid/Flexbox, Vanilla Modern JS (ES6+).\n- Month 2: React 19, Component Lifecycle, State Management, Tailwind CSS.\n- Month 3: Node.js, Express.js REST APIs, MongoDB Mongoose, JWT Auth.\n- Month 4: Full Stack Integration, Git workflows, CI/CD, and Cloud deployment (Vercel/Render/AWS).`,
      icon: "🚀",
    },
    {
      id: "res-4",
      category: "opensource",
      title: "Open Source & Hackathon Winning Blueprint",
      tag: "Hackathons",
      badgeColor: "#fdeeed",
      badgeTextColor: "#8a3a34",
      desc: "How to find beginner-friendly open-source issues (GSoC, Hacktoberfest) and structure winning hackathon pitches in 48 hours.",
      actionText: "Read Blueprint",
      content: `### Hackathon Winning Blueprint\n1. Ideation: Pick a clear problem with real user pain (Education, Health, Sustainability).\n2. MVP Focus: Build 2-3 core working features with clean UX rather than 10 half-done buttons.\n3. Storytelling Pitch: 1 min problem statement -> 2 min live demo -> 1 min tech stack & roadmap.`,
      icon: "🏆",
    },
    {
      id: "res-5",
      category: "ai",
      title: "AI & Machine Learning Getting Started Guide",
      tag: "AI & Data",
      badgeColor: "#f4edf8",
      badgeTextColor: "#5b2c70",
      desc: "Core math foundations, Python libraries (Pandas, NumPy, PyTorch), and introductory Kaggle competitions for undergraduates.",
      actionText: "View Guide",
      content: `### AI & Data Roadmap\n- Foundation: Linear Algebra, Probability & Statistics, Python for Data Science.\n- Libraries: Pandas, NumPy, Matplotlib, Scikit-Learn.\n- Deep Learning: PyTorch, Neural Networks, Computer Vision & NLP basics.`,
      icon: "🤖",
    },
  ];

  const filtered = activeCategory === "all"
    ? resources
    : resources.filter((r) => r.category === activeCategory);

  const handleCopyContent = (item) => {
    navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <div className="qa-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="qa-modal-dialog" style={{ maxWidth: "760px" }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="qa-modal-header">
          <div className="qa-header-left">
            <div className="qa-header-icon" style={{ background: "#edf5ea", borderColor: "#6f9a62" }}>
              📚
            </div>
            <div>
              <h2 className="qa-modal-title">Student Resources & Toolkits</h2>
              <p className="qa-modal-subtitle">
                Free roadmaps, ATS resume templates, and preparation guides for B.Tech students.
              </p>
            </div>
          </div>
          <button type="button" className="qa-close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="qa-modal-body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Resources" },
              { id: "resume", label: "📄 Resume" },
              { id: "interview", label: "💼 Interviews" },
              { id: "roadmap", label: "🚀 Roadmaps" },
              { id: "opensource", label: "🏆 Hackathons" },
              { id: "ai", label: "🤖 AI & Data" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? "#326244" : "#ffffff",
                  color: activeCategory === cat.id ? "#ffffff" : "#445946",
                  border: activeCategory === cat.id ? "1.5px solid #326244" : "1.5px solid #ded5c2",
                  borderRadius: "999px",
                  padding: "6px 14px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "Nunito, sans-serif",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Resources List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #e2dac9",
                  borderRadius: "16px",
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  boxShadow: "0 2px 8px rgba(45, 80, 60, 0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "24px" }}>{item.icon}</span>
                    <div>
                      <h4 style={{ margin: 0, fontFamily: "Fredoka, sans-serif", fontSize: "16px", color: "#223522" }}>
                        {item.title}
                      </h4>
                      <span
                        style={{
                          background: item.badgeColor,
                          color: item.badgeTextColor,
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "999px",
                          display: "inline-block",
                          marginTop: "4px",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyContent(item)}
                    style={{
                      background: copiedId === item.id ? "#2b5735" : "#edf5ea",
                      color: copiedId === item.id ? "#ffffff" : "#2b5735",
                      border: "1px solid #b8dab3",
                      borderRadius: "999px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      transition: "all 0.15s ease",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    <span>{copiedId === item.id ? "✓ Copied to Clipboard!" : `📋 ${item.actionText}`}</span>
                  </button>
                </div>

                <p style={{ margin: 0, fontSize: "13px", color: "#556b53", lineHeight: "1.45" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
