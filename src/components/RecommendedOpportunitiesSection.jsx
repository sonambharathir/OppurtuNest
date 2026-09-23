import React from "react";
import { SmallTreeCornerLeft, SmallTreeCornerRight } from "./Illustrations";

export default function RecommendedOpportunitiesSection() {
  const cards = [
    {
      id: "internships",
      title: "Internships",
      description: "Gain real-world experience and build your resume.",
      className: "card-internships"
    },
    {
      id: "hackathons",
      title: "Hackathons",
      description: "Showcase your skills, meet great people.",
      className: "card-hackathons"
    },
    {
      id: "scholarships",
      title: "Scholarships",
      description: "Get financial support for your dreams.",
      className: "card-scholarships"
    },
    {
      id: "workshops",
      title: "Workshops",
      description: "Learn from experts, gain hands-on skills.",
      className: "card-workshops"
    },
    {
      id: "research",
      title: "Research",
      description: "Boost your skills, create an impact.",
      className: "card-research"
    }
  ];

  return (
    <section id="opportunities" className="recommended-section">
      {/* Small corner tree doodle on left edge */}
      <div className="recommended-corner-tree-left">
        <SmallTreeCornerLeft />
      </div>

      {/* Center Content: Heading & 5 Opportunity Cards (Main Focus) */}
      <div className="recommended-center-content">
        <h2 className="section-heading">Recommended Opportunities</h2>

        <div className="organic-cards-container">
          {/* Top Row: 3 Cards */}
          <div className="organic-cards-row row-top">
            {cards.slice(0, 3).map((item) => (
              <div key={item.id} className={`organic-opportunity-card ${item.className}`}>
                <h3 className="card-opportunity-title">{item.title}</h3>
                <p className="card-opportunity-desc">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="organic-cards-row row-bottom">
            {cards.slice(3, 5).map((item) => (
              <div key={item.id} className={`organic-opportunity-card ${item.className}`}>
                <h3 className="card-opportunity-title">{item.title}</h3>
                <p className="card-opportunity-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Small corner tree doodle on right edge */}
      <div className="recommended-corner-tree-right">
        <SmallTreeCornerRight />
      </div>
    </section>
  );
}
