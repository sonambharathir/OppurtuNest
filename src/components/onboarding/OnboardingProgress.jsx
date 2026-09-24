
const steps = [
  "Academic",
  "Skills",
  "Interests",
  "Projects",
  "Certifications",
  "Goals",
  "Preferences",
];

export default function OnboardingProgress({ currentStep }) {
  return (
    <div className="onboarding-progress">
      <div className="progress-line" />

      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={step}
            className={`progress-step ${
              isActive ? "progress-step-active" : ""
            } ${isCompleted ? "progress-step-completed" : ""}`}
          >
            <span>{isCompleted ? "✓" : stepNumber}</span>
            <small>{step}</small>
          </div>
        );
      })}
    </div>
  );
}
