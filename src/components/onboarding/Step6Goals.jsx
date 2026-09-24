import OnboardingNavigation from "./OnboardingNavigation";

const goalOptions = [
  {
    id: "internships",
    title: "Find internships",
    description: "Discover internship opportunities and gain real-world experience.",
  },
  {
    id: "jobs",
    title: "Prepare for jobs",
    description: "Build your profile and discover opportunities for your career.",
  },
  {
    id: "skills",
    title: "Build my skills",
    description: "Learn new technologies and become more confident in your abilities.",
  },
  {
    id: "explore",
    title: "Explore opportunities",
    description: "I'm still exploring and want to see what's out there.",
  },
];

export default function Step6Goals({ formData, setFormData, onBack, onNext }) {
  const toggleGoal = (goalId) => {
    setFormData((prev) => {
      const currentGoals = Array.isArray(prev.goals) ? prev.goals : [];
      const isSelected = currentGoals.includes(goalId);

      return {
        ...prev,
        goals: isSelected
          ? currentGoals.filter((item) => item !== goalId)
          : [...currentGoals, goalId],
      };
    });
  };

  return (
    <section className="academic-card">
      <div className="academic-card-heading">
        <div>
          <span className="card-step-label">STEP 6 OF 7</span>
          <h2>Your Goals</h2>
          <p>
            Tell us what you want to achieve so we can personalize your
            opportunities.
          </p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <div className="projects-content">
        <div className="project-question">
          <h3>What are you mainly looking for?</h3>

          {goalOptions.map((option) => {
            const isSelected = Array.isArray(formData.goals) && formData.goals.includes(option.id);

            return (
              <button
                type="button"
                key={option.id}
                className={`project-choice ${
                  isSelected ? "project-choice-active" : ""
                }`}
                onClick={() => toggleGoal(option.id)}
              >
                <span className="project-radio">
                  {isSelected && <span />}
                </span>
                <span className="project-choice-content">
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <OnboardingNavigation onBack={onBack} onNext={onNext} />
    </section>
  );
}
