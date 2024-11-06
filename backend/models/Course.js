const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: {
        type: String,
        default: 'https://images.pexels.com/photos/5302905/pexels-photo-5302905.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    imageUrl: { type: String },
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
});

module.exports = mongoose.model('Course', courseSchema);
