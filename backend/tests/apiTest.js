// OppurtuNest — Backend End-to-End API Test Suite
// Tests server health, student CRUD, opportunities, recommendations, and error handling.

const http = require("http");

const BASE_URL = process.env.TEST_URL || "http://localhost:5000";

async function makeRequest(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const fetchOptions = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, fetchOptions);
  let json = null;
  try {
    json = await response.json();
  } catch (err) {
    json = null;
  }

  return {
    status: response.status,
    headers: response.headers,
    data: json,
  };
}

async function runTests() {
  console.log("==================================================");
  console.log("OppurtuNest Backend API Test Suite");
  console.log(`Target: ${BASE_URL}`);
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Server Health Check
    console.log("[Test 1] GET /api/test (Server Liveness)");
    const testRes = await makeRequest("/api/test");
    assert(testRes.status === 200, "Status is 200 OK");
    assert(
      testRes.data && testRes.data.message === "OppurtuNest backend is running",
      "Response message matches"
    );

    // 2. Opportunities Check
    console.log("\n[Test 2] GET /api/opportunities (List opportunities)");
    const oppsRes = await makeRequest("/api/opportunities");
    assert(oppsRes.status === 200, "Status is 200 OK");
    assert(Array.isArray(oppsRes.data), "Returns array of opportunities");
    assert(oppsRes.data.length > 0, `Opportunities count is ${oppsRes.data?.length}`);

    // 3. Opportunities by Category Filter
    console.log("\n[Test 3] GET /api/opportunities?category=Internships");
    const intRes = await makeRequest("/api/opportunities?category=Internships");
    assert(intRes.status === 200, "Status is 200 OK");
    assert(
      Array.isArray(intRes.data) && intRes.data.every((o) => o.category === "Internships"),
      "All returned items belong to Internships category"
    );

    // 4. Opportunity by Custom ID
    console.log("\n[Test 4] GET /api/opportunities/opp-int-1 (Get by custom ID)");
    const singleOppRes = await makeRequest("/api/opportunities/opp-int-1");
    assert(singleOppRes.status === 200, "Status is 200 OK");
    assert(singleOppRes.data && singleOppRes.data.id === "opp-int-1", "Fetched correct opportunity ID");
    assert(Boolean(singleOppRes.data.title), `Title: ${singleOppRes.data?.title}`);

    // 5. Create Student Profile (POST /api/students)
    console.log("\n[Test 5] POST /api/students (Create Student)");
    const newStudentData = {
      name: "Test Engineer",
      email: `test_dev_${Date.now()}@oppurtunest.test`,
      college: "OppurtuNest Engineering Institute",
      degree: "B.Tech",
      branch: "Computer Science",
      year: "3rd Year",
      goals: ["Find internship", "Gain work experience"],
      opportunityTypes: ["Internships", "Hackathons"],
      workModes: ["Remote", "Hybrid"],
      preferredLocation: "Bengaluru, India",
      preferredRoles: ["Frontend Developer", "Web Developer"],
      interests: ["Web Development", "AI & Data"],
      skills: ["React", "JavaScript", "HTML & CSS", "Git"],
    };

    const createRes = await makeRequest("/api/students", {
      method: "POST",
      body: newStudentData,
    });

    assert(createRes.status === 201, "Status is 201 Created");
    assert(Boolean(createRes.data && createRes.data._id), "Returned student document with _id");
    const studentId = createRes.data?._id;

    // 6. Get All Students (GET /api/students)
    console.log("\n[Test 6] GET /api/students (List Students)");
    const listRes = await makeRequest("/api/students");
    assert(listRes.status === 200, "Status is 200 OK");
    assert(
      Array.isArray(listRes.data) && listRes.data.some((s) => s._id === studentId),
      "Created student exists in students list"
    );

    // 7. Get One Student By ID (GET /api/students/:id)
    console.log(`\n[Test 7] GET /api/students/${studentId} (Get Single Student)`);
    const getRes = await makeRequest(`/api/students/${studentId}`);
    assert(getRes.status === 200, "Status is 200 OK");
    assert(getRes.data && getRes.data.name === "Test Engineer", "Fetched student details match");

    // 8. Update Student Profile (PUT /api/students/:id)
    console.log(`\n[Test 8] PUT /api/students/${studentId} (Update Student)`);
    const updateRes = await makeRequest(`/api/students/${studentId}`, {
      method: "PUT",
      body: {
        skills: ["React", "JavaScript", "HTML & CSS", "Git", "Node.js", "Python"],
        preferredRoles: ["Full-Stack Developer", "Frontend Developer"],
      },
    });
    assert(updateRes.status === 200, "Status is 200 OK");
    assert(
      updateRes.data && updateRes.data.skills.includes("Node.js"),
      "Student skills successfully updated with Node.js"
    );

    // 9. Personalized Recommendations (GET /api/recommendations/:studentId)
    console.log(`\n[Test 9] GET /api/recommendations/${studentId} (Recommendations Engine)`);
    const recRes = await makeRequest(`/api/recommendations/${studentId}?limit=5`);
    assert(recRes.status === 200, "Status is 200 OK");
    assert(Array.isArray(recRes.data), "Returns array of recommendations");
    assert(recRes.data.length > 0, `Received ${recRes.data.length} personalized recommendations`);

    if (recRes.data && recRes.data.length > 0) {
      const topRec = recRes.data[0];
      assert(Boolean(topRec.matchLabel), `Top recommendation match label: "${topRec.matchLabel}"`);
      assert(
        ["Strong match", "Good match", "Skill match", "Explore"].includes(topRec.matchLabel),
        "Qualitative label is valid standard label"
      );
      assert(topRec.matchScoreNum !== undefined, `Calculated rank score: ${topRec.matchScoreNum}`);
      assert(Boolean(topRec.matchReason), `Match reason: "${topRec.matchReason}"`);
      assert(Array.isArray(topRec.matchedSkills), "matchedSkills is an array");
    }

    // 10. Error Handling: Invalid Student ID (GET /api/students/invalid-id)
    console.log("\n[Test 10] Error Handling: Invalid ObjectId");
    const invalidIdRes = await makeRequest("/api/students/invalid-12345");
    assert(invalidIdRes.status === 400, "Status is 400 Bad Request for malformed ID");
    assert(invalidIdRes.data && invalidIdRes.data.message === "Invalid student ID", "Returns clean error message");

    // 11. Error Handling: Non-Existent Student ID (GET /api/students/507f1f77bcf86cd799439011)
    console.log("\n[Test 11] Error Handling: Non-Existent Student ID");
    const notFoundRes = await makeRequest("/api/students/507f1f77bcf86cd799439011");
    assert(notFoundRes.status === 404, "Status is 404 Not Found");
    assert(notFoundRes.data && notFoundRes.data.message === "Student not found", "Returns 404 error message");

    // 12. Delete Student Profile (DELETE /api/students/:id)
    console.log(`\n[Test 12] DELETE /api/students/${studentId} (Cleanup Student)`);
    const delRes = await makeRequest(`/api/students/${studentId}`, {
      method: "DELETE",
    });
    assert(delRes.status === 200, "Status is 200 OK on deletion");
    assert(
      delRes.data && delRes.data.message === "Student deleted successfully",
      "Deletion confirmation received"
    );

    // 13. Verify Deletion
    const verifyDelRes = await makeRequest(`/api/students/${studentId}`);
    assert(verifyDelRes.status === 404, "Deleted student now returns 404");

    // Summary
    console.log("\n==================================================");
    console.log(`Test Execution Summary: ${passed} passed, ${failed} failed`);
    console.log("==================================================");

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error("Test execution failed:", error.message);
    process.exit(1);
  }
}

runTests();
