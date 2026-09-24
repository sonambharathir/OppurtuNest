export default function SkillOpportunityCard({ opportunity, onView }) {
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
    actionText = "View Opportunity",
  } = opportunity;

  return (
    <article className="matching-card">
      {/* Top Header of Card: Category Pill & Qualitative Match Badge */}
      <div className="matching-card-top">
        <div className="matching-tag-group">
          <span className="matching-cat-pill">{category}</span>
          {workMode && <span className="matching-cat-pill">{workMode}</span>}
        </div>

        <span className={`match-quality-badge badge-${matchBadgeColor}`}>
          ✦ {matchLabel}
        </span>
      </div>

      {/* Main Content */}
      <div className="matching-card-body">
        <h3 className="matching-card-title">{title}</h3>
        <p className="matching-card-org">
          {organization} {location ? `• ${location}` : ""}
        </p>

        {/* Metadata row */}
        <div className="matching-meta-row">
          {duration && <span>⏱ {duration}</span>}
          {stipend && <span>✦ {stipend}</span>}
        </div>

        <p className="matching-card-desc">{description}</p>

        {/* Matched skills checklist */}
        <div className="matched-skills-box">
          <span className="matched-skills-label">Skills you have for this role:</span>
          <div className="matched-skills-pills">
            {matchedSkills.map((sk) => (
              <span key={sk} className="skill-match-pill">
                ✓ {sk}
              </span>
            ))}
            {bonusSkills.map((bsk) => (
              <span key={bsk} className="skill-bonus-pill">
                + {bsk} (helpful)
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="matching-card-footer">
        <button
          type="button"
          className="matching-cta-btn"
          onClick={() => {
            if (onView) {
              onView(opportunity);
            } else {
              alert(`Opening opportunity: "${title}" at ${organization}`);
            }
          }}
        >
          {actionText} <span>→</span>
        </button>
      </div>
    </article>
  );
}
