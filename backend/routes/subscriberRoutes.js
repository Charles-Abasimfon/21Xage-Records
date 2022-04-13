const express = require('express');
const router = express.Router();
const {
  addSubscriber,
  getAllSubscribers,
  getSubscriberInfoById,
  updateSubscriberDataById,
  getAllActiveSubscribers,
  getAllAlmostExpiredSubscribers,
  getAllExpiredSubscribers,
  getLatestSubscribers,
} = require('../controllers/subscriberController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addSubscriber);
router.get('/get-all-subscribers', protect, getAllSubscribers);
router.get('/get-subscriber-data/', protect, getSubscriberInfoById);
router.put('/update-subscriber-data/', protect, updateSubscriberDataById);
router.get('/get-all-active-subscribers', protect, getAllActiveSubscribers);
router.get(
  '/get-all-almostexpired-subscribers',
  protect,
  getAllAlmostExpiredSubscribers
);
router.get('/get-all-expired-subscribers', protect, getAllExpiredSubscribers);
router.get('/get-latest-subscribers', protect, getLatestSubscribers);

module.exports = router;
