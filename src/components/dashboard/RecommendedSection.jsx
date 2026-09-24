import { useMemo } from "react";
import RecommendedOpportunityCard from "./RecommendedOpportunityCard";
import { getRecommendedOpportunities } from "../../data/opportunities";

export default function RecommendedSection({ profileData }) {
  // Compute personalized recommendations based on profile
  const opportunities = useMemo(() => {
    return getRecommendedOpportunities(profileData, 6);
  }, [profileData]);

  const hasPreferences =
    profileData?.opportunityTypes?.length > 0 ||
    profileData?.selectedSkills?.length > 0 ||
    profileData?.preferredRoles?.length > 0;

  return (
    <section className="dash-recommended-section">
      <div className="dash-section-header">
        <div className="dash-section-title-wrap">
          <span className="dash-section-eyebrow">✦ RECOMMENDED FOR YOU</span>
          <h2 className="dash-section-title">Picked based on your profile and interests.</h2>
        </div>
        {hasPreferences && (
          <span className="dash-personalized-tag">
            ✓ Filtered for your profile
          </span>
        )}
      </div>

      <div className="dash-recommended-grid">
        {opportunities.map((opp) => (
          <RecommendedOpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>
    </section>
  );
}
