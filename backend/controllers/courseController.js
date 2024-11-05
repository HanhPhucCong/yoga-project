const Course = require('../models/Course');

// Tạo khóa học (dành cho Admin)
exports.createCourse = async (req, res) => {
  const { title, description, price, instructor } = req.body;
  try {
    const newCourse = new Course({ title, description, price, instructor });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy tất cả khóa học
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
