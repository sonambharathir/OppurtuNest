
export default function DashboardHeader({
  profileData,
  onBackToHome,
  onEditProfile,
  onNavigateSkillJourney,
}) {
  // Use profile information to personalize greeting
  const studentName =
    profileData?.studentName ||
    (profileData?.branch ? `${profileData.branch} Explorer` : "Student");

  const academicDetail = [
    profileData?.degree,
    profileData?.branch,
    profileData?.currentYear ? `Year ${profileData.currentYear}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <header className="dash-header">
      {/* Top Navbar Row */}
      <div className="dash-top-bar">
        <div className="dash-brand" onClick={onBackToHome} role="button" tabIndex={0}>
          <span className="dash-brand-icon">🌿</span>
          <span className="dash-brand-name">OppurtuNest</span>
        </div>

        <div className="dash-nav-actions">
          {onBackToHome && (
            <button
              type="button"
              className="dash-text-link"
              onClick={onBackToHome}
            >
              ← Back to Home
            </button>
          )}

          {onNavigateSkillJourney && (
            <button
              type="button"
              className="sj-dash-pill-btn"
              onClick={() => onNavigateSkillJourney("skills")}
            >
              🌿 Skill Journey
            </button>
          )}

          {onEditProfile && (
            <button
              type="button"
              className="dash-profile-pill-btn"
              onClick={onEditProfile}
            >
              My Profile
            </button>
          )}
        </div>
      </div>

      {/* Intro Greeting Block */}
      <div className="dash-intro">
        <span className="dash-eyebrow">YOUR JOURNEY CONTINUES</span>
        <h1 className="dash-title">
          Welcome back, {studentName} 🌱
        </h1>
        <p className="dash-lead">
          Let's find what's next for you.
        </p>
        <p className="dash-subtitle">
          {academicDetail ? (
            <span>Personalized for your {academicDetail} journey. Discover opportunities that match your goals.</span>
          ) : (
            <span>Discover opportunities that fit your journey and keep growing along the way.</span>
          )}
        </p>
      </div>
    </header>
  );
}
