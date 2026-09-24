import OnboardingNavigation from "./OnboardingNavigation";

export default function Step4Projects({
  formData,
  hasProjects,
  setHasProjects,
  handleProjectChange,
  addProject,
  onBack,
  onNext,
}) {
  return (
    <section className="academic-card projects-card">
      <div className="academic-card-heading">
        <div>
          <span className="card-step-label">STEP 4 OF 7</span>
          <h2>Projects & Experience</h2>
          <p>Show us what you've built, explored, or worked on.</p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <div className="projects-content">
        <div className="project-question">
          <h3>Do you have projects or experience to add?</h3>

          <button
            type="button"
            className={`project-choice ${
              hasProjects === "yes" ? "project-choice-active" : ""
            }`}
            onClick={() => setHasProjects("yes")}
          >
            <span className="project-radio">
              {hasProjects === "yes" && <span />}
            </span>
            <span className="project-choice-content">
              <strong>Yes, I have projects</strong>
              <small>Add your projects, technical work, or experiences.</small>
            </span>
          </button>

          <button
            type="button"
            className={`project-choice ${
              hasProjects === "no" ? "project-choice-active" : ""
            }`}
            onClick={() => setHasProjects("no")}
          >
            <span className="project-radio">
              {hasProjects === "no" && <span />}
            </span>
            <span className="project-choice-content">
              <strong>I'm just getting started</strong>
              <small>No worries — you can add projects later.</small>
            </span>
          </button>
        </div>

        {hasProjects === "yes" && (
          <div className="project-form">
            {formData.projects.map((project, index) => (
              <div className="project-fields" key={index}>
                <div className="project-field">
                  <label htmlFor={`project-title-${index}`}>
                    Project Title
                  </label>
                  <input
                    id={`project-title-${index}`}
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      handleProjectChange(index, "title", e.target.value)
                    }
                    placeholder="e.g. Smart Campus Navigation"
                  />
                </div>

                <div className="project-field">
                  <label htmlFor={`project-description-${index}`}>
                    Description
                  </label>
                  <textarea
                    id={`project-description-${index}`}
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    placeholder="Briefly describe what you built or worked on..."
                    rows="4"
                  />
                </div>

                <div className="project-field">
                  <label htmlFor={`project-technologies-${index}`}>
                    Technology Stack
                  </label>
                  <input
                    id={`project-technologies-${index}`}
                    type="text"
                    value={project.technologies}
                    onChange={(e) =>
                      handleProjectChange(index, "technologies", e.target.value)
                    }
                    placeholder="e.g. React, Node.js, MongoDB"
                  />
                </div>

                <div className="project-field">
                  <label htmlFor={`project-link-${index}`}>
                    Project / Repository Link
                  </label>
                  <input
                    id={`project-link-${index}`}
                    type="url"
                    value={project.link}
                    onChange={(e) =>
                      handleProjectChange(index, "link", e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-project-btn"
              onClick={addProject}
            >
              <span>＋</span>
              Add another project
            </button>
          </div>
        )}
      </div>

      <OnboardingNavigation onBack={onBack} onNext={onNext} />
    </section>
  );
}
