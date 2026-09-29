import { useState, useMemo } from "react";
import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import SkillGapCard from "../components/skillJourney/SkillGapCard";
import { careerPathways } from "../data/skillJourneyData";
import { getProfile, saveProfile, getCurrentUser } from "../utils/profileStorage";
import { updateCurrentStudentSkills } from "../utils/api";
import "../styles/skillJourney.css";

export default function SkillGaps({
  profileData,
  onNavigateTab,
  onNavigateHome,
  onNavigateDashboard,
}) {
  const activeProfile = useMemo(() => profileData || getProfile() || {}, [profileData]);

  const [selectedPathwayId, setSelectedPathwayId] = useState(() => {
    const roles = activeProfile?.preferredRoles || [];
    const targetRole = activeProfile?.targetRole || (roles.length > 0 ? roles[0] : "");

    if (targetRole) {
      const match = careerPathways.find(
        (p) =>
          p.title.toLowerCase().includes(targetRole.toLowerCase()) ||
          p.domain.toLowerCase().includes(targetRole.toLowerCase())
      );
      if (match) return match.id;
    }
    return "frontend-dev";
  });

  const [learningList, setLearningList] = useState(
    () => activeProfile.learningSkills || []
  );

  // Active pathway
  const activePathway =
    careerPathways.find((p) => p.id === selectedPathwayId) ||
    careerPathways[0];

  const handleAddSkillToLearning = async (skillName) => {
    let nextList;
    if (learningList.includes(skillName)) {
      nextList = learningList.filter((s) => s !== skillName);
    } else {
      nextList = [...learningList, skillName];
    }
    setLearningList(nextList);

    const cached = getProfile() || {};
    const updated = { ...cached, learningSkills: nextList };
    saveProfile(updated);

    const currentUser = getCurrentUser();
    if (currentUser) {
      try {
        await updateCurrentStudentSkills({
          skills: cached.selectedSkills || cached.skills || [],
          skillLevels: cached.skillLevels || {},
          learningSkills: nextList,
        });
      } catch (err) {
        console.warn("[SkillGaps] Failed to persist learning skill to backend:", err.message);
      }
    }
  };

  return (
    <div className="skill-journey-page">
      <div className="skill-journey-container">
        <SkillJourneyHeader
          activeTab="gaps"
          onTabChange={onNavigateTab}
          onBackToHome={onNavigateHome}
          onBackToDashboard={onNavigateDashboard}
          title="Skills Worth Developing"
          subtitle="Explore high-value skills and frameworks that can help you move toward your chosen career goals."
        />

        <main className="gaps-main-content">
          {/* Pathway / Career Goal Selector */}
          <div className="gaps-pathway-selector">
            <span className="gaps-selector-label">Target Career Goal:</span>
            <div className="gaps-pathway-pills">
              {careerPathways.map((pathway) => (
                <button
                  key={pathway.id}
                  type="button"
                  className={`pathway-pill-btn ${
                    selectedPathwayId === pathway.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedPathwayId(pathway.id)}
                >
                  {pathway.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Goal Overview & Skills Worth Developing */}
          <SkillGapCard
            pathway={activePathway}
            profileData={activeProfile}
            onAddSkillToLearning={handleAddSkillToLearning}
            learningList={learningList}
          />

          {/* Learning List Active Toast/Summary */}
          {learningList.length > 0 && (
            <div className="learning-list-summary-bar">
              <div className="learning-summary-left">
                <span className="learning-summary-icon">🌱</span>
                <div>
                  <strong>{learningList.length} skill{learningList.length > 1 ? "s" : ""} in your learning list:</strong>{" "}
                  <span className="learning-summary-names">
                    {learningList.join(", ")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="learning-view-matching-btn"
                onClick={() => onNavigateTab && onNavigateTab("matching")}
              >
                View Matching Opportunities →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
