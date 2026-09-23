import React from "react";
import { BunnyFisher } from "./Illustrations";

// Clean, standard coded vector icons for Quick Access
const QuickIcons = {
  Resume: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <polyline points="9 15 12 12 15 15" />
    </svg>
  ),
  SkillAnalyzer: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
};

export default function QuickAccessSection() {
  return (
    <section id="quick-access" className="quick-access-section">
      <div className="quick-access-content-grid">
        {/* Left Side: Quick Access Heading & Circular Action Items (Main Focus) */}
        <div className="quick-access-left-col">
          <h2 className="section-heading">Quick Access</h2>

          <div className="quick-action-bubbles-row">
            {/* Upload Resume */}
            <div className="quick-action-item">
              <div className="action-circle-bubble">
                <QuickIcons.Resume />
              </div>
              <span className="action-bubble-label">Upload Resume</span>
            </div>

            {/* Skill Analyzer */}
            <div className="quick-action-item">
              <div className="action-circle-bubble">
                <QuickIcons.SkillAnalyzer />
              </div>
              <span className="action-bubble-label">Skill Analyzer</span>
            </div>
          </div>
        </div>

        {/* Center: Small subtle mascot sticker */}
        <div className="quick-access-mascot">
          <BunnyFisher size={42} facingLeft={true} withRod={true} />
        </div>

        {/* Right Side: Frosted Soft-Rounded Assessment Panel */}
        <div className="quick-access-right-col">
          <div className="assessment-hero-panel">
            <h3 className="assessment-panel-title">Take a Quick Skill Assessment</h3>
            <p className="assessment-panel-desc">Evaluate your current skills and discover tailored opportunities.</p>
            <button className="btn-coral assessment-btn">
              Take a Quick Assessment <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
