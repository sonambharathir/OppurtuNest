import React, { useState } from "react";
import "./ProfileOnboarding.css";

const skillCategories = {
  Programming: [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "C#",
    "Go",
    "PHP",
    "R",
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "Next.js",
    "REST APIs",
    "Git",
    "GitHub",
  ],

  "Data & AI": [
    "SQL",
    "Excel",
    "Power BI",
    "Tableau",
    "Data Analysis",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Data Visualization",
  ],

  Design: [
    "UI/UX Design",
    "Figma",
    "Graphic Design",
    "Canva",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Prototyping",
  ],

  Business: [
    "Marketing",
    "Digital Marketing",
    "Finance",
    "Sales",
    "Business Analysis",
    "Entrepreneurship",
    "Project Management",
  ],

  "Core & Engineering": [
    "MATLAB",
    "AutoCAD",
    "SolidWorks",
    "Electronics",
    "IoT",
    "Robotics",
    "Embedded Systems",
  ],

  "Soft Skills": [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Presentation",
    "Public Speaking",
    "Time Management",
  ],
};

const allSkills = Object.values(skillCategories).flat();

const interestCategories = {
  "Technology & Software": [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
  ],

  "AI & Data": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Data Analytics",
    "Deep Learning",
    "Natural Language Processing",
  ],

  "Design & Creativity": [
    "UI/UX Design",
    "Graphic Design",
    "Product Design",
    "Animation",
    "Content Creation",
    "Photography",
  ],

  "Business & Entrepreneurship": [
    "Entrepreneurship",
    "Startups",
    "Business Strategy",
    "Product Management",
    "Consulting",
    "Operations",
  ],

  "Marketing & Communication": [
    "Digital Marketing",
    "Social Media",
    "Branding",
    "Content Marketing",
    "Public Relations",
    "Communications",
  ],

  "Research & Innovation": [
    "Scientific Research",
    "Academic Research",
    "Innovation",
    "Emerging Technologies",
    "Research & Development",
  ],

  "Social Impact & Sustainability": [
    "Social Impact",
    "Sustainability",
    "Climate & Environment",
    "Community Development",
    "Non-Profit Work",
    "Education",
  ],

  "Finance & Economics": [
    "Finance",
    "Investment",
    "Economics",
    "FinTech",
    "Accounting",
    "Banking",
  ],

  "Science & Healthcare": [
    "Healthcare",
    "Biotechnology",
    "Medicine",
    "Pharmaceuticals",
    "Life Sciences",
    "Public Health",
  ],

  Engineering: [
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Electronics",
    "Robotics",
    "Automotive",
    "Aerospace",
  ],

  "International Opportunities": [
    "Study Abroad",
    "International Internships",
    "Exchange Programs",
    "Global Fellowships",
    "International Research",
  ],
};

const allInterests = Object.values(interestCategories).flat();

export default function ProfileOnboarding({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Academic
    college: "",
    degree: "",
    branch: "",
    currentYear: "",
    semester: "",
    graduationYear: "",

    // Skills
    selectedSkills: [],
    skillLevels: {},
    learningSkills: [],
    confidence: "",

    // Interests
    selectedInterests: [],
    interestSearch: "",

    // Projects
    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],

    // Certifications
    certifications: [
      {
        name: "",
        organization: "",
        year: "",
        link: "",
      },
    ],

    // Goals
    goal: "",

    // Preferences
    opportunityTypes: [],
    workModes: [],
    preferredLocation: "",
    preferredRoles: [],
    openToOtherDomains: "",
  });

  const [skillSearch, setSkillSearch] = useState("");
  const [learningSearch, setLearningSearch] = useState("");
  const [hasProjects, setHasProjects] = useState("");
  const [hasCertifications, setHasCertifications] = useState("");

  const handleAcademicChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toggleSkill = (skill) => {
    setFormData((previous) => {
      const alreadySelected = previous.selectedSkills.includes(skill);

      if (alreadySelected) {
        const updatedSkills = previous.selectedSkills.filter(
          (item) => item !== skill
        );

        const updatedLevels = { ...previous.skillLevels };
        delete updatedLevels[skill];

        return {
          ...previous,
          selectedSkills: updatedSkills,
          skillLevels: updatedLevels,
        };
      }

      return {
        ...previous,
        selectedSkills: [...previous.selectedSkills, skill],
        skillLevels: {
          ...previous.skillLevels,
          [skill]: "Beginner",
        },
      };
    });
  };

  const removeSkill = (skill) => {
    setFormData((previous) => {
      const updatedLevels = { ...previous.skillLevels };
      delete updatedLevels[skill];

      return {
        ...previous,
        selectedSkills: previous.selectedSkills.filter(
          (item) => item !== skill
        ),
        skillLevels: updatedLevels,
      };
    });
  };

  const handleSkillLevelChange = (skill, level) => {
    setFormData((previous) => ({
      ...previous,
      skillLevels: {
        ...previous.skillLevels,
        [skill]: level,
      },
    }));
  };

  const toggleLearningSkill = (skill) => {
    setFormData((previous) => {
      const alreadyLearning = previous.learningSkills.includes(skill);

      return {
        ...previous,
        learningSkills: alreadyLearning
          ? previous.learningSkills.filter((item) => item !== skill)
          : [...previous.learningSkills, skill],
      };
    });
  };

  const removeLearningSkill = (skill) => {
    setFormData((previous) => ({
      ...previous,
      learningSkills: previous.learningSkills.filter(
        (item) => item !== skill
      ),
    }));
  };

  const toggleInterest = (interest) => {
    setFormData((previous) => {
      const alreadySelected =
        previous.selectedInterests.includes(interest);

      return {
        ...previous,
        selectedInterests: alreadySelected
          ? previous.selectedInterests.filter(
              (item) => item !== interest
            )
          : [...previous.selectedInterests, interest],
      };
    });
  };

  const removeInterest = (interest) => {
    setFormData((previous) => ({
      ...previous,
      selectedInterests: previous.selectedInterests.filter(
        (item) => item !== interest
      ),
    }));
  };

  // -----------------------------
  // PROJECT FUNCTIONS
  // -----------------------------

  const handleProjectChange = (index, field, value) => {
    setFormData((previous) => {
      const updatedProjects = [...previous.projects];

      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };

      return {
        ...previous,
        projects: updatedProjects,
      };
    });
  };

  const addProject = () => {
    setFormData((previous) => ({
      ...previous,
      projects: [
        ...previous.projects,
        {
          title: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    }));
  };

  // -----------------------------
  // CERTIFICATION FUNCTIONS
  // -----------------------------

  const handleCertificationChange = (index, field, value) => {
    setFormData((previous) => {
      const updatedCertifications = [...previous.certifications];

      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [field]: value,
      };

      return {
        ...previous,
        certifications: updatedCertifications,
      };
    });
  };

  const addCertification = () => {
    setFormData((previous) => ({
      ...previous,
      certifications: [
        ...previous.certifications,
        {
          name: "",
          organization: "",
          year: "",
          link: "",
        },
      ],
    }));
  };

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const filteredLearningSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(learningSearch.toLowerCase())
  );

  const filteredInterests = allInterests.filter((interest) =>
    interest
      .toLowerCase()
      .includes(formData.interestSearch.toLowerCase())
  );

  const toggleOpportunityType = (type) => {
    setFormData((previous) => ({
      ...previous,
      opportunityTypes: previous.opportunityTypes.includes(type)
        ? previous.opportunityTypes.filter((item) => item !== type)
        : [...previous.opportunityTypes, type],
    }));
  };

  const toggleWorkMode = (mode) => {
    setFormData((previous) => ({
      ...previous,
      workModes: previous.workModes.includes(mode)
        ? previous.workModes.filter((item) => item !== mode)
        : [...previous.workModes, mode],
    }));
  };

  const togglePreferredRole = (role) => {
    setFormData((previous) => ({
      ...previous,
      preferredRoles: previous.preferredRoles.includes(role)
        ? previous.preferredRoles.filter((item) => item !== role)
        : [...previous.preferredRoles, role],
    }));
  };

  const goToNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep((previous) => previous + 1);
      return;
    }

    console.log("Profile data:", formData);
    alert("Profile saved successfully!");
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    } else {
      onClose();
    }
  };

  // -----------------------------
  // PROGRESS
  // -----------------------------

  const renderProgress = () => {
    const steps = [
      "Academic",
      "Skills",
      "Interests",
      "Projects",
      "Certifications",
      "Goals",
      "Preferences",
    ];

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
  };

  // -----------------------------
  // STEP 1 — ACADEMIC
  // -----------------------------

  const renderAcademicStep = () => {
    return (
      <section className="academic-card">
        <div className="academic-card-heading">
          <div>
            <span className="card-step-label">STEP 1 OF 7</span>

            <h2>Academic Information</h2>

            <p>
              This helps us understand your current academic stage.
            </p>
          </div>

          <div className="academic-leaf">🌿</div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            goToNextStep();
          }}
        >
          <div className="form-field full-width">
            <label htmlFor="college">College / University</label>

            <input
              id="college"
              name="college"
              type="text"
              value={formData.college}
              onChange={handleAcademicChange}
              placeholder="Enter your college or university"
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="degree">Degree</label>

              <select
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleAcademicChange}
                required
              >
                <option value="">Select degree</option>
                <option value="B.Tech">B.Tech</option>
                <option value="B.E.">B.E.</option>
                <option value="B.Sc">B.Sc</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="M.Tech">M.Tech</option>
                <option value="M.E.">M.E.</option>
                <option value="M.Sc">M.Sc</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="branch">Branch / Specialization</label>

              <input
                id="branch"
                name="branch"
                type="text"
                value={formData.branch}
                onChange={handleAcademicChange}
                placeholder="e.g. Computer Science"
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="currentYear">Current Year</label>

              <select
                id="currentYear"
                name="currentYear"
                value={formData.currentYear}
                onChange={handleAcademicChange}
                required
              >
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="semester">Current Semester</label>

              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleAcademicChange}
                required
              >
                <option value="">Select semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
          </div>

          <div className="form-field graduation-field">
            <label htmlFor="graduationYear">Graduation Year</label>

            <select
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleAcademicChange}
              required
            >
              <option value="">Select graduation year</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
            </select>
          </div>

          <div className="onboarding-actions">
            <button
              type="button"
              className="onboarding-secondary-btn"
              onClick={goToPreviousStep}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="onboarding-primary-btn"
            >
              Continue
              <span>→</span>
            </button>
          </div>
        </form>
      </section>
    );
  };

  // -----------------------------
  // STEP 2 — SKILLS
  // -----------------------------

  const renderSkillsStep = () => {
    return (
      <section className="academic-card skills-card">
        <div className="academic-card-heading">
          <div>
            <span className="card-step-label">STEP 2 OF 7</span>

            <h2>Skills & Expertise</h2>

            <p>
              Tell us what you know, what you're learning, and how
              comfortable you are with your skills.
            </p>
          </div>

          <div className="academic-leaf">🌿</div>
        </div>

        <div className="skills-content">
          <div className="skills-section">
            <div className="skills-section-heading">
              <div>
                <label className="skills-label">Your Skills</label>

                <p className="skills-helper">
                  Select the skills you already have.
                </p>
              </div>
            </div>

            <div className="skill-search-wrapper">
              <span className="skill-search-icon">⌕</span>

              <input
                type="text"
                value={skillSearch}
                onChange={(event) =>
                  setSkillSearch(event.target.value)
                }
                placeholder="Search for a skill..."
                className="skill-search-input"
              />
            </div>

            {formData.selectedSkills.length > 0 && (
              <div className="selected-skills">
                {formData.selectedSkills.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    className="skill-pill"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill}
                    <span>×</span>
                  </button>
                ))}
              </div>
            )}

            <div className="skill-options">
              {filteredSkills.slice(0, 18).map((skill) => {
                const isSelected =
                  formData.selectedSkills.includes(skill);

                return (
                  <button
                    type="button"
                    key={skill}
                    className={`skill-option ${
                      isSelected ? "skill-option-selected" : ""
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {isSelected && <span>✓</span>}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {formData.selectedSkills.length > 0 && (
            <div className="skills-section">
              <div className="skills-section-heading">
                <div>
                  <label className="skills-label">
                    Skill Level
                  </label>

                  <p className="skills-helper">
                    Tell us how comfortable you are with each skill.
                  </p>
                </div>
              </div>

              <div className="skill-level-list">
                {formData.selectedSkills.map((skill) => (
                  <div className="skill-level-row" key={skill}>
                    <span className="skill-level-name">{skill}</span>

                    <div className="skill-level-options">
                      {[
                        "Beginner",
                        "Intermediate",
                        "Advanced",
                      ].map((level) => (
                        <button
                          type="button"
                          key={level}
                          className={`skill-level-btn ${
                            formData.skillLevels[skill] === level
                              ? "skill-level-btn-active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSkillLevelChange(skill, level)
                          }
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="skills-section">
            <div className="skills-section-heading">
              <div>
                <label className="skills-label">
                  Currently Learning
                </label>

                <p className="skills-helper">
                  Add skills you're currently working on.
                </p>
              </div>
            </div>

            <div className="skill-search-wrapper">
              <span className="skill-search-icon">+</span>

              <input
                type="text"
                value={learningSearch}
                onChange={(event) =>
                  setLearningSearch(event.target.value)
                }
                placeholder="Search a skill you're learning..."
                className="skill-search-input"
              />
            </div>

            {formData.learningSkills.length > 0 && (
              <div className="selected-skills">
                {formData.learningSkills.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    className="skill-pill learning-skill-pill"
                    onClick={() => removeLearningSkill(skill)}
                  >
                    {skill}
                    <span>×</span>
                  </button>
                ))}
              </div>
            )}

            {learningSearch.trim() !== "" && (
              <div className="skill-options">
                {filteredLearningSkills
                  .filter(
                    (skill) =>
                      !formData.learningSkills.includes(skill)
                  )
                  .slice(0, 10)
                  .map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      className="skill-option"
                      onClick={() => toggleLearningSkill(skill)}
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="skills-section confidence-section">
            <div className="skills-section-heading">
              <div>
                <label className="skills-label">
                  How confident are you with your current skills?
                </label>

                <p className="skills-helper">
                  There is no right answer — this simply helps us
                  understand your starting point.
                </p>
              </div>
            </div>

            <div className="confidence-options">
              {[
                {
                  value: "learning",
                  icon: "🌱",
                  title: "Still learning",
                },
                {
                  value: "comfortable",
                  icon: "🌿",
                  title: "Comfortable",
                },
                {
                  value: "confident",
                  icon: "🌳",
                  title: "Very confident",
                },
              ].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`confidence-option ${
                    formData.confidence === option.value
                      ? "confidence-option-active"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData((previous) => ({
                      ...previous,
                      confidence: option.value,
                    }))
                  }
                >
                  <span className="confidence-icon">
                    {option.icon}
                  </span>

                  <span>{option.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="onboarding-actions">
          <button
            type="button"
            className="onboarding-secondary-btn"
            onClick={goToPreviousStep}
          >
            ← Back
          </button>

          <button
            type="button"
            className="onboarding-primary-btn"
            onClick={goToNextStep}
          >
            Continue
            <span>→</span>
          </button>
        </div>
      </section>
    );
  };

  // -----------------------------
  // STEP 3 — INTERESTS
  // -----------------------------

  const renderInterestsStep = () => {
    return (
      <section className="academic-card interests-card">
        <div className="academic-card-heading">
          <div>
            <span className="card-step-label">STEP 3 OF 7</span>

            <h2>Interests & Exploration</h2>

            <p>
              Tell us what areas you're curious about so we can
              understand what you would like to explore.
            </p>
          </div>

          <div className="academic-leaf">🌿</div>
        </div>

        <div className="skills-content">
          <div className="skills-section">
            <div className="skills-section-heading">
              <div>
                <label className="skills-label">
                  What are you interested in?
                </label>

                <p className="skills-helper">
                  Select as many areas as genuinely interest you.
                </p>
              </div>
            </div>

            <div className="skill-search-wrapper">
              <span className="skill-search-icon">⌕</span>

              <input
                type="text"
                value={formData.interestSearch}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    interestSearch: event.target.value,
                  }))
                }
                placeholder="Search interests..."
                className="skill-search-input"
              />
            </div>

            {formData.selectedInterests.length > 0 && (
              <div className="selected-skills">
                {formData.selectedInterests.map((interest) => (
                  <button
                    type="button"
                    key={interest}
                    className="skill-pill"
                    onClick={() => removeInterest(interest)}
                  >
                    {interest}
                    <span>×</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="interest-options">
            {Object.entries(interestCategories).map(
              ([category, interests]) => {
                const visibleInterests = interests.filter((interest) =>
                  interest
                    .toLowerCase()
                    .includes(formData.interestSearch.toLowerCase())
                );

                if (visibleInterests.length === 0) {
                  return null;
                }

                return (
                  <div className="interest-category" key={category}>
                    <h3>{category}</h3>

                    <div className="skill-options">
                      {visibleInterests.map((interest) => {
                        const isSelected =
                          formData.selectedInterests.includes(
                            interest
                          );

                        return (
                          <button
                            type="button"
                            key={interest}
                            className={`skill-option ${
                              isSelected
                                ? "skill-option-selected"
                                : ""
                            }`}
                            onClick={() =>
                              toggleInterest(interest)
                            }
                          >
                            {isSelected && <span>✓</span>}
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="onboarding-actions">
          <button
            type="button"
            className="onboarding-secondary-btn"
            onClick={goToPreviousStep}
          >
            ← Back
          </button>

          <button
            type="button"
            className="onboarding-primary-btn"
            onClick={goToNextStep}
          >
            Continue
            <span>→</span>
          </button>
        </div>
      </section>
    );
  };

  // -----------------------------
  // STEP 4 — PROJECTS
  // -----------------------------

  const renderProjectsStep = () => {
    return (
      <section className="academic-card projects-card">
        <div className="academic-card-heading">
          <div>
            <span className="card-step-label">STEP 4 OF 7</span>

            <h2>Projects & Experience</h2>

            <p>
              Show us what you've built, explored, or worked on.
            </p>
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
              onClick={() => {
                setHasProjects("yes");
              }}
            >
              <span className="project-radio">
                {hasProjects === "yes" && <span />}
              </span>

              <span className="project-choice-content">
                <strong>Yes, I have projects</strong>

                <small>
                  Add your projects, technical work, or experiences.
                </small>
              </span>
            </button>

            <button
              type="button"
              className={`project-choice ${
                hasProjects === "no" ? "project-choice-active" : ""
              }`}
              onClick={() => {
                setHasProjects("no");
              }}
            >
              <span className="project-radio">
                {hasProjects === "no" && <span />}
              </span>

              <span className="project-choice-content">
                <strong>I'm just getting started</strong>

                <small>
                  No worries — you can add projects later.
                </small>
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
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "title",
                          event.target.value
                        )
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
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "description",
                          event.target.value
                        )
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
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "technologies",
                          event.target.value
                        )
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
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "link",
                          event.target.value
                        )
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

        <div className="onboarding-actions">
          <button
            type="button"
            className="onboarding-secondary-btn"
            onClick={goToPreviousStep}
          >
            ← Back
          </button>

          <button
            type="button"
            className="onboarding-primary-btn"
            onClick={goToNextStep}
          >
            Continue
            <span>→</span>
          </button>
        </div>
      </section>
    );
  };

  // -----------------------------
  // MAIN SCREEN
  // -----------------------------

  return (
    <div className="profile-onboarding">
      <div className="onboarding-sky-glow onboarding-sky-glow-one" />
      <div className="onboarding-sky-glow onboarding-sky-glow-two" />

      <div className="onboarding-container">
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

        <main className="onboarding-main">
          <div className="onboarding-intro">
            <span className="onboarding-eyebrow">
              YOUR JOURNEY STARTS HERE
            </span>

            <h1>Let's build your profile 🌱</h1>

            <p>
              Tell us a little about yourself so we can understand
              where you are starting from.
            </p>
          </div>

          {renderProgress()}

          {currentStep === 1 && renderAcademicStep()}

          {currentStep === 2 && renderSkillsStep()}

          {currentStep === 3 && renderInterestsStep()}

          {currentStep === 4 && renderProjectsStep()}

          {/* STEP 5 — CERTIFICATIONS */}

          {currentStep === 5 && (
            <section className="academic-card">
              <div className="academic-card-heading">
                <div>
                  <span className="card-step-label">STEP 5 OF 7</span>

                  <h2>Certifications</h2>

                  <p>
                    Add certifications, courses, or credentials you've
                    completed.
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
                      hasCertifications === "yes"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() => {
                      setHasCertifications("yes");
                    }}
                  >
                    <span className="project-radio">
                      {hasCertifications === "yes" && <span />}
                    </span>

                    <span className="project-choice-content">
                      <strong>Yes, I have certifications</strong>

                      <small>
                        Add certifications, courses, or credentials
                        you've completed.
                      </small>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`project-choice ${
                      hasCertifications === "no"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() => {
                      setHasCertifications("no");
                    }}
                  >
                    <span className="project-radio">
                      {hasCertifications === "no" && <span />}
                    </span>

                    <span className="project-choice-content">
                      <strong>I'm just getting started</strong>

                      <small>
                        No worries — you can add certifications later.
                      </small>
                    </span>
                  </button>
                </div>

                {hasCertifications === "yes" && (
                  <div className="project-form">
                    {formData.certifications.map(
                      (certification, index) => (
                        <div
                          className="project-fields"
                          key={index}
                        >
                          <div className="project-field">
                            <label
                              htmlFor={`certification-name-${index}`}
                            >
                              Certification Name
                            </label>

                            <input
                              id={`certification-name-${index}`}
                              type="text"
                              value={certification.name}
                              onChange={(event) =>
                                handleCertificationChange(
                                  index,
                                  "name",
                                  event.target.value
                                )
                              }
                              placeholder="e.g. AWS Certified Cloud Practitioner"
                            />
                          </div>

                          <div className="project-field">
                            <label
                              htmlFor={`certification-organization-${index}`}
                            >
                              Issuing Organization
                            </label>

                            <input
                              id={`certification-organization-${index}`}
                              type="text"
                              value={certification.organization}
                              onChange={(event) =>
                                handleCertificationChange(
                                  index,
                                  "organization",
                                  event.target.value
                                )
                              }
                              placeholder="e.g. Amazon Web Services"
                            />
                          </div>

                          <div className="project-field">
                            <label
                              htmlFor={`certification-year-${index}`}
                            >
                              Date / Year
                            </label>

                            <input
                              id={`certification-year-${index}`}
                              type="text"
                              value={certification.year}
                              onChange={(event) =>
                                handleCertificationChange(
                                  index,
                                  "year",
                                  event.target.value
                                )
                              }
                              placeholder="e.g. 2026"
                            />
                          </div>

                          <div className="project-field">
                            <label
                              htmlFor={`certification-link-${index}`}
                            >
                              Credential / Certificate Link
                            </label>

                            <input
                              id={`certification-link-${index}`}
                              type="url"
                              value={certification.link}
                              onChange={(event) =>
                                handleCertificationChange(
                                  index,
                                  "link",
                                  event.target.value
                                )
                              }
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      )
                    )}

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

              <div className="onboarding-actions">
                <button
                  type="button"
                  className="onboarding-secondary-btn"
                  onClick={goToPreviousStep}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  className="onboarding-primary-btn"
                  onClick={goToNextStep}
                >
                  Continue
                  <span>→</span>
                </button>
              </div>
            </section>
          )}

          {/* STEP 6 — GOALS */}

          {currentStep === 6 && (
            <section className="academic-card">
              <div className="academic-card-heading">
                <div>
                  <span className="card-step-label">STEP 6 OF 7</span>

                  <h2>Your Goals</h2>

                  <p>
                    Tell us what you want to achieve so we can
                    personalize your opportunities.
                  </p>
                </div>

                <div className="academic-leaf">🌿</div>
              </div>

              <div className="projects-content">
                <div className="project-question">
                  <h3>What are you mainly looking for?</h3>

                  <button
                    type="button"
                    className={`project-choice ${
                      formData.goal === "internships"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        goal: "internships",
                      }))
                    }
                  >
                    <span className="project-radio">
                      {formData.goal === "internships" && <span />}
                    </span>

                    <span className="project-choice-content">
                      <strong>Find internships</strong>

                      <small>
                        Discover internship opportunities and gain
                        real-world experience.
                      </small>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`project-choice ${
                      formData.goal === "jobs"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        goal: "jobs",
                      }))
                    }
                  >
                    <span className="project-radio">
                      {formData.goal === "jobs" && <span />}
                    </span>

                    <span className="project-choice-content">
                      <strong>Prepare for jobs</strong>

                      <small>
                        Build your profile and discover opportunities
                        for your career.
                      </small>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`project-choice ${
                      formData.goal === "skills"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        goal: "skills",
                      }))
                    }
                  >
                    <span className="project-radio">
                      {formData.goal === "skills" && <span />}
                    </span>

                    <span className="project-choice-content">
                      <strong>Build my skills</strong>

                      <small>
                        Learn new technologies and become more
                        confident in your abilities.
                      </small>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`project-choice ${
                      formData.goal === "explore"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        goal: "explore",
                      }))
                    }
                  >
                    <span className="project-radio">
                      {formData.goal === "explore" && <span />}
                    </span>

                    <span className="project-choice-content">
                      <strong>Explore opportunities</strong>

                      <small>
                        I'm still exploring and want to see what's
                        out there.
                      </small>
                    </span>
                  </button>
                </div>
              </div>

              <div className="onboarding-actions">
                <button
                  type="button"
                  className="onboarding-secondary-btn"
                  onClick={goToPreviousStep}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  className="onboarding-primary-btn"
                  onClick={goToNextStep}
                >
                  Continue
                  <span>→</span>
                </button>
              </div>
            </section>
          )}

          {/* STEP 7 — PREFERENCES */}

          {currentStep === 7 && (
            <section className="academic-card">
              <div className="academic-card-heading">
                <div>
                  <span className="card-step-label">STEP 7 OF 7</span>

                  <h2>Your Preferences</h2>

                  <p>
                    Tell us what kinds of opportunities you'd like to
                    discover.
                  </p>
                </div>

                <div className="academic-leaf">🌿</div>
              </div>

              <div className="projects-content">
                <div className="project-question">
                  <h3>What opportunities interest you?</h3>

                  {[
                    "Internships",
                    "Full-time Jobs",
                    "Hackathons",
                    "Competitions",
                    "Workshops",
                    "Courses",
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`project-choice ${
                        formData.opportunityTypes.includes(type)
                          ? "project-choice-active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleOpportunityType(type)
                      }
                    >
                      <span className="project-radio">
                        {formData.opportunityTypes.includes(type) && (
                          <span />
                        )}
                      </span>

                      <span className="project-choice-content">
                        <strong>{type}</strong>

                        <small>
                          Show me relevant {type.toLowerCase()}.
                        </small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="project-question">
                  <h3>What work mode do you prefer?</h3>

                  {["Remote", "Hybrid", "On-site"].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      className={`project-choice ${
                        formData.workModes.includes(mode)
                          ? "project-choice-active"
                          : ""
                      }`}
                      onClick={() => toggleWorkMode(mode)}
                    >
                      <span className="project-radio">
                        {formData.workModes.includes(mode) && (
                          <span />
                        )}
                      </span>

                      <span className="project-choice-content">
                        <strong>{mode}</strong>

                        <small>
                          Include {mode.toLowerCase()} opportunities
                          in my recommendations.
                        </small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="project-question">
                  <h3>Preferred location</h3>

                  <div className="project-field">
                    <input
                      type="text"
                      value={formData.preferredLocation}
                      onChange={(event) =>
                        setFormData((previous) => ({
                          ...previous,
                          preferredLocation: event.target.value,
                        }))
                      }
                      placeholder="e.g. Bengaluru, Hyderabad, Remote"
                    />
                  </div>
                </div>

                <div className="project-question">
                  <h3>What roles would you like to explore?</h3>

                  {[
                    "Software Development",
                    "Data & AI",
                    "Design",
                    "Product Management",
                    "Marketing",
                    "Finance",
                    "Research",
                  ].map((role) => (
                    <button
                      type="button"
                      key={role}
                      className={`project-choice ${
                        formData.preferredRoles.includes(role)
                          ? "project-choice-active"
                          : ""
                      }`}
                      onClick={() =>
                        togglePreferredRole(role)
                      }
                    >
                      <span className="project-radio">
                        {formData.preferredRoles.includes(role) && (
                          <span />
                        )}
                      </span>

                      <span className="project-choice-content">
                        <strong>{role}</strong>

                        <small>
                          Include opportunities related to this area.
                        </small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="project-question">
                  <h3>
                    Are you open to opportunities outside your selected
                    areas?
                  </h3>

                  <button
                    type="button"
                    className={`project-choice ${
                      formData.openToOtherDomains === "yes"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        openToOtherDomains: "yes",
                      }))
                    }
                  >
                    <span className="project-radio">
                      {formData.openToOtherDomains === "yes" && (
                        <span />
                      )}
                    </span>

                    <span className="project-choice-content">
                      <strong>Yes, show me interesting options</strong>

                      <small>
                        I'm open to discovering opportunities outside
                        my usual interests.
                      </small>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`project-choice ${
                      formData.openToOtherDomains === "no"
                        ? "project-choice-active"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        openToOtherDomains: "no",
                      }))
                    }
                  >
                    <span className="project-radio">
                      {formData.openToOtherDomains === "no" && (
                        <span />
                      )}
                    </span>

                    <span className="project-choice-content">
                      <strong>Keep it focused</strong>

                      <small>
                        Only show opportunities close to my selected
                        areas.
                      </small>
                    </span>
                  </button>
                </div>
              </div>

              <div className="onboarding-actions">
                <button
                  type="button"
                  className="onboarding-secondary-btn"
                  onClick={goToPreviousStep}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  className="onboarding-primary-btn"
                  onClick={goToNextStep}
                >
                  Finish Profile
                  <span>✓</span>
                </button>
              </div>
            </section>
          )}

          <p className="onboarding-note">
            You can update these details later from your profile.
          </p>
        </main>
      </div>
    </div>
  );
}