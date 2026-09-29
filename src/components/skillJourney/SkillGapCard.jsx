import { useMemo } from "react";

function isSkillMatch(a, b) {
  if (!a || !b) return false;
  const ca = a.toLowerCase().trim();
  const cb = b.toLowerCase().trim();
  return ca === cb || ca.includes(cb) || cb.includes(ca);
}

export default function SkillGapCard({ pathway, profileData = {}, onAddSkillToLearning, learningList = [] }) {
  const { title, domain, tagline, coreSkills = [], worthDeveloping = [] } = pathway;

  // Aggregate all known skills from profile, resume, and assessment
  const knownSkills = useMemo(() => {
    const list = [];
    const add = (arr) => {
      if (Array.isArray(arr)) {
        arr.forEach((s) => {
          if (s && typeof s === "string" && !list.includes(s.trim())) {
            list.push(s.trim());
          }
        });
      }
    };
    add(profileData.selectedSkills);
    add(profileData.skills);
    add(profileData.resumeSkills);
    add(profileData.assessmentSkills);
    if (Array.isArray(profileData.assessmentResults?.snapshot)) {
      profileData.assessmentResults.snapshot.forEach((snap) => {
        if (snap?.skill) list.push(snap.skill.trim());
      });
    }
    return list;
  }, [profileData]);

  const studentHasSkill = (skillName) => {
    return knownSkills.some((s) => isSkillMatch(s, skillName));
  };

  // 1. Existing Foundations: Skills from this pathway the student already possesses
  const alreadyHaveSkills = useMemo(() => {
    const found = [];
    coreSkills.forEach((sk) => {
      if (studentHasSkill(sk) && !found.includes(sk)) {
        found.push(sk);
      }
    });
    worthDeveloping.forEach((item) => {
      if (studentHasSkill(item.name) && !found.includes(item.name)) {
        found.push(item.name);
      }
    });
    return found;
  }, [coreSkills, worthDeveloping, knownSkills]);

  // 2. Skills Worth Developing Next: Skills required by pathway that student does NOT have yet
  const unmasteredWorthDeveloping = useMemo(() => {
    return worthDeveloping.filter((item) => !studentHasSkill(item.name));
  }, [worthDeveloping, knownSkills]);

  // Missing core foundational skills
  const missingCoreSkills = useMemo(() => {
    return coreSkills.filter((sk) => !studentHasSkill(sk));
  }, [coreSkills, knownSkills]);

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
            Foundations you already have ({alreadyHaveSkills.length}):
          </span>
          <div className="existing-skills-tags">
            {alreadyHaveSkills.length > 0 ? (
              alreadyHaveSkills.map((skill) => (
                <span key={skill} className="existing-skill-chip">
                  ✓ {skill}
                </span>
              ))
            ) : (
              <span style={{ fontSize: "13px", color: "#7a8a77", fontStyle: "italic" }}>
                No foundation skills recorded yet for this pathway. Add your skills in Your Skills or start learning below!
              </span>
            )}
          </div>
        </div>

        {/* Missing Core Foundations if any */}
        {missingCoreSkills.length > 0 && alreadyHaveSkills.length > 0 && (
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px dashed #ded5c2" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#8a5839", display: "block", marginBottom: "6px" }}>
              Key Core Foundations to Complete:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {missingCoreSkills.map((sk) => (
                <span
                  key={sk}
                  style={{
                    background: "#fffaf3",
                    border: "1px solid #f0dcbe",
                    color: "#845228",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  ○ {sk}
                </span>
              ))}
            </div>
          </div>
        )}
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
          {unmasteredWorthDeveloping.length > 0 ? (
            unmasteredWorthDeveloping.map((item) => {
              const isAdded = learningList.includes(item.name);

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
                      onClick={() => onAddSkillToLearning && onAddSkillToLearning(item.name)}
                    >
                      {isAdded ? "✓ Added to Learning" : "+ Add to Learning List"}
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="growth-empty-card" style={{ gridColumn: "1 / -1", margin: "10px 0" }}>
              <div className="growth-empty-icon">🌟</div>
              <h4 className="growth-empty-title">You've mastered all recommended skills for this pathway!</h4>
              <p className="growth-empty-text">
                Your profile covers all recommended skills for {title}. Check out Skill Matching to find live opportunities!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
