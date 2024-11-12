const express = require('express');
const router  = express.Router();
const userController = require("../controllers/UserController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authenticateToken, userController.logout);
router.get('/profile', authenticateToken, userController.profile);

module.exports = router;