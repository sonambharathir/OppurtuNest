import { VineBranch, GrassTuft } from "./Illustrations";

// Mini Skill Icons for the "Your Skills" pebble node
const MiniIcons = {
  Code: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2c5b61" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Briefcase: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#366b4c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" fill="#d9eed7" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Gear: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#68477b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill="#e9daf5" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Target: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#875620" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="#fae8c8" />
    </svg>
  )
};

export default function SkillJourneySection({ onSelectStep }) {
  return (
    <section id="journey" className="skill-journey-section">
      {/* Upper Meadow Transition */}
      <div className="section-title-wrap">
        <h2 className="section-heading">Your Skill Journey</h2>
      </div>

      {/* Horizontal Organic Path with Vine Connections */}
      <div className="journey-path-container">
        {/* Step 1: Your Skills (Pebble with Mini Icons) */}
        <button
          type="button"
          className="journey-node node-skills"
          onClick={() => onSelectStep && onSelectStep("skills")}
          title="Explore Your Skills"
          aria-label="Navigate to Your Skills"
        >
          <span className="node-title">Your Skills</span>
          <div className="mini-skills-row">
            <span className="mini-icon-circle bg-mint"><MiniIcons.Briefcase /></span>
            <span className="mini-icon-circle bg-teal"><MiniIcons.Code /></span>
            <span className="mini-icon-circle bg-purple"><MiniIcons.Gear /></span>
            <span className="mini-icon-circle bg-amber"><MiniIcons.Target /></span>
          </div>
        </button>

        {/* Vine Branch 1 */}
        <div className="vine-connector">
          <VineBranch />
        </div>

        {/* Step 2: Matching */}
        <button
          type="button"
          className="journey-node node-matching"
          onClick={() => onSelectStep && onSelectStep("matching")}
          title="Explore Skill Matching"
          aria-label="Navigate to Skill Matching"
        >
          <span className="node-title">Matching</span>
        </button>

        {/* Vine Branch 2 */}
        <div className="vine-connector">
          <VineBranch />
        </div>

        {/* Step 3: Skill Gaps */}
        <button
          type="button"
          className="journey-node node-gaps"
          onClick={() => onSelectStep && onSelectStep("gaps")}
          title="Explore Skill Gaps"
          aria-label="Navigate to Skill Gaps"
        >
          <span className="node-title">Skill Gaps</span>
        </button>

        {/* Vine Branch 3 */}
        <div className="vine-connector">
          <VineBranch />
        </div>

        {/* Step 4: Growth */}
        <button
          type="button"
          className="journey-node node-growth"
          onClick={() => onSelectStep && onSelectStep("growth")}
          title="Explore Your Growth"
          aria-label="Navigate to Your Growth"
        >
          <span className="node-title">Growth</span>
        </button>
      </div>

      {/* Subtle Grass Details */}
      <div className="journey-grass-accents">
        <GrassTuft size={22} />
      </div>
    </section>
  );
}
