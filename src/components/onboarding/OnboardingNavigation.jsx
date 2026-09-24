
export default function OnboardingNavigation({
  onBack,
  onNext,
  backLabel = "← Back",
  nextLabel = "Continue",
  nextArrow = "→",
  isSubmit = false,
}) {
  return (
    <div className="onboarding-actions">
      <button
        type="button"
        className="onboarding-secondary-btn"
        onClick={onBack}
      >
        {backLabel}
      </button>

      <button
        type={isSubmit ? "submit" : "button"}
        className="onboarding-primary-btn"
        onClick={isSubmit ? undefined : onNext}
      >
        {nextLabel}
        {nextArrow && <span>{nextArrow}</span>}
      </button>
    </div>
  );
}
