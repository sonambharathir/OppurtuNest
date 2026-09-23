import React from "react";

// Clean, minimal Compass / Leaf Logo
export const CompassLeafLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg">
    <circle cx="12" cy="12" r="10" stroke="#3d6252" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.45" />
    <path d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z" fill="#699f80" stroke="#254337" strokeWidth="1.4" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2.5" fill="#ffffff" stroke="#254337" strokeWidth="1.2"/>
    <path d="M12 9C13.5 7.5 15.5 8 16 9.5C14.5 10.5 13 10 12 9Z" fill="#b3e2ac" />
  </svg>
);

// 7 Opportunity Category Icons — Clean, hand-coded geometric SVG vectors
export const CategoryIcons = {
  Internships: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <rect x="10.5" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
    </svg>
  ),
  Hackathons: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 8 3 12 7 16" />
      <line x1="14" y1="4" x2="10" y2="20" />
      <polyline points="17 8 21 12 17 16" />
    </svg>
  ),
  Scholarships: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 3 2 8 12 13 22 8 12 3" />
      <path d="M6 10v6c0 2 2.7 4 6 4s6-2 6-4v-6" />
      <line x1="22" y1="8" x2="22" y2="16" />
      <circle cx="22" cy="16.5" r="1" fill="currentColor" />
    </svg>
  ),
  Competitions: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M18 9h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
      <path d="M6 4h12v6a6 6 0 0 1-12 0V4z" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  ),
  Workshops: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Research: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  Certifications: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="15" rx="2" />
      <line x1="7" y1="7" x2="13" y2="7" />
      <line x1="7" y1="11" x2="11" y2="11" />
      <circle cx="16" cy="11" r="2.5" />
      <path d="M14.5 13.5L13.5 19L16 17.5L18.5 19L17.5 13.5" />
    </svg>
  )
};

// Cute, simple, hand-drawn mascot sticker (Small ~44px, minimal line art)
export const BunnyFisher = ({ size = 44, facingLeft = false, withRod = true }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="mascot-sticker-svg"
      style={{ transform: facingLeft ? 'scaleX(-1)' : 'none' }}
    >
      {/* Tiny Wooden Seat */}
      <rect x="14" y="48" width="18" height="6" rx="2" fill="#9e724a" stroke="#4a301a" strokeWidth="1.4" />
      
      {/* Body */}
      <ellipse cx="23" cy="42" rx="9" ry="8" fill="#ffffff" stroke="#25352d" strokeWidth="1.5" />
      {/* Red Shirt */}
      <path d="M15 37 C15 32, 31 32, 31 37 C31 45, 15 45, 15 37 Z" fill="#eb6057" stroke="#25352d" strokeWidth="1.5" />
      
      {/* Head */}
      <ellipse cx="23" cy="25" rx="9.5" ry="9" fill="#ffffff" stroke="#25352d" strokeWidth="1.5" />
      
      {/* Left Ear */}
      <path d="M18 17 C17 8, 20 4, 21.5 4 C23 4, 23 10, 22 17 Z" fill="#ffffff" stroke="#25352d" strokeWidth="1.4" />
      <path d="M19 13 C18.5 7, 20 5, 21 5 C21.5 5, 21.5 9, 20.5 13 Z" fill="#f8cfc8" />
      
      {/* Right Ear */}
      <path d="M24 17 C25 8, 28 4, 29.5 4 C31 4, 30 10, 28 17 Z" fill="#ffffff" stroke="#25352d" strokeWidth="1.4" />
      <path d="M26 13 C26.8 7, 28 5, 29 5 C29.5 5, 29 9, 27.5 13 Z" fill="#f8cfc8" />
      
      {/* Cute Dot Eyes */}
      <circle cx="20" cy="24" r="1.3" fill="#25352d" />
      <circle cx="26" cy="24" r="1.3" fill="#25352d" />
      
      {/* Tiny Cheeks */}
      <ellipse cx="17.5" cy="27" rx="1.5" ry="1" fill="#f9cbbf" />
      <ellipse cx="28.5" cy="27" rx="1.5" ry="1" fill="#f9cbbf" />
      
      {/* Tiny Nose */}
      <circle cx="23" cy="26" r="0.8" fill="#eb6057" />
      
      {/* Tiny Hand holding rod */}
      <circle cx="28" cy="38" r="2.2" fill="#ffffff" stroke="#25352d" strokeWidth="1.3" />

      {/* Slender Fishing Rod */}
      {withRod && (
        <>
          <line x1="25" y1="40" x2="52" y2="18" stroke="#5a3d24" strokeWidth="1.8" strokeLinecap="round" />
          {/* Thin dangling fishing line */}
          <path d="M52 18 Q54 36 53 54" stroke="#415d53" strokeWidth="0.9" strokeDasharray="1.5 1.5" />
          {/* Tiny Bobber */}
          <circle cx="53" cy="54" r="2" fill="#eb6057" stroke="#25352d" strokeWidth="0.8" />
        </>
      )}
    </svg>
  );
};

// Clean, hand-coded pine tree cluster for hero left corner (larger, balanced, not AI-generated)
export const SmallPineCornerLeft = () => (
  <svg width="180" height="135" viewBox="0 0 180 135" fill="none" xmlns="http://www.w3.org/2000/svg" className="corner-pines-svg">
    {/* Grassy shore base */}
    <ellipse cx="65" cy="128" rx="80" ry="14" fill="#a8d8a2" stroke="#366345" strokeWidth="1.8" />
    <ellipse cx="125" cy="130" rx="55" ry="10" fill="#b9e2b4" stroke="#366345" strokeWidth="1.8" />

    {/* Back Pine Tree (Left-most, taller) */}
    <g stroke="#264532" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="25" y="70" width="8" height="45" rx="1.5" fill="#634327" />
      <path d="M29 20 L48 55 H10 Z" fill="#447355" />
      <path d="M29 40 L52 75 H6 Z" fill="#3c674c" />
      <path d="M29 60 L56 95 H2 Z" fill="#335a42" />
    </g>

    {/* Mid Pine Tree (Right) */}
    <g stroke="#264532" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="110" y="75" width="8" height="40" rx="1.5" fill="#634327" />
      <path d="M114 30 L130 60 H98 Z" fill="#528565" />
      <path d="M114 48 L134 80 H94 Z" fill="#467657" />
      <path d="M114 66 L138 98 H90 Z" fill="#3c674c" />
    </g>

    {/* Front Main Pine Tree (Center) */}
    <g stroke="#264532" strokeWidth="2" strokeLinejoin="round">
      <rect x="66" y="80" width="10" height="45" rx="2" fill="#573a21" />
      <path d="M71 25 L94 62 H48 Z" fill="#679d79" />
      <path d="M71 46 L99 84 H43 Z" fill="#598e6b" />
      <path d="M71 68 L104 105 H38 Z" fill="#4a7d5c" />
    </g>

    {/* Little decorative grass blades */}
    <path d="M135 125 C137 118 140 114 142 110 C143 116 145 120 147 125" stroke="#366345" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Clean, hand-coded pine tree cluster for hero right corner
export const SmallPineCornerRight = () => (
  <svg width="180" height="135" viewBox="0 0 180 135" fill="none" xmlns="http://www.w3.org/2000/svg" className="corner-pines-svg">
    {/* Grassy shore base */}
    <ellipse cx="115" cy="128" rx="80" ry="14" fill="#a8d8a2" stroke="#366345" strokeWidth="1.8" />
    <ellipse cx="55" cy="130" rx="55" ry="10" fill="#b9e2b4" stroke="#366345" strokeWidth="1.8" />

    {/* Back Pine Tree (Right-most, taller) */}
    <g stroke="#264532" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="147" y="70" width="8" height="45" rx="1.5" fill="#634327" />
      <path d="M151 20 L170 55 H132 Z" fill="#447355" />
      <path d="M151 40 L174 75 H128 Z" fill="#3c674c" />
      <path d="M151 60 L178 95 H124 Z" fill="#335a42" />
    </g>

    {/* Mid Pine Tree (Left) */}
    <g stroke="#264532" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="62" y="75" width="8" height="40" rx="1.5" fill="#634327" />
      <path d="M66 30 L82 60 H50 Z" fill="#528565" />
      <path d="M66 48 L86 80 H46 Z" fill="#467657" />
      <path d="M66 66 L90 98 H42 Z" fill="#3c674c" />
    </g>

    {/* Front Main Pine Tree (Center) */}
    <g stroke="#264532" strokeWidth="2" strokeLinejoin="round">
      <rect x="104" y="80" width="10" height="45" rx="2" fill="#573a21" />
      <path d="M109 25 L132 62 H86 Z" fill="#679d79" />
      <path d="M109 46 L137 84 H81 Z" fill="#598e6b" />
      <path d="M109 68 L142 105 H76 Z" fill="#4a7d5c" />
    </g>

    <path d="M35 125 C37 118 40 114 42 110 C43 116 45 120 47 125" stroke="#366345" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Clean, hand-coded tree for Recommended Opportunities left side (larger & fuller)
export const SmallTreeCornerLeft = () => (
  <svg width="160" height="185" viewBox="0 0 160 185" fill="none" xmlns="http://www.w3.org/2000/svg" className="side-tree-svg">
    {/* Ground mound */}
    <ellipse cx="65" cy="175" rx="60" ry="10" fill="#a4d79d" stroke="#346142" strokeWidth="1.8" />
    {/* Trunk & Branches */}
    <g stroke="#3d2716" strokeWidth="2" strokeLinejoin="round">
      <path d="M55 175 C57 140 50 115 45 95 C52 105 60 110 70 100 C75 120 70 145 72 175 Z" fill="#714e32" />
      <path d="M48 115 C35 105 25 100 15 102 C25 96 38 102 46 108" fill="#714e32" />
      <path d="M66 110 C80 98 95 96 105 100 C95 92 80 94 64 104" fill="#714e32" />
    </g>
    {/* Clean geometric cloud-like foliage canopy in layered circles */}
    <g stroke="#264731" strokeWidth="2" strokeLinejoin="round">
      <circle cx="35" cy="85" r="28" fill="#4d7f5c" />
      <circle cx="85" cy="82" r="30" fill="#4d7f5c" />
      <circle cx="60" cy="55" r="32" fill="#598e6b" />
      <circle cx="42" cy="72" r="26" fill="#6ca47d" />
      <circle cx="78" cy="70" r="28" fill="#72ab83" />
      <circle cx="60" cy="45" r="26" fill="#80b991" />
    </g>
  </svg>
);

// Clean, hand-coded tree for Recommended Opportunities right side
export const SmallTreeCornerRight = () => (
  <svg width="160" height="185" viewBox="0 0 160 185" fill="none" xmlns="http://www.w3.org/2000/svg" className="side-tree-svg">
    <ellipse cx="95" cy="175" rx="60" ry="10" fill="#a4d79d" stroke="#346142" strokeWidth="1.8" />
    <g stroke="#3d2716" strokeWidth="2" strokeLinejoin="round">
      <path d="M105 175 C103 140 110 115 115 95 C108 105 100 110 90 100 C85 120 90 145 88 175 Z" fill="#714e32" />
      <path d="M112 115 C125 105 135 100 145 102 C135 96 122 102 114 108" fill="#714e32" />
      <path d="M94 110 C80 98 65 96 55 100 C65 92 80 94 96 104" fill="#714e32" />
    </g>
    <g stroke="#264731" strokeWidth="2" strokeLinejoin="round">
      <circle cx="125" cy="85" r="28" fill="#4d7f5c" />
      <circle cx="75" cy="82" r="30" fill="#4d7f5c" />
      <circle cx="100" cy="55" r="32" fill="#598e6b" />
      <circle cx="118" cy="72" r="26" fill="#6ca47d" />
      <circle cx="82" cy="70" r="28" fill="#72ab83" />
      <circle cx="100" cy="45" r="26" fill="#80b991" />
    </g>
  </svg>
);

// Minimal Leafy Vine Connector (Simple line with 2 small flat leaf doodles)
export const VineBranch = () => (
  <svg width="54" height="24" viewBox="0 0 54 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="simple-vine-svg">
    <path d="M2 12 H52" stroke="#609767" strokeWidth="1.8" strokeLinecap="round" />
    {/* Leaf 1 */}
    <path d="M18 12 C18 6, 27 5, 28 10 C25 12, 20 13, 18 12 Z" fill="#88cb8e" stroke="#3e7345" strokeWidth="1" />
    {/* Leaf 2 */}
    <path d="M34 12 C34 18, 43 19, 44 14 C41 12, 36 11, 34 12 Z" fill="#98d69d" stroke="#3e7345" strokeWidth="1" />
  </svg>
);

// Tiny Grass Tuft Doodle
export const GrassTuft = ({ size = 16 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16 C6 10, 7 6, 5 2 C8 6, 9 11, 10 16" stroke="#4f8252" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M11 16 C12 8, 13 4, 13 1 C14 5, 15 10, 16 16" stroke="#467648" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 16 C18 11, 20 7, 23 3 C21 8, 20 12, 19 16" stroke="#4f8252" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
