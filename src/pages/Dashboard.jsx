import React from "react";
import "./Dashboard.css";

function OpportunityIcon({ type }) {
  if (type === "explore") {
    return (
      <svg viewBox="0 0 90 90" className="dashboard-icon" aria-hidden="true">
        <circle cx="45" cy="45" r="31" fill="#dcebd0" />
        <path
          d="M45 65C45 65 34 52 34 42C34 32 41 25 45 22C49 25 56 32 56 42C56 52 45 65 45 65Z"
          fill="#6f9a62"
          stroke="#3d6047"
          strokeWidth="2.5"
        />
        <path
          d="M45 65V38"
          stroke="#3d6047"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M45 47C39 42 36 38 36 34"
          stroke="#3d6047"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M45 53C51 48 54 44 54 40"
          stroke="#3d6047"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "internship") {
    return (
      <svg viewBox="0 0 90 90" className="dashboard-icon" aria-hidden="true">
        <circle cx="45" cy="45" r="31" fill="#e7dfc3" />
        <rect
          x="25"
          y="35"
          width="40"
          height="29"
          rx="5"
          fill="#fff9e8"
          stroke="#4c5945"
          strokeWidth="2.5"
        />
        <path
          d="M37 35V29C37 27 39 25 41 25H49C51 25 53 27 53 29V35"
          fill="none"
          stroke="#4c5945"
          strokeWidth="2.5"
        />
        <path
          d="M25 45H65"
          stroke="#4c5945"
          strokeWidth="2"
        />
        <path
          d="M41 45V49H49V45"
          fill="#8db18a"
          stroke="#4c5945"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (type === "skills") {
    return (
      <svg viewBox="0 0 90 90" className="dashboard-icon" aria-hidden="true">
        <circle cx="45" cy="45" r="31" fill="#d8e8df" />
        <path
          d="M29 55C33 48 39 44 45 44C51 44 57 48 61 55"
          fill="none"
          stroke="#496b55"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M31 55C34 58 39 60 45 60C51 60 56 58 59 55"
          fill="none"
          stroke="#496b55"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M45 28C45 28 38 35 38 40C38 44 41 47 45 47C49 47 52 44 52 40C52 35 45 28 45 28Z"
          fill="#83a96e"
          stroke="#496b55"
          strokeWidth="2.2"
        />
      </svg>
    );
  }

  if (type === "jobs") {
    return (
      <svg viewBox="0 0 90 90" className="dashboard-icon" aria-hidden="true">
        <circle cx="45" cy="45" r="31" fill="#eee1d2" />
        <path
          d="M28 60V35H45V60"
          fill="#f8f0dd"
          stroke="#514c43"
          strokeWidth="2.5"
        />
        <path
          d="M45 60V28H62V60"
          fill="#e1ead7"
          stroke="#514c43"
          strokeWidth="2.5"
        />
        <path
          d="M33 41H38M33 48H38M33 55H38M50 35H55M50 42H55M50 49H55"
          stroke="#7d8c72"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "certifications") {
    return (
      <svg viewBox="0 0 90 90" className="dashboard-icon" aria-hidden="true">
        <circle cx="45" cy="45" r="31" fill="#e8e2ef" />
        <rect
          x="27"
          y="27"
          width="36"
          height="28"
          rx="4"
          fill="#fffaf0"
          stroke="#56506a"
          strokeWidth="2.5"
        />
        <path
          d="M34 36H56M34 42H53M34 48H47"
          stroke="#7d748d"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="54"
          cy="59"
          r="8"
          fill="#e8cf87"
          stroke="#75633c"
          strokeWidth="2"
        />
        <path
          d="M50 65L49 73L54 70L59 73L58 65"
          fill="#d8bb68"
          stroke="#75633c"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return null;
}

function LandscapeDecoration() {
  return (
    <div className="dashboard-landscape" aria-hidden="true">
      <svg
        viewBox="0 0 1440 210"
        preserveAspectRatio="none"
        className="landscape-svg"
      >
        <path
          d="M0 105C140 45 220 55 350 115C490 180 585 165 700 105C820 42 900 48 1030 112C1170 180 1280 165 1440 78V210H0Z"
          fill="#d9c9a7"
        />
        <path
          d="M0 145C135 105 235 120 350 162C480 210 575 192 700 150C835 105 925 105 1045 151C1180 203 1295 178 1440 118V210H0Z"
          fill="#b9d88e"
        />
        <path
          d="M0 177C155 138 275 150 400 188C540 230 625 218 760 176C900 133 1005 137 1130 177C1250 216 1345 199 1440 168V210H0Z"
          fill="#8fb9a1"
        />
      </svg>

      <div className="landscape-sun">
        <span />
      </div>

      <div className="landscape-bird landscape-bird-one">
        <span />
        <span />
      </div>

      <div className="landscape-bird landscape-bird-two">
        <span />
        <span />
      </div>

      <div className="landscape-plant">
        <span className="plant-stem" />
        <span className="plant-leaf plant-leaf-one" />
        <span className="plant-leaf plant-leaf-two" />
      </div>
    </div>
  );
}

const dashboardCards = [
  {
    number: "1",
    type: "explore",
    label: "EXPLORE",
    title: "Explore opportunities",
    description:
      "Discover internships, jobs, competitions and experiences that match your journey.",
  },
  {
    number: "2",
    type: "internship",
    label: "INTERNSHIP",
    title: "Find internships",
    description:
      "Discover internships where you can gain real-world experience and grow.",
  },
  {
    number: "3",
    type: "skills",
    label: "SKILL BUILDING",
    title: "Build your skills",
    description:
      "Keep learning and strengthen the skills that support your goals.",
  },
  {
    number: "4",
    type: "jobs",
    label: "JOBS",
    title: "Explore jobs",
    description:
      "Find early-career opportunities that connect with your interests.",
  },
  {
    number: "5",
    type: "certifications",
    label: "CERTIFICATIONS",
    title: "Grow your profile",
    description:
      "Keep track of certifications, achievements and experiences.",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <div className="dashboard-brand">
          <span className="dashboard-brand-leaf">🌿</span>
          <span>OppurtuNest</span>
        </div>

        <button type="button" className="dashboard-profile-button">
          My Profile
        </button>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-intro">
          <span className="dashboard-eyebrow">
            YOUR JOURNEY CONTINUES
          </span>

          <h1>Let's find what's next for you.</h1>

          <p>
            Explore opportunities that match your goals and keep growing
            along the way.
          </p>
        </section>

        <section className="dashboard-card-grid">
          {dashboardCards.map((card) => (
            <article
              className={`dashboard-card dashboard-card-${card.number}`}
              key={card.number}
            >
              <div className="dashboard-card-heading">
                <div className="dashboard-card-label">
                  <span className="dashboard-card-number">
                    {card.number}
                  </span>

                  <span>{card.label}</span>
                </div>

                <OpportunityIcon type={card.type} />
              </div>

              <div className="dashboard-card-body">
                <h2>{card.title}</h2>

                <p>{card.description}</p>

                <button type="button" className="dashboard-card-button">
                  Explore <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-growth">
          <div className="dashboard-growth-copy">
            <span className="dashboard-small-label">YOUR GROWTH</span>

            <h2>Small steps become big opportunities.</h2>

            <p>
              Keep building your profile, learning new skills and exploring
              opportunities that feel right for you.
            </p>
          </div>

          <div className="dashboard-growth-items">
            <div className="growth-item">
              <span className="growth-icon">🌱</span>
              <strong>Profile</strong>
              <small>Getting started</small>
            </div>

            <div className="growth-item">
              <span className="growth-icon">🌿</span>
              <strong>Skills</strong>
              <small>Keep growing</small>
            </div>

            <div className="growth-item">
              <span className="growth-icon">🌳</span>
              <strong>Opportunities</strong>
              <small>Explore next</small>
            </div>
          </div>
        </section>
      </main>

      <LandscapeDecoration />
    </div>
  );
}