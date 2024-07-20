const express = require('express');
const { register, login, checkLoginStatus } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check-login-status', auth, checkLoginStatus);

module.exports = router;
