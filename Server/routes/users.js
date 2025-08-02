const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { getUsers, updateUserRole, createUser, updateUser, deleteUser } = userController;
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('ADMIN'));

router.route('/').get(getUsers).post(createUser);
router.route('/:id').patch(updateUser).delete(deleteUser);
router.patch('/me', protect, userController.updateProfile);
router.route('/:id/role').patch(updateUserRole);

module.exports = router;