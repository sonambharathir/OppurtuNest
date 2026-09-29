import { useState, useMemo, useEffect, useCallback } from "react";
import RecommendedOpportunityCard from "./RecommendedOpportunityCard";
import OpportunityModal from "../skillJourney/OpportunityModal";
import { getProfile, getResume, getCurrentUser } from "../../utils/profileStorage";
import {
  getCurrentStudentRecommendations,
  getRecommendationsWithProfile,
  getOpportunities,
} from "../../utils/api";
import { getPersonalizedRecommendations } from "../../utils/recommendationUtils";

export default function RecommendedSection({
  profileData,
  uploadedResume,
  onStartOnboarding,
  onOpenResume,
}) {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [backendRecommendations, setBackendRecommendations] = useState([]);
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Retrieve stored profile from localStorage if not explicitly passed as prop
  const activeProfile = useMemo(() => {
    return profileData || getProfile();
  }, [profileData]);

  // Retrieve active resume (prop or localStorage)
  const activeResume = useMemo(() => {
    return uploadedResume || getResume();
  }, [uploadedResume]);

  // Unified skills list combining profile skills, detected resume skills, and stored resume skills
  const unifiedSkills = useMemo(() => {
    const pSkills = Array.isArray(activeProfile?.selectedSkills)
      ? activeProfile.selectedSkills
      : Array.isArray(activeProfile?.skills)
      ? activeProfile.skills
      : [];
    const rSkills = Array.isArray(activeResume?.detectedSkills)
      ? activeResume.detectedSkills
      : Array.isArray(activeProfile?.resumeSkills)
      ? activeProfile.resumeSkills
      : [];
    const aSkills = Array.isArray(activeProfile?.assessmentSkills)
      ? activeProfile.assessmentSkills
      : [];

    const seen = new Set();
    const result = [];
    [...rSkills, ...pSkills, ...aSkills].forEach((s) => {
      if (s && typeof s === "string") {
        const cleanSkill = s.trim();
        const lower = cleanSkill.toLowerCase();
        if (cleanSkill && !seen.has(lower)) {
          seen.add(lower);
          result.push(cleanSkill);
        }
      }
    });
    return result;
  }, [activeProfile, activeResume]);

  const hasPreferences = Boolean(
    unifiedSkills.length > 0 ||
    activeProfile?.goals?.length > 0 ||
    activeProfile?.opportunityTypes?.length > 0 ||
    activeProfile?.preferredRoles?.length > 0 ||
    activeProfile?.selectedInterests?.length > 0 ||
    activeProfile?.degree
  );

  // Fetch recommendations tailored to real student skills & resume
  const fetchRecommendations = useCallback(async () => {
    if (!hasPreferences) {
      setBackendRecommendations([]);
      return;
    }

    setIsLoadingBackend(true);
    setErrorMessage(null);

    const recommendationProfile = {
      ...(activeProfile || {}),
      skills: unifiedSkills,
      selectedSkills: unifiedSkills,
      resumeSkills: activeResume?.detectedSkills || activeProfile?.resumeSkills || [],
      resume: activeResume || activeProfile?.resume || null,
    };

    let fetchedSuccessfully = false;

    // 1. Primary: Request recommendations from backend
    try {
      const data = await getRecommendationsWithProfile(recommendationProfile, 6);
      if (Array.isArray(data)) {
        setBackendRecommendations(data);
        fetchedSuccessfully = true;
        setIsLoadingBackend(false);
        return;
      }
    } catch (apiErr) {
      console.warn("[RecommendedSection] Backend recommendation call failed, attempting client-side fallback:", apiErr.message);
    }

    // 2. Resilient Fallback: Calculate client-side using live database opportunities
    try {
      const opps = await getOpportunities();
      if (Array.isArray(opps)) {
        const localRecs = getPersonalizedRecommendations(opps, recommendationProfile, 6);
        setBackendRecommendations(localRecs);
        fetchedSuccessfully = true;
        setIsLoadingBackend(false);
        return;
      }
    } catch (fallbackErr) {
      console.error("[RecommendedSection] Fallback recommendation calculation failed:", fallbackErr.message);
    }

    if (!fetchedSuccessfully) {
      setErrorMessage("Unable to load opportunities right now.");
      setBackendRecommendations([]);
    }
    setIsLoadingBackend(false);
  }, [activeProfile, activeResume, unifiedSkills, hasPreferences]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <section className="dash-recommended-section">
      <div className="dash-section-header">
        <div className="dash-section-title-wrap">
          <span className="dash-section-eyebrow">✦ RECOMMENDED FOR YOU 🌱</span>
          <h2 className="dash-section-title">Picked based on your profile and interests.</h2>

          {/* Active Resume / Skills Indicator */}
          {activeResume?.detectedSkills?.length > 0 && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#f0f7ee",
                border: "1px solid #b7dab2",
                borderRadius: "12px",
                padding: "4px 12px",
                fontSize: "12px",
                color: "#2b5735",
                fontWeight: 700,
                marginTop: "6px",
                width: "fit-content",
              }}
            >
              <span>📄</span>
              <span>
                Personalized with <strong>{activeResume.fileName || "Resume"}</strong> ({activeResume.detectedSkills.length} skills detected)
              </span>
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#214e2b",
                    fontWeight: 800,
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "11.5px",
                    marginLeft: "4px",
                  }}
                >
                  Change Resume
                </button>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {hasPreferences && (
            <span className="dash-personalized-tag">
              ✓ Filtered for {unifiedSkills.length > 0 ? `${unifiedSkills.length} skills` : "your profile"}
            </span>
          )}

          {!activeResume && onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              style={{
                background: "#ffffff",
                border: "1.5px dashed #527a56",
                borderRadius: "999px",
                padding: "5px 14px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#2b5735",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
              title="Upload your resume to extract skills and improve recommendations"
            >
              <span>📄</span> Upload Resume
            </button>
          )}
        </div>
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
