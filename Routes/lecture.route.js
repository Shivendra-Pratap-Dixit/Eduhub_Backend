const express = require('express');
const lectureRouter = express.Router();
const Lecture = require('../Models/lecture.model');
const authMiddleware = require('../Middleware/authMiddleware');
const isAdmin = require('../Middleware/adminMiddleware');


lectureRouter.post('/create', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { title, description, startTime, endTime, link, course } = req.body;
    const newLecture = new Lecture({ title, description, startTime, endTime, link, course });
    await newLecture.save();
    res.status(201).json({ message: 'Lecture created successfully', lecture: newLecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


lectureRouter.put('/update/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startTime, endTime, link, course } = req.body;
    const updatedLecture = await Lecture.findByIdAndUpdate(id, { title, description, startTime, endTime, link, course }, { new: true });
    if (!updatedLecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.json({ message: 'Lecture updated successfully', lecture: updatedLecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


lectureRouter.delete('/delete/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLecture = await Lecture.findByIdAndDelete(id);
    if (!deletedLecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.json({ message: 'Lecture deleted successfully', lecture: deletedLecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

lectureRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = lectureRouter;
