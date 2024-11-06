const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    contentUrl: { type: String, required: true },
    contentType: { type: String, enum: ['video', 'pdf'], required: true },
    duration: { type: Number },
});

module.exports = mongoose.model('Lecture', lectureSchema);
