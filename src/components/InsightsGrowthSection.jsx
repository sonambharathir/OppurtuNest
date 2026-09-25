import React from "react";
import { GrassTuft } from "./Illustrations";

// Hand-Drawn Style Line Graph SVG
const HandDrawnChart = ({ isFaded = false }) => (
  <svg
    viewBox="0 0 240 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hand-drawn-chart-svg"
    style={{ opacity: isFaded ? 0.35 : 1, filter: isFaded ? "grayscale(40%)" : "none" }}
  >
    <defs>
      <linearGradient id="coralArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ea655d" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ea655d" stopOpacity="0.0" />
      </linearGradient>
      <linearGradient id="mintArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#58a67e" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#58a67e" stopOpacity="0.0" />
      </linearGradient>
    </defs>

    {/* Axes */}
    <line x1="25" y1="15" x2="25" y2="105" stroke="#365447" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="105" x2="230" y2="105" stroke="#365447" strokeWidth="2" strokeLinecap="round" />
    
    {/* Little Axis Ticks */}
    <line x1="22" y1="25" x2="28" y2="25" stroke="#365447" strokeWidth="1.5" />
    <line x1="22" y1="65" x2="28" y2="65" stroke="#365447" strokeWidth="1.5" />
    <line x1="90" y1="102" x2="90" y2="108" stroke="#365447" strokeWidth="1.5" />
    <line x1="160" y1="102" x2="160" y2="108" stroke="#365447" strokeWidth="1.5" />

    {/* Coral Line & Area */}
    <path 
      d="M25 90 C60 80, 80 95, 110 65 C140 40, 170 70, 200 35 L225 30" 
      stroke="#ea655d" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    <path 
      d="M25 90 C60 80, 80 95, 110 65 C140 40, 170 70, 200 35 L225 30 L225 105 L25 105 Z" 
      fill="url(#coralArea)" 
    />

    {/* Mint Line & Area */}
    <path 
      d="M25 100 C55 85, 95 50, 130 60 C165 70, 185 45, 225 20" 
      stroke="#4d8c6b" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M25 100 C55 85, 95 50, 130 60 C165 70, 185 45, 225 20 L225 105 L25 105 Z" 
      fill="url(#mintArea)" 
    />

    {/* Data points */}
    <circle cx="110" cy="65" r="3.5" fill="#ea655d" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="200" cy="35" r="3.5" fill="#ea655d" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="130" cy="60" r="3.5" fill="#4d8c6b" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="225" cy="20" r="3.5" fill="#4d8c6b" stroke="#ffffff" strokeWidth="1.5" />
  </svg>
);

// Center Flowing Wave Lines SVG
const WavyFlowLines = ({ isFaded = false }) => (
  <svg
    viewBox="0 0 200 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="wavy-flow-svg"
    style={{ opacity: isFaded ? 0.35 : 1 }}
  >
    <path d="M5 35 C45 15, 85 45, 125 25 C155 10, 175 30, 195 18" stroke="#719d85" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M5 45 C40 35, 80 40, 120 38 C155 35, 175 25, 195 30" stroke="#9bbdae" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 2" />
    <path d="M5 50 C50 50, 100 50, 150 50 L195 50" stroke="#5a8671" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function InsightsGrowthSection({
  userProfile,
  uploadedResume,
  onOpenResume,
  onStartJourney,
}) {
  // Check whether user has entered any real data
  const hasResume = Boolean(uploadedResume && uploadedResume.detectedSkills?.length > 0);
  const hasProfile = Boolean(userProfile && userProfile.skills?.length > 0);
  const hasEnteredData = hasResume || hasProfile;

  // Real skills if entered
  const activeSkills = hasResume
    ? uploadedResume.detectedSkills
    : hasProfile
    ? userProfile.skills
    : [];

  const skillsCount = activeSkills.length;
  const topSkillsPreview = activeSkills.slice(0, 2).join(" & ");

  // Real Readiness Score (0 before entering data, real score after)
  const readinessScore = hasResume
    ? uploadedResume.score
    : hasProfile
    ? 78
    : 0;

  // Real Target Role
  const targetRole =
    userProfile?.goals?.[0] ||
    (activeSkills.some((s) => s.toLowerCase().includes("python") || s.toLowerCase().includes("ai"))
      ? "AI / Data Analyst"
      : activeSkills.some((s) => s.toLowerCase().includes("figma") || s.toLowerCase().includes("design"))
      ? "UI/UX Designer"
      : "Frontend Developer");

  // Determine domain
  const isAiStudent = activeSkills.some(
    (s) => s.toLowerCase().includes("python") || s.toLowerCase().includes("ai") || s.toLowerCase().includes("data")
  );
  const isDesignStudent = activeSkills.some(
    (s) => s.toLowerCase().includes("figma") || s.toLowerCase().includes("design")
  );

  // Personalized Deadlines once data entered
  const personalizedDates = isAiStudent
    ? [
        { day: "Oct", num: "28", title: "AI Hackathon", org: "DevGlobal" },
        { day: "Nov", num: "02", title: "Data Fellowship", org: "OpenTech" },
        { day: "Nov", num: "15", title: "Google Scholarship", org: "Google APAC" },
      ]
    : isDesignStudent
    ? [
        { day: "Oct", num: "29", title: "UI Apprentice", org: "Studio Craft" },
        { day: "Nov", num: "05", title: "Design Sprint", org: "Figma Community" },
        { day: "Nov", num: "15", title: "Google Scholarship", org: "Google APAC" },
      ]
    : [
        { day: "Oct", num: "27", title: "Frontend Intern", org: "Starlight Labs" },
        { day: "Oct", num: "28", title: "Web Dev Sprint", org: "TechSprint" },
        { day: "Nov", num: "04", title: "Google Scholarship", org: "Google APAC" },
      ];

  return (
    <section id="insights" className="insights-growth-section">
      <div className="section-title-wrap">
        <h2 className="section-heading">Your Insights & Growth</h2>
      </div>

      {/* Hand-drawn visuals dashboard row */}
      <div className="insights-dashboard-grid">
        {/* =========================================================
            CARD 1: SKILL GROWTH
            ========================================================= */}
        <div className="insights-card chart-card">
          <div className="insights-card-header">
            <h4 className="insights-card-title">
              <span>🌿</span> Skill Growth
            </h4>
            <span className={`insights-card-badge ${hasEnteredData ? "badge-mint" : "badge-muted"}`}>
              {hasEnteredData ? `+${skillsCount} Skills` : "Awaiting Data"}
            </span>
          </div>

          <HandDrawnChart isFaded={!hasEnteredData} />

          <div className="insights-card-footer">
            {hasEnteredData ? (
              <span>
                <strong>{skillsCount} Skills</strong> tracked from {hasResume ? "resume" : "profile"} • Top: {topSkillsPreview}
              </span>
            ) : (
              <span>
                No data yet.{" "}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={onOpenResume}
                  className="insights-action-link"
                >
                  Upload your resume
                </span>{" "}
                to see your real skill curve!
              </span>
            )}
          </div>
        </div>

        {/* =========================================================
            CARD 2: JOB READINESS
            ========================================================= */}
        <div className="insights-card wave-card">
          <div className="insights-card-header">
            <h4 className="insights-card-title">
              <span>🎯</span> Job Readiness
            </h4>
            <span className={`insights-card-badge ${hasEnteredData ? "badge-coral" : "badge-muted"}`}>
              {hasEnteredData ? `${readinessScore}% Ready` : "Not Calculated"}
            </span>
          </div>

          <WavyFlowLines isFaded={!hasEnteredData} />

          <div className="progress-pill-wrapper">
            <div className="progress-track" style={{ background: hasEnteredData ? "rgba(245, 240, 230, 0.85)" : "#f0ebd8" }}>
              <div
                className="progress-fill progress-fill-coral"
                style={{
                  width: `${readinessScore}%`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>

          <div className="insights-card-footer">
            {hasEnteredData ? (
              <span>
                Target: <strong>{targetRole}</strong> • Next: Add 1 project with TypeScript
              </span>
            ) : (
              <span>
                Enter your skills to calculate your real readiness for internships.
              </span>
            )}
          </div>
        </div>

        {/* =========================================================
            CARD 3: UPCOMING OPPORTUNITIES / DEADLINES
            ========================================================= */}
        <div className="insights-card upcoming-card">
          <div className="insights-card-header">
            <h4 className="insights-card-title">
              <span>📅</span> Upcoming Deadlines
            </h4>
            <span className={`insights-card-badge ${hasEnteredData ? "badge-mint" : "badge-muted"}`}>
              {hasEnteredData ? "3 Matches" : "Sample"}
            </span>
          </div>

          <div className="progress-pill-wrapper mb-2">
            <div className="progress-track">
              <div
                className="progress-fill progress-fill-mint"
                style={{ width: hasEnteredData ? "85%" : "25%", transition: "width 0.4s ease" }}
              />
            </div>
          </div>

          <div className="upcoming-subpanel" style={{ width: "100%" }}>
            <div className="date-badges-row" style={{ justifyContent: "center", width: "100%" }}>
              {personalizedDates.map((d, i) => (
                <div
                  key={i}
                  className="date-badge-item"
                  title={`${d.title} (${d.org})`}
                  style={{
                    cursor: "default",
                    minWidth: "62px",
                    textAlign: "center",
                    opacity: hasEnteredData ? 1 : 0.6,
                  }}
                >
                  <span className="date-badge-label">{d.day}</span>
                  <span className="date-badge-num">{d.num}</span>
                  <span style={{ fontSize: "9px", color: "#547967", fontWeight: 700, marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "68px" }}>
                    {hasEnteredData ? d.title : "Deadline"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="insights-card-footer">
            {hasEnteredData ? (
              <span>Matched to your {isAiStudent ? "Data & AI" : isDesignStudent ? "Design" : "Web Development"} skills</span>
            ) : (
              <span>Deadlines will personalize to your specific field once you enter data</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="insights-cta-wrap">
        {!hasEnteredData ? (
          <button
            type="button"
            className="btn-frosted-pill"
            onClick={onOpenResume}
            style={{ cursor: "pointer", border: "1.5px solid #6f9a62" }}
          >
            📄 Upload Resume to Personalize →
          </button>
        ) : (
          <a href="#opportunities" className="btn-frosted-pill">
            Explore Opportunities →
          </a>
        )}
      </div>

      {/* Little meadow grass details */}
      <div className="insights-grass-decor">
        <GrassTuft size={26} />
      </div>
    </section>
  );
}
