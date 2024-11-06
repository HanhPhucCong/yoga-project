const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/getAll', courseController.getCourses);

module.exports = router;
