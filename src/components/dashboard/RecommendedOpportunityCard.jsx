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

  const isShortDuration = duration && duration !== "Not specified" && duration.length < 35;
  const isShortStipend = stipend && stipend !== "Not specified" && stipend.length < 35;

  return (
    <article className="recommended-card">
      {/* Top Badges */}
      <div className="recommended-card-top">
        <div className="recommended-badges">
          <span className="badge-category">{category}</span>
          {displayMode && displayMode !== "Not specified" && (
            <span className="badge-workmode">{displayMode}</span>
          )}
        </div>

        {displayBadge && (
          <span
            className="badge-featured"
            style={{
              background: matchLabel ? "#eaf5e7" : "#fdf0ea",
              color: matchLabel ? "#2b5735" : "#9e462d",
              border: matchLabel ? "1px solid #b7dab2" : "none",
              fontWeight: 800,
            }}
          >
            ✦ {displayBadge}
          </span>
        )}
      </div>

      {/* Main Info */}
      <div className="recommended-card-body">
        <h3 className="recommended-card-title">{title}</h3>
        <p className="recommended-card-org">
          {displayOrg} {location && location !== "Not specified" ? `• ${location}` : ""}
        </p>

        {/* Quick Meta Row - only for short values */}
        {(isShortDuration || isShortStipend) && (
          <div className="recommended-meta-row">
            {isShortDuration && (
              <span className="recommended-meta-item">
                <span className="meta-icon">⏱</span> {duration}
              </span>
            )}
            {isShortStipend && (
              <span className="recommended-meta-item">
                <span className="meta-icon">✦</span> {stipend}
              </span>
            )}
          </div>
        )}

        {description && (
          <p
            className="recommended-card-desc"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </p>
        )}

        {/* Skill tags with matched highlights */}
        {skills && skills.length > 0 && (
          <div className="recommended-skills-wrap">
            {skills.slice(0, 4).map((skill) => {
              const isMatched = (opportunity.matchedSkills || []).some(
                (m) =>
                  m.toLowerCase().trim() === skill.toLowerCase().trim() ||
                  skill.toLowerCase().includes(m.toLowerCase().trim()) ||
                  m.toLowerCase().trim().includes(skill.toLowerCase().trim())
              );
              return (
                <span
                  key={skill}
                  className={`recommended-skill-pill ${isMatched ? "is-matched" : ""}`}
                  style={
                    isMatched
                      ? {
                          background: "#e8f5e5",
                          color: "#24542d",
                          borderColor: "#a6dca1",
                          fontWeight: 700,
                        }
                      : {}
                  }
                  title={isMatched ? "Matched from your profile or resume!" : skill}
                >
                  {isMatched && <span style={{ marginRight: "3px" }}>✓</span>}
                  {skill}
                </span>
              );
            })}
            {skills.length > 4 && (
              <span className="recommended-skill-more">
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Qualitative Match Reason Note */}
        {opportunity.matchReason && (
          <div
            style={{
              fontSize: "11px",
              color: "#396645",
              fontWeight: 600,
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>🌱</span> {opportunity.matchReason}
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
