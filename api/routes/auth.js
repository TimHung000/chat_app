const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authController = require('../controllers/authController')


// Register
router.post('/register', authController.registerNewAccount);

// Login
router.post("/login", authController.handleLogin);

// Logout
router.get("/logout", authController.handleLogout);
 
// refresh Token
router.get('/refreshToken', authController.handleRefreshToken); 

module.exports = router;
