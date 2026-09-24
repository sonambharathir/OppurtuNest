import { useState } from "react";
import OnboardingHeader from "./OnboardingHeader";
import OnboardingProgress from "./OnboardingProgress";
import Step1Academic from "./Step1Academic";
import Step2Skills from "./Step2Skills";
import Step3Interests from "./Step3Interests";
import Step4Projects from "./Step4Projects";
import Step5Certifications from "./Step5Certifications";
import Step6Goals from "./Step6Goals";
import Step7Preferences from "./Step7Preferences";
import ProfileCompletion from "./ProfileCompletion";
import { allSkills, initialFormData } from "../../data/onboardingData";
import "../ProfileOnboarding.css";

export default function ProfileOnboarding({ onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [skillSearch, setSkillSearch] = useState("");
  const [learningSearch, setLearningSearch] = useState("");
  const [hasProjects, setHasProjects] = useState("");
  const [hasCertifications, setHasCertifications] = useState("");

  const handleAcademicChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedSkills.includes(skill);

      if (alreadySelected) {
        const updatedSkills = prev.selectedSkills.filter((item) => item !== skill);
        const updatedLevels = { ...prev.skillLevels };
        delete updatedLevels[skill];

        return {
          ...prev,
          selectedSkills: updatedSkills,
          skillLevels: updatedLevels,
        };
      }

      return {
        ...prev,
        selectedSkills: [...prev.selectedSkills, skill],
        skillLevels: {
          ...prev.skillLevels,
          [skill]: "Beginner",
        },
      };
    });
  };

  const removeSkill = (skill) => {
    setFormData((prev) => {
      const updatedLevels = { ...prev.skillLevels };
      delete updatedLevels[skill];

      return {
        ...prev,
        selectedSkills: prev.selectedSkills.filter((item) => item !== skill),
        skillLevels: updatedLevels,
      };
    });
  };

  const handleSkillLevelChange = (skill, level) => {
    setFormData((prev) => ({
      ...prev,
      skillLevels: {
        ...prev.skillLevels,
        [skill]: level,
      },
    }));
  };

  const toggleLearningSkill = (skill) => {
    setFormData((prev) => {
      const alreadyLearning = prev.learningSkills.includes(skill);

      return {
        ...prev,
        learningSkills: alreadyLearning
          ? prev.learningSkills.filter((item) => item !== skill)
          : [...prev.learningSkills, skill],
      };
    });
  };

  const removeLearningSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      learningSkills: prev.learningSkills.filter((item) => item !== skill),
    }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedInterests.includes(interest);

      return {
        ...prev,
        selectedInterests: alreadySelected
          ? prev.selectedInterests.filter((item) => item !== interest)
          : [...prev.selectedInterests, interest],
      };
    });
  };

  const removeInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.filter((item) => item !== interest),
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };

      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    }));
  };

  const handleCertificationChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedCertifications = [...prev.certifications];
      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [field]: value,
      };

      return {
        ...prev,
        certifications: updatedCertifications,
      };
    });
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          organization: "",
          year: "",
          link: "",
        },
      ],
    }));
  };

  const toggleOpportunityType = (type) => {
    setFormData((prev) => ({
      ...prev,
      opportunityTypes: prev.opportunityTypes.includes(type)
        ? prev.opportunityTypes.filter((item) => item !== type)
        : [...prev.opportunityTypes, type],
    }));
  };

  const toggleWorkMode = (mode) => {
    setFormData((prev) => ({
      ...prev,
      workModes: prev.workModes.includes(mode)
        ? prev.workModes.filter((item) => item !== mode)
        : [...prev.workModes, mode],
    }));
  };

  const togglePreferredRole = (role) => {
    setFormData((prev) => ({
      ...prev,
      preferredRoles: prev.preferredRoles.includes(role)
        ? prev.preferredRoles.filter((item) => item !== role)
        : [...prev.preferredRoles, role],
    }));
  };

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const filteredLearningSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(learningSearch.toLowerCase())
  );

  const goToNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleFinishProfile = () => {
    // Show in-page completion screen (no browser alert!)
    setIsCompleted(true);
  };

  const handleProceedToDashboard = () => {
    if (onComplete) {
      onComplete(formData);
    } else if (onClose) {
      onClose(formData);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      if (onClose) onClose();
    }
  };

  return (
    <div className="profile-onboarding">
      <div className="onboarding-sky-glow onboarding-sky-glow-one" />
      <div className="onboarding-sky-glow onboarding-sky-glow-two" />

      <div className="onboarding-container">
        <OnboardingHeader onClose={onClose} />

        <main className="onboarding-main">
          {!isCompleted && (
            <>
              <div className="onboarding-intro">
                <span className="onboarding-eyebrow">
                  YOUR JOURNEY STARTS HERE
                </span>
                <h1>Let's build your profile 🌱</h1>
                <p>
                  Tell us a little about yourself so we can understand where you
                  are starting from.
                </p>
              </div>

              <OnboardingProgress currentStep={currentStep} />
            </>
          )}

          {/* Steps Rendering */}
          {!isCompleted && currentStep === 1 && (
            <Step1Academic
              formData={formData}
              onChange={handleAcademicChange}
              onNext={goToNextStep}
              onCancel={goToPreviousStep}
            />
          )}

          {!isCompleted && currentStep === 2 && (
            <Step2Skills
              formData={formData}
              setFormData={setFormData}
              skillSearch={skillSearch}
              setSkillSearch={setSkillSearch}
              filteredSkills={filteredSkills}
              toggleSkill={toggleSkill}
              removeSkill={removeSkill}
              handleSkillLevelChange={handleSkillLevelChange}
              learningSearch={learningSearch}
              setLearningSearch={setLearningSearch}
              filteredLearningSkills={filteredLearningSkills}
              toggleLearningSkill={toggleLearningSkill}
              removeLearningSkill={removeLearningSkill}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          )}

          {!isCompleted && currentStep === 3 && (
            <Step3Interests
              formData={formData}
              setFormData={setFormData}
              toggleInterest={toggleInterest}
              removeInterest={removeInterest}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          )}

          {!isCompleted && currentStep === 4 && (
            <Step4Projects
              formData={formData}
              hasProjects={hasProjects}
              setHasProjects={setHasProjects}
              handleProjectChange={handleProjectChange}
              addProject={addProject}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          )}

          {!isCompleted && currentStep === 5 && (
            <Step5Certifications
              formData={formData}
              hasCertifications={hasCertifications}
              setHasCertifications={setHasCertifications}
              handleCertificationChange={handleCertificationChange}
              addCertification={addCertification}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          )}

          {!isCompleted && currentStep === 6 && (
            <Step6Goals
              formData={formData}
              setFormData={setFormData}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          )}

          {!isCompleted && currentStep === 7 && (
            <Step7Preferences
              formData={formData}
              setFormData={setFormData}
              toggleOpportunityType={toggleOpportunityType}
              toggleWorkMode={toggleWorkMode}
              togglePreferredRole={togglePreferredRole}
              onBack={goToPreviousStep}
              onFinish={handleFinishProfile}
            />
          )}

          {/* Profile Completion Screen */}
          {isCompleted && (
            <ProfileCompletion
              formData={formData}
              onProceedToDashboard={handleProceedToDashboard}
            />
          )}

          {!isCompleted && (
            <p className="onboarding-note">
              You can update these details later from your profile.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
