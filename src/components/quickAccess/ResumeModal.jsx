import { useState, useEffect, useRef } from "react";
import { parseResumeText, extractTextFromFile } from "../../utils/resumeParser";

export default function ResumeModal({
  isOpen,
  onClose,
  onResumeAnalyzed,
  currentResume,
}) {
  const [activeTab, setActiveTab] = useState("file"); // "file" | "paste"
  const [pastedText, setPastedText] = useState("");
  const [file, setFile] = useState(currentResume || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  // Sync with currentResume when modal opens
  useEffect(() => {
    if (currentResume) {
      setFile(currentResume);
    }
  }, [currentResume, isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Process real file
  const handleFileProcess = async (selectedFile) => {
    if (!selectedFile) return;
    setIsAnalyzing(true);

    try {
      const extractedText = await extractTextFromFile(selectedFile);
      const parsed = parseResumeText(extractedText, selectedFile.name);
      parsed.size = `${Math.max(1, Math.round(selectedFile.size / 1024))} KB`;

      setTimeout(() => {
        setFile(parsed);
        setIsAnalyzing(false);
        if (onResumeAnalyzed) {
          onResumeAnalyzed(parsed);
        }
      }, 600);
    } catch (err) {
      console.error("Error reading resume file:", err);
      // Fallback
      const parsed = parseResumeText(selectedFile.name, selectedFile.name);
      setFile(parsed);
      setIsAnalyzing(false);
    }
  };

  // Process pasted text
  const handlePastedTextProcess = (e) => {
    e.preventDefault();
    if (!pastedText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const parsed = parseResumeText(pastedText, "Pasted_Resume_Text.txt");
      parsed.size = `${Math.round(pastedText.length / 1024 * 10) / 10} KB`;
      setFile(parsed);
      setIsAnalyzing(false);
      if (onResumeAnalyzed) {
        onResumeAnalyzed(parsed);
      }
    }, 500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Load a realistic sample resume for testing
  const handleLoadSample = () => {
    setIsAnalyzing(true);
    const sampleText = `
      Alex Chen - Frontend & Full Stack Developer
      Email: alex.chen@example.com | Phone: (555) 234-5678 | github.com/alexchen
      
      SKILLS:
      React, JavaScript, HTML & CSS, TypeScript, Git & GitHub, Tailwind, REST APIs, Problem Solving, Communication
      
      EXPERIENCE & PROJECTS:
      Web Application Developer - Built responsive user interfaces in React and JavaScript.
      Optimized page load speeds by 30% and implemented modern component architecture.
      Created collaborative tools using Git and GitHub workflows with Scrum and Agile teams.
    `;
    setTimeout(() => {
      const parsed = parseResumeText(sampleText, "Alex_Chen_Sample_Resume.pdf");
      parsed.size = "142 KB";
      setFile(parsed);
      setIsAnalyzing(false);
      if (onResumeAnalyzed) {
        onResumeAnalyzed(parsed);
      }
    }, 500);
  };

  const handleReset = () => {
    setFile(null);
    setPastedText("");
  };

  return (
    <div className="qa-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="qa-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="qa-modal-header">
          <div className="qa-header-left">
            <div className="qa-header-icon">📄</div>
            <div>
              <h2 className="qa-modal-title">Upload Resume</h2>
              <p className="qa-modal-subtitle">
                Upload your real resume to find your actual skills, ATS score, and quick tips.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="qa-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="qa-modal-body">
          {/* State 1: Choose File / Paste Text */}
          {!file && !isAnalyzing && (
            <div className="qa-upload-flow">
              {/* Tab Selector */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <button
                  type="button"
                  onClick={() => setActiveTab("file")}
                  className={`qa-sample-btn ${activeTab === "file" ? "active" : ""}`}
                  style={{
                    background: activeTab === "file" ? "#eaf3e6" : "#ffffff",
                    borderColor: activeTab === "file" ? "#6f9a62" : "#ded5c2",
                    color: activeTab === "file" ? "#2b5735" : "#637560",
                  }}
                >
                  📁 Upload Document
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("paste")}
                  className={`qa-sample-btn ${activeTab === "paste" ? "active" : ""}`}
                  style={{
                    background: activeTab === "paste" ? "#eaf3e6" : "#ffffff",
                    borderColor: activeTab === "paste" ? "#6f9a62" : "#ded5c2",
                    color: activeTab === "paste" ? "#2b5735" : "#637560",
                  }}
                >
                  ✍️ Paste Resume Text
                </button>
              </div>

              {activeTab === "file" ? (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                  />

                  <div
                    className={`qa-dropzone ${isDragging ? "dragging" : ""}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <div className="qa-dropzone-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p className="qa-dropzone-title">
                      Drag & drop your resume here, or <span className="qa-browse-link">Browse files</span>
                    </p>
                    <p className="qa-dropzone-hint">
                      Supports PDF, DOCX, DOC or TXT (Max 10 MB)
                    </p>
                  </div>

                  <div className="qa-sample-btn-wrap">
                    <button
                      type="button"
                      className="qa-sample-btn"
                      onClick={handleLoadSample}
                    >
                      <span>✨</span> Don't have a file right now? Try a Sample Resume
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handlePastedTextProcess} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <textarea
                    rows={6}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste your resume contents or skills here (e.g. skills, job experience, projects)..."
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: "1.5px solid #ded5c2",
                      fontFamily: "Nunito, sans-serif",
                      fontSize: "13.5px",
                      resize: "vertical",
                      outline: "none",
                    }}
                    required
                  />
                  <button
                    type="submit"
                    className="qa-btn-primary"
                    style={{ alignSelf: "flex-end" }}
                  >
                    Analyze Pasted Text →
                  </button>
                </form>
              )}
            </div>
          )}

          {/* State 2: Analyzing Loader */}
          {isAnalyzing && (
            <div className="qa-analyzing-box">
              <div className="qa-analyzing-spinner" />
              <p className="qa-analyzing-text">Reading resume text & extracting your real skills...</p>
            </div>
          )}

          {/* State 3: Analyzed Results */}
          {file && !isAnalyzing && (
            <>
              {/* File Info Bar */}
              <div className="qa-file-bar">
                <div className="qa-file-info">
                  <span className="qa-file-doc-icon">📑</span>
                  <div>
                    <span className="qa-file-name">{file.fileName}</span>
                    {file.size && <span className="qa-file-size">({file.size})</span>}
                  </div>
                </div>
                <button
                  type="button"
                  className="qa-reupload-btn"
                  onClick={handleReset}
                >
                  Upload Another Resume
                </button>
              </div>

              {/* ATS Score Card */}
              <div className="qa-score-card">
                <div className="qa-score-circle">
                  <span className="qa-score-number">{file.score}</span>
                  <span className="qa-score-out-of">/ 100</span>
                </div>
                <div className="qa-score-details">
                  <h3 className="qa-score-title">ATS Health Score: {file.status}</h3>
                  <p className="qa-score-desc">
                    {file.score >= 80
                      ? "Great job! Your resume format and keywords are easily understood by hiring systems."
                      : "Good foundation! Follow the tips below to boost your resume score."}
                  </p>
                </div>
              </div>

              {/* Real Extracted Skills */}
              <div className="qa-checklist-box">
                <h4 className="qa-section-label">
                  <span>🎯</span> Actual Skills Found in Your Resume ({file.detectedSkills.length})
                </h4>
                <div className="qa-skills-pills">
                  {file.detectedSkills.map((sk) => (
                    <span key={sk} className="qa-skill-pill">
                      <span>✓</span> {sk}
                    </span>
                  ))}
                </div>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#6a7c68" }}>
                  💡 These skills will now be used automatically in your <strong>Skill Analyzer</strong>!
                </p>
              </div>

              {/* Real Checklist */}
              <div className="qa-checklist-box">
                <h4 className="qa-section-label">Format & Content Checklist</h4>
                <div className="qa-check-item">
                  <span className="qa-check-badge">{file.hasEmail ? "✅" : "⚠️"}</span>
                  <div className="qa-check-content">
                    <span className="qa-check-title">Email Address</span>
                    <span className="qa-check-note">
                      {file.hasEmail ? "Valid email found." : "No clear email detected. Make sure it's at the top."}
                    </span>
                  </div>
                </div>

                <div className="qa-check-item">
                  <span className="qa-check-badge">{file.hasPhone ? "✅" : "⚠️"}</span>
                  <div className="qa-check-content">
                    <span className="qa-check-title">Phone Number</span>
                    <span className="qa-check-note">
                      {file.hasPhone ? "Phone number detected." : "Phone number missing."}
                    </span>
                  </div>
                </div>

                <div className="qa-check-item">
                  <span className="qa-check-badge">{file.hasLinks ? "✅" : "⚠️"}</span>
                  <div className="qa-check-content">
                    <span className="qa-check-title">Online Links (GitHub, LinkedIn, or Portfolio)</span>
                    <span className="qa-check-note">
                      {file.hasLinks ? "Profile link detected." : "Consider adding your GitHub or LinkedIn link."}
                    </span>
                  </div>
                </div>

                <div className="qa-check-item">
                  <span className="qa-check-badge">{file.metricCount > 0 ? "✅" : "⚠️"}</span>
                  <div className="qa-check-content">
                    <span className="qa-check-title">Measurable Numbers</span>
                    <span className="qa-check-note">
                      {file.metricCount > 0
                        ? `Found ${file.metricCount} measurable metric(s).`
                        : "Tip: Add numbers (e.g. 'improved page speed by 25%')."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Simple Improvement Tips */}
              <div className="qa-tips-box">
                <h4 className="qa-tips-title">💡 Simple Tips to Stand Out</h4>
                <ul className="qa-tips-list">
                  <li>Check out the <strong>Skill Analyzer</strong> to see which skills to learn next for your dream job!</li>
                  <li>Use action verbs like <em>Built</em>, <em>Optimized</em>, and <em>Engineered</em>.</li>
                  <li>Keep descriptions concise and focused on results.</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="qa-modal-footer">
          <button
            type="button"
            className="qa-btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          {file && !isAnalyzing && (
            <button
              type="button"
              className="qa-btn-primary"
              onClick={() => {
                if (onResumeAnalyzed) {
                  onResumeAnalyzed(file);
                }
                onClose();
              }}
            >
              Use My Skills ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
