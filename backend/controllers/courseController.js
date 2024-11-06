const Course = require('../models/Course');

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
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

module.exports = { getCourses };
