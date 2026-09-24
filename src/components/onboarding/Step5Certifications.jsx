import OnboardingNavigation from "./OnboardingNavigation";

export default function Step5Certifications({
  formData,
  hasCertifications,
  setHasCertifications,
  handleCertificationChange,
  addCertification,
  onBack,
  onNext,
}) {
  return (
    <section className="academic-card">
      <div className="academic-card-heading">
        <div>
          <span className="card-step-label">STEP 5 OF 7</span>
          <h2>Certifications</h2>
          <p>
            Add certifications, courses, or credentials you've completed.
          </p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <div className="projects-content">
        <div className="project-question">
          <h3>Do you have any certifications to add?</h3>

          <button
            type="button"
            className={`project-choice ${
              hasCertifications === "yes" ? "project-choice-active" : ""
            }`}
            onClick={() => setHasCertifications("yes")}
          >
            <span className="project-radio">
              {hasCertifications === "yes" && <span />}
            </span>
            <span className="project-choice-content">
              <strong>Yes, I have certifications</strong>
              <small>
                Add certifications, courses, or credentials you've completed.
              </small>
            </span>
          </button>

          <button
            type="button"
            className={`project-choice ${
              hasCertifications === "no" ? "project-choice-active" : ""
            }`}
            onClick={() => setHasCertifications("no")}
          >
            <span className="project-radio">
              {hasCertifications === "no" && <span />}
            </span>
            <span className="project-choice-content">
              <strong>I'm just getting started</strong>
              <small>No worries — you can add certifications later.</small>
            </span>
          </button>
        </div>

        {hasCertifications === "yes" && (
          <div className="project-form">
            {formData.certifications.map((certification, index) => (
              <div className="project-fields" key={index}>
                <div className="project-field">
                  <label htmlFor={`certification-name-${index}`}>
                    Certification Name
                  </label>
                  <input
                    id={`certification-name-${index}`}
                    type="text"
                    value={certification.name}
                    onChange={(e) =>
                      handleCertificationChange(index, "name", e.target.value)
                    }
                    placeholder="e.g. AWS Certified Cloud Practitioner"
                  />
                </div>

                <div className="project-field">
                  <label htmlFor={`certification-organization-${index}`}>
                    Issuing Organization
                  </label>
                  <input
                    id={`certification-organization-${index}`}
                    type="text"
                    value={certification.organization}
                    onChange={(e) =>
                      handleCertificationChange(
                        index,
                        "organization",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Amazon Web Services"
                  />
                </div>

                <div className="project-field">
                  <label htmlFor={`certification-year-${index}`}>
                    Date / Year
                  </label>
                  <input
                    id={`certification-year-${index}`}
                    type="text"
                    value={certification.year}
                    onChange={(e) =>
                      handleCertificationChange(index, "year", e.target.value)
                    }
                    placeholder="e.g. 2026"
                  />
                </div>

                <div className="project-field">
                  <label htmlFor={`certification-link-${index}`}>
                    Credential / Certificate Link
                  </label>
                  <input
                    id={`certification-link-${index}`}
                    type="url"
                    value={certification.link}
                    onChange={(e) =>
                      handleCertificationChange(index, "link", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-project-btn"
              onClick={addCertification}
            >
              <span>＋</span>
              Add another certification
            </button>
          </div>
        )}
      </div>

      <OnboardingNavigation onBack={onBack} onNext={onNext} />
    </section>
  );
}
