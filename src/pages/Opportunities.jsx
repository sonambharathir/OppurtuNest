import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Opportunities({ onNavigateHome }) {
  return (
    <div className="storybook-app-container">
      <Navbar />
      <main style={{ padding: "100px 24px 60px", maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ color: "#3d5a42", fontFamily: "Fredoka, sans-serif", fontSize: "36px", marginBottom: "12px" }}>
          All Opportunities
        </h1>
        <p style={{ color: "#6c8068", fontSize: "16px", maxWidth: "600px", margin: "0 auto 30px" }}>
          Browse, search, and filter across internships, hackathons, scholarships, and more.
        </p>
        {onNavigateHome && (
          <button
            type="button"
            className="btn-coral"
            onClick={onNavigateHome}
          >
            ← Back to Home
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
}
