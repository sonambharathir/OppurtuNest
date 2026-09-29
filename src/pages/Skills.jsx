import { useState, useEffect, useMemo } from "react";
import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import SkillCard from "../components/skillJourney/SkillCard";
import AddSkillModal from "../components/skillJourney/AddSkillModal";
import { getProfile, saveProfile, getCurrentUser } from "../utils/profileStorage";
import { updateCurrentStudentSkills, getCurrentAuthenticatedStudent } from "../utils/api";
import "../styles/skillJourney.css";

export default function Skills({
  profileData,
  onNavigateTab,
  onNavigateHome,
  onNavigateDashboard,
}) {
  const [skills, setSkills] = useState([]);
  const [skillLevels, setSkillLevels] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load student skills on mount or when profileData changes
  useEffect(() => {
    let isMounted = true;

    async function loadSkills() {
      setIsLoading(true);

      let active = profileData || getProfile();

      // If user is logged in, try to fetch the freshest record from backend MongoDB
      const currentUser = getCurrentUser();
      if (currentUser) {
        try {
          const remoteStudent = await getCurrentAuthenticatedStudent();
          if (remoteStudent && isMounted) {
            active = {
              ...active,
              ...remoteStudent,
              selectedSkills: remoteStudent.skills || [],
              skillLevels: remoteStudent.skillLevels || {},
              resumeSkills: remoteStudent.resumeSkills || [],
            };
            saveProfile(active);
          }
        } catch (err) {
          console.warn("[Skills] Could not fetch fresh student from backend:", err.message);
        }
      }

      if (!isMounted) return;

      if (active) {
        // Collect real skills: profile selected skills + resume skills + assessment skills
        const skillNameMap = new Map();

        const addSkillItem = (name, source = "profile") => {
          if (!name || typeof name !== "string") return;
          const trimmed = name.trim();
          if (!trimmed) return;
          const lower = trimmed.toLowerCase();

          if (!skillNameMap.has(lower)) {
            const level =
              active.skillLevels?.[trimmed] ||
              active.skillLevels?.[lower] ||
              "Intermediate";

            const category =
              trimmed.includes("Git") || trimmed.includes("Figma") || trimmed.includes("Docker") || trimmed.includes("Postman")
                ? "Tools"
                : trimmed.includes("Communication") || trimmed.includes("Problem Solving") || trimmed.includes("Leadership")
                ? "Other & Professional Skills"
                : "Technical Skills";

            skillNameMap.set(lower, {
              id: `skill-${lower.replace(/\s+/g, "-")}`,
              name: trimmed,
              category,
              level,
              confidence: level === "Advanced" || level === "Strong" ? "Very confident" : "Comfortable",
              verified: source === "assessment" || source === "resume",
              source,
            });
          }
        };

        if (Array.isArray(active.selectedSkills)) {
          active.selectedSkills.forEach((s) => addSkillItem(s, "profile"));
        } else if (Array.isArray(active.skills)) {
          active.skills.forEach((s) => addSkillItem(s, "profile"));
        }

        if (Array.isArray(active.resumeSkills)) {
          active.resumeSkills.forEach((s) => addSkillItem(s, "resume"));
        }

        if (Array.isArray(active.assessmentSkills)) {
          active.assessmentSkills.forEach((s) => addSkillItem(s, "assessment"));
        }

        setSkills(Array.from(skillNameMap.values()));
        setSkillLevels(active.skillLevels || {});
      } else {
        setSkills([]);
        setSkillLevels({});
      }

      setIsLoading(false);
    }

    loadSkills();

    return () => {
      isMounted = false;
    };
  }, [profileData]);

  // Persist updated skills to backend and localStorage
  const persistSkills = async (updatedSkills, updatedLevels) => {
    const skillNames = updatedSkills.map((s) => s.name);
    const cachedProfile = getProfile() || {};
    const updatedProfile = {
      ...cachedProfile,
      selectedSkills: skillNames,
      skills: skillNames,
      skillLevels: updatedLevels,
    };
    saveProfile(updatedProfile);

    const currentUser = getCurrentUser();
    if (currentUser) {
      try {
        await updateCurrentStudentSkills({
          skills: skillNames,
          skillLevels: updatedLevels,
          learningSkills: cachedProfile.learningSkills || [],
        });
      } catch (err) {
        console.warn("[Skills] Failed to persist skills to backend:", err.message);
      }
    }
  };

  const handleAddSkill = async (newSkill) => {
    if (!newSkill || !newSkill.name) return;

    // Check if skill already exists case-insensitively
    const exists = skills.some(
      (s) => s.name.toLowerCase() === newSkill.name.trim().toLowerCase()
    );
    if (exists) return;

    const formattedSkill = {
      ...newSkill,
      id: `manual-${Date.now()}-${newSkill.name.toLowerCase().replace(/\s+/g, "-")}`,
    };

    const updated = [formattedSkill, ...skills];
    const updatedLevels = {
      ...skillLevels,
      [newSkill.name]: newSkill.level || "Intermediate",
    };

    setSkills(updated);
    setSkillLevels(updatedLevels);
    await persistSkills(updated, updatedLevels);
  };

  const handleRemoveSkill = async (skillId) => {
    const targetSkill = skills.find((s) => s.id === skillId);
    const updated = skills.filter((s) => s.id !== skillId);

    const updatedLevels = { ...skillLevels };
    if (targetSkill && targetSkill.name) {
      delete updatedLevels[targetSkill.name];
    }

    setSkills(updated);
    setSkillLevels(updatedLevels);
    await persistSkills(updated, updatedLevels);
  };

  // Group skills logically
  const technicalSkills = useMemo(
    () => skills.filter((s) => s.category === "Technical Skills" || !s.category),
    [skills]
  );
  const toolsSkills = useMemo(
    () => skills.filter((s) => s.category === "Tools"),
    [skills]
  );
  const otherSkills = useMemo(
    () => skills.filter((s) => s.category !== "Technical Skills" && s.category !== "Tools"),
    [skills]
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
              🌿 {skills.length} Skill{skills.length !== 1 ? "s" : ""} Listed
            </span>

            <button
              type="button"
              className="add-skill-trigger-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              <span>＋</span> Add Skill
            </button>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#60725c", fontSize: "14px" }}>
              🌱 Loading your saved skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="growth-empty-card" style={{ margin: "20px auto", maxWidth: "600px" }}>
              <div className="growth-empty-icon">🌱</div>
              <h3 className="growth-empty-title">No skills added yet</h3>
              <p className="growth-empty-text">
                Add your technical skills, tools, or upload your resume to see your personalized skills list and matching opportunities.
              </p>
              <button
                type="button"
                className="add-skill-trigger-btn"
                onClick={() => setIsAddModalOpen(true)}
                style={{ marginTop: "12px" }}
              >
                <span>＋</span> Add Your First Skill
              </button>
            </div>
          ) : (
            <>
              {/* Group 1: Technical Skills */}
              {technicalSkills.length > 0 && (
                <section className="skill-group-section">
                  <div className="skill-group-heading">
                    <h2 className="skill-group-title">Technical Skills</h2>
                    <span className="skill-group-badge">
                      {technicalSkills.length} skill{technicalSkills.length !== 1 ? "s" : ""}
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
                      {toolsSkills.length} tool{toolsSkills.length !== 1 ? "s" : ""}
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
                      {otherSkills.length} skill{otherSkills.length !== 1 ? "s" : ""}
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
            </>
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
