const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true }, 
  phoneNumber: { type: String, required: true }, 
  profileImage: { type: String } 
});

module.exports = mongoose.model('User', userSchema);
