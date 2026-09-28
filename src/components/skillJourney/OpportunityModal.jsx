import { useEffect, useState } from "react";
import { getOpportunityById } from "../../utils/api";

export default function OpportunityModal({ opportunity, isOpen, onClose }) {
  const [detailedOpp, setDetailedOpp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Fetch full opportunity details from GET /api/opportunities/:id when opened
  useEffect(() => {
    let isMounted = true;
    if (!isOpen || !opportunity) {
      setDetailedOpp(null);
      return;
    }

    const oppId = opportunity.id || opportunity._id;
    if (oppId) {
      setIsLoading(true);
      getOpportunityById(oppId)
        .then((data) => {
          if (isMounted && data) {
            // Merge recommendation-specific metadata (matchLabel, matchedSkills) if present on initial opportunity
            setDetailedOpp({
              ...opportunity,
              ...data,
              matchedSkills: opportunity.matchedSkills || data.matchedSkills || [],
              bonusSkills: opportunity.bonusSkills || data.bonusSkills || [],
              matchLabel: opportunity.matchLabel || data.matchLabel,
              matchBadgeColor: opportunity.matchBadgeColor || data.matchBadgeColor,
            });
          } else if (isMounted) {
            setDetailedOpp(opportunity);
          }
        })
        .catch(() => {
          if (isMounted) {
            setDetailedOpp(opportunity);
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    } else {
      setDetailedOpp(opportunity);
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, opportunity]);

  if (!isOpen || !opportunity) return null;

  const current = detailedOpp || opportunity;

  const {
    title,
    organization,
    organizer,
    category,
    workMode,
    mode,
    location,
    duration,
    stipend,
    deadline,
    eligibility,
    eligibilityCriteria,
    description,
    skills = [],
    domains = [],
    domain,
    roles = [],
    platform,
    fee,
    source,
    prize,
    applicationUrl,
    matchLabel,
    matchBadgeColor = "mint",
    matchedSkills = [],
    bonusSkills = [],
  } = current;

  const displayOrg = organization || organizer || "";
  const displayMode = workMode || mode || "";
  const displayEligibility = eligibility || eligibilityCriteria || "";

  // Normalize prize if it is an object
  let displayPrize = "";
  if (prize) {
    if (typeof prize === "string") {
      displayPrize = prize;
    } else if (typeof prize === "object") {
      displayPrize = prize.total || prize.first || (prize.amount ? `₹${prize.amount}` : "");
    }
  }

  // Normalize domains list
  const displayDomains = Array.isArray(domains) && domains.length > 0
    ? domains
    : domain
    ? [domain]
    : [];

  // Check valid applicationUrl
  const hasValidUrl =
    Boolean(applicationUrl) &&
    typeof applicationUrl === "string" &&
    applicationUrl.trim() !== "#" &&
    (applicationUrl.trim().startsWith("http://") || applicationUrl.trim().startsWith("https://"));

  const handleApplyClick = () => {
    if (hasValidUrl) {
      window.open(applicationUrl.trim(), "_blank", "noopener,noreferrer");
    }
  };

  // Build meta items, strictly displaying fields that contain data
  const metaCards = [];
  if (displayMode) {
    metaCards.push({ key: "Work Mode", val: displayMode });
  }
  if (location) {
    metaCards.push({ key: "Location", val: location });
  }
  if (deadline) {
    metaCards.push({ key: "Deadline", val: deadline });
  }
  if (duration) {
    metaCards.push({ key: "Duration", val: duration });
  }
  if (stipend) {
    metaCards.push({ key: "Stipend", val: stipend });
  }
  if (fee) {
    metaCards.push({ key: "Fee", val: fee });
  }
  if (displayPrize) {
    metaCards.push({ key: "Prize", val: displayPrize });
  }
  if (platform) {
    metaCards.push({ key: "Platform", val: platform });
  }
  if (source && source !== platform) {
    metaCards.push({ key: "Source", val: source });
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="opportunity-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="opp-modal-top-tags">
            {category && <span className="matching-cat-pill">{category}</span>}
            {displayMode && <span className="matching-cat-pill">{displayMode}</span>}
            {matchLabel && (
              <span className={`match-quality-badge badge-${matchBadgeColor}`}>
                ✦ {matchLabel}
              </span>
            )}
            {deadline && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#7a5e2d",
                  background: "#fbf5e6",
                  border: "1px solid #eedec0",
                  padding: "3px 8px",
                  borderRadius: "999px",
                }}
              >
                📅 {deadline}
              </span>
            )}
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="opp-modal-body">
          {isLoading && (
            <div style={{ fontSize: "12px", color: "#60725c", marginBottom: "8px" }}>
              🌱 Fetching live opportunity details...
            </div>
          )}

          <h2 className="opp-modal-title">{title}</h2>
          {(displayOrg || location) && (
            <p className="opp-modal-org">
              {displayOrg} {location ? `• ${location}` : ""}
            </p>
          )}

          {/* Meta Grid: Render only fields with data */}
          {metaCards.length > 0 && (
            <div className="opp-modal-meta-grid">
              {metaCards.map((item) => (
                <div key={item.key} className="opp-meta-card">
                  <span className="opp-meta-key">{item.key}</span>
                  <span className="opp-meta-val">{item.val}</span>
                </div>
              ))}
            </div>
          )}

          {/* About Section */}
          {description && (
            <div className="opp-modal-section">
              <h4 className="opp-section-heading">About This Opportunity</h4>
              <p className="opp-section-text">{description}</p>
            </div>
          )}

          {/* Eligibility Section */}
          {displayEligibility && (
            <div className="opp-modal-section">
              <h4 className="opp-section-heading">Eligibility Criteria</h4>
              <div
                style={{
                  background: "#f6faf3",
                  border: "1px solid #cce5c7",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "13.5px",
                  color: "#284f32",
                  lineHeight: "1.5",
                  fontWeight: 600,
                }}
              >
                {displayEligibility}
              </div>
            </div>
          )}

          {/* Matched Skills (Personalized) */}
          {matchedSkills && matchedSkills.length > 0 && (
            <div className="opp-modal-section">
              <h4 className="opp-section-heading">Skills You Match</h4>
              <div className="matched-skills-pills">
                {matchedSkills.map((sk) => (
                  <span key={sk} className="skill-match-pill">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bonus Skills (Personalized) */}
          {bonusSkills && bonusSkills.length > 0 && (
            <div className="opp-modal-section">
              <h4 className="opp-section-heading">Bonus Skills That Elevate Your Application</h4>
              <div className="matched-skills-pills">
                {bonusSkills.map((bsk) => (
                  <span key={bsk} className="skill-bonus-pill">
                    + {bsk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* General Skills */}
          {skills && skills.length > 0 && (
            <div className="opp-modal-section">
              <h4 className="opp-section-heading">Required & Relevant Skills</h4>
              <div className="matched-skills-pills">
                {skills.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      background: "#f7f5ed",
                      color: "#465943",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ded5c2",
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Domains */}
          {displayDomains && displayDomains.length > 0 && (
            <div className="opp-modal-section">
              <h4 className="opp-section-heading">Domains & Fields</h4>
              <div className="matched-skills-pills">
                {displayDomains.map((dom) => (
                  <span
                    key={dom}
                    style={{
                      background: "#f0f5fa",
                      color: "#274868",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "6px",
                      border: "1px solid #c9dbe9",
                    }}
                  >
                    ✦ {dom}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Roles */}
          {roles && roles.length > 0 && (
            <div className="opp-modal-section">
              <h4 className="opp-section-heading">Target Roles</h4>
              <div className="matched-skills-pills">
                {roles.map((role) => (
                  <span
                    key={role}
                    style={{
                      background: "#fdf8ee",
                      color: "#6c5324",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ebd9b7",
                    }}
                  >
                    👤 {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Apply Now action */}
        <div className="opp-modal-footer">
          <button
            type="button"
            className="modal-cancel-btn"
            onClick={onClose}
          >
            Close
          </button>

          {hasValidUrl ? (
            <button
              type="button"
              className="matching-cta-btn"
              onClick={handleApplyClick}
              title={`Opens ${applicationUrl} in a new tab`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#326244",
                color: "#ffffff",
                padding: "8px 22px",
                fontSize: "13.5px",
                fontWeight: 700,
                borderRadius: "999px",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(50, 98, 68, 0.25)",
              }}
            >
              Apply Now <span>↗</span>
            </button>
          ) : (
            <span
              style={{
                background: "#fdf0ea",
                color: "#8a402a",
                border: "1px solid #ecc9be",
                borderRadius: "999px",
                padding: "7px 16px",
                fontSize: "12.5px",
                fontWeight: 700,
              }}
            >
              Application link unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
