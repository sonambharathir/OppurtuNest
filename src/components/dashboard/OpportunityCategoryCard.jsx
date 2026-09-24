import { CategoryIcon } from "./DashboardIcons";

export default function OpportunityCategoryCard({ category, onSelect }) {
  const { number, label, title, description, id, badge } = category;

  return (
    <article
      className={`dash-cat-card dash-cat-${id}`}
      onClick={() => onSelect && onSelect(category)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onSelect) onSelect(category);
        }
      }}
    >
      {/* Top Header of Card: Number Tag + Icon */}
      <div className="cat-card-header">
        <div className="cat-card-tag">
          <span className="cat-tag-number">{number}</span>
          <span className="cat-tag-label">{label}</span>
        </div>

        <div className="cat-card-icon-wrap">
          <CategoryIcon type={id} size={30} />
        </div>
      </div>

      {/* Main Content */}
      <div className="cat-card-content">
        <h3 className="cat-card-title">{title}</h3>
        <p className="cat-card-desc">{description}</p>
      </div>

      {/* Footer / Action */}
      <div className="cat-card-footer">
        <button type="button" className="cat-card-action">
          Explore <span>→</span>
        </button>
        {badge && <span className="cat-card-badge">{badge}</span>}
      </div>
    </article>
  );
}
