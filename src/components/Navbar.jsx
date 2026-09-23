import React from "react";
import { CompassLeafLogo } from "./Illustrations";

export default function Navbar() {
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

        {/* Right: Navigation Links */}
        <nav className="navbar-nav">
          <a href="#home" className="nav-item active">Home</a>
          <a href="#opportunities" className="nav-item">Opportunities</a>
          <a href="#resources" className="nav-item">Resources</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#contact" className="nav-item">Contact</a>
        </nav>
      </div>
    </header>
  );
}
