
const express = require('express');
const courseRouter = express.Router();
const Course = require('../Models/course.model');
const isAdmin=require("../Middleware/adminMiddleware");
const authMiddleware = require('../Middleware/authMiddleware');
const User = require('../Models/user.model');

courseRouter.post('/create',authMiddleware, isAdmin,async (req, res) => {
  try {
    const { name, description, duration, image } = req.body;
    const newCourse = new Course({ name, description, duration, image });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


courseRouter.put('/update/:id',authMiddleware,isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration, image } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id, { name, description, duration, image }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


courseRouter.delete('/delete/:id',authMiddleware,isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully', course: deletedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route for enrolling a user in a course
courseRouter.post('/enroll/:courseId', authMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.optedCourses.includes(courseId)) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

    
    user.optedCourses.push(courseId);
    await user.save();

    res.json({ message: 'User enrolled in course successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



courseRouter.get('/',authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = courseRouter;
