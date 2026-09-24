export default function AssessmentIntro({ onStart, onBackToHome }) {
  return (
    <div className="assessment-card-panel assessment-welcome-panel">
      {/* Top Tag & Mascot Accent */}
      <div className="assessment-card-header-tag">
        <span className="assessment-card-tag-pill">CHECK-IN</span>
        <span className="assessment-card-icon">🌱</span>
      </div>

      <div className="assessment-welcome-body">
        <span className="sj-eyebrow">LOW-PRESSURE SKILL CHECK-IN</span>
        <h1 className="assessment-welcome-title">Quick Skill Assessment</h1>
        <p className="assessment-welcome-text">
          Discover where your skills stand and what you could develop next.
          A calm, guided 12-question check-in to help you understand your strengths and align with real opportunities.
        </p>

        {/* Info Row: ⏱ 5–10 min, 📝 12 questions, 🌱 Personalized results */}
        <div className="assessment-info-row">
          <div className="assessment-info-chip">
            <span className="info-chip-icon">⏱</span>
            <div className="info-chip-text">
              <span className="info-chip-title">5–10 min</span>
              <span className="info-chip-sub">Self-paced, no timer</span>
            </div>
          </div>

          <div className="assessment-info-chip">
            <span className="info-chip-icon">📝</span>
            <div className="info-chip-text">
              <span className="info-chip-title">12 questions</span>
              <span className="info-chip-sub">Knowledge & confidence</span>
            </div>
          </div>

          <div className="assessment-info-chip">
            <span className="info-chip-icon">🌱</span>
            <div className="info-chip-text">
              <span className="info-chip-title">Personalized results</span>
              <span className="info-chip-sub">Qualitative skill tiers</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="assessment-actions-row">
          {onBackToHome && (
            <button
              type="button"
              className="assessment-text-btn"
              onClick={onBackToHome}
            >
              ← Back to Home
            </button>
          )}

          <button
            type="button"
            className="assessment-primary-btn"
            onClick={onStart}
          >
            Start Assessment <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
