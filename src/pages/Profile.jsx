import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProfile } from "../utils/profileStorage";

export default function Profile({ profileData, onNavigateHome, onEditProfile }) {
  const profile = profileData || getProfile();

  return (
    <div className="storybook-app-container">
      <Navbar />
      <main style={{ padding: "100px 24px 60px", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#557252", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            STUDENT PROFILE
          </span>
          <h1 style={{ color: "#2c3d2a", fontFamily: "Fredoka, sans-serif", fontSize: "34px", margin: "6px 0" }}>
            Your Profile & Preferences 🌱
          </h1>
          <p style={{ color: "#6c8068", fontSize: "15px", margin: 0 }}>
            Saved in your browser to personalize your recommendations, matching, and eligibility.
          </p>
        </div>

        {!profile ? (
          <div style={{ background: "#ffffff", border: "1.5px solid #ded5c2", borderRadius: "20px", padding: "40px 30px", maxWidth: "680px", margin: "0 auto 30px", textAlign: "center" }}>
            <span style={{ fontSize: "36px" }}>🌱</span>
            <h2 style={{ fontFamily: "Fredoka, sans-serif", fontSize: "20px", color: "#2c3d2a", margin: "10px 0 8px" }}>
              No Profile Found
            </h2>
            <p style={{ color: "#6c8068", fontSize: "14px", maxWidth: "420px", margin: "0 auto 20px" }}>
              You haven't completed onboarding yet. Set up your profile to unlock personalized opportunities!
            </p>
            {onEditProfile && (
              <button type="button" className="btn-coral" onClick={onEditProfile}>
                Start Profile Onboarding →
              </button>
            )}
          </div>
        ) : (
          <div style={{ background: "#ffffff", border: "1.5px solid #ded5c2", borderRadius: "20px", padding: "30px", maxWidth: "720px", margin: "0 auto 30px", boxShadow: "0 4px 16px rgba(45, 80, 60, 0.04)" }}>
            {/* Academic Section */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px", borderBottom: "1px solid #ebe5d5", paddingBottom: "16px" }}>
              <div>
                <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Degree & Branch</strong>
                <span style={{ fontSize: "15px", color: "#2c3d2a", fontWeight: 700 }}>
                  {profile.degree ? `${profile.degree} - ${profile.branch || "General"}` : "Not specified"}
                </span>
                {profile.currentYear && (
                  <span style={{ display: "block", fontSize: "12.5px", color: "#5d6d59" }}>Year {profile.currentYear} • Semester {profile.semester || "N/A"}</span>
                )}
              </div>

              <div>
                <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>College / University</strong>
                <span style={{ fontSize: "15px", color: "#2c3d2a", fontWeight: 700 }}>
                  {profile.college || "OppurtuNest Explorer"}
                </span>
              </div>
            </div>

            {/* Goals */}
            {profile.goals && profile.goals.length > 0 && (
              <div style={{ marginBottom: "18px" }}>
                <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Primary Goals</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {profile.goals.map((goal) => (
                    <span key={goal} style={{ background: "#f0f7ee", color: "#2b5735", border: "1px solid #b7dab2", padding: "4px 11px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 700 }}>
                      🎯 {goal}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Opportunity Types */}
            {profile.opportunityTypes && profile.opportunityTypes.length > 0 && (
              <div style={{ marginBottom: "18px" }}>
                <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Preferred Opportunity Types</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {profile.opportunityTypes.map((type) => (
                    <span key={type} style={{ background: "#fbf5e6", color: "#73592c", border: "1px solid #eedec0", padding: "4px 11px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 700 }}>
                      ✦ {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preferred Roles & Work Modes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
              {profile.preferredRoles && profile.preferredRoles.length > 0 && (
                <div>
                  <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Target Roles</strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {profile.preferredRoles.map((role) => (
                      <span key={role} style={{ background: "#edf3e8", color: "#3a5c43", padding: "3px 9px", borderRadius: "6px", fontSize: "12px", fontWeight: 700 }}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Mode & Location</strong>
                <div style={{ fontSize: "13px", color: "#2c3d2a", fontWeight: 600 }}>
                  <span>{profile.workModes?.length > 0 ? profile.workModes.join(", ") : "Any Mode"}</span>
                  {profile.preferredLocation && (
                    <span style={{ display: "block", color: "#5d6d59", marginTop: "2px" }}>📍 {profile.preferredLocation}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Domains / Interests */}
            {profile.selectedInterests && profile.selectedInterests.length > 0 && (
              <div style={{ marginBottom: "18px" }}>
                <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Domains of Interest</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {profile.selectedInterests.map((interest) => (
                    <span key={interest} style={{ background: "#fbf8f1", color: "#52634e", border: "1px solid #ded5c2", padding: "3px 9px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 }}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {profile.selectedSkills && profile.selectedSkills.length > 0 && (
              <div style={{ marginBottom: "22px" }}>
                <strong style={{ display: "block", color: "#768770", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Your Skills ({profile.selectedSkills.length})</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {profile.selectedSkills.map((sk) => {
                    const level = profile.skillLevels?.[sk] || "";
                    return (
                      <span key={sk} style={{ background: "#edf3e8", color: "#2b5735", border: "1px solid #c9dec3", padding: "3px 9px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
                        {sk} {level && <span style={{ opacity: 0.65, fontWeight: 500 }}>({level})</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", borderTop: "1px solid #ebe5d5", paddingTop: "18px" }}>
              {onEditProfile && (
                <button
                  type="button"
                  className="btn-coral"
                  onClick={onEditProfile}
                >
                  Edit Profile & Preferences →
                </button>
              )}
              {onNavigateHome && (
                <button
                  type="button"
                  className="btn-frosted"
                  onClick={onNavigateHome}
                >
                  ← Back to Home
                </button>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
