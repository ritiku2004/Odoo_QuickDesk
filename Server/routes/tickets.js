const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  getTicketById,
  addComment,       // Import new function
  voteOnTicket, 
  updateTicketStatus,
  getTicketStats
} = require('../controllers/ticketController');

const { protect, authorize } = require('../middleware/authMiddleware');

// All routes in this file are protected
router.use(protect);

// Route to get all tickets and create a new ticket
router.route('/')
  .get(getTickets)
  .post(createTicket);

// Route for a single ticket by ID
router.route('/:id')
  .get(getTicketById);

// Route for updating status, restricted to Agents and Admins
router.route('/:id/status')
  .patch(authorize('AGENT', 'ADMIN'), updateTicketStatus);

router.route('/:id/comments').post(addComment);
router.route('/:id/vote').post(voteOnTicket);
router.route('/stats').get(authorize('ADMIN', 'AGENT'), getTicketStats);

module.exports = router;