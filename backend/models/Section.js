const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
});

module.exports = mongoose.model('Section', sectionSchema);
