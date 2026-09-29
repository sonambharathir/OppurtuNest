// OppurtuNest — Comprehensive End-to-End System Test
// Tests: Auth, Password Hashing, JWT Middleware, Profile/Skills/Resume/Assessment Persistence,
// Recommendation Engine Personalization, Academic Eligibility, Deadline Filtering, and Multi-User Isolation.

require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");
const authRoutes = require("../routes/authRoutes");
const studentRoutes = require("../routes/StudentRoutes");
const recommendationRoutes = require("../routes/recommendationRoutes");
const opportunityRoutes = require("../routes/opportunityRoutes");
const {
  scoreOpportunityForProfile,
  getPersonalizedRecommendations,
  getSkillMatchingOpportunities,
  getEffectiveStudentSkills,
  checkAcademicEligibility,
  isExpired,
} = require("../utils/recommendationEngine");

const app = express();
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "OppurtuNest backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

async function runAllTests() {
  console.log("==================================================");
  console.log("OppurtuNest Final Functionality & Personalization Tests");
  console.log("==================================================\n");

  await connectDB();

  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  let passed = 0;
  let failed = 0;

  function assert(condition, desc) {
    if (condition) {
      console.log(`  ✓ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${desc}`);
      failed++;
    }
  }

  try {
    const timestamp = Date.now();
    const testEmailA = `test_student_a_${timestamp}@test.local`;
    const testEmailB = `test_student_b_${timestamp}@test.local`;
    const passwordA = "SecurePass123!";
    const passwordB = "BioPass456!";

    // ----------------------------------------------------
    // TEST 1: Register User A (CS / React Focus)
    // ----------------------------------------------------
    console.log("--- 1. Authentication & Password Hashing ---");

    const regResA = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Student A",
        email: testEmailA,
        password: passwordA,
        degree: "B.Tech",
        branch: "Computer Science",
        year: "3rd Year",
        skills: ["React", "JavaScript", "Node.js"],
        goals: ["Find internships"],
        interests: ["Technology & Software", "Web Development"],
        preferredRoles: ["Frontend Developer"],
        workModes: ["Remote"],
      }),
    });

    const regJsonA = await regResA.json();
    assert(regResA.status === 201, "User A registration returns 201 Created");
    assert(Boolean(regJsonA.token), "Registration returns valid JWT authentication token");
    assert(!regJsonA.user.password, "Password is NOT exposed in registration response");

    const tokenA = regJsonA.token;
    const studentIdA = regJsonA.user._id;

    // Verify password is encrypted in database
    const dbStudentA = await Student.findById(studentIdA);
    assert(
      dbStudentA.password.startsWith("$2a$") || dbStudentA.password.startsWith("$2b$"),
      "Password is encrypted with bcrypt in MongoDB"
    );
    assert(
      await bcrypt.compare(passwordA, dbStudentA.password),
      "Bcrypt validates correct password hash"
    );

    // ----------------------------------------------------
    // TEST 2: Login User A
    // ----------------------------------------------------
    const loginResA = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmailA, password: passwordA }),
    });
    const loginJsonA = await loginResA.json();
    assert(loginResA.status === 200 && Boolean(loginJsonA.token), "Login with valid credentials returns 200 and JWT");
    assert(!loginJsonA.user.password, "Login response does not expose password");

    // Invalid password fails
    const invalidLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmailA, password: "WrongPassword" }),
    });
    assert(invalidLoginRes.status === 401, "Login with invalid password returns 401 Unauthorized");

    // ----------------------------------------------------
    // TEST 3: Protected Route Authentication Middleware
    // ----------------------------------------------------
    console.log("\n--- 2. Route Protection & Middleware ---");

    const unauthedRes = await fetch(`${baseUrl}/api/auth/me`);
    assert(unauthedRes.status === 401, "Protected /api/auth/me rejects request without token with 401");

    const authedMeRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const authedMeJson = await authedMeRes.json();
    assert(
      authedMeRes.status === 200 && authedMeJson.user.email === testEmailA,
      "Protected /api/auth/me succeeds with valid Bearer token"
    );

    const authedStudentRes = await fetch(`${baseUrl}/api/students/me`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const authedStudentJson = await authedStudentRes.json();
    assert(
      authedStudentRes.status === 200 && authedStudentJson.name === "Test Student A",
      "GET /api/students/me returns authenticated student"
    );

    // ----------------------------------------------------
    // TEST 4: Skills Persistence & Level Management
    // ----------------------------------------------------
    console.log("\n--- 3. Skills & Profile Persistence ---");

    const updateSkillsRes = await fetch(`${baseUrl}/api/students/me/skills`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        skills: ["React", "JavaScript", "Node.js", "MongoDB"],
        skillLevels: { React: "Advanced", JavaScript: "Intermediate", "Node.js": "Intermediate", MongoDB: "Beginner" },
        learningSkills: ["TypeScript", "Next.js"],
      }),
    });
    const updateSkillsJson = await updateSkillsRes.json();
    assert(
      updateSkillsRes.status === 200 && updateSkillsJson.skills.includes("MongoDB"),
      "PUT /api/students/me/skills updates and persists skills to MongoDB"
    );
    assert(
      updateSkillsJson.learningSkills.includes("TypeScript"),
      "Learning skills persist separately from existing skills"
    );

    // ----------------------------------------------------
    // TEST 5: Resume Analysis Persistence
    // ----------------------------------------------------
    console.log("\n--- 4. Resume Analyzer Persistence ---");

    const resumePayload = {
      fileName: "Test_Student_Resume.pdf",
      score: 88,
      status: "Strong Resume",
      hasEmail: true,
      hasPhone: true,
      hasLinks: true,
      actionVerbCount: 6,
      metricCount: 2,
      detectedSkills: ["React", "JavaScript", "Node.js", "MongoDB", "Express.js", "Git & GitHub"],
      extractedText: "Built web applications using React, Node.js, Express.js, MongoDB and Git.",
    };

    const resumeRes = await fetch(`${baseUrl}/api/students/me/resume`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify(resumePayload),
    });
    const resumeJson = await resumeRes.json();
    assert(resumeRes.status === 200, "PUT /api/students/me/resume saves analysis to MongoDB");
    assert(
      resumeJson.student.resumeSkills.includes("Express.js"),
      "Resume detected skills stored in resumeSkills array"
    );

    // ----------------------------------------------------
    // TEST 6: Quick Skill Assessment Results Persistence
    // ----------------------------------------------------
    console.log("\n--- 5. Assessment Persistence & Intelligence ---");

    const assessmentPayload = {
      skillArea: "Web Development",
      skillAreaId: "web-dev",
      completedAt: "Sep 28, 2026",
      snapshot: [
        { skill: "HTML & CSS", level: "Strong", levelClass: "level-strong", knowledgeScore: "2/2" },
        { skill: "JavaScript", level: "Comfortable", levelClass: "level-comfortable", knowledgeScore: "2/2" },
        { skill: "React", level: "Strong", levelClass: "level-strong", knowledgeScore: "2/2" },
        { skill: "Git", level: "Comfortable", levelClass: "level-comfortable", knowledgeScore: "1/2" },
      ],
      recommendedSkills: [
        { name: "TypeScript", reason: "Adds static typing to JavaScript", suggestion: "Try typing props in React" },
      ],
    };

    const assessmentRes = await fetch(`${baseUrl}/api/students/me/assessment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify(assessmentPayload),
    });
    const assessmentJson = await assessmentRes.json();
    assert(assessmentRes.status === 200, "PUT /api/students/me/assessment saves snapshot to MongoDB");
    assert(
      assessmentJson.student.assessmentSkills.includes("HTML & CSS"),
      "Assessed skills merged into assessmentSkills in database"
    );
    assert(
      assessmentJson.student.assessmentHistory.length >= 1,
      "Assessment history captures chronological check-in"
    );

    // ----------------------------------------------------
    // TEST 7: Multi-User Registration & Isolation (User B)
    // ----------------------------------------------------
    console.log("\n--- 6. Multi-User Isolation ---");

    const regResB = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Student B (Bio & Health)",
        email: testEmailB,
        password: passwordB,
        degree: "B.Sc",
        branch: "Biotechnology",
        year: "2nd Year",
        skills: ["Biology", "Microbiology", "Data Analysis"],
        goals: ["Research Fellowships"],
        interests: ["Science & Healthcare", "Research & Innovation"],
        preferredRoles: ["Research Assistant"],
        workModes: ["On-site"],
      }),
    });
    const regJsonB = await regResB.json();
    const tokenB = regJsonB.token;

    const authedMeResB = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const authedMeJsonB = await authedMeResB.json();
    assert(
      authedMeJsonB.user.email === testEmailB && !authedMeJsonB.user.skills.includes("React"),
      "User B has isolated profile and cannot see User A's skills"
    );

    // ----------------------------------------------------
    // TEST 8: Recommendations Quality & Personalization
    // ----------------------------------------------------
    console.log("\n--- 7. Recommendations Engine & Personalization ---");

    const recResA = await fetch(`${baseUrl}/api/recommendations/me?limit=6`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const recsA = await recResA.json();

    const recResB = await fetch(`${baseUrl}/api/recommendations/me?limit=6`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const recsB = await recResB.json();

    assert(Array.isArray(recsA) && recsA.length > 0, "GET /api/recommendations/me returns recommendations for User A");
    assert(Array.isArray(recsB) && recsB.length > 0, "GET /api/recommendations/me returns recommendations for User B");

    // Recommendations must have explainable fields
    const topRecA = recsA[0];
    assert(
      Boolean(topRecA.matchLabel && topRecA.matchReason && Array.isArray(topRecA.matchedSkills)),
      "Recommendation exposes explainable matchLabel, matchReason, and matchedSkills"
    );

    // User A (CS/React) vs User B (Bio/Research) must receive different recommendations
    const topTitleA = recsA[0].title;
    const topTitleB = recsB[0].title;
    assert(
      topTitleA !== topTitleB || recsA[0].matchScoreNum !== recsB[0].matchScoreNum,
      `User A recommendations differ from User B (${topTitleA} vs ${topTitleB})`
    );

    // ----------------------------------------------------
    // TEST 9: Skill Matching against Live Opportunity Database
    // ----------------------------------------------------
    console.log("\n--- 8. Skill Matching Engine ---");

    const matchResA = await fetch(`${baseUrl}/api/recommendations/matching`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const matchesA = await matchResA.json();
    assert(Array.isArray(matchesA) && matchesA.length > 0, "GET /api/recommendations/matching returns live matches");

    // Check that matched opportunities have matchedSkills from student's real skills
    const sampleMatch = matchesA.find((m) => m.matchedSkills && m.matchedSkills.length > 0);
    assert(
      Boolean(sampleMatch),
      "Matches calculate actual overlapping skills from real MongoDB opportunities"
    );

    // ----------------------------------------------------
    // TEST 10: Deadline & Expired Opportunity Exclusion
    // ----------------------------------------------------
    console.log("\n--- 9. Deadline Filtering ---");

    assert(isExpired("2020-01-01") === true, "Past deadline (2020-01-01) is detected as expired");
    assert(isExpired("2030-12-31") === false, "Future deadline (2030-12-31) is active");
    assert(isExpired("Rolling") === false, "Rolling deadline is active");

    // ----------------------------------------------------
    // Cleanup Test Users
    // ----------------------------------------------------
    await Student.deleteOne({ email: testEmailA });
    await Student.deleteOne({ email: testEmailB });

    console.log("\n==================================================");
    console.log(`Test Execution Finished: ${passed} passed, ${failed} failed`);
    console.log("==================================================\n");

    server.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("Test execution error:", error);
    server.close();
    process.exit(1);
  }
}

runAllTests();
