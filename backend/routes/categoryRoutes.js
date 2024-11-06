const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Các route cho Category
router.get('/getAll', categoryController.getAll);
router.get('/getOne/:id', categoryController.getOne);
router.post('/create', categoryController.create);
router.put('/update/:id', categoryController.update);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;
