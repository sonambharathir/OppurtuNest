import { useState } from "react";
import HeroSection from "./components/HeroSection";
import SkillJourneySection from "./components/SkillJourneySection";
import QuickAccessSection from "./components/QuickAccessSection";
import RecommendedOpportunitiesSection from "./components/RecommendedOpportunitiesSection";
import InsightsGrowthSection from "./components/InsightsGrowthSection";
import ProfileOnboarding from "./components/onboarding/ProfileOnboarding";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Show onboarding flow
  if (showOnboarding) {
    return (
      <ProfileOnboarding
        onClose={() => {
          setShowOnboarding(false);
        }}
        onComplete={(profileData) => {
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
          setShowOnboarding(true);
        }}
      />
    );
  }

  // Default Homepage (Untouched)
  return (
    <div className="storybook-app-container">
      {/* 1. First Viewport: Hero ending at the Lake */}
      <HeroSection
        onStartJourney={() => setShowOnboarding(true)}
      />

      {/* 2. Scroll Sections: Continuous Landscape Journey */}
      <div className="continuous-landscape-body">
        {/* Section 1: Your Skill Journey */}
        <SkillJourneySection />

        {/* Section 2: Quick Access */}
        <QuickAccessSection />

        {/* Section 3: Recommended Opportunities */}
        <RecommendedOpportunitiesSection />

        {/* Section 4: Your Insights & Growth */}
        <InsightsGrowthSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}