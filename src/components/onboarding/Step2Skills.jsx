import OnboardingNavigation from "./OnboardingNavigation";

export default function Step2Skills({
  formData,
  setFormData,
  skillSearch,
  setSkillSearch,
  filteredSkills,
  toggleSkill,
  removeSkill,
  handleSkillLevelChange,
  learningSearch,
  setLearningSearch,
  filteredLearningSkills,
  toggleLearningSkill,
  removeLearningSkill,
  onBack,
  onNext,
}) {
  return (
    <section className="academic-card skills-card">
      <div className="academic-card-heading">
        <div>
          <span className="card-step-label">STEP 2 OF 7</span>
          <h2>Skills & Expertise</h2>
          <p>
            Tell us what you know, what you're learning, and how comfortable
            you are with your skills.
          </p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <div className="skills-content">
        {/* Section 1: Known Skills */}
        <div className="skills-section">
          <div className="skills-section-heading">
            <div>
              <label className="skills-label">Your Skills</label>
              <p className="skills-helper">Select the skills you already have.</p>
            </div>
          </div>

          <div className="skill-search-wrapper">
            <span className="skill-search-icon">⌕</span>
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search for a skill..."
              className="skill-search-input"
            />
          </div>

          {formData.selectedSkills.length > 0 && (
            <div className="selected-skills">
              {formData.selectedSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  className="skill-pill"
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <span>×</span>
                </button>
              ))}
            </div>
          )}

          <div className="skill-options">
            {filteredSkills.slice(0, 18).map((skill) => {
              const isSelected = formData.selectedSkills.includes(skill);

              return (
                <button
                  type="button"
                  key={skill}
                  className={`skill-option ${
                    isSelected ? "skill-option-selected" : ""
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {isSelected && <span>✓</span>}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Skill Levels */}
        {formData.selectedSkills.length > 0 && (
          <div className="skills-section">
            <div className="skills-section-heading">
              <div>
                <label className="skills-label">Skill Level</label>
                <p className="skills-helper">
                  Tell us how comfortable you are with each skill.
                </p>
              </div>
            </div>

            <div className="skill-level-list">
              {formData.selectedSkills.map((skill) => (
                <div className="skill-level-row" key={skill}>
                  <span className="skill-level-name">{skill}</span>
                  <div className="skill-level-options">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <button
                        type="button"
                        key={level}
                        className={`skill-level-btn ${
                          formData.skillLevels[skill] === level
                            ? "skill-level-btn-active"
                            : ""
                        }`}
                        onClick={() => handleSkillLevelChange(skill, level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Currently Learning */}
        <div className="skills-section">
          <div className="skills-section-heading">
            <div>
              <label className="skills-label">Currently Learning</label>
              <p className="skills-helper">
                Add skills you're currently working on.
              </p>
            </div>
          </div>

          <div className="skill-search-wrapper">
            <span className="skill-search-icon">+</span>
            <input
              type="text"
              value={learningSearch}
              onChange={(e) => setLearningSearch(e.target.value)}
              placeholder="Search a skill you're learning..."
              className="skill-search-input"
            />
          </div>

          {formData.learningSkills.length > 0 && (
            <div className="selected-skills">
              {formData.learningSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  className="skill-pill learning-skill-pill"
                  onClick={() => removeLearningSkill(skill)}
                >
                  {skill}
                  <span>×</span>
                </button>
              ))}
            </div>
          )}

          {learningSearch.trim() !== "" && (
            <div className="skill-options">
              {filteredLearningSkills
                .filter((skill) => !formData.learningSkills.includes(skill))
                .slice(0, 10)
                .map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    className="skill-option"
                    onClick={() => toggleLearningSkill(skill)}
                  >
                    + {skill}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Section 4: Confidence */}
        <div className="skills-section confidence-section">
          <div className="skills-section-heading">
            <div>
              <label className="skills-label">
                How confident are you with your current skills?
              </label>
              <p className="skills-helper">
                There is no right answer — this simply helps us understand your
                starting point.
              </p>
            </div>
          </div>

          <div className="confidence-options">
            {[
              { value: "learning", icon: "🌱", title: "Still learning" },
              { value: "comfortable", icon: "🌿", title: "Comfortable" },
              { value: "confident", icon: "🌳", title: "Very confident" },
            ].map((option) => (
              <button
                type="button"
                key={option.value}
                className={`confidence-option ${
                  formData.confidence === option.value
                    ? "confidence-option-active"
                    : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    confidence: option.value,
                  }))
                }
              >
                <span className="confidence-icon">{option.icon}</span>
                <span>{option.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <OnboardingNavigation onBack={onBack} onNext={onNext} />
    </section>
  );
}
