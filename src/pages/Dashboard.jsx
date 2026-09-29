import { useState, useEffect } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import OpportunityCategories from "../components/dashboard/OpportunityCategories";
import RecommendedSection from "../components/dashboard/RecommendedSection";
import CategoryOpportunitiesModal from "../components/quickAccess/CategoryOpportunitiesModal";
import ResumeModal from "../components/quickAccess/ResumeModal";
import { getProfile, getResume, saveResume } from "../utils/profileStorage";
import "../styles/dashboard.css";

export default function Dashboard({
  profileData,
  uploadedResume,
  onBackToHome,
  onEditProfile,
  onNavigateSkillJourney,
  onLogout,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [activeResume, setActiveResume] = useState(() => uploadedResume || getResume());
  const [activeProfile, setActiveProfile] = useState(() => profileData || getProfile());

  useEffect(() => {
    if (uploadedResume) setActiveResume(uploadedResume);
  }, [uploadedResume]);

  useEffect(() => {
    if (profileData) setActiveProfile(profileData);
  }, [profileData]);

  const handleResumeAnalyzed = (resumeData) => {
    saveResume(resumeData);
    setActiveResume(resumeData);
    const updated = getProfile();
    if (updated) setActiveProfile(updated);
  };

  const handleSelectCategory = (category) => {
    const title = typeof category === "string" ? category : category?.title || category?.name;
    setSelectedCategory(title);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-inner-container">
        {/* Personalized Welcome Header */}
        <DashboardHeader
          profileData={activeProfile}
          onBackToHome={onBackToHome}
          onEditProfile={onEditProfile}
          onNavigateSkillJourney={onNavigateSkillJourney}
          onLogout={onLogout}
        />

        <main className="dashboard-main-content">
          {/* Explore: 7 Compact Opportunity Categories */}
          <OpportunityCategories onSelectCategory={handleSelectCategory} />

          {/* Personalized Recommendations Section */}
          <RecommendedSection
            profileData={activeProfile}
            uploadedResume={activeResume}
            onStartOnboarding={onEditProfile}
            onOpenResume={() => setShowResumeModal(true)}
          />
        </main>
      </div>

      {/* Category Modal if user clicks on a category in dashboard */}
      {selectedCategory && (
        <CategoryOpportunitiesModal
          isOpen={Boolean(selectedCategory)}
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          userProfile={activeProfile}
          uploadedResume={activeResume}
          onOpenResume={() => setShowResumeModal(true)}
        />
      )}

      {/* Resume Upload Modal in Dashboard */}
      {showResumeModal && (
        <ResumeModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
          currentResume={activeResume}
          onResumeAnalyzed={handleResumeAnalyzed}
        />
      )}
    </div>
  );
}