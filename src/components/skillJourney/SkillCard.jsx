export default function SkillCard({ skill, onRemove }) {
  const { id, name, category, level, confidence, verified } = skill;

  const levelClass =
    level?.toLowerCase() === "beginner"
      ? "level-beginner"
      : level?.toLowerCase() === "advanced"
      ? "level-advanced"
      : "level-intermediate";

  return (
    <article className="skill-card">
      <div className="skill-card-top">
        <h3 className="skill-card-name">{name}</h3>
        <span className={`skill-level-badge ${levelClass}`}>
          {level || "Practicing"}
        </span>
      </div>

      <div className="skill-card-bottom">
        <div className="skill-meta-info">
          <span>{category || "Skill"}</span>
          {confidence && <span> • {confidence}</span>}
          {verified && <span title="Profile Verified"> • ✓</span>}
        </div>

        {onRemove && (
          <button
            type="button"
            className="skill-remove-btn"
            onClick={() => onRemove(id)}
            title={`Remove ${name}`}
            aria-label={`Remove ${name}`}
          >
            ×
          </button>
        )}
      </div>
    </article>
  );
}
