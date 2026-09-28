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
import CategoryOpportunitiesModal from "./components/quickAccess/CategoryOpportunitiesModal";
import AuthModal from "./components/auth/AuthModal";
import {
  getProfile,
  saveProfile,
  getCurrentUser,
  saveCurrentUser,
  logoutUserSession,
  saveUserToVault,
} from "./utils/profileStorage";
import "./App.css";
import "./styles/quickAccessModals.css";

export default function App() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showSkillAnalyzerModal, setShowSkillAnalyzerModal] = useState(false);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [skillJourneyPage, setSkillJourneyPage] = useState(null); // 'skills' | 'matching' | 'gaps' | 'growth' | 'assessment' | null

  // Current authenticated user session
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  // User profile: only active if a user is logged in
  const [userProfile, setUserProfile] = useState(() => {
    const user = getCurrentUser();
    return user ? getProfile() : null;
  });

  const handleAuthSuccess = (user, profile) => {
    setCurrentUser(user);
    setUserProfile(profile);
    if (profile && (profile.degree || profile.selectedSkills?.length > 0)) {
      setShowDashboard(true);
    }
  };

  const handleLogout = () => {
    logoutUserSession();
    setCurrentUser(null);
    setUserProfile(null);
    setUploadedResume(null);
    setShowDashboard(false);
    setShowProfilePage(false);
    setSkillJourneyPage(null);
    setShowOnboarding(false);
  };

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
          if (currentUser) {
            const updated = {
              ...currentUser,
              name: profileData.name || profileData.studentName || currentUser.name,
              profile: profileData,
            };
            saveCurrentUser(updated);
            saveUserToVault(updated);
            setCurrentUser(updated);
          }
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
        onLogout={handleLogout}
      />
    );
  }

  // Show Profile Page
  if (showProfilePage) {
    return (
      <Profile
        profileData={userProfile}
        currentUser={currentUser}
        onNavigateHome={() => setShowProfilePage(false)}
        onEditProfile={() => {
          setShowProfilePage(false);
          setShowOnboarding(true);
        }}
        onLogout={handleLogout}
        onOpenLogin={() => setShowAuthModal(true)}
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
        currentUser={currentUser}
        onOpenLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onOpenProfile={() => setShowProfilePage(true)}
        onStartJourney={() => {
          if (!currentUser) {
            setShowAuthModal(true);
          } else {
            setShowOnboarding(true);
          }
        }}
        onOpenDashboard={() => setShowDashboard(true)}
        onSelectCategory={(catName) => setSelectedCategoryModal(catName)}
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
          onStartJourney={() => {
            if (!currentUser) {
              setShowAuthModal(true);
            } else {
              setShowOnboarding(true);
            }
          }}
        />

        {/* Section 4: Your Insights & Growth */}
        <InsightsGrowthSection
          userProfile={userProfile}
          uploadedResume={uploadedResume}
          onOpenResume={() => setShowResumeModal(true)}
          onStartJourney={() => {
            if (!currentUser) {
              setShowAuthModal(true);
            } else {
              setShowOnboarding(true);
            }
          }}
        />

        {/* Footer */}
        <Footer />
      </div>

      {/* Category Opportunities Modal when browsing from Home */}
      {selectedCategoryModal && (
        <CategoryOpportunitiesModal
          isOpen={Boolean(selectedCategoryModal)}
          category={selectedCategoryModal}
          onClose={() => setSelectedCategoryModal(null)}
          userProfile={userProfile}
          uploadedResume={uploadedResume}
          onOpenResume={() => setShowResumeModal(true)}
        />
      )}

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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}