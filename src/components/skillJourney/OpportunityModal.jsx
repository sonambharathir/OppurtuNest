import { useEffect } from "react";

export default function OpportunityModal({ opportunity, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !opportunity) return null;

  const {
    title,
    organization,
    category,
    workMode,
    location,
    duration,
    stipend,
    matchLabel,
    matchBadgeColor = "mint",
    description,
    matchedSkills = [],
    bonusSkills = [],
  } = opportunity;

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
        <div className="modal-header">
          <div className="opp-modal-top-tags">
            <span className="matching-cat-pill">{category}</span>
            {workMode && <span className="matching-cat-pill">{workMode}</span>}
            <span className={`match-quality-badge badge-${matchBadgeColor}`}>
              ✦ {matchLabel}
            </span>
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

        <div className="opp-modal-body">
          <h2 className="opp-modal-title">{title}</h2>
          <p className="opp-modal-org">
            {organization} • {location}
          </p>

          <div className="opp-modal-meta-grid">
            <div className="opp-meta-card">
              <span className="opp-meta-key">Duration</span>
              <span className="opp-meta-val">{duration || "Flexible"}</span>
            </div>
            <div className="opp-meta-card">
              <span className="opp-meta-key">Compensation</span>
              <span className="opp-meta-val">{stipend || "Competitive"}</span>
            </div>
            <div className="opp-meta-card">
              <span className="opp-meta-key">Work Mode</span>
              <span className="opp-meta-val">{workMode || "On-site"}</span>
            </div>
          </div>

          <div className="opp-modal-section">
            <h4 className="opp-section-heading">About This Opportunity</h4>
            <p className="opp-section-text">{description}</p>
          </div>

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

          {bonusSkills.length > 0 && (
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
        </div>

        <div className="opp-modal-footer">
          <button
            type="button"
            className="modal-cancel-btn"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="matching-cta-btn"
            onClick={() => {
              alert(`Application started for ${title} at ${organization}! 🌱`);
              onClose();
            }}
          >
            Apply with My Skill Profile <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
