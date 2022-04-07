const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
} = require('../controllers/userController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getUserData);

module.exports = router;
