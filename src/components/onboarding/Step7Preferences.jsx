import OnboardingNavigation from "./OnboardingNavigation";

const opportunityTypeOptions = [
  "Internships",
  "Full-time Jobs",
  "Hackathons",
  "Competitions",
  "Workshops",
  "Courses",
];

const workModeOptions = ["Remote", "Hybrid", "On-site"];

const roleOptions = [
  "Software Development",
  "Data & AI",
  "Design",
  "Product Management",
  "Marketing",
  "Finance",
  "Research",
];

export default function Step7Preferences({
  formData,
  setFormData,
  toggleOpportunityType,
  toggleWorkMode,
  togglePreferredRole,
  onBack,
  onFinish,
}) {
  return (
    <section className="academic-card">
      <div className="academic-card-heading">
        <div>
          <span className="card-step-label">STEP 7 OF 7</span>
          <h2>Your Preferences</h2>
          <p>Tell us what kinds of opportunities you'd like to discover.</p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <div className="projects-content">
        {/* Opportunity Types */}
        <div className="project-question">
          <h3>What opportunities interest you?</h3>
          {opportunityTypeOptions.map((type) => {
            const isSelected = formData.opportunityTypes.includes(type);

            return (
              <button
                type="button"
                key={type}
                className={`project-choice ${
                  isSelected ? "project-choice-active" : ""
                }`}
                onClick={() => toggleOpportunityType(type)}
              >
                <span className="project-radio">
                  {isSelected && <span />}
                </span>
                <span className="project-choice-content">
                  <strong>{type}</strong>
                  <small>Show me relevant {type.toLowerCase()}.</small>
                </span>
              </button>
            );
          })}
        </div>

        {/* Work Mode */}
        <div className="project-question">
          <h3>What work mode do you prefer?</h3>
          {workModeOptions.map((mode) => {
            const isSelected = formData.workModes.includes(mode);

            return (
              <button
                type="button"
                key={mode}
                className={`project-choice ${
                  isSelected ? "project-choice-active" : ""
                }`}
                onClick={() => toggleWorkMode(mode)}
              >
                <span className="project-radio">
                  {isSelected && <span />}
                </span>
                <span className="project-choice-content">
                  <strong>{mode}</strong>
                  <small>
                    Include {mode.toLowerCase()} opportunities in my
                    recommendations.
                  </small>
                </span>
              </button>
            );
          })}
        </div>

        {/* Preferred Location */}
        <div className="project-question">
          <h3>Preferred location</h3>
          <div className="project-field">
            <input
              type="text"
              value={formData.preferredLocation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  preferredLocation: e.target.value,
                }))
              }
              placeholder="e.g. Bengaluru, Hyderabad, Remote"
            />
          </div>
        </div>

        {/* Preferred Roles */}
        <div className="project-question">
          <h3>What roles would you like to explore?</h3>
          {roleOptions.map((role) => {
            const isSelected = formData.preferredRoles.includes(role);

            return (
              <button
                type="button"
                key={role}
                className={`project-choice ${
                  isSelected ? "project-choice-active" : ""
                }`}
                onClick={() => togglePreferredRole(role)}
              >
                <span className="project-radio">
                  {isSelected && <span />}
                </span>
                <span className="project-choice-content">
                  <strong>{role}</strong>
                  <small>Include opportunities related to this area.</small>
                </span>
              </button>
            );
          })}
        </div>

        {/* Open to other domains */}
        <div className="project-question">
          <h3>Are you open to opportunities outside your selected areas?</h3>

          <button
            type="button"
            className={`project-choice ${
              formData.openToOtherDomains === "yes"
                ? "project-choice-active"
                : ""
            }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                openToOtherDomains: "yes",
              }))
            }
          >
            <span className="project-radio">
              {formData.openToOtherDomains === "yes" && <span />}
            </span>
            <span className="project-choice-content">
              <strong>Yes, show me interesting options</strong>
              <small>
                I'm open to discovering opportunities outside my usual interests.
              </small>
            </span>
          </button>

          <button
            type="button"
            className={`project-choice ${
              formData.openToOtherDomains === "no"
                ? "project-choice-active"
                : ""
            }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                openToOtherDomains: "no",
              }))
            }
          >
            <span className="project-radio">
              {formData.openToOtherDomains === "no" && <span />}
            </span>
            <span className="project-choice-content">
              <strong>Keep it focused</strong>
              <small>
                Only show opportunities close to my selected areas.
              </small>
            </span>
          </button>
        </div>
      </div>

      <OnboardingNavigation
        onBack={onBack}
        onNext={onFinish}
        nextLabel="Finish Profile"
        nextArrow="✓"
      />
    </section>
  );
}
