import { useState, useMemo, useEffect, useCallback } from "react";
import RecommendedOpportunityCard from "./RecommendedOpportunityCard";
import OpportunityModal from "../skillJourney/OpportunityModal";
import { getProfile, getStudentId, saveStudentId } from "../../utils/profileStorage";
import { getRecommendations, createStudent, mapProfileToBackendStudent } from "../../utils/api";

export default function RecommendedSection({ profileData, onStartOnboarding }) {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [backendRecommendations, setBackendRecommendations] = useState([]);
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Retrieve stored profile from localStorage if not explicitly passed as prop
  const activeProfile = useMemo(() => {
    return profileData || getProfile();
  }, [profileData]);

  const hasPreferences = Boolean(
    activeProfile &&
    (activeProfile.goals?.length > 0 ||
      activeProfile.opportunityTypes?.length > 0 ||
      activeProfile.selectedSkills?.length > 0 ||
      activeProfile.skills?.length > 0 ||
      activeProfile.preferredRoles?.length > 0 ||
      activeProfile.selectedInterests?.length > 0)
  );

  // Fetch recommendations from GET /api/recommendations/:studentId
  const fetchRecommendations = useCallback(async () => {
    if (!hasPreferences) {
      setBackendRecommendations([]);
      return;
    }

    setIsLoadingBackend(true);
    setErrorMessage(null);

    try {
      let studentId = getStudentId();

      // If student profile exists in storage but not yet registered on backend, sync it
      if (!studentId && activeProfile) {
        try {
          const studentPayload = mapProfileToBackendStudent(activeProfile);
          const created = await createStudent(studentPayload);
          if (created && created._id) {
            studentId = created._id;
            saveStudentId(studentId);
          }
        } catch (syncErr) {
          console.warn("[RecommendedSection] Could not sync student profile with backend:", syncErr.message);
        }
      }

      if (!studentId) {
        setIsLoadingBackend(false);
        setBackendRecommendations([]);
        return;
      }

      const data = await getRecommendations(studentId, 6);
      if (Array.isArray(data)) {
        setBackendRecommendations(data);
      } else {
        setBackendRecommendations([]);
      }
    } catch (err) {
      console.error("[RecommendedSection] Error loading recommendations:", err.message);
      setErrorMessage("Unable to load opportunities right now.");
      setBackendRecommendations([]);
    } finally {
      setIsLoadingBackend(false);
    }
  }, [activeProfile, hasPreferences]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <section className="dash-recommended-section">
      <div className="dash-section-header">
        <div className="dash-section-title-wrap">
          <span className="dash-section-eyebrow">✦ RECOMMENDED FOR YOU 🌱</span>
          <h2 className="dash-section-title">Picked based on your profile and interests.</h2>
        </div>
        {hasPreferences && (
          <span className="dash-personalized-tag">
            ✓ Filtered for your profile
          </span>
        )}
      </div>

      {/* Loading state */}
      {hasPreferences && isLoadingBackend && (
        <div style={{ textAlign: "center", padding: "16px 0 24px", color: "#60725c", fontSize: "13.5px" }}>
          <span style={{ marginRight: "6px" }}>🌱</span>
          Curating real recommendations tailored to your profile...
        </div>
      )}

      {/* Error state with Retry action */}
      {hasPreferences && !isLoadingBackend && errorMessage && (
        <div
          style={{
            background: "#fffaf7",
            border: "1.5px solid #f2d5cb",
            borderRadius: "16px",
            padding: "36px 24px",
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto",
            color: "#8a4537",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>⚠️</div>
          <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", margin: "0 0 6px", color: "#6d3024" }}>
            Unable to load opportunities right now.
          </h3>
          <p style={{ fontSize: "13.5px", color: "#8a4537", margin: "0 0 16px" }}>
            Could not reach the recommendation server. Please check your connection and try again.
          </p>
          <button
            type="button"
            onClick={fetchRecommendations}
            style={{
              background: "#396645",
              color: "#ffffff",
              border: "none",
              borderRadius: "999px",
              padding: "9px 24px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "13.5px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(45, 80, 60, 0.2)",
            }}
          >
            Retry ↻
          </button>
        </div>
      )}

      {/* Empty recommendation state */}
      {hasPreferences && !isLoadingBackend && !errorMessage && backendRecommendations.length === 0 && (
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid #ded5c2",
            borderRadius: "20px",
            padding: "40px 30px",
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌱</div>
          <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", color: "#2c3d2a", margin: "0 0 6px" }}>
            No opportunities available right now.
          </h3>
          <p style={{ color: "#60725c", fontSize: "14px", margin: "0 0 16px" }}>
            We could not find matching opportunities right now. You can explore all listings using the category cards above.
          </p>
          {onStartOnboarding && (
            <button
              type="button"
              onClick={onStartOnboarding}
              style={{
                background: "#f7f4ec",
                color: "#396645",
                border: "1.5px solid #c9dec3",
                borderRadius: "999px",
                padding: "8px 20px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Update Preferences ✎
            </button>
          )}
        </div>
      )}

      {/* Profile onboarding prompt */}
      {!hasPreferences ? (
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid #ded5c2",
            borderRadius: "20px",
            padding: "40px 30px",
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto",
            boxShadow: "0 3px 12px rgba(60, 50, 30, 0.03)",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "10px" }}>🌱</div>
          <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: "20px", color: "#2c3d2a", margin: "0 0 8px" }}>
            Complete your profile to get personalized opportunities 🌱
          </h3>
          <p style={{ color: "#60725c", fontSize: "14px", lineHeight: "1.45", maxWidth: "460px", margin: "0 auto 20px" }}>
            Tell us about your target roles, skills, and opportunity preferences so our system can curate the best matching internships, hackathons, and scholarships for you.
          </p>
          {onStartOnboarding && (
            <button
              type="button"
              className="btn-coral"
              onClick={onStartOnboarding}
              style={{
                background: "#ea655d",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "10px 24px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "Nunito, sans-serif",
                boxShadow: "0 3px 12px rgba(234, 101, 93, 0.25)",
              }}
            >
              Set Up My Profile →
            </button>
          )}
        </div>
      ) : (
        !isLoadingBackend && !errorMessage && backendRecommendations.length > 0 && (
          <div className="dash-recommended-grid">
            {backendRecommendations.map((opp) => (
              <RecommendedOpportunityCard
                key={opp.id || opp._id}
                opportunity={opp}
                onSelectOpportunity={(item) => setSelectedOpp(item)}
              />
            ))}
          </div>
        )
      )}

      {/* Universal Opportunity Modal */}
      {selectedOpp && (
        <OpportunityModal
          opportunity={selectedOpp}
          isOpen={Boolean(selectedOpp)}
          onClose={() => setSelectedOpp(null)}
        />
      )}
    </section>
  );
}
