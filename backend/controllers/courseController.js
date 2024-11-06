const Course = require('../models/Course');

// Lấy danh sách tất cả các khóa học
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('category').populate('sections');
        const response = {
            message: 'Get courses successfully!',
            statusCode: 200,
            data: courses,
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách khóa học', error: err.message });
    }
};

// Tạo khóa học mới
const createCourse = async (req, res) => {
    const { title, description, imageUrl, price, category, sections, status } = req.body;

    try {
        const newCourse = new Course({
            title,
            description,
            imageUrl,
            price,
            category,
            sections,
            status,
        });

        const savedCourse = await newCourse.save();
        res.status(201).json({
            message: 'Course created successfully!',
            statusCode: 201,
            data: savedCourse,
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo khóa học', error: err.message });
    }
};

// Lấy thông tin chi tiết của một khóa học theo ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('category').populate('sections');
        if (!course) {
            return res.status(404).json({ message: 'Khóa học không tồn tại', statusCode: 404 });
        }
        res.status(200).json({
            message: 'Get course successfully!',
            statusCode: 200,
            data: course,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({ message: 'Khóa học không tồn tại', statusCode: 404 });
        }
        res.status(500).json({ message: 'Lỗi khi lấy thông tin khóa học', error: err.message });
    }
};

// Cập nhật thông tin khóa học
const updateCourse = async (req, res) => {
    const { title, description, imageUrl, price, category, sections, status } = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, imageUrl, price, category, sections, status },
            { new: true }
        )
            .populate('category')
            .populate('sections');

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Khóa học không tồn tại', statusCode: 404 });
        }

        res.status(200).json({
            message: 'Course updated successfully!',
            statusCode: 200,
            data: updatedCourse,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({ message: 'Khóa học không tồn tại', statusCode: 404 });
        }
        res.status(500).json({ message: 'Lỗi khi cập nhật khóa học', error: err.message });
    }
};

// Xóa khóa học
const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Khóa học không tồn tại', statusCode: 404 });
        }

        res.status(200).json({
            message: 'Course deleted successfully!',
            statusCode: 200,
            data: deletedCourse,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({ message: 'Khóa học không tồn tại', statusCode: 404 });
        }
        res.status(500).json({ message: 'Lỗi khi xóa khóa học', error: err.message });
    }
};

module.exports = { getCourses, createCourse, getCourseById, updateCourse, deleteCourse };
