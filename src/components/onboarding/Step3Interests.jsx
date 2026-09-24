import OnboardingNavigation from "./OnboardingNavigation";
import { interestCategories } from "../../data/onboardingData";

export default function Step3Interests({
  formData,
  setFormData,
  toggleInterest,
  removeInterest,
  onBack,
  onNext,
}) {
  return (
    <section className="academic-card interests-card">
      <div className="academic-card-heading">
        <div>
          <span className="card-step-label">STEP 3 OF 7</span>
          <h2>Interests & Exploration</h2>
          <p>
            Tell us what areas you're curious about so we can understand what
            you would like to explore.
          </p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <div className="skills-content">
        <div className="skills-section">
          <div className="skills-section-heading">
            <div>
              <label className="skills-label">What are you interested in?</label>
              <p className="skills-helper">
                Select as many areas as genuinely interest you.
              </p>
            </div>
          </div>

          <div className="skill-search-wrapper">
            <span className="skill-search-icon">⌕</span>
            <input
              type="text"
              value={formData.interestSearch || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  interestSearch: e.target.value,
                }))
              }
              placeholder="Search interests..."
              className="skill-search-input"
            />
          </div>

          {formData.selectedInterests.length > 0 && (
            <div className="selected-skills">
              {formData.selectedInterests.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  className="skill-pill"
                  onClick={() => removeInterest(interest)}
                >
                  {interest}
                  <span>×</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="interest-options">
          {Object.entries(interestCategories).map(([category, interests]) => {
            const searchQuery = (formData.interestSearch || "").toLowerCase();
            const visibleInterests = interests.filter((interest) =>
              interest.toLowerCase().includes(searchQuery)
            );

            if (visibleInterests.length === 0) {
              return null;
            }

            return (
              <div className="interest-category" key={category}>
                <h3>{category}</h3>
                <div className="skill-options">
                  {visibleInterests.map((interest) => {
                    const isSelected =
                      formData.selectedInterests.includes(interest);

                    return (
                      <button
                        type="button"
                        key={interest}
                        className={`skill-option ${
                          isSelected ? "skill-option-selected" : ""
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {isSelected && <span>✓</span>}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <OnboardingNavigation onBack={onBack} onNext={onNext} />
    </section>
  );
}
