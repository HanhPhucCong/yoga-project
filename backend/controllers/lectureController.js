const mongoose = require('mongoose');
const Lecture = require('../models/Lecture');

// Lấy tất cả các lectures
const getAll = async (req, res) => {
    try {
        const lectures = await Lecture.find();
        return res.status(200).json({
            message: 'Successfully fetched all lectures',
            statusCode: 200,
            data: lectures,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching lectures',
            statusCode: 500,
            data: {},
        });
    }
};

// Lấy thông tin chi tiết một lecture theo ID
const getOne = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra nếu ID không hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid lecture ID format',
                statusCode: 400,
                data: {},
            });
        }

        // Tìm lecture theo ID
        const lecture = await Lecture.findById(id);

        // Kiểm tra nếu không tìm thấy
        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found',
                statusCode: 404,
                data: {},
            });
        }

        return res.status(200).json({
            message: 'Lecture fetched successfully',
            statusCode: 200,
            data: lecture,
        });
    } catch (error) {
        console.error('Error in getOne:', error); // Log chi tiết lỗi
        return res.status(500).json({
            message: 'Error fetching lecture',
            statusCode: 500,
            data: { error: error.message }, // Trả về message lỗi cụ thể
        });
    }
};

// Thêm mới một lecture
const create = async (req, res) => {
    try {
        const { title, contentUrl, contentType, duration } = req.body;

        // Kiểm tra nếu thiếu các trường bắt buộc
        if (!title || !contentUrl || !contentType) {
            return res.status(400).json({
                message: 'Title, contentUrl, and contentType are required',
                statusCode: 400,
                data: {},
            });
        }

        const newLecture = new Lecture({
            title,
            contentUrl,
            contentType,
            duration,
        });

        await newLecture.save();

        return res.status(201).json({
            message: 'Lecture successfully created',
            statusCode: 201,
            data: newLecture,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating lecture',
            statusCode: 500,
            data: {},
        });
    }
};

// Cập nhật một lecture theo ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, contentUrl, contentType, duration } = req.body;

        const lecture = await Lecture.findById(id);

        // Nếu không tìm thấy lecture, trả về 404
        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found',
                statusCode: 404,
                data: {},
            });
        }

        // Cập nhật dữ liệu của lecture
        lecture.title = title || lecture.title;
        lecture.contentUrl = contentUrl || lecture.contentUrl;
        lecture.contentType = contentType || lecture.contentType;
        lecture.duration = duration || lecture.duration;

        await lecture.save();

        return res.status(200).json({
            message: 'Lecture successfully updated',
            statusCode: 200,
            data: lecture,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating lecture',
            statusCode: 500,
            data: {},
        });
    }
};

// Xóa một lecture theo ID
const deleteLecture = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem ID có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid lecture ID',
                statusCode: 400,
                data: {},
            });
        }

        // Tìm lecture cần xóa
        const lecture = await Lecture.findById(id);

        // Nếu không tìm thấy lecture, trả về 404
        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found',
                statusCode: 404,
                data: {},
            });
        }

        // Xóa lecture
        await Lecture.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Lecture successfully deleted',
            statusCode: 200,
            data: {},
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error deleting lecture',
            statusCode: 500,
            data: {},
        });
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteLecture,
};
