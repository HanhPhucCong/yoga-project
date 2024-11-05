const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  imageUrl: { type: String },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
});

module.exports = mongoose.model('Course', courseSchema);
