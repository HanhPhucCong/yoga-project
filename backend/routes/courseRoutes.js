const express = require('express');
const { createCourse, getCourses } = require('../controllers/courseController');
const router = express.Router();

// Route tạo khóa học (Admin)
router.post('/', createCourse);

// Route lấy danh sách khóa học
router.get('/', getCourses);

module.exports = router;
