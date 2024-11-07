const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    progress: {
        type: Number,
        default: 0, // Tiến độ khóa học (0-100%)
    },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
