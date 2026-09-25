import { useState, useEffect } from "react";
import { careerPathways, defaultStudentSkills } from "../../data/skillJourneyData";

export default function SkillAnalyzerModal({
  isOpen,
  onClose,
  onNavigateSkillJourney,
  uploadedResume,
  onOpenResumeUpload,
}) {
  const [selectedRoleId, setSelectedRoleId] = useState("frontend-dev");
  const [usePreviewSkills, setUsePreviewSkills] = useState(false);

  // Close on ESC
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

  const currentRole =
    careerPathways.find((r) => r.id === selectedRoleId) || careerPathways[0];

  const hasRealResume = Boolean(
    uploadedResume && uploadedResume.detectedSkills && uploadedResume.detectedSkills.length > 0
  );

  // Determine which skills to analyze:
  // 1. Real skills from uploaded resume (default if available)
  // 2. Or sample student profile skills (only if user explicitly chooses to explore preview or hasn't uploaded)
  const activeSkillsList = hasRealResume
    ? uploadedResume.detectedSkills
    : usePreviewSkills
    ? defaultStudentSkills.map((s) => s.name)
    : [];

  const activeSkillsLower = activeSkillsList.map((s) => s.toLowerCase());

  // Find matched core skills against the role
  const matchedCoreSkills = currentRole.coreSkills.filter((cs) =>
    activeSkillsLower.some((sk) => sk.includes(cs.toLowerCase()) || cs.toLowerCase().includes(sk))
  );

  // Core skills that are missing
  const missingCoreSkills = currentRole.coreSkills.filter(
    (cs) => !matchedCoreSkills.includes(cs)
  );

  // Also check if any worthDeveloping skills are already known
  const matchedBonusSkills = currentRole.worthDeveloping.filter((wd) =>
    activeSkillsLower.some((sk) => sk.includes(wd.name.toLowerCase()) || wd.name.toLowerCase().includes(sk))
  );

  // Real match percentage
  const totalCore = currentRole.coreSkills.length;
  const matchPercent =
    activeSkillsList.length === 0
      ? 0
      : Math.min(100, Math.round((matchedCoreSkills.length / Math.max(1, totalCore)) * 100));

  return (
    <div className="qa-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="qa-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="qa-modal-header">
          <div className="qa-header-left">
            <div className="qa-header-icon">📊</div>
            <div>
              <h2 className="qa-modal-title">Skill Analyzer</h2>
              <p className="qa-modal-subtitle">
                Compare your actual skills against job roles and see exactly what to learn next.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="qa-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="qa-modal-body">
          {/* Resume Status Banner */}
          {hasRealResume ? (
            <div
              style={{
                background: "#f0f7ee",
                border: "1.5px solid #a8d5a2",
                borderRadius: "14px",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>📄</span>
                <span style={{ fontSize: "13px", color: "#2b5735", fontWeight: 700 }}>
                  Analyzing real skills from: <strong>{uploadedResume.fileName}</strong> ({uploadedResume.detectedSkills.length} skills found)
                </span>
              </div>
              {onOpenResumeUpload && (
                <button
                  type="button"
                  onClick={onOpenResumeUpload}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #72a365",
                    borderRadius: "8px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    color: "#2b5735",
                    cursor: "pointer",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  Change Resume
                </button>
              )}
            </div>
          ) : !usePreviewSkills ? (
            <div
              style={{
                background: "#fff9ee",
                border: "1.5px solid #ebd4a8",
                borderRadius: "16px",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "28px" }}>📄</span>
              <h3 style={{ margin: 0, fontFamily: "Fredoka, sans-serif", fontSize: "17px", color: "#8c5b16" }}>
                No Resume Uploaded Yet
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#6e5328", maxWidth: "420px" }}>
                To see your <strong>real, personalized</strong> skills and match score, upload your resume first!
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "4px", flexWrap: "wrap", justifyContent: "center" }}>
                {onOpenResumeUpload && (
                  <button
                    type="button"
                    className="qa-btn-primary"
                    onClick={onOpenResumeUpload}
                  >
                    📄 Upload Your Resume Now
                  </button>
                )}
                <button
                  type="button"
                  className="qa-sample-btn"
                  onClick={() => setUsePreviewSkills(true)}
                >
                  Or explore with preview skills
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "#fbf8f1",
                border: "1px dashed #ded5c2",
                borderRadius: "12px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12.5px",
                color: "#6a7c68",
              }}
            >
              <span>Showing sample preview skills.</span>
              {onOpenResumeUpload && (
                <button
                  type="button"
                  onClick={onOpenResumeUpload}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#3b7445",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Upload your real resume
                </button>
              )}
            </div>
          )}

          {/* Target Role Selector */}
          <div className="qa-role-selector-wrap">
            <label className="qa-section-label" htmlFor="role-select">
              Select Target Role to Analyze:
            </label>
            <select
              id="role-select"
              className="qa-role-select"
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
            >
              {careerPathways.map((path) => (
                <option key={path.id} value={path.id}>
                  {path.title} ({path.domain})
                </option>
              ))}
            </select>
          </div>

          {/* Match Meter Banner */}
          <div className="qa-match-banner">
            <div className="qa-banner-header">
              <h3 className="qa-banner-title">{currentRole.title}</h3>
              <span className="qa-match-badge">{matchPercent}% Match</span>
            </div>

            <div className="qa-match-bar-track">
              <div
                className="qa-match-bar-fill"
                style={{ width: `${matchPercent}%` }}
              />
            </div>

            <p className="qa-banner-summary">
              {matchPercent >= 75
                ? "🌟 Strong Match! Your resume shows strong foundations for this role."
                : matchPercent >= 40
                ? "🌱 Good Start! You have some core skills, with a few key ones to build."
                : "💡 Beginner Level: Learning the core skills below will open up this career path."}
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="qa-analysis-grid">
            {/* Column 1: Skills You Have */}
            <div className="qa-analysis-col">
              <h4 className="qa-col-title">
                <span>✅</span> Skills Found ({matchedCoreSkills.length})
              </h4>
              <div className="qa-skills-sublist">
                {matchedCoreSkills.map((sk) => (
                  <div key={sk} className="qa-mini-skill-card qa-skill-matched">
                    <span>{sk}</span>
                    <span style={{ fontSize: "11px", color: "#4f7a43", fontWeight: 800 }}>Found ✓</span>
                  </div>
                ))}

                {/* If user also has bonus skills for this role */}
                {matchedBonusSkills.map((b) => (
                  <div key={b.name} className="qa-mini-skill-card qa-skill-matched">
                    <span>{b.name}</span>
                    <span style={{ fontSize: "11px", color: "#4f7a43" }}>Bonus Skill ✓</span>
                  </div>
                ))}

                {matchedCoreSkills.length === 0 && matchedBonusSkills.length === 0 && (
                  <div style={{ padding: "12px", textAlign: "center", color: "#7b8e78", fontSize: "12.5px" }}>
                    {hasRealResume
                      ? "None of the core skills for this role were detected in your resume yet."
                      : "Upload your resume to see your real matching skills here."}
                  </div>
                )}
              </div>
            </div>

            {/* Column 2: What to Learn Next */}
            <div className="qa-analysis-col">
              <h4 className="qa-col-title">
                <span>💡</span> What to Learn Next ({missingCoreSkills.length + currentRole.worthDeveloping.length})
              </h4>
              <div className="qa-skills-sublist">
                {/* Core missing skills */}
                {missingCoreSkills.map((sk) => (
                  <div key={sk} className="qa-skill-gap-card">
                    <div className="qa-gap-card-top">
                      <span className="qa-gap-name">{sk}</span>
                      <span className="qa-gap-tag" style={{ background: "#fde8e8", color: "#b83838" }}>
                        Core Need
                      </span>
                    </div>
                    <span className="qa-gap-reason">Essential requirement for {currentRole.title}.</span>
                  </div>
                ))}

                {/* Growth Skills */}
                {currentRole.worthDeveloping.slice(0, 3).map((item) => (
                  <div key={item.name} className="qa-skill-gap-card">
                    <div className="qa-gap-card-top">
                      <span className="qa-gap-name">{item.name}</span>
                      <span className="qa-gap-tag">{item.level}</span>
                    </div>
                    <span className="qa-gap-reason">{item.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="qa-next-steps-box">
            <h4 className="qa-next-steps-title">
              <span>🎯</span> Recommended Learning Steps for You
            </h4>
            <div className="qa-next-steps-list">
              {currentRole.worthDeveloping.slice(0, 3).map((item, idx) => (
                <div key={item.name} className="qa-next-step-item">
                  <div className="qa-step-num">{idx + 1}</div>
                  <div>
                    <strong>{item.name}:</strong> {item.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="qa-modal-footer">
          <button
            type="button"
            className="qa-btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          {onNavigateSkillJourney && (
            <button
              type="button"
              className="qa-btn-primary"
              onClick={() => {
                onClose();
                onNavigateSkillJourney("gaps");
              }}
            >
              Explore Full Skill Journey →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
