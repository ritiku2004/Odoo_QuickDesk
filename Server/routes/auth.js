// In server/routes/auth.js

const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/authController');
// Make sure to import your 'protect' middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signupUser);
router.post('/login', loginUser);

// --- ADD THIS ROUTE ---
// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, (req, res) => {
    // The 'protect' middleware decodes the token and attaches the user
    // object to the request. We just send it back.
    res.json(req.user);
});
// --------------------

module.exports = router;