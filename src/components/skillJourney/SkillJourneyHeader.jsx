export default function SkillJourneyHeader({
  activeTab,
  onTabChange,
  onBackToHome,
  onBackToDashboard,
  eyebrow = "YOUR SKILL JOURNEY",
  title,
  subtitle,
}) {
  const tabs = [
    { id: "skills", label: "Your Skills", icon: "🌿" },
    { id: "matching", label: "Matching", icon: "🎯" },
    { id: "gaps", label: "Skill Gaps", icon: "💡" },
    { id: "growth", label: "Growth", icon: "🌱" },
  ];

  return (
    <header className="sj-header">
      {/* Top Navbar Row */}
      <div className="sj-top-bar">
        <div
          className="sj-brand"
          onClick={onBackToHome}
          role="button"
          tabIndex={0}
        >
          <span className="sj-brand-icon">🌿</span>
          <span className="sj-brand-name">OppurtuNest</span>
        </div>

        <div className="sj-nav-actions">
          {onBackToDashboard && (
            <button
              type="button"
              className="sj-dash-pill-btn"
              onClick={onBackToDashboard}
            >
              Dashboard
            </button>
          )}

          {onBackToHome && (
            <button
              type="button"
              className="sj-back-btn"
              onClick={onBackToHome}
            >
              ← Back to Home
            </button>
          )}
        </div>
      </div>

      {/* Intro Greeting Block */}
      <div className="sj-intro">
        <span className="sj-eyebrow">{eyebrow}</span>
        <h1 className="sj-title">{title}</h1>
        {subtitle && <p className="sj-subtitle">{subtitle}</p>}
      </div>

      {/* 4 Interactive Section Tabs */}
      <nav className="sj-tabs-bar" aria-label="Skill Journey Navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`sj-tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange && onTabChange(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
