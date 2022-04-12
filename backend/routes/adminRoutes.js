const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminData,
  updateAdminData,
} = require('../controllers/adminController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/get-admin-data', protect, getAdminData);
router.put('/update-logged-in-admin-data', protect, updateAdminData);

module.exports = router;
