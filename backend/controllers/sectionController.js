const mongoose = require('mongoose');
const Section = require('../models/Section');
const Lecture = require('../models/Lecture');

// Lấy tất cả các section
const getAll = async (req, res) => {
    try {
        const sections = await Section.find().populate('lectures'); // Liên kết với mô hình Lecture
        return res.status(200).json({
            message: 'Successfully fetched all sections',
            statusCode: 200,
            data: sections,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching sections',
            statusCode: 500,
            data: {},
        });
    }
};

// Lấy thông tin chi tiết một section theo ID
const getOne = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra tính hợp lệ của ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid section ID',
                statusCode: 400,
                data: {},
            });
        }

        // Tìm section theo ID và populate các trường liên kết
        const section = await Section.findById(id).populate('lectures'); // Liên kết với mô hình Lecture

        if (!section) {
            return res.status(404).json({
                message: 'Section not found',
                statusCode: 404,
                data: {},
            });
        }

        return res.status(200).json({
            message: 'Section fetched successfully',
            statusCode: 200,
            data: section,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching section',
            statusCode: 500,
            data: {},
        });
    }
};

// Thêm mới một section
const create = async (req, res) => {
    try {
        const { title, lectures } = req.body;

        // Kiểm tra nếu thiếu các trường
        if (!title || !lectures) {
            return res.status(400).json({
                message: 'Title and lectures are required',
                statusCode: 400,
                data: {},
            });
        }

        // Kiểm tra xem tất cả các lectures có tồn tại không
        const lecturesExist = await Lecture.find({ _id: { $in: lectures } });
        if (lecturesExist.length !== lectures.length) {
            return res.status(400).json({
                message: 'One or more lectures are invalid',
                statusCode: 400,
                data: {},
            });
        }

        // Tạo mới section
        const newSection = new Section({
            title,
            lectures,
        });

        await newSection.save();

        return res.status(201).json({
            message: 'Section successfully created',
            statusCode: 201,
            data: newSection,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating section',
            statusCode: 500,
            data: {},
        });
    }
};

// Cập nhật một section theo ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, lectures } = req.body;

        const section = await Section.findById(id);

        if (!section) {
            return res.status(404).json({
                message: 'Section not found',
                statusCode: 404,
                data: {},
            });
        }

        // Kiểm tra xem lectures có hợp lệ không
        if (lectures) {
            const lecturesExist = await Lecture.find({ _id: { $in: lectures } });
            if (lecturesExist.length !== lectures.length) {
                return res.status(400).json({
                    message: 'One or more lectures are invalid',
                    statusCode: 400,
                    data: {},
                });
            }
        }

        // Cập nhật dữ liệu của section
        section.title = title || section.title;
        section.lectures = lectures || section.lectures;

        await section.save();

        return res.status(200).json({
            message: 'Section successfully updated',
            statusCode: 200,
            data: section,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating section',
            statusCode: 500,
            data: {},
        });
    }
};

// Xóa một section theo ID
const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem ID có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid section ID',
                statusCode: 400,
                data: {},
            });
        }

        // Tìm section cần xóa
        const section = await Section.findById(id);

        if (!section) {
            return res.status(404).json({
                message: 'Section not found',
                statusCode: 404,
                data: {},
            });
        }

        // Xóa section
        await Section.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Section successfully deleted',
            statusCode: 200,
            data: {},
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error deleting section',
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
    deleteSection,
};
