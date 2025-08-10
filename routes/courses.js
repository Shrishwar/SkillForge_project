const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../utils/multer');
const Course = require('../Models/Course');

// Create Course (Admin only)
router.post('/', verifyToken, isAdmin, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
    const course = new Course({ title, description, category, thumbnail, createdBy: req.user.id });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
