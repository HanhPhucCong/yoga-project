const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');

router.get('/getAll', lectureController.getAll);
router.get('/getOne/:id', lectureController.getOne);
router.post('/create', lectureController.create);
router.put('/update/:id', lectureController.update);
router.delete('/delete/:id', lectureController.deleteLecture);

module.exports = router;
