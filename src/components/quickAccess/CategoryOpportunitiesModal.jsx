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

function hasValue(val) {
  if (!val) return false;
  if (typeof val === "string") {
    const trimmed = val.trim();
    return trimmed !== "" && trimmed.toLowerCase() !== "not specified";
  }
  return true;
}

export default function CategoryOpportunitiesModal({
  isOpen,
  category,
  onClose,
}) {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [expandedOppId, setExpandedOppId] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Reset expanded card when modal opens/closes or category switches
  useEffect(() => {
    setExpandedOppId(null);
  }, [category, isOpen]);

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
                  Browse all available {category.toLowerCase()} opportunities.
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
                  Showing all listings in <strong>{category}</strong> ({opportunities.length} available)
                </span>
              </div>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div style={{ textAlign: "center", padding: "18px 0", color: "#60725c", fontSize: "13.5px" }}>
                <span>🌱 Loading {category.toLowerCase()} from directory...</span>
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
                  Check back soon for new {category.toLowerCase()} listings.
                </p>
              </div>
            )}

            {/* Opportunities List - Clean Compact Cards */}
            {!isLoading && !errorMessage && opportunities.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {opportunities.map((opp) => {
                  const displayOrg = opp.organization || opp.organizer || "";
                  const displayMode = opp.workMode || opp.mode || "";
                  const displayDomains = Array.isArray(opp.domains) && opp.domains.length > 0
                    ? opp.domains
                    : opp.domain
                    ? [opp.domain]
                    : [];

                  const oppKey = opp.id || opp._id;
                  const isExpanded = expandedOppId === oppKey;
                  const displayEligibility = opp.eligibility || opp.eligibilityCriteria || "";

                  const hasValidUrl =
                    Boolean(opp.applicationUrl) &&
                    typeof opp.applicationUrl === "string" &&
                    opp.applicationUrl.trim() !== "#" &&
                    (opp.applicationUrl.trim().startsWith("http://") || opp.applicationUrl.trim().startsWith("https://"));

                  let displayPrize = "";
                  if (opp.prize) {
                    if (typeof opp.prize === "string") displayPrize = opp.prize;
                    else if (typeof opp.prize === "object") displayPrize = opp.prize.total || opp.prize.first || opp.prize.label || "";
                  }
                  const rewardVal = displayPrize || opp.stipend;
                  const rewardLabel = opp.category === "Hackathons" || opp.category === "Competitions" ? "Prize" : "Stipend";

                  const metaItems = [];
                  if (hasValue(opp.duration)) metaItems.push({ label: "Duration", value: opp.duration, icon: "⏱" });
                  if (hasValue(rewardVal)) metaItems.push({ label: rewardLabel, value: rewardVal, icon: opp.category === "Hackathons" || opp.category === "Competitions" ? "🏆" : "✦" });
                  if (hasValue(opp.fee)) metaItems.push({ label: "Fee", value: opp.fee, icon: "🏷" });
                  if (hasValue(displayMode)) metaItems.push({ label: "Work Mode", value: displayMode, icon: "📍" });
                  if (hasValue(opp.location)) metaItems.push({ label: "Location", value: opp.location, icon: "🌐" });
                  if (hasValue(opp.platform || opp.source)) metaItems.push({ label: "Platform", value: opp.platform || opp.source, icon: "🔗" });

                  return (
                    <div
                      key={oppKey}
                      style={{
                        background: "#ffffff",
                        border: isExpanded ? "1.5px solid #2d5a37" : "1.5px solid #ded5c2",
                        borderRadius: "16px",
                        padding: "16px 18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        boxShadow: isExpanded
                          ? "0 6px 20px rgba(45, 80, 60, 0.08)"
                          : "0 3px 10px rgba(45, 80, 60, 0.04)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {/* Card Header: Category pill + Work Mode + Domain + Deadline */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ background: "#eaf3e6", color: "#2b5735", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", border: "1px solid #c9dec3" }}>
                            {opp.category}
                          </span>
                          {hasValue(displayMode) && (
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

                        {hasValue(opp.deadline) && (
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
                            📅 Deadline: {opp.deadline}
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
                            {displayOrg} {hasValue(opp.location) ? `• ${opp.location}` : ""}
                          </p>
                        )}
                      </div>

                      {/* Compact Skills List (top 4 skills) */}
                      {Array.isArray(opp.skills) && opp.skills.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "2px" }}>
                          {opp.skills.slice(0, 4).map((sk) => (
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

                      {/* Action Row: Apply Now & View Details / Hide Details */}
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
                              transition: "all 0.15s ease",
                            }}
                          >
                            Apply Now ↗
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setExpandedOppId(isExpanded ? null : oppKey)}
                          style={{
                            background: isExpanded ? "#f4eee4" : "#396645",
                            color: isExpanded ? "#475949" : "#ffffff",
                            border: isExpanded ? "1.5px solid #ded5c2" : "none",
                            borderRadius: "999px",
                            padding: "7px 16px",
                            fontFamily: "Nunito, sans-serif",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: isExpanded ? "none" : "0 2px 8px rgba(45, 80, 60, 0.15)",
                            transition: "all 0.15s ease",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {isExpanded ? "Hide Details ▲" : "View Details ▼"}
                        </button>
                      </div>

                      {/* Expandable Details Section Right Below the Card */}
                      {isExpanded && (
                        <div
                          style={{
                            marginTop: "8px",
                            paddingTop: "14px",
                            borderTop: "1.5px dashed #dcd3bf",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            background: "#faf8f2",
                            borderRadius: "12px",
                            padding: "16px",
                            animation: "fadeIn 0.2s ease-in-out",
                          }}
                        >
                          {/* Key Meta Badges Grid */}
                          {metaItems.length > 0 && (
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                                gap: "8px",
                              }}
                            >
                              {metaItems.map((item) => (
                                <div
                                  key={item.label}
                                  style={{
                                    background: "#ffffff",
                                    border: "1px solid #e5dcce",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                  }}
                                >
                                  <div style={{ fontSize: "11px", color: "#7a8a77", fontWeight: 700, textTransform: "uppercase" }}>
                                    {item.icon} {item.label}
                                  </div>
                                  <div style={{ fontSize: "12.5px", color: "#223f35", fontWeight: 700, marginTop: "2px" }}>
                                    {item.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Description / About */}
                          {hasValue(opp.description) && (
                            <div>
                              <h4 style={{ margin: "0 0 4px", fontSize: "12.5px", fontWeight: 800, color: "#2d4d38", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                About this opportunity
                              </h4>
                              <p style={{ margin: 0, fontSize: "13.5px", color: "#475949", lineHeight: "1.55" }}>
                                {opp.description}
                              </p>
                            </div>
                          )}

                          {/* Key Responsibilities */}
                          {Array.isArray(opp.responsibilities) && opp.responsibilities.length > 0 && (
                            <div>
                              <h4 style={{ margin: "0 0 6px", fontSize: "12.5px", fontWeight: 800, color: "#2d4d38", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                Key Responsibilities
                              </h4>
                              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475949", lineHeight: "1.5" }}>
                                {opp.responsibilities.map((resp, i) => (
                                  <li key={i} style={{ marginBottom: "3px" }}>{resp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Eligibility */}
                          {hasValue(displayEligibility) && (
                            <div
                              style={{
                                background: "#edf5ea",
                                border: "1px solid #c3dec0",
                                borderRadius: "10px",
                                padding: "10px 14px",
                              }}
                            >
                              <span style={{ fontSize: "12px", fontWeight: 800, color: "#265430", display: "block", marginBottom: "2px" }}>
                                📋 Eligibility Criteria:
                              </span>
                              <span style={{ fontSize: "13px", color: "#2d5736", lineHeight: "1.45" }}>
                                {displayEligibility}
                              </span>
                            </div>
                          )}

                          {/* Full Skills Required */}
                          {Array.isArray(opp.skills) && opp.skills.length > 0 && (
                            <div>
                              <h4 style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 800, color: "#2d4d38", textTransform: "uppercase" }}>
                                Skills Required
                              </h4>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                {opp.skills.map((sk) => (
                                  <span
                                    key={sk}
                                    style={{
                                      fontSize: "11.5px",
                                      fontWeight: 700,
                                      padding: "3px 8px",
                                      borderRadius: "6px",
                                      background: "#ffffff",
                                      color: "#396645",
                                      border: "1px solid #c9dec3",
                                    }}
                                  >
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Domains and Roles */}
                          {(displayDomains.length > 0 || (Array.isArray(opp.roles) && opp.roles.length > 0)) && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                              {displayDomains.length > 0 && (
                                <div>
                                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#6a7c68", display: "block", marginBottom: "4px" }}>
                                    DOMAINS
                                  </span>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                    {displayDomains.map((dom) => (
                                      <span
                                        key={dom}
                                        style={{
                                          fontSize: "11px",
                                          fontWeight: 700,
                                          padding: "2px 8px",
                                          borderRadius: "6px",
                                          background: "#edf3f8",
                                          color: "#294d6c",
                                          border: "1px solid #c8d9e6",
                                        }}
                                      >
                                        ✦ {dom}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {Array.isArray(opp.roles) && opp.roles.length > 0 && (
                                <div>
                                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#6a7c68", display: "block", marginBottom: "4px" }}>
                                    ROLES
                                  </span>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                    {opp.roles.map((r) => (
                                      <span
                                        key={r}
                                        style={{
                                          fontSize: "11px",
                                          fontWeight: 700,
                                          padding: "2px 8px",
                                          borderRadius: "6px",
                                          background: "#fbf3e6",
                                          color: "#745422",
                                          border: "1px solid #e7d5b8",
                                        }}
                                      >
                                        👤 {r}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Bottom Actions inside expanded section */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginTop: "6px",
                              paddingTop: "10px",
                              borderTop: "1px solid #ebd9b7",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedOppId(null)}
                              style={{
                                background: "#ffffff",
                                color: "#6b7d69",
                                border: "1px solid #c6d6c3",
                                borderRadius: "999px",
                                padding: "6px 14px",
                                fontFamily: "Nunito, sans-serif",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              ▲ Hide Details
                            </button>

                            {hasValidUrl && (
                              <button
                                type="button"
                                onClick={() => window.open(opp.applicationUrl.trim(), "_blank", "noopener,noreferrer")}
                                style={{
                                  background: "#396645",
                                  color: "#ffffff",
                                  border: "none",
                                  borderRadius: "999px",
                                  padding: "7px 18px",
                                  fontFamily: "Nunito, sans-serif",
                                  fontSize: "12.5px",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  boxShadow: "0 2px 8px rgba(45, 80, 60, 0.2)",
                                }}
                              >
                                Apply on Official Website ↗
                              </button>
                            )}
                          </div>
                        </div>
                      )}
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

      {/* Universal Opportunity Details Modal - Displays All Detailed Fields */}
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
