import { useState } from "react";
import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import SkillCard from "../components/skillJourney/SkillCard";
import AddSkillModal from "../components/skillJourney/AddSkillModal";
import { defaultStudentSkills } from "../data/skillJourneyData";
import "../styles/skillJourney.css";

export default function Skills({
  profileData,
  onNavigateTab,
  onNavigateHome,
  onNavigateDashboard,
}) {
  // Initialize with default skills merged with any completed onboarding profile skills
  const [skills, setSkills] = useState(() => {
    if (profileData?.selectedSkills && profileData.selectedSkills.length > 0) {
      const profileSkills = profileData.selectedSkills.map((name) => {
        const level = profileData.skillLevels?.[name] || "Beginner";
        return {
          id: `profile-${name.toLowerCase().replace(/\s+/g, "-")}`,
          name,
          category: name.includes("Git") || name.includes("Figma") ? "Tools" : "Technical Skills",
          level,
          confidence: profileData.confidence || "Comfortable",
          verified: true,
        };
      });

      // Combine with defaults avoiding duplicates
      const existingNames = new Set(profileSkills.map((s) => s.name.toLowerCase()));
      const filteredDefaults = defaultStudentSkills.filter(
        (s) => !existingNames.has(s.name.toLowerCase())
      );
      return [...profileSkills, ...filteredDefaults];
    }
    return defaultStudentSkills;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddSkill = (newSkill) => {
    setSkills((prev) => [newSkill, ...prev]);
  };

  const handleRemoveSkill = (skillId) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
  };

  // Group skills logically
  const technicalSkills = skills.filter(
    (s) => s.category === "Technical Skills" || !s.category
  );
  const toolsSkills = skills.filter((s) => s.category === "Tools");
  const otherSkills = skills.filter(
    (s) => s.category !== "Technical Skills" && s.category !== "Tools"
  );

  return (
    <div className="skill-journey-page">
      <div className="skill-journey-container">
        <SkillJourneyHeader
          activeTab="skills"
          onTabChange={onNavigateTab}
          onBackToHome={onNavigateHome}
          onBackToDashboard={onNavigateDashboard}
          title="Your Skills"
          subtitle="Explore the technologies and competencies you've started cultivating on your journey."
        />

        <main className="skills-main-content">
          {/* Top Action Bar */}
          <div className="skills-top-action-bar">
            <span className="skills-count-pill">
              🌿 {skills.length} Skills Listed
            </span>

            <button
              type="button"
              className="add-skill-trigger-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              <span>＋</span> Add Skill
            </button>
          </div>

          {/* Group 1: Technical Skills */}
          {technicalSkills.length > 0 && (
            <section className="skill-group-section">
              <div className="skill-group-heading">
                <h2 className="skill-group-title">Technical Skills</h2>
                <span className="skill-group-badge">
                  {technicalSkills.length} skills
                </span>
              </div>
              <div className="skill-cards-grid">
                {technicalSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onRemove={handleRemoveSkill}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Group 2: Tools & Platforms */}
          {toolsSkills.length > 0 && (
            <section className="skill-group-section">
              <div className="skill-group-heading">
                <h2 className="skill-group-title">Tools & Platforms</h2>
                <span className="skill-group-badge">
                  {toolsSkills.length} tools
                </span>
              </div>
              <div className="skill-cards-grid">
                {toolsSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onRemove={handleRemoveSkill}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Group 3: Core & Other Skills */}
          {otherSkills.length > 0 && (
            <section className="skill-group-section">
              <div className="skill-group-heading">
                <h2 className="skill-group-title">Other & Professional Skills</h2>
                <span className="skill-group-badge">
                  {otherSkills.length} skills
                </span>
              </div>
              <div className="skill-cards-grid">
                {otherSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onRemove={handleRemoveSkill}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Add Skill Dialog Modal */}
        <AddSkillModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddSkill={handleAddSkill}
        />
      </div>
    </div>
  );
}
