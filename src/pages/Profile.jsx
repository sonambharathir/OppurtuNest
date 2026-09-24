import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile({ profileData, onNavigateHome, onEditProfile }) {
  return (
    <div className="storybook-app-container">
      <Navbar />
      <main style={{ padding: "100px 24px 60px", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ color: "#3d5a42", fontFamily: "Fredoka, sans-serif", fontSize: "36px", marginBottom: "8px" }}>
            Student Profile
          </h1>
          <p style={{ color: "#6c8068", fontSize: "16px" }}>
            Review your academic stage, selected skills, and opportunity preferences.
          </p>
        </div>

        <div style={{ background: "#ffffff", border: "1.5px solid #ded5c2", borderRadius: "20px", padding: "30px", maxWidth: "680px", margin: "0 auto 30px" }}>
          <div style={{ marginBottom: "20px" }}>
            <strong style={{ display: "block", color: "#768770", fontSize: "12px", textTransform: "uppercase" }}>Academic Stage</strong>
            <span style={{ fontSize: "16px", color: "#332d28", fontWeight: 600 }}>
              {profileData?.degree ? `${profileData.degree} - ${profileData.branch || "General"}` : "Not configured yet"}
            </span>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <strong style={{ display: "block", color: "#768770", fontSize: "12px", textTransform: "uppercase" }}>College</strong>
            <span style={{ fontSize: "16px", color: "#332d28", fontWeight: 600 }}>
              {profileData?.college || "OppurtuNest Explorer"}
            </span>
          </div>

          {profileData?.selectedSkills && profileData.selectedSkills.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <strong style={{ display: "block", color: "#768770", fontSize: "12px", textTransform: "uppercase" }}>Skills</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                {profileData.selectedSkills.map((sk) => (
                  <span key={sk} style={{ background: "#edf3e8", color: "#3a5c43", padding: "4px 10px", borderRadius: "999px", fontSize: "13px" }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            {onEditProfile && (
              <button
                type="button"
                className="btn-coral"
                onClick={onEditProfile}
              >
                Edit Preferences
              </button>
            )}
            {onNavigateHome && (
              <button
                type="button"
                className="btn-frosted"
                onClick={onNavigateHome}
              >
                Back to Home
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
