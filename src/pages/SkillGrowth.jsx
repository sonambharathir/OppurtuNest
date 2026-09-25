import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import { defaultStudentSkills, initialGrowthMilestones } from "../data/skillJourneyData";
import "../styles/skillJourney.css";

export default function SkillGrowth({
  profileData,
  onNavigateTab,
  onNavigateHome,
  onNavigateDashboard,
}) {
  // Read skills from profileData if available, otherwise default skills
  const studentSkills =
    profileData?.selectedSkills && profileData.selectedSkills.length > 0
      ? profileData.selectedSkills.map((name) => ({
          name,
          level: profileData.skillLevels?.[name] || "Beginner",
          verified: true,
        }))
      : defaultStudentSkills;

  return (
    <div className="skill-journey-page">
      <div className="skill-journey-container">
        <SkillJourneyHeader
          activeTab="growth"
          onTabChange={onNavigateTab}
          onBackToHome={onNavigateHome}
          onBackToDashboard={onNavigateDashboard}
          title="Your Growth"
          subtitle="Track your progress honestly as you practice, complete assessments, and expand your skill set."
        />

        <main className="growth-main-content">
          {/* Welcome / Growth Story Starting Banner */}
          <div className="growth-welcome-card">
            <div className="growth-welcome-left">
              <span className="dash-eyebrow">BEGINNING YOUR MILESTONES</span>
              <h2 className="growth-welcome-title">
                Your growth story starts here 🌱
              </h2>
              <p className="growth-welcome-copy">
                Complete an assessment, add a skill, or start learning to begin tracking your progress.
                Every small step builds toward your next internship, hackathon, or role.
              </p>
            </div>
            <div className="growth-welcome-icon" aria-hidden="true">
              🌿
            </div>
          </div>

          {/* Section 1: Starting Milestones (Real Progress, No Fake Percentages) */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <h3 className="growth-section-title">Getting Started Milestones</h3>
              <p className="growth-section-caption">
                Core steps to establish your profile and unlock tailored opportunities.
              </p>
            </div>

            <div className="growth-milestones-list">
              {initialGrowthMilestones.map((milestone) => (
                <article
                  key={milestone.id}
                  className="growth-milestone-item"
                >
                  <div className="milestone-left">
                    <div
                      className={`milestone-status-icon status-${milestone.status}`}
                      aria-label={`Status: ${milestone.status}`}
                    >
                      {milestone.status === "completed" ? "✓" : milestone.status === "in_progress" ? "◐" : "○"}
                    </div>
                    <div>
                      <h4 className="milestone-title">{milestone.title}</h4>
                      <p className="milestone-desc">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="milestone-right">
                    {milestone.status === "completed" ? (
                      <span className="milestone-completed-badge">
                        ✓ {milestone.completedDate || "Completed"}
                      </span>
                    ) : milestone.actionText ? (
                      <button
                        type="button"
                        className="milestone-action-btn"
                        onClick={() => {
                          if (milestone.actionPage && onNavigateTab) {
                            onNavigateTab(milestone.actionPage);
                          }
                        }}
                      >
                        {milestone.actionText} →
                      </button>
                    ) : (
                      <span className="milestone-pending-label">Up next</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Section 2: Skills Added */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <div className="growth-heading-row">
                <div>
                  <h3 className="growth-section-title">Skills Added ({studentSkills.length})</h3>
                  <p className="growth-section-caption">
                    Skills currently attached to your profile and actively visible to opportunity matchers.
                  </p>
                </div>
                <button
                  type="button"
                  className="growth-small-action-btn"
                  onClick={() => onNavigateTab && onNavigateTab("skills")}
                >
                  Manage Skills →
                </button>
              </div>
            </div>

            <div className="growth-skills-chip-grid">
              {studentSkills.map((sk) => (
                <div key={sk.name || sk.id} className="growth-skill-chip">
                  <span className="chip-name">{sk.name}</span>
                  <span className="chip-level">{sk.level || "Intermediate"}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Skills Developed */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <h3 className="growth-section-title">Skills Developed</h3>
              <p className="growth-section-caption">
                Skills you have leveled up through completed courses, internships, or verified challenges.
              </p>
            </div>

            {/* Meaningful Empty State: No Fake Numbers */}
            <div className="growth-empty-card">
              <div className="growth-empty-icon">🌱</div>
              <h4 className="growth-empty-title">No skills marked as leveled up yet</h4>
              <p className="growth-empty-text">
                As you build projects, complete internships, or take assessments, your leveled-up skills will be documented here.
              </p>
              <button
                type="button"
                className="growth-secondary-btn"
                onClick={() => onNavigateTab && onNavigateTab("gaps")}
              >
                Explore Skills Worth Developing →
              </button>
            </div>
          </section>

          {/* Section 4: Assessments */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <h3 className="growth-section-title">Assessments</h3>
              <p className="growth-section-caption">
                Short, practical check-ins to verify skill proficiency and earn verified profile badges.
              </p>
            </div>

            {/* Interactive Starting State for Assessments */}
            <div className="growth-empty-card">
              <div className="growth-empty-icon">📝</div>
              <h4 className="growth-empty-title">Ready for a low-pressure skill check-in?</h4>
              <p className="growth-empty-text">
                Take a 12-question check-in across Web Development, Programming, AI & Data, UI/UX, or Business to evaluate your practical understanding.
              </p>
              <button
                type="button"
                className="growth-secondary-btn"
                onClick={() => onNavigateTab && onNavigateTab("assessment")}
              >
                Take a Quick Assessment →
              </button>
            </div>
          </section>

          {/* Section 5: Learning Activity Log */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <h3 className="growth-section-title">Learning Activity</h3>
              <p className="growth-section-caption">
                A chronological log of your learning sessions, applied opportunities, and milestones.
              </p>
            </div>

            {/* Meaningful Empty State: No fake statistics */}
            <div className="growth-empty-card">
              <div className="growth-empty-icon">📖</div>
              <h4 className="growth-empty-title">Your activity timeline will unfold here</h4>
              <p className="growth-empty-text">
                Every time you apply for an opportunity, save a skill to your learning list, or complete an assessment, it will be saved to your OppurtuNest story.
              </p>
              <button
                type="button"
                className="growth-secondary-btn"
                onClick={() => onNavigateTab && onNavigateTab("matching")}
              >
                Browse Matching Opportunities →
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
