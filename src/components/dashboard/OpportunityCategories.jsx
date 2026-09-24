import OpportunityCategoryCard from "./OpportunityCategoryCard";
import { opportunityCategories } from "../../data/opportunityCategories";

export default function OpportunityCategories({ onSelectCategory }) {
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
        {opportunityCategories.map((category) => (
          <OpportunityCategoryCard
            key={category.id}
            category={category}
            onSelect={onSelectCategory}
          />
        ))}
      </div>
    </section>
  );
}
