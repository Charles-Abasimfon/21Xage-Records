const express = require('express');
const router = express.Router();
const {
  getDemos,
  postDemo,
  putDemo,
  deleteDemo,
  getDemosByUser,
} = require('../controllers/demoController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');

// DEMO ROUTES **REPLACE WITH REAL ROUTES**

router.route('/').get(protect, getDemos).post(protect, postDemo);
/* The chain above is the same thing as:
router.get('/', protect, getDemos);
router.post('/', protect, postDemo);
*/

router.route('/:id').put(protect, putDemo).delete(protect, deleteDemo);
/* The chain above is the same thing as:
router.put('/:id', protect, putDemo);
router.delete('/:id', protect, deleteDemo);
*/

router.get('/demosbyuser', protect, getDemosByUser);

module.exports = router;
