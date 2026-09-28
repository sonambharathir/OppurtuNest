const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

// Create a new student profile
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();

    return res.status(201).json(savedStudent);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Student validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create student",
      error: error.message,
    });
  }
});

// Get all student profiles
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
});

// Get one student profile by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch student",
      error: error.message,
    });
  }
});

// Update one student profile by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json(updatedStudent);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Student validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
});

// Delete one student profile by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
});

module.exports = router;
