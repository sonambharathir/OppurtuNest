import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import OpportunityCategories from "../components/dashboard/OpportunityCategories";
import RecommendedSection from "../components/dashboard/RecommendedSection";
import CategoryOpportunitiesModal from "../components/quickAccess/CategoryOpportunitiesModal";
import { getProfile } from "../utils/profileStorage";
import "../styles/dashboard.css";

export default function Dashboard({
  profileData,
  onBackToHome,
  onEditProfile,
  onNavigateSkillJourney,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Read stored profile from localStorage if not provided via props
  const activeProfile = profileData || getProfile();

  const handleSelectCategory = (category) => {
    if (category.id === "certifications" && onNavigateSkillJourney) {
      onNavigateSkillJourney("skills");
    } else {
      setSelectedCategory(category.title);
    }
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
        />

        <main className="dashboard-main-content">
          {/* Explore: 7 Compact Opportunity Categories */}
          <OpportunityCategories onSelectCategory={handleSelectCategory} />

          {/* Personalized Recommendations Section */}
          <RecommendedSection
            profileData={activeProfile}
            onStartOnboarding={onEditProfile}
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
          onOpenResume={onEditProfile}
        />
      )}
    </div>
  );
}