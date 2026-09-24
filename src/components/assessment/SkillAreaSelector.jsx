import { assessmentSkillAreas } from "../../data/assessmentQuestions";

export default function SkillAreaSelector({
  selectedAreaId,
  onSelectArea,
  onContinue,
  onBack,
}) {
  return (
    <div className="assessment-card-panel">
      <div className="assessment-card-header-tag">
        <span className="assessment-card-tag-pill">STEP 1 OF 2</span>
        <span className="assessment-card-icon">🎯</span>
      </div>

      <div className="area-selector-header">
        <span className="sj-eyebrow">CHOOSE YOUR FOCUS</span>
        <h2 className="assessment-section-title">What would you like to assess?</h2>
        <p className="assessment-section-sub">
          Select one skill area for your 12-question check-in. Your results will highlight current strengths and tailored growth paths.
        </p>
      </div>

      {/* 5 Compact Selectable Cards */}
      <div className="skill-area-cards-grid">
        {assessmentSkillAreas.map((area) => {
          const isSelected = selectedAreaId === area.id;

          return (
            <article
              key={area.id}
              className={`skill-area-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectArea(area.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectArea(area.id);
                }
              }}
            >
              <div className="area-card-top">
                <span className="area-number-pill">
                  {area.number} {area.tag}
                </span>
                <span className="area-card-icon">{area.icon}</span>
              </div>

              <div className="area-card-content">
                <h3 className="area-card-title">{area.title}</h3>
                <p className="area-card-subtitle">{area.subtitle}</p>
                <div className="area-subskills-pills">
                  {area.subSkills.map((sk) => (
                    <span key={sk} className="area-subskill-tag">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="area-card-radio-indicator">
                <span className={`custom-radio-dot ${isSelected ? "checked" : ""}`} />
                <span className="radio-label-text">
                  {isSelected ? "Selected" : "Select this area"}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="assessment-nav-row">
        <button
          type="button"
          className="assessment-secondary-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <button
          type="button"
          className="assessment-primary-btn"
          onClick={onContinue}
          disabled={!selectedAreaId}
        >
          Continue to Questions <span>→</span>
        </button>
      </div>
    </div>
  );
}
