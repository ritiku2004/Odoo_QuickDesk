const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', categoryController.getCategories);
router.post('/', authorize('ADMIN'), categoryController.createCategory);
router.patch('/:id', authorize('ADMIN'), categoryController.updateCategory);
router.delete('/:id', authorize('ADMIN'), categoryController.deleteCategory);

module.exports = router;