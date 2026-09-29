import { useState, useEffect, useCallback } from "react";
import SkillJourneyHeader from "../components/skillJourney/SkillJourneyHeader";
import SkillOpportunityCard from "../components/skillJourney/SkillOpportunityCard";
import OpportunityModal from "../components/skillJourney/OpportunityModal";
import { getProfile, getCurrentUser } from "../utils/profileStorage";
import { getCurrentStudentSkillMatching, getSkillMatchingWithProfile } from "../utils/api";
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
  const [matchingOpportunities, setMatchingOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchMatches = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const activeProfile = profileData || getProfile();
      const currentUser = getCurrentUser();

      let data = [];
      if (currentUser) {
        data = await getCurrentStudentSkillMatching({ matchFilter, categoryFilter });
      } else if (activeProfile) {
        data = await getSkillMatchingWithProfile(activeProfile, { matchFilter, categoryFilter });
      }

      if (Array.isArray(data)) {
        setMatchingOpportunities(data);
      } else {
        setMatchingOpportunities([]);
      }
    } catch (err) {
      console.error("[SkillMatching] Error fetching matches:", err.message);
      setHasError(true);
      setMatchingOpportunities([]);
    } finally {
      setIsLoading(false);
    }
  }, [profileData, matchFilter, categoryFilter]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleViewOpportunity = (opp) => {
    setSelectedOpportunity(opp);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOpportunity(null);
  };

  const studentName = profileData?.studentName || profileData?.name || "";

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
              🎯 {matchingOpportunities.length} opportunities matching {studentName ? `${studentName}'s` : "your"} profile
            </span>
            <span className="matching-engine-note">
              Based on real skill overlap • Live backend matching engine
            </span>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#60725c", fontSize: "14px" }}>
              🌱 Calculating real opportunity matches for your skill profile...
            </div>
          )}

          {/* Error State */}
          {!isLoading && hasError && (
            <div className="growth-empty-card">
              <div className="growth-empty-icon">⚠️</div>
              <h3 className="growth-empty-title">Unable to load matches right now</h3>
              <p className="growth-empty-text">
                Please check that the backend server is running and try again.
              </p>
              <button
                type="button"
                className="add-skill-trigger-btn"
                onClick={fetchMatches}
              >
                Retry ↻
              </button>
            </div>
          )}

          {/* Opportunities Cards Grid */}
          {!isLoading && !hasError && matchingOpportunities.length > 0 && (
            <div className="matching-grid">
              {matchingOpportunities.map((opportunity) => (
                <SkillOpportunityCard
                  key={opportunity.id || opportunity._id}
                  opportunity={opportunity}
                  onView={handleViewOpportunity}
                />
              ))}
            </div>
          )}

          {/* Clean Empty State */}
          {!isLoading && !hasError && matchingOpportunities.length === 0 && (
            <div className="growth-empty-card">
              <div className="growth-empty-icon">🍃</div>
              <h3 className="growth-empty-title">No matching opportunities found for this filter</h3>
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
