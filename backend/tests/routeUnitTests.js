// OppurtuNest — Route Unit Tests
// Tests route response formats, validation, and error handling without requiring live Atlas connection.

const express = require("express");
const opportunityRoutes = require("../routes/opportunityRoutes");
const studentRoutes = require("../routes/studentRoutes");
const recommendationRoutes = require("../routes/recommendationRoutes");
const Opportunity = require("../models/Opportunity");
const Student = require("../models/Student");

const app = express();
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "OppurtuNest backend is running" });
});

app.use("/api/students", studentRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

async function runUnitTests() {
  console.log("Running route unit tests on Express application...");

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
    // 1. /api/test
    const testRes = await fetch(`${baseUrl}/api/test`);
    const testJson = await testRes.json();
    assert(testRes.status === 200 && testJson.message === "OppurtuNest backend is running", "GET /api/test returns 200 and greeting");

    // 2. 404 Unknown Route
    const notFoundRes = await fetch(`${baseUrl}/api/unknown-endpoint`);
    const notFoundJson = await notFoundRes.json();
    assert(notFoundRes.status === 404 && notFoundJson.message === "Endpoint not found", "Unknown endpoint returns 404 JSON");

    // 3. Invalid Student ID validation
    const invalidStudentRes = await fetch(`${baseUrl}/api/students/not-an-id`);
    const invalidStudentJson = await invalidStudentRes.json();
    assert(invalidStudentRes.status === 400 && invalidStudentJson.message === "Invalid student ID", "GET /api/students/:id rejects invalid ObjectId with 400");

    // 4. Invalid Recommendation Student ID validation
    const invalidRecRes = await fetch(`${baseUrl}/api/recommendations/not-an-id`);
    const invalidRecJson = await invalidRecRes.json();
    assert(invalidRecRes.status === 400 && invalidRecJson.message === "Invalid student ID", "GET /api/recommendations/:id rejects invalid ObjectId with 400");

    // 5. Invalid Student ID on PUT
    const invalidPutRes = await fetch(`${baseUrl}/api/students/not-an-id`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated" }),
    });
    const invalidPutJson = await invalidPutRes.json();
    assert(invalidPutRes.status === 400 && invalidPutJson.message === "Invalid student ID", "PUT /api/students/:id rejects invalid ObjectId with 400");

    // 6. Invalid Student ID on DELETE
    const invalidDelRes = await fetch(`${baseUrl}/api/students/not-an-id`, {
      method: "DELETE",
    });
    const invalidDelJson = await invalidDelRes.json();
    assert(invalidDelRes.status === 400 && invalidDelJson.message === "Invalid student ID", "DELETE /api/students/:id rejects invalid ObjectId with 400");

    console.log(`\nUnit Tests Summary: ${passed} passed, ${failed} failed`);
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error("Test error:", err);
    server.close();
    process.exit(1);
  }
}

runUnitTests();
