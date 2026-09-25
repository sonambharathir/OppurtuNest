import { useState } from "react";
import HeroSection from "./components/HeroSection";
import SkillJourneySection from "./components/SkillJourneySection";
import QuickAccessSection from "./components/QuickAccessSection";
import RecommendedOpportunitiesSection from "./components/RecommendedOpportunitiesSection";
import InsightsGrowthSection from "./components/InsightsGrowthSection";
import ProfileOnboarding from "./components/onboarding/ProfileOnboarding";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import SkillMatching from "./pages/SkillMatching";
import SkillGaps from "./pages/SkillGaps";
import SkillGrowth from "./pages/SkillGrowth";
import SkillAssessment from "./pages/SkillAssessment";
import Footer from "./components/Footer";
import ResumeModal from "./components/quickAccess/ResumeModal";
import SkillAnalyzerModal from "./components/quickAccess/SkillAnalyzerModal";
import { getProfile, saveProfile } from "./utils/profileStorage";
import "./App.css";
import "./styles/quickAccessModals.css";

export default function App() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showSkillAnalyzerModal, setShowSkillAnalyzerModal] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [skillJourneyPage, setSkillJourneyPage] = useState(null); // 'skills' | 'matching' | 'gaps' | 'growth' | 'assessment' | null
  const [userProfile, setUserProfile] = useState(() => getProfile());

  // Show onboarding flow
  if (showOnboarding) {
    return (
      <ProfileOnboarding
        onClose={() => {
          setShowOnboarding(false);
        }}
        onComplete={(profileData) => {
          saveProfile(profileData);
          setUserProfile(profileData);
          setShowOnboarding(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  // Show personalized dashboard
  if (showDashboard) {
    return (
      <Dashboard
        profileData={userProfile}
        onBackToHome={() => setShowDashboard(false)}
        onEditProfile={() => {
          setShowDashboard(false);
          setShowProfilePage(true);
        }}
        onNavigateSkillJourney={(tab) => {
          setShowDashboard(false);
          setSkillJourneyPage(tab || "skills");
        }}
      />
    );
  }

  // Show Profile Page
  if (showProfilePage) {
    return (
      <Profile
        profileData={userProfile}
        onNavigateHome={() => setShowProfilePage(false)}
        onEditProfile={() => {
          setShowProfilePage(false);
          setShowOnboarding(true);
        }}
      />
    );
  }

  // Skill Journey Page 1: Your Skills
  if (skillJourneyPage === "skills") {
    return (
      <Skills
        profileData={userProfile}
        onNavigateTab={(tab) => setSkillJourneyPage(tab)}
        onNavigateHome={() => setSkillJourneyPage(null)}
        onNavigateDashboard={() => {
          setSkillJourneyPage(null);
          setShowDashboard(true);
        }}
      />
    );
  }

  // Skill Journey Page 2: Skill Matching
  if (skillJourneyPage === "matching") {
    return (
      <SkillMatching
        profileData={userProfile}
        onNavigateTab={(tab) => setSkillJourneyPage(tab)}
        onNavigateHome={() => setSkillJourneyPage(null)}
        onNavigateDashboard={() => {
          setSkillJourneyPage(null);
          setShowDashboard(true);
        }}
      />
    );
  }

  // Skill Journey Page 3: Skill Gaps
  if (skillJourneyPage === "gaps") {
    return (
      <SkillGaps
        profileData={userProfile}
        onNavigateTab={(tab) => setSkillJourneyPage(tab)}
        onNavigateHome={() => setSkillJourneyPage(null)}
        onNavigateDashboard={() => {
          setSkillJourneyPage(null);
          setShowDashboard(true);
        }}
      />
    );
  }

  // Skill Journey Page 4: Growth
  if (skillJourneyPage === "growth") {
    return (
      <SkillGrowth
        profileData={userProfile}
        onNavigateTab={(tab) => setSkillJourneyPage(tab)}
        onNavigateHome={() => setSkillJourneyPage(null)}
        onNavigateDashboard={() => {
          setSkillJourneyPage(null);
          setShowDashboard(true);
        }}
      />
    );
  }

  // Quick Skill Assessment
  if (skillJourneyPage === "assessment") {
    return (
      <SkillAssessment
        profileData={userProfile}
        onNavigateTab={(tab) => setSkillJourneyPage(tab)}
        onNavigateHome={() => setSkillJourneyPage(null)}
        onNavigateDashboard={() => {
          setSkillJourneyPage(null);
          setShowDashboard(true);
        }}
      />
    );
  }

  // Default Homepage (Untouched visual design)
  return (
    <div className="storybook-app-container">
      {/* 1. First Viewport: Hero ending at the Lake */}
      <HeroSection
        hasProfile={Boolean(userProfile)}
        onStartJourney={() => setShowOnboarding(true)}
        onOpenDashboard={() => setShowDashboard(true)}
      />

      {/* 2. Scroll Sections: Continuous Landscape Journey */}
      <div className="continuous-landscape-body">
        {/* Section 1: Your Skill Journey */}
        <SkillJourneySection
          onSelectStep={(step) => setSkillJourneyPage(step)}
        />

        {/* Section 2: Quick Access */}
        <QuickAccessSection
          onStartAssessment={() => setSkillJourneyPage("assessment")}
          onOpenResume={() => setShowResumeModal(true)}
          onOpenSkillAnalyzer={() => setShowSkillAnalyzerModal(true)}
        />

        {/* Section 3: Recommended Opportunities */}
        <RecommendedOpportunitiesSection
          userProfile={userProfile}
          uploadedResume={uploadedResume}
          onOpenResume={() => setShowResumeModal(true)}
          onStartJourney={() => setShowOnboarding(true)}
        />

        {/* Section 4: Your Insights & Growth */}
        <InsightsGrowthSection
          userProfile={userProfile}
          uploadedResume={uploadedResume}
          onOpenResume={() => setShowResumeModal(true)}
          onStartJourney={() => setShowOnboarding(true)}
        />

        {/* Footer */}
        <Footer />
      </div>

      {/* Quick Access Modals */}
      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        currentResume={uploadedResume}
        onResumeAnalyzed={(data) => setUploadedResume(data)}
      />
      <SkillAnalyzerModal
        isOpen={showSkillAnalyzerModal}
        onClose={() => setShowSkillAnalyzerModal(false)}
        onNavigateSkillJourney={(tab) => setSkillJourneyPage(tab)}
        uploadedResume={uploadedResume}
        onOpenResumeUpload={() => {
          setShowSkillAnalyzerModal(false);
          setShowResumeModal(true);
        }}
      />
    </div>
  );
}