const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authenticateToken = require('../middlewares/auth');

router.post('/enroll', authenticateToken, enrollmentController.enrollInCourse);
router.get('/:userId/enrollments', authenticateToken, enrollmentController.getUserEnrollments);
router.put('/:id/update', authenticateToken, enrollmentController.updateEnrollmentStatus);
router.delete('/:id/cancel', authenticateToken, enrollmentController.cancelEnrollment);

module.exports = router;
