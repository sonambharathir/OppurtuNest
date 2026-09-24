import { useState } from "react";
import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import SkillOpportunityCard from "../components/skillJourney/SkillOpportunityCard";
import OpportunityModal from "../components/skillJourney/OpportunityModal";
import { matchedOpportunities } from "../data/skillJourneyData";
import "../styles/skillJourney.css";

export default function SkillMatching({
  profileData,
  onNavigateTab,
  onNavigateHome,
  onNavigateDashboard,
}) {
  const [matchFilter, setMatchFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter opportunities based on qualitative match tier and category
  const filteredOpportunities = matchedOpportunities.filter((opp) => {
    const matchesTier =
      matchFilter === "all" ||
      opp.matchLabel.toLowerCase().includes(matchFilter.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      opp.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesTier && matchesCategory;
  });

  const handleViewOpportunity = (opp) => {
    setSelectedOpportunity(opp);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOpportunity(null);
  };

  return (
    <div className="skill-journey-page">
      <div className="skill-journey-container">
        <SkillJourneyHeader
          activeTab="matching"
          onTabChange={onNavigateTab}
          onBackToHome={onNavigateHome}
          onBackToDashboard={onNavigateDashboard}
          title="Skill Matching"
          subtitle="Explore curated opportunities aligned with your current skills and technologies."
        />

        <main className="matching-main-content">
          {/* Top Filter and Info Bar */}
          <div className="matching-controls-bar">
            <div className="matching-filter-group">
              <span className="filter-label">Match Level:</span>
              <div className="filter-pills">
                {[
                  { id: "all", label: "All Matches" },
                  { id: "strong", label: "Strong Match" },
                  { id: "good", label: "Good Match" },
                  { id: "skill", label: "Skill Match" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`filter-pill-btn ${
                      matchFilter === f.id ? "active" : ""
                    }`}
                    onClick={() => setMatchFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="matching-filter-group">
              <span className="filter-label">Category:</span>
              <div className="filter-pills">
                {[
                  { id: "all", label: "All Categories" },
                  { id: "internship", label: "Internships" },
                  { id: "hackathon", label: "Hackathons" },
                  { id: "workshop", label: "Workshops" },
                  { id: "competition", label: "Competitions" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`filter-pill-btn ${
                      categoryFilter === cat.id ? "active" : ""
                    }`}
                    onClick={() => setCategoryFilter(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="matching-summary-row">
            <span className="matching-count-tag">
              🎯 {filteredOpportunities.length} opportunities matching {profileData?.studentName ? `${profileData.studentName}'s` : "your"} profile
            </span>
            <span className="matching-engine-note">
              Based on qualitative skill overlap • Connects with backend matching engine
            </span>
          </div>

          {/* Opportunities Cards Grid */}
          {filteredOpportunities.length > 0 ? (
            <div className="matching-grid">
              {filteredOpportunities.map((opportunity) => (
                <SkillOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onView={handleViewOpportunity}
                />
              ))}
            </div>
          ) : (
            <div className="growth-empty-card">
              <div className="growth-empty-icon">🍃</div>
              <h3 className="growth-empty-title">No opportunities found for this filter</h3>
              <p className="growth-empty-text">
                Try switching your filter above, or add new skills to your profile to expand your match results.
              </p>
              <button
                type="button"
                className="add-skill-trigger-btn"
                onClick={() => {
                  setMatchFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>

        {/* Opportunity Detail Modal */}
        <OpportunityModal
          opportunity={selectedOpportunity}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
