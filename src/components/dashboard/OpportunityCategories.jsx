import { useState, useEffect } from "react";
import OpportunityCategoryCard from "./OpportunityCategoryCard";
import { opportunityCategories } from "../../data/opportunityCategories";
import { getOpportunityCounts } from "../../utils/api";

export default function OpportunityCategories({ onSelectCategory }) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let isMounted = true;
    getOpportunityCounts()
      .then((data) => {
        if (isMounted && data) {
          setCounts(data);
        }
      })
      .catch((err) => {
        // Fall back gracefully to the pre-set counts in opportunityCategories
        console.warn("Could not fetch live category counts, using defaults:", err?.message);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="dash-explore-section">
      <div className="dash-section-header">
        <div className="dash-section-title-wrap">
          <span className="dash-section-eyebrow">EXPLORE OPPORTUNITIES</span>
          <h2 className="dash-section-title">Explore by Category</h2>
        </div>
        <p className="dash-section-caption">
          Browse the 7 core pathways curated for engineering students.
        </p>
      </div>

      {/* Balanced 7-card composition with Certifications in the center */}
      <div className="dash-categories-container">
        {opportunityCategories.map((category) => {
          const liveCount =
            counts[category.title] ??
            counts[category.id] ??
            counts[category.title.toLowerCase()];

          return (
            <OpportunityCategoryCard
              key={category.id}
              category={category}
              count={liveCount}
              onSelect={onSelectCategory}
            />
          );
        })}
      </div>
    </section>
  );
}
