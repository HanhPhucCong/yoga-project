const mongoose = require('mongoose');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const Course = require('../models/Course');

// Đăng ký khóa học
const enrollInCourse = async (req, res) => {
    try {
        const { courseId, userId: inputUserId } = req.body;
        const { userId: tokenUserId } = req.user; // Lấy userId từ token (req.user)

        console.log(req.user);

        // Kiểm tra nếu userId không tồn tại trong req.user
        if (!tokenUserId) {
            return res.status(400).json({
                message: 'User ID is missing or invalid in token',
                statusCode: 400,
                data: {},
            });
        }

        // Kiểm tra xem userId trong body và token có khớp không
        if (inputUserId !== tokenUserId) {
            return res.status(403).json({
                message: 'Bạn không có quyền dùng userId của người khác.',
                statusCode: 403,
                data: {},
            });
        }

        // Kiểm tra xem người dùng đã đăng ký khóa học này chưa
        const existingEnrollment = await Enrollment.findOne({ userId: inputUserId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({
                message: 'User is already enrolled in this course',
                statusCode: 400,
                data: {},
            });
        }

        // Kiểm tra xem khóa học có tồn tại không
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                message: 'Course not found',
                statusCode: 400,
                data: {},
            });
        }

        // Đăng ký khóa học cho người dùng
        const newEnrollment = new Enrollment({
            userId: inputUserId, // Sử dụng userId từ input
            courseId,
        });

        await newEnrollment.save();

        return res.status(201).json({
            message: 'User successfully enrolled in course',
            statusCode: 201,
            data: newEnrollment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error enrolling in course ' + error,
            statusCode: 500,
            data: {},
        });
    }
};

// Lấy danh sách khóa học mà người dùng đã đăng ký
// Lấy danh sách khóa học mà người dùng đã đăng ký
const getUserEnrollments = async (req, res) => {
    try {
        const { userId: tokenUserId } = req.user; // Lấy userId từ token (req.user)
        const { userId: inputUserId } = req.params; // Lấy userId từ request params

        // Kiểm tra nếu userId trong token và trong params không khớp
        if (inputUserId !== tokenUserId) {
            return res.status(403).json({
                message: 'Bạn không có quyền truy cập thông tin của người khác.',
                statusCode: 403,
                data: {},
            });
        }

        // Lấy tất cả các khóa học mà người dùng đã đăng ký
        const enrollments = await Enrollment.find({ userId: inputUserId }).populate('courseId'); // Liên kết với khóa học

        if (enrollments.length === 0) {
            return res.status(404).json({
                message: 'No enrollments found for this user',
                statusCode: 404,
                data: {},
            });
        }

        return res.status(200).json({
            message: 'User enrollments fetched successfully',
            statusCode: 200,
            data: enrollments,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching enrollments' + error,
            statusCode: 500,
            data: {},
        });
    }
};

// Cập nhật tiến độ và trạng thái đăng ký của người dùng
const updateEnrollmentStatus = async (req, res) => {
    try {
        const { id } = req.params; // enrollmentId từ params
        const { progress } = req.body; // Tiến độ cần cập nhật
        const { userId: tokenUserId } = req.user; // Lấy userId từ token

        // Lấy thông tin Enrollment
        const enrollment = await Enrollment.findById(id).populate('userId'); // Liên kết với User để lấy userId

        if (!enrollment) {
            return res.status(404).json({
                message: 'Enrollment not found',
                statusCode: 404,
                data: {},
            });
        }

        // Kiểm tra xem userId trong token có khớp với userId trong Enrollment hay không
        if (enrollment.userId._id.toString() !== tokenUserId) {
            return res.status(403).json({
                message: 'Bạn không có quyền cập nhật tiến độ của người khác.',
                statusCode: 403,
                data: {},
            });
        }

        // Cập nhật tiến độ nếu có
        if (progress !== undefined) {
            enrollment.progress = progress;
        }

        await enrollment.save();

        return res.status(200).json({
            message: 'Enrollment updated successfully',
            statusCode: 200,
            data: enrollment,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating enrollment',
            statusCode: 500,
            data: {},
        });
    }
};

// Hủy đăng ký khóa học
const cancelEnrollment = async (req, res) => {
    try {
        const { id } = req.params; // enrollmentId từ params
        const { userId: tokenUserId } = req.user; // Lấy userId từ token

        // Lấy thông tin Enrollment
        const enrollment = await Enrollment.findById(id).populate('userId'); // Liên kết với User để lấy userId

        if (!enrollment) {
            return res.status(404).json({
                message: 'Enrollment not found',
                statusCode: 404,
                data: {},
            });
        }

        // Kiểm tra xem userId trong token có khớp với userId trong Enrollment hay không
        if (enrollment.userId._id.toString() !== tokenUserId) {
            return res.status(403).json({
                message: 'Bạn không có quyền hủy đăng ký của người khác.',
                statusCode: 403,
                data: {},
            });
        }

        // Xóa enrollment (hủy đăng ký)
        await Enrollment.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Enrollment canceled successfully',
            statusCode: 200,
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error canceling enrollment',
            statusCode: 500,
            data: {},
        });
    }
};

module.exports = {
    enrollInCourse,
    getUserEnrollments,
    updateEnrollmentStatus,
    cancelEnrollment,
};
