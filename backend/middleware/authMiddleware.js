const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const JWT_SECRET = process.env.JWT_SECRET || "oppurtunest_jwt_secret_dev_key_2026";

/**
 * Authentication Middleware
 * Validates JWT token from the Authorization header, extracts student ID,
 * and attaches the authenticated student (without password) to req.user.
 */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required. Please provide a valid token in the Authorization header.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session expired. Please log in again." });
      }
      return res.status(401).json({ message: "Invalid authentication token." });
    }

    const studentId = decoded.id || decoded.studentId;
    if (!studentId) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const student = await Student.findById(studentId).select("-password");
    if (!student) {
      return res.status(401).json({ message: "User account no longer exists." });
    }

    req.user = student;
    req.studentId = student._id;
    next();
  } catch (error) {
    console.error("[AuthMiddleware] Error:", error.message);
    return res.status(500).json({ message: "Authentication internal error", error: error.message });
  }
}

/**
 * Optional Auth Middleware
 * If a valid token is provided, attaches req.user; otherwise leaves it null and proceeds.
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          const studentId = decoded.id || decoded.studentId;
          if (studentId) {
            const student = await Student.findById(studentId).select("-password");
            if (student) {
              req.user = student;
              req.studentId = student._id;
            }
          }
        } catch (e) {
          // Ignore invalid token in optional auth
        }
      }
    }
    next();
  } catch (err) {
    next();
  }
}

module.exports = {
  authMiddleware,
  optionalAuth,
  JWT_SECRET,
};
