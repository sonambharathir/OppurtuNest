
export default function ProfileCompletion({ formData, onProceedToDashboard }) {
  // Extract key summary items for confirmation
  const academicSummary = [
    formData.degree,
    formData.branch,
    formData.currentYear ? `Year ${formData.currentYear}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  const goalLabels = {
    internships: "Find internships",
    jobs: "Prepare for jobs",
    skills: "Build my skills",
    explore: "Explore opportunities",
  };

  const selectedGoalNames = (formData.goals || []).map(
    (g) => goalLabels[g] || g
  );

  return (
    <section className="academic-card profile-completion-card">
      <div className="academic-card-heading completion-heading">
        <div>
          <span className="card-step-label completion-pill">
            PROFILE COMPLETE
          </span>
          <h2>You're all set! 🌱</h2>
          <p>
            Your OppurtuNest profile has been created. We'll use your
            preferences to find opportunities that fit your journey.
          </p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <div className="completion-body">
        {/* Profile Highlights Summary */}
        <div className="completion-summary-box">
          <h3 className="summary-box-title">Profile Snapshot</h3>

          <div className="summary-grid">
            {academicSummary && (
              <div className="summary-item">
                <span className="summary-label">Academic</span>
                <span className="summary-value">{academicSummary}</span>
              </div>
            )}

            {formData.college && (
              <div className="summary-item">
                <span className="summary-label">Institution</span>
                <span className="summary-value">{formData.college}</span>
              </div>
            )}

            {selectedGoalNames.length > 0 && (
              <div className="summary-item">
                <span className="summary-label">Primary Goals</span>
                <div className="summary-tags">
                  {selectedGoalNames.map((goal) => (
                    <span key={goal} className="summary-tag">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.selectedSkills && formData.selectedSkills.length > 0 && (
              <div className="summary-item">
                <span className="summary-label">
                  Skills ({formData.selectedSkills.length})
                </span>
                <div className="summary-tags">
                  {formData.selectedSkills.slice(0, 5).map((skill) => (
                    <span key={skill} className="summary-tag">
                      {skill}
                    </span>
                  ))}
                  {formData.selectedSkills.length > 5 && (
                    <span className="summary-tag summary-tag-more">
                      +{formData.selectedSkills.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {formData.workModes && formData.workModes.length > 0 && (
              <div className="summary-item">
                <span className="summary-label">Work Mode</span>
                <span className="summary-value">
                  {formData.workModes.join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button to Dashboard */}
        <div className="completion-actions">
          <button
            type="button"
            className="onboarding-primary-btn completion-btn"
            onClick={onProceedToDashboard}
          >
            Explore OppurtuNest <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
