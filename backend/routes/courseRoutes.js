const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/getAll', courseController.getCourses);
router.post('/create', courseController.createCourse);
router.get('/getOne/:id', courseController.getCourseById);
router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);

module.exports = router;
