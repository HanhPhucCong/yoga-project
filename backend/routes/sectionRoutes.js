const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Các route cho Section
router.get('/getAll', sectionController.getAll);
router.post('/create', sectionController.create);
router.put('/update/:id', sectionController.update);
router.delete('/delete/:id', sectionController.deleteSection);

module.exports = router;
