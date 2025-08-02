const mongoose = require('mongoose');
// ...existing code...
const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  type: {
    type: String,
    enum: ['UPVOTE', 'DOWNVOTE'],
    required: true,
  },
});

// Create a compound index to ensure a user can only vote once per ticket
voteSchema.index({ user: 1, ticket: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;