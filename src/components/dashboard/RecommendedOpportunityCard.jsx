export default function RecommendedOpportunityCard({ opportunity, onSelectOpportunity }) {
  const {
    title,
    category,
    organization,
    organizer,
    location,
    workMode,
    mode,
    duration,
    stipend,
    skills = [],
    description,
    featuredBadge,
    matchLabel,
  } = opportunity;

  const displayOrg = organization || organizer || "";
  const displayMode = workMode || mode || "";
  const displayBadge = matchLabel || featuredBadge;

  return (
    <article className="recommended-card">
      {/* Top Badges */}
      <div className="recommended-card-top">
        <div className="recommended-badges">
          <span className="badge-category">{category}</span>
          {displayMode && <span className="badge-workmode">{displayMode}</span>}
        </div>

        {displayBadge && (
          <span className="badge-featured" style={{ background: matchLabel ? "#eaf5e7" : "#fdf0ea", color: matchLabel ? "#2b5735" : "#9e462d", border: matchLabel ? "1px solid #b7dab2" : "none", fontWeight: 800 }}>
            ✦ {displayBadge}
          </span>
        )}
      </div>

      {/* Main Info */}
      <div className="recommended-card-body">
        <h3 className="recommended-card-title">{title}</h3>
        <p className="recommended-card-org">
          {displayOrg} {location ? `• ${location}` : ""}
        </p>

        {/* Quick Meta Row */}
        <div className="recommended-meta-row">
          {duration && (
            <span className="recommended-meta-item">
              <span className="meta-icon">⏱</span> {duration}
            </span>
          )}
          {stipend && (
            <span className="recommended-meta-item">
              <span className="meta-icon">✦</span> {stipend}
            </span>
          )}
        </div>

        <p className="recommended-card-desc">{description}</p>

        {/* Skill tags */}
        {skills && skills.length > 0 && (
          <div className="recommended-skills-wrap">
            {skills.slice(0, 3).map((skill) => (
              <span key={skill} className="recommended-skill-pill">
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="recommended-skill-more">
                +{skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="recommended-card-footer">
        <button
          type="button"
          className="recommended-apply-btn"
          onClick={() => {
            if (onSelectOpportunity) {
              onSelectOpportunity(opportunity);
            }
          }}
        >
          View Opportunity <span>→</span>
        </button>
      </div>
    </article>
  );
}
