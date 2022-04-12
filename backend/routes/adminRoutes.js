const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getLoggedInAdminData,
  updateLoggedInAdminData,
  updateLoggedInAdminPassword,
  getAllRecorders,
  getRecorderDataById,
  updateRecorderDataById,
  deleteRecorderById,
} = require('../controllers/adminController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/register', protect, registerAdmin);
router.post('/login', loginAdmin);
router.get('/get-logged-in-admin-data', protect, getLoggedInAdminData);
router.put('/update-logged-in-admin-data', protect, updateLoggedInAdminData);
router.put(
  '/update-logged-in-admin-password',
  protect,
  updateLoggedInAdminPassword
);
router.get('/get-all-recorders', protect, getAllRecorders);
router.get('/get-recorder-data/', protect, getRecorderDataById);
router.put('/update-recorder-data/', protect, updateRecorderDataById);
router.delete('/delete-recorder/', protect, deleteRecorderById);

module.exports = router;
