import React, { useState, useEffect, useCallback } from "react";
import { getOpportunities } from "../../utils/api";
import OpportunityModal from "../skillJourney/OpportunityModal";

const categoryIcons = {
  Internships: "🌿",
  Hackathons: "⚡",
  Scholarships: "🎓",
  Competitions: "🏆",
  Workshops: "🛠",
  Research: "🔬",
  Certifications: "📜",
};

export default function CategoryOpportunitiesModal({
  isOpen,
  category,
  onClose,
}) {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !selectedOpp) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, selectedOpp]);

  // Fetch real opportunities for this category from GET /api/opportunities?category=...
  const fetchCategoryOpportunities = useCallback(() => {
    if (!category) return;

    setIsLoading(true);
    setErrorMessage(null);

    getOpportunities({ category })
      .then((data) => {
        if (Array.isArray(data)) {
          setOpportunities(data);
        } else {
          setOpportunities([]);
        }
      })
      .catch((err) => {
        console.error(`[CategoryModal] Failed to fetch ${category}:`, err.message);
        setErrorMessage("Unable to load opportunities right now.");
        setOpportunities([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  useEffect(() => {
    if (isOpen && category) {
      fetchCategoryOpportunities();
    }
  }, [isOpen, category, fetchCategoryOpportunities]);

  if (!isOpen || !category) return null;

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
                <h2 className="qa-modal-title">{category}</h2>
                <p className="qa-modal-subtitle">
                  Browse all active {category.toLowerCase()} opportunities.
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
            {/* Category Overview Banner */}
            <div
              style={{
                background: "#f7faf5",
                border: "1.5px solid #d4e5d0",
                borderRadius: "14px",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                fontSize: "13px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2d5438", fontWeight: 600 }}>
                <span>{catIcon}</span>
                <span>
                  Showing verified opportunities in <strong>{category}</strong> ({opportunities.length} available)
                </span>
              </div>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div style={{ textAlign: "center", padding: "18px 0", color: "#60725c", fontSize: "13.5px" }}>
                <span>🌱 Loading verified {category.toLowerCase()} from directory...</span>
              </div>
            )}

            {/* Error State with Retry Button */}
            {!isLoading && errorMessage && (
              <div
                style={{
                  background: "#fffaf7",
                  border: "1.5px solid #f2d5cb",
                  borderRadius: "16px",
                  padding: "36px 24px",
                  textAlign: "center",
                  color: "#8a4537",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>⚠️</div>
                <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", margin: "0 0 6px", color: "#6d3024" }}>
                  Unable to load opportunities right now.
                </h3>
                <p style={{ fontSize: "13.5px", color: "#8a4537", margin: "0 0 16px" }}>
                  We could not reach the opportunity server. Please check your connection and try again.
                </p>
                <button
                  type="button"
                  onClick={fetchCategoryOpportunities}
                  style={{
                    background: "#396645",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "9px 24px",
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(45, 80, 60, 0.2)",
                  }}
                >
                  Retry ↻
                </button>
              </div>
            )}

            {/* Empty Category State */}
            {!isLoading && !errorMessage && opportunities.length === 0 && (
              <div
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #ded5c2",
                  borderRadius: "16px",
                  padding: "40px 24px",
                  textAlign: "center",
                  color: "#6a7c68",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌱</div>
                <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", color: "#2c3d2a", margin: "0 0 6px" }}>
                  No opportunities available right now.
                </h3>
                <p style={{ fontSize: "13.5px", color: "#60725c", margin: 0 }}>
                  Check back soon for new verified {category.toLowerCase()} listings.
                </p>
              </div>
            )}

            {/* Opportunities List */}
            {!isLoading && !errorMessage && opportunities.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {opportunities.map((opp) => {
                  const displayOrg = opp.organization || opp.organizer || "";
                  const displayMode = opp.workMode || opp.mode || "";
                  const displayEligibility = opp.eligibility || opp.eligibilityCriteria || "";
                  const displayDomains = Array.isArray(opp.domains) && opp.domains.length > 0
                    ? opp.domains
                    : opp.domain
                    ? [opp.domain]
                    : [];

                  const hasValidUrl =
                    Boolean(opp.applicationUrl) &&
                    typeof opp.applicationUrl === "string" &&
                    opp.applicationUrl.trim() !== "#" &&
                    (opp.applicationUrl.trim().startsWith("http://") || opp.applicationUrl.trim().startsWith("https://"));

                  return (
                    <div
                      key={opp.id || opp._id}
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
                      {/* Card Header: Category pill + Work Mode + Domain + Deadline */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ background: "#eaf3e6", color: "#2b5735", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", border: "1px solid #c9dec3" }}>
                            {opp.category}
                          </span>
                          {displayMode && (
                            <span style={{ background: "#fbf5e6", color: "#73592c", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
                              {displayMode}
                            </span>
                          )}
                          {displayDomains.length > 0 && (
                            <span style={{ background: "#f0f4f8", color: "#2d4b68", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
                              {displayDomains[0]}
                            </span>
                          )}
                        </div>

                        {opp.deadline && (
                          <span
                            style={{
                              fontSize: "11.5px",
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: "999px",
                              background: "#faf5eb",
                              color: "#7a5928",
                              border: "1px solid #ebd9b7",
                            }}
                          >
                            📅 {opp.deadline}
                          </span>
                        )}
                      </div>

                      {/* Title & Organization */}
                      <div>
                        <h3 style={{ margin: "2px 0 2px", fontFamily: "Fredoka, sans-serif", fontSize: "17.5px", color: "#223f35" }}>
                          {opp.title}
                        </h3>
                        {displayOrg && (
                          <p style={{ margin: 0, fontSize: "13px", color: "#557262", fontWeight: 600 }}>
                            {displayOrg} {opp.location ? `• ${opp.location}` : ""}
                          </p>
                        )}
                      </div>

                      {/* Short Description */}
                      {opp.description && (
                        <p style={{ margin: "2px 0 0", fontSize: "13.5px", color: "#506253", lineHeight: "1.45" }}>
                          {opp.description}
                        </p>
                      )}

                      {/* Quick Meta: Duration, Stipend, Fee */}
                      {(opp.duration || opp.stipend || opp.fee) && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "#617367", fontWeight: 600 }}>
                          {opp.duration && <span>⏱ {opp.duration}</span>}
                          {opp.stipend && <span>✦ {opp.stipend}</span>}
                          {opp.fee && <span>🏷 {opp.fee}</span>}
                        </div>
                      )}

                      {/* Eligibility Box */}
                      {displayEligibility && (
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
                          <span>📋</span>
                          <span>Eligibility: {displayEligibility}</span>
                        </div>
                      )}

                      {/* Skills List */}
                      {Array.isArray(opp.skills) && opp.skills.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "2px" }}>
                          {opp.skills.slice(0, 5).map((sk) => (
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
                      )}

                      {/* Action Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: "10px",
                          marginTop: "6px",
                          paddingTop: "8px",
                          borderTop: "1px solid #f3ede2",
                        }}
                      >
                        {hasValidUrl && (
                          <button
                            type="button"
                            onClick={() => window.open(opp.applicationUrl.trim(), "_blank", "noopener,noreferrer")}
                            title={`Opens ${opp.applicationUrl} in a new tab`}
                            style={{
                              background: "#ffffff",
                              color: "#2e5b3c",
                              border: "1.5px solid #a3c99f",
                              borderRadius: "999px",
                              padding: "6px 14px",
                              fontFamily: "Nunito, sans-serif",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            Apply Now ↗
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedOpp(opp)}
                          style={{
                            background: "#396645",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "999px",
                            padding: "7px 16px",
                            fontFamily: "Nunito, sans-serif",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(45, 80, 60, 0.15)",
                          }}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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

      {/* Nested Universal Opportunity Details Modal */}
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
