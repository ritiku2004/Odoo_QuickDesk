const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// ...existing code...
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  // Accept both 'USER' and 'END_USER' for compatibility with frontend
  role: {
    type: String,
    enum: ['USER', 'END_USER', 'AGENT', 'ADMIN'],
    default: 'END_USER',
  },
  // Optional profile fields for user settings
  avatar: {
    type: String,
    default: '',
  },
  notificationPrefs: {
    type: Object,
    default: {},
  },
}, {
  timestamps: true,
});

// Middleware to hash password before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the hashed password in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;