import { useState, useEffect } from "react";

export default function AddSkillModal({ isOpen, onClose, onAddSkill }) {
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("Technical Skills");
  const [level, setLevel] = useState("Intermediate");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    onAddSkill({
      id: `custom-${Date.now()}`,
      name: skillName.trim(),
      category,
      level,
      confidence: level === "Advanced" ? "Very confident" : level === "Beginner" ? "Still learning" : "Comfortable",
      verified: false,
    });

    setSkillName("");
    setLevel("Intermediate");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="add-skill-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add a Skill 🌱</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label className="modal-label" htmlFor="skill-name-input">
              Skill or Technology Name
            </label>
            <input
              id="skill-name-input"
              type="text"
              className="modal-input"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g. Next.js, Docker, SQL..."
              autoFocus
              required
            />
          </div>

          <div className="modal-form-group">
            <label className="modal-label" htmlFor="skill-category-select">
              Category
            </label>
            <select
              id="skill-category-select"
              className="modal-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Technical Skills">Technical Skills (Languages, Frameworks)</option>
              <option value="Tools">Tools & Platforms (Git, Figma, Docker)</option>
              <option value="Other Skills">Other / Professional Skills (Problem Solving, Design)</option>
            </select>
          </div>

          <div className="modal-form-group">
            <label className="modal-label">Your Current Proficiency</label>
            <div className="modal-level-buttons">
              {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  className={`modal-level-btn ${level === lvl ? "active" : ""}`}
                  onClick={() => setLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-submit-btn"
            >
              Add to Skills →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
