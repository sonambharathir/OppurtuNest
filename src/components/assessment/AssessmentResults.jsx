export default function AssessmentResults({
  results,
  onNavigateTab,
  onBackToHome,
  onRetake,
}) {
  const { skillArea, snapshot, recommendedSkills, opportunities, completedAt } = results;

  return (
    <div className="assessment-results-wrap">
      {/* 1. Results Hero Snapshot Panel */}
      <section className="assessment-card-panel results-hero-panel">
        <div className="assessment-card-header-tag">
          <span className="assessment-card-tag-pill">SNAPSHOT COMPLETED</span>
          <span className="assessment-card-icon">🌱</span>
        </div>

        <div className="results-hero-content">
          <span className="sj-eyebrow">{skillArea.toUpperCase()} • CHECK-IN COMPLETED {completedAt}</span>
          <h2 className="results-hero-title">Your Skill Snapshot 🌱</h2>
          <p className="results-hero-sub">
            Here is an authentic overview of your current strengths and proficiency levels based on your 12-question check-in.
            No arbitrary percentages — only meaningful qualitative milestones to guide your learning journey.
          </p>
        </div>

        {/* 4 Qualitative Skill Badges Grid */}
        <div className="snapshot-cards-grid">
          {snapshot.map((item) => (
            <article key={item.skill} className="snapshot-skill-card">
              <div className="snapshot-skill-top">
                <h3 className="snapshot-skill-name">{item.skill}</h3>
                <span className={`snapshot-tier-badge ${item.levelClass}`}>
                  ✦ {item.level}
                </span>
              </div>
              <div className="snapshot-skill-meta">
                <span>Knowledge Check: {item.knowledgeScore}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. Skills Worth Developing */}
      <section className="assessment-card-panel results-section-panel">
        <div className="assessment-card-header-tag">
          <span className="assessment-card-tag-pill">GROWTH RECOMMENDATIONS</span>
          <span className="assessment-card-icon">💡</span>
        </div>

        <div className="results-section-header">
          <span className="sj-eyebrow">POSITIVE NEXT STEPS</span>
          <h3 className="results-section-title">Skills Worth Developing</h3>
          <p className="results-section-sub">
            Complementary technologies and concepts that can help you move toward your career goals in {skillArea}.
          </p>
        </div>

        <div className="worth-cards-grid">
          {recommendedSkills.map((rec) => (
            <article key={rec.name} className="worth-skill-card">
              <div className="worth-card-header">
                <h4 className="worth-skill-name">{rec.name}</h4>
                <span className="worth-value-tag">Recommended</span>
              </div>
              <p className="worth-skill-reason">{rec.reason}</p>
              {rec.suggestion && (
                <div className="worth-recommendation-box">
                  <strong>Suggested step:</strong> {rec.suggestion}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* 3. Opportunities You Could Explore */}
      <section className="assessment-card-panel results-section-panel">
        <div className="assessment-card-header-tag">
          <span className="assessment-card-tag-pill">MATCHED PATHWAYS</span>
          <span className="assessment-card-icon">🎯</span>
        </div>

        <div className="results-section-header">
          <span className="sj-eyebrow">PRACTICAL APPLICATION</span>
          <h3 className="results-section-title">Opportunities You Could Explore</h3>
          <p className="results-section-sub">
            Curated internships, hackathons, and workshops aligned with your skills and current check-in.
          </p>
        </div>

        <div className="matching-grid">
          {opportunities.map((opp) => (
            <article key={opp.id} className="matching-card">
              <div className="matching-card-top">
                <div className="matching-tag-group">
                  <span className="matching-cat-pill">{opp.category}</span>
                  {opp.workMode && <span className="matching-cat-pill">{opp.workMode}</span>}
                </div>
                <span className="match-quality-badge badge-mint">
                  ✦ {opp.matchLabel}
                </span>
              </div>

              <div className="matching-card-body">
                <h4 className="matching-card-title">{opp.title}</h4>
                <p className="matching-card-org">
                  {opp.organization} {opp.location ? `• ${opp.location}` : ""}
                </p>

                <p className="matching-card-desc">{opp.description}</p>

                <div className="matched-skills-box">
                  <span className="matched-skills-label">Relevant skills:</span>
                  <div className="matched-skills-pills">
                    {opp.skills.map((sk) => (
                      <span key={sk} className="skill-match-pill">
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="matching-card-footer">
                <button
                  type="button"
                  className="matching-cta-btn"
                  onClick={() => onNavigateTab && onNavigateTab("matching")}
                >
                  Explore Opportunity <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Final Actions Navigation Bar */}
      <section className="results-actions-card">
        <h4 className="results-actions-title">Where would you like to go next?</h4>
        <div className="results-nav-buttons-row">
          <button
            type="button"
            className="results-nav-pill-btn"
            onClick={() => onNavigateTab && onNavigateTab("skills")}
          >
            🌿 View My Skills →
          </button>

          <button
            type="button"
            className="results-nav-pill-btn"
            onClick={() => onNavigateTab && onNavigateTab("gaps")}
          >
            💡 Explore Skill Gaps →
          </button>

          <button
            type="button"
            className="results-nav-pill-btn"
            onClick={() => onNavigateTab && onNavigateTab("matching")}
          >
            🎯 Find Matching Opportunities →
          </button>

          <button
            type="button"
            className="results-nav-pill-btn"
            onClick={() => onNavigateTab && onNavigateTab("growth")}
          >
            🌱 Back to Skill Journey
          </button>

          {onRetake && (
            <button
              type="button"
              className="results-retake-btn"
              onClick={onRetake}
            >
              ↻ Take Another Assessment
            </button>
          )}

          {onBackToHome && (
            <button
              type="button"
              className="results-home-btn"
              onClick={onBackToHome}
            >
              ← Back to Home
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
