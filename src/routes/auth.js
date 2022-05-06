
const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
// ROUTER
router.get('/login', authController.indexLogin);
router.get('/register', authController.indexRegister);
router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
