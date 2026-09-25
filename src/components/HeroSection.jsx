import React from "react";
import Navbar from "./Navbar";
import { 
  CategoryIcons, 
  SmallPineCornerLeft, 
  SmallPineCornerRight, 
  BunnyFisher, 
  GrassTuft 
} from "./Illustrations";

export default function HeroSection({ onStartJourney, onOpenDashboard, hasProfile }) {
  const categories = [
    {
      id: "internships",
      name: "Internships",
      desc: "Gain real-world experience and build your resume.",
      Icon: CategoryIcons.Internships
    },
    {
      id: "hackathons",
      name: "Hackathons",
      desc: "Showcase your skills, meet great people.",
      Icon: CategoryIcons.Hackathons
    },
    {
      id: "scholarships",
      name: "Scholarships",
      desc: "Get financial support for your dreams.",
      Icon: CategoryIcons.Scholarships
    },
    {
      id: "competitions",
      name: "Competitions",
      desc: "Test your skills, win recognition.",
      Icon: CategoryIcons.Competitions
    },
    {
      id: "workshops",
      name: "Workshops",
      desc: "Learn from experts, gain hands-on skills.",
      Icon: CategoryIcons.Workshops
    },
    {
      id: "research",
      name: "Research",
      desc: "Explore ideas, create an impact.",
      Icon: CategoryIcons.Research
    },
    {
      id: "certifications",
      name: "Certifications",
      desc: "Boost your skills, stand out globally.",
      Icon: CategoryIcons.Certifications
    }
  ];

  return (
    <section id="home" className="hero-viewport">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Main Content (The Primary Focus) */}
      <div className="hero-main-container">
        {/* Tagline */}
        <p className="hero-tagline">Better Opportunities. A Brighter You.</p>

        {/* Main Heading */}
        <h1 className="hero-title">OppurtuNest</h1>

        {/* Supporting Text */}
        <p className="hero-subtitle">
          Discover internships, projects, hackathons and more — built for B.Tech students, by B.Tech students.
        </p>

        {/* 7 Horizontal Opportunity Category Badges */}
        <div className="hero-categories-row">
          {categories.map((cat) => {
            const IconComp = cat.Icon;

            return (
              <div key={cat.id} className={`hero-category-item cat-${cat.id}`}>
                <div className="cat-icon-bubble">
                  <IconComp />
                </div>

                <div className="cat-text-wrap">
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-desc">{cat.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two Hero Action Buttons */}
        <div className="hero-actions">
          <button
            type="button"
            className="btn-coral"
            onClick={hasProfile && onOpenDashboard ? onOpenDashboard : onStartJourney}
          >
            {hasProfile ? "Go to Dashboard" : "Start Your Journey"} <span className="btn-arrow">→</span>
          </button>

          <a href="#opportunities" className="btn-frosted">
            Explore Opportunities
          </a>
        </div>
      </div>

      {/* Lower Hero Illustrated Landscape Ending at the Lake */}
      <div className="hero-landscape-bottom">
        {/* Small corner pine doodles */}
        <div className="hero-corner-tree-left">
          <SmallPineCornerLeft />
        </div>

        {/* Small sticker mascot sitting near the shore */}
        <div className="hero-mascot-sticker">
          <BunnyFisher size={44} facingLeft={false} withRod={true} />
        </div>

        {/* Small corner pine doodles right */}
        <div className="hero-corner-tree-right">
          <SmallPineCornerRight />
        </div>

        {/* The Lake — Simple flat pastel water band marking the bottom boundary of Viewport 1 */}
        <div className="hero-lake-water">
          <svg
            className="lake-ripples-svg"
            viewBox="0 0 1440 46"
            preserveAspectRatio="none"
            fill="none"
          >
            <rect
              x="0"
              y="0"
              width="1440"
              height="46"
              fill="#69abb3"
            />

            <line
              x1="0"
              y1="1"
              x2="1440"
              y2="1"
              stroke="#89c8cf"
              strokeWidth="2"
            />

            {/* Minimal, flat wave lines */}
            <g
              stroke="#91d2d8"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.8"
            >
              <line x1="100" y1="14" x2="180" y2="14" />
              <line x1="320" y1="16" x2="420" y2="16" />
              <line x1="600" y1="13" x2="700" y2="13" />
              <line x1="880" y1="16" x2="980" y2="16" />
              <line x1="1160" y1="14" x2="1260" y2="14" />

              <line x1="200" y1="28" x2="300" y2="28" />
              <line x1="480" y1="30" x2="580" y2="30" />
              <line x1="760" y1="28" x2="860" y2="28" />
              <line x1="1040" y1="30" x2="1140" y2="30" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}