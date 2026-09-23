import React from "react";
import { GrassTuft } from "./Illustrations";

// Hand-Drawn Style Line Graph SVG
const HandDrawnChart = () => (
  <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn-chart-svg">
    <defs>
      <linearGradient id="coralArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ea655d" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ea655d" stopOpacity="0.0" />
      </linearGradient>
      <linearGradient id="mintArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#58a67e" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#58a67e" stopOpacity="0.0" />
      </linearGradient>
    </defs>

    {/* Axes */}
    <line x1="25" y1="15" x2="25" y2="120" stroke="#365447" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="120" x2="230" y2="120" stroke="#365447" strokeWidth="2" strokeLinecap="round" />
    {/* Little Axis Arrow / Ticks */}
    <line x1="22" y1="20" x2="28" y2="20" stroke="#365447" strokeWidth="1.5" />
    <line x1="22" y1="70" x2="28" y2="70" stroke="#365447" strokeWidth="1.5" />
    <line x1="90" y1="117" x2="90" y2="123" stroke="#365447" strokeWidth="1.5" />
    <line x1="160" y1="117" x2="160" y2="123" stroke="#365447" strokeWidth="1.5" />

    {/* Coral Line & Area (Organic Hand-Drawn Wavy Path) */}
    <path 
      d="M25 105 C60 95, 80 110, 110 80 C140 50, 170 85, 200 45 L225 40" 
      stroke="#ea655d" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    <path 
      d="M25 105 C60 95, 80 110, 110 80 C140 50, 170 85, 200 45 L225 40 L225 120 L25 120 Z" 
      fill="url(#coralArea)" 
    />

    {/* Mint Line & Area */}
    <path 
      d="M25 115 C55 100, 95 65, 130 75 C165 85, 185 60, 225 25" 
      stroke="#4d8c6b" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M25 115 C55 100, 95 65, 130 75 C165 85, 185 60, 225 25 L225 120 L25 120 Z" 
      fill="url(#mintArea)" 
    />

    {/* Data points */}
    <circle cx="110" cy="80" r="3.5" fill="#ea655d" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="200" cy="45" r="3.5" fill="#ea655d" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="130" cy="75" r="3.5" fill="#4d8c6b" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="225" cy="25" r="3.5" fill="#4d8c6b" stroke="#ffffff" strokeWidth="1.5" />
  </svg>
);

// Center Flowing Wave Lines SVG
const WavyFlowLines = () => (
  <svg viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="wavy-flow-svg">
    <path d="M5 45 C45 20, 85 60, 125 35 C155 15, 175 40, 195 25" stroke="#719d85" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M5 55 C40 45, 80 50, 120 48 C155 45, 175 35, 195 40" stroke="#9bbdae" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 2" />
    <path d="M5 63 C50 63, 100 63, 150 63 L195 63" stroke="#5a8671" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function InsightsGrowthSection() {
  const dates = [
    { day: "Mon", num: "27" },
    { day: "Date", num: "28" },
    { day: "Mon", num: "20" }
  ];

  return (
    <section id="insights" className="insights-growth-section">
      <div className="section-title-wrap">
        <h2 className="section-heading">Your Insights & Growth</h2>
      </div>

      {/* Hand-drawn visuals dashboard row */}
      <div className="insights-dashboard-grid">
        {/* Left: Hand-Drawn Multi-Line Chart */}
        <div className="insights-card chart-card">
          <HandDrawnChart />
        </div>

        {/* Center: Wavy Lines + Progress Bar */}
        <div className="insights-card wave-card">
          <WavyFlowLines />
          <div className="progress-pill-wrapper">
            <div className="progress-track">
              <div className="progress-fill progress-fill-coral" style={{ width: "68%" }} />
            </div>
          </div>
        </div>

        {/* Right: Progress Bar + Upcoming Opportunities Badges */}
        <div className="insights-card upcoming-card">
          <div className="progress-pill-wrapper mb-3">
            <div className="progress-track">
              <div className="progress-fill progress-fill-mint" style={{ width: "78%" }} />
            </div>
          </div>

          <div className="upcoming-subpanel">
            <h4 className="upcoming-title">Upcoming Opportunities</h4>
            <div className="date-badges-row">
              {dates.map((d, i) => (
                <div key={i} className="date-badge-item">
                  <span className="date-badge-label">{d.day}</span>
                  <span className="date-badge-num">{d.num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="insights-cta-wrap">
        <a href="#opportunities" className="btn-frosted-pill">
          Explore Opportunities
        </a>
      </div>

      {/* Little meadow grass details */}
      <div className="insights-grass-decor">
        <GrassTuft size={26} />
      </div>
    </section>
  );
}
