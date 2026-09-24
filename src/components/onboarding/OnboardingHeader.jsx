
export default function OnboardingHeader({ onClose }) {
  return (
    <div className="onboarding-header">
      <button
        type="button"
        className="onboarding-back-home"
        onClick={onClose}
      >
        ← Back to OppurtuNest
      </button>

      <div className="onboarding-brand">OppurtuNest</div>
    </div>
  );
}
