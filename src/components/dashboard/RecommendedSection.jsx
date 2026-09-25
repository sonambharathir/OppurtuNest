import { useState, useMemo } from "react";
import RecommendedOpportunityCard from "./RecommendedOpportunityCard";
import OpportunityModal from "../skillJourney/OpportunityModal";
import { mockOpportunities } from "../../data/opportunities";
import { getPersonalizedRecommendations, checkInterestCoverage } from "../../utils/recommendationUtils";
import { getProfile } from "../../utils/profileStorage";

export default function RecommendedSection({ profileData, onStartOnboarding }) {
  const [selectedOpp, setSelectedOpp] = useState(null);

  // Retrieve stored profile from localStorage if not explicitly passed as prop
  const activeProfile = useMemo(() => {
    return profileData || getProfile();
  }, [profileData]);

  // Compute qualitative personalized recommendations based on profile
  const opportunities = useMemo(() => {
    return getPersonalizedRecommendations(mockOpportunities, activeProfile, 6);
  }, [activeProfile]);

  // Check coverage for student's selected interests
  const interestCoverage = useMemo(() => {
    const interests = activeProfile?.selectedInterests || activeProfile?.domains || [];
    return checkInterestCoverage(interests, mockOpportunities);
  }, [activeProfile]);

  const hasPreferences = Boolean(
    activeProfile &&
    (activeProfile.goals?.length > 0 ||
      activeProfile.opportunityTypes?.length > 0 ||
      activeProfile.selectedSkills?.length > 0 ||
      activeProfile.skills?.length > 0 ||
      activeProfile.preferredRoles?.length > 0 ||
      activeProfile.selectedInterests?.length > 0)
  );

  return (
    <section className="dash-recommended-section">
      <div className="dash-section-header">
        <div className="dash-section-title-wrap">
          <span className="dash-section-eyebrow">✦ RECOMMENDED FOR YOU 🌱</span>
          <h2 className="dash-section-title">Picked based on your profile and interests.</h2>
        </div>
        {hasPreferences && (
          <span className="dash-personalized-tag">
            ✓ Filtered for your profile
          </span>
        )}
      </div>

      {/* Friendly fallback banner if selected interest has no direct sample listings */}
      {hasPreferences && interestCoverage.hasInterests && !interestCoverage.hasAnyMatch && (
        <div
          style={{
            background: "#faf6ee",
            border: "1.5px solid #e2d9c8",
            borderRadius: "14px",
            padding: "12px 18px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#5c503e",
            fontSize: "13.5px",
            lineHeight: "1.4",
          }}
        >
          <span style={{ fontSize: "20px" }}>🌱</span>
          <div>
            <strong>Exploring broader opportunities:</strong> We don&apos;t currently have active sample listings specifically for{" "}
            <span style={{ color: "#2c3d2a", fontWeight: 700 }}>
              {interestCoverage.unmatchedInterests.join(", ")}
            </span>
            . Showing the top recommendations tailored to your skills, goals, and role preferences below!
          </div>
        </div>
      )}

      {!hasPreferences ? (
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid #ded5c2",
            borderRadius: "20px",
            padding: "40px 30px",
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto",
            boxShadow: "0 3px 12px rgba(60, 50, 30, 0.03)",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "10px" }}>🌱</div>
          <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: "20px", color: "#2c3d2a", margin: "0 0 8px" }}>
            Complete your profile to get personalized opportunities 🌱
          </h3>
          <p style={{ color: "#60725c", fontSize: "14px", lineHeight: "1.45", maxWidth: "460px", margin: "0 auto 20px" }}>
            Tell us about your target roles, skills, and opportunity preferences so our system can curate the best matching internships, hackathons, and scholarships for you.
          </p>
          {onStartOnboarding && (
            <button
              type="button"
              className="btn-coral"
              onClick={onStartOnboarding}
              style={{
                background: "#ea655d",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "10px 24px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "Nunito, sans-serif",
                boxShadow: "0 3px 12px rgba(234, 101, 93, 0.25)",
              }}
            >
              Set Up My Profile →
            </button>
          )}
        </div>
      ) : (
        <div className="dash-recommended-grid">
          {opportunities.map((opp) => (
            <RecommendedOpportunityCard
              key={opp.id}
              opportunity={opp}
              onSelectOpportunity={(item) => setSelectedOpp(item)}
            />
          ))}
        </div>
      )}

      {/* Opportunity Modal */}
      {selectedOpp && (
        <OpportunityModal
          opportunity={selectedOpp}
          isOpen={Boolean(selectedOpp)}
          onClose={() => setSelectedOpp(null)}
        />
      )}
    </section>
  );
}
