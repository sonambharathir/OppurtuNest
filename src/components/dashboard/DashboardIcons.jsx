
// Clean, charming SVG icons for Opportunity Categories and Recommended Opportunities
// Designed to match the OppurtuNest storybook aesthetic and the dashboard reference image

export const CategoryIcon = ({ type, size = 32 }) => {
  const normalized = (type || "").toLowerCase();

  switch (normalized) {
    case "internships":
    case "internship":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#eaf3e6" stroke="#9bbd96" strokeWidth="1.5" />
          <rect x="11" y="15" width="18" height="13" rx="2.5" fill="#fcf9f2" stroke="#3d5a42" strokeWidth="1.8" />
          <path d="M16 15V12.5C16 11.5 17 10.5 18 10.5H22C23 10.5 24 11.5 24 12.5V15" stroke="#3d5a42" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="11" y1="20" x2="29" y2="20" stroke="#3d5a42" strokeWidth="1.4" />
          <rect x="18" y="19" width="4" height="2.5" rx="0.5" fill="#87ab83" stroke="#3d5a42" strokeWidth="1.2" />
        </svg>
      );

    case "hackathons":
    case "hackathon":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#fcf3e6" stroke="#e0c296" strokeWidth="1.5" />
          <path d="M14 15L9 20L14 25" stroke="#4a3b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 15L31 20L26 25" stroke="#4a3b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="22" y1="12" x2="18" y2="28" stroke="#dd8752" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "scholarships":
    case "scholarship":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#f9f7dc" stroke="#d5ce8c" strokeWidth="1.5" />
          <polygon points="20 11 31 16 20 21 9 16" fill="#fefdf7" stroke="#4a4228" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M13 18V24.5C13 27 16 29 20 29C24 29 27 27 27 24.5V18" stroke="#4a4228" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <line x1="31" y1="16" x2="31" y2="26" stroke="#cfa645" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="31" cy="26" r="1.5" fill="#cfa645" />
        </svg>
      );

    case "competitions":
    case "competition":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#fbeae7" stroke="#d8a69e" strokeWidth="1.5" />
          <path d="M14 13H26V19C26 22.3 23.3 25 20 25C16.7 25 14 22.3 14 19V13Z" fill="#fffaf8" stroke="#523936" strokeWidth="1.8" />
          <path d="M14 15H10C9 15 8 16 8 17C8 19 10 20.5 14 20.5" stroke="#523936" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M26 15H30C31 15 32 16 32 17C32 19 30 20.5 26 20.5" stroke="#523936" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="20" y1="25" x2="20" y2="29" stroke="#523936" strokeWidth="1.8" />
          <line x1="16" y1="29" x2="24" y2="29" stroke="#523936" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case "certifications":
    case "certification":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#f0edf7" stroke="#b9b0d2" strokeWidth="1.5" />
          <rect x="10" y="11" width="20" height="15" rx="2" fill="#fdfbfd" stroke="#463e59" strokeWidth="1.8" />
          <line x1="14" y1="15" x2="22" y2="15" stroke="#463e59" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="14" y1="18.5" x2="20" y2="18.5" stroke="#7e7498" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="23" cy="23" r="3.5" fill="#eac35f" stroke="#463e59" strokeWidth="1.4" />
          <path d="M21 26L20 29.5L23 28.5L26 29.5L25 26" fill="#d4aa42" stroke="#463e59" strokeWidth="1.2" />
        </svg>
      );

    case "workshops":
    case "workshop":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#e8f4f6" stroke="#9ec9d2" strokeWidth="1.5" />
          <circle cx="16" cy="15" r="3" fill="#ffffff" stroke="#365056" strokeWidth="1.6" />
          <path d="M10 24C10 21.5 12.5 20 16 20C19.5 20 22 21.5 22 24" stroke="#365056" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="26" cy="18" r="2.5" fill="#ffffff" stroke="#365056" strokeWidth="1.4" />
          <path d="M23 27C23 25 24.8 24 27 24C29.2 24 31 25 31 27" stroke="#365056" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case "research":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#e6f5ea" stroke="#90cca1" strokeWidth="1.5" />
          <path d="M17 11V16L12 26C11 27.5 12 29 13.8 29H26.2C28 29 29 27.5 28 26L23 16V11" stroke="#2d5237" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="15" y1="11" x2="25" y2="11" stroke="#2d5237" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 25C17 24 23 26 26 25" stroke="#68aa79" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="19" cy="21" r="1" fill="#2d5237" />
          <circle cx="22" cy="23" r="1.2" fill="#2d5237" />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="18" fill="#f0f2eb" stroke="#c0c7b2" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="6" fill="#8aa87e" />
        </svg>
      );
  }
};
