import React, { useState, useEffect } from "react";
import { getPersonalizedOpportunities } from "../../data/opportunities";
import OpportunityModal from "../skillJourney/OpportunityModal";

const categoryIcons = {
  Internships: "🌿",
  Hackathons: "⚡",
  Scholarships: "🎓",
  Workshops: "🛠",
  Research: "🔬",
};

export default function CategoryOpportunitiesModal({
  isOpen,
  category,
  onClose,
  userProfile,
  uploadedResume,
  onOpenResume,
}) {
  const [selectedOpp, setSelectedOpp] = useState(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !selectedOpp) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, selectedOpp]);

  if (!isOpen || !category) return null;

  const { opportunities, hasEnteredData, userSkills, userGoals } =
    getPersonalizedOpportunities({
      userProfile,
      uploadedResume,
      category,
    });

  const catIcon = categoryIcons[category] || "✦";

  return (
    <>
      <div
        className="qa-modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="qa-modal-dialog"
          style={{ maxWidth: "780px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="qa-modal-header">
            <div className="qa-header-left">
              <div className="qa-header-icon">{catIcon}</div>
              <div>
                <h2 className="qa-modal-title">Personalized {category}</h2>
                <p className="qa-modal-subtitle">
                  {hasEnteredData
                    ? `Curated based on your goals, skills, and verified eligibility.`
                    : `Showing available ${category.toLowerCase()}. Upload your resume to filter by your exact skills and eligibility!`}
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
            {/* Status Banner */}
            <div
              style={{
                background: hasEnteredData ? "#f0f7ee" : "#fffcf4",
                border: `1.5px solid ${hasEnteredData ? "#b7d6b3" : "#eed6aa"}`,
                borderRadius: "14px",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                fontSize: "13px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: hasEnteredData ? "#2b5735" : "#7d5718", fontWeight: 600 }}>
                <span>{hasEnteredData ? "🎯" : "💡"}</span>
                <span>
                  {hasEnteredData ? (
                    <>
                      Personalized for <strong>{userGoals[0] || "Your Goals"}</strong> • <strong>{userSkills.length} skills</strong> analyzed • Eligibility verified
                    </>
                  ) : (
                    <>
                      Showing general opportunities. Upload your resume to unlock real eligibility checks!
                    </>
                  )}
                </span>
              </div>

              {!hasEnteredData && onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenResume();
                  }}
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
                  📄 Upload Resume
                </button>
              )}
            </div>

            {/* Opportunities List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {opportunities.length === 0 ? (
                <div style={{ padding: "30px", textAlign: "center", color: "#6a7c68" }}>
                  <p>No {category.toLowerCase()} found matching your current filter.</p>
                </div>
              ) : (
                opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    style={{
                      background: "#ffffff",
                      border: "1.5px solid #ded5c2",
                      borderRadius: "16px",
                      padding: "16px 18px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      boxShadow: "0 3px 10px rgba(45, 80, 60, 0.04)",
                      transition: "transform 0.15s ease",
                    }}
                  >
                    {/* Card Header: Category pill + Match tag */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ background: "#eaf3e6", color: "#2b5735", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", border: "1px solid #c9dec3" }}>
                          {opp.category}
                        </span>
                        {opp.workMode && (
                          <span style={{ background: "#fbf5e6", color: "#73592c", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
                            {opp.workMode}
                          </span>
                        )}
                      </div>

                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "999px",
                          background: opp.matchBadgeColor === "coral" ? "#fdeee9" : "#e6f4ea",
                          color: opp.matchBadgeColor === "coral" ? "#bf4941" : "#1e6b37",
                          border: `1px solid ${opp.matchBadgeColor === "coral" ? "#f2aba5" : "#91cf9e"}`,
                        }}
                      >
                        ✦ {opp.matchLabel}
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <div>
                      <h3 style={{ margin: "2px 0 2px", fontFamily: "Fredoka, sans-serif", fontSize: "17.5px", color: "#223f35" }}>
                        {opp.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: "13px", color: "#557262", fontWeight: 600 }}>
                        {opp.organization} {opp.location ? `• ${opp.location}` : ""}
                      </p>
                    </div>

                    {/* Meta Row: Duration & Stipend */}
                    <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#617367", fontWeight: 600 }}>
                      {opp.duration && <span>⏱ {opp.duration}</span>}
                      {opp.stipend && <span>✦ {opp.stipend}</span>}
                    </div>

                    {/* Eligibility Line */}
                    <div
                      style={{
                        background: "#f6faf3",
                        border: "1px solid #cce5c7",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "12px",
                        color: "#2e5938",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: 600,
                      }}
                    >
                      <span>{hasEnteredData && opp.isEligible ? "✅" : "📋"}</span>
                      <span>
                        {hasEnteredData
                          ? opp.isEligible
                            ? "You meet degree & prerequisite eligibility criteria"
                            : `Eligible with skill gap (${opp.missingSkills.length} skill to learn)`
                          : `Eligibility: ${opp.eligibilityCriteria || "Open to all enrolled students"}`}
                      </span>
                    </div>

                    {/* Skills match row */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "2px" }}>
                      {opp.matchedSkills.map((sk) => (
                        <span
                          key={sk}
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: "6px",
                            background: "#eaf5e7",
                            color: "#2b5c35",
                            border: "1px solid #b7dab2",
                          }}
                        >
                          ✓ {sk}
                        </span>
                      ))}

                      {hasEnteredData &&
                        opp.missingSkills.slice(0, 2).map((sk) => (
                          <span
                            key={sk}
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "2px 7px",
                              borderRadius: "6px",
                              background: "#fff4e5",
                              color: "#9c5c16",
                              border: "1px solid #eed6aa",
                            }}
                          >
                            + {sk} (Needed)
                          </span>
                        ))}

                      {!hasEnteredData &&
                        opp.skills.slice(0, 4).map((sk) => (
                          <span
                            key={sk}
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "2px 7px",
                              borderRadius: "6px",
                              background: "#fbf8f1",
                              color: "#4f7a43",
                              border: "1px solid #ded5c2",
                            }}
                          >
                            {sk}
                          </span>
                        ))}
                    </div>

                    {/* View Details Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedOpp(opp)}
                      style={{
                        alignSelf: "flex-end",
                        background: "#396645",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "999px",
                        padding: "7px 16px",
                        fontFamily: "Nunito, sans-serif",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        marginTop: "4px",
                        boxShadow: "0 2px 8px rgba(45, 80, 60, 0.15)",
                      }}
                    >
                      View Details & Apply →
                    </button>
                  </div>
                ))
              )}
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
          </div>
        </div>
      </div>

      {/* Nested Opportunity Details Modal */}
      {selectedOpp && (
        <OpportunityModal
          opportunity={selectedOpp}
          isOpen={Boolean(selectedOpp)}
          onClose={() => setSelectedOpp(null)}
        />
      )}
    </>
  );
}
