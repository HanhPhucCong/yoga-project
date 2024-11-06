const mongoose = require('mongoose');
const Section = require('../models/Section');

// Lấy tất cả các section
const getAll = async (req, res) => {
    try {
        const sections = await Section.find().populate('courseId').populate('lectures');
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

// Thêm mới một section
const create = async (req, res) => {
    try {
        const { title, courseId, lectures } = req.body;

        if (!title || !courseId || !lectures) {
            return res.status(400).json({
                message: 'Title, courseId, and lectures are required',
                statusCode: 400,
                data: {},
            });
        }

        const newSection = new Section({
            title,
            courseId,
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
        const { title, courseId, lectures } = req.body;

        const section = await Section.findById(id);

        if (!section) {
            return res.status(404).json({
                message: 'Section not found',
                statusCode: 404,
                data: {},
            });
        }

        // Cập nhật dữ liệu của section
        section.title = title || section.title;
        section.courseId = courseId || section.courseId;
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
        await Section.findByIdAndDelete(id); // Dùng findByIdAndDelete thay vì remove()

        return res.status(200).json({
            message: 'Section successfully deleted',
            statusCode: 200,
            data: {},
        });
    } catch (error) {
        console.error(error); // In lỗi ra console để kiểm tra
        return res.status(500).json({
            message: 'Error deleting section',
            statusCode: 500,
            data: {},
        });
    }
};

module.exports = {
    getAll,
    create,
    update,
    deleteSection,
};
