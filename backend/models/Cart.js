const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    quantity: { type: Number, default: 1 },
  }],
  totalAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', cartSchema);
