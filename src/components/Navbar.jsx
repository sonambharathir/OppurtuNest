import React from "react";
import { CompassLeafLogo } from "./Illustrations";

export default function Navbar({
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenProfile,
  onOpenDashboard,
}) {
  return (
    <header className="site-navbar">
      <div className="navbar-container">
        {/* Left: Brand Logo & Name */}
        <a href="#home" className="navbar-brand">
          <span className="brand-icon-wrapper">
            <CompassLeafLogo />
          </span>
          <span className="brand-title">OppurtuNest</span>
        </a>

        {/* Right: Navigation Links & Auth State */}
        <nav className="navbar-nav" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a href="#home" className="nav-item active">Home</a>
          <a href="#opportunities" className="nav-item">Opportunities</a>
          <a href="#resources" className="nav-item">Resources</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#contact" className="nav-item">Contact</a>

          {/* User Auth State */}
          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "6px" }}>
              <button
                type="button"
                onClick={onOpenDashboard || onOpenProfile}
                title="Open your personalized dashboard"
                style={{
                  background: "#edf5ea",
                  color: "#284f32",
                  border: "1px solid #c2dec0",
                  borderRadius: "999px",
                  padding: "5px 12px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                👤 {currentUser.name || "My Account"}
              </button>

              <button
                type="button"
                onClick={onLogout}
                title="Log out and clear session data"
                style={{
                  background: "#ffffff",
                  color: "#a04332",
                  border: "1.5px solid #eec0b6",
                  borderRadius: "999px",
                  padding: "5px 12px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                🚪 Log Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              style={{
                marginLeft: "6px",
                background: "#326244",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "6px 16px",
                fontFamily: "Nunito, sans-serif",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(50, 98, 68, 0.2)",
                transition: "all 0.15s ease",
              }}
            >
              Log In 🌱
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
