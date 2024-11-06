const mongoose = require('mongoose');
const Category = require('../models/Category');

// Lấy tất cả các category
const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            message: 'Successfully fetched all categories',
            statusCode: 200,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching categories',
            statusCode: 500,
            data: {},
        });
    }
};

// Lấy thông tin chi tiết một category theo ID
const getOne = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm category theo ID
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                statusCode: 404,
                data: {},
            });
        }

        return res.status(200).json({
            message: 'Category fetched successfully',
            statusCode: 200,
            data: category,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching category',
            statusCode: 500,
            data: {},
        });
    }
};

// Thêm mới một category
const create = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Kiểm tra nếu thiếu name
        if (!name) {
            return res.status(400).json({
                message: 'Name is required',
                statusCode: 400,
                data: {},
            });
        }

        const newCategory = new Category({
            name,
            description,
        });

        await newCategory.save();

        return res.status(201).json({
            message: 'Category successfully created',
            statusCode: 201,
            data: newCategory,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating category',
            statusCode: 500,
            data: {},
        });
    }
};

// Cập nhật một category theo ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                statusCode: 404,
                data: {},
            });
        }

        // Cập nhật dữ liệu của category
        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();

        return res.status(200).json({
            message: 'Category successfully updated',
            statusCode: 200,
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating category',
            statusCode: 500,
            data: {},
        });
    }
};

// Xóa một category theo ID
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem ID có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid category ID',
                statusCode: 400,
                data: {},
            });
        }

        // Tìm category cần xóa
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                statusCode: 404,
                data: {},
            });
        }

        // Xóa category
        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Category successfully deleted',
            statusCode: 200,
            data: {},
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error deleting category',
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
    deleteCategory,
};
