import { useMemo } from "react";
import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import { getProfile } from "../utils/profileStorage";
import "../styles/skillJourney.css";

export default function SkillGrowth({
  profileData,
  onNavigateTab,
  onNavigateHome,
  onNavigateDashboard,
}) {
  const active = useMemo(() => profileData || getProfile() || {}, [profileData]);

  // Aggregate real student skills
  const studentSkills = useMemo(() => {
    const map = new Map();
    const add = (arr, src) => {
      if (Array.isArray(arr)) {
        arr.forEach((s) => {
          if (!s || typeof s !== "string") return;
          const trimmed = s.trim();
          if (!trimmed) return;
          const lower = trimmed.toLowerCase();
          if (!map.has(lower)) {
            const level = active.skillLevels?.[trimmed] || "Intermediate";
            map.set(lower, { name: trimmed, level, source: src });
          }
        });
      }
    };
    add(active.selectedSkills, "profile");
    add(active.skills, "profile");
    add(active.resumeSkills, "resume");
    add(active.assessmentSkills, "assessment");
    return Array.from(map.values());
  }, [active]);

  const assessmentResults = active.assessmentResults || null;
  const learningSkills = active.learningSkills || [];
  const hasAssessment = Boolean(assessmentResults && assessmentResults.snapshot?.length > 0);

  // Calculate dynamic, honest milestones based on actual student data
  const dynamicMilestones = useMemo(() => {
    const hasProfileSkills = studentSkills.length > 0;
    const hasTargetRole = (active.preferredRoles && active.preferredRoles.length > 0) || Boolean(active.degree);
    const hasLearning = learningSkills.length > 0;

    return [
      {
        id: "mile-1",
        title: "Set up your Skill Profile",
        description: hasProfileSkills
          ? `Added ${studentSkills.length} skill${studentSkills.length > 1 ? "s" : ""} to your profile.`
          : "List the technologies, tools, and abilities you feel comfortable with.",
        status: hasProfileSkills ? "completed" : "in_progress",
        completedDate: hasProfileSkills ? "Completed" : null,
        actionText: hasProfileSkills ? null : "Add Skills",
        actionPage: "skills",
      },
      {
        id: "mile-2",
        title: "Choose a Target Pathway",
        description: hasTargetRole
          ? `Selected goal: ${active.preferredRoles?.[0] || active.degree || "Active Pathway"}`
          : "Explore career pathways like Frontend Developer or AI Engineer to align your learning.",
        status: hasTargetRole ? "completed" : "in_progress",
        completedDate: hasTargetRole ? "Completed" : null,
        actionText: hasTargetRole ? null : "Explore Skill Gaps",
        actionPage: "gaps",
      },
      {
        id: "mile-3",
        title: "Take a Quick Skill Assessment",
        description: hasAssessment
          ? `Completed check-in in ${assessmentResults.skillArea} on ${assessmentResults.completedAt}.`
          : "Evaluate your practical understanding with a low-pressure 12-question check-in.",
        status: hasAssessment ? "completed" : "pending",
        completedDate: hasAssessment ? assessmentResults.completedAt : null,
        actionText: hasAssessment ? "Retake Assessment" : "Take Assessment",
        actionPage: "assessment",
      },
      {
        id: "mile-4",
        title: "Bridge a Recommended Skill Gap",
        description: hasLearning
          ? `${learningSkills.length} skill${learningSkills.length > 1 ? "s" : ""} in your learning list: ${learningSkills.slice(0, 2).join(", ")}.`
          : "Save a high-value skill (like TypeScript or SQL) to your learning list.",
        status: hasLearning ? "completed" : "pending",
        completedDate: hasLearning ? "In Progress" : null,
        actionText: hasLearning ? "View Matches" : "Explore Gaps",
        actionPage: hasLearning ? "matching" : "gaps",
      },
    ];
  }, [studentSkills, active, hasAssessment, assessmentResults, learningSkills]);

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
              <span className="dash-eyebrow">YOUR MILESTONES & STORY</span>
              <h2 className="growth-welcome-title">
                Your growth story starts here 🌱
              </h2>
              <p className="growth-welcome-copy">
                Every skill added, assessment completed, and opportunity explored shapes your path toward your next internship or role.
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
              {dynamicMilestones.map((milestone) => (
                <article key={milestone.id} className="growth-milestone-item">
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
                    {milestone.status === "completed" && milestone.completedDate ? (
                      <span className="milestone-completed-badge">
                        ✓ {milestone.completedDate}
                      </span>
                    ) : null}
                    {milestone.actionText && (
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

            {studentSkills.length > 0 ? (
              <div className="growth-skills-chip-grid">
                {studentSkills.map((sk) => (
                  <div key={sk.name} className="growth-skill-chip">
                    <span className="chip-name">{sk.name}</span>
                    <span className="chip-level">{sk.level || "Intermediate"}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="growth-empty-card">
                <div className="growth-empty-icon">🌱</div>
                <h4 className="growth-empty-title">No skills added yet</h4>
                <p className="growth-empty-text">
                  Add your skills in Your Skills to start matching with relevant opportunities.
                </p>
                <button
                  type="button"
                  className="growth-secondary-btn"
                  onClick={() => onNavigateTab && onNavigateTab("skills")}
                >
                  Go to Your Skills →
                </button>
              </div>
            )}
          </section>

          {/* Section 3: Learning List / Skills in Development */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <h3 className="growth-section-title">Skills in Development ({learningSkills.length})</h3>
              <p className="growth-section-caption">
                Skills you are actively developing to bridge career gaps and unlock opportunities.
              </p>
            </div>

            {learningSkills.length > 0 ? (
              <div className="growth-skills-chip-grid">
                {learningSkills.map((skillName) => (
                  <div key={skillName} className="growth-skill-chip" style={{ borderColor: "#eedec0", background: "#fffdfa" }}>
                    <span className="chip-name">🌱 {skillName}</span>
                    <span className="chip-level" style={{ background: "#fbf3e6", color: "#845e28" }}>Learning</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="growth-empty-card">
                <div className="growth-empty-icon">🌱</div>
                <h4 className="growth-empty-title">No skills marked as learning yet</h4>
                <p className="growth-empty-text">
                  Explore high-demand skills in Skills Worth Developing and add them to your learning list.
                </p>
                <button
                  type="button"
                  className="growth-secondary-btn"
                  onClick={() => onNavigateTab && onNavigateTab("gaps")}
                >
                  Explore Skills Worth Developing →
                </button>
              </div>
            )}
          </section>

          {/* Section 4: Assessments */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <h3 className="growth-section-title">Assessments</h3>
              <p className="growth-section-caption">
                Short, practical check-ins to verify skill proficiency and earn verified profile badges.
              </p>
            </div>

            {hasAssessment ? (
              <div className="growth-empty-card" style={{ textAlign: "left", padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#396645", textTransform: "uppercase" }}>
                      ✦ Latest Check-in Completed
                    </span>
                    <h4 style={{ margin: "2px 0 0", fontFamily: "Fredoka, sans-serif", fontSize: "18px", color: "#2c3d2a" }}>
                      {assessmentResults.skillArea}
                    </h4>
                  </div>
                  <span style={{ fontSize: "12px", color: "#6c8068" }}>
                    {assessmentResults.completedAt}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginTop: "14px" }}>
                  {assessmentResults.snapshot?.map((item) => (
                    <div
                      key={item.skill}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #dbe6d7",
                        borderRadius: "12px",
                        padding: "10px 12px",
                      }}
                    >
                      <span style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#2c3d2a" }}>
                        {item.skill}
                      </span>
                      <span style={{ fontSize: "11.5px", color: "#396645", fontWeight: 600 }}>
                        ✦ {item.level} ({item.knowledgeScore})
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="growth-secondary-btn"
                    onClick={() => onNavigateTab && onNavigateTab("assessment")}
                  >
                    Take Another Assessment →
                  </button>
                </div>
              </div>
            ) : (
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
            )}
          </section>

          {/* Section 5: Learning Activity Log */}
          <section className="growth-section">
            <div className="growth-section-heading">
              <h3 className="growth-section-title">Learning Activity</h3>
              <p className="growth-section-caption">
                A chronological record of your skill development and applied opportunities.
              </p>
            </div>

            <div className="growth-empty-card">
              <div className="growth-empty-icon">📖</div>
              <h4 className="growth-empty-title">
                {studentSkills.length > 0 ? "Your OppurtuNest journey is underway" : "Your activity timeline will unfold here"}
              </h4>
              <p className="growth-empty-text">
                {studentSkills.length > 0
                  ? `You have ${studentSkills.length} active skill${studentSkills.length > 1 ? "s" : ""} on your profile. Explore matches to apply for live roles.`
                  : "Every time you apply for an opportunity, save a skill to your learning list, or complete an assessment, it is saved to your profile."}
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
