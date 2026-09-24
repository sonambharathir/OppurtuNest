
export default function RecommendedOpportunityCard({ opportunity }) {
  const {
    title,
    category,
    organization,
    location,
    workMode,
    duration,
    stipend,
    skills = [],
    description,
    featuredBadge,
  } = opportunity;

  return (
    <article className="recommended-card">
      {/* Top Badges */}
      <div className="recommended-card-top">
        <div className="recommended-badges">
          <span className="badge-category">{category}</span>
          {workMode && <span className="badge-workmode">{workMode}</span>}
        </div>

        {featuredBadge && (
          <span className="badge-featured">{featuredBadge}</span>
        )}
      </div>

      {/* Main Info */}
      <div className="recommended-card-body">
        <h3 className="recommended-card-title">{title}</h3>
        <p className="recommended-card-org">
          {organization} {location ? `• ${location}` : ""}
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
            alert(`Opening opportunity: "${title}" at ${organization}`);
          }}
        >
          View Opportunity <span>→</span>
        </button>
      </div>
    </article>
  );
}
