const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const Vote = require('../models/Vote');

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { subject, description, categoryId } = req.body;

  if (!subject || !description || !categoryId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const ticket = await Ticket.create({
      subject,
      description,
      category: categoryId,
      creator: req.user._id,
    });

    // Send email to all agents (or support mailbox)
    // Email notifications are now handled by EmailJS on the frontend.

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all tickets with filtering and pagination
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
  try {
    const {
      status,
      creator,
      category,
      sort = 'recent',
      page = 1,
      limit = 20
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (creator) filter.creator = creator;
    if (category) filter.category = category;

    let sortOption = { updatedAt: -1 };
    if (sort === 'most_replied') sortOption = { commentCount: -1 };
    if (sort === 'recent') sortOption = { updatedAt: -1 };

    // Aggregate for comment count if needed
    let tickets;
    if (sort === 'most_replied') {
      tickets = await Ticket.aggregate([
        { $match: filter },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'ticket',
            as: 'comments'
          }
        },
        {
          $addFields: {
            commentCount: { $size: '$comments' }
          }
        },
        { $sort: sortOption },
        { $skip: (parseInt(page) - 1) * parseInt(limit) },
        { $limit: parseInt(limit) }
      ]);
    } else {
      tickets = await Ticket.find(filter)
        .sort(sortOption)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .populate('creator', 'name email')
        .populate('category', 'name');
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
  }
};


// @desc    Get a single ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('category', 'name');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Fetch associated comments
    const comments = await Comment.find({ ticket: req.params.id })
      .populate('author', 'name role');

    // Combine ticket and comments for the response
    const response = {
      ...ticket.toObject(),
      comments: comments
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a ticket's status
// @route   PATCH /api/tickets/:id/status
// @access  Private (Agent/Admin)
const updateTicketStatus = async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true } // Return the updated document
        ).populate('creator', 'name email').populate('category', 'name');

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        // Send email to ticket creator
        const creator = ticket.creator;
        if (creator && creator.email) {
          // Email notifications are now handled by EmailJS on the frontend.
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const addComment = async (req, res) => {
  const { body } = req.body;

  if (!body) {
    return res.status(400).json({ message: 'Comment body cannot be empty' });
  }

  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const comment = await Comment.create({
      body,
      author: req.user._id,
      ticket: req.params.id,
    });

    // When a comment is added, update the ticket's updatedAt timestamp
    // to bring it to the top of sorted lists.
    ticket.updatedAt = Date.now();
    await ticket.save();
    
    // Populate author details for the response
    const populatedComment = await Comment.findById(comment._id).populate('author', 'name role');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Vote on a ticket
// @route   POST /api/tickets/:id/vote
// @access  Private
const voteOnTicket = async (req, res) => {
    const { type } = req.body; // 'UPVOTE' or 'DOWNVOTE'
    const userId = req.user._id;
    const ticketId = req.params.id;

    if (type !== 'UPVOTE' && type !== 'DOWNVOTE') {
        return res.status(400).json({ message: 'Invalid vote type' });
    }
    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const existingVote = await Vote.findOne({ user: userId, ticket: ticketId });

        if (existingVote) {
            // If the user is casting the same vote again, remove their vote (toggle off)
            if (existingVote.type === type) {
                await existingVote.deleteOne();
            } else {
                // If they are changing their vote, update it
                existingVote.type = type;
                await existingVote.save();
            }
        } else {
            // If no vote exists, create a new one
            await Vote.create({ user: userId, ticket: ticketId, type });
        }

        // Recalculate vote counts on the ticket
        const upvotes = await Vote.countDocuments({ ticket: ticketId, type: 'UPVOTE' });
        const downvotes = await Vote.countDocuments({ ticket: ticketId, type: 'DOWNVOTE' });
        ticket.upvotes = upvotes;
        ticket.downvotes = downvotes;
        const updatedTicket = await ticket.save();

        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getTicketStats = async (req, res) => {
    try {
        const open = await Ticket.countDocuments({ status: 'OPEN' });
        const in_progress = await Ticket.countDocuments({ status: 'IN_PROGRESS' });
        const resolved = await Ticket.countDocuments({ status: 'RESOLVED' });
        const User = require('../models/User');
        // Support both 'USER' and 'END_USER' role naming
        const totalUsers = await User.countDocuments({ role: { $in: ['USER', 'END_USER', 'AGENT', 'ADMIN'] } });
        res.json({ open, in_progress, resolved, totalUsers });
    } catch (error) {
        console.error('getTicketStats error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  addComment,
  voteOnTicket,
  getTicketStats
};
