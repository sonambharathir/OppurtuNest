import React from "react";

export default function Footer() {
  return (
    <footer className="storybook-footer">
      <div className="footer-divider-curve">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 20 Q360 0 720 18 Q1080 36 1440 10 L1440 40 L0 40 Z" fill="#75a56d" />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-center">
          <h3 className="footer-brand-title">OppurtuNest</h3>
          <p className="footer-tagline">
            Discover internships, projects, hackathons and more — built for B.Tech students, by B.Tech students.
          </p>
        </div>
      </div>
    </footer>
  );
}
