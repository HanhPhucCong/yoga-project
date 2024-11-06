const express = require('express');
const { getUserById, createUser, forgotPassword, resetPassword} = require('../controllers/userController');


const router = express.Router();

router.get('/users/:id', getUserById);
router.post('/register', createUser); 
router.post('/forgot-password', forgotPassword); 
router.post('/reset-password', resetPassword);

module.exports = router;