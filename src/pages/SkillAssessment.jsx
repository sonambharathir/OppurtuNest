import { useState, useEffect } from "react";
import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import AssessmentIntro from "../components/assessment/AssessmentIntro";
import SkillAreaSelector from "../components/assessment/SkillAreaSelector";
import AssessmentProgress from "../components/assessment/AssessmentProgress";
import AssessmentQuestion from "../components/assessment/AssessmentQuestion";
import AssessmentResults from "../components/assessment/AssessmentResults";
import {
  assessmentSkillAreas,
  assessmentQuestionsByArea,
  calculateAssessmentResults,
} from "../data/assessmentQuestions";
import { getProfile, saveProfile, getCurrentUser } from "../utils/profileStorage";
import { updateCurrentStudentAssessment, getSkillMatchingWithProfile } from "../utils/api";
import "../styles/skillJourney.css";

export default function SkillAssessment({
  profileData,
  onNavigateTab,
  onNavigateHome,
  onNavigateDashboard,
}) {
  const [step, setStep] = useState("welcome"); // "welcome" | "select_area" | "questions" | "results"
  const [selectedAreaId, setSelectedAreaId] = useState("web-dev");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentResults, setAssessmentResults] = useState(null);

  // Active skill area metadata
  const currentArea =
    assessmentSkillAreas.find((a) => a.id === selectedAreaId) ||
    assessmentSkillAreas[0];

  // Active question list (exactly 12 questions)
  const questions = assessmentQuestionsByArea[selectedAreaId] || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Handlers
  const handleStartWelcome = () => {
    setStep("select_area");
  };

  const handleContinueFromArea = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep("questions");
  };

  const handleSelectAnswer = (optionIndex) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setStep("select_area");
    }
  };

  const handleNextQuestion = async () => {
    if (isLastQuestion) {
      // Calculate authentic qualitative results from user's answers
      const results = calculateAssessmentResults(selectedAreaId, answers);

      // Fetch real matching opportunities for the assessed skill area from MongoDB
      const activeProfile = profileData || getProfile() || {};
      const assessedSkills = results.snapshot.map((s) => s.skill);
      const tempProfile = {
        ...activeProfile,
        skills: Array.from(new Set([...(activeProfile.skills || []), ...assessedSkills])),
      };

      try {
        const realMatches = await getSkillMatchingWithProfile(tempProfile, { limit: 3 });
        if (Array.isArray(realMatches) && realMatches.length > 0) {
          results.opportunities = realMatches;
        }
      } catch (e) {
        console.warn("[SkillAssessment] Could not fetch real matching opportunities:", e.message);
      }

      setAssessmentResults(results);
      setStep("results");

      // Save to localStorage
      const updatedProfile = {
        ...activeProfile,
        assessmentResults: results,
        assessmentSkills: Array.from(
          new Set([...(activeProfile.assessmentSkills || []), ...assessedSkills])
        ),
      };
      saveProfile(updatedProfile);

      // Save to backend MongoDB if logged in
      const currentUser = getCurrentUser();
      if (currentUser) {
        try {
          await updateCurrentStudentAssessment(results);
        } catch (err) {
          console.warn("[SkillAssessment] Could not save assessment to backend:", err.message);
        }
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setAssessmentResults(null);
    setStep("select_area");
  };

  return (
    <div className="skill-journey-page assessment-page">
      <div className="skill-journey-container">
        {/* Navigation & Header */}
        <SkillJourneyHeader
          activeTab={step === "results" ? "growth" : "assessment"}
          onTabChange={onNavigateTab}
          onBackToHome={onNavigateHome}
          onBackToDashboard={onNavigateDashboard}
          eyebrow="QUICK SKILL ASSESSMENT"
          title="Quick Skill Assessment"
          subtitle="Discover where your skills stand and what you could develop next."
        />

        <main className="assessment-main-content">
          {/* STEP 1: Welcome Screen */}
          {step === "welcome" && (
            <AssessmentIntro
              onStart={handleStartWelcome}
              onBackToHome={onNavigateHome}
            />
          )}

          {/* STEP 2: Choose Skill Area */}
          {step === "select_area" && (
            <SkillAreaSelector
              selectedAreaId={selectedAreaId}
              onSelectArea={setSelectedAreaId}
              onContinue={handleContinueFromArea}
              onBack={() => setStep("welcome")}
            />
          )}

          {/* STEP 3: 12-Question Check-in */}
          {step === "questions" && currentQuestion && (
            <div className="assessment-question-flow">
              <AssessmentProgress
                currentIndex={currentQuestionIndex}
                totalCount={questions.length}
                skillAreaTitle={currentArea.title}
              />

              <AssessmentQuestion
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                selectedAnswer={answers[currentQuestion.id]}
                onSelectAnswer={handleSelectAnswer}
                onNext={handleNextQuestion}
                onPrev={handlePrevQuestion}
                isLastQuestion={isLastQuestion}
              />
            </div>
          )}

          {/* STEP 4: Results (Snapshot, Skills Worth Developing, Opportunities, Final Actions) */}
          {step === "results" && assessmentResults && (
            <AssessmentResults
              results={assessmentResults}
              onNavigateTab={onNavigateTab}
              onBackToHome={onNavigateHome}
              onRetake={handleRetake}
            />
          )}
        </main>
      </div>
    </div>
  );
}
