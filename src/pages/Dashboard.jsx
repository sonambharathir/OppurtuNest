import DashboardHeader from "../components/dashboard/DashboardHeader";
import OpportunityCategories from "../components/dashboard/OpportunityCategories";
import RecommendedSection from "../components/dashboard/RecommendedSection";
import "../styles/dashboard.css";

export default function Dashboard({
  profileData,
  onBackToHome,
  onEditProfile,
  onNavigateSkillJourney,
}) {
  const handleSelectCategory = (category) => {
    console.log("Selected category:", category.name);
    if (category.id === "certifications" && onNavigateSkillJourney) {
      onNavigateSkillJourney("skills");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-inner-container">
        {/* Personalized Welcome Header */}
        <DashboardHeader
          profileData={profileData}
          onBackToHome={onBackToHome}
          onEditProfile={onEditProfile}
          onNavigateSkillJourney={onNavigateSkillJourney}
        />

        <main className="dashboard-main-content">
          {/* Explore: 7 Compact Opportunity Categories */}
          <OpportunityCategories onSelectCategory={handleSelectCategory} />

          {/* Personalized Recommendations Section */}
          <RecommendedSection profileData={profileData} />
        </main>
      </div>
    </div>
  );
}