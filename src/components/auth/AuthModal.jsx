import { useState } from "react";
import { loginUser, registerUser } from "../../utils/api";
import {
  saveCurrentUser,
  saveProfile,
  saveStudentId,
  saveAuthToken,
  saveUserToVault,
  getUserFromVault,
  mapStudentToProfile,
} from "../../utils/profileStorage";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [degree, setDegree] = useState("B.Tech");
  const [branch, setBranch] = useState("Computer Science");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password || !password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // --- SIGN UP / REGISTER ---
        let studentRecord = null;
        let authToken = null;

        try {
          const res = await registerUser({
            name: name.trim() || "Student",
            email: cleanEmail,
            password: password.trim(),
            degree,
            branch,
            skills: [],
            goals: ["Explore Opportunities"],
          });
          studentRecord = res?.user;
          authToken = res?.token;
        } catch (apiErr) {
          console.warn("[AuthModal] Backend registration fallback:", apiErr.message);
        }

        const newUserAccount = {
          _id: studentRecord?._id || `user_${Date.now()}`,
          name: name.trim() || studentRecord?.name || "Student",
          email: cleanEmail,
          degree,
          branch,
          skills: studentRecord?.skills || [],
          goals: studentRecord?.goals || ["Explore Opportunities"],
        };

        const newProfile = mapStudentToProfile(studentRecord || newUserAccount);

        if (authToken) {
          saveAuthToken(authToken);
        }
        saveUserToVault({ ...newUserAccount, profile: newProfile });
        saveCurrentUser(newUserAccount);
        saveProfile(newProfile);
        if (newUserAccount._id) saveStudentId(newUserAccount._id);

        setIsLoading(false);
        if (onAuthSuccess) onAuthSuccess(newUserAccount, newProfile);
        onClose();
      } else {
        // --- LOG IN ---
        let studentRecord = null;
        let authToken = null;

        try {
          const res = await loginUser(cleanEmail, password.trim());
          studentRecord = res?.user;
          authToken = res?.token;
        } catch (apiErr) {
          // Fallback to local vault if backend offline
          const vaultUser = getUserFromVault(cleanEmail);
          if (vaultUser) {
            studentRecord = vaultUser;
          } else {
            throw new Error(apiErr.message || "Invalid email or password.");
          }
        }

        if (!studentRecord) {
          throw new Error("User record could not be retrieved.");
        }

        const mappedProfile = mapStudentToProfile(studentRecord);

        if (authToken) {
          saveAuthToken(authToken);
        }
        saveCurrentUser(studentRecord);
        saveProfile(mappedProfile);
        if (studentRecord._id) saveStudentId(studentRecord._id);

        setIsLoading(false);
        if (onAuthSuccess) onAuthSuccess(studentRecord, mappedProfile);
        onClose();
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || "Authentication failed. Please try again.");
    }
  };

  // Quick Demo Account Helper with Real Backend Authentication
  const handleQuickDemoLogin = async (demoName, demoEmail, demoDegree, demoBranch, demoSkills, demoInterests) => {
    setName(demoName);
    setEmail(demoEmail);
    setPassword("password123");
    setDegree(demoDegree);
    setBranch(demoBranch);
    setIsLoading(true);

    try {
      // Attempt login or register on backend
      let res = null;
      try {
        res = await loginUser(demoEmail, "password123");
      } catch (loginErr) {
        res = await registerUser({
          name: demoName,
          email: demoEmail,
          password: "password123",
          degree: demoDegree,
          branch: demoBranch,
          skills: demoSkills,
          interests: demoInterests || [],
          goals: ["Find internships", "Build real projects"],
        });
      }

      const studentRecord = res?.user || {
        name: demoName,
        email: demoEmail,
        degree: demoDegree,
        branch: demoBranch,
        skills: demoSkills,
        interests: demoInterests || [],
      };

      if (res?.token) {
        saveAuthToken(res.token);
      }

      const demoProfile = mapStudentToProfile(studentRecord);
      saveCurrentUser(studentRecord);
      saveProfile(demoProfile);
      if (studentRecord._id) saveStudentId(studentRecord._id);

      setIsLoading(false);
      if (onAuthSuccess) onAuthSuccess(studentRecord, demoProfile);
      onClose();
    } catch (err) {
      // Fallback
      const demoUser = {
        _id: `demo_${demoEmail.split("@")[0]}`,
        name: demoName,
        email: demoEmail,
        degree: demoDegree,
        branch: demoBranch,
        skills: demoSkills,
        interests: demoInterests || [],
        goals: ["Find internships", "Build real projects"],
      };
      const demoProfile = mapStudentToProfile(demoUser);
      saveCurrentUser(demoUser);
      saveProfile(demoProfile);
      saveStudentId(demoUser._id);
      setIsLoading(false);
      if (onAuthSuccess) onAuthSuccess(demoUser, demoProfile);
      onClose();
    }
  };

  return (
    <div
      className="qa-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{ zIndex: 1100 }}
    >
      <div
        className="qa-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "28px 24px",
          boxShadow: "0 12px 40px rgba(45, 80, 60, 0.16)",
          border: "2px solid #ded5c2",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "24px" }}>🌱</span>
            <h2 style={{ margin: 0, fontFamily: "Fredoka, sans-serif", fontSize: "22px", color: "#223f35" }}>
              {isSignUp ? "Create Student Account" : "Log In to OppurtuNest"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "22px",
              color: "#8a9c88",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "flex",
            background: "#f4f1e8",
            borderRadius: "999px",
            padding: "3px",
            marginBottom: "18px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setErrorMessage("");
            }}
            style={{
              flex: 1,
              padding: "7px 12px",
              border: "none",
              borderRadius: "999px",
              background: !isSignUp ? "#ffffff" : "transparent",
              color: !isSignUp ? "#255333" : "#768673",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: !isSignUp ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.15s ease",
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setErrorMessage("");
            }}
            style={{
              flex: 1,
              padding: "7px 12px",
              border: "none",
              borderRadius: "999px",
              background: isSignUp ? "#ffffff" : "transparent",
              color: isSignUp ? "#255333" : "#768673",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: isSignUp ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.15s ease",
            }}
          >
            New Student? Sign Up
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div
            style={{
              background: "#fdf1ec",
              border: "1px solid #f2cfc4",
              color: "#9e432f",
              borderRadius: "10px",
              padding: "9px 14px",
              fontSize: "12.5px",
              fontWeight: 600,
              marginBottom: "14px",
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {isSignUp && (
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#4f664d", marginBottom: "4px" }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Sharma"
                required={isSignUp}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "9px 12px",
                  borderRadius: "10px",
                  border: "1.5px solid #ded5c2",
                  fontSize: "13.5px",
                  fontFamily: "Nunito, sans-serif",
                  outline: "none",
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#4f664d", marginBottom: "4px" }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rohan@example.com"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "9px 12px",
                borderRadius: "10px",
                border: "1.5px solid #ded5c2",
                fontSize: "13.5px",
                fontFamily: "Nunito, sans-serif",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#4f664d", marginBottom: "4px" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "9px 12px",
                borderRadius: "10px",
                border: "1.5px solid #ded5c2",
                fontSize: "13.5px",
                fontFamily: "Nunito, sans-serif",
                outline: "none",
              }}
            />
          </div>

          {isSignUp && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#4f664d", marginBottom: "4px" }}>
                  Degree
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "8px 10px",
                    borderRadius: "10px",
                    border: "1.5px solid #ded5c2",
                    fontSize: "12.5px",
                    fontFamily: "Nunito, sans-serif",
                  }}
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E.">B.E.</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="B.Sc">B.Sc</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#4f664d", marginBottom: "4px" }}>
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "8px 10px",
                    borderRadius: "10px",
                    border: "1.5px solid #ded5c2",
                    fontSize: "12.5px",
                    fontFamily: "Nunito, sans-serif",
                  }}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Tech</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Electronics & Comm">ECE</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: "8px",
              background: "#326244",
              color: "#ffffff",
              border: "none",
              borderRadius: "999px",
              padding: "11px 20px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: isLoading ? "wait" : "pointer",
              boxShadow: "0 3px 12px rgba(50, 98, 68, 0.25)",
              transition: "all 0.15s ease",
            }}
          >
            {isLoading ? "Please wait..." : isSignUp ? "Create My Account & Start →" : "Log In →"}
          </button>
        </form>

        {/* Demo Fast Login Helpers */}
        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px dashed #ded5c2" }}>
          <span style={{ display: "block", fontSize: "11.5px", fontWeight: 800, color: "#788a75", textTransform: "uppercase", marginBottom: "8px" }}>
            ⚡ Fast Demo Logins (Click to try):
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin(
                  "Rohan Sharma",
                  "rohan.cs@oppurtunest.local",
                  "B.Tech",
                  "Computer Science",
                  ["JavaScript", "React", "Node.js", "Python", "REST APIs"],
                  ["Technology & Software", "Web Development"]
                )
              }
              style={{
                textAlign: "left",
                background: "#f8faf5",
                border: "1px solid #d2e4ce",
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: "12px",
                color: "#275031",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              👤 <strong>Rohan Sharma</strong> — CS • React, Node.js, Python
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin(
                  "Ananya Patel",
                  "ananya.ai@oppurtunest.local",
                  "B.Tech",
                  "AI & Data Science",
                  ["Python", "Machine Learning", "PyTorch", "Data Science", "SQL"],
                  ["AI & Data", "Machine Learning"]
                )
              }
              style={{
                textAlign: "left",
                background: "#f8faf5",
                border: "1px solid #d2e4ce",
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: "12px",
                color: "#275031",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              👤 <strong>Ananya Patel</strong> — AI & DS • ML, PyTorch, SQL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
