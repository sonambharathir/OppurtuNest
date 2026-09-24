import { useState } from "react";

export default function SkillGapCard({ pathway, onAddSkillToLearning }) {
  const [addedSkills, setAddedSkills] = useState({});

  const { title, domain, tagline, coreSkills = [], worthDeveloping = [] } = pathway;

  const handleToggleAdd = (skillName) => {
    setAddedSkills((prev) => {
      const next = { ...prev, [skillName]: !prev[skillName] };
      if (next[skillName] && onAddSkillToLearning) {
        onAddSkillToLearning(skillName);
      }
      return next;
    });
  };

  return (
    <div className="pathway-gap-container">
      {/* Active Pathway Overview Card */}
      <div className="pathway-hero-card">
        <div className="pathway-hero-top">
          <div>
            <h2 className="pathway-hero-title">{title}</h2>
            <p className="pathway-hero-tagline">{tagline}</p>
          </div>
          <span className="pathway-domain-badge">{domain}</span>
        </div>

        {/* Existing Skills Checklist */}
        <div className="pathway-existing-skills">
          <span className="existing-skills-label">
            Foundations you already have:
          </span>
          <div className="existing-skills-tags">
            {coreSkills.map((skill) => (
              <span key={skill} className="existing-skill-chip">
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Worth Developing Section */}
      <div className="worth-developing-section">
        <div className="worth-developing-heading">
          <h3 className="worth-developing-title">
            Skills worth developing next 🌱
          </h3>
          <p className="worth-developing-sub">
            These complementary skills will make your profile stand out to recruiters for {title} roles.
          </p>
        </div>

        <div className="worth-cards-grid">
          {worthDeveloping.map((item) => {
            const isAdded = addedSkills[item.name];

            return (
              <article key={item.name} className="worth-skill-card">
                <div>
                  <div className="worth-card-header">
                    <h4 className="worth-skill-name">{item.name}</h4>
                    <span className="worth-value-tag">{item.level}</span>
                  </div>

                  <p className="worth-skill-reason">{item.reason}</p>

                  <div className="worth-recommendation-box">
                    <strong>Suggested step:</strong> {item.recommendation}
                  </div>
                </div>

                <div className="worth-card-footer">
                  <span style={{ fontSize: "12px", color: "#6a7c66" }}>
                    {item.category}
                  </span>
                  <button
                    type="button"
                    className={`worth-add-btn ${isAdded ? "added" : ""}`}
                    onClick={() => handleToggleAdd(item.name)}
                  >
                    {isAdded ? "✓ Added to Learning" : "+ Add to Learning List"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
